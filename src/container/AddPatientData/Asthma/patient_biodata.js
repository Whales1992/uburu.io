import React, { Component } from "react";
import localForage from "localforage";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import Shell from "../../../components/AddPatientData/JS/shell";
import TopBar from "../../../components/UI/JS/topbar";
import BottomBar from "../../../components/UI/JS/bottom_toolbar";

//style
import styles from "../CSS/add_patient_data.module.css";

const url = process.env.REACT_APP_BASE_URL;

class PatientBiodata extends Component {
	constructor(props) {
		super(props);

		this.state = {
			biodata: {
				surname:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).surname) ||
					"",
				first_name:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).first_name) ||
					"",
				phone_number:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).phone_number) ||
					"",
				next_of_kin_phone_number:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data)
							.next_of_kin_phone_number) ||
					"",
				relationship_to_next_of_kin:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data)
							.relationship_to_next_of_kin) ||
					"",
				folder_number:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).folder_number) ||
					"",
				sex:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).sex) ||
					"",
				// age:
				// 	(localStorage.bio_data &&
				// 		JSON.parse(localStorage.bio_data).age) ||
				// 	"",
				marital_status:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).marital_status) ||
					"",
				occupation:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).occupation) ||
					"",
				other_occupation:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).other_occupation) ||
					"",
				ethnic_group:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).ethnic_group) ||
					"",
				other_ethnic_group:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).other_ethnic_group) ||
					"",
				religion:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).religion) ||
					"",
				other_religion:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).other_religion) ||
					"",
				residence:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).residence) ||
					"",
				highest_education:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).highest_education) ||
					"",
				alcohol_use:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).alcohol_use) ||
					"",
				alcohol_frequency:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).alcohol_frequency) ||
					"",
				family_history_of_asthma:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data)
							.family_history_of_diabetes) ||
					"",
				age_of_onset:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).age_of_onset) ||
					"",
				triggers:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).triggers) ||
					"",
				other_triggers:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).other_triggers) ||
					""
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
		if (!window.navigator.onLine) {
			localForage
				.setItem(this.state.biodata.folder_number, {
					bioData: {
						...this.state.biodata,
						triggers:
							this.state.biodata.triggers === "Others"
								? this.state.biodata.other_triggers
								: this.state.biodata.triggers,
						occupation:
							this.state.biodata.occupation === "Others"
								? this.state.biodata.other_occupation
								: this.state.biodata.occupation,
						ethnic_group:
							this.state.biodata.ethnic_group === "Others"
								? this.state.biodata.other_ethnic_group
								: this.state.biodata.ethnic_group,
						religion:
							this.state.biodata.religion === "Others"
								? this.state.biodata.other_religion
								: this.state.biodata.religion
					}
				})
				.then((value) => {
					localStorage.removeItem("bio_data");
					this.setState({
						submitting: false,
						biodata: {
							surname: "",
							first_name: "",
							phone_number: "",
							next_of_kin_phone_number: "",
							relationship_to_next_of_kin: "",
							folder_number: "",
							sex: "",
							// age: "",
							marital_status: "",
							triggers: "",
							other_triggers: "",
							occupation: "",
							other_occupation: "",
							ethnic_group: "",
							other_ethnic_group: "",
							religion: "",
							other_religion: "",
							residence: "",
							highest_education: "",
							alcohol_use: "",
							alcohol_frequency: "",
							family_history_of_asthma: "",
							age_of_onset: ""
						}
					});
				})
				.catch((err) => {
					this.setState({ submitting: false });
					console.log(err);
				});
		} else {
			const {
				surname,
				first_name,
				phone_number,
				next_of_kin_phone_number,
				relationship_to_next_of_kin,
				folder_number,
				sex,
				// age,
				marital_status,
				triggers,
				other_triggers,
				occupation,
				other_occupation,
				ethnic_group,
				other_ethnic_group,
				religion,
				other_religion,
				residence,
				highest_education,
				alcohol_frequency,
				alcohol_use,
				family_history_of_asthma,
				age_of_onset
			} = this.state.biodata;
			try {
				const request = await fetch(`${url}/patient`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorisation: `Bearer ${localStorage.accessToken}`
					},
					body: JSON.stringify({
						Surname: surname,
						FirstName: first_name,
						PhoneNumber: phone_number,
						KinsNumber: next_of_kin_phone_number,
						RelationshipToNextOfKin: relationship_to_next_of_kin,
						Gender: sex,
						// Age: age,
						MaritalStatus: marital_status,
						Occupation:
							occupation === "Others"
								? other_occupation
								: occupation,
						EthnicGroup:
							ethnic_group === "Others"
								? other_ethnic_group
								: ethnic_group,
						Religion:
							religion === "Others" ? other_religion : religion,
						Residence: residence,
						HighestEducation: highest_education,
						FolderNumber: folder_number,
						Triggers:
							triggers === "Others" ? other_triggers : triggers,
						AlcoholUse:
							alcohol_use === "Yes"
								? alcohol_frequency
								: alcohol_use,
						AsthmaHistory: family_history_of_asthma,
						AgeOfOnset: age_of_onset
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
	}

	render() {
		const {
			surname,
			first_name,
			phone_number,
			next_of_kin_phone_number,
			relationship_to_next_of_kin,
			folder_number,
			sex,
			// age,
			marital_status,
			triggers,
			other_triggers,
			occupation,
			other_occupation,
			ethnic_group,
			other_ethnic_group,
			religion,
			other_religion,
			residence,
			highest_education,
			alcohol_use,
			alcohol_frequency,
			family_history_of_asthma,
			age_of_onset
		} = this.state.biodata;

		return (
			<>
				<TopBar hide_on_small_screens />
				<SecondaryBar shadow page_title="Bio-Data" />
				<Shell>
					<form className={styles.form}>
						<h3 className={styles.current_style}>
							Patient Biodata
						</h3>
						<div className={styles.fields}>
							<div>
								<label htmlFor="surname">Surname</label>
								<input
									id="surname"
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
								/>
							</div>
							<div>
								<label htmlFor="relationship_to_next_of_kin">
									First Name
								</label>
								<input
									id="relationship_to_next_of_kin"
									type="text"
									name="relationship_to_next_of_kin"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={relationship_to_next_of_kin}
									placeholder="Enter relationship to next of kin"
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
							{/* <div>
								<label htmlFor="age">Age</label>
								<input
									id="age"
									name="age"
									type="number"
									onChange={(e) => this.handleChange(e)}
									value={age}
									className={styles.input}
									placeholder="Enter Age"
									minLength="1"
									maxLength="3"
									required
								/>
							</div> */}
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
									<option>Government employed</option>
									<option>Private sector employed</option>
									<option>Student</option>
									<option>Retired</option>
									<option>Unemployed (able to work)</option>
									<option>Unemployed (Unable to work)</option>
									<option>Others</option>
								</select>
							</div>
							{occupation === "Others" ? (
								<div>
									<label htmlFor="other_occupation">
										Other Occupation
									</label>
									<input
										id="other_occupation"
										name="other_occupation"
										type="text"
										onChange={(e) => this.handleChange(e)}
										value={other_occupation}
										className={styles.input}
										placeholder="Type in other occupation"
										required
									/>
								</div>
							) : null}
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
									<option>Others</option>
								</select>
							</div>
							{ethnic_group === "Others" ? (
								<div>
									<label htmlFor="other_ethnic_group">
										Other Ethnic Group
									</label>
									<input
										id="other_ethnic_group"
										name="other_ethnic_group"
										type="text"
										onChange={(e) => this.handleChange(e)}
										value={other_ethnic_group}
										className={styles.input}
										placeholder="Type in other ethnic group"
										required
									/>
								</div>
							) : null}
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
							{religion === "Others" ? (
								<div>
									<label htmlFor="other_religion">
										Other Religion
									</label>
									<input
										id="other_religion"
										name="other_religion"
										type="text"
										onChange={(e) => this.handleChange(e)}
										value={other_religion}
										className={styles.input}
										placeholder="Type in other religion"
										required
									/>
								</div>
							) : null}
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
									<option>Semi Urban</option>
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
									Age of Onset (in years)
								</label>
								<input
									id="age_of_onset"
									type="number"
									name="age_of_onset"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={age_of_onset}
									placeholder="Type in year"
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
									required
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
									<option>Others</option>
								</select>
							</div>
							{triggers === "Others" ? (
								<div>
									<label htmlFor="other_triggers">
										Other Triggers
									</label>
									<input
										id="other_triggers"
										type="text"
										name="other_triggers"
										className={styles.input}
										onChange={(e) => this.handleChange(e)}
										value={other_triggers}
										placeholder="Type in other triggers"
										required
									/>
								</div>
							) : null}
						</div>
						<div className={styles.btn_area}>
							<button
								className="secondary_btn"
								type="submit"
								disabled={
									!surname ||
									!first_name ||
									!sex ||
									// !age ||
									!relationship_to_next_of_kin ||
									!folder_number ||
									!marital_status ||
									!occupation ||
									(occupation === "Others" &&
										!other_occupation) ||
									!ethnic_group ||
									(ethnic_group === "Others" &&
										!other_ethnic_group) ||
									!religion ||
									(religion === "Others" && !other_religion)
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
									!sex ||
									// !age ||
									!folder_number ||
									!marital_status ||
									!triggers ||
									(triggers === "Others" &&
										!other_triggers) ||
									!occupation ||
									(occupation === "Others" &&
										!other_occupation) ||
									!ethnic_group ||
									(ethnic_group === "Others" &&
										!other_ethnic_group) ||
									!religion ||
									(religion === "Others" &&
										!other_religion) ||
									!residence ||
									!highest_education ||
									!alcohol_use ||
									!family_history_of_asthma ||
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
