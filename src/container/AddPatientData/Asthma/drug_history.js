import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import localForage from "localforage";
import DatePicker from "react-date-picker";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import TopBar from "../../../components/UI/JS/topbar";
import Shell from "../../../components/AddPatientData/JS/shell";

//style
import styles from "../CSS/add_patient_data.module.css";
import styles2 from "../CSS/medical_history.module.css";

const url = process.env.REACT_APP_BASE_URL;

const DrugHistory = ({ history }) => {
	const [inputValues, setInputValue] = useState({
		Drug: "",
		other_drug: "",
		Dosage: "",
		Duration: "",
		SideEffect: "",
		RecordDate: ""
	});

	const {
		Drug,
		other_drug,
		Dosage,
		Duration,
		SideEffect,
		RecordDate
	} = inputValues;
	const FolderNo = useLocation().state;

	function handleChange(name, e) {
		let value;

		if (name === "RecordDate") {
			value = e;
		} else {
			value = e.target.value;
		}

		setInputValue({ ...inputValues, [name]: value });
	}

	function resetRecord() {
		setInputValue({
			Drug: "",
			other_drug: "",
			Dosage: "",
			Duration: "",
			SideEffect: "",
			RecordDate: ""
		});
	}

	async function submitRecord(e, recordName) {
		if (e) e.preventDefault();

		const modifiedRecord = {
			Drug: Drug === "Other" ? other_drug : Drug,
			Dosage,
			Duration,
			SideEffect,
			RecordDate,
			FolderNo,
			Type: recordName
		};

		if (window.navigator.onLine) {
			try {
				resetRecord();
				const request = await fetch(`${url}/records`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.token}`
					},
					body: JSON.stringify(modifiedRecord)
				});

				if (!request.ok) {
					const error = await request.json();
					throw Error(error.Message);
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				let recordArray = await localForage.getItem(recordName);

				if (recordArray) {
					recordArray.push(modifiedRecord);
					localForage.setItem(recordName, recordArray);
				} else {
					localForage.setItem(recordName, [modifiedRecord]);
				}
				resetRecord();
			} catch (error) {
				console.log(error);
			}
		}
	}

	async function next(recordName) {
		if (Drug && Dosage && Duration && RecordDate) {
			await submitRecord(null, recordName);
			history.push("/add_patient_data/investigation_history", FolderNo);
		} else {
			history.push("/add_patient_data/investigation_history", FolderNo);
		}
	}

	return (
		<>
			<TopBar hide_on_small_screens />
			<SecondaryBar page_title="Drug History Data" shadow />
			<Shell>
				<form
					className={styles.form}
					onSubmit={(e) => submitRecord(e, "Drugs")}
				>
					<div className={styles.fields}>
						<div>
							<label htmlFor="Drug">Drug</label>
							<select
								id="Drug"
								name="Drug"
								className={styles.input}
								value={Drug}
								onChange={(e) => handleChange("Drug", e)}
								required
							>
								<option></option>
								<option>Salbutamol</option>
								<option>Albuterol</option>
								<option>Salmeterol</option>
								<option>Formoterol</option>
								<option>Budesonide</option>
								<option>Fluticasone</option>
								<option>Prednisolone</option>
								<option>Methylprednisolone</option>
								<option>Montelukast</option>
								<option>Zafirlukast</option>
								<option>Seretide</option>
								<option>Flutiform</option>
								<option>Others</option>
							</select>
						</div>
						{Drug === "Others" ? (
							<div>
								<label
									className={!Drug ? "disabled_label" : ""}
									htmlFor="other_drug"
								>
									Other Drug
								</label>
								<input
									id="other_drug"
									type="text"
									name="other_drug"
									className={styles.input}
									value={other_drug}
									onChange={(e) =>
										handleChange("other_drug", e)
									}
									placeholder="Type in other Drug"
									disabled={!Drug}
									required
								/>
							</div>
						) : null}
						<div>
							<label
								className={!Drug ? "disabled_label" : ""}
								htmlFor="Dosage"
							>
								Dosage (unit: mg)
							</label>
							<input
								id="Dosage"
								type="number"
								name="Dosage"
								className={styles.input}
								value={Dosage}
								onChange={(e) => handleChange("Dosage", e)}
								disabled={!Drug}
								required
							/>
						</div>
						<div>
							<label
								className={!Dosage ? "disabled_label" : ""}
								htmlFor="Duration"
							>
								Duration
							</label>
							<input
								id="Duration"
								type="number"
								name="Duration"
								className={styles.input}
								value={Duration}
								onChange={(e) => handleChange("Duration", e)}
								disabled={!Dosage}
								required
							/>
						</div>
						<div>
							<label
								className={!Duration ? "disabled_label" : ""}
								htmlFor="SideEffect"
							>
								Side Effects
							</label>
							<textarea
								id="SideEffect"
								type="text"
								name="side effect"
								placeholder="Type in side effects"
								className={styles.textarea}
								value={SideEffect}
								onChange={(e) => handleChange("SideEffect", e)}
								disabled={!Dosage}
							/>
						</div>
						<div>
							<label
								className={!Duration ? "disabled_label" : ""}
								htmlFor="RecordDate"
							>
								Date of Record
							</label>
							<DatePicker
								id="RecordDate"
								name="RecordDate"
								value={RecordDate}
								className={styles.input}
								onChange={(e) => handleChange("RecordDate", e)}
								required
								format="dd/MM/y"
								disabled={!Dosage}
							/>
						</div>
						<button
							type="submit"
							className={
								!Drug || !Dosage || !RecordDate || !Duration
									? styles2.submit_btn_disabled
									: styles2.submit_btn
							}
							disabled={
								!Drug || !Dosage || !RecordDate || !Duration
							}
						>
							Add New Record
						</button>
					</div>
					<div className={styles.btn_area}>
						<button
							className="secondary_btn"
							type="button"
							onClick={() => history.goBack()}
						>
							Back
						</button>
						<button
							className="primary_btn"
							type="button"
							onClick={() => next("Drugs")}
						>
							Continue to Investigation History
						</button>
					</div>
				</form>
			</Shell>
		</>
	);
};

export default DrugHistory;
