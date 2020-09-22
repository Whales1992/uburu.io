import React, { Component } from "react";
import DatePicker from "react-date-picker";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import TopBar from "../../../components/UI/JS/topbar";
import Shell from "../../../components/AddPatientData/JS/shell";

//style
import styles from "../CSS/add_patient_data.module.css";
import styles2 from "../CSS/medical_history.module.css";

class InvestigationHistory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			investigation: "",
			report: "",
			date: "",
			entry: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.resetRecord = this.resetRecord.bind(this);
		this.submitRecord = this.submitRecord.bind(this);
		this.continue = this.continue.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	handleChange(name, e) {
		let value;

		if (name === "date") {
			value = e;
		} else {
			value = e.target.value;
		}

		this.setState(() => ({ [name]: value }));
	}

	resetRecord() {
		this.setState({
			investigation: "",
			report: "",
			date: "",
			entry: ""
		});
	}

	submitRecord(e, recordName) {
		if (e) e.preventDefault();
		let localStorageValue =
			localStorage.getItem(recordName) &&
			JSON.parse(localStorage.getItem(recordName));
		if (localStorageValue) {
			localStorageValue.push(this.state);
			const lSValueStringified = JSON.stringify(localStorageValue);
			localStorage.setItem(recordName, lSValueStringified);
			this.resetRecord();
		} else {
			localStorage.setItem(recordName, `${JSON.stringify([this.state])}`);
			this.resetRecord();
		}
	}

	continue(recordName) {
		const { investigation, report, date, entry } = this.state;

		if (investigation && (report || entry) && date) {
			this.submitRecord(null, recordName);
			this.props.history.push("/add_patient_data/treatment_outcome");
		} else {
			this.props.history.push("/add_patient_data/treatment_outcome");
		}
	}

	render() {
		const { investigation, report, date, entry } = this.state;
		return (
			<>
				<TopBar hide_on_small_screens />
				<SecondaryBar page_title="Investigation History Data" shadow />
				<Shell>
					<form
						className={styles.form}
						onSubmit={(e) => this.submitRecord(e, "Investigation")}
					>
						<div className={styles.fields}>
							<div>
								<label htmlFor="investigation">
									Investigation
								</label>
								<select
									id="investigation"
									name="investigation"
									className={styles.input}
									value={investigation}
									onChange={(e) =>
										this.handleChange("investigation", e)
									}
									required
								>
									<option></option>
									<option>FBS</option>
									<option>RBS</option>
									<option>HbA1</option>
									<option>Total Cholesterol</option>
									<option>Triglyceride Level</option>
									<option>HDL-C</option>
									<option>LDL-C</option>
									<option>Serum Creatinine</option>
									<option>eGFR</option>
									<option>
										Total white blood cell count
									</option>
									<option>Neutrophil count</option>
									<option>Lymphocyte count</option>
									<option>Monocyte count</option>
									<option>Eosinophil count</option>
									<option>Basophil count</option>
									<option>Red blood cell count</option>
									<option>Haemoglobin</option>
									<option>Platelet count</option>
									<option>Urine Protein</option>
									<option>
										Vibration Perception Threshold (VPT)
									</option>
								</select>
							</div>
							<div>
								<label
									className={
										!investigation ? "disabled_label" : ""
									}
									htmlFor="entry"
								>
									{investigation === ""
										? "Entry"
										: investigation === "FBS" ||
										  investigation === "RBS"
										? "Entry (unit: mg/dl)"
										: investigation ===
												"Total Cholesterol" ||
										  investigation ===
												"Triglyceride Level" ||
										  investigation === "HDL-C" ||
										  investigation === "LDL-C"
										? "Entry (unit: mmol/L)"
										: investigation === "Serum Creatinine"
										? "Entry (unit: um/L)"
										: investigation === "eGFR"
										? "Entry (unit: mL/min/1.73m2)"
										: investigation ===
										  "Total white blood cell count"
										? "Entry (unit: 109/L)"
										: investigation ===
										  "Red blood cell count"
										? "Entry (unit: M/µL)"
										: investigation === "Haemoglobin"
										? "Entry (unit: g/dl)"
										: investigation === "Platelet count"
										? "Entry  (unit: 109/L)"
										: investigation === "Urine Protein"
										? "Entry (unit: +)"
										: investigation ===
										  "Vibration Perception Threshold (VPT)"
										? "Entry (unit: mV)"
										: "Entry (unit: %)"}
								</label>

								<input
									id="entry"
									type="number"
									name="entry"
									className={styles.input}
									value={entry}
									onChange={(e) =>
										this.handleChange("entry", e)
									}
									disabled={!investigation}
								/>
							</div>
							<div>
								<label
									className={!report ? "disabled_label" : ""}
								>
									Date of Record
								</label>
								<DatePicker
									name="date"
									className={styles.input}
									onChange={(e) =>
										this.handleChange("date", e)
									}
									value={date}
									format="dd/MM/y"
									required
									disabled={!report && !entry}
								/>
							</div>
							<button
								type="submit"
								className={
									!investigation ||
									(!report && !entry) ||
									!date
										? styles2.submit_btn_disabled
										: styles2.submit_btn
								}
								disabled={
									!investigation ||
									(!report && !entry) ||
									!date
								}
							>
								Add New Record
							</button>
						</div>
						<div className={styles.btn_area}>
							<button
								className="secondary_btn"
								type="button"
								onClick={() => this.props.history.goBack()}
							>
								Back
							</button>
							<button
								className="primary_btn"
								type="button"
								onClick={() =>
									this.continue("investigation_history")
								}
							>
								Continue to Treatment Outcome
							</button>
						</div>
					</form>
				</Shell>
			</>
		);
	}
}

export default InvestigationHistory;
