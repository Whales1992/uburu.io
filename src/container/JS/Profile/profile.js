import React, { Component } from "react";
import Layout from "../../JS/UI/layout";
import Tab from "../../../components/UI/JS/tab";
import styles from "../../CSS/Patients/patients.module.css";
import pageStyles from "../../CSS/Profile/profile.module.css";
import Avatar from "../../../images/Profile/avatar.svg";
import Switch from "../../../images/Profile/switch.svg";

class AppointmentsPage extends Component {
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
					<>
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
									Nuel Njikoka
								</span>
							</div>
							<div className={pageStyles.indiv_info}>
								<span className={pageStyles.field}>
									Account Role
								</span>
								<span className={pageStyles.value}>
									Administrator
								</span>
							</div>
							<div className={pageStyles.indiv_info}>
								<span className={pageStyles.field}>
									Specialty
								</span>
								<span className={pageStyles.value}>
									Terminal Illness
								</span>
							</div>
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
									dr.nuel@gmail.com
								</span>
							</div>
						</div>
						<button type="button" className={pageStyles.update_btn}>
							Update Profile
						</button>
					</>
				) : (
					<>
						<div className={pageStyles.security_details}>
							<div className={pageStyles.indiv_info}>
								<span>Change Password</span>
								<span>**********</span>
							</div>
							<div className={pageStyles.indiv_info}>
								<span>Use Biometrics</span>
								<span>
									<img
										className={pageStyles.switch}
										src={Switch}
										alt="use biometric switch"
									/>
								</span>
							</div>
						</div>
						<button
							type="button"
							className={pageStyles.security_update_btn}
						>
							Update Profile
						</button>
					</>
				)}
			</Layout>
		);
	}
}

export default AppointmentsPage;
