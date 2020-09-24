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
			Report: "",
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
			RecordDate: "",
			Entry: ""
		});
	}

	async submitRecord(e, recordName) {
		if (e) e.preventDefault();
		const { Investigation, Report, Entry, RecordDate } = this.state;

		const modifiedRecord = {
			Investigation,
			Report,
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
		const { Investigation, Report, RecordDate, Entry } = this.state;
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
									<option>Ultrasound</option>
									<option>CT-Scan</option>
									<option>
										Total white blood cell count
									</option>
									<option>Lymphocyte count</option>
									<option>Monocyte count</option>
									<option>Basophil count</option>
									<option>Red blood cell count</option>
									<option>Haemoglobin</option>
									<option>Platelet count</option>
									<option>CA 15-3</option>
									<option>CA 125</option>
									<option>CA 19-9</option>
									<option>CA 27-29</option>
									<option>CEA</option>
									<option>PSA</option>
									<option>
										ER Status (Immunohistochemistry)
									</option>
									<option>
										PR Status (Immunohistochemistry)
									</option>
									<option>
										HER 2 Status (Immunohistochemistry)
									</option>
								</select>
							</div>
							<div>
								<label
									className={
										!Investigation ? "disabled_label" : ""
									}
									htmlFor={
										Investigation === "Chest X-ray" ||
										Investigation === "Ultrasound" ||
										Investigation === "CT-Scan" ||
										Investigation === ""
											? "Report"
											: "Entry"
									}
								>
									{Investigation === "Chest X-ray" ||
									Investigation === "Ultrasound" ||
									Investigation === "CT-Scan" ||
									Investigation === ""
										? "Report"
										: `Entry (unit: ${
												Investigation ===
													"Total white blood cell count" ||
												Investigation ===
													"Platelet count"
													? "10^9/L"
													: Investigation ===
													  "Haemoglobin"
													? "g/dl"
													: Investigation ===
													  "Red blood cell count"
													? "M/µL"
													: Investigation ===
															"Lymphocyte count" ||
													  Investigation ===
															"Monocyte count" ||
													  Investigation ===
															"Basophil count"
													? "%"
													: Investigation === "CEA" ||
													  Investigation === "PSA"
													? "ng/mL"
													: "U/mL"
										  })`}
								</label>
								{Investigation === "Chest X-ray" ||
								Investigation === "Ultrasound" ||
								Investigation === "CT-Scan" ||
								Investigation === "" ? (
									<textarea
										id="Report"
										type="text"
										name="Report"
										placeholder="Type in Report"
										className={styles.textarea}
										value={Report}
										onChange={(e) =>
											this.handleChange("Report", e)
										}
										disabled={!Investigation}
									/>
								) : Investigation ===
										"ER Status (Immunohistochemistry)" ||
								  Investigation ===
										"PR Status (Immunohistochemistry)" ||
								  Investigation ===
										"HER 2 Status (Immunohistochemistry)" ? (
									<select
										id="Entry"
										name="Entry"
										className={styles.input}
										value={Entry}
										onChange={(e) =>
											this.handleChange("Entry", e)
										}
										required
									>
										<option></option>
										<option>+ve</option>
										<option>-ve</option>
										<option>Equivocal</option>
									</select>
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
								<label
									className={!Report ? "disabled_label" : ""}
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
