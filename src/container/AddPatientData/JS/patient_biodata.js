import React, { Component } from "react";
import DatePicker from "react-date-picker";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import Shell from "../../../components/AddPatientData/JS/shell";
import TopBar from "../../../components/UI/JS/topbar";

//style
import styles from "../CSS/patient_biodata.module.css";

class PatientBiodata extends Component {
	constructor(props) {
		super(props);

		this.state = {
			surname: localStorage.surname || "",
			first_name: localStorage.first_name || "",
			date_of_birth: localStorage.date_of_birth || new Date(),
			phone_number: localStorage.phone_number || "",
			next_of_kin_phone_number:
				localStorage.next_of_kin_phone_number || "",
			gender: localStorage.gender || "",
			hospital_number: localStorage.hospital_number || "",
			occupation: localStorage.occupation || "",
			marital_status: localStorage.marital_status || "",
			ethnic_group: localStorage.ethnic_group || "",
			religion: localStorage.religion || "",
			address: localStorage.address || "",
			residence: localStorage.residence || "",
			highest_education: localStorage.highest_education || "",
			family_history_of_cancer:
				localStorage.family_history_of_cancer === "true" ? true : false,
			relationship: localStorage.relationship || "",
			oncology_diagnosis: localStorage.oncology_diagnosis || "",
			referring_hospital: localStorage.referring_hospital || "",
			doctors_address: localStorage.doctors_address || "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	handleChange(e) {
		const target = e.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		this.setState(() => ({ [name]: value }));
		localStorage.setItem(`${name}`, `${value}`);
		if (
			name === "family_history_of_cancer" &&
			!this.state.family_history_of_cancer
		) {
			this.setState({ relationship: "" });
			localStorage.removeItem("relationship");
		}
	}

	handleDateChange(name, date) {
		this.setState({ [name]: date });
	}

	render() {
		const {
			surname,
			first_name,
			date_of_birth,
			phone_number,
			next_of_kin_phone_number,
			gender,
			hospital_number,
			occupation,
			marital_status,
			ethnic_group,
			religion,
			relationship,
			address,
			residence,
			highest_education,
			family_history_of_cancer,
			oncology_diagnosis,
			referring_hospital,
			doctors_address,
		} = this.state;
		return (
			<>
				<TopBar hide_on_small_screens />
				<SecondaryBar shadow page_title="Add Patient Data (1/4)" />
				<Shell>
					<form className={styles.form}>
						<div className={styles.current_style}>
							Patient Biodata
						</div>
						<div className={styles.fields}>
							<div>
								<label>Surname</label>
								<input
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
								<label>First Name</label>
								<input
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
								<label>Date of Birth</label>
								<DatePicker
									name="date_of_birth"
									className={styles.input}
									onChange={(e) =>
										this.handleDateChange(
											"date_of_birth",
											e
										)
									}
									value={date_of_birth}
									format="dd MMMM y"
									clearIcon={null}
									required
								/>
							</div>
							<div>
								<label>Phone Number</label>
								<input
									name="phone_number"
									type="number"
									onChange={(e) => this.handleChange(e)}
									value={phone_number}
									className={styles.input}
									placeholder="Enter phone number"
									required
								/>
							</div>
							<div>
								<label>Next of Kin's Phone Number</label>
								<input
									name="next_of_kin_phone_number"
									type="number"
									onChange={(e) => this.handleChange(e)}
									value={next_of_kin_phone_number}
									className={styles.input}
									placeholder="Enter next of kin's phone number"
								/>
							</div>
							<div>
								<label>Gender</label>
								<select
									name="gender"
									value={gender}
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
								<label>Hospital Number</label>
								<input
									name="hospital_number"
									type="number"
									onChange={(e) => this.handleChange(e)}
									value={hospital_number}
									className={styles.input}
									placeholder="Enter hospital number"
								/>
							</div>
							<div>
								<label>Occupation</label>
								<input
									type="text"
									name="occupation"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={occupation}
									placeholder="Enter patient's occupation"
								/>
							</div>
							<div>
								<label>Marital Status</label>
								<select
									name="marital_status"
									value={marital_status}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
								>
									<option></option>
									<option>Married/co-habiting</option>
									<option>Single</option>
									<option>Widow/Widower</option>
									<option>Divorced/Separated</option>
								</select>
							</div>
							<div>
								<label>Ethnic Group</label>
								<select
									name="ethnic_group"
									value={ethnic_group}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
								>
									<option></option>
									<option>Igbo</option>
									<option>Hausa</option>
									<option>Yoruba</option>
									<option>Others</option>
								</select>
							</div>
							<div>
								<label>Religion</label>
								<input
									type="text"
									name="religion"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={religion}
									placeholder="Enter patient's religion"
								/>
							</div>
							<div>
								<label>Address</label>
								<input
									type="text"
									name="address"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={address}
									placeholder="Enter patient's address"
								/>
							</div>
							<div>
								<label>Residence</label>
								<select
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
								<label>Highest Education</label>
								<select
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
							<div className={styles.checkbox_div}>
								<span>Cancer History</span>
								<input
									id="cancer_history"
									type="checkbox"
									name="family_history_of_cancer"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									checked={family_history_of_cancer}
								/>
							</div>
							{family_history_of_cancer ? (
								<div>
									<fieldset className={styles.conditionals}>
										<label>Relationship</label>
										<select
											name="relationship"
											value={relationship}
											onChange={(e) =>
												this.handleChange(e)
											}
											className={styles.input}
										>
											<option></option>
											<option>1st Degree</option>
											<option>2nd Degree</option>
										</select>
									</fieldset>
								</div>
							) : null}
							<div>
								<label>Oncology Diagnosis</label>
								<input
									type="text"
									name="oncology_diagnosis"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={oncology_diagnosis}
									placeholder="Enter oncology diagnosis"
								/>
							</div>
							<div>
								<label>Referring Hospital</label>
								<input
									type="text"
									name="referring_hospital"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={referring_hospital}
									placeholder="Enter patient's referring hospital"
								/>
							</div>
							<div>
								<label>Doctor's Address</label>
								<input
									type="text"
									name="doctors_address"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={doctors_address}
									placeholder="Enter patient's doctor's address"
								/>
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
									!gender ||
									!date_of_birth
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
									!gender ||
									!date_of_birth
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
			</>
		);
	}
}

export default PatientBiodata;
