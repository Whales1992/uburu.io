import React, { memo } from "react";
import styles from "../CSS/records.module.css";

export const EachRecentRecord = ({ record }) => {
	const { name, disease, date } = record;
	return (
		<div className={styles.each_record}>
			<div className={styles.name}>{name}</div>
			<div className={styles.details}>
				<small>{disease}</small>
				<small>{date}</small>
			</div>
			<hr />
		</div>
	);
};

const recentRecords = ({ recents }) => {
	return (
		<div className={styles.container}>
			<div className={styles.records_div}>
				{recents === null ? (
					<p>loading...</p>
				) : recents.length === 0 ? (
					<p>No records yet.</p>
				) : (
					recents.map(eachRecord => (
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
