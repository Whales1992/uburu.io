import React, { Component } from "react";
import localForage from "localforage";
import DatePicker from "react-RecordDate-picker";
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
			Report: "",
			other_report: "",
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
			Report: "",
			other_report: "",
			RecordDate: "",
			Entry: ""
		});
	}

	async submitRecord(e, recordName) {
		if (e) e.preventDefault();
		const {
			Investigation,
			Report,
			other_report,
			Entry,
			RecordDate
		} = this.state;

		const modifiedRecord = {
			Investigation,
			Report: other_report ? other_report : Report,
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
		const { Investigation, Report, RecordDate, Entry } = this.state;

		if (Investigation && (Report || Entry) && RecordDate) {
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
		const {
			Investigation,
			Report,
			other_report,
			RecordDate,
			Entry
		} = this.state;
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
										!Investigation ? "disabled_label" : ""
									}
									htmlFor={
										Investigation === "CT-Scan" ||
										Investigation ===
											"Total white blood cell count" ||
										Investigation === "Neutrophil count" ||
										Investigation === ""
											? "Entry"
											: "Report"
									}
								>
									{Investigation ===
									"Total white blood cell count"
										? "Entry (unit: 10^9/L)"
										: Investigation === "Platelet count"
										? "Report (unit: 10^9/L)"
										: Investigation ===
												"Pre-bronchodilator FEV1" ||
										  Investigation ===
												"Post-bronchodilator FEV1"
										? "Report (unit: L)"
										: Investigation ===
												"Pre-bronchodilator FEV1/FVC" ||
										  Investigation ===
												"Post-bronchodilator FEV1/FVC"
										? "Report"
										: Investigation ===
										  "Red blood cell count"
										? "Report (unit: M/µL)"
										: Investigation === "Haemoglobin"
										? "Report (unit: g/dl)"
										: Investigation === "Neutrophil count"
										? "Entry (unit: %)"
										: "Report (unit: %)"}
								</label>
								{Investigation === "Chest X-ray" ? (
									<select
										id="Report"
										name="Report"
										className={styles.input}
										value={Report}
										onChange={(e) =>
											this.handleChange("Report", e)
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
								) : Investigation === "CT-Scan" ||
								  Investigation === "" ? (
									<textarea
										id="Entry"
										type="text"
										name="Entry"
										placeholder="...type Entry diagnosis"
										className={styles.textarea}
										value={Entry}
										onChange={(e) =>
											this.handleChange("Entry", e)
										}
										disabled={!Investigation}
									/>
								) : (
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
								)}
							</div>
							<div>
								{Report === "Others" ? (
									<textarea
										id="other_report"
										type="text"
										name="other_report"
										placeholder="...type other Report"
										className={styles.textarea}
										value={other_report}
										onChange={(e) =>
											this.handleChange("other_report", e)
										}
										disabled={!Investigation}
									/>
								) : null}
							</div>
							<div>
								<label
									className={!Report ? "disabled_label" : ""}
								>
									Date of Record
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
									disabled={!Report && !Entry}
								/>
							</div>
							<button
								type="submit"
								className={
									!Investigation ||
									(!Report && !Entry) ||
									!RecordDate
										? styles2.submit_btn_disabled
										: styles2.submit_btn
								}
								disabled={
									!Investigation ||
									(!Report && !Entry) ||
									!RecordDate
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
