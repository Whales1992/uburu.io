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

const url = process.env.REACT_APP_BASE_URL;

const SearchFolderNoPage = () => {
	const [value, changeValue] = useState("");
	const [effects, setEffects] = useState({
		loading: false,
		error: {
			error: false,
			message: ""
		}
	});
	const [searchResult, setSearchResult] = useState("");
	const [modalShowing, toggleModal] = useState(false);

	function handleChange(e) {
		if (e === "") {
			setSearchResult("");
		}
		changeValue(e);
	}

	// function hideShowModal() {
	// 	toggleModal(!modalShowing);
	// }

	async function search(e) {
		e.preventDefault();
		try {
			setEffects({ ...effects, loading: true });
			if (window.navigator.onLine) {
				const request = await fetch(`${url}/GetOnePatient`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.token}`
					},
					body: JSON.stringify({ FolderNo: value })
				});

				if (!request.ok) {
					setEffects({ ...effects, loading: false });
					const error = await request.json();
					throw Error(error.error);
				}

				const data = await request.json();
				setSearchResult(data.Patients[0]);
				setEffects({ ...effects, loading: false });
			} else {
				localForage.getItem(value).then((patient) => {
					if (!patient) return setSearchResult(null);
					setSearchResult(patient);
					toggleModal(!modalShowing);
					setEffects({ ...effects, loading: false });
				});
			}
		} catch (error) {
			if (error.message === "Sorry, Patient not found") {
				setSearchResult(null);
			}
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
				changeValue("");
			}, 3000);
		}
	}

	return (
		<>
			<Topbar />
			<InstitutionBanner />
			<Title banner title="Enter Patient Folder" />
			<SecondaryBar page_title="Search Patient folder" shadow />
			{/* {modalShowing ? (
				<>
					<Backdrop onClick={hideShowModal} />
					<ResultModal result={searchResult} />
				</>
			) : null} */}
			<form className={styles.form} onSubmit={(e) => search(e)}>
				<label htmlFor="search">Enter Patient folder</label>
				<input
					id="search"
					className={styles.input}
					name="search_folder_no"
					value={value}
					type="number"
					placeholder="Input Patient Folder Number"
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
										? `/patients/${searchResult.FolderNo}/bio-data`
										: `/patients/${searchResult.FolderNo}/record_list`,
								state: searchResult
							}}
							className={styles.result}
						>{`${searchResult.FirstName} ${searchResult.LastName}`}</Link>
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
					<>
						<p className={styles.not_found}>No result found.</p>
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
				{effects.loading && (
					<p style={{ textAlign: "center" }}>Loading...</p>
				)}
				{effects.error.error &&
					effects.error.message !== "Sorry, Patient not found" && (
						<p style={{ color: "red", textAlign: "center" }}>
							{effects.error.message}
						</p>
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
