import React, { Component } from "react";
import DatePicker from "react-date-picker";
// import localforage from "localforage";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import TopBar from "../../../components/UI/JS/topbar";
import Shell from "../../../components/AddPatientData/JS/shell";

//style
import styles from "../CSS/add_patient_data.module.css";
import styles2 from "../CSS/medical_history.module.css";

const url = process.env.REACT_APP_BASE_URL;

class TreatmentOutcome extends Component {
	constructor(props) {
		super(props);

		this.state = {
			Outcome: "",
			RecordDate: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.resetRecord = this.resetRecord.bind(this);
		this.submitRecord = this.submitRecord.bind(this);
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
			Outcome: "",
			RecordDate: ""
		});
	}

	async submitRecord(e, recordName) {
		if (e) e.preventDefault();

		const modifiedRecord = {
			...this.state,
			Type: recordName,
			FolderNo: this.props.location.state
		};

		if (window.navigator.onLine) {
			try {
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
					throw Error(error.error);
				}
				this.resetRecord();
				this.props.history.push("/add_patient_data/patient_biodata");
			} catch (err) {
				console.log(err.message);
			}
		} else {
			let localStorageValue =
				localStorage.getItem(recordName) &&
				JSON.parse(localStorage.getItem(recordName));
			if (localStorageValue) {
				localStorageValue.push(this.state);
				const lSValueStringified = JSON.stringify(localStorageValue);
				localStorage.setItem(recordName, lSValueStringified);
				this.resetRecord();
				this.props.history.push("/add_patient_data/patient_biodata");
			} else {
				localStorage.setItem(
					recordName,
					`${JSON.stringify([this.state])}`
				);
				this.resetRecord();
				this.props.history.push("/add_patient_data/patient_biodata");
			}
		}
	}

	render() {
		const { Outcome, RecordDate } = this.state;
		return (
			<>
				<TopBar hide_on_small_screens />
				<SecondaryBar page_title="Outcome Outcome" shadow />
				<Shell>
					<form
						className={styles.form}
						onSubmit={(e) => this.submitRecord(e, "Treatment")}
					>
						<div className={styles.current_style}>
							Outcome Outcome
						</div>
						<div className={styles.fields}>
							<div>
								<label htmlFor="outcome">Outcome Outcome</label>
								<select
									id="outcome"
									name="treatment outcome"
									className={styles.input}
									value={Outcome}
									onChange={(e) =>
										this.handleChange("Outcome", e)
									}
									required
								>
									<option></option>
									<option>Good Clinical Response</option>
									<option>Poor Clinical Response</option>
									<option>Disease Progression</option>
									<option>Died on Outcome</option>
									<option>Died after Outcome</option>
								</select>
							</div>
							<div>
								<label
									className={!Outcome ? "disabled_label" : ""}
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
									disabled={!Outcome}
								/>
							</div>
						</div>
						<button
							type="submit"
							className={
								!Outcome || !RecordDate
									? styles2.submit_btn_disabled
									: styles2.submit_btn
							}
							disabled={!Outcome || !RecordDate}
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
								disabled={Outcome && !RecordDate}
								onClick={() =>
									this.submitRecord(null, "Treatment")
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
