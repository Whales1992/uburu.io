import React, { useState } from "react";
import DatePicker from "react-date-picker";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import TopBar from "../../../components/UI/JS/topbar";
import Shell from "../../../components/AddPatientData/JS/shell";

//style
import styles from "../CSS/add_patient_data.module.css";
import styles2 from "../CSS/medical_history.module.css";

const DrugHistory = ({ history }) => {
	const [inputValues, setInputValue] = useState({
		Drug: "",
		Other: "",
		Dosage: "",
		Duration: "",
		SideEffect: "",
		Date: ""
	});

	const { Drug, Other, Dosage, Duration, SideEffect, Date } = inputValues;

	function handleChange(name, e) {
		let value;

		if (name === "Date") {
			value = e;
		} else {
			value = e.target.value;
		}

		setInputValue({ ...inputValues, [name]: value });
	}

	function resetRecord() {
		setInputValue({
			Drug: "",
			Other: "",
			Dosage: "",
			Duration: "",
			SideEffect: "",
			Date: ""
		});
	}

	function submitRecord(e, recordName) {
		if (e) e.preventDefault();
		let localStorageValue =
			localStorage.getItem(recordName) &&
			JSON.parse(localStorage.getItem(recordName));
		if (localStorageValue) {
			localStorageValue.push(inputValues);
			const lSValueStringified = JSON.stringify(localStorageValue);
			localStorage.setItem(recordName, lSValueStringified);
			resetRecord();
		} else {
			localStorage.setItem(
				recordName,
				`${JSON.stringify([inputValues])}`
			);
			resetRecord();
		}
	}

	function next(recordName) {
		if (Drug && Dosage && Duration && Date) {
			submitRecord(null, recordName);
			history.push("/add_patient_data/investigation_history");
		} else {
			history.push("/add_patient_data/investigation_history");
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
								<option>Cisplatin</option>
								<option>Cyclophosphamide</option>
								<option>Adriamycin</option>
								<option>Doxorubicin</option>
								<option>Paclitaxel</option>
								<option>Epiribicine</option>
								<option>Docetaxel</option>
								<option>Etoposide</option>
								<option>5 Fluro-Uracil</option>
								<option>Other</option>
							</select>
						</div>
						{Drug === "Others" && (
							<div>
								<label
									className={!Drug ? "disabled_label" : ""}
									htmlFor="other"
								>
									Dosage (unit: mg)
								</label>
								<input
									id="other"
									type="text"
									name="other"
									className={styles.input}
									value={Other}
									onChange={(e) => handleChange("Other", e)}
									disabled={!Drug}
									required
								/>
							</div>
						)}
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
								htmlFor="Date"
							>
								Date of Record
							</label>
							<DatePicker
								id="Date"
								name="Date"
								value={Date}
								className={styles.input}
								onChange={(e) => handleChange("Date", e)}
								required
								format="dd/MM/y"
								disabled={!Dosage}
							/>
						</div>
						<button
							type="submit"
							className={
								!Drug || !Dosage || !Date || !Duration
									? styles2.submit_btn_disabled
									: styles2.submit_btn
							}
							disabled={!Drug || !Dosage || !Date || !Duration}
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
							onClick={() => next("drug_history")}
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
