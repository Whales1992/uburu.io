import React, { Component } from "react";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";

//style
import styles from "../CSS/patient_biodata.module.css";

class TreatmentOutcome extends Component {
	constructor(props) {
		super(props);

		this.state = {
			good_clinical_response:
				localStorage.good_clinical_response === "true" ? true : false,
			poor_clinical_response:
				localStorage.poor_clinical_response === "true" ? true : false,
			complete_remission:
				localStorage.complete_remission === "true" ? true : false,
			disease_progression:
				localStorage.disease_progression === "true" ? true : false,
			alive_and_stable:
				localStorage.alive_and_stable === "true" ? true : false,
			died_on_treatment:
				localStorage.died_on_treatment === "true" ? true : false,
			died_after_treatment:
				localStorage.died_after_treatment === "true" ? true : false,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	handleChange(e) {
		const target = e.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		this.setState(() => ({ [name]: value }));
		localStorage.setItem(`${name}`, `${value}`);
	}

	render() {
		const {
			good_clinical_response,
			poor_clinical_response,
			complete_remission,
			disease_progression,
			alive_and_stable,
			died_on_treatment,
			died_after_treatment,
		} = this.state;
		return (
			<>
				<SecondaryBar page_title="Add Patient Data (4/4)" shadow />
				<form className={styles.form}>
					<div className={styles.current_style}>
						Treatment Outcome
					</div>
					<label>Good Clinical Response</label>
					<input
						id="good_clinical_response"
						type="checkbox"
						name="good_clinical_response"
						className={styles.input}
						onChange={(e) => this.handleChange(e)}
						checked={good_clinical_response}
					/>
					<label>Poor Clinical Response</label>
					<input
						id="poor_clinical_response"
						type="checkbox"
						name="poor_clinical_response"
						className={styles.input}
						onChange={(e) => this.handleChange(e)}
						checked={poor_clinical_response}
					/>
					<label>Complete Remission</label>
					<input
						id="complete_remission"
						type="checkbox"
						name="complete_remission"
						className={styles.input}
						onChange={(e) => this.handleChange(e)}
						checked={complete_remission}
					/>
					<label>Disease Progression</label>
					<input
						id="disease_progression"
						type="checkbox"
						name="disease_progression"
						className={styles.input}
						onChange={(e) => this.handleChange(e)}
						checked={disease_progression}
					/>
					<label>Alive and Well</label>
					<input
						id="alive_and_stable"
						type="checkbox"
						name="alive_and_stable"
						className={styles.input}
						onChange={(e) => this.handleChange(e)}
						checked={alive_and_stable}
					/>
					<label>Died on Treatment</label>
					<input
						id="died_on_treatment"
						type="checkbox"
						name="died_on_treatment"
						className={styles.input}
						onChange={(e) => this.handleChange(e)}
						checked={died_on_treatment}
					/>
					<label>Died after Treatment</label>
					<input
						id="died_after_treatment"
						type="checkbox"
						name="died_after_treatment"
						className={styles.input}
						onChange={(e) => this.handleChange(e)}
						checked={died_after_treatment}
					/>
					<div className={styles.btn_area}>
						<button
							className="secondary_btn"
							type="button"
							onClick={() => this.props.history.goBack()}
						>
							Back
						</button>
						<button className="primary_btn" type="submit">
							Submit
						</button>
					</div>
				</form>
			</>
		);
	}
}

export default TreatmentOutcome;
