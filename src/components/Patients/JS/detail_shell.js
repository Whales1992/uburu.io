import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../AddPatientData/CSS/shell.module.css";
import styles2 from "../CSS/detail_shell.module.css";

const Shell = ({ render, children, name }) => {
	const location = useLocation();

	const bioData = location.state;

	const assessmentRecords =
		location.state.records &&
		location.state.records.filter(
			(patient) => patient.Type === "Assessment"
		);

	const careRecords =
		location.state.records &&
		location.state.records.filter((patient) => patient.Type === "Care");

	const complicationRecords =
		location.state.records &&
		location.state.records.filter(
			(patient) => patient.Type === "Complication"
		);

	const drugHistory =
		location.state.records &&
		location.state.records.filter((patient) => patient.Type === "Drugs");

	const investigationHistory =
		location.state.records &&
		location.state.records.filter(
			(patient) => patient.Type === "Investigation"
		);

	const treatmentOutcome =
		location.state.records &&
		location.state.records.filter(
			(patient) => patient.Type === "Complication"
		);

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
									pathname: `/patients/${bioData.FolderNo}/bio-data`,
									state: bioData
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
									pathname: `/patients/${bioData.FolderNo}/medical_history`,
									state: {
										patient: bioData,
										assessmentRecords,
										careRecords,
										complicationRecords
									}
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
									pathname: `/patients/${bioData.FolderNo}/drug_history`,
									state: { patient: bioData, drugHistory }
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
									pathname: `/patients/${bioData.FolderNo}/investigation_history`,
									state: {
										patient: bioData,
										investigationHistory
									}
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
									pathname: `/patients/${bioData.FolderNo}/treatment_outcome`,
									state: {
										patient: bioData,
										treatmentOutcome
									}
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
