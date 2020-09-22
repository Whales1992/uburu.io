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
		drug: "",
		Other: "",
		dosage: "",
		duration: "",
		sideEffect: "",
		date: ""
	});

	const { drug, Other, dosage, duration, sideEffect, date } = inputValues;

	function handleChange(name, e) {
		let value;

		if (name === "date") {
			value = e;
		} else {
			value = e.target.value;
		}

		setInputValue({ ...inputValues, [name]: value });
	}

	function resetRecord() {
		setInputValue({
			drug: "",
			Other: "",
			dosage: "",
			duration: "",
			sideEffect: "",
			date: ""
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
		if (drug && dosage && duration && date) {
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
							<label htmlFor="drug">Drug</label>
							<select
								id="drug"
								name="drug"
								className={styles.input}
								value={drug}
								onChange={(e) => handleChange("drug", e)}
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
						{drug === "Others" && (
							<div>
								<label
									className={!drug ? "disabled_label" : ""}
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
									disabled={!drug}
									required
								/>
							</div>
						)}
						<div>
							<label
								className={!drug ? "disabled_label" : ""}
								htmlFor="dosage"
							>
								Dosage (unit: mg)
							</label>
							<input
								id="dosage"
								type="number"
								name="dosage"
								className={styles.input}
								value={dosage}
								onChange={(e) => handleChange("dosage", e)}
								disabled={!drug}
								required
							/>
						</div>
						<div>
							<label
								className={!dosage ? "disabled_label" : ""}
								htmlFor="duration"
							>
								Duration
							</label>
							<input
								id="duration"
								type="number"
								name="duration"
								className={styles.input}
								value={duration}
								onChange={(e) => handleChange("duration", e)}
								disabled={!dosage}
								required
							/>
						</div>
						<div>
							<label
								className={!duration ? "disabled_label" : ""}
								htmlFor="sideEffect"
							>
								Side Effects
							</label>
							<textarea
								id="sideEffect"
								type="text"
								name="side effect"
								placeholder="Type in side effects"
								className={styles.textarea}
								value={sideEffect}
								onChange={(e) => handleChange("sideEffect", e)}
								disabled={!dosage}
							/>
						</div>
						<div>
							<label
								className={!duration ? "disabled_label" : ""}
								htmlFor="date"
							>
								Date of Record
							</label>
							<DatePicker
								id="date"
								name="date"
								value={date}
								className={styles.input}
								onChange={(e) => handleChange("date", e)}
								required
								format="dd/MM/y"
								disabled={!dosage}
							/>
						</div>
						<button
							type="submit"
							className={
								!drug || !dosage || !date || !duration
									? styles2.submit_btn_disabled
									: styles2.submit_btn
							}
							disabled={!drug || !dosage || !date || !duration}
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
