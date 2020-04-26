import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../container/AddPatientData/CSS/patient_biodata.module.css";

const shell = ({ children }) => (
	<div className={styles.container}>
		<div className={styles.title}>Add Patient Data</div>
		<div className={styles.flexed_container}>
			<section className={styles.left_nav}>
				<div
					className={
						window.location.pathname.split("/")[2] ===
						"patient_biodata"
							? styles.active
							: null
					}
				>
					<Link to="/add_patient_data/patient_biodata">
						Patient's Biodata
					</Link>
				</div>
				<div
					className={
						window.location.pathname.split("/")[2] ===
						"medical_history"
							? styles.active
							: null
					}
				>
					<Link to="/add_patient_data/medical_history">
						Medical History
					</Link>
				</div>
				<div
					className={
						window.location.pathname.split("/")[2] ===
						"investigation_history"
							? styles.active
							: null
					}
				>
					<Link to="/add_patient_data/investigation_history">
						Investigation History
					</Link>
				</div>
				<div
					className={
						window.location.pathname.split("/")[2] ===
						"treatment_outcome"
							? styles.active
							: null
					}
				>
					<Link to="/add_patient_data/treatment_outcome">
						Treatment Outcome
					</Link>
				</div>
			</section>
			{children}
		</div>
	</div>
);

export default shell;
