import React from "react";
import styles from "../CSS/blue_backdrop.module.css";

const blueBackdrop = () => (
	<div className={styles.div}>
		{JSON.parse(localStorage.account).Description}
	</div>
);

export default blueBackdrop;
