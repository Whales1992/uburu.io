import React, { memo } from "react";
import styles from "../CSS/records.module.css";
import { withRouter } from "react-router-dom";

export const EachRecentRecord = ({ record, detail, redirect }) => {
	const { name, disease, date } = record;
	function clicked() {
		detail(record);
		redirect(`/appointments/${record.id}`);
	}
	return (
		<div className={styles.each_record} onClick={() => clicked()}>
			<div className={styles.name}>{name}</div>
			<div className={styles.details}>
				<small>{disease}</small>
				<small>{date}</small>
			</div>
			<hr />
		</div>
	);
};

const recentRecords = ({ recents, detail, history }) => {
	console.log(history);
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
							detail={detail}
							redirect={history.push}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default memo(withRouter(recentRecords));
