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
				consent_check: false,
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
				Diagnosis:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).Diagnosis) ||
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
				consent_check: false,
				LastName: "",
				FirstName: "",
				PhoneNumber: "",
				KinsNumber: "",
				RelationshipToNextOfKin: "",
				FolderNo: "",
				Gender: "",
				Age: "",
				MaritalStatus: "",
				Diagnosis: "",
				other_DiabetesDiagnosis: "",
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
				DiabetesHistory: "",
				SelfGlucoseMonitoring: ""
			}
		});
	}

	async skipCreate(e) {
		if (e) e.preventDefault();
		this.setState({ submitting: true });

		let modifiedData = {
			...this.state.biodata,
			Diagnosis:
				this.state.biodata.Diagnosis === "Others"
					? this.state.biodata.other_DiabetesDiagnosis
					: this.state.biodata.Diagnosis,
			Occupation:
				this.state.biodata.Occupation === "Others"
					? this.state.biodata.other_Occupation
					: this.state.biodata.Occupation,
			EthnicGroup:
				this.state.biodata.EthnicGroup === "Others"
					? this.state.biodata.other_EthnicGroup
					: this.state.biodata.EthnicGroup,
			Religion:
				this.state.biodata.Religion === "Others"
					? this.state.biodata.other_religion
					: this.state.biodata.Religion,
			AlcoholUse:
				this.state.biodata.AlcoholUse === "Yes"
					? this.state.biodata.alcohol_frequency
					: this.state.biodata.AlcoholUse
		};

		delete modifiedData.other_DiabetesDiagnosis;
		delete modifiedData.other_Occupation;
		delete modifiedData.other_EthnicGroup;
		delete modifiedData.other_religion;
		delete modifiedData.alcohol_frequency;
		delete modifiedData.consent_check;

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
						Authorization: `Bearer ${localStorage.token}`
					},
					body: JSON.stringify(modifiedData)
				});

				if (!request.ok) {
					this.setState({ submitting: false });
					const error = await request.json();
					throw Error(error.Message);
				}

				this.reset();
				localStorage.removeItem("bio_data");
			} catch (err) {
				console.log(err);
				// this.props.errorHandler(err);
			}
		}
	}

	render() {
		const {
			consent_check,
			LastName,
			FirstName,
			PhoneNumber,
			KinsNumber,
			RelationshipToNextOfKin,
			FolderNo,
			Gender,
			Age,
			MaritalStatus,
			Diagnosis,
			other_DiabetesDiagnosis,
			Occupation,
			other_Occupation,
			EthnicGroup,
			other_EthnicGroup,
			Religion,
			other_religion,
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
					<form
						className={styles.form}
						onSubmit={(e) => this.skipCreate(e)}
					>
						<h3 className={styles.current_style}>
							Patient Biodata
						</h3>
						<div className={styles.fields}>
							<div className={styles.checkbox_div}>
								<input
									type="checkbox"
									name="consent_check"
									onChange={(e) => this.handleChange(e)}
									value={consent_check}
								/>
								<span>
									Patient consents to data entry into
									uburu.ai, and agrees to terms of use and
									privacy policy.
								</span>
							</div>
							<div>
								<label
									htmlFor="LastName"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Surname
								</label>
								<input
									id="LastName"
									type="text"
									name="LastName"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={LastName}
									placeholder="Enter patient's LastName"
									disabled={!consent_check}
									required
								/>
							</div>
							<div>
								<label
									htmlFor="FirstName"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									First Name
								</label>
								<input
									id="FirstName"
									type="text"
									name="FirstName"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={FirstName}
									placeholder="Enter patient's first name"
									disabled={!consent_check}
									required
								/>
							</div>
							<div>
								<label
									htmlFor="PhoneNumber"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
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
									disabled={!consent_check}
								/>
							</div>
							<div>
								<label
									htmlFor="KinsNumber"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
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
									disabled={!consent_check}
								/>
							</div>
							<div>
								<label
									htmlFor="RelationshipToNextOfKin"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Relationship To Next of Kin
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
									disabled={!consent_check}
								/>
							</div>
							<div>
								<label
									htmlFor="FolderNo"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Folder Number
								</label>
								<input
									id="FolderNo"
									name="FolderNo"
									type="number"
									onChange={(e) => this.handleChange(e)}
									value={FolderNo}
									className={styles.input}
									placeholder="Enter folder number"
									required
									disabled={!consent_check}
								/>
							</div>
							<div>
								<label
									htmlFor="Gender"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Sex
								</label>
								<select
									id="Gender"
									name="Gender"
									value={Gender}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									required
									disabled={!consent_check}
								>
									<option></option>
									<option>Female</option>
									<option>Male</option>
								</select>
							</div>
							<div>
								<label
									htmlFor="Age"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Age
								</label>
								<input
									id="Age"
									name="Age"
									type="tel"
									onChange={(e) => this.handleChange(e)}
									value={Age}
									className={styles.input}
									placeholder="Enter Age"
									minLength="1"
									maxLength="3"
									required
									disabled={!consent_check}
								/>
							</div>
							<div>
								<label
									htmlFor="MaritalStatus"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Marital Status
								</label>
								<select
									id="MaritalStatus"
									name="MaritalStatus"
									value={MaritalStatus}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									required
									disabled={!consent_check}
								>
									<option></option>
									<option>Married/co-habiting</option>
									<option>Single</option>
									<option>Widow/Widower</option>
									<option>Divorced/Separated</option>
								</select>
							</div>
							<div>
								<label
									htmlFor="Diagnosis"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Diabetes Diagnosis
								</label>
								<select
									id="Diagnosis"
									name="Diagnosis"
									value={Diagnosis}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									required
									disabled={!consent_check}
								>
									<option></option>
									<option>Type 1</option>
									<option>Type 2</option>
									<option>Gestational Diabetes</option>
									<option>Others</option>
								</select>
							</div>
							{Diagnosis === "Others" ? (
								<div>
									<label
										htmlFor="other_DiabetesDiagnosis"
										className={
											!consent_check
												? "disabled_label"
												: ""
										}
									>
										Other Diagnosis
									</label>
									<input
										id="other_DiabetesDiagnosis"
										type="text"
										name="other_DiabetesDiagnosis"
										className={styles.input}
										onChange={(e) => this.handleChange(e)}
										value={other_DiabetesDiagnosis}
										placeholder="Type in other Diagnosis"
										required
										disabled={!consent_check}
									/>
								</div>
							) : null}
							<div>
								<label
									htmlFor="Occupation"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Occupation
								</label>
								<select
									id="Occupation"
									name="Occupation"
									value={Occupation}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									required
									disabled={!consent_check}
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
									<label
										htmlFor="other_Occupation"
										className={
											!consent_check
												? "disabled_label"
												: ""
										}
									>
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
										disabled={!consent_check}
									/>
								</div>
							) : null}
							<div>
								<label
									htmlFor="EthnicGroup"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Ethnic Group
								</label>
								<select
									id="EthnicGroup"
									name="EthnicGroup"
									value={EthnicGroup}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									required
									disabled={!consent_check}
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
								<label
									htmlFor="Religion"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Religion
								</label>
								<select
									id="Religion"
									name="Religion"
									value={Religion}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									required
									disabled={!consent_check}
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
								<label
									htmlFor="Residence"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Residence
								</label>
								<select
									id="Residence"
									name="Residence"
									value={Residence}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									disabled={!consent_check}
								>
									<option></option>
									<option>Rural</option>
									<option>Semi Urban</option>
									<option>Urban</option>
								</select>
							</div>
							<div>
								<label
									htmlFor="HighestEducation"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Highest Education
								</label>
								<select
									id="HighestEducation"
									name="HighestEducation"
									value={HighestEducation}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									disabled={!consent_check}
								>
									<option></option>
									<option>None</option>
									<option>Primary</option>
									<option>Secondary</option>
									<option>Tertiary</option>
								</select>
							</div>
							<div>
								<label
									htmlFor="AlcoholUse"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Alcohol Use
								</label>
								<select
									id="AlcoholUse"
									name="AlcoholUse"
									value={AlcoholUse}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									disabled={!consent_check}
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
								<label
									htmlFor="DiabetesHistory"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Family History of Diabetes
								</label>
								<select
									id="DiabetesHistory"
									name="DiabetesHistory"
									value={DiabetesHistory}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									disabled={!consent_check}
								>
									<option></option>
									<option>Yes</option>
									<option>No</option>
								</select>
							</div>
							<div>
								<label
									htmlFor="SelfGlucoseMonitoring"
									className={
										!consent_check ? "disabled_label" : ""
									}
								>
									Self Glucose Monitoring
								</label>
								<select
									id="SelfGlucoseMonitoring"
									name="SelfGlucoseMonitoring"
									value={SelfGlucoseMonitoring}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									disabled={!consent_check}
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
									!consent_check ||
									!LastName ||
									!FirstName ||
									!Gender ||
									!Age ||
									!RelationshipToNextOfKin ||
									!FolderNo ||
									!MaritalStatus ||
									!Diagnosis ||
									(Diagnosis === "Others" &&
										!other_DiabetesDiagnosis) ||
									!Occupation ||
									(Occupation === "Others" &&
										!other_Occupation) ||
									!EthnicGroup ||
									(EthnicGroup === "Others" &&
										!other_EthnicGroup) ||
									!Religion ||
									(Religion === "Others" &&
										!other_religion) ||
									this.state.submitting
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
									!consent_check ||
									!LastName ||
									!FirstName ||
									!Gender ||
									!Age ||
									!FolderNo ||
									!MaritalStatus ||
									!Diagnosis ||
									(Diagnosis === "Others" &&
										!other_DiabetesDiagnosis) ||
									!Occupation ||
									(Occupation === "Others" &&
										!other_Occupation) ||
									!EthnicGroup ||
									(EthnicGroup === "Others" &&
										!other_EthnicGroup) ||
									!Religion ||
									(Religion === "Others" &&
										!other_religion) ||
									!Residence ||
									!HighestEducation ||
									!AlcoholUse ||
									!DiabetesHistory ||
									(AlcoholUse === "Yes" &&
										!alcohol_frequency) ||
									this.state.submitting
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
