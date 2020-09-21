import React from "react";
import styles from "../CSS/black_backdrop.module.css";

import HospitalIcon from "../../../images/Home/hospital_icon.svg";

const blackBackdrop = () => (
	<div className={styles.div}>
		<img alt="hospital icon" src={HospitalIcon} />
		<span>{JSON.parse(localStorage.account).FacilityName}</span>
	</div>
);

export default blackBackdrop;
