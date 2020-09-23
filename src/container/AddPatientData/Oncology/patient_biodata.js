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
				HistoDiagnosis:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).HistoDiagnosis) ||
					"",
				other_histopathology_diagnosis:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data)
							.other_histopathology_diagnosis) ||
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
				OrganDiagnosis:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).OrganDiagnosis) ||
					"",
				other_primary_organ_affected:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data)
							.other_primary_organ_affected) ||
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
				FamilyHistory:
					(localStorage.bio_data &&
						JSON.parse(localStorage.bio_data).FamilyHistory) ||
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
		if (e) e.preventDefault();
		this.setState({ submitting: true });

		let modifiedData = {
			...this.state.biodata,
			HistoDiagnosis:
				this.state.biodata.HistoDiagnosis === "Others"
					? this.state.biodata.other_histopathology_diagnosis
					: this.state.biodata.HistoDiagnosis,
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
					: this.state.biodata.Religion,
			OrganDiagnosis:
				this.state.biodata.OrganDiagnosis === "Others"
					? this.state.biodata.other_primary_organ_affected
					: this.state.biodata.OrganDiagnosis,
			AlcoholUse:
				this.state.biodata.AlcoholUse === "Yes"
					? this.state.biodata.alcohol_frequency
					: this.state.biodata.AlcoholUse
		};

		delete modifiedData.other_histopathology_diagnosis;
		delete modifiedData.other_occupation;
		delete modifiedData.other_ethnic_group;
		delete modifiedData.other_religion;
		delete modifiedData.other_primary_organ_affected;
		delete modifiedData.alcohol_frequency;

		if (!window.navigator.onLine) {
			let recordArray = await localForage.getItem("BioData");

			if (recordArray) {
				recordArray.push(modifiedData);
				localForage.setItem("BioData", recordArray);
			} else {
				localForage
					.setItem("BioData", [modifiedData])
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
				const data = await request.json();
				console.log(data);
			} catch (err) {
				console.log(err);
				this.props.errorHandler(err);
			}
		}
	}

	render() {
		const { showing, message } = this.props.errorModal;
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
			HistoDiagnosis,
			other_histopathology_diagnosis,
			Occupation,
			other_occupation,
			EthnicGroup,
			other_ethnic_group,
			Religion,
			other_religion,
			OrganDiagnosis,
			other_primary_organ_affected,
			Residence,
			HighestEducation,
			AlcoholUse,
			alcohol_frequency,
			FamilyHistory
		} = this.state.biodata;

		return (
			<>
				{showing ? (
					<ErrorModal message={message} show={showing} />
				) : null}
				<TopBar hide_on_small_screens />
				<SecondaryBar shadow page_title="Add Patient Bio-data" />
				<Shell>
					<form
						className={styles.form}
						onSubmit={(e) => this.skipCreate(e)}
					>
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
									Relationship to Next of kin
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
							<div>
								<label htmlFor="Age">Age</label>
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
								/>
							</div>
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
								<label htmlFor="OrganDiagnosis">
									Primary Organ Affected
								</label>
								<select
									id="OrganDiagnosis"
									name="OrganDiagnosis"
									value={OrganDiagnosis}
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
									<option>Others</option>
								</select>
							</div>
							{other_primary_organ_affected === "Others" ? (
								<div>
									<label htmlFor="other_primary_organ_affected">
										Other Primary Organ Affected
									</label>
									<input
										id="other_primary_organ_affected"
										name="other_primary_organ_affected"
										type="text"
										onChange={(e) => this.handleChange(e)}
										value={other_primary_organ_affected}
										className={styles.input}
										placeholder="Type in other primary organ"
										required
									/>
								</div>
							) : null}
							<div>
								<label htmlFor="HistoDiagnosis">
									Histopathology Diagnosis
								</label>
								<select
									id="HistoDiagnosis"
									name="HistoDiagnosis"
									value={HistoDiagnosis}
									onChange={(e) => this.handleChange(e)}
									className={styles.input}
									required
								>
									<option></option>
									<option>Squamous cell carcinoma</option>
									<option>Adenocarcinoma</option>
									<option>Lymphoma</option>
									<option>Sarcoma</option>
									<option>Melanoma</option>
									<option>Leukemia</option>
									<option>Others</option>
								</select>
							</div>
							{HistoDiagnosis === "Others" ? (
								<div>
									<label htmlFor="other_histopathology_diagnosis">
										Other Histopathology Diagnosis
									</label>
									<input
										id="other_histopathology_diagnosis"
										name="other_histopathology_diagnosis"
										type="text"
										onChange={(e) => this.handleChange(e)}
										value={other_histopathology_diagnosis}
										className={styles.input}
										placeholder="Type in other histopathology diagnosis"
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
								<label htmlFor="FamilyHistory">
									Family History of Cancer
								</label>
								<select
									id="FamilyHistory"
									name="FamilyHistory"
									value={FamilyHistory}
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
									!RelationshipToNextOfKin ||
									!Gender ||
									!Age ||
									!FolderNo ||
									!MaritalStatus ||
									!OrganDiagnosis ||
									(OrganDiagnosis === "Others" &&
										!other_primary_organ_affected) ||
									!Occupation ||
									(Occupation === "Others" &&
										!other_occupation) ||
									!EthnicGroup ||
									(EthnicGroup === "Others" &&
										!other_ethnic_group) ||
									!Religion ||
									(Religion === "Others" &&
										!other_religion) ||
									this.state.submitting
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
									!Age ||
									!FolderNo ||
									!RelationshipToNextOfKin ||
									!Gender ||
									!MaritalStatus ||
									!Occupation ||
									(Occupation === "Others" &&
										!other_occupation) ||
									!EthnicGroup ||
									(EthnicGroup === "Others" &&
										!other_ethnic_group) ||
									!HistoDiagnosis ||
									(HistoDiagnosis === "Others" &&
										!other_histopathology_diagnosis) ||
									!Religion ||
									(Religion === "Others" &&
										!other_religion) ||
									!OrganDiagnosis ||
									(OrganDiagnosis === "Others" &&
										!other_primary_organ_affected) ||
									!Residence ||
									!HighestEducation ||
									!FamilyHistory ||
									!AlcoholUse ||
									(AlcoholUse === "Yes" && !alcohol_frequency)
								}
								onClick={() => {
									this.skipCreate();
									this.props.history.push(
										"/add_patient_data/medical_history",
										FolderNo
									);
								}}
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
