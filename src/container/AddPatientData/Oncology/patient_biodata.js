import React, { Component } from "react";
import { connect } from "react-redux";
import localForage from "localforage";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import Shell from "../../../components/AddPatientData/JS/shell";
import TopBar from "../../../components/UI/JS/topbar";
import BottomBar from "../../../components/UI/JS/bottom_toolbar";
import ErrorModal from "../../../components/UI/JS/error_modal";

//action
import { errorHandler } from "../../../actions/general/index";

//style
import styles from "../CSS/add_patient_data.module.css";

// const url = "https://api.notitiang.com";

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
				folder_number:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).folder_number) ||
					"",
				sex:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).sex) ||
					"",
				age:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).age) ||
					"",
				marital_status:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).marital_status) ||
					"",
				organ_diagnosis:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).organ_diagnosis) ||
					"",
				hispathology_diagnosis:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data)
							.hispathology_diagnosis) ||
					"",
				occupation:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).occupation) ||
					"",
				ethnic_group:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).ethnic_group) ||
					"",
				religion:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).religion) ||
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
				family_history_of_cancer:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data)
							.family_history_of_cancer) ||
					""
			},
			//end of parameters
			submitting: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.skipCreate = this.skipCreate.bind(this);
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
		localForage
			.setItem(this.state.biodata.folder_number, {
				bioData: this.state.biodata
			})
			.then((value) => {
				localStorage.removeItem("bio_data");
				console.log("Successful");
				this.setState({
					submitting: false,
					biodata: {
						surname: "",
						first_name: "",
						phone_number: "",
						next_of_kin_phone_number: "",
						folder_number: "",
						sex: "",
						age: "",
						marital_status: "",
						organ_diagnosis: "",
						hispathology_diagnosis: "",
						occupation: "",
						ethnic_group: "",
						religion: "",
						residence: "",
						highest_education: "",
						alcohol_use: "",
						alcohol_frequency: "",
						family_history_of_cancer: ""
					}
				});
			})
			.catch((err) => {
				this.setState({ submitting: false });
				console.log(err);
			});
		// const {
		// 	surname,
		// 	first_name,
		// 	phone_number,
		// 	next_of_kin_phone_number,
		// 	folder_number,
		// 	sex,
		// 	age,
		// 	marital_status,
		// 	organ_diagnosis,
		// 	hispathology_diagnosis,
		// 	occupation,
		// 	ethnic_group,
		// 	religion,
		// 	residence,
		// 	highest_education,
		// 	alcohol_frequency,
		// 	alcohol_use,
		// 	family_history_of_cancer
		// } = this.state.biodata;
		// try {
		// 	const request = await fetch(`${url}/publish/skip_create/`, {
		// 		method: "POST",
		// 		headers: {
		// 			Accept: "application/json",
		// 			"Content-Type": "application/json",
		// 			Authorisation: `Bearer ${localStorage.accessToken}`
		// 		},
		// 		body: JSON.stringify({
		// 			profile: {
		// 				Surname: surname,
		// 				FirstName: first_name,
		// 				PhoneNumber: phone_number,
		// 				KinsNumber: next_of_kin_phone_number,
		// 				Gender: sex,
		// 				Age: age,
		// 				MaritalStatus: marital_status,
		// 				Occupation: occupation,
		// 				EthnicGroup: ethnic_group,
		// 				Religion: religion,
		// 				Residence: residence,
		// 				HighestEducation: highest_education
		// 			},
		// 			patient: {
		// 				FolderNumber: folder_number,
		// 				OrganDiagnosis: organ_diagnosis,
		// 				HispathologyDiagnosis: hispathology_diagnosis,
		// 				AlcoholUse:
		// 					alcohol_use === "Yes"
		// 						? alcohol_frequency
		// 						: alcohol_use,
		// 				CancerHistory: family_history_of_cancer
		// 			}
		// 		})
		// 	});

		// 	if (!request.ok) {
		// 		this.setState({ submitting: false });
		// 		const error = await request.json();
		// 		throw Error(error.Message);
		// 	}

		// 	const data = await request.json();
		// 	console.log(data);
		// } catch (err) {
		// 	console.log(err);
		// 	this.props.errorHandler(err);
		// }
	}

	render() {
		const { showing, message } = this.props.errorModal;
		const {
			surname,
			first_name,
			phone_number,
			next_of_kin_phone_number,
			folder_number,
			sex,
			age,
			marital_status,
			organ_diagnosis,
			hispathology_diagnosis,
			occupation,
			ethnic_group,
			religion,
			residence,
			highest_education,
			alcohol_use,
			alcohol_frequency,
			family_history_of_cancer
		} = this.state.biodata;

		return (
			<>
				{showing ? (
					<ErrorModal message={message} show={showing} />
				) : null}
				<TopBar hide_on_small_screens />
				<SecondaryBar shadow page_title="Add Patient Data (1/4)" />
				<Shell>
					<form
						className={styles.form}
						onSubmit={(e) => this.skipCreate(e)}
					>
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
									placeholder="Enter age"
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
								<label htmlFor="organ_diagnosis">
									Organ Diagnosis
								</label>
								<select
									id="organ_diagnosis"
									name="organ_diagnosis"
									value={organ_diagnosis}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									required
								>
									<option></option>
									<option>Breast Cancer</option>
									<option>Prostate Cancer</option>
									<option>Anal Cancer</option>
									<option>Head and Neck Cancer</option>
									<option>Colorectal Cancer</option>
								</select>
							</div>
							<div>
								<label htmlFor="hispathology_diagnosis">
									Hispathology Diagnosis
								</label>
								<input
									id="hispathology_diagnosis"
									name="hispathology_diagnosis"
									type="text"
									onChange={(e) => this.handleChange(e)}
									value={hispathology_diagnosis}
									className={styles.input}
									placeholder="Enter hispathology diagnosis"
									required
								/>
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
								<label htmlFor="family_history_of_cancer">
									Family History of Cancer
								</label>
								<select
									id="family_history_of_cancer"
									name="family_history_of_cancer"
									value={family_history_of_cancer}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
								>
									<option></option>
									<option>Yes</option>
									<option>No</option>
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
									!organ_diagnosis ||
									!hispathology_diagnosis ||
									!occupation ||
									!ethnic_group ||
									!religion ||
									this.state.submitting
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
									!organ_diagnosis ||
									!hispathology_diagnosis ||
									!occupation ||
									!ethnic_group ||
									!religion ||
									!residence ||
									!highest_education ||
									!alcohol_use ||
									!family_history_of_cancer ||
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
								Continue to Medical Information
							</button>
						</div>
					</form>
				</Shell>
				<BottomBar />
			</>
		);
	}
}
const mapStateToProps = (state) => ({
	errorModal: state.general.errorModal
});

const mapDispatchToProps = (dispatch) => ({
	errorHandler: (...args) => errorHandler(...args, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientBiodata);
