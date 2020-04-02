import React, { Component } from "react";
import Layout from "../UI/layout";
import BlueBackdrop from "../../../components/Home/JS/blue_backdrop";
import QuickActions from "../../../components/Home/JS/quick_actions";
import RecentRecords from "../../../components/Home/JS/recent-records";

const recentRecordsArray = [
	{
		name: "Okereke Uzodimma",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	},
	{
		name: "Courtney Fox",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	},
	{
		name: "Cody Watson",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	},
	{
		name: "Eduardo Cooper",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	}
];

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			recentRecords: null
		};
	}

	componentDidMount() {
		this.setState({ loading: true });
		this.setState({ recentRecords: recentRecordsArray, loading: false });
	}

	render() {
		const { recentRecords, loading } = this.state;
		return (
			<Layout>
				<BlueBackdrop />
				<QuickActions />
				<RecentRecords recents={recentRecords} loading={loading} />
			</Layout>
		);
	}
}

export default Home;
