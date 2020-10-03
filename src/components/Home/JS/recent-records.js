import React, { memo, Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "../CSS/recent_records.module.css";

const EachRecentRecord = ({ patient }) => {
	const {
		LastName,
		FirstName,
		OrganDiagnosis,
		FolderNo,
		DateCreated
	} = patient;

	const splitDateString = new Date(DateCreated).toDateString().split(" ");

	return (
		<Link
			to={{
				pathname:
					window.innerWidth > 600
						? `/patients/${FolderNo}/bio-data`
						: `/patients/${FolderNo}/record_list`,
				state: patient
			}}
			className={styles.each_record}
		>
			<div className={styles.name}>{`${LastName} ${FirstName}`}</div>
			<div className={styles.details}>
				<small>{OrganDiagnosis}</small>
				<small>{`${splitDateString[2]} ${splitDateString[1]}, ${splitDateString[3]}`}</small>
			</div>
			<hr />
		</Link>
	);
};

const recentRecords = ({ recents, error }) => {
	return (
		<div className={styles.container}>
			<div className={styles.container_title}>Recent Records</div>
			<div className={styles.records_div}>
				{recents === null && !error.error ? (
					<p style={{ textAlign: "center" }}>loading...</p>
				) : error.error ? (
					<p style={{ textAlign: "center", color: "red" }}>
						{error.message}
					</p>
				) : recents.length === 0 ? (
					<p>No recent records yet.</p>
				) : (
					recents.map((eachRecord) => (
						<Fragment key={eachRecord.FolderNo}>
							<EachRecentRecord patient={eachRecord} />
						</Fragment>
					))
				)}
			</div>
		</div>
	);
};

export default memo(recentRecords);
