import React, { Component } from "react";
import Layout from "../../UI/JS/layout";
import Tab from "../../../components/UI/JS/tab";
import styles from "../../Patients/CSS/patients.module.css";
import pageStyles from "../../Profile/CSS/profile.module.css";
import Avatar from "../../../images/Profile/avatar.svg";
import Switch from "../../../images/Profile/switch.svg";

const account = localStorage.account && JSON.parse(localStorage.account);

class ProfilePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: "Personal",
			loading: false
		};

		this.switchTabs = this.switchTabs.bind(this);
	}

	async switchTabs(tab) {
		await this.setState({ activeTab: tab });
	}

	render() {
		const { activeTab } = this.state;
		return (
			<Layout pageTitle="Dr. Nuel Njikoka">
				<Tab>
					<div
						onClick={() => this.switchTabs("Personal")}
						key={"Personal"}
						className={
							activeTab === "Personal"
								? [styles.each_tab, styles.tab_active].join(" ")
								: styles.each_tab
						}
					>
						Personal
					</div>
					<div
						onClick={() => this.switchTabs("Security")}
						key={"Security"}
						className={
							activeTab === "Security"
								? [styles.each_tab, styles.tab_active].join(" ")
								: styles.each_tab
						}
					>
						Security
					</div>
				</Tab>
				{activeTab === "Personal" ? (
					<div className={pageStyles.profile_div}>
						<div className={pageStyles.avatar_area}>
							<img src={Avatar} alt="user profile" />
							<span>Tap to change picture</span>
						</div>
						<div className={pageStyles.details}>
							<div className={pageStyles.indiv_info}>
								<span className={pageStyles.field}>
									Full Name
								</span>
								<span className={pageStyles.value}>
									{account.FirstName + " " + account.LastName}
								</span>
							</div>
							{account.Admin ? (
								<div className={pageStyles.indiv_info}>
									<span className={pageStyles.field}>
										Account Role
									</span>
									<span className={pageStyles.value}>
										Admin
									</span>
								</div>
							) : null}
							<div className={pageStyles.indiv_info}>
								<span className={pageStyles.field}>
									Work Phone
								</span>
								<span className={pageStyles.value}>
									07012345678
								</span>
							</div>
							<div className={pageStyles.indiv_info}>
								<span className={pageStyles.field}>Email</span>
								<span className={pageStyles.value}>
									{account.Email}
								</span>
							</div>
						</div>
						<button type="button" className="primary_btn">
							Update Profile
						</button>
					</div>
				) : (
					<div className={pageStyles.security_profile_div}>
						<div className={pageStyles.security_details}>
							<div className={pageStyles.indiv_info}>
								<span>Change Password</span>
								<span>**********</span>
							</div>
							{/* <div className={pageStyles.indiv_info}>
								<span>Use Biometrics</span>
								<span>
									<img
										className={pageStyles.switch}
										src={Switch}
										alt="use biometric switch"
									/>
								</span>
							</div> */}
						</div>
						<button type="button" className="primary_btn">
							Update Profile
						</button>
					</div>
				)}
			</Layout>
		);
	}
}

export default ProfilePage;
