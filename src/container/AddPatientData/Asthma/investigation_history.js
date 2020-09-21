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
			other_report: "",
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
			other_report: "",
			date: "",
			entry: ""
		});
	}

	submitRecord(e, recordName) {
		if (e) e.preventDefault();
		let localStorageValue =
			localStorage.getItem(recordName) &&
			JSON.parse(localStorage.getItem(recordName));

		const modifiedValues = {
			...this.state,
			report:
				this.state.report === "Others"
					? this.state.other_report
					: this.state.report
		};

		delete modifiedValues.other_report;

		if (localStorageValue) {
			localStorageValue.push(modifiedValues);
			const lSValueStringified = JSON.stringify(localStorageValue);
			localStorage.setItem(recordName, lSValueStringified);
			this.resetRecord();
		} else {
			localStorage.setItem(
				recordName,
				`${JSON.stringify([modifiedValues])}`
			);
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
		const { investigation, report, other_report, date, entry } = this.state;
		return (
			<>
				<TopBar hide_on_small_screens />
				<SecondaryBar page_title="Investigation History Data" shadow />
				<Shell>
					<form
						className={styles.form}
						onSubmit={(e) =>
							this.submitRecord(e, "investigation_history")
						}
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
									<option>Chest X-ray</option>
									<option>CT-Scan</option>
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
									<option>Peak Expiratory Flow Rate</option>
									<option>Pre-bronchodilator FEV1</option>
									<option>Pre-bronchodilator FEV1/FVC</option>
									<option>Post-bronchodilator FEV1</option>
									<option>
										Post-bronchodilator FEV1/FVC
									</option>
								</select>
							</div>
							<div>
								<label
									className={
										!investigation ? "disabled_label" : ""
									}
									htmlFor={
										investigation === "CT-Scan" ||
										investigation ===
											"Total white blood cell count" ||
										investigation === "Neutrophil count" ||
										investigation === ""
											? "entry"
											: "report"
									}
								>
									{investigation ===
									"Total white blood cell count"
										? "Entry (unit: 10^9/L)"
										: investigation === "Platelet count"
										? "Report (unit: 10^9/L)"
										: investigation ===
												"Pre-bronchodilator FEV1" ||
										  investigation ===
												"Post-bronchodilator FEV1"
										? "Report (unit: L)"
										: investigation ===
												"Pre-bronchodilator FEV1/FVC" ||
										  investigation ===
												"Post-bronchodilator FEV1/FVC"
										? "Report"
										: investigation ===
										  "Red blood cell count"
										? "Report (unit: M/µL)"
										: investigation === "Haemoglobin"
										? "Report (unit: g/dl)"
										: investigation === "Neutrophil count"
										? "Entry (unit: %)"
										: "Report (unit: %)"}
								</label>
								{investigation === "Chest X-ray" ? (
									<select
										id="report"
										name="report"
										className={styles.input}
										value={report}
										onChange={(e) =>
											this.handleChange("report", e)
										}
										required
									>
										<option></option>
										<option>Hyperinflated</option>
										<option>Bronchiectasis</option>
										<option>Collapse</option>
										<option>
											Bronchial wall Thickening
										</option>
										<option>Opacification</option>
										<option>Others</option>
									</select>
								) : investigation === "CT-Scan" ||
								  investigation === "" ? (
									<textarea
										id="entry"
										type="text"
										name="entry"
										placeholder="...type entry diagnosis"
										className={styles.textarea}
										value={entry}
										onChange={(e) =>
											this.handleChange("entry", e)
										}
										disabled={!investigation}
									/>
								) : (
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
								)}
							</div>
							<div>
								{report === "Others" ? (
									<textarea
										id="other_report"
										type="text"
										name="other_report"
										placeholder="...type other report"
										className={styles.textarea}
										value={other_report}
										onChange={(e) =>
											this.handleChange("other_report", e)
										}
										disabled={!investigation}
									/>
								) : null}
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
