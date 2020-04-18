import React from "react";
import { withRouter } from "react-router-dom";
import styles from "../CSS/secondary_navbar.module.css";
import BackIcon from "../../../images/back_icon.svg";

const secondaryNavbar = ({ page_title, history, shadow }) => (
	<div
		className={shadow ? [styles.bar, styles.shadow].join(" ") : styles.bar}
	>
		<img src={BackIcon} alt="back icon" onClick={() => history.goBack()} />
		<div className={styles.title}>{page_title}</div>
	</div>
);

export default withRouter(secondaryNavbar);
