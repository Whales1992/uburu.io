import React, { memo } from "react";

//style
import styles from "../CSS/backdrop.module.css";

const Backdrop = ({ onClick }) => (
	<div className={styles.backdrop} onClick={() => onClick()} />
);

export default memo(Backdrop);
