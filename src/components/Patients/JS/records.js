import React, { Fragment, memo } from "react";
import { Link } from "react-router-dom";
import styles from "../CSS/records.module.css";

export const EachRecentRecord = ({ record }) => {
	const {
		LastName,
		FirstName,
		OrganDiagnosis,
		Diagnosis,
		Triggers,
		FolderNo,
		DateCreated
	} = record;

	const splitDateString = new Date(DateCreated).toDateString().split(" ");

	return (
		<Link
			to={{
				pathname:
					window.innerWidth > 600
						? `/patients/${FolderNo}/bio-data`
						: `/patients/${FolderNo}/record_list`,
				state: record
			}}
			className={styles.each_record}
		>
			<div className={styles.name}>{`${LastName} ${FirstName}`}</div>
			<div className={styles.details}>
				<small>{OrganDiagnosis || Diagnosis || Triggers}</small>
				<small>{`${splitDateString[2]} ${splitDateString[1]}, ${splitDateString[3]}`}</small>
			</div>
			<hr />
		</Link>
	);
};

const RecentRecords = ({ recents, error }) => {
	return (
		<div className={styles.container}>
			<div className={styles.records_div}>
				{recents === null && !error.error ? (
					<p style={{ textAlign: "center" }}>loading...</p>
				) : error.error ? (
					<p style={{ textAlign: "center", color: "red" }}>
						{error.message}
					</p>
				) : recents.length === 0 ? (
					<p style={{ textAlign: "center" }}>No records.</p>
				) : (
					<>
						{recents.map((eachRecord) => (
							<Fragment key={eachRecord.FolderNo}>
								<EachRecentRecord record={eachRecord} />
							</Fragment>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default memo(RecentRecords);
