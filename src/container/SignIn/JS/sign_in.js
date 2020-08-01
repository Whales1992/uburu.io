import React, { Component } from "react";
import { connect } from "react-redux";
import ErrorModal from "../../../components/UI/JS/error_modal";
import logo from "../../../images/logo.svg";

import { errorHandler } from "../../../actions/general/index";

//style
import styles from "../CSS/sign_in.module.css";
const url = "https://api.notitiang.com";

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			email: "",
			submitting: false
		};
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const tokenExpirationTime = localStorage.expiresIn;

		if (Date.now() < parseInt(tokenExpirationTime))
			this.props.history.push("/admin/dashboard");
	}

	handleEmailChange(e) {
		const value = e.target.value;
		this.setState({ email: value });
	}

	handlePasswordChange(e) {
		const value = e.target.value;
		this.setState({ password: value });
	}

	async handleSubmit(e) {
		e.preventDefault();
		this.setState({ submitting: true });
		const { email, password } = this.state;
		try {
			const request = await fetch(`${url}/auth/user/`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					Email: email,
					Password: password
				})
			});

			if (!request.ok) {
				this.setState({ submitting: false });
				const error = await request.json();
				throw Error(error.Message);
			}

			const data = await request.json();
			localStorage.setItem("accessToken", data.Token);
			localStorage.setItem("account", JSON.stringify(data.Message));
			this.props.history.push("/");
		} catch (err) {
			this.props.errorHandler(err);
		}
	}

	render() {
		const { showing, message } = this.props.errorModal;
		const { email, password, submitting } = this.state;

		return (
			<div className={styles.div}>
				{showing ? (
					<ErrorModal message={message} show={showing} />
				) : null}
				<form
					className={styles.form}
					onSubmit={(e) => this.handleSubmit(e)}
				>
					<img src={logo} alt="blue_circle logo" />
					<label>Email</label>
					<input
						value={this.state.email}
						onChange={(e) => this.handleEmailChange(e)}
						type="email"
						name="email"
						placeholder="Enter email"
						required
					/>
					<label>Password</label>
					<input
						value={this.state.password}
						onChange={(e) => this.handlePasswordChange(e)}
						type="password"
						name="password"
						placeholder="Enter password (minimum length, 6)"
						minLength="6"
						required
					/>
					<button
						className={"primary_btn"}
						type="submit"
						disabled={
							email === "" ||
							password === "" ||
							password.length < 6 ||
							submitting
								? true
								: false
						}
					>
						Sign In
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	form: state.form.sign_in_form,
	errorModal: state.general.errorModal
});

const mapDispatchToProps = (dispatch) => ({
	errorHandler: (...args) => errorHandler(...args, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
