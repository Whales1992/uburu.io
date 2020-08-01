import React, { Component } from "react";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import Shell from "../../../components/AddPatientData/JS/shell";
import TopBar from "../../../components/UI/JS/topbar";
import BottomBar from "../../../components/UI/JS/bottom_toolbar";

//style
import styles from "../CSS/patient_biodata.module.css";

const url = "https://api.notitiang.com";

class PatientBiodata extends Component {
	constructor(props) {
		super(props);

		this.state = {
			biodata: {
				surname: JSON.parse(localStorage.bio_data).surname || "",
				first_name: JSON.parse(localStorage.bio_data).first_name || "",
				phone_number:
					JSON.parse(localStorage.bio_data).phone_number || "",
				next_of_kin_phone_number:
					JSON.parse(localStorage.bio_data)
						.next_of_kin_phone_number || "",
				folder_number:
					JSON.parse(localStorage.bio_data).folder_number || "",
				sex: JSON.parse(localStorage.bio_data).sex || "",
				age: JSON.parse(localStorage.bio_data).age || "",
				marital_status:
					JSON.parse(localStorage.bio_data).marital_status || "",
				occupation: JSON.parse(localStorage.bio_data).occupation || "",
				ethnic_group:
					JSON.parse(localStorage.bio_data).ethnic_group || "",
				religion: JSON.parse(localStorage.bio_data).religion || "",
				residence: JSON.parse(localStorage.bio_data).residence || "",
				highest_education:
					JSON.parse(localStorage.bio_data).highest_education || "",
				alcohol_use:
					JSON.parse(localStorage.bio_data).alcohol_use || "",
				alcohol_frequency:
					JSON.parse(localStorage.bio_data).alcohol_frequency || "",
				family_history_of_asthma:
					JSON.parse(localStorage.bio_data)
						.family_history_of_asthma || "",
				age_of_onset:
					JSON.parse(localStorage.bio_data).age_of_onset || "",
				triggers: JSON.parse(localStorage.bio_data).triggers || ""
			},
			//end of parameters
			submitting: false
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const target = e.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		this.setState(
			(state) => ({ biodata: { ...state.biodata, [name]: value } }),
			() =>
				localStorage.setItem(
					"bio_data",
					JSON.stringify(this.state.biodata)
				)
		);
	}

	async skipCreate(e) {
		e.preventDefault();
		this.setState({ submitting: true });
		const {
			surname,
			first_name,
			phone_number,
			next_of_kin_phone_number,
			folder_number,
			sex,
			age,
			marital_status,
			occupation,
			ethnic_group,
			religion,
			residence,
			highest_education,
			alcohol_frequency,
			alcohol_use,
			family_history_of_asthma,
			age_of_onset,
			triggers
		} = this.state.biodata;
		try {
			const request = await fetch(`${url}/publish/skip_create/`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorisation: `Bearer ${localStorage.accessToken}`
				},
				body: JSON.stringify({
					profile: {
						Surname: surname,
						FirstName: first_name,
						PhoneNumber: phone_number,
						KinsNumber: next_of_kin_phone_number,
						Gender: sex,
						Age: age,
						MaritalStatus: marital_status,
						Occupation: occupation,
						EthnicGroup: ethnic_group,
						Religion: religion,
						Residence: residence,
						HighestEducation: highest_education
					},
					patient: {
						FolderNumber: folder_number,
						AlcoholUse:
							alcohol_use === "Yes"
								? alcohol_frequency
								: alcohol_use,
						CancerHistory: family_history_of_asthma,
						AgeOfOnset: age_of_onset,
						Triggers: triggers
					}
				})
			});

			if (!request.ok) {
				this.setState({ submitting: false });
				const error = await request.json();
				throw Error(error.Message);
			}

			const data = await request.json();
			console.log(data);
		} catch (err) {
			this.props.errorHandler(err);
		}
	}

	render() {
		const {
			surname,
			first_name,
			phone_number,
			next_of_kin_phone_number,
			folder_number,
			sex,
			age,
			marital_status,
			occupation,
			ethnic_group,
			religion,
			residence,
			highest_education,
			alcohol_use,
			alcohol_frequency,
			family_history_of_asthma,
			age_of_onset,
			triggers
		} = this.state.biodata;

		return (
			<>
				<TopBar hide_on_small_screens />
				<SecondaryBar shadow page_title="Add Patient Data (1/4)" />
				<Shell>
					<form className={styles.form}>
						<h3 className={styles.current_style}>
							Patient Biodata
						</h3>
						<div className={styles.fields}>
							<div>
								<label htmlFor="name">Surname</label>
								<input
									id="name"
									type="text"
									name="surname"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={surname}
									placeholder="Enter patient's surname"
									required
								/>
							</div>
							<div>
								<label htmlFor="first_name">First Name</label>
								<input
									id="first_name"
									type="text"
									name="first_name"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={first_name}
									placeholder="Enter patient's first name"
									required
								/>
							</div>
							<div>
								<label htmlFor="phone_number">
									Phone Number
								</label>
								<input
									id="phone_number"
									name="phone_number"
									type="tel"
									onChange={(e) => this.handleChange(e)}
									value={phone_number}
									className={styles.input}
									placeholder="Enter phone number"
									minLength="11"
									maxLength="11"
									required
								/>
							</div>
							<div>
								<label htmlFor="next_of_kin_phone_number">
									Next of Kin's Phone Number
								</label>
								<input
									id="next_of_kin_phone_number"
									name="next_of_kin_phone_number"
									type="tel"
									onChange={(e) => this.handleChange(e)}
									value={next_of_kin_phone_number}
									className={styles.input}
									placeholder="Enter next of kin's phone number"
									minLength="11"
									maxLength="11"
									required
								/>
							</div>
							<div>
								<label htmlFor="folder_number">
									Folder Number
								</label>
								<input
									id="folder_number"
									name="folder_number"
									type="number"
									onChange={(e) => this.handleChange(e)}
									value={folder_number}
									className={styles.input}
									placeholder="Enter folder number"
									required
								/>
							</div>
							<div>
								<label htmlFor="sex">Sex</label>
								<select
									id="sex"
									name="sex"
									value={sex}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									required
								>
									<option></option>
									<option>Female</option>
									<option>Male</option>
								</select>
							</div>
							<div>
								<label htmlFor="age">Age</label>
								<input
									id="age"
									name="age"
									type="tel"
									onChange={(e) => this.handleChange(e)}
									value={age}
									className={styles.input}
									placeholder="Enter phone number"
									minLength="1"
									maxLength="3"
									required
								/>
							</div>
							<div>
								<label htmlFor="marital_status">
									Marital Status
								</label>
								<select
									id="marital_status"
									name="marital_status"
									value={marital_status}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									required
								>
									<option></option>
									<option>Married/co-habiting</option>
									<option>Single</option>
									<option>Widow/Widower</option>
									<option>Divorced/Separated</option>
								</select>
							</div>
							<div>
								<label htmlFor="occupation">Occupation</label>
								<select
									id="occupation"
									name="occupation"
									value={occupation}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									required
								>
									<option></option>
									<option>Professional</option>
									<option>Skilled Manual Labour</option>
									<option>Unskilled</option>
								</select>
							</div>
							<div>
								<label htmlFor="ethnic_group">
									Ethnic Group
								</label>
								<select
									id="ethnic_group"
									name="ethnic_group"
									value={ethnic_group}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									required
								>
									<option></option>
									<option>Igbo</option>
									<option>Hausa</option>
									<option>Yoruba</option>
								</select>
							</div>
							<div>
								<label htmlFor="religion">Religion</label>
								<select
									id="religion"
									name="religion"
									value={religion}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									required
								>
									<option></option>
									<option>Roman Catholic</option>
									<option>Pentecostal</option>
									<option>Anglican</option>
									<option>Jehovah Witness</option>
									<option>Islam</option>
								</select>
							</div>
							<div>
								<label htmlFor="residence">Residence</label>
								<select
									id="residence"
									name="residence"
									value={residence}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
								>
									<option></option>
									<option>Rural</option>
									<option>Urban</option>
								</select>
							</div>
							<div>
								<label htmlFor="highest_education">
									Highest Education
								</label>
								<select
									id="highest_education"
									name="highest_education"
									value={highest_education}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
								>
									<option></option>
									<option>None</option>
									<option>Primary</option>
									<option>Secondary</option>
									<option>Tertiary</option>
								</select>
							</div>
							<div>
								<label htmlFor="alcohol_use">Alcohol Use</label>
								<select
									id="alcohol_use"
									name="alcohol_use"
									value={alcohol_use}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
								>
									<option></option>
									<option>Yes</option>
									<option>No</option>
								</select>
							</div>
							{alcohol_use === "Yes" ? (
								<div>
									<label htmlFor="alcohol_frequency">
										Alcohol Frequency (bottles per week)
									</label>
									<input
										id="alcohol_frequency"
										type="number"
										name="alcohol_frequency"
										className={styles.input}
										onChange={(e) => this.handleChange(e)}
										value={alcohol_frequency}
										placeholder="Bottles per week"
									/>
								</div>
							) : null}
							<div>
								<label htmlFor="family_history_of_asthma">
									Family History of Asthma
								</label>
								<select
									id="family_history_of_asthma"
									name="family_history_of_asthma"
									value={family_history_of_asthma}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
								>
									<option></option>
									<option>Yes</option>
									<option>No</option>
								</select>
							</div>
							<div>
								<label htmlFor="age_of_onset">
									Age of Onset
								</label>
								<input
									id="age_of_onset"
									name="age_of_onset"
									type="number"
									onChange={(e) => this.handleChange(e)}
									value={age_of_onset}
									className={styles.input}
									placeholder="Enter age of onset in years"
									minLength="1"
									maxLength="3"
								/>
							</div>
							<div>
								<label htmlFor="triggers">Triggers</label>
								<select
									id="triggers"
									name="triggers"
									value={triggers}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
								>
									<option></option>
									<option>Smoke/Fumes</option>
									<option>Drugs</option>
									<option>Foods/Drinks</option>
									<option>Weather</option>
									<option>Infection</option>
									<option>Exercise</option>
									<option>Pollen</option>
									<option>Pets</option>
								</select>
							</div>
						</div>
						<div className={styles.btn_area}>
							<button
								className="secondary_btn"
								type="submit"
								disabled={
									!surname ||
									!first_name ||
									!phone_number ||
									!sex ||
									!age ||
									!next_of_kin_phone_number ||
									!folder_number ||
									!marital_status ||
									!occupation ||
									!ethnic_group ||
									!religion
										? true
										: false
								}
							>
								Skip to Create Profile
							</button>
							<button
								className="primary_btn"
								type="button"
								disabled={
									!surname ||
									!first_name ||
									!phone_number ||
									!sex ||
									!age ||
									!next_of_kin_phone_number ||
									!folder_number ||
									!marital_status ||
									!occupation ||
									!ethnic_group ||
									!religion ||
									!residence ||
									!highest_education ||
									!alcohol_use ||
									!family_history_of_asthma ||
									!age_of_onset ||
									!triggers ||
									(alcohol_use === "Yes" &&
										!alcohol_frequency)
										? true
										: false
								}
								onClick={() =>
									this.props.history.push(
										"/add_patient_data/medical_history"
									)
								}
							>
								Continue Data Input
							</button>
						</div>
					</form>
				</Shell>
				<BottomBar />
			</>
		);
	}
}

export default PatientBiodata;
