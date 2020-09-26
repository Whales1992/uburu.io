import React, { memo, Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "../CSS/recent_records.module.css";

const EachRecentRecord = ({ record }) => {
	const { LastName, FirstName, OrganDiagnosis, FolderNo } = record[0];
	return (
		<Link
			to={{
				pathname:
					window.innerWidth > 600
						? `/patients/${FolderNo}`
						: `/patients/${FolderNo}/record_list`,
				state: record
			}}
			className={styles.each_record}
		>
			<div className={styles.name}>{`${LastName} ${FirstName}`}</div>
			<div className={styles.details}>
				<small>{OrganDiagnosis}</small>
				<small>{}</small>
			</div>
			<hr />
		</Link>
	);
};

const recentRecords = ({ recents }) => {
	return (
		<div className={styles.container}>
			<div className={styles.container_title}>Recent Records</div>
			<div className={styles.records_div}>
				{recents === null ? (
					<p>loading...</p>
				) : recents.length === 0 ? (
					<p>No recent records yet.</p>
				) : (
					recents.map((eachRecord) => (
						<Fragment key={eachRecord[0].FolderNo}>
							<EachRecentRecord record={eachRecord} />
						</Fragment>
					))
				)}
			</div>
		</div>
	);
};

export default memo(recentRecords);
