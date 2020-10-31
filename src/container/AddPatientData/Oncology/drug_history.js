import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import localForage from "localforage";
import DatePicker from "react-date-picker";
import SecondaryBar from "../../../components/UI/JS/secondary_navbar";
import TopBar from "../../../components/UI/JS/topbar";
import Shell from "../../../components/AddPatientData/JS/shell";

import { Overlay } from 'react-portal-overlay';

//style
import styles from "../CSS/add_patient_data.module.css";
import styles2 from "../CSS/medical_history.module.css";


const url = process.env.REACT_APP_BASE_URL;

const DrugHistory = ({ history }) => {
	const [inputValues, setInputValue] = useState({
		Drug: "",
		Other: "",
		Dosage: "",
		Duration: "",
		SideEffect: "",
		RecordDate: ""
	});
	const [showDropDur, setShowWrapDur] = useState(false);
	const [openState, setOpenState] = useState('');

	const durations = ['Years', 'Months', 'Days'];

	const {
		Drug,
		Other,
		Dosage,
		Duration,
		SideEffect,
		RecordDate
	} = inputValues;
	const FolderNo = useLocation().state;

	function handleChange(name, e) {
		let value;

		if (name === "RecordDate") {
			value = e;
		} else {
			value = e.target.value;
		}

		setInputValue({ ...inputValues, [name]: value });
	}


	function GetDurations() {
		return (
			<>
				{
					durations.map(function (e, i) {
						return (
							<p
								onClick={() => {
									setOpenState(e);
								}}
								style={{
									position: 'relative',
									top: 0,
									left: 0,
									width: '100%',
									cursor: 'pointer',
								}}
								key={i}
							>
								{' '}
								{e}{' '}
							</p>
						)
					})
				}
			</>
		);
	}


	function resetRecord() {
		setInputValue({
			Drug: "",
			Other: "",
			Dosage: "",
			Duration: "",
			SideEffect: "",
			RecordDate: ""
		});
	}

	async function submitRecord(e, recordName) {
		if (e) e.preventDefault();

		const modifiedRecord = {
			Drug: Drug === "Other" ? Other : Drug,
			Dosage,
			Duration,
			SideEffect,
			RecordDate,
			FolderNo,
			Type: recordName
		};

		if (window.navigator.onLine) {
			try {
				resetRecord();
				const request = await fetch(`${url}/records`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.token}`
					},
					body: JSON.stringify(modifiedRecord)
				});

				if (!request.ok) {
					const error = await request.json();
					throw Error(error.Message);
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				let recordArray = await localForage.getItem(recordName);

				if (recordArray) {
					recordArray.push(modifiedRecord);
					localForage.setItem(recordName, recordArray);
				} else {
					localForage.setItem(recordName, [modifiedRecord]);
				}
				resetRecord();
			} catch (error) {
				console.log(error);
			}
		}
	}

	async function next(recordName) {
		if (Drug && Dosage && Duration && RecordDate) {
			await submitRecord(null, recordName);
			history.push("/add_patient_data/investigation_history", FolderNo);
		} else {
			history.push("/add_patient_data/investigation_history", FolderNo);
		}
	}

	return (
		<>
			<TopBar hide_on_small_screens />
			<SecondaryBar page_title="Drug History Data" shadow />
			<Shell>
				<form
					className={styles.form}
					onSubmit={(e) => submitRecord(e, "Drugs")}
				>
					<div className={styles.fields}>
						<div>
							<label htmlFor="Drug">Drug</label>
							<select
								id="Drug"
								name="Drug"
								className={styles.input}
								value={Drug}
								onChange={(e) => handleChange("Drug", e)}
								required
							>
								<option></option>
								<option>Cisplatin</option>
								<option>Cyclophosphamide</option>
								<option>Adriamycin</option>
								<option>Doxorubicin</option>
								<option>Paclitaxel</option>
								<option>Epiribicine</option>
								<option>Docetaxel</option>
								<option>Etoposide</option>
								<option>5 Fluro-Uracil</option>
								<option>Other</option>
							</select>
						</div>
						{Drug === "Other" && (
							<div>
								<label
									className={!Drug ? "disabled_label" : ""}
									htmlFor="other"
								>
									Other Drug
								</label>
								<input
									id="other"
									type="text"
									name="other"
									className={styles.input}
									value={Other}
									onChange={(e) => handleChange("Other", e)}
									placeholder="Type in another drug"
									disabled={!Drug}
									required
								/>
							</div>
						)}
						<div>
							<label
								className={!Drug ? "disabled_label" : ""}
								htmlFor="Dosage"
							>
								Dosage (unit: mg)
							</label>
							<input
								id="Dosage"
								type="number"
								name="Dosage"
								className={styles.input}
								value={Dosage}
								onChange={(e) => handleChange("Dosage", e)}
								disabled={!Drug}
								required
							/>
						</div>
						{/* <div>
							<label
								className={!Dosage ? "disabled_label" : ""}
								htmlFor="Duration"
							>
								Duration
							</label>
							<input
								id="Duration"
								type="number"
								name="Duration"
								className={styles.input}
								value={Duration}
								onChange={(e) => handleChange("Duration", e)}
								disabled={!Dosage}
								required
							/>
						</div> */}
						<>
							<label
								className={!Dosage ? "disabled_label" : ""}
								htmlFor="Duration"
							>
								Duration
							</label>
							<div
								style={{ marginTop: 20 }}
								className={styles2.inputGpWrap}
								onClick={() => {
									setShowWrapDur(!showDropDur);
								}}
							>
								{/* Begin Duration Selection */}
								<input
									className={styles2.inputName}
									placeholder="Select Duration"
									value={
										Duration === undefined
											? ''
											: Duration
									}
									readOnly={true}
									disabled={!Dosage}
								/>
								{showDropDur ? (
									<div className={styles2.dropWrap}>
										<GetDurations />
									</div>
								) : null}
							</div>

						</>
						<div>
							<label
								className={!Duration ? "disabled_label" : ""}
								htmlFor="SideEffect"
							>
								Side Effects
							</label>
							<textarea
								id="SideEffect"
								type="text"
								name="side effect"
								placeholder="Type in side effects"
								className={styles.textarea}
								value={SideEffect}
								onChange={(e) => handleChange("SideEffect", e)}
								disabled={!Dosage}
							/>
						</div>
						<div>
							<label
								className={!Duration ? "disabled_label" : ""}
								htmlFor="RecordDate"
							>
								Date of Record
							</label>
							<DatePicker
								id="RecordDate"
								name="RecordDate"
								value={RecordDate}
								className={styles.input}
								onChange={(e) => handleChange("RecordDate", e)}
								required
								format="dd/MM/y"
								disabled={!Dosage}
							/>
						</div>
						<button
							type="submit"
							className={
								!Drug || !Dosage || !RecordDate || !Duration
									? styles2.submit_btn_disabled
									: styles2.submit_btn
							}
							disabled={
								!Drug || !Dosage || !RecordDate || !Duration
							}
						>
							Add New Record
						</button>
					</div>
					<div className={styles.btn_area}>
						<button
							className="secondary_btn"
							type="button"
							onClick={() => history.goBack()}
						>
							Back
						</button>
						<button
							className="primary_btn"
							type="button"
							onClick={() => next("Drugs")}
						>
							Continue to Investigation History
						</button>
					</div>
				</form>
			</Shell>

			{/* Days,Months, and Years Selection Overlay */}
			<Overlay
				className={styles2.modal}
				closeOnClick={true}
				open={openState !== ''}
				onClose={() => {
					setOpenState('');
				}}
			>
				<div className={styles2.modal_paper}>
					<div className={styles2.modalTop2}>
						<p className={styles2.appTitle}>{openState}</p>
						<img
							src={require('../../../images/x.svg')}
							alt=""
							onClick={() => {
								setOpenState('');
							}}
						/>
					</div>
					{/* <div className={styles.cWrap}> */}
					<div className={styles2.inputGpWrap}>
						<input
							className={styles2.inputName}
							onChange={(value) => {
								setInputValue({ ...inputValues, 'Duration': `${value.target.value} ${openState}` });
							}}
							placeholder={`How Many ${openState} ?`}
						/>
					</div>
					{/* </div> */}
					<div
						onClick={() => {
							setOpenState('');
						}}
						className={styles2.pCreate}
					>
						Ok
          </div>
				</div>
			</Overlay>
			{/* End Days,Months, and Years Selection Overlay */}

		</>
	);
};

export default DrugHistory;
