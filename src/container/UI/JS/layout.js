import React, { Component } from "react";
import Topbar from "../../../components/UI/JS/topbar";
import BottomBar from "../../../components/UI/JS/bottom_toolbar";
import "../../UI/CSS/layout.module.css";
import LeftDrawer from "../../../components/UI/JS/left_drawer";
import Backdrop from "../../../components/UI/JS/backdrop";

class layout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			leftDrawerOpen: false,
		};

		this.onBackdropClick = this.onBackdropClick.bind(this);
		this.openSideDrawer = this.openSideDrawer.bind(this);
	}

	onBackdropClick() {
		this.setState({ leftDrawerOpen: false });
	}

	openSideDrawer() {
		this.setState({ leftDrawerOpen: true });
	}


	render() {
		return (
			<div>
				<Topbar
					openDrawer={this.openSideDrawer}
					page_title={this.props.pageTitle}/>
					
				<LeftDrawer open={this.state.leftDrawerOpen} />
				{this.state.leftDrawerOpen ? (
					<Backdrop onClick={this.onBackdropClick} />
				) : null}
				{this.props.children}
				<BottomBar />
			</div>
		);
	}
}

export default layout;
