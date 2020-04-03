import React from "react";
import styles from "../CSS/tab.module.css";

const tab = ({ children }) => {
	return <div className={styles.tab}>{children}</div>;
};

export default tab;
