import React, { Component } from "react";
import Layout from "../../JS/UI/layout";
import Tab from "../../../components/UI/JS/tab";
import Records from "../../../components/Patients/JS/records";
import styles from "../../CSS/Patients/patients.module.css";

const diseaseCategories = ["Diabetes", "HBP", "Prostrate"];
const patientsArray1 = [
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
const patientsArray2 = [
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
const patientsArray3 = [
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

class Patients extends Component {
	constructor(props) {
		super(props);

		this.state = {
			diseaseCategories: null,
			activeTab: "",
			patients: patientsArray1,
			loading: false
		};

		this.switchTabs = this.switchTabs.bind(this);
	}

	componentDidMount() {
		this.setState({ diseaseCategories });
		this.setState({ activeTab: diseaseCategories[0] });
	}

	async switchTabs(tab) {
		await this.setState({ activeTab: tab });

		const { activeTab } = this.state;

		if (activeTab === "Diabetes")
			return this.setState({ patients: patientsArray1 });
		if (activeTab === "HBP")
			return this.setState({ patients: patientsArray2 });
		if (activeTab === "Prostrate")
			return this.setState({ patients: patientsArray3 });
	}

	render() {
		const { diseaseCategories, activeTab, patients } = this.state;
		return (
			<Layout pageTitle="Your Patients">
				<Tab>
					{diseaseCategories
						? diseaseCategories.map(eachType => (
								<div
									onClick={() => this.switchTabs(eachType)}
									key={eachType}
									className={
										activeTab === eachType
											? [
													styles.each_tab,
													styles.tab_active
											  ].join(" ")
											: styles.each_tab
									}
								>
									{eachType}
								</div>
						  ))
						: null}
				</Tab>
				<Records recents={patients} />
			</Layout>
		);
	}
}

export default Patients;
