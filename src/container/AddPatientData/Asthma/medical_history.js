import React, { Component } from "react";
import DatePicker from "react-date-picker";
import localForage from "localforage";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import TopBar from "../../../components/UI/JS/topbar";
import Shell from "../../../components/AddPatientData/JS/shell";

//style
import styles from "../CSS/add_patient_data.module.css";
import styles2 from "../CSS/medical_history.module.css";

const upArrow = (
	<svg width="5" height="6" viewBox="0 0 5 6" fill="none">
		<path
			d="M0.460845 2.64645C0.145863 2.96143 0.368947 3.5 0.814399 3.5H4.1856C4.63106 3.5 4.85414 2.96143 4.53916 2.64645L2.85355 0.960843C2.65829 0.765581 2.34171 0.765581 2.14645 0.960844L0.460845 2.64645Z"
			fill="#333F6B"
		/>
	</svg>
);

const downArrow = (
	<svg width="7" height="6" viewBox="0 0 7 6" fill="none">
		<path
			d="M1.07515 3.35355C0.760168 3.03857 0.983251 2.5 1.4287 2.5H5.5713C6.01675 2.5 6.23983 3.03857 5.92485 3.35355L3.85355 5.42485C3.65829 5.62011 3.34171 5.62011 3.14645 5.42485L1.07515 3.35355Z"
			fill="#333F6B"
		/>
	</svg>
);

const url = process.env.REACT_APP_BASE_URL;

class MedicalHistoryData extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Nature: "",
			Description: "",
			Other: "",
			Value: "",
			RecordDate: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.resetRecord = this.resetRecord.bind(this);
		this.submitRecord = this.submitRecord.bind(this);
		this.continue = this.continue.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	handleDateChange(name, date) {
		this.setState({ [name]: date });
	}

	resetRecord() {
		this.setState({
			Nature: "",
			Description: "",
			Other: "",
			Value: "",
			RecordDate: ""
		});
	}

	handleChange(e) {
		const target = e.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}

	async submitRecord(e, recordName) {
		if (e) e.preventDefault();
		const { Nature, Description, Value, RecordDate, Other } = this.state;

		const modifiedRecord = {
			Nature,
			Description: Description === "Other" ? Other : Description,
			Duration: Value,
			RecordDate: RecordDate,
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
		const { Nature, Description, Value, RecordDate } = this.state;

		if (Nature && Description && Value && RecordDate) {
			this.submitRecord(null, recordName);
			this.props.history.push(
				"/add_patient_data/drug_history",
				this.props.location.state
			);
		} else {
			this.props.history.push(
				"/add_patient_data/drug_history",
				this.props.location.state
			);
		}
	}

	render() {
		const { Nature, Description, Value, RecordDate, Other } = this.state;
		return (
			<>
				<TopBar hide_on_small_screens />
				<SecondaryBar page_title="Medical History Data" shadow />
				<Shell
					reset={this.resetRecord}
					render={(activeRecord, toggleRecord) => (
						<div className={styles2.container}>
							<button
								aria-pressed={activeRecord === "Assessment"}
								className={[
									styles2.toggle_record,
									styles2.assessment_toggle
								].join(" ")}
								onClick={() => toggleRecord("Assessment")}
							>
								<span>Assessment Record</span>
								{activeRecord === "Assessment"
									? upArrow
									: downArrow}
							</button>
							{activeRecord === "Assessment" && (
								<form
									className={[
										styles.form,
										styles2.no_margin_top
									].join(" ")}
									onSubmit={(e) =>
										this.submitRecord(e, activeRecord)
									}
								>
									<h2 className={styles2.h2}>
										Assessment Record
									</h2>
									<div className={styles.fields}>
										<div>
											<label htmlFor="Nature">
												Nature
											</label>
											<select
												id="Nature"
												name="Nature"
												className={styles.input}
												value={Nature}
												onChange={(e) =>
													this.handleChange(e)
												}
												required
											>
												<option></option>
												<option>
													Day Time Symptoms
												</option>
												<option>
													Night Time Symptoms
												</option>
												<option>Atopic Symptoms</option>
												<option>Co-morbidity</option>
												<option>Examination </option>
												<option>
													Asthma Control Test
												</option>
												<option>Dyspnea Scale</option>
											</select>
										</div>
										<div>
											<label
												className={
													!Nature
														? "disabled_label"
														: ""
												}
												htmlFor="Description"
											>
												Description
											</label>
											<select
												id="Description"
												name="Description"
												className={styles.input}
												value={Description}
												onChange={(e) =>
													this.handleChange(e)
												}
												required
												disabled={!Nature}
											>
												<option></option>
												{Nature ===
												"Day Time Symptoms" ? (
													<>
														<option>
															Shortness of Breath
														</option>
														<option>
															Chest Pain
														</option>
														<option>Cough</option>
														<option>
															Haemoptysis
														</option>
														<option>
															Chest tightness
														</option>
														<option>
															Sputum Production
														</option>
														<option>Wheeze</option>
													</>
												) : Nature ===
												  "Night Time Symptoms" ? (
													<>
														<option>
															Shortness of Breath
														</option>
														<option>
															Chest Pain
														</option>
														<option>Cough</option>
														<option>
															Haemoptysis
														</option>
														<option>
															Chest tightness
														</option>
													</>
												) : Nature ===
												  "Atopic Symptoms" ? (
													<>
														<option>
															Rhinitis
														</option>
														<option>
															Hay Fever
														</option>
														<option>Eczema</option>
													</>
												) : Nature ===
												  "Co-morbidity" ? (
													<>
														<option>
															Obstructive sleep
															Apnea
														</option>
														<option>
															Allergic Rhinitis
														</option>
														<option>GERD</option>
														<option>Obesity</option>
														<option>
															Hypertension
														</option>
														<option>
															Hypertensive heart
															disease
														</option>
														<option>
															Diabetes
														</option>
														<option>Stroke</option>
														<option>
															Chronic kidney
															disease
														</option>
														<option>Other</option>
													</>
												) : Nature === "Examination" ? (
													<>
														<option>
															Systolic BP
														</option>
														<option>
															Diastolic BP
														</option>
														<option>Weight</option>
														<option>Height</option>
														<option>
															Pulse Rate
														</option>
														<option>
															Respiratory Rate
														</option>
														<option>Thrush</option>
														<option>
															Reduced Breath
															Sounds
														</option>
													</>
												) : Nature ===
												  "Asthma Control Test" ? (
													<>
														<option>
															Asthma Control Scale
														</option>
													</>
												) : (
													<>
														<option>
															mMRC Dyspnea Grade
														</option>
													</>
												)}
											</select>
										</div>
										<div>
											<label
												className={
													!Description
														? "disabled_label"
														: ""
												}
												htmlFor="Value"
											>
												{Nature ===
													"Day Time Symptoms" ||
												Nature ===
													"Night Time Symptoms" ||
												Nature === "Atopic Symptoms"
													? "Duration"
													: Description ===
															"Systolic BP" ||
													  Description ===
															"Diastolic BP"
													? "Entry (unit: mmHg)"
													: Description === "Weight"
													? "Entry (unit: Kg)"
													: Description === "Height "
													? "Entry (unit: m)"
													: Description ===
													  "Pulse Rate"
													? "Entry (unit: /min)"
													: Description ===
													  "Respiratory Rate"
													? "Entry (unit: bpm)"
													: "Entry"}
											</label>
											{Description === "Thrush" ||
											Description ===
												"Reduced Breath Sounds" ? (
												<select
													id="Value"
													name="Value"
													className={styles.input}
													value={Value}
													onChange={(e) =>
														this.handleChange(e)
													}
													required
													disabled={!Description}
												>
													<option></option>
													<option>Present</option>
												</select>
											) : Description ===
											  "Asthma Control Test" ? (
												<select
													id="Value"
													name="Value"
													className={styles.input}
													value={Value}
													onChange={(e) =>
														this.handleChange(e)
													}
													required
													disabled={!Description}
												>
													<option></option>
													<option>
														Total Control
													</option>
													<option>
														Partial Control
													</option>
													<option>
														Uncontrolled
													</option>
												</select>
											) : Description ===
											  "Dyspnea Scale" ? (
												<select
													id="Value"
													name="Value"
													className={styles.input}
													value={Value}
													onChange={(e) =>
														this.handleChange(e)
													}
													required
													disabled={!Description}
												>
													<option></option>
													<option>Grade 0</option>
													<option>Grade 1</option>
													<option>Grade 2</option>
													<option>Grade 3</option>
													<option>Grade 4</option>
												</select>
											) : (
												<input
													id="Value"
													type="number"
													name="Value"
													className={styles.input}
													value={Value}
													onChange={(e) =>
														this.handleChange(e)
													}
													disabled={!Description}
												/>
											)}
										</div>
										{Description === "Other" ? (
											<div>
												<label
													className={
														!Nature
															? "disabled_label"
															: ""
													}
													htmlFor="Other"
												>
													Other Co-morbidity
												</label>
												<input
													id="Other"
													type="text"
													name="Other"
													placeholder="Type in other Description"
													className={styles.input}
													value={Other}
													onChange={(e) =>
														this.handleChange(e)
													}
													disabled={!Nature}
												/>
											</div>
										) : null}
										<div>
											<label
												className={
													!Value
														? "disabled_label"
														: ""
												}
												htmlFor="RecordDate"
											>
												RecordDate of Record
											</label>
											<DatePicker
												id="RecordDate"
												name="RecordDate"
												value={RecordDate}
												className={styles.input}
												onChange={(e) =>
													this.handleDateChange(
														"RecordDate",
														e
													)
												}
												required
												format="dd/MM/y"
												disabled={!Value}
											/>
										</div>
										<button
											type="submit"
											className={
												!Nature ||
												!Description ||
												!Value ||
												!RecordDate
													? styles2.submit_btn_disabled
													: styles2.submit_btn
											}
											disabled={
												!Nature ||
												!Description ||
												!Value ||
												!RecordDate
											}
										>
											Add New Record
										</button>
									</div>
								</form>
							)}

							{/* Beginning of Care Record Form */}
							<button
								className={[
									styles2.toggle_record,
									styles2.care_toggle
								].join(" ")}
								aria-pressed={activeRecord === "Care"}
								onClick={() => toggleRecord("Care")}
							>
								<span>Care Record</span>
								{activeRecord === "Care" ? upArrow : downArrow}
							</button>
							{activeRecord === "Care" && (
								<form
									className={[
										styles.form,
										styles2.no_margin_top
									].join(" ")}
									onSubmit={(e) =>
										this.submitRecord(e, activeRecord)
									}
								>
									<h2 className={styles2.h2}>Care Record</h2>
									<div className={styles.fields}>
										<div>
											<label htmlFor="Nature">
												Nature
											</label>
											<select
												id="Nature"
												name="Nature"
												className={styles.input}
												value={Nature}
												onChange={(e) =>
													this.handleChange(e)
												}
												required
											>
												<option></option>
												<option>Hospitalization</option>
												<option>
													Blood Transfusion
												</option>
											</select>
										</div>
										<div>
											<label
												className={
													!Nature
														? "disabled_label"
														: ""
												}
												htmlFor="Description"
											>
												Description
											</label>
											<select
												id="Description"
												name="Description"
												className={styles.input}
												value={Description}
												onChange={(e) =>
													this.handleChange(e)
												}
												required
												disabled={!Nature}
											>
												<option></option>
												{Nature ===
												"Hospitalization" ? (
													<>
														<option>
															Non-emergency
														</option>
														<option>
															Emergency
														</option>
														<option>
															Intensive Care
														</option>
													</>
												) : (
													<>
														<option>
															Whole Blood
														</option>
														<option>
															Packed Red Blood
															Cells
														</option>
														<option>
															Fresh Frozen Plasma
														</option>
														<option>
															Platelets
														</option>
														<option>
															Cryoprecipitate
														</option>
														<option>
															Granulocytes
														</option>
													</>
												)}
											</select>
										</div>
										<div>
											<label
												className={
													!Description
														? "disabled_label"
														: ""
												}
												htmlFor="Value"
											>
												{Nature === "Hospitalization"
													? "Duration"
													: "Entry (All unit: mls)"}
											</label>
											<input
												id="Value"
												type="number"
												name="Value"
												className={styles.input}
												value={Value}
												onChange={(e) =>
													this.handleChange(e)
												}
												disabled={!Description}
											/>
										</div>
										<div>
											<label
												className={
													!Value
														? "disabled_label"
														: ""
												}
												htmlFor="RecordDate"
											>
												RecordDate of Record
											</label>
											<DatePicker
												id="RecordDate"
												name="RecordDate"
												value={RecordDate}
												className={styles.input}
												onChange={(e) =>
													this.handleDateChange(
														"RecordDate",
														e
													)
												}
												required
												format="dd/MM/y"
												disabled={!Value}
											/>
										</div>
										<button
											type="submit"
											className={
												!Nature ||
												!Description ||
												!Value ||
												!RecordDate
													? styles2.submit_btn_disabled
													: styles2.submit_btn
											}
											disabled={
												!Nature ||
												!Description ||
												!Value ||
												!RecordDate
											}
										>
											Add New Record
										</button>
									</div>
								</form>
							)}

							{/* Beginning of Complication Record. */}
							<button
								className={[
									styles2.toggle_record,
									styles2.complication_toggle
								].join(" ")}
								aria-pressed={activeRecord === "Complication"}
								onClick={() => toggleRecord("Complication")}
							>
								<span>Complication Record</span>
								{activeRecord === "Complication"
									? upArrow
									: downArrow}
							</button>
							{activeRecord === "Complication" && (
								<form
									className={[
										styles.form,
										styles2.no_margin_top
									].join(" ")}
									onSubmit={(e) =>
										this.submitRecord(e, activeRecord)
									}
								>
									<h2 className={styles2.h2}>
										Complication Record
									</h2>
									<div className={styles.fields}>
										<div>
											<label htmlFor="Nature">
												Nature
											</label>
											<select
												id="Nature"
												name="Nature"
												className={styles.input}
												value={Nature}
												onChange={(e) =>
													this.handleChange(e)
												}
												required
											>
												<option></option>
												<option>
													Acute Complication
												</option>
												<option>
													Chronic Complication
												</option>
											</select>
										</div>
										<div>
											<label
												className={
													!Nature
														? "disabled_label"
														: ""
												}
												htmlFor="Description"
											>
												Description
											</label>
											<select
												id="Description"
												name="Description"
												className={styles.input}
												value={Description}
												onChange={(e) =>
													this.handleChange(e)
												}
												required
												disabled={!Nature}
											>
												<option></option>
												{Nature ===
												"Acute Complication" ? (
													<>
														<option>
															Acute Severe Asthma
														</option>
														<option>
															Pneumonia
														</option>
													</>
												) : (
													<>
														<option>
															Pneumonia
														</option>
														<option>COPD</option>
														<option>
															Atelectasis
														</option>
														<option>
															Respiratory Failure
														</option>
													</>
												)}
											</select>
										</div>
										<div>
											<label
												className={
													!Description
														? "disabled_label"
														: ""
												}
												htmlFor="Value"
											>
												Value
											</label>
											<input
												id="Value"
												type="number"
												name="Value"
												className={styles.input}
												value={Value}
												onChange={(e) =>
													this.handleChange(e)
												}
												disabled={!Description}
											/>
										</div>
										<div>
											<label
												className={
													!Value
														? "disabled_label"
														: ""
												}
												htmlFor="RecordDate"
											>
												RecordDate of Record
											</label>
											<DatePicker
												id="RecordDate"
												name="RecordDate"
												value={RecordDate}
												className={styles.input}
												onChange={(e) =>
													this.handleDateChange(
														"RecordDate",
														e
													)
												}
												required
												format="dd/MM/y"
												disabled={!Value}
											/>
										</div>
										<button
											type="submit"
											className={
												!Nature ||
												!Description ||
												!Value ||
												!RecordDate
													? styles2.submit_btn_disabled
													: styles2.submit_btn
											}
											disabled={
												!Nature ||
												!Description ||
												!Value ||
												!RecordDate
											}
										>
											Add New Record
										</button>
									</div>
								</form>
							)}
							<div className={styles.btn_area}>
								<button
									className={[
										"secondary_btn",
										styles2.buttons
									].join(" ")}
									type="button"
									onClick={() => this.props.history.goBack()}
								>
									Back
								</button>
								<button
									className={[
										"primary_btn",
										styles2.buttons
									].join(" ")}
									type="button"
									onClick={() => this.continue(activeRecord)}
								>
									Continue to Drug History
								</button>
							</div>
						</div>
					)}
				/>
			</>
		);
	}
}

export default MedicalHistoryData;
