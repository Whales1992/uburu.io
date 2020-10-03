import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import styles from "../CSS/left_drawer.module.css";
import UserIcon from "../../../images/drawer_user_icon.svg";
import BarChart from "../../../images/drawer_barchart_icon.svg";
import Chat from "../../../images/drawer_chat_icon.svg";
// import FriendsIcon from "../../../images/drawer_friends_icon.svg";
import SupportIcon from "../../../images/drawer_support_icon.svg";
import Cog from "../../../images/drawer_settings_icon.svg";
import About from "../../../images/drawer_about_icon.svg";

const Name = localStorage.account && JSON.parse(localStorage.account).LastName;

const leftDrawer = (props) => (
	<div
		className={
			props.open
				? [styles.leftSideDrawer, styles.leftSideDrawerOpen].join(" ")
				: [styles.leftSideDrawer, styles.leftSideDrawerClose].join(" ")
		}
	>
		<div className={styles.bio}>
			<img src={UserIcon} alt="user icon" />
			<div className={styles.account_owner}>Dr. {Name}</div>
		</div>
		<div className={styles.link_div}>
			<NavLink
				to="/medical_analytics"
				className={styles.nav_link}
				activeClassName={styles.nav_link_active}
			>
				<img src={BarChart} alt="bar chart" />
				Medical Analytics
			</NavLink>
		</div>
		<div className={styles.link_div}>
			<NavLink
				to="/patient_engagement"
				className={styles.nav_link}
				activeClassName={styles.nav_link_active}
			>
				<img src={Chat} alt="chat" />
				Patient Engagement
			</NavLink>
		</div>
		{/* <div className={styles.link_div}>
			<NavLink
				to="/pharmacy_db"
				className={styles.nav_link}
				activeClassName={styles.nav_link_active}
			>
				<img src={FriendsIcon} alt="friends" />
				Pharmacy DB
			</NavLink>
		</div> */}
		<div className={styles.link_div}>
			<a
				rel="noopener noreferrer"
				target="_blank"
				href="mailto:support@uburu.ai"
				className={styles.nav_link}
			>
				<img src={SupportIcon} alt="support icon" />
				Contact Support
			</a>
		</div>
		<div className={styles.link_div}>
			<NavLink
				to="/settings"
				className={styles.nav_link}
				activeClassName={styles.nav_link_active}
			>
				<img src={Cog} alt="cog" />
				Settings
			</NavLink>
		</div>
		<div className={styles.link_div}>
			<NavLink
				to="/about"
				className={styles.nav_link}
				activeClassName={styles.nav_link_active}
			>
				<img src={About} alt="about" />
				About Uburu
			</NavLink>
		</div>
	</div>
);

export default memo(leftDrawer);
