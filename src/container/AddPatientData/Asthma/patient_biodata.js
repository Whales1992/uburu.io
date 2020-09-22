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
				LastName:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).LastName) ||
					"",
				FirstName:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).FirstName) ||
					"",
				PhoneNumber:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).PhoneNumber) ||
					"",
				KinsNumber:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).KinsNumber) ||
					"",
				RelationshipToNextOfKin:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data)
							.RelationshipToNextOfKin) ||
					"",
				FolderNo:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).FolderNo) ||
					"",
				Gender:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).Gender) ||
					"",
				Age:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).Age) ||
					"",
				MaritalStatus:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).MaritalStatus) ||
					"",
				Occupation:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).Occupation) ||
					"",
				other_occupation:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).other_occupation) ||
					"",
				EthnicGroup:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).EthnicGroup) ||
					"",
				other_ethnic_group:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).other_ethnic_group) ||
					"",
				Religion:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).Religion) ||
					"",
				other_religion:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).other_religion) ||
					"",
				Residence:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).Residence) ||
					"",
				HighestEducation:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).HighestEducation) ||
					"",
				alcohol_use:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).alcohol_use) ||
					"",
				alcohol_frequency:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).alcohol_frequency) ||
					"",
				AsthmaHistory:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data)
							.family_history_of_diabetes) ||
					"",
				AgeOfOnset:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).AgeOfOnset) ||
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
				.setItem(this.state.biodata.FolderNo, {
					bioData: {
						...this.state.biodata,
						triggers:
							this.state.biodata.triggers === "Others"
								? this.state.biodata.other_triggers
								: this.state.biodata.triggers,
						Occupation:
							this.state.biodata.Occupation === "Others"
								? this.state.biodata.other_occupation
								: this.state.biodata.Occupation,
						EthnicGroup:
							this.state.biodata.EthnicGroup === "Others"
								? this.state.biodata.other_ethnic_group
								: this.state.biodata.EthnicGroup,
						Religion:
							this.state.biodata.Religion === "Others"
								? this.state.biodata.other_religion
								: this.state.biodata.Religion
					}
				})
				.then((value) => {
					localStorage.removeItem("bio_data");
					this.setState({
						submitting: false,
						biodata: {
							LastName: "",
							FirstName: "",
							PhoneNumber: "",
							KinsNumber: "",
							RelationshipToNextOfKin: "",
							FolderNo: "",
							Gender: "",
							Age: "",
							MaritalStatus: "",
							triggers: "",
							other_triggers: "",
							Occupation: "",
							other_occupation: "",
							EthnicGroup: "",
							other_ethnic_group: "",
							Religion: "",
							other_religion: "",
							Residence: "",
							HighestEducation: "",
							alcohol_use: "",
							alcohol_frequency: "",
							AsthmaHistory: "",
							AgeOfOnset: ""
						}
					});
				})
				.catch((err) => {
					this.setState({ submitting: false });
					console.log(err);
				});
		} else {
			const {
				LastName,
				FirstName,
				PhoneNumber,
				KinsNumber,
				RelationshipToNextOfKin,
				FolderNo,
				Gender,
				Age,
				MaritalStatus,
				triggers,
				other_triggers,
				Occupation,
				other_occupation,
				EthnicGroup,
				other_ethnic_group,
				Religion,
				other_religion,
				Residence,
				HighestEducation,
				alcohol_frequency,
				alcohol_use,
				AsthmaHistory,
				AgeOfOnset
			} = this.state.biodata;
			try {
				const request = await fetch(`${url}/patient`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorisation: `Bearer ${localStorage.token}`
					},
					body: JSON.stringify({
						LastName,
						FirstName: FirstName,
						PhoneNumber: PhoneNumber,
						KinsNumber: KinsNumber,
						RelationshipToNextOfKin: RelationshipToNextOfKin,
						Gender,
						Age,
						MaritalStatus,
						Occupation:
							Occupation === "Others"
								? other_occupation
								: Occupation,
						EthnicGroup:
							EthnicGroup === "Others"
								? other_ethnic_group
								: EthnicGroup,
						Religion:
							Religion === "Others" ? other_religion : Religion,
						Residence,
						HighestEducation,
						FolderNo,
						Triggers:
							triggers === "Others" ? other_triggers : triggers,
						AlcoholUse:
							alcohol_use === "Yes"
								? alcohol_frequency
								: alcohol_use,
						AsthmaHistory: AsthmaHistory,
						AgeOfOnset
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
			LastName,
			FirstName,
			PhoneNumber,
			KinsNumber,
			RelationshipToNextOfKin,
			FolderNo,
			Gender,
			Age,
			MaritalStatus,
			triggers,
			other_triggers,
			Occupation,
			other_occupation,
			EthnicGroup,
			other_ethnic_group,
			Religion,
			other_religion,
			Residence,
			HighestEducation,
			alcohol_use,
			alcohol_frequency,
			AsthmaHistory,
			AgeOfOnset
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
								<label htmlFor="LastName">Surname</label>
								<input
									id="LastName"
									type="text"
									name="LastName"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={LastName}
									placeholder="Enter patient's LastName"
									required
								/>
							</div>
							<div>
								<label htmlFor="FirstName">First Name</label>
								<input
									id="FirstName"
									type="text"
									name="FirstName"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={FirstName}
									placeholder="Enter patient's first name"
									required
								/>
							</div>
							<div>
								<label htmlFor="PhoneNumber">
									Phone Number
								</label>
								<input
									id="PhoneNumber"
									name="PhoneNumber"
									type="tel"
									onChange={(e) => this.handleChange(e)}
									value={PhoneNumber}
									className={styles.input}
									placeholder="Enter phone number"
									minLength="11"
									maxLength="11"
								/>
							</div>
							<div>
								<label htmlFor="KinsNumber">
									Next of Kin's Phone Number
								</label>
								<input
									id="KinsNumber"
									name="KinsNumber"
									type="tel"
									onChange={(e) => this.handleChange(e)}
									value={KinsNumber}
									className={styles.input}
									placeholder="Enter next of kin's phone number"
									minLength="11"
									maxLength="11"
								/>
							</div>
							<div>
								<label htmlFor="RelationshipToNextOfKin">
									First Name
								</label>
								<input
									id="RelationshipToNextOfKin"
									type="text"
									name="RelationshipToNextOfKin"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={RelationshipToNextOfKin}
									placeholder="Enter relationship to next of kin"
									required
								/>
							</div>
							<div>
								<label htmlFor="FolderNo">Folder Number</label>
								<input
									id="FolderNo"
									name="FolderNo"
									type="number"
									onChange={(e) => this.handleChange(e)}
									value={FolderNo}
									className={styles.input}
									placeholder="Enter folder number"
									required
								/>
							</div>
							<div>
								<label htmlFor="Gender">Sex</label>
								<select
									id="Gender"
									name="Gender"
									value={Gender}
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
								<label htmlFor="Age">Age</label>
								<input
									id="Age"
									name="Age"
									type="number"
									onChange={(e) => this.handleChange(e)}
									value={Age}
									className={styles.input}
									placeholder="Enter Age"
									minLength="1"
									maxLength="3"
									required
								/>
							</div> */}
							<div>
								<label htmlFor="MaritalStatus">
									Marital Status
								</label>
								<select
									id="MaritalStatus"
									name="MaritalStatus"
									value={MaritalStatus}
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
								<label htmlFor="Occupation">Occupation</label>
								<select
									id="Occupation"
									name="Occupation"
									value={Occupation}
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
							{Occupation === "Others" ? (
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
										placeholder="Type in other Occupation"
										required
									/>
								</div>
							) : null}
							<div>
								<label htmlFor="EthnicGroup">
									Ethnic Group
								</label>
								<select
									id="EthnicGroup"
									name="EthnicGroup"
									value={EthnicGroup}
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
							{EthnicGroup === "Others" ? (
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
								<label htmlFor="Religion">Religion</label>
								<select
									id="Religion"
									name="Religion"
									value={Religion}
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
							{Religion === "Others" ? (
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
										placeholder="Type in other Religion"
										required
									/>
								</div>
							) : null}
							<div>
								<label htmlFor="Residence">Residence</label>
								<select
									id="Residence"
									name="Residence"
									value={Residence}
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
								<label htmlFor="HighestEducation">
									Highest Education
								</label>
								<select
									id="HighestEducation"
									name="HighestEducation"
									value={HighestEducation}
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
								<label htmlFor="AsthmaHistory">
									Family History of Asthma
								</label>
								<select
									id="AsthmaHistory"
									name="AsthmaHistory"
									value={AsthmaHistory}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
								>
									<option></option>
									<option>Yes</option>
									<option>No</option>
								</select>
							</div>
							<div>
								<label htmlFor="AgeOfOnset">
									Age of Onset (in years)
								</label>
								<input
									id="AgeOfOnset"
									type="number"
									name="AgeOfOnset"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={AgeOfOnset}
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
									!LastName ||
									!FirstName ||
									!Gender ||
									!Age ||
									!RelationshipToNextOfKin ||
									!FolderNo ||
									!MaritalStatus ||
									!Occupation ||
									(Occupation === "Others" &&
										!other_occupation) ||
									!EthnicGroup ||
									(EthnicGroup === "Others" &&
										!other_ethnic_group) ||
									!Religion ||
									(Religion === "Others" && !other_religion)
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
									!LastName ||
									!FirstName ||
									!Gender ||
									!Age ||
									!FolderNo ||
									!MaritalStatus ||
									!triggers ||
									(triggers === "Others" &&
										!other_triggers) ||
									!Occupation ||
									(Occupation === "Others" &&
										!other_occupation) ||
									!EthnicGroup ||
									(EthnicGroup === "Others" &&
										!other_ethnic_group) ||
									!Religion ||
									(Religion === "Others" &&
										!other_religion) ||
									!Residence ||
									!HighestEducation ||
									!alcohol_use ||
									!AsthmaHistory ||
									(alcohol_use === "Yes" &&
										!alcohol_frequency)
										? true
										: false
								}
								onClick={() =>
									this.props.history.push(
										"/add_patient_data/medical_history",
										FolderNo
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
