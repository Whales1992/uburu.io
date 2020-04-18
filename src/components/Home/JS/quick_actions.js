import React from "react";
import { Link } from "react-router-dom";
import styles from "../CSS/quick_actions.module.css";
import AddPatientDataIcon from "../../../images/add_patient_data.svg";
import SyncDataIcon from "../../../images/sync_data.svg";
import CreateAppointmentIcon from "../../../images/create_appointments.svg";
import UpdatePatientDataIcon from "../../../images/update_patient_data.svg";

const quickActions = () => (
	<div className={styles.div}>
		<div className={styles.top}>Quick Actions</div>
		<div className={styles.actions}>
			<div>
				<Link className={styles.link}>
					<img src={AddPatientDataIcon} alt="add patient icon" />
					Add <br /> Patient Data
				</Link>
			</div>
			<div>
				<Link className={styles.link} to="/book_appointment">
					<img
						src={CreateAppointmentIcon}
						alt="create appointment icon"
					/>
					Create <br /> Appointment
				</Link>
			</div>
			<div>
				<Link className={styles.link}>
					<img src={UpdatePatientDataIcon} alt="update data icon" />
					Update <br /> Patient Data
				</Link>
			</div>
			<div>
				<img src={SyncDataIcon} alt="sync data icon" />
				Sync <br /> Data Online
			</div>
		</div>
	</div>
);

export default quickActions;
