import React from "react";
import styles from "../CSS/title.module.css";

const title = ({ title, banner }) => (
	<div
		className={styles.title}
		style={!banner ? { marginTop: "113px" } : null}
	>
		{title}
	</div>
);

export default title;
