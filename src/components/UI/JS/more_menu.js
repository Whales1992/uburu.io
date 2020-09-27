import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../CSS/more_menu.module.css";
import MedAnalyticsIcon from "../../../images/MoreMenu/med_analytics.svg";
import MessageCenterIcon from "../../../images/MoreMenu/message_center.svg";
// import PharmDBIcon from "../../../images/MoreMenu/pharm_DB.svg";
import ContactSupportIcon from "../../../images/MoreMenu/contact_support.svg";
import SettingsIcon from "../../../images/MoreMenu/settings.svg";
// import AboutIcon from "../../../images/MoreMenu/about.svg";

const moreMenu = () => (
	<div className={styles.container}>
		<div className={styles.link_div}>
			<NavLink
				to="/medical_analytics"
				className={styles.link}
				activeClassName={styles.active}
			>
				<img src={MedAnalyticsIcon} alt="bar chart icon" />
				Medical Analytics
			</NavLink>
		</div>
		<div className={styles.link_div}>
			<NavLink
				to="/message_center"
				className={styles.link}
				activeClassName={styles.active}
			>
				<img src={MessageCenterIcon} alt="chat icon" />
				Message Center
			</NavLink>
		</div>
		{/* <div className={styles.link_div}>
			<NavLink
				to="/pharmacy_db"
				className={styles.link}
				activeClassName={styles.active}
			>
				<img src={PharmDBIcon} alt="friends icon" />
				Pharmacy DB
			</NavLink>
		</div> */}
		<div className={styles.link_div}>
			<a
				rel="noopener noreferrer"
				target="_blank"
				href="mailto:support@uburu.ai"
				className={styles.link}
				activeClassName={styles.active}
			>
				<img src={ContactSupportIcon} alt="person profile icon" />
				Contact Support
			</a>
		</div>
		<div className={styles.link_div}>
			<NavLink
				to="/settings"
				className={styles.link}
				activeClassName={styles.active}
			>
				<img src={SettingsIcon} alt="settings icon" />
				Settings
			</NavLink>
		</div>
		{/* <div className={styles.link_div}>
			<NavLink
				to="/about"
				className={styles.link}
				activeClassName={styles.active}
			>
				<img src={AboutIcon} alt="alert icon" />
				About BlueCircle
			</NavLink>
		</div> */}
	</div>
);

export default moreMenu;
