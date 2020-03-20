import React from "react";
import { Link } from "react-router-dom";
import styles from "../CSS/bottom_toolbar.module.CSS";

const bottomToolbar = () => (
	<div className={styles.buttToolbar}>
		<Link to="/">
			<i className="fas fa-home"></i>
			Home
		</Link>
		<Link to="/">
			<i className="fas fa-user-friends"></i>
			Patients
		</Link>
		<Link to="/">
			<i className="far fa-comments"></i>
			Appointments
		</Link>
		<Link to="/">
			<i className="far fa-user"></i>
			Profile
		</Link>
	</div>
);

export default bottomToolbar;
