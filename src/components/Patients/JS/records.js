import React, { memo } from "react";
import { Link } from "react-router-dom";
import styles from "../CSS/records.module.css";

export const EachRecentRecord = ({ record }) => {
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

const RecentRecords = ({ recents }) => {
	return (
		<div className={styles.container}>
			<div className={styles.records_div}>
				{recents === null ? (
					<p>loading...</p>
				) : recents.length === 0 ? (
					<p style={{ textAlign: "center" }}>No records.</p>
				) : (
					<>
						{recents.map((eachRecord) => (
							<EachRecentRecord
								key={eachRecord.folder_number}
								record={eachRecord}
							/>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default memo(RecentRecords);
