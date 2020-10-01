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
				DiabetesDiagnosis:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).DiabetesDiagnosis) ||
					"",
				other_DiabetesDiagnosis:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data)
							.other_DiabetesDiagnosis) ||
					"",
				Occupation:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).Occupation) ||
					"",
				other_Occupation:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).other_Occupation) ||
					"",
				EthnicGroup:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).EthnicGroup) ||
					"",
				other_EthnicGroup:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).other_EthnicGroup) ||
					"",
				Religion:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).Religion) ||
					"",
				other_Religion:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).other_Religion) ||
					"",
				Residence:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).Residence) ||
					"",
				HighestEducation:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).HighestEducation) ||
					"",
				AlcoholUse:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).AlcoholUse) ||
					"",
				alcohol_frequency:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).alcohol_frequency) ||
					"",
				DiabetesHistory:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).DiabetesHistory) ||
					"",
				SelfGlucoseMonitoring:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data)
							.SelfGlucoseMonitoring) ||
					""
			},
			//end of parameters
			submitting: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.reset = this.reset.bind(this);
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

	reset() {
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
				HistoDiagnosis: "",
				other_histopathology_diagnosis: "",
				Occupation: "",
				other_occupation: "",
				OrganDiagnosis: "",
				other_primary_organ_affected: "",
				EthnicGroup: "",
				other_ethnic_group: "",
				Religion: "",
				other_religion: "",
				Residence: "",
				HighestEducation: "",
				AlcoholUse: "",
				alcohol_frequency: "",
				FamilyHistory: ""
			}
		});
	}

	async skipCreate(e) {
		if (e) e.preventDefault();
		this.setState({ submitting: true });

		let modifiedData = {
			...this.state.biodata,
			DiabetesDiagnosis:
				this.state.bioData.DiabetesDiagnosis === "Others"
					? this.state.bioData.other_DiabetesDiagnosis
					: this.state.bioData.DiabetesDiagnosis,
			Occupation:
				this.state.bioData.Occupation === "Others"
					? this.state.bioData.other_Occupation
					: this.state.bioData.Occupation,
			EthnicGroup:
				this.state.bioData.EthnicGroup === "Others"
					? this.state.bioData.other_EthnicGroup
					: this.state.bioData.EthnicGroup,
			Religion:
				this.state.bioData.Religion === "Others"
					? this.state.bioData.other_Religion
					: this.state.bioData.Religion,
			AlcoholUse:
				this.state.biodata.AlcoholUse === "Yes"
					? this.state.biodata.alcohol_frequency
					: this.state.biodata.AlcoholUse
		};

		delete modifiedData.other_DiabetesDiagnosis;
		delete modifiedData.other_Occupation;
		delete modifiedData.other_EthnicGroup;
		delete modifiedData.other_Religion;
		delete modifiedData.alcohol_frequency;

		if (!window.navigator.onLine) {
			let recordArray = await localForage.getItem("BioData");

			if (recordArray) {
				recordArray.push(modifiedData);
				localForage.setItem("BioData", recordArray);
				localStorage.removeItem("bio_data");

				this.reset();
			} else {
				localForage
					.setItem("BioData", [modifiedData])
					.then((value) => {
						localStorage.removeItem("bio_data");
						this.reset();
					})
					.catch((err) => {
						this.setState({ submitting: false });
						console.log(err);
					});
			}
		} else {
			try {
				const request = await fetch(`${url}/patient`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorisation: `Bearer ${localStorage.accessToken}`
					},
					body: JSON.stringify(modifiedData)
				});

				this.reset();

				if (!request.ok) {
					this.setState({ submitting: false });
					const error = await request.json();
					throw Error(error.Message);
				}

				localStorage.removeItem("bio_data");
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
			DiabetesDiagnosis,
			other_DiabetesDiagnosis,
			Occupation,
			other_Occupation,
			EthnicGroup,
			other_EthnicGroup,
			Religion,
			other_Religion,
			Residence,
			HighestEducation,
			AlcoholUse,
			alcohol_frequency,
			DiabetesHistory,
			SelfGlucoseMonitoring
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
								<label htmlAge">Age</label>
								<input
								Age"
									nAge"
									type="number"
									onChange={(e) => this.handleChange(e)}
									vaAge}
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
								<label htmlFor="DiabetesDiagnosis">
									Diabetes Diagnosis
								</label>
								<select
									id="DiabetesDiagnosis"
									name="DiabetesDiagnosis"
									value={DiabetesDiagnosis}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									required
								>
									<option></option>
									<option>Type 1</option>
									<option>Type 2</option>
									<option>Gestational Diabetes</option>
									<option>Others</option>
								</select>
							</div>
							{DiabetesDiagnosis === "Others" ? (
								<div>
									<label htmlFor="other_DiabetesDiagnosis">
										Other Diagnosis
									</label>
									<input
										id="other_DiabetesDiagnosis"
										type="text"
										name="other_DiabetesDiagnosis"
										className={styles.input}
										onChange={(e) => this.handleChange(e)}
										value={other_DiabetesDiagnosis}
										placeholder="Type in other DiabetesDiagnosis"
										required
									/>
								</div>
							) : null}
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
									<label htmlFor="other_Occupation">
										Other Occupation
									</label>
									<input
										id="other_Occupation"
										name="other_Occupation"
										type="text"
										onChange={(e) => this.handleChange(e)}
										value={other_Occupation}
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
									<label htmlFor="other_EthnicGroup">
										Other Ethnic Group
									</label>
									<input
										id="other_EthnicGroup"
										name="other_EthnicGroup"
										type="text"
										onChange={(e) => this.handleChange(e)}
										value={other_EthnicGroup}
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
									<option>Others</option>
								</select>
							</div>
							{Religion === "Others" ? (
								<div>
									<label htmlFor="other_Religion">
										Other Religion
									</label>
									<input
										id="other_Religion"
										name="other_Religion"
										type="text"
										onChange={(e) => this.handleChange(e)}
										value={other_Religion}
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
								<label htmlFor="AlcoholUse">Alcohol Use</label>
								<select
									id="AlcoholUse"
									name="AlcoholUse"
									value={AlcoholUse}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
								>
									<option></option>
									<option>Yes</option>
									<option>No</option>
								</select>
							</div>
							{AlcoholUse === "Yes" ? (
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
								<label htmlFor="DiabetesHistory">
									Family History of Diabetes
								</label>
								<select
									id="DiabetesHistory"
									name="DiabetesHistory"
									value={DiabetesHistory}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
								>
									<option></option>
									<option>Yes</option>
									<option>No</option>
								</select>
							</div>
							<div>
								<label htmlFor="SelfGlucoseMonitoring">
									Self Glucose Monitoring
								</label>
								<select
									id="SelfGlucoseMonitoring"
									name="SelfGlucoseMonitoring"
									value={SelfGlucoseMonitoring}
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
									!LastName ||
									!FirstName ||
									!Gender ||
									Age ||
									!RelationshipToNextOfKin ||
									!FolderNo ||
									!MaritalStatus ||
									!DiabetesDiagnosis ||
									(DiabetesDiagnosis === "Others" &&
										!other_DiabetesDiagnosis) ||
									!Occupation ||
									(Occupation === "Others" &&
										!other_Occupation) ||
									!EthnicGroup ||
									(EthnicGroup === "Others" &&
										!other_EthnicGroup) ||
									!Religion ||
									(Religion === "Others" && !other_Religion)
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
									Age ||
									!FolderNo ||
									!MaritalStatus ||
									!DiabetesDiagnosis ||
									(DiabetesDiagnosis === "Others" &&
										!other_DiabetesDiagnosis) ||
									!Occupation ||
									(Occupation === "Others" &&
										!other_Occupation) ||
									!EthnicGroup ||
									(EthnicGroup === "Others" &&
										!other_EthnicGroup) ||
									!Religion ||
									(Religion === "Others" &&
										!other_Religion) ||
									!Residence ||
									!HighestEducation ||
									!AlcoholUse ||
									!DiabetesHistory ||
									(AlcoholUse === "Yes" && !alcohol_frequency)
										? true
										: false
								}
								onClick={async () => {
									await this.skipCreate();
									this.props.history.push(
										"/add_patient_data/medical_history",
										FolderNo
									);
								}}
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
