import React from "react";
import Topbar from "./topbar";
import BottomBar from "./bottom_toolbar";
import "../CSS/layout.module.css";

const layout = ({ children }) => (
	<>
		<Topbar />
		{children}
		<BottomBar />
	</>
);

export default layout;
