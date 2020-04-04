import React from "react";
import styles from "../CSS/appointment_detail.module.css";

const appointmentDetail = ({ detail }) => (
	<div className={styles.detail}>
		<div>
			<span className={styles.field_name}>Patient's name</span>
			<span className={styles.value}>{detail.name}</span>
		</div>
		<div>
			<span className={styles.field_name}>Serial Number</span>
			<span className={styles.value}>{detail.serial_number}</span>
		</div>
		<div>
			<span className={styles.field_name}>Age</span>
			<span className={styles.value}>{detail.age}</span>
		</div>
		<div>
			<span className={styles.field_name}>Severity</span>
			<span className={styles.value}>{detail.severity}</span>
		</div>
		<div>
			<span className={styles.field_name}>Date/Time</span>
			<span className={styles.value}>{detail.date}</span>
		</div>
	</div>
);

export default appointmentDetail;
