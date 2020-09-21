import React from "react";
import styles from "../CSS/institution_banner.module.css";
import HospitalDesktopIcon from "../../../images/Home/hospital_icon_desktop.svg";

const institutionBanner = () => (
	<div className={styles.banner}>
		<img src={HospitalDesktopIcon} alt="hospital icon" />
		<span>{JSON.parse(localStorage.account).FacilityName}</span>
	</div>
);

export default institutionBanner;
