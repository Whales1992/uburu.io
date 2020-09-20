import React, { useState } from "react";
import styles from "../../AddPatientData/CSS/shell.module.css";
import styles2 from "../CSS/detail_shell.module.css";

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
					<ul className={styles2.list}>
						<li
							className={
								window.location.pathname.split("/")[3] ===
								"bio-data"
									? styles2.active
									: null
							}
						>
							Bio-data
						</li>
						<li
							className={
								window.location.pathname.split("/")[3] ===
								"medical_history"
									? styles2.active
									: null
							}
						>
							Medical History
						</li>
						<li
							className={
								window.location.pathname.split("/")[3] ===
								"drug_history"
									? styles2.active
									: null
							}
						>
							Drug History
						</li>
						<li
							className={
								window.location.pathname.split("/")[3] ===
								"investigation_history"
									? styles2.active
									: null
							}
						>
							Investigation History
						</li>
						<li
							className={
								window.location.pathname.split("/")[3] ===
								"treatment_outcome"
									? styles2.active
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
