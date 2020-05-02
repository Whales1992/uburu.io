import React, { Component } from "react";
import { connect } from "react-redux";

//styles
import styles from "../CSS/patient_detail.module.css";
import tabStyles from "../../Patients/CSS/patients.module.css";
import detailStyles from "../../Profile/CSS/profile.module.css";

//components
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import Tab from "../../../components/UI/JS/tab";
import Topbar from "../../../components/UI/JS/topbar";

class PatientDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: "personal",
		};
	}

	switchTabs(tab) {
		this.setState(() => ({ activeTab: tab }));
	}

	render() {
		const { activeTab } = this.state;
		const { appointment } = this.props;
		return (
			<>
				<Topbar />
				<SecondaryBar page_title={appointment.name} />
				<Tab>
					<div
						onClick={() => this.switchTabs("personal")}
						className={
							activeTab === "personal"
								? [
										tabStyles.each_tab,
										tabStyles.tab_active,
								  ].join(" ")
								: tabStyles.each_tab
						}
					>
						Personal
					</div>
					<div
						onClick={() => this.switchTabs("test_history")}
						className={
							activeTab === "test_history"
								? [
										tabStyles.each_tab,
										tabStyles.tab_active,
								  ].join(" ")
								: tabStyles.each_tab
						}
					>
						Test History
					</div>
				</Tab>
				<div className={styles.detail}>
					<h6>BASIC INFORMATION</h6>
					<div>
						<div className={detailStyles.indiv_info}>
							<span className={detailStyles.field_name}>
								Patient's name
							</span>
							<span className={detailStyles.value}>
								{appointment.name}
							</span>
						</div>
						<div className={detailStyles.indiv_info}>
							<span className={detailStyles.field_name}>
								Serial Number
							</span>
							<span className={detailStyles.value}>
								{appointment.serial_number}
							</span>
						</div>
						<div className={detailStyles.indiv_info}>
							<span className={detailStyles.field_name}>Age</span>
							<span className={detailStyles.value}>
								{appointment.age}
							</span>
						</div>
						<div className={detailStyles.indiv_info}>
							<span className={detailStyles.field_name}>
								Severity
							</span>
							<span className={detailStyles.value}>
								{appointment.severity}
							</span>
						</div>
						<div className={detailStyles.indiv_info}>
							<span className={detailStyles.field_name}>
								Date/Time
							</span>
							<span className={detailStyles.value}>
								{appointment.date}
							</span>
						</div>
					</div>
					<h6>MEDICAL INFORMATION</h6>
					<div>
						<div className={detailStyles.indiv_info}>
							<span className={detailStyles.field_name}>BMI</span>
							<span className={detailStyles.value}>
								{appointment.name}
							</span>
						</div>
						<div className={detailStyles.indiv_info}>
							<span className={detailStyles.field_name}>
								Diagnosis
							</span>
							<span className={detailStyles.value}>
								{appointment.serial_number}
							</span>
						</div>
						<div className={detailStyles.indiv_info}>
							<span className={detailStyles.field_name}>
								Registration Date
							</span>
							<span className={detailStyles.value}>
								{appointment.age}
							</span>
						</div>
						<div className={detailStyles.indiv_info}>
							<span className={detailStyles.field_name}>
								Diagnosis Date
							</span>
							<span className={detailStyles.value}>
								{appointment.age}
							</span>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = ({ general }) => ({
	appointment: general.detailed,
});

export default connect(mapStateToProps, null)(PatientDetail);
