import React, { useState } from "react";
import styles from "../CSS/shell.module.css";

const Shell = ({ render, reset, children }) => {
	const [activeRecord, setActiveRecord] = useState(
		window.location.pathname.split("/")[2] === "medical_history"
			? "Assessment"
			: ""
	);

	function toggleRecord(recordToggled) {
		if (activeRecord === recordToggled) return;
		else {
			reset();
			setActiveRecord(recordToggled);
		}
	}

	return (
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
						Bio-data
					</div>
					<div
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
						<ul>
							<li
								onClick={() => toggleRecord("Assessment")}
								className={
									activeRecord === "Assessment"
										? styles.active_span
										: ""
								}
							>
								Assessment Record
							</li>
							<li
								onClick={() => toggleRecord("Care")}
								className={
									activeRecord === "Care"
										? styles.active_span
										: ""
								}
							>
								Care Record
							</li>
							<li
								onClick={() => toggleRecord("Complication")}
								className={
									activeRecord === "Complication"
										? styles.active_span
										: ""
								}
							>
								Complication Record
							</li>
						</ul>
					</div>
					<div
						className={
							window.location.pathname.split("/")[2] ===
							"drug_history"
								? styles.active
								: null
						}
					>
						Drug History
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
				</aside>
				{render ? render(activeRecord, toggleRecord) : children}
			</div>
		</div>
	);
};

export default Shell;
