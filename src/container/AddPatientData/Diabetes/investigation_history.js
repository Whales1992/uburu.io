import React, { Component } from "react";
import localForage from "localforage";
import DatePicker from "react-date-picker";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import TopBar from "../../../components/UI/JS/topbar";
import Shell from "../../../components/AddPatientData/JS/shell";

//style
import styles from "../CSS/add_patient_data.module.css";
import styles2 from "../CSS/medical_history.module.css";

const url = process.env.REACT_APP_BASE_URL;

class InvestigationHistory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Investigation: "",
			RecordDate: "",
			Entry: ""
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

		if (name === "RecordDate") {
			value = e;
		} else {
			value = e.target.value;
		}

		this.setState(() => ({ [name]: value }));
	}

	resetRecord() {
		this.setState({
			Investigation: "",
			RecordDate: "",
			Entry: ""
		});
	}

	async submitRecord(e, recordName) {
		if (e) e.preventDefault();
		const { Investigation, RecordDate, Entry } = this.state;

		const modifiedRecord = {
			Investigation,
			Entry,
			RecordDate,
			FolderNo: this.props.location.state,
			Type: recordName
		};

		if (window.navigator.onLine) {
			try {
				this.resetRecord();
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
				this.resetRecord();
			} catch (error) {
				console.log(error);
			}
		}
	}

	continue(recordName) {
		const { Investigation, RecordDate, Entry } = this.state;

		if (Investigation && Entry && RecordDate) {
			this.submitRecord(null, recordName);
			this.props.history.push(
				"/add_patient_data/treatment_outcome",
				this.props.location.state
			);
		} else {
			this.props.history.push(
				"/add_patient_data/treatment_outcome",
				this.props.location.state
			);
		}
	}

	render() {
		const { Investigation, RecordDate, Entry } = this.state;
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
								<label htmlFor="Investigation">
									Investigation
								</label>
								<select
									id="Investigation"
									name="Investigation"
									className={styles.input}
									value={Investigation}
									onChange={(e) =>
										this.handleChange("Investigation", e)
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
										!Investigation ? "disabled_label" : ""
									}
									htmlFor="Entry"
								>
									{Investigation === ""
										? "Entry"
										: Investigation === "FBS" ||
										  Investigation === "RBS"
										? "Entry (unit: mg/dl)"
										: Investigation ===
												"Total Cholesterol" ||
										  Investigation ===
												"Triglyceride Level" ||
										  Investigation === "HDL-C" ||
										  Investigation === "LDL-C"
										? "Entry (unit: mmol/L)"
										: Investigation === "Serum Creatinine"
										? "Entry (unit: um/L)"
										: Investigation === "eGFR"
										? "Entry (unit: mL/min/1.73m2)"
										: Investigation ===
										  "Total white blood cell count"
										? "Entry (unit: 109/L)"
										: Investigation ===
										  "Red blood cell count"
										? "Entry (unit: M/µL)"
										: Investigation === "Haemoglobin"
										? "Entry (unit: g/dl)"
										: Investigation === "Platelet count"
										? "Entry  (unit: 109/L)"
										: Investigation === "Urine Protein"
										? "Entry (unit: +)"
										: Investigation ===
										  "Vibration Perception Threshold (VPT)"
										? "Entry (unit: mV)"
										: "Entry (unit: %)"}
								</label>

								<input
									id="Entry"
									type="number"
									name="Entry"
									className={styles.input}
									value={Entry}
									onChange={(e) =>
										this.handleChange("Entry", e)
									}
									disabled={!Investigation}
								/>
							</div>
							<div>
								<label
									className={!Entry ? "disabled_label" : ""}
								>
									RecordDate of Record
								</label>
								<DatePicker
									name="RecordDate"
									className={styles.input}
									onChange={(e) =>
										this.handleChange("RecordDate", e)
									}
									value={RecordDate}
									format="dd/MM/y"
									required
									disabled={!Entry}
								/>
							</div>
							<button
								type="submit"
								className={
									!Investigation || !Entry || !RecordDate
										? styles2.submit_btn_disabled
										: styles2.submit_btn
								}
								disabled={
									!Investigation || !Entry || !RecordDate
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
								onClick={() => this.continue("Investigation")}
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
