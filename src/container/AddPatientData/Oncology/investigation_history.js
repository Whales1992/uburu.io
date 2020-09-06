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
									<option>Ultrasound</option>
									<option>CT-Scan</option>
									<option>Full Blood Count</option>
									<option>CA 15-3</option>
									<option>CA 125</option>
									<option>CA 27-29</option>
									<option>CEA</option>
									<option>PSA</option>
								</select>
							</div>
							<div>
								<label
									className={
										!investigation ? "disabled_label" : ""
									}
									htmlFor={
										investigation === "Chest X-ray" ||
										investigation === "Ultrasound" ||
										investigation === "CT-Scan" ||
										investigation === ""
											? "Report"
											: "entry"
									}
								>
									{investigation === "Chest X-ray" ||
									investigation === "Ultrasound" ||
									investigation === "CT-Scan" ||
									investigation === ""
										? "Report"
										: `Entry (unit: ${
												investigation ===
												"Full Blood Count"
													? "mls"
													: investigation === "CEA" ||
													  investigation === "PSA"
													? "ng/mL"
													: "U/mL"
										  })`}
								</label>
								{investigation === "Chest X-ray" ||
								investigation === "Ultrasound" ||
								investigation === "CT-Scan" ||
								investigation === "" ? (
									<textarea
										id="report"
										type="text"
										name="report"
										placeholder="Type in report"
										className={styles.textarea}
										value={report}
										onChange={(e) =>
											this.handleChange("report", e)
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
