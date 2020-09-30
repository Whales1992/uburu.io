import React, { useState } from "react";
import localForage from "localforage";
import { useLocation } from "react-router-dom";
import Shell from "../../JS/detail_shell";
import TopBar from "../../../UI/JS/topbar";
import SecondaryBar from "../../../UI/JS/secondary_navbar";
import styles from "../../../../container/AddPatientData/CSS/add_patient_data.module.css";

const BioData = (props) => {
	const bioData = useLocation().state;

	const [value, changeValue] = useState({
		LastName: bioData ? bioData.LastName : "",
		FirstName: bioData ? bioData.FirstName : "",
		PhoneNumber: bioData ? bioData.PhoneNumber : "",
		KinsNumber: bioData ? bioData.KinsNumber : "",
		FolderNo: bioData ? bioData.FolderNo : "",
		Gender: bioData ? bioData.Gender : "",
		Age: bioData ? bioData.Age : "",
		MaritalStatus: bioData ? bioData.MaritalStatus : "",
		OrganDiagnosis: bioData ? bioData.OrganDiagnosis : "",
		HistoDiagnosis: bioData ? bioData.HistoDiagnosis : "",
		Occupation: bioData ? bioData.Occupation : "",
		EthnicGroup: bioData ? bioData.EthnicGroup : "",
		Religion: bioData ? bioData.Religion : "",
		Residence: bioData ? bioData.Residence : "",
		HighestEducation: bioData ? bioData.HighestEducation : "",
		AlcoholUse: bioData ? bioData.AlcoholUse : "",
		AlcoholFrequency:
			bioData && bioData.AlcoholFrequency ? bioData.AlcoholFrequency : "",
		FamilyHistory: bioData ? bioData.FamilyHistory : ""
	});

	function handleChange(name, e) {
		e.preventDefault();
		changeValue({ ...value, [name]: e.target.value });
	}

	function update(e) {
		e.preventDefault();

		localForage
			.setItem(bioData.FolderNo, {
				...bioData,
				bioData: { ...value }
			})
			.then(() => props.history.goBack());
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
							<label htmlFor="OrganDiagnosis">
								Organ Diagnosis
							</label>
							<select
								id="OrganDiagnosis"
								name="OrganDiagnosis"
								value={value.OrganDiagnosis}
								onChange={(e) =>
									handleChange("OrganDiagnosis", e)
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
							</select>
						</div>
						<div>
							<label htmlFor="HistoDiagnosis">
								Hispathology Diagnosis
							</label>
							<input
								id="HistoDiagnosis"
								name="HistoDiagnosis"
								type="text"
								onChange={(e) =>
									handleChange("HistoDiagnosis", e)
								}
								value={value.HistoDiagnosis}
								className={styles.input}
								placeholder="Enter hispathology diagnosis"
								required
							/>
						</div>
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
								<option>Professional</option>
								<option>Skilled Manual Labour</option>
								<option>Unskilled</option>
							</select>
						</div>
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
							</select>
						</div>
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
							</select>
						</div>
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
							<label htmlFor="FamilyHistory">
								Family History of Cancer
							</label>
							<select
								id="FamilyHistory"
								name="FamilyHistory"
								value={value.FamilyHistory}
								onChange={(e) =>
									handleChange("FamilyHistory", e)
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
								!value.FolderNo ||
								!value.MaritalStatus ||
								!value.OrganDiagnosis ||
								!value.HistoDiagnosis ||
								!value.Occupation ||
								!value.EthnicGroup ||
								!value.Religion ||
								!value.Residence ||
								!value.HighestEducation ||
								!value.AlcoholUse ||
								!value.FamilyHistory ||
								(value.AlcoholUse === "Yes" &&
									!value.AlcoholFrequency)
									? true
									: false
							}
						>
							Update Basic Information
						</button>
					</div>
				</form>
			</Shell>
		</>
	);
};

export default BioData;
