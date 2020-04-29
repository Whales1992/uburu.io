import React from "react";
import { connect } from "react-redux";

//styles
import styles from "../CSS/appointment_detail.module.css";
import detailStyles from "../../../container/Profile/CSS/profile.module.css";

//components
import SecondaryBar from "../../UI/JS/secondary_navbar";

const appointmentDetail = ({ appointment }) => (
	<>
		<SecondaryBar page_title={appointment.name} shadow />
		<div className={styles.detail}>
			<div className={detailStyles.indiv_info}>
				<span className={detailStyles.field_name}>Patient's name</span>
				<span className={detailStyles.value}>{appointment.name}</span>
			</div>
			<div className={detailStyles.indiv_info}>
				<span className={detailStyles.field_name}>Serial Number</span>
				<span className={detailStyles.value}>
					{appointment.serial_number}
				</span>
			</div>
			<div className={detailStyles.indiv_info}>
				<span className={detailStyles.field_name}>Age</span>
				<span className={detailStyles.value}>{appointment.age}</span>
			</div>
			<div className={detailStyles.indiv_info}>
				<span className={detailStyles.field_name}>Severity</span>
				<span className={detailStyles.value}>
					{appointment.severity}
				</span>
			</div>
			<div className={detailStyles.indiv_info}>
				<span className={detailStyles.field_name}>Date/Time</span>
				<span className={detailStyles.value}>{appointment.date}</span>
			</div>
		</div>
	</>
);

const mapStateToProps = ({ general }) => ({
	appointment: general.detailed
});

export default connect(mapStateToProps, null)(appointmentDetail);
