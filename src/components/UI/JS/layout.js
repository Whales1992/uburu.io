import React from "react";
import Topbar from "./topbar";
import BottomBar from "./bottom_toolbar";

const layout = ({ children }) => (
	<>
		<Topbar />
		{children}
		<BottomBar />
	</>
);

export default layout;
