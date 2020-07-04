import React from "react";
import styles from "../CSS/blue_backdrop.module.css";

import HospitalIcon from "../../../images/Home/hospital_icon.svg";

const blueBackdrop = () => (
	<div className={styles.div}>
		<img alt="hospital icon" src={HospitalIcon} />
		<span>{JSON.parse(localStorage.account).Description}</span>
	</div>
);

export default blueBackdrop;
