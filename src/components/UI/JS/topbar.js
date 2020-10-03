import React, { Component } from "react";
import styles from "../CSS/topbar.module.css";
import Hamburger from "../../../images/hamburger.svg";
import NotificationIcon from "../../../images/notification_icon.svg";
import TopBarLogo from "../../../images/Topbar/topbar_logo.svg";
import HomeIconActive from "../../../images/Topbar/topbar_home_icon_active.svg";
import HomeIconInactive from "../../../images/Topbar/topbar_home_icon_inactive.svg";
import PatientsIconActive from "../../../images/patients_active.svg";
import PatientsIconInactive from "../../../images/Topbar/topbar_patients_inactive.svg";
import AppointmentsActive from "../../../images/appointments_active.svg";
import AppointmentsInactive from "../../../images/Topbar/topbar_appointments_inactive.svg";
import MoreIcon from "../../../images/more_icon.svg";
import UserIcon from "../../../images/Drawer/drawer_user_icon.svg";
import MoreMenu from "./more_menu";
import { NavLink, Link } from "react-router-dom";

class Topbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			moreMenuShowing: false
		};
	}

	toggleMoreMenu() {
		this.setState((state) => ({ moreMenuShowing: !state.moreMenuShowing }));
	}

	render() {
		const { hide_on_small_screens, openDrawer, page_title } = this.props;
		return (
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
								<img
									src={HomeIconActive}
									alt="active home icon"
								/>
							) : (
								<img
									src={HomeIconInactive}
									alt="inactive home icon"
								/>
							)}
							<span>Home</span>
						</NavLink>
						<NavLink
							to="/patients"
							className={styles.nav_link}
							activeClassName={styles.nav_link_active}
						>
							{window.location.pathname.split("/")[1] ===
							"patients" ? (
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
							<span>Patients</span>
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
							<span>Appointments</span>
						</NavLink>
						<div
							className={styles.more_div}
							onClick={() => this.toggleMoreMenu()}
						>
							<img src={MoreIcon} alt="more icon" />
							<span>More</span>
						</div>
						{this.state.moreMenuShowing ? <MoreMenu /> : null}
					</div>
					<div className={styles.avatar_div}>
						<img src={UserIcon} alt="avatar" />
						<Link to="/profile">
							Dr. {JSON.parse(localStorage.account).LastName}{" "}
							{JSON.parse(localStorage.account).Admin ? (
								<span>(Admin)</span>
							) : null}
						</Link>
					</div>
				</>
			</div>
		);
	}
}

export default Topbar;
