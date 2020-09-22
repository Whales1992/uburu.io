import React, { Component } from "react";
import DatePicker from "react-date-picker";
import localforage from "localforage";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import TopBar from "../../../components/UI/JS/topbar";
import Shell from "../../../components/AddPatientData/JS/shell";

//style
import styles from "../CSS/add_patient_data.module.css";
import styles2 from "../CSS/medical_history.module.css";

class TreatmentOutcome extends Component {
	constructor(props) {
		super(props);

		this.state = {
			treatmentOutcome: "",
			date: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.resetRecord = this.resetRecord.bind(this);
		this.submitRecord = this.submitRecord.bind(this);
		this.createPatient = this.createPatient.bind(this);
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
			treatmentOutcome: "",
			date: ""
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

	createPatient(recordName) {
		const { treatmentOutcome } = this.state;

		if (treatmentOutcome) {
			this.submitRecord(null, recordName);
		}

		const bioData = JSON.parse(localStorage.getItem("bio_data"));
		const drugHistory = JSON.parse(localStorage.getItem("drug_history"));
		const investigationHistory = JSON.parse(
			localStorage.getItem("investigation_history")
		);
		const TreatmentOutcome = JSON.parse(
			localStorage.getItem("Treatment_Outcome")
		);
		const medicalHistory = {
			Assessment: JSON.parse(localStorage.getItem("Assessment")),
			Care: JSON.parse(localStorage.getItem("Care")),
			Complication: JSON.parse(localStorage.getItem("Complication"))
		};

		let dataObject = {};

		function buildObject() {
			for (let i = 0; i < arguments.length; i++) {
				if (arguments[i] === medicalHistory && medicalHistory) {
					for (const record in medicalHistory) {
						if (record) {
							dataObject = {
								...dataObject,
								MedicalHistory: {
									...dataObject.MedicalHistory,
									[record]: medicalHistory[record]
								}
							};
						} else continue;
					}
				}
				if (arguments[i] === bioData && bioData) {
					dataObject = {
						...dataObject,
						bioData
					};
				} else if (arguments[i] === drugHistory && drugHistory) {
					dataObject = {
						...dataObject,
						drugHistory
					};
				} else if (
					arguments[i] === investigationHistory &&
					investigationHistory
				) {
					dataObject = {
						...dataObject,
						investigationHistory
					};
				} else if (
					arguments[i] === TreatmentOutcome &&
					TreatmentOutcome
				) {
					dataObject = {
						...dataObject,
						TreatmentOutcome
					};
				}
			}
		}

		buildObject(
			bioData,
			drugHistory,
			investigationHistory,
			TreatmentOutcome,
			medicalHistory
		);

		localforage
			.setItem(bioData.folder_number, dataObject)
			.then((value) => {
				localStorage.removeItem("bio_data");
				localStorage.removeItem("drug_history");
				localStorage.removeItem("investigation_history");
				localStorage.removeItem("Treatment_Outcome");
				localStorage.removeItem("Assessment");
				localStorage.removeItem("Care");
				localStorage.removeItem("Complication");
				console.log("Successful!");
				this.props.history.push("/add_patient_data/patient_biodata");
			})
			.catch((err) => err);
	}

	render() {
		const { treatmentOutcome, date } = this.state;
		return (
			<>
				<TopBar hide_on_small_screens />
				<SecondaryBar page_title="Treatment Outcome" shadow />
				<Shell>
					<form
						className={styles.form}
						onSubmit={(e) =>
							this.submitRecord(e, "Treatment")
						}
					>
						<div className={styles.current_style}>
							Treatment Outcome
						</div>
						<div className={styles.fields}>
							<div>
								<label htmlFor="outcome">
									Treatment Outcome
								</label>
								<select
									id="outcome"
									name="treatment outcome"
									className={styles.input}
									value={treatmentOutcome}
									onChange={(e) =>
										this.handleChange("treatmentOutcome", e)
									}
									required
								>
									<option></option>
									<option>Good Clinical Response</option>
									<option>Poor Clinical Response</option>
									<option>Complete Remission</option>
									<option>Disease Progression</option>
									<option>Alive and Stable</option>
									<option>Died on Treatment</option>
									<option>Died after Treatment</option>
								</select>
							</div>
							<div>
								<label
									className={
										!treatmentOutcome
											? "disabled_label"
											: ""
									}
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
									disabled={!treatmentOutcome}
								/>
							</div>
						</div>
						<button
							type="submit"
							className={
								!treatmentOutcome || !date
									? styles2.submit_btn_disabled
									: styles2.submit_btn
							}
							disabled={!treatmentOutcome || !date}
						>
							Add New Record
						</button>
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
								disabled={treatmentOutcome && !date}
								onClick={() =>
									this.createPatient("Treatment_Outcome")
								}
							>
								Submit
							</button>
						</div>
					</form>
				</Shell>
			</>
		);
	}
}

export default TreatmentOutcome;
