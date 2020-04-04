import React from "react";
import styles from "../CSS/secondary_navbar.module.css";
import BackIcon from "../../../images/back_icon.svg";

const secondaryNavbar = ({ page_title }) => (
	<div className={styles.bar}>
		<img src={BackIcon} alt="back icon" />
		<div>{page_title}</div>
	</div>
);

export default secondaryNavbar;
