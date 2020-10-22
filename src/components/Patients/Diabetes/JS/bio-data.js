import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Shell from "../../JS/detail_shell";
import TopBar from "../../../UI/JS/topbar";
import SecondaryBar from "../../../UI/JS/secondary_navbar";
import styles from "../../../../container/AddPatientData/CSS/add_patient_data.module.css";

import localForage from "localforage";
const url = process.env.REACT_APP_BASE_URL;

const BioData = (props) => {
	const bioData = useLocation().state;

	const [value, changeValue] = useState({
		LastName: bioData ? bioData.LastName : "",
		FirstName: bioData ? bioData.FirstName : "",
		PhoneNumber: bioData ? bioData.PhoneNumber : "",
		KinsNumber: bioData ? bioData.KinsNumber : "",
		RelationshipToNextOfKin: bioData ? bioData.RelationshipToNextOfKin : "",
		FolderNo: bioData ? bioData.FolderNo : "",
		Gender: bioData ? bioData.Gender : "",
		Age: bioData ? bioData.Age : "",
		MaritalStatus: bioData ? bioData.MaritalStatus : "",
		DiabetesDiagnosis: bioData ? bioData.DiabetesDiagnosis : "",
		other_DiabetesDiagnosis: "",
		Occupation: bioData ? bioData.Occupation : "",
		other_Occupation: "",
		EthnicGroup: bioData ? bioData.EthnicGroup : "",
		other_EthnicGroup: "",
		Religion: bioData ? bioData.Religion : "",
		other_Religion: "",
		Residence: bioData ? bioData.Residence : "",
		HighestEducation: bioData ? bioData.HighestEducation : "",
		AlcoholUse: bioData ? bioData.AlcoholUse : "",
		AlcoholFrequency:
			bioData && bioData.AlcoholFrequency ? bioData.AlcoholFrequency : "",
		DiabetesHistory: bioData ? bioData.DiabetesHistory : "",
		SelfGlucoseMonitoring: bioData ? bioData.SelfGlucoseMonitoring : ""
	});
	const [effects, setEffects] = useState({
		loading: false,
		error: {
			error: false,
			message: ""
		}
	});

	function handleChange(name, e) {
		e.preventDefault();
		changeValue({ ...value, [name]: e.target.value});
	}

	function update(e) {
		updatePatientDataOnline(e);
	}

	async function updatePatientDataOnline(e) {
		e.preventDefault();
		try {
			setEffects({ ...effects, loading: true });
			if (window.navigator.onLine) {
				const request = await fetch(`${url}/PatientUpdate`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.token}`
					},
					body: JSON.stringify(value)
				});

				if (!request.ok) {
					setEffects({ ...effects, loading: false });
					const error = await request.json();
					throw Error(error.error);
				}

				// const data = await request.json();
				
				localForage
					.setItem(bioData.FolderNo, {
						...bioData,
						bioData: { ...value }
					})
					.then(() => props.history.goBack());

			} else {
				localForage
					.setItem(bioData.FolderNo, {
						...bioData,
						bioData: { ...value }
					})
					.then(() => {/**Do nothing for now ... */});
			}
		} catch (error) {
			setEffects({
				...effects,
				error: {
					error: true,
					message: error.message
				}
			});

			setTimeout(() => {
				setEffects({
					error: {
						error: false,
						message: ""
					}
				});
				// changeValue("");
			}, 3000);
		}
	}

	return (
		<>
			<TopBar hide_on_small_screens />
			<SecondaryBar page_title="Bio-Data" shadow />
			<Shell name={`${bioData.LastName} ${bioData.FirstName}`}>
				<form className={styles.form} onSubmit={(e) => update(e)}>
					<div className={styles.fields}>
						<div>
							<label htmlFor="LastName">Surname</label>
							<input
								id="LastName"
								type="text"
								name="LastName"
								className={styles.input}
								onChange={(e) => handleChange("LastName", e)}
								value={value.LastName}
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
								onChange={(e) => handleChange("FirstName", e)}
								value={value.FirstName}
								placeholder="Enter patient's first name"
								required
							/>
						</div>
						<div>
							<label htmlFor="PhoneNumber">Phone Number</label>
							<input
								id="PhoneNumber"
								name="PhoneNumber"
								type="tel"
								onChange={(e) => handleChange("PhoneNumber", e)}
								value={value.PhoneNumber}
								className={styles.input}
								placeholder="Enter phone number"
								minLength="11"
								maxLength="11"
								required
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
								onChange={(e) => handleChange("KinsNumber", e)}
								value={value.KinsNumber}
								className={styles.input}
								placeholder="Enter next of kin's phone number"
								minLength="11"
								maxLength="11"
								required
							/>
						</div>
						<div>
							<label htmlFor="RelationshipToNextOfKin">
								Relationship To Next of Kin
							</label>
							<input
								id="RelationshipToNextOfKin"
								type="text"
								name="RelationshipToNextOfKin"
								className={styles.input}
								onChange={(e) =>
									handleChange("RelationshipToNextOfKin", e)
								}
								value={value.RelationshipToNextOfKin}
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
								onChange={(e) => handleChange("FolderNo", e)}
								value={value.FolderNo}
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
								value={value.Gender}
								onChange={(e) => handleChange("Gender", e)}
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
								type="number"
								onChange={(e) => handleChange("Age", e)}
								value={value.Age}
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
								value={value.MaritalStatus}
								onChange={(e) =>
									handleChange("MaritalStatus", e)
								}
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
								onChange={(e) =>
									handleChange("DiabetesDiagnosis", e)
								}
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
						{value.DiabetesDiagnosis === "Others" ? (
							<div>
								<label htmlFor="other_DiabetesDiagnosis">
									Other Diagnosis
								</label>
								<input
									id="other_DiabetesDiagnosis"
									type="text"
									name="other_DiabetesDiagnosis"
									className={styles.input}
									onChange={(e) =>
										handleChange("other_DiabetesDiagnosis",e)
									}
									value={value.other_DiabetesDiagnosis}
									placeholder="Type in other Diabetes Diagnosis"
									required
								/>
							</div>
						) : null}
						<div>
							<label htmlFor="Occupation">Occupation</label>
							<select
								id="Occupation"
								name="Occupation"
								value={value.Occupation}
								onChange={(e) => handleChange("Occupation", e)}
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
						{value.Occupation === "Others" ? (
							<div>
								<label htmlFor="other_Occupation">
									Other Occupation
								</label>
								<input
									id="other_Occupation"
									name="other_Occupation"
									type="text"
									onChange={(e) =>
										handleChange("other_Occupation", e)
									}
									value={value.other_Occupation}
									className={styles.input}
									placeholder="Type in other Occupation"
									required
								/>
							</div>
						) : null}
						<div>
							<label htmlFor="EthnicGroup">Ethnic Group</label>
							<select
								id="EthnicGroup"
								name="EthnicGroup"
								value={value.EthnicGroup}
								onChange={(e) => handleChange("EthnicGroup", e)}
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
						{value.EthnicGroup === "Others" ? (
							<div>
								<label htmlFor="other_EthnicGroup">
									Other Ethnic Group
								</label>
								<input
									id="other_EthnicGroup"
									name="other_EthnicGroup"
									type="text"
									onChange={(e) =>
										handleChange("other_EthnicGroup", e)
									}
									value={value.other_EthnicGroup}
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
								value={value.Religion}
								onChange={(e) => handleChange("Religion", e)}
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
						{value.Religion === "Others" ? (
							<div>
								<label htmlFor="other_Religion">
									Other Religion
								</label>
								<input
									id="other_Religion"
									name="other_Religion"
									type="text"
									onChange={(e) =>
										this.handleChange("other_Religion", e)
									}
									value={value.other_Religion}
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
								value={value.Residence}
								onChange={(e) => handleChange("Residence", e)}
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
								value={value.HighestEducation}
								onChange={(e) =>
									handleChange("HighestEducation", e)
								}
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
								value={value.AlcoholUse}
								onChange={(e) => handleChange("AlcoholUse", e)}
								className={styles.input}
							>
								<option></option>
								<option>Yes</option>
								<option>No</option>
							</select>
						</div>
						{value.AlcoholUse === "Yes" ? (
							<div>
								<label htmlFor="AlcoholFrequency">
									Alcohol Frequency (bottles per week)
								</label>
								<input
									id="AlcoholFrequency"
									type="number"
									name="AlcoholFrequency"
									className={styles.input}
									onChange={(e) =>
										handleChange("AlcoholFrequency", e)
									}
									value={value.AlcoholFrequency}
									placeholder="Bottles per week"
								/>
							</div>
						) : null}
						<div>
							<label htmlFor="DiabetesHistory">
								Family History of Cancer
							</label>
							<select
								id="DiabetesHistory"
								name="DiabetesHistory"
								value={value.DiabetesHistory}
								onChange={(e) =>
									handleChange("DiabetesHistory", e)
								}
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
							className="primary_btn"
							type="submit"
							disabled={
								!value.LastName ||
								!value.FirstName ||
								!value.PhoneNumber ||
								!value.Gender ||
								!value.Age ||
								!value.KinsNumber ||
								!value.RelationshipToNextOfKin ||
								!value.FolderNo ||
								!value.MaritalStatus ||
								!value.DiabetesDiagnosis ||
								(value.DiabetesDiagnosis === "Others" &&
									!value.other_DiabetesDiagnosis) ||
								!value.Occupation ||
								(value.Occupation === "Others" &&
									!value.other_Occupation) ||
								!value.EthnicGroup ||
								(value.EthnicGroup === "Others" &&
									!value.other_EthnicGroup) ||
								!value.Religion ||
								(value.Religion === "Others" &&
									!value.other_Religion) ||
								!value.Residence ||
								!value.HighestEducation ||
								!value.AlcoholUse ||
								!value.DiabetesHistory ||
								!value.SelfGlucoseMonitoring ||
								(value.AlcoholUse === "Yes" &&
									!value.AlcoholFrequency)
									? false
									: true
							}
						>
							Update Basic Information
						</button>

						{effects.loading && (
							<p style={{ textAlign: "center" }}>Updating...</p>
						)}
					</div>
				</form>
			</Shell>
		</>
	);
};

export default BioData;
