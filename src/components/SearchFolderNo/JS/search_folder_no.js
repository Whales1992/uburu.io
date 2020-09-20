import React, { useState } from "react";
import { Link } from "react-router-dom";
import localForage from "localforage";
import styles from "../CSS/search_folder_no.module.css";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import Title from "../../../components/UI/JS/title";
import Topbar from "../../../components/UI/JS/topbar";
import BottomBar from "../../UI/JS/bottom_toolbar";
import InstitutionBanner from "../../UI/JS/institution_banner";
import AddPatientIcon from "../../../images/SearchPatientNo/add_patient.svg";
// import Backdrop from "../../UI/JS/backdrop";
// import ResultModal from "./search_results_modal";

const SearchFolderNoPage = () => {
	const [value, changeValue] = useState("");
	const [searchResult, setSearchResult] = useState("");
	const [modalShowing, toggleModal] = useState(false);

	function handleChange(e) {
		changeValue(e);
	}

	// function hideShowModal() {
	// 	toggleModal(!modalShowing);
	// }

	function search(e) {
		e.preventDefault();
		localForage.getItem(value).then((patient) => {
			if (!patient) return setSearchResult(null);
			setSearchResult(patient);
			toggleModal(!modalShowing);
		});
	}

	return (
		<>
			<Topbar />
			<InstitutionBanner />
			<Title title="Search Patient Folder" />
			<SecondaryBar page_title="Search Patient folder" shadow />
			{/* {modalShowing ? (
				<>
					<Backdrop onClick={hideShowModal} />
					<ResultModal result={searchResult} />
				</>
			) : null} */}
			<form className={styles.form} onSubmit={(e) => search(e)}>
				<label htmlFor="search">Search Patient folder</label>
				<input
					id="search"
					className={styles.input}
					name="search_folder_no"
					value={value}
					type="number"
					placeholder="Input Patient Number"
					onChange={(e) => handleChange(e.target.value)}
				/>
				<button
					type="submit"
					className={["primary_btn", styles.search_btn].join(" ")}
					disabled={!value}
				>
					Search
				</button>
				<Link
					to="/add_patient_data/patient_biodata"
					className={styles.add_new_patient_link}
				>
					<img
						rel="preload"
						src={AddPatientIcon}
						alt="add patient icon"
					/>{" "}
					Add New Patient
				</Link>
				{searchResult && (
					<>
						<Link
							to={{
								pathname:
									window.innerWidth > 600
										? `/patients/${searchResult.bioData.folder_number}/bio-data`
										: `/patients/${searchResult.bioData.folder_number}/record_list`,
								state: searchResult
							}}
							className={styles.result}
						>{`${searchResult.bioData.first_name} ${searchResult.bioData.surname}`}</Link>
						<Link
							to="/add_patient_data/patient_biodata"
							className={styles.add_new_patient_link_mobile}
						>
							<img
								rel="preload"
								src={AddPatientIcon}
								alt="add patient icon"
							/>{" "}
							Add New Patient
						</Link>
					</>
				)}
				{searchResult === null && (
					<p className={styles.not_found}>No result found.</p>
				)}
			</form>
			{/* <div className={styles.result}>
				{searchResult ? (
					<Link to={`/patient_detail/${searchResult.folder_number}`}>
						{searchResult.first_name + " " + searchResult.surname}
					</Link>
				) : (
					"No patient found"
				)}
			</div> */}
			<BottomBar />
		</>
	);
};

export default SearchFolderNoPage;
