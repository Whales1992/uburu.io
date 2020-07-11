import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../CSS/search_folder_no.module.css";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import Title from "../../../components/UI/JS/title";
import Topbar from "../../../components/UI/JS/topbar";
import BottomBar from "../../UI/JS/bottom_toolbar";
import InstitutionBanner from "../../UI/JS/institution_banner";
import AddPatientIcon from "../../../images/SearchPatientNo/add_patient.svg";

const SearchFolderNoPage = () => {
	const [value, changeValue] = useState("");

	function handleChange(e) {
		changeValue(e);
	}

	return (
		<>
			<Topbar />
			<InstitutionBanner />
			<Title title="Search Patient Folder" />
			<SecondaryBar page_title="Search Patient folder" shadow />
			<form className={styles.form}>
				<label>Search Patient folder</label>
				<input
					className={styles.input}
					name="search_folder_no"
					value={value}
					type="number"
					placeholder="Input Patient Number"
					onChange={(e) => handleChange(e.target.value)}
				/>
				<Link to="/add_patient_data/patient_biodata">
					<img
						rel="preload"
						src={AddPatientIcon}
						alt="add patient icon"
					/>{" "}
					Add New Patient
				</Link>
			</form>
			<BottomBar />
		</>
	);
};

export default SearchFolderNoPage;
