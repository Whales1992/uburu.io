import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import rootReducer from "./reducers/index";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import SignIn from "./container/SignIn/JS/sign_in";
import Home from "./container/Home/JS/home";
import Patients from "./container/Patients/JS/patients";
import AppointmentsPage from "./container/Appointments/JS/appointments";
import AppointmentDetailPage from "./components/Appointments/JS/appointment_detail";

import BookAppointment from "./container/Appointments/JS/book_appointment";
import PatientEngagement from "./container/Message_Center/JS/message_center";
import SettingsPage from "./components/Settings/JS/settings";
import SearchFolderNoPage from "./components/SearchFolderNo/JS/search_folder_no";
import ProfilePage from "./container/Profile/JS/profile";

//Patient Detail
import RecordList from "./components/Patients/JS/data_category_list";
import OncologyPatientBioData from "./components/Patients/Oncology/JS/bio-data";
import DiabetesPatientBioData from "./components/Patients/Diabetes/JS/bio-data";
import AsthmaPatientBioData from "./components/Patients/Asthma/JS/bio-data";
import MedicalHistory from "./components/Patients/JS/medical_history_data";
import PatientDrugHistory from "./components/Patients/JS/drug_history";
import InvestigationHistory from "./components/Patients/JS/investigation_history";
import PatientTreatmentOutcome from "./components/Patients/Oncology/JS/treatment_outcome";

//Oncology data forms
import OncologyPatientBiodataForm from "./container/AddPatientData/Oncology/patient_biodata";
import OncologyMedicalHistoryForm from "./container/AddPatientData/Oncology/medical_history";
import OncologyDrugHistoryForm from "./container/AddPatientData/Oncology/drug_history";
import OncologyInvestigationHistoryForm from "./container/AddPatientData/Oncology/investigation_history";
import OncologyTreatmentOutcomeForm from "./container/AddPatientData/Oncology/treatment_outcome";

//Diabetes data forms
import DiabetesPatientBiodataForm from "./container/AddPatientData/Diabetes/patient_biodata";
import DiabetesMedicalHistoryForm from "./container/AddPatientData/Diabetes/medical_history";
import DiabetesDrugHistoryForm from "./container/AddPatientData/Diabetes/drug_history";
import DiabetesInvestigationHistoryForm from "./container/AddPatientData/Diabetes/investigation_history";

//Asthma data forms
import AsthmaPatientBiodataForm from "./container/AddPatientData/Asthma/patient_biodata";
import AsthmaMedicalHistoryForm from "./container/AddPatientData/Asthma/medical_history";
import AsthmDrugHistoryForm from "./container/AddPatientData/Asthma/drug_history";
import AsthmaInvestigationHistoryForm from "./container/AddPatientData/Asthma/investigation_history";

import CreateUserPage from "./components/CreateUser/create_user";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = composeEnhancers()(createStore);

//conditionally import forms
const PatientBiodataForm = () => {
	const registry = localStorage.account
		? JSON.parse(localStorage.account).Name
		: null;
	if (registry === "Oncology") return OncologyPatientBiodataForm;
	if (registry === "Diabetes") return DiabetesPatientBiodataForm;
	if (registry === "Asthma") return AsthmaPatientBiodataForm;
};

const PatientMedicalHistoryForm = () => {
	const registry = localStorage.account
		? JSON.parse(localStorage.account).Name
		: null;
	if (registry === "Oncology") return OncologyMedicalHistoryForm;
	if (registry === "Diabetes") return DiabetesMedicalHistoryForm;
	if (registry === "Asthma") return AsthmaMedicalHistoryForm;
};

const DrugHistoryForm = () => {
	const registry = localStorage.account
		? JSON.parse(localStorage.account).Name
		: null;
	if (registry === "Oncology") return OncologyDrugHistoryForm;
	if (registry === "Diabetes") return DiabetesDrugHistoryForm;
	if (registry === "Asthma") return AsthmDrugHistoryForm;
};

const InvestigationHistoryForm = () => {
	const registry = localStorage.account
		? JSON.parse(localStorage.account).Name
		: null;
	if (registry === "Oncology") return OncologyInvestigationHistoryForm;
	if (registry === "Diabetes") return DiabetesInvestigationHistoryForm;
	if (registry === "Asthma") return AsthmaInvestigationHistoryForm;
};

const TreatmentOutcomeForm = () => {
	const registry = localStorage.account
		? JSON.parse(localStorage.account).Name
		: null;
	if (registry === "Oncology") return OncologyTreatmentOutcomeForm;
	// if (registry === "Diabetes")
	// 	return () =>
	// 		import("./container/AddPatientData/Diabetes/");
	// if (registry === "Asthma")
	// 	return () =>
	// 		import("./container/AddPatientData/Asthma/investigation_history");
};

const PatientBioData = () => {
	const registry = localStorage.account
		? JSON.parse(localStorage.account).Name
		: null;
	if (registry === "Oncology") return OncologyPatientBioData;
	if (registry === "Diabetes") return DiabetesPatientBioData;
	if (registry === "Asthma") return AsthmaPatientBioData;
};

function AuthRoute({ children, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				localStorage.token ? (
					children
				) : (
					<Redirect
						to={{ pathname: "/sign_in", state: { from: location } }}
					/>
				)
			}
		/>
	);
}

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Suspense fallback={<p>Loading</p>}>
					<AuthRoute path="/appointment_detail/:id" exact>
						<AppointmentDetailPage />
					</AuthRoute>

					<AuthRoute exact path="/patients/:id/treatment_outcome">
						<PatientTreatmentOutcome />
					</AuthRoute>

					<AuthRoute exact path="/patients/:id/investigation_history">
						<InvestigationHistory />
					</AuthRoute>

					<AuthRoute exact path="/patients/:id/drug_history">
						<PatientDrugHistory />
					</AuthRoute>

					<AuthRoute exact path="/patients/:id/medical_history">
						<MedicalHistory />
					</AuthRoute>

					<AuthRoute exact path="/patients/:id/bio-data">
						<PatientBioData />
					</AuthRoute>

					<AuthRoute exact path="/patients/:id/record_list">
						<RecordList />
					</AuthRoute>

					{/* <Route
						exact
						path="/patients/:id"
						component={PatientDetail}
					/> */}

					<AuthRoute path="/add_patient_data/patient_biodata">
						<PatientBiodataForm />
					</AuthRoute>

					<AuthRoute path="/add_patient_data/medical_history">
						<PatientMedicalHistoryForm />
					</AuthRoute>

					<AuthRoute path="/add_patient_data/drug_history">
						<DrugHistoryForm />
					</AuthRoute>

					<AuthRoute path="/add_patient_data/investigation_history">
						<InvestigationHistoryForm />
					</AuthRoute>

					<AuthRoute path="/add_patient_data/treatment_outcome">
						<TreatmentOutcomeForm />
					</AuthRoute>

					<AuthRoute path="/search_folder_number">
						<SearchFolderNoPage />
					</AuthRoute>

					<AuthRoute path="/profile">
						<ProfilePage />
					</AuthRoute>

					<AuthRoute path="/create_user">
						<CreateUserPage />
					</AuthRoute>

					<AuthRoute exact path="/appointments">
						<AppointmentsPage />
					</AuthRoute>

					<AuthRoute exact path="/settings">
						<SettingsPage />
					</AuthRoute>

					<AuthRoute exact path="/patient_engagement">
						<PatientEngagement />
					</AuthRoute>

					<AuthRoute path="/book_appointment">
						<BookAppointment />
					</AuthRoute>

					<AuthRoute exact path="/patients" component={Patients}>
						<Patients />
					</AuthRoute>

					<Route path="/sign_in" component={SignIn} />

					<AuthRoute exact path="/">
						<Home />
					</AuthRoute>
				</Suspense>
			</Switch>
		</BrowserRouter>
	);
};

ReactDOM.render(
	<Provider store={store(rootReducer)}>
		<App />
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
