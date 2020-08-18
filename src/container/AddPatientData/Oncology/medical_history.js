import React, { Component } from "react";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import TopBar from "../../../components/UI/JS/topbar";
import Shell from "../../../components/AddPatientData/JS/shell";

//style
import styles from "../CSS/add_patient_data.module.css";

class MedicalHistoryData extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clinical_diagnosis: localStorage.clinical_diagnosis || "",
			past_admissions:
				localStorage.past_admissions === "true" ? true : false,
			admission_diagnosis: localStorage.admission_diagnosis || "",
			blood_transfusion: localStorage.blood_transfusion || "",
			any_surgery: localStorage.any_surgery === "true" ? true : false,
			surgery_modality: localStorage.surgery_modality || "",
			history_of_NCD: localStorage.history_of_NCD || "",
			chemotherapy: localStorage.chemotherapy === "true" ? true : false,
			regimen: localStorage.regimen || "",
			first_line: localStorage.first_line === "true" ? true : false,
			second_line: localStorage.second_line === "true" ? true : false,
			third_line: localStorage.third_line === "true" ? true : false,
			hormonal_therapy:
				localStorage.hormonal_therapy === "true" ? true : false,
			drug_name: localStorage.drug_name || "",
			drug_dose: localStorage.drug_dose || "",
			drug_duration: localStorage.drug_duration || "",
			targeted_therapy:
				localStorage.targeted_therapy === "true" ? true : false,
			targeted_therapy_drug_name:
				localStorage.targeted_therapy_drug_name || "",
			targeted_therapy_drug_dose:
				localStorage.targeted_therapy_drug_dose || "",
			targeted_therapy_drug_duration:
				localStorage.targeted_therapy_drug_duration || "",
			past_radiotherapy:
				localStorage.past_radiotherapy === "true" ? true : false,
			dose: localStorage.dose || "",
			duration: localStorage.duration || "",
			how_long_ago: localStorage.how_long_ago || "",
			other_treatments: localStorage.other_treatments || "",
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
		this.setState({ [name]: value });
		localStorage.setItem(`${name}`, `${value}`);
		if (name === "past_admissions" && !this.state.past_admissions) {
			this.setState({
				admission_diagnosis: "",
				blood_transfusion: "",
				any_surgery: "",
				surgery_modality: "",
			});
			localStorage.removeItem("admission_diagnosis");
			localStorage.removeItem("blood_transfusion");
			localStorage.removeItem("any_surgery");
			localStorage.removeItem("surgery_modality");
		}
		if (name === "any_surgery" && !this.state.any_surgery) {
			this.setState({
				surgery_modality: "",
			});
			localStorage.removeItem("surgery_modality");
		}
		if (name === "chemotherapy" && !this.state.chemotherapy) {
			this.setState({
				regimen: "",
				first_line: "",
				second_line: "",
				third_line: "",
			});
			localStorage.removeItem("regimen");
			localStorage.removeItem("first_line");
			localStorage.removeItem("second_line");
			localStorage.removeItem("third_line");
		}
		if (name === "hormonal_therapy" && !this.state.hormonal_therapy) {
			this.setState({ drug_name: "", drug_dose: "", drug_duration: "" });
			localStorage.removeItem("drug_name");
			localStorage.removeItem("drug_dose");
			localStorage.removeItem("drug_duration");
		}
		if (name === "targeted_therapy" && !this.state.targeted_therapy) {
			this.setState({
				targeted_therapy_drug_name: "",
				targeted_therapy_drug_dose: "",
				targeted_therapy_drug_duration: "",
			});
			localStorage.removeItem("targeted_therapy_drug_name");
			localStorage.removeItem("targeted_therapy_drug_dose");
			localStorage.removeItem("targeted_therapy_drug_duration");
		}
		if (name === "past_radiotherapy" && !this.state.past_radiotherapy) {
			this.setState({ dose: "", duration: "", how_long_ago: "" });
			localStorage.removeItem("dose");
			localStorage.removeItem("duration");
			localStorage.removeItem("how_long_ago");
		}
	}

	render() {
		const {
			clinical_diagnosis,
			past_admissions,
			admission_diagnosis,
			blood_transfusion,
			any_surgery,
			surgery_modality,
			history_of_NCD,
			chemotherapy,
			regimen,
			first_line,
			second_line,
			third_line,
			hormonal_therapy,
			drug_name,
			drug_dose,
			drug_duration,
			targeted_therapy,
			targeted_therapy_drug_name,
			targeted_therapy_drug_dose,
			targeted_therapy_drug_duration,
			past_radiotherapy,
			dose,
			duration,
			how_long_ago,
			other_treatments,
		} = this.state;
		return (
			<>
				<TopBar hide_on_small_screens />
				<SecondaryBar page_title="Add Patient Date (2/4)" shadow />
				<Shell>
					<form className={styles.form}>
						<div className={styles.current_style}>
							Medical History
						</div>
						<div className={styles.fields}>
							<label>Clinical Diagnosis</label>
							<div>
								<select
									name="clinical_diagnosis"
									className={styles.input}
									value={clinical_diagnosis}
									onChange={(e) => this.handleChange(e)}
									required
								>
									<option></option>
									<option>Breast</option>
									<option>Prostate</option>
									<option>Colorectal</option>
									<option>Other</option>
								</select>
							</div>
							<div className={styles.checkbox_div}>
								<span>Past Admissions</span>
								<input
									name="past_admissions"
									type="checkbox"
									className={styles.input}
									checked={past_admissions}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>
							{past_admissions ? (
								<div>
									<fieldset>
										<label>Admission Diagnosis</label>
										<input
											type="text"
											name="admission_diagnosis"
											className={styles.input}
											value={admission_diagnosis}
											onChange={(e) =>
												this.handleChange(e)
											}
										/>
										<label>Blood Transfusion</label>
										<input
											name="blood_transfusion"
											type="text"
											className={styles.input}
											value={blood_transfusion}
											onChange={(e) =>
												this.handleChange(e)
											}
										/>
										<div className={styles.checkbox_div}>
											<span>Any Surgery</span>
											<input
												name="any_surgery"
												type="checkbox"
												className={styles.input}
												checked={any_surgery}
												onChange={(e) =>
													this.handleChange(e)
												}
											/>
										</div>
										{any_surgery ? (
											<fieldset>
												<label>Surgery Modality</label>
												<input
													name="surgery_modality"
													type="text"
													className={styles.input}
													value={surgery_modality}
													onChange={(e) =>
														this.handleChange(e)
													}
												/>
											</fieldset>
										) : null}
									</fieldset>
								</div>
							) : null}
							<div>
								<label>History of NCD</label>
								<select
									name="history_of_NCD"
									className={styles.input}
									value={history_of_NCD}
									onChange={(e) => this.handleChange(e)}
									required
								>
									<option></option>
									<option>Hypertension</option>
									<option>Epilepsy</option>
									<option>Asthma</option>
									<option>Diabetes</option>
									<option>Sickle-Cell Anaemia</option>
									<option>Stroke</option>
								</select>
							</div>
							<div className={styles.checkbox_div}>
								<span>Chemotherapy</span>
								<input
									name="chemotherapy"
									type="checkbox"
									className={styles.input}
									checked={chemotherapy}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>
							{chemotherapy ? (
								<div>
									<fieldset>
										<label>Regimen</label>
										<input
											name="regimen"
											type="text"
											className={styles.input}
											value={regimen}
											onChange={(e) =>
												this.handleChange(e)
											}
										/>
										<div className={styles.checkbox_div}>
											<span>1st Line</span>
											<input
												name="first_line"
												type="checkbox"
												className={styles.input}
												checked={first_line}
												onChange={(e) =>
													this.handleChange(e)
												}
											/>
										</div>
										<div className={styles.checkbox_div}>
											<span>2nd Line</span>
											<input
												name="second_line"
												type="checkbox"
												className={styles.input}
												checked={second_line}
												onChange={(e) =>
													this.handleChange(e)
												}
											/>
										</div>
										<div className={styles.checkbox_div}>
											<span>3rd Line</span>
											<input
												name="third_line"
												type="checkbox"
												className={styles.input}
												checked={third_line}
												onChange={(e) =>
													this.handleChange(e)
												}
											/>
										</div>
									</fieldset>
								</div>
							) : null}
							<div className={styles.checkbox_div}>
								<span>Hormonal Therapy</span>
								<input
									name="hormonal_therapy"
									type="checkbox"
									className={styles.input}
									checked={hormonal_therapy}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>
							{hormonal_therapy ? (
								<div>
									<fieldset>
										<label>Drug Name</label>
										<select
											name="drug_name"
											className={styles.input}
											value={drug_name}
											onChange={(e) =>
												this.handleChange(e)
											}
										>
											<option>Paracetamol</option>
											<option>Panadol</option>
											<option>Codine</option>
											<option>33</option>
										</select>
										<label>Drug Dose</label>
										<input
											name="drug_dose"
											type="text"
											className={styles.input}
											value={drug_dose}
											onChange={(e) =>
												this.handleChange(e)
											}
										/>
										<label>Drug Duration (in months)</label>
										<input
											name="drug_duration"
											type="number"
											className={styles.input}
											value={drug_duration}
											onChange={(e) =>
												this.handleChange(e)
											}
											placeholder="2 months"
										/>
									</fieldset>
								</div>
							) : null}
							<div className={styles.checkbox_div}>
								<span>Targeted Therapy</span>
								<input
									name="targeted_therapy"
									type="checkbox"
									className={styles.input}
									checked={targeted_therapy}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>
							{targeted_therapy ? (
								<div>
									<fieldset>
										<label>
											Targeted Therapy Drug Name
										</label>
										<select
											name="targeted_therapy_drug_name"
											className={styles.input}
											value={targeted_therapy_drug_name}
											onChange={(e) =>
												this.handleChange(e)
											}
										>
											<option>Paracetamol</option>
											<option>Panadol</option>
											<option>Codine</option>
											<option>33</option>
										</select>
										<label>
											Targeted Therapy Drug Dose
										</label>
										<input
											name="targeted_therapy_drug_dose"
											type="text"
											className={styles.input}
											value={targeted_therapy_drug_dose}
											onChange={(e) =>
												this.handleChange(e)
											}
										/>
										<label>
											Targeted Therapy Drug Duration (in
											months)
										</label>
										<input
											name="targeted_therapy_drug_duration"
											type="number"
											className={styles.input}
											value={
												targeted_therapy_drug_duration
											}
											onChange={(e) =>
												this.handleChange(e)
											}
											placeholder="2 months"
										/>
									</fieldset>
								</div>
							) : null}
							<div className={styles.checkbox_div}>
								<span>Past Radiotherapy</span>
								<input
									name="past_radiotherapy"
									type="checkbox"
									className={styles.input}
									checked={past_radiotherapy}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>
							{past_radiotherapy ? (
								<div>
									<fieldset>
										<label>Dose</label>
										<input
											name="dose"
											type="text"
											className={styles.input}
											value={dose}
											onChange={(e) =>
												this.handleChange(e)
											}
										/>
										<label>Duration (in months)</label>
										<input
											name="duration"
											type="number"
											className={styles.input}
											value={duration}
											onChange={(e) =>
												this.handleChange(e)
											}
											placeholder="2 months"
										/>
										<label>How Long Ago (in months)</label>
										<input
											name="how_long_ago"
											type="number"
											className={styles.input}
											value={how_long_ago}
											onChange={(e) =>
												this.handleChange(e)
											}
											placeholder="2 months"
										/>
									</fieldset>
								</div>
							) : null}
							<div>
								<label>Other Treatments</label>
								<input
									name="other_treatments"
									type="text"
									className={styles.input}
									value={other_treatments}
									onChange={(e) => this.handleChange(e)}
								/>
							</div>
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
									this.props.history.push(
										"/add_patient_data/investigation_history"
									)
								}
							>
								Continue Data Input
							</button>
						</div>
					</form>
				</Shell>
			</>
		);
	}
}

export default MedicalHistoryData;
