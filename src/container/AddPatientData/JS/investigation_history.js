import React, { Component } from "react";
import DatePicker from "react-date-picker";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import TopBar from "../../../components/UI/JS/topbar";
import Shell from "../../../components/AddPatientData/JS/shell";

//style
import styles from "../CSS/patient_biodata.module.css";

class InvestigationHistory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			last_xray: new Date(),
			last_ultrasound: new Date(),
			CA15_3: localStorage.CA15_3 || "",
			CA15_3_date: localStorage.CA15_3_date || new Date(),
			CA125: localStorage.CA125 || "",
			CA125_date: localStorage.CA125_date || new Date(),
			CA25_27: localStorage.CA25_27 || "",
			CA25_27_date: localStorage.CA25_27_date || new Date(),
			carcinoembryonic_antigen:
				localStorage.carcinoembryonic_antigen || "",
			carcinoembryonic_antigen_date:
				localStorage.carcinoembryonic_antigen_date || new Date(),
			PSA: localStorage.PSA || "",
			PSA_date: localStorage.PSA_date || new Date(),
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	handleChange(e) {
		const target = e.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		this.setState(() => ({ [name]: value }));
		localStorage.setItem(`${name}`, `${value}`);
		if (
			name === "family_history_of_cancer" &&
			!this.state.family_history_of_cancer
		) {
			this.setState({ relationship: "", oncology_diagnosis: "" });
			localStorage.removeItem("relationship");
			localStorage.removeItem("oncology_diagnosis");
		}
	}

	handleDateChange(name, date) {
		this.setState({ [name]: date });
	}

	render() {
		const {
			last_xray,
			last_ultrasound,
			CA15_3,
			CA15_3_date,
			CA125,
			CA125_date,
			CA25_27,
			CA25_27_date,
			carcinoembryonic_antigen,
			carcinoembryonic_antigen_date,
			PSA,
			PSA_date,
		} = this.state;
		return (
			<>
				<TopBar hide_on_small_screens />
				<SecondaryBar page_title="Add Patient Data (3/4)" shadow />
				<Shell>
					<form className={styles.form}>
						<div className={styles.current_style}>
							Investigation History
						</div>
						<div className={styles.fields}>
							<div>
								<label>Last X-ray</label>
								<DatePicker
									name="last_xray"
									className={styles.input}
									onChange={(e) =>
										this.handleDateChange("last_ray", e)
									}
									value={last_xray}
									format="dd MMMM y"
									clearIcon={null}
									required
								/>
							</div>
							<div>
								<label>Last Ultrasound</label>
								<DatePicker
									name="last_ultrasound"
									className={styles.input}
									onChange={(e) =>
										this.handleDateChange(
											"last_ultrasound",
											e
										)
									}
									value={last_ultrasound}
									format="dd MMMM y"
									clearIcon={null}
									required
								/>
							</div>
							<div>
								<label>CA15-3</label>
								<input
									type="text"
									name="CA15_3"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={CA15_3}
									required
								/>
							</div>
							<div>
								<label>CA15-3 Date</label>
								<DatePicker
									name="CA15_3_date"
									className={styles.input}
									onChange={(e) =>
										this.handleDateChange("CA15_3_date", e)
									}
									value={CA15_3_date}
									format="dd MMMM y"
									clearIcon={null}
									required
								/>
							</div>
							<div>
								<label>CA125</label>
								<input
									type="text"
									name="CA125"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={CA125}
									required
								/>
							</div>
							<div>
								<label>CA125 Date</label>
								<DatePicker
									name="CA125_date"
									className={styles.input}
									onChange={(e) =>
										this.handleDateChange("CA125_date", e)
									}
									value={CA125_date}
									format="dd MMMM y"
									clearIcon={null}
									required
								/>
							</div>
							<div>
								<label>CA25_27</label>
								<input
									type="text"
									name="CA25_27"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={CA25_27}
									required
								/>
							</div>
							<div>
								<label>CA25_27 Date</label>
								<DatePicker
									name="CA25_27_date"
									className={styles.input}
									onChange={(e) =>
										this.handleDateChange("CA25_27_date", e)
									}
									value={CA25_27_date}
									format="dd MMMM y"
									clearIcon={null}
									required
								/>
							</div>
							<div>
								<label>Carcinoembryonic Antigen</label>
								<input
									type="text"
									name="carcinoembryonic_antigen"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={carcinoembryonic_antigen}
									required
								/>
							</div>
							<div>
								<label>Carcinoembryonic Antigen Date</label>
								<DatePicker
									name="carcinoembryonic_antigen_date"
									className={styles.input}
									onChange={(e) =>
										this.handleDateChange(
											"carcinoembryonic_antigen_date",
											e
										)
									}
									value={carcinoembryonic_antigen_date}
									format="dd MMMM y"
									clearIcon={null}
									required
								/>
							</div>
							<div>
								<label>PSA</label>
								<input
									type="text"
									name="PSA"
									className={styles.input}
									onChange={(e) => this.handleChange(e)}
									value={PSA}
									required
								/>
							</div>
							<div>
								<label>PSA Date</label>
								<DatePicker
									name="PSA_date"
									className={styles.input}
									onChange={(e) =>
										this.handleDateChange("PSA_date", e)
									}
									value={PSA_date}
									format="dd MMMM y"
									clearIcon={null}
									required
								/>
							</div>
						</div>
						<div className={styles.btn_area}>
							<button
								className="secondary_btn"
								type="button"
								onClick={() => this.props.history.goBack()}
							>
								Back
							</button>
							<button
								className="primary_btn"
								type="button"
								onClick={() =>
									this.props.history.push(
										"/add_patient_data/treatment_outcome"
									)
								}
							>
								Continue Data Input
							</button>
						</div>
					</form>
				</Shell>
			</>
		);
	}
}

export default InvestigationHistory;
