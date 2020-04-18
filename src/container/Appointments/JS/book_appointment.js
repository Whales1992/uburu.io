import React, { Component } from "react";
import DatePicker from "react-date-picker";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";

//styles
import styles from "..//CSS/book_appointment.module.css";

class BookAppointment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			specialty: "",
			patient_name: "",
			appointment_date: new Date(),
			appointment_time: new Date().getUTCHours(),
		};
	}

	handleChange(e) {
		const target = e.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}

	handleDateChange(name, date) {
		this.setState({ [name]: date });
	}

	render() {
		const {
			specialty,
			patient_name,
			appointment_date,
			appointment_time,
		} = this.state;
		return (
			<>
				<SecondaryBar shadow page_title="Book Appointment" />
				<form className={styles.form}>
					<label>Specialty</label>
					<select
						className={styles.input}
						name="specialty"
						value={specialty}
						onChange={(e) => this.handleChange(e)}
						required
					>
						<option></option>
						<option>Oncology Test</option>
					</select>
					<label>Patien's Name</label>
					<input
						type="text"
						name="patient_name"
						className={styles.input}
						value={patient_name}
						onChange={(e) => this.handleChange(e)}
						required
					/>
					<label>Appointment Date</label>
					<DatePicker
						name="appointment_date"
						value={appointment_date}
						className={styles.input}
						onChange={(e) =>
							this.handleDateChange("appointment_date", e)
						}
						required
						format="dd/MM/y"
					/>
					<label>Appointment Time</label>
					<input
						type="time"
						name="appointment_time"
						className={styles.input}
						value={appointment_time}
						onChange={(e) => this.handleChange(e)}
						required
					/>
					<button
						type="submit"
						className={styles.button}
						disabled={
							!appointment_time ||
							!patient_name ||
							!appointment_date ||
							!specialty
						}
					>
						Create Appointment
					</button>
				</form>
			</>
		);
	}
}

export default BookAppointment;
