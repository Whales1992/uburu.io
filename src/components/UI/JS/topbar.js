import React from "react";
import styles from "../CSS/topbar.module.css";
import Hamburger from "../../../images/hamburger.svg";
import NotificationIcon from "../../../images/notification_icon.svg";
import TopBarLogo from "../../../images/topbar_logo.svg";
import HomeIconActive from "../../../images/topbar_home_icon_active.svg";
import HomeIconInactive from "../../../images/home_icon_inactive.svg";
import PatientsIconActive from "../../../images/patients_active.svg";
import PatientsIconInactive from "../../../images/topbar_patients_inactive.svg";
import AppointmentsActive from "../../../images/appointments_active.svg";
import AppointmentsInactive from "../../../images/topbar_appointments_inactive.svg";
import MoreIcon from "../../../images/more_icon.svg";
import TopBarAvatar from "../../../images/topbar_avatar.svg";
import { NavLink } from "react-router-dom";

const topbar = ({ page_title, openDrawer, hide_on_small_screens }) => (
	<div
		className={
			hide_on_small_screens
				? [styles.topBar, styles.hide].join(" ")
				: styles.topBar
		}
	>
		<img
			className={styles.mobile_menu}
			src={Hamburger}
			alt="hamburger icon"
			onClick={() => openDrawer()}
		/>
		<div className={styles.mobile_menu}>{page_title}</div>
		<img
			className={styles.mobile_menu}
			src={NotificationIcon}
			alt="notification icon"
		/>
		<>
			<div className={styles.logo_div}>
				<img src={TopBarLogo} alt="logo" />
			</div>
			<div className={styles.links_div}>
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
						<img
							src={PatientsIconActive}
							alt="active patients icon"
						/>
					) : (
						<img
							src={PatientsIconInactive}
							alt="inactive patients icon"
						/>
					)}
					Patients
				</NavLink>
				<NavLink
					to="/appointments"
					className={styles.nav_link}
					activeClassName={styles.nav_link_active}
				>
					{window.location.pathname === "/appointments" ? (
						<img
							src={AppointmentsActive}
							alt="active appointments icon"
						/>
					) : (
						<img
							src={AppointmentsInactive}
							alt="inactive appointments icon"
						/>
					)}
					Appointments
				</NavLink>
				<div className={styles.more_div}>
					<img src={MoreIcon} alt="more icon" />
					<span>More</span>
				</div>
			</div>
			<div className={styles.avatar_div}>
				<img src={TopBarAvatar} alt="avatar" />
				<span>Dr. Nuel</span>
			</div>
		</>
	</div>
);

export default topbar;
