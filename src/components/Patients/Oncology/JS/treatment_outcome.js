import React, { Component } from "react";
import DatePicker from "react-date-picker";
import localForage from "localforage";
import SecondaryBar from "../../../UI/JS/secondary_navbar";
import TopBar from "../../../UI/JS/topbar";
import Shell from "../../JS/detail_shell";

//style
import styles from "../../../../container/AddPatientData/CSS/add_patient_data.module.css";
// import styles2 from "../../../../container/AddPatientData/CSS/medical_history.module.css";

class TreatmentOutcome extends Component {
	constructor(props) {
		super(props);

		this.state = {
			treatmentOutcome: "",
			date: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.update = this.update.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		const { TreatmentOutcome } = this.props.location.state;

		this.setState({
			treatmentOutcome: TreatmentOutcome[0].treatmentOutcome,
			date: TreatmentOutcome[0].date
		});
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

	update(e) {
		e.preventDefault();
		const { bioData } = this.props.location.state;
		const state = this.state;

		localForage
			.setItem(bioData.folder_number, {
				...this.props.location.state,
				TreatmentOutcome: [{ state }]
			})
			.then(() =>
				this.props.history.push(`/patients/${bioData.folder_number}`)
			);
	}

	render() {
		const { treatmentOutcome, date } = this.state;
		return (
			<>
				<TopBar hide_on_small_screens />
				<SecondaryBar page_title="Treatment Outcome" shadow />
				<Shell
					name={`${this.props.location.state.bioData.surname} ${this.props.location.state.bioData.first_name}`}
				>
					<form
						className={styles.form}
						onSubmit={(e) =>
							this.submitRecord(e, "Treatment_Outcome")
						}
					>
						<div className={styles.fields}>
							<div>
								<label htmlFor="outcome">Status</label>
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
									Status Date
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
						<div className={styles.btn_area}>
							<button
								className="primary_btn"
								type="submit"
								disabled={treatmentOutcome && !date}
								onClick={() =>
									this.createPatient("Treatment_Outcome")
								}
							>
								Update Treatment Outcome
							</button>
						</div>
					</form>
				</Shell>
			</>
		);
	}
}

export default TreatmentOutcome;
