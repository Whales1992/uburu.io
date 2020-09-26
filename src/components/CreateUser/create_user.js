import React, { useState } from "react";
import TopBar from "../UI/JS/topbar";
import SecondaryBar from "../UI/JS/secondary_navbar";
import Title from "../UI/JS/title";
import styles from "./create_user.module.css";

const url = process.env.REACT_APP_BASE_URL;

const CreateUserPage = () => {
	const [values, setValue] = useState({
		FirstName: "",
		LastName: "",
		Image: "",
		PhoneNumber: "",
		Email: "",
		Password: "",
		Submitting: false,
		error: {
			status: false,
			message: ""
		},
		SuccessMessage: ""
	});

	const {
		FirstName,
		LastName,
		Image,
		PhoneNumber,
		Email,
		Password,
		Submitting,
		error,
		SuccessMessage
	} = values;

	function handleChange(name, e) {
		setValue({
			...values,
			[name]: e.target.value
		});
	}

	async function createUser(e) {
		e.preventDefault();

		try {
			setValue({ ...values, Submitting: true });
			if (!window.navigator.onLine) {
				throw Error("Network connection is needed for this action.");
			}

			const user = {
				RegistryID: JSON.parse(localStorage.account).RegistryID,
				FirstName,
				LastName,
				Image,
				PhoneNumber,
				Email,
				Password
			};

			const request = await fetch(`${url}/auth/user`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.token}`
				},
				body: JSON.stringify(user)
			});

			if (!request.ok) {
				const err = await request.json();
				throw Error(err.error);
			}

			//reset Values and set success message
			setValue({
				...values,
				FirstName: "",
				LastName: "",
				Image: "",
				PhoneNumber: "",
				Email: "",
				Password: "",
				Submitting: false,
				SuccessMessage: "User successfully created."
			});

			//Remove success message after 3 secs
			setTimeout(
				() =>
					setValue({
						...values,
						SuccessMessage: ""
					}),
				3000
			);
		} catch (e) {
			setValue({
				...values,
				Submitting: false,
				error: {
					status: true,
					message: e.message
				}
			});
			setTimeout(
				() =>
					setValue({
						...values,
						error: {
							status: false,
							message: ""
						}
					}),
				3000
			);
		}
	}

	return (
		<>
			<TopBar />
			<SecondaryBar shadow page_title="Create User" />
			<Title title="Create User" />
			<form className={styles.form} onSubmit={(e) => createUser(e)}>
				<label htmlFor="FirstName">First Name</label>
				<input
					id="FirstName"
					type="text"
					name="FirstName"
					className={styles.input}
					onChange={(e) => handleChange("FirstName", e)}
					value={FirstName}
					placeholder="Enter LastName"
					required
				/>
				<label htmlFor="LastName">Last Name</label>
				<input
					id="LastName"
					type="text"
					name="LastName"
					className={styles.input}
					onChange={(e) => handleChange("LastName", e)}
					value={LastName}
					placeholder="Enter LastName"
					required
				/>
				<label htmlFor="Email">Email</label>
				<input
					id="Email"
					type="email"
					name="Email"
					className={styles.input}
					onChange={(e) => handleChange("Email", e)}
					value={Email}
					placeholder="Enter Email"
					required
				/>
				<label htmlFor="Password">Password</label>
				<input
					id="Password"
					type="Password"
					name="Email"
					className={styles.input}
					onChange={(e) => handleChange("Password", e)}
					value={Password}
					placeholder="Enter Password"
					required
				/>
				<label htmlFor="PhoneNumber">Phone Number</label>
				<input
					id="PhoneNumber"
					type="tel"
					name="PhoneNumber"
					className={styles.input}
					onChange={(e) => handleChange("PhoneNumber", e)}
					value={PhoneNumber}
					placeholder="Enter Phone Number (0xxxxxx)"
					minLength="11"
					maxLength="11"
				/>
				<label htmlFor="Image">Profile Image</label>
				<input
					id="Image"
					type="file"
					name="Image"
					className={styles.input}
					onChange={(e) => handleChange("Image", e)}
					value={Image}
					placeholder="Choose profile photo"
				/>
				<button
					type="submit"
					className={["primary_btn", styles.btn].join(" ")}
				>
					{Submitting ? "Creating" : "Create"}
				</button>
				{error.status && (
					<p className={styles.error}>{error.message}</p>
				)}
				{SuccessMessage && (
					<p className={styles.success}>{SuccessMessage}</p>
				)}
			</form>
		</>
	);
};

export default CreateUserPage;
