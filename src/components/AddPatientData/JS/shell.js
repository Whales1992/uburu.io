import React from "react";
import styles from "../CSS/shell.module.css";

const shell = ({ children }) => (
	<div className={styles.container}>
		<div className={styles.title}>Add Patient Data</div>
		<div className={styles.flexed_container}>
			<aside className={styles.left_nav}>
				<div
					className={
						window.location.pathname.split("/")[2] ===
						"patient_biodata"
							? styles.active
							: null
					}
				>
					Patient's Biodata
				</div>
				<div
					className={
						window.location.pathname.split("/")[2] ===
						"medical_history"
							? styles.active
							: null
					}
				>
					Medical History
				</div>
				<div
					className={
						window.location.pathname.split("/")[2] ===
						"investigation_history"
							? styles.active
							: null
					}
				>
					Investigation History
				</div>
				<div
					className={
						window.location.pathname.split("/")[2] ===
						"treatment_outcome"
							? styles.active
							: null
					}
				>
					Treatment Outcome
				</div>
			</section>
			{children}
		</div>
	</div>
);

export default shell;
