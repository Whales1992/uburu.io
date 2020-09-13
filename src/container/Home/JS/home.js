import React, { Component } from "react";
import localForage from "localforage";
import Layout from "../../UI/JS/layout";
import BlueBackdrop from "../../../components/Home/JS/blue_backdrop";
import QuickActions from "../../../components/Home/JS/quick_actions";
import RecentRecords from "../../../components/Home/JS/recent-records";
import InstitutionBanner from "../../../components/UI/JS/institution_banner";

const recentRecordsArray = async () => {
	try {
		let patients = [];

		await localForage.iterate((value, key) => {
			patients.push(value);
		});
		return patients;
	} catch (error) {
		console.log(error);
	}
};

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			recentRecords: null
		};
	}

	async componentDidMount() {
		this.setState({
			recentRecords: await recentRecordsArray(),
			loading: false
		});
	}

	render() {
		const { recentRecords, loading } = this.state;
		return (
			<Layout
				pageTitle={`Welcome, Dr. ${
					JSON.parse(localStorage.account).LastName
				}`}
			>
				<InstitutionBanner />
				<BlueBackdrop />
				<QuickActions />
				{recentRecords && (
					<RecentRecords recents={recentRecords} loading={loading} />
				)}
			</Layout>
		);
	}
}

export default Home;
