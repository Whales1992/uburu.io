import React, { Component } from "react";
import Layout from "../../UI/JS/layout";
// import Tab from "../../../components/UI/JS/tab";
// import Records from "../../../components/Patients/JS/records";
// import styles from "../../Patients/CSS/patients.module.css";
import { detailSubject } from "../../../actions/general/index";
import { connect } from "react-redux";

const all = [
	{
		id: 1,
		name: "Johnson Uzodimma",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	},
	{
		id: 2,
		name: "Courtney Fox",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	},
	{
		id: 3,
		name: "Cody Watson",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	},
	{
		id: 4,
		name: "Eduardo Cooper",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	}
];
const Upcoming = [
	{
		id: 5,
		name: "Ada Uzodimma",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	},
	{
		id: 6,
		name: "Courtney Fox",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	},
	{
		id: 7,
		name: "Cody Watson",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	},
	{
		id: 8,
		name: "Eduardo Cooper",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	}
];
const cancelled = [
	{
		id: 9,
		name: "Okereke Uzodimma",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	},
	{
		id: 10,
		name: "Courtney Fox",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	},
	{
		id: 11,
		name: "Cody Watson",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020"
	},
	{
		id: 12,
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

	switchTabs(tab) {
		this.setState({ activeTab: tab }, () => {
			const { activeTab } = this.state;

			if (activeTab === "All")
				return this.setState(() => ({ patients: all }));
			if (activeTab === "Upcoming")
				return this.setState(() => ({ patients: Upcoming }));
			if (activeTab === "Cancelled")
				return this.setState(() => ({ patients: cancelled }));
		});
	}

	render() {
		// const { activeTab, patients } = this.state;
		return (
			<Layout pageTitle="Your Appointments">
				{/* <Tab>
					<div
						onClick={() => this.switchTabs("All")}
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
						className={
							activeTab === "Cancelled"
								? [styles.each_tab, styles.tab_active].join(" ")
								: styles.each_tab
						}
					>
						Cancelled
					</div>
				</Tab>
				<Records recents={patients} detail={this.props.detailSubject} /> */}

				<p style={{ marginTop: "140px", textAlign: "center" }}>
					Coming Soon
				</p>
			</Layout>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	detailSubject: (arg) => dispatch(detailSubject(arg))
});

export default connect(null, mapDispatchToProps)(AppointmentsPage);
