import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../CSS/settings.module.css";
import SecondaryBar from "../../UI/JS/secondary_navbar";
import CheckUpdates from "../../../images/Settings/check_updates.svg";
import AddUser from "../../../images/Settings/add_user.svg";
import LogOut from "../../../images/Settings/log_out.svg";
import Upload from "../../../images/Settings/upload.svg";
import ViewUsers from "../../../images/Settings/view_users.svg";
import Topbar from "../../UI/JS/topbar";
import Title from "../../../components/UI/JS/title";

const SettingsPage = () => {
	const history = useHistory();

	const logout = () => {
		localStorage.clear();
		history.push("sign_in");
	};

	return (
		<>
			<Topbar />
			<SecondaryBar shadow page_title="Settings" />
			<Title title="Settings" />
			<div className={styles.settings_menu}>
				<div className={styles.menu_item}>
					<img src={Upload} alt="upload to the cloud icon" />
					<div>
						<span>Sync Data Online</span>
						<span>Last sync date: 18/04/2020</span>
					</div>
				</div>
				<Link to="/create_user" className={styles.menu_item}>
					<img src={AddUser} alt="add user icon" />
					<div>
						<span>Create User</span>
						<span>Create a new Doctor profile</span>
					</div>
				</Link>
				<Link to="/users" className={styles.menu_item}>
					<img src={ViewUsers} alt="users icon" />
					<div>
						<span>View Users</span>
						<span>List of all Doctors in your Hospital</span>
					</div>
				</Link>
				<div className={styles.menu_item}>
					<img src={CheckUpdates} alt="phone icon" />
					<div>
						<span>Check for Updates</span>
						<span>Current version: V 1.0</span>
					</div>
				</div>
				<button className={styles.log_out} onClick={() => logout()}>
					<img src={LogOut} alt="power icon" />
					<span>Log out</span>
				</button>
			</div>
		</>
	);
};

export default SettingsPage;
