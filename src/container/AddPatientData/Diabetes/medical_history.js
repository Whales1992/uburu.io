import React, { Component } from "react";
import localForage from "localforage";
import DatePicker from "react-date-picker";
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
			Value: "",
			Date: ""
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
			Value: "",
			Date: ""
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
		const { Nature, Description, Value, Date } = this.state;

		const modifiedRecord = {
			Nature,
			Description,
			Duration: Value,
			RecordDate: Date,
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
		const { Nature, Description, Value, Date } = this.state;

		if (Nature && Description && Value && Date) {
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
		const { Nature, Description, Value, Date } = this.state;
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
												<option>Core Symptoms</option>
												<option>Co-morbidity</option>
												<option>Examination</option>
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
												{Nature === "Core Symptoms" ? (
													<>
														<option>
															Polyuria
														</option>
														<option>
															Polydipsia
														</option>
														<option>
															Weight Loss
														</option>
														<option>
															Polyphagia
														</option>
														<option>
															Dry Mouth
														</option>
														<option>
															Visual Disturbances
														</option>
													</>
												) : Nature ===
												  "Co-morbidity" ? (
													<>
														<option>
															Osteoarthritis
														</option>
														<option>
															Hypertension
														</option>
														<option>
															Thyroid Disease
														</option>
														<option>Asthma</option>
														<option>
															Dementia
														</option>
														<option>GERD</option>
													</>
												) : (
													<>
														<option>
															Systolic BP (unit:
															mmHg)
														</option>
														<option>
															Diastolic BP (unit:
															mmHg)
														</option>
														<option>
															Weight (unit: Kg)
														</option>
														<option>
															Height (unit: m)
														</option>
														<option>
															BMI (unit: Kg/m2
														</option>
														<option>
															Pulse Rate
														</option>
														<option>
															Respiratory Rate
															(unit: bpm)
														</option>
														<option>
															Foot Examination
														</option>
														<option>
															Eye Examination
														</option>
														<option>
															Hip Circumference
															(unit: m)
														</option>
														<option>
															Waist Circumference
															(unit: m)
														</option>
														<option>
															Waist-Hip Ratio (no
															unit)
														</option>
														<option>
															Ankle-Brachial Index
															(no unit)
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
												{Nature === "Examination"
													? "Entry"
													: "Duration"}
											</label>
											{Description ===
												"Foot Examination" ||
											Description ===
												"Eye Examination" ? (
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
													<option>Yes</option>
													<option>No</option>
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
										<div>
											<label
												className={
													!Value
														? "disabled_label"
														: ""
												}
												htmlFor="Date"
											>
												Date of Record
											</label>
											<DatePicker
												id="Date"
												name="Date"
												value={Date}
												className={styles.input}
												onChange={(e) =>
													this.handleDateChange(
														"Date",
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
												!Date
													? styles2.submit_btn_disabled
													: styles2.submit_btn
											}
											disabled={
												!Nature ||
												!Description ||
												!Value ||
												!Date
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
												<option>Surgery</option>
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
												) : Nature === "Surgery" ? (
													<>
														<option>
															Amputation
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
													: "Entry"}
											</label>
											{Description === "Amputation" ? (
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
														Ray Amputation left foot
													</option>
													<option>
														Ray Amputation Right
														foot
													</option>
													<option>Right Foot</option>
													<option>Left Foot</option>
													<option>
														Right Below Knee
													</option>
													<option>
														Left Below Knee
													</option>
													<option>
														Right Above Knee
													</option>
													<option>
														Left Above Knee
													</option>
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
													placeholder={
														Nature ===
														"Blood Transfusion"
															? "unit: mls"
															: ""
													}
												/>
											)}
										</div>
										<div>
											<label
												className={
													!Value
														? "disabled_label"
														: ""
												}
												htmlFor="Date"
											>
												Date of Record
											</label>
											<DatePicker
												id="Date"
												name="Date"
												value={Date}
												className={styles.input}
												onChange={(e) =>
													this.handleDateChange(
														"Date",
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
												!Date
													? styles2.submit_btn_disabled
													: styles2.submit_btn
											}
											disabled={
												!Nature ||
												!Description ||
												!Value ||
												!Date
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
															Hypoglycemia
														</option>
														<option>DKA</option>
														<option>HHS</option>
													</>
												) : (
													<>
														<option>
															Fetal Macrosomia
														</option>
														<option>UTI</option>
														<option>
															Still Birth
														</option>
														<option>
															Miscarriage
														</option>
														<option>
															Retinopathy
														</option>
														<option>
															Nephropathy
														</option>
														<option>
															Gastric Autonomic
															Neuropathy
														</option>
														<option>
															Cardiac Autonomic
															Neuropathy
														</option>
														<option>
															Peripheral
															Neuropathy
														</option>
														<option>
															Foot Ulcer
														</option>
														<option>
															Coronary Heart
															Disease
														</option>
														<option>
															Heart Failure
														</option>
														<option>
															Erectile Dysfunction
														</option>
														<option>Stroke</option>
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
												Entry
											</label>
											<input
												id="Value"
												type="text"
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
												htmlFor="Date"
											>
												Date of Record
											</label>
											<DatePicker
												id="Date"
												name="Date"
												value={Date}
												className={styles.input}
												onChange={(e) =>
													this.handleDateChange(
														"Date",
														e
													)
												}
												required
												format="dd/MM/y"
											/>
										</div>
										<button
											type="submit"
											className={
												!Nature ||
												!Description ||
												!Value ||
												!Date
													? styles2.submit_btn_disabled
													: styles2.submit_btn
											}
											disabled={
												!Nature ||
												!Description ||
												!Value ||
												!Date
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
