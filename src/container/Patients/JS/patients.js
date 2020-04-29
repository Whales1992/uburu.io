import React, { Component } from "react";
import { connect } from "react-redux";

//components
import Layout from "../../UI/JS/layout";
import Tab from "../../../components/UI/JS/tab";
import Records from "../../../components/Patients/JS/records";

//style
import styles from "../../Patients/CSS/patients.module.css";

//actions
import { detailSubject } from "../../../actions/general/index";

const diseaseCategories = ["Diabetes", "HBP", "Prostrate"];
const patientsArray1 = [
	{
		id: 1,
		name: "Johnson Uzodimma",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020",
	},
	{
		id: 2,
		name: "Courtney Fox",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020",
	},
	{
		id: 3,
		name: "Cody Watson",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020",
	},
	{
		id: 4,
		name: "Eduardo Cooper",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020",
	},
];
const patientsArray2 = [
	{
		id: 5,
		name: "Ada Uzodimma",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020",
	},
	{
		id: 6,
		name: "Courtney Fox",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020",
	},
	{
		id: 7,
		name: "Cody Watson",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020",
	},
	{
		id: 8,
		name: "Eduardo Cooper",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020",
	},
];
const patientsArray3 = [
	{
		id: 9,
		name: "Okereke Uzodimma",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020",
	},
	{
		id: 10,
		name: "Courtney Fox",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020",
	},
	{
		id: 11,
		name: "Cody Watson",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020",
	},
	{
		id: 12,
		name: "Eduardo Cooper",
		disease: "Diabetes Meningitis 11",
		date: "30 JAN, 2020",
	},
];

class Patients extends Component {
	constructor(props) {
		super(props);

		this.state = {
			diseaseCategories: null,
			activeTab: "",
			patients: patientsArray1,
			loading: false,
		};

		this.switchTabs = this.switchTabs.bind(this);
	}

	componentDidMount() {
		this.setState({ diseaseCategories });
		this.setState({ activeTab: diseaseCategories[0] });
	}

	switchTabs(tab) {
		this.setState(() => ({ activeTab: tab }));

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
						? diseaseCategories.map((eachType) => (
								<div
									onClick={() => this.switchTabs(eachType)}
									key={eachType}
									className={
										activeTab === eachType
											? [
													styles.each_tab,
													styles.tab_active,
											  ].join(" ")
											: styles.each_tab
									}
								>
									{eachType}
								</div>
						  ))
						: null}
				</Tab>
				<Records recents={patients} detail={this.props.detailSubject} />
			</Layout>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	detailSubject: (arg) => dispatch(detailSubject(arg)),
});

export default connect(null, mapDispatchToProps)(Patients);
