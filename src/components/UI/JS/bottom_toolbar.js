import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../CSS/bottom_toolbar.module.css";
import HomeIconActive from "../../../images/home_icon_active.svg";
import HomeIconInactive from "../../../images/home_icon_inactive.svg";
import PatientsIconActive from "../../../images/patients_active.svg";
import PatientsIconInactive from "../../../images/patients_inactive.svg";
import AppointmentsActive from "../../../images/appointments_active.svg";
import AppointmentsInactive from "../../../images/appointments_inactive.svg";
import ProfileIconActive from "../../../images/profile_active.svg";
import ProfileIconInactive from "../../../images/profile_inactive.svg";

const bottomToolbar = () => (
	<div className={styles.buttToolbar}>
		<NavLink
			to="/"
			className={styles.nav_link}
			activeClassName={styles.nav_link_active}
		>
			{window.location.pathname === "/" ? (
				<img src={HomeIconActive} alt="active home icon" />
			) : (
				<img src={HomeIconInactive} alt="inactive home icon" />
			)}
			Home
		</NavLink>
		<NavLink
			to="/patients"
			className={styles.nav_link}
			activeClassName={styles.nav_link_active}
		>
			{window.location.pathname === "/patients" ? (
				<img src={PatientsIconActive} alt="active patients icon" />
			) : (
				<img src={PatientsIconInactive} alt="inactive patients icon" />
			)}
			Patients
		</NavLink>
		<NavLink
			to="/appointments"
			className={styles.nav_link}
			activeClassName={styles.nav_link_active}
		>
			{window.location.pathname === "/appointments" ? (
				<img src={AppointmentsActive} alt="active appointments icon" />
			) : (
				<img
					src={AppointmentsInactive}
					alt="inactive appointments icon"
				/>
			)}
			Appointments
		</NavLink>
		<NavLink
			to="/profile"
			className={styles.nav_link}
			activeClassName={styles.nav_link_active}
		>
			{window.location.pathname === "/profile" ? (
				<img src={ProfileIconActive} alt="active profile icon" />
			) : (
				<img src={ProfileIconInactive} alt="inactive profile icon" />
			)}
			Profile
		</NavLink>
	</div>
);

export default bottomToolbar;
