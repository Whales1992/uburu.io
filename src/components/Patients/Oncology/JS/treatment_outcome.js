import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-date-picker";
// import localForage from "localforage";
import SecondaryBar from "../../../UI/JS/secondary_navbar";
import TopBar from "../../../UI/JS/topbar";
import Shell from "../../JS/detail_shell";

//style
import styles from "../../../../container/AddPatientData/CSS/add_patient_data.module.css";
// import styles2 from "../../../../container/AddPatientData/CSS/medical_history.module.css";

const TreatmentOutcome = () => {
	const patient = useLocation().state;
	const treatmentOutcome =
		patient.records &&
		patient.records.filter((patient) => patient.Type === "Treatment");

	const [values, changeValues] = useState({
		Status: treatmentOutcome ? treatmentOutcome.Status : "",
		StatusDate: treatmentOutcome ? treatmentOutcome.StatusDate : ""
	});

	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		treatmentOutcome: "",
	// 		date: ""
	// 	};

	// 	this.handleChange = this.handleChange.bind(this);
	// 	this.update = this.update.bind(this);
	// }

	// componentDidMount() {
	// 	window.scrollTo(0, 0);
	// 	const { TreatmentOutcome } = this.props.location.state;

	// 	this.setState({
	// 		treatmentOutcome: TreatmentOutcome[0].treatmentOutcome,
	// 		date: TreatmentOutcome[0].date
	// 	});
	// }

	function handleChange(name, e) {
		let value;

		if (name === "date") {
			value = e;
		} else {
			value = e.target.value;
		}

		changeValues({ ...values, [name]: value });
	}

	function update(e) {
		e.preventDefault();
		// const state = this.state;

		// localForage
		// 	.setItem(this.patient.FolderNo, {
		// 		...this.props.location.state,
		// 		TreatmentOutcome: [{ state }]
		// 	})
		// 	.then(() =>
		// 		this.props.history.push(`/patients/${this.patient.FolderNo}`)
		// 	);
	}

	return (
		<>
			<TopBar hide_on_small_screens />
			<SecondaryBar page_title="Treatment Outcome" shadow />
			<Shell name={`${patient.LastName} ${patient.FirstName}`}>
				<form
					className={styles.form}
					onSubmit={(e) => update(e, "Treatment")}
				>
					<div className={styles.fields}>
						<div>
							<label htmlFor="outcome">Status</label>
							<select
								id="outcome"
								name="treatment outcome"
								className={styles.input}
								value={values.Status}
								onChange={(e) => handleChange("Status", e)}
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
									!values.Status ? "disabled_label" : ""
								}
							>
								Status Date
							</label>
							<DatePicker
								name="date"
								className={styles.input}
								onChange={(e) => handleChange("StatusDate", e)}
								value={values.StatusDate}
								format="dd/MM/y"
								required
								disabled={!values.Status}
							/>
						</div>
					</div>
					<div className={styles.btn_area}>
						<button
							className="primary_btn"
							type="submit"
							disabled={values.Status && !values.StatusDate}
							onClick={() => this.createPatient("Treatment")}
						>
							Update Treatment Outcome
						</button>
					</div>
				</form>
			</Shell>
		</>
	);
};

export default TreatmentOutcome;
