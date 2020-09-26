import React, { Component } from "react";
import localForage from "localforage";
import Layout from "../../UI/JS/layout";
import BlackBackdrop from "../../../components/Home/JS/black_backdrop";
import QuickActions from "../../../components/Home/JS/quick_actions";
import RecentRecords from "../../../components/Home/JS/recent-records";
import InstitutionBanner from "../../../components/UI/JS/institution_banner";

const url = process.env.REACT_APP_BASE_URL;

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			recentRecords: null
		};
	}

	async componentDidMount() {
		try {
			this.setState({ loading: true });
			if (window.navigator.onLine) {
				const request = await fetch(`${url}/GetRecentPatient`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.token}`
					}
				});

				if (!request.ok) {
					this.setState({ loading: false });
					const error = await request.json();
					throw Error(error.error);
				}

				const data = await request.json();
				this.setState({ recentRecords: data.records });
			} else {
				let patients = [];
				await localForage.iterate((value, key) => {
					patients.push(value);
				});

				this.setState({ recentRecords: patients });
			}
		} catch (error) {
			console.log(error.message);
		}
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
				<BlackBackdrop />
				<QuickActions />
				{recentRecords && (
					<RecentRecords recents={recentRecords} loading={loading} />
				)}
			</Layout>
		);
	}
}

export default Home;
