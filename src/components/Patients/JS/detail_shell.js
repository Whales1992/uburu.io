import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../AddPatientData/CSS/shell.module.css";
import styles2 from "../CSS/detail_shell.module.css";

const Shell = ({ render, children, name }) => {
	const location = useLocation();

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
							<Link
								to={{
									pathname: `/patients/${location.state.bioData.folder_number}/bio-data`,
									state: location.state
								}}
							>
								Bio-data
							</Link>
						</li>
						<li
							className={
								window.location.pathname.split("/")[3] ===
								"medical_history"
									? styles2.active
									: null
							}
						>
							<Link
								to={{
									pathname: `/patients/${location.state.bioData.folder_number}/medical_history`,
									state: location.state
								}}
							>
								Medical History
							</Link>
						</li>
						<li
							className={
								window.location.pathname.split("/")[3] ===
								"drug_history"
									? styles2.active
									: null
							}
						>
							<Link
								to={{
									pathname: `/patients/${location.state.bioData.folder_number}/drug_history`,
									state: location.state
								}}
							>
								Drug History
							</Link>
						</li>
						<li
							className={
								window.location.pathname.split("/")[3] ===
								"investigation_history"
									? styles2.active
									: null
							}
						>
							<Link
								to={{
									pathname: `/patients/${location.state.bioData.folder_number}/investigation_history`,
									state: location.state
								}}
							>
								Investigation History
							</Link>
						</li>
						<li
							className={
								window.location.pathname.split("/")[3] ===
								"treatment_outcome"
									? styles2.active
									: null
							}
						>
							<Link
								to={{
									pathname: `/patients/${location.state.bioData.folder_number}/treatment_outcome`,
									state: location.state
								}}
							>
								Treatment Outcome
							</Link>
						</li>
					</ul>
				</nav>
				{render ? render(activeRecord, toggleRecord) : children}
			</div>
		</div>
	);
};

export default Shell;
