import React, { memo } from "react";
import { Link } from "react-router-dom";
import styles from "../CSS/recent_records.module.css";

const EachRecentRecord = ({ record }) => {
	const {
		surname,
		first_name,
		organ_diagnosis,
		folder_number
	} = record.bioData;
	return (
		<Link
			to={{
				pathname:
					window.innerWidth > 600
						? `/patients/${folder_number}`
						: `/patients/${folder_number}/record_list`,
				state: record
			}}
			className={styles.each_record}
		>
			<div className={styles.name}>{`${surname} ${first_name}`}</div>
			<div className={styles.details}>
				<small>{organ_diagnosis}</small>
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
						<EachRecentRecord
							key={eachRecord.name}
							record={eachRecord}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default memo(recentRecords);
