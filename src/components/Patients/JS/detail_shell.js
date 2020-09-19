import React, { useState } from "react";
import styles from "../../AddPatientData/CSS/shell.module.css";

const Shell = ({ render, children, name }) => {
	const [activeRecord, setActiveRecord] = useState(
		window.location.pathname.split("/")[2] === "medical_history"
			? "Assessment"
			: ""
	);

	function toggleRecord(recordToggled) {
		if (activeRecord === recordToggled) return;
		else {
			setActiveRecord(recordToggled);
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>{name}</div>
			<div className={styles.flexed_container}>
				<nav className={styles.left_nav}>
					<ul>
						<li
							className={
								window.location.pathname.split("/")[2] ===
								"patient_biodata"
									? styles.active
									: null
							}
						>
							Bio-data
						</li>
						<li
							className={
								window.location.pathname.split("/")[2] ===
								"medical_history"
									? [
											styles.medical_history_active,
											styles.medical_history
									  ].join(" ")
									: styles.medical_history
							}
						>
							Medical History
						</li>
						<li
							className={
								window.location.pathname.split("/")[2] ===
								"drug_history"
									? styles.active
									: null
							}
						>
							Drug History
						</li>
						<li
							className={
								window.location.pathname.split("/")[2] ===
								"investigation_history"
									? styles.active
									: null
							}
						>
							Investigation History
						</li>
						<li
							className={
								window.location.pathname.split("/")[2] ===
								"treatment_outcome"
									? styles.active
									: null
							}
						>
							Treatment Outcome
						</li>
					</ul>
				</nav>
				{render ? render(activeRecord, toggleRecord) : children}
			</div>
		</div>
	);
};

export default Shell;
