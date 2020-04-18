import React, { Component } from "react";
import styles from "../CSS/message_center.module.css";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";

class MessageCenter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			send_to: "",
			message: "",
		};
	}

	handleChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}

	render() {
		const { send_to, message } = this.state;
		return (
			<>
				<SecondaryBar page_title="Send Patients Message" shadow />
				<form className={styles.form}>
					<label>Send To</label>
					<input
						name="send_to"
						className={styles.input}
						value={send_to}
						type="text"
						onChange={(e) => this.handleChange(e)}
						placeholder="Search Patients"
					/>
					<label>Message</label>
					<textarea
						name="message"
						value={message}
						onChange={(e) => this.handleChange(e)}
						className={styles.textarea}
						placeholder="Type message here"
					/>
					<button
						type="submit"
						disabled={!send_to || !message}
						className={styles.button}
					>
						Send Message
					</button>
				</form>
			</>
		);
	}
}

export default MessageCenter;
