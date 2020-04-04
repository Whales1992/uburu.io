import React, { Component } from "react";
import Layout from "../../JS/UI/layout";
import Tab from "../../../components/UI/JS/tab";
import Records from "../../../components/Patients/JS/records";
import styles from "../../CSS/Patients/patients.module.css";

const all = [
	{
		name: "Johnson Uzodimma",
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
const Upcoming = [
	{
		name: "Ada Uzodimma",
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
const cancelled = [
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

class AppointmentsPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: "",
			patients: all,
			loading: false
		};

		this.switchTabs = this.switchTabs.bind(this);
	}

	componentDidMount() {
		this.setState({ activeTab: "All" });
	}

	async switchTabs(tab) {
		await this.setState({ activeTab: tab });

		const { activeTab } = this.state;

		if (activeTab === "All")
			return this.setState({ patients: all });
		if (activeTab === "Upcoming")
			return this.setState({ patients: Upcoming });
		if (activeTab === "Cancelled")
			return this.setState({ patients: cancelled });
	}

	render() {
		const { activeTab, patients } = this.state;
		return (
			<Layout pageTitle="Your Appointments">
				<Tab>
					<div
						onClick={() => this.switchTabs("All")}
						key={"All"}
						className={
							activeTab === "All"
								? [styles.each_tab, styles.tab_active].join(" ")
								: styles.each_tab
						}
					>
						All
					</div>
					<div
						onClick={() => this.switchTabs("Upcoming")}
						key={"All"}
						className={
							activeTab === "Upcoming"
								? [styles.each_tab, styles.tab_active].join(" ")
								: styles.each_tab
						}
					>
						Upcoming
					</div>
					<div
						onClick={() => this.switchTabs("Cancelled")}
						key={"Cancelled"}
						className={
							activeTab === "Cancelled"
								? [styles.each_tab, styles.tab_active].join(" ")
								: styles.each_tab
						}
					>
						Cancelled
					</div>
				</Tab>
				<Records recents={patients} />
			</Layout>
		);
	}
}

export default AppointmentsPage;
