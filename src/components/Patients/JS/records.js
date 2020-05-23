import React, { memo } from "react";
import styles from "../CSS/records.module.css";
import { withRouter } from "react-router-dom";

export const EachRecentRecord = ({ record, detail, redirect }) => {
	const { name, disease, date } = record;
	function clicked() {
		detail(record);
		if (document.URL.match(`${window.location.host}/patients`))
			return redirect.push(`/patient_detail/${record.id}`);
		if (document.URL.match(`${window.location.host}/appointments`))
			return redirect.push(`/appointment_detail/${record.id}`);
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
	return (
		<div className={styles.container}>
			<div className={styles.records_div}>
				{recents === null ? (
					<p>loading...</p>
				) : recents.length === 0 ? (
					<p>No records yet.</p>
				) : (
					recents.map((eachRecord) => (
						<EachRecentRecord
							key={eachRecord.name}
							record={eachRecord}
							detail={detail}
							redirect={history}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default memo(withRouter(recentRecords));
