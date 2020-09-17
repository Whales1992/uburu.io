import React, { Component } from "react";
import localForage from "localforage";

//components
import Layout from "../../UI/JS/layout";
import Records from "../../../components/Patients/JS/records";
import Title from "../../../components/UI/JS/title";
import InstitutionBanner from "../../../components/UI/JS/institution_banner";

//style
import styles from "../../Patients/CSS/patients.module.css";

class Patients extends Component {
	constructor(props) {
		super(props);

		this.state = {
			patients: null,
			loading: false,
			searchValue: ""
		};

		this.onChange = this.onChange.bind(this);
		this.search = this.search.bind(this);
	}

	async componentDidMount() {
		try {
			let patients = [];

			await localForage.iterate((value) => {
				patients.push(value);
			});
			this.setState({ patients });
		} catch (error) {
			console.log(error);
		}
	}

	async onChange(e) {
		e.preventDefault();
		const val = e.target.value;
		if (val === "") {
			try {
				let patients = [];

				await localForage.iterate((value) => {
					patients.push(value);
				});
				this.setState({ patients });
			} catch (error) {
				console.log(error);
			}
		}
		this.setState({ searchValue: val });
	}

	async search(e) {
		e.preventDefault();
		const value = e.target.value;
		try {
			let patients = [];

			const foundPatient = await localForage.getItem(value);
			patients.push(foundPatient);

			if (foundPatient === null) {
				return this.setState({ patients: [] });
			}
			this.setState({ patients });
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const { patients, searchValue } = this.state;
		return (
			<Layout pageTitle="Your Patients">
				<InstitutionBanner />
				<Title title="Your Patients" />
				<form className={styles.form} onSubmit={(e) => this.search(e)}>
					<input
						className={styles.input}
						type="number"
						name="search"
						value={searchValue}
						placeholder="Search"
						onChange={(e) => this.onChange(e)}
					/>
					<button
						type="submit"
						aria-label="search"
						disabled={!searchValue}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
						>
							<path
								d="M16.8395 15.4605L13.1641 11.7852C14.0489 10.6072 14.5266 9.17331 14.525 7.7C14.525 3.93672 11.4633 0.875 7.7 0.875C3.93672 0.875 0.875 3.93672 0.875 7.7C0.875 11.4633 3.93672 14.525 7.7 14.525C9.17331 14.5266 10.6072 14.0489 11.7852 13.1641L15.4605 16.8395C15.6466 17.0058 15.8893 17.0945 16.1387 17.0876C16.3881 17.0806 16.6255 16.9784 16.8019 16.8019C16.9784 16.6255 17.0806 16.3881 17.0876 16.1387C17.0945 15.8893 17.0058 15.6466 16.8395 15.4605ZM2.825 7.7C2.825 6.73582 3.11091 5.79329 3.64659 4.9916C4.18226 4.18991 4.94363 3.56506 5.83442 3.19609C6.72521 2.82711 7.70541 2.73057 8.65107 2.91867C9.59672 3.10678 10.4654 3.57107 11.1471 4.25285C11.8289 4.93464 12.2932 5.80328 12.4813 6.74894C12.6694 7.69459 12.5729 8.67479 12.2039 9.56558C11.8349 10.4564 11.2101 11.2177 10.4084 11.7534C9.60672 12.2891 8.66418 12.575 7.7 12.575C6.40755 12.5735 5.16847 12.0593 4.25457 11.1454C3.34066 10.2315 2.82655 8.99246 2.825 7.7Z"
								fill="#A7A9BC"
							/>
						</svg>
					</button>
				</form>
				<Records recents={patients} />
			</Layout>
		);
	}
}

export default Patients;
