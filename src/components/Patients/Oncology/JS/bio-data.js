import React, { useState } from "react";
import localForage from "localforage";
import { useLocation } from "react-router-dom";
import Shell from "../../JS/detail_shell";
import TopBar from "../../../UI/JS/topbar";
import SecondaryBar from "../../../UI/JS/secondary_navbar";
import styles from "../../../../container/AddPatientData/CSS/add_patient_data.module.css";

const BioData = (props) => {
	const record = useLocation().state;
	const [value, changeValue] = useState({
		surname: record ? record.bioData.surname : "",
		first_name: record ? record.bioData.first_name : "",
		phone_number: record ? record.bioData.phone_number : "",
		next_of_kin_phone_number: record
			? record.bioData.next_of_kin_phone_number
			: "",
		folder_number: record ? record.bioData.folder_number : "",
		sex: record ? record.bioData.sex : "",
		age: record ? record.bioData.age : "",
		marital_status: record ? record.bioData.marital_status : "",
		organ_diagnosis: record ? record.bioData.organ_diagnosis : "",
		hispathology_diagnosis: record
			? record.bioData.hispathology_diagnosis
			: "",
		occupation: record ? record.bioData.occupation : "",
		ethnic_group: record ? record.bioData.ethnic_group : "",
		religion: record ? record.bioData.religion : "",
		residence: record ? record.bioData.residence : "",
		highest_education: record ? record.bioData.highest_education : "",
		alcohol_use: record ? record.bioData.alcohol_use : "",
		alcohol_frequency:
			record && record.bioData.alcohol_frequency
				? record.bioData.alcohol_frequency
				: "",
		family_history_of_cancer: record
			? record.bioData.family_history_of_cancer
			: ""
	});

	function handleChange(name, e) {
		e.preventDefault();
		changeValue({ ...value, [name]: e.target.value });
	}

	function update(e) {
		e.preventDefault();

		localForage
			.setItem(record.bioData.folder_number, {
				...record,
				bioData: { ...value }
			})
			.then(() => props.history.goBack());
	}
	console.log(props);

	return (
		<>
			<TopBar hide_on_small_screens />
			<SecondaryBar page_title="Bio-Data" shadow />
			<Shell
				name={`${record.bioData.surname} ${record.bioData.first_name}`}
			>
				<form className={styles.form} onSubmit={(e) => update(e)}>
					<div className={styles.fields}>
						<div>
							<label htmlFor="surname">Surname</label>
							<input
								id="surname"
								type="text"
								name="surname"
								className={styles.input}
								onChange={(e) => handleChange("surname", e)}
								value={value.surname}
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
								onChange={(e) => handleChange("first_name", e)}
								value={value.first_name}
								placeholder="Enter patient's first name"
								required
							/>
						</div>
						<div>
							<label htmlFor="phone_number">Phone Number</label>
							<input
								id="phone_number"
								name="phone_number"
								type="tel"
								onChange={(e) =>
									handleChange("phone_number", e)
								}
								value={value.phone_number}
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
								onChange={(e) =>
									handleChange("next_of_kin_phone_number", e)
								}
								value={value.next_of_kin_phone_number}
								className={styles.input}
								placeholder="Enter next of kin's phone number"
								minLength="11"
								maxLength="11"
								required
							/>
						</div>
						<div>
							<label htmlFor="folder_number">Folder Number</label>
							<input
								id="folder_number"
								name="folder_number"
								type="number"
								onChange={(e) =>
									handleChange("folder_number", e)
								}
								value={value.folder_number}
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
								value={value.sex}
								onChange={(e) => handleChange("sex", e)}
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
								type="number"
								onChange={(e) => handleChange("age", e)}
								value={value.age}
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
								value={value.marital_status}
								onChange={(e) =>
									handleChange("marital_status", e)
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
							<label htmlFor="organ_diagnosis">
								Organ Diagnosis
							</label>
							<select
								id="organ_diagnosis"
								name="organ_diagnosis"
								value={value.organ_diagnosis}
								onChange={(e) =>
									handleChange("organ_diagnosis", e)
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
							<label htmlFor="hispathology_diagnosis">
								Hispathology Diagnosis
							</label>
							<input
								id="hispathology_diagnosis"
								name="hispathology_diagnosis"
								type="text"
								onChange={(e) =>
									handleChange("hispathology_diagnosis", e)
								}
								value={value.hispathology_diagnosis}
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
								value={value.occupation}
								onChange={(e) => handleChange("occupation", e)}
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
							<label htmlFor="ethnic_group">Ethnic Group</label>
							<select
								id="ethnic_group"
								name="ethnic_group"
								value={value.ethnic_group}
								onChange={(e) =>
									handleChange("ethnic_group", e)
								}
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
								value={value.religion}
								onChange={(e) => handleChange("religion", e)}
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
								value={value.residence}
								onChange={(e) => handleChange("residence", e)}
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
								value={value.highest_education}
								onChange={(e) =>
									handleChange("highest_education", e)
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
							<label htmlFor="alcohol_use">Alcohol Use</label>
							<select
								id="alcohol_use"
								name="alcohol_use"
								value={value.alcohol_use}
								onChange={(e) => handleChange("alcohol_use", e)}
								className={styles.input}
							>
								<option></option>
								<option>Yes</option>
								<option>No</option>
							</select>
						</div>
						{value.alcohol_use === "Yes" ? (
							<div>
								<label htmlFor="alcohol_frequency">
									Alcohol Frequency (bottles per week)
								</label>
								<input
									id="alcohol_frequency"
									type="number"
									name="alcohol_frequency"
									className={styles.input}
									onChange={(e) =>
										handleChange("alcohol_frequency", e)
									}
									value={value.alcohol_frequency}
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
								value={value.family_history_of_cancer}
								onChange={(e) =>
									handleChange("family_history_of_cancer", e)
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
								!value.surname ||
								!value.first_name ||
								!value.phone_number ||
								!value.sex ||
								!value.age ||
								!value.next_of_kin_phone_number ||
								!value.folder_number ||
								!value.marital_status ||
								!value.organ_diagnosis ||
								!value.hispathology_diagnosis ||
								!value.occupation ||
								!value.ethnic_group ||
								!value.religion ||
								!value.residence ||
								!value.highest_education ||
								!value.alcohol_use ||
								!value.family_history_of_cancer ||
								(value.alcohol_use === "Yes" &&
									!value.alcohol_frequency)
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
