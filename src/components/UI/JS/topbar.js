import React from "react";
import styles from "../CSS/topbar.module.css";
import Hamburger from "../../../images/hamburger.svg";
import NotificationIcon from "../../../images/notification_icon.svg";

const topbar = ({ page_title }) => (
	<div className={styles.topBar}>
		<img src={Hamburger} alt="hamburger icon" />
		<div>{page_title}</div>
		<img src={NotificationIcon} alt="notification icon" />
	</div>
);

export default topbar;
