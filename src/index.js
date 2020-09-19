import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import rootReducer from "./reducers/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import SignIn from "./container/SignIn/JS/sign_in";
import Home from "./container/Home/JS/home";
import Patients from "./container/Patients/JS/patients";
import AppointmentsPage from "./container/Appointments/JS/appointments";
import AppointmentDetailPage from "./components/Appointments/JS/appointment_detail";

//Oncology Begins
import TreatmentOutcome from "./container/AddPatientData/Oncology/treatment_outcome";
import InvestigationHistoryForm from "./container/AddPatientData/Oncology/investigation_history";
import PatientMedicalHistory from "./container/AddPatientData/Oncology/medical_history";
import DrugHistory from "./container/AddPatientData/Oncology/drug_history";

import PatientDetail from "./container/Patients/JS/patient_detail";
import BookAppointment from "./container/Appointments/JS/book_appointment";
import MessageCenter from "./container/Message_Center/JS/message_center";
import SettingsPage from "./components/Settings/JS/settings";
import SearchFolderNoPage from "./components/SearchFolderNo/JS/search_folder_no";
import ProfilePage from "./container/Profile/JS/profile";

//Patient Detail
import RecordList from "./components/Patients/JS/data_category_list";
import BioData from "./components/Patients/JS/Oncology/bio-data";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = composeEnhancers()(createStore);

const PatientBiodata = () => {
	const registry = localStorage.account
		? JSON.parse(localStorage.account).Department
		: null;
	if (registry === "Oncology")
		return lazy(() =>
			import("./container/AddPatientData/Oncology/patient_biodata")
		);
	if (registry === "Diabetes")
		return lazy(() =>
			import("./container/AddPatientData/Diabetes/patient_biodata")
		);
	if (registry === "Asthma")
		return lazy(() =>
			import("./container/AddPatientData/Asthma/patient_biodata")
		);
};

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Suspense fallback={<p>Loading</p>}>
					<Route
						exact
						path="/appointment_detail/:id"
						component={AppointmentDetailPage}
					/>
					<Route
						exact
						path="/patients/:id/bio-data"
						component={BioData}
					/>
					<Route
						exact
						path="/patients/:id/record_list"
						component={RecordList}
					/>
					<Route
						exact
						path="/patients/:id"
						component={PatientDetail}
					/>
					<Route
						path="/add_patient_data/patient_biodata"
						component={PatientBiodata()}
					/>
					<Route
						path="/add_patient_data/medical_history"
						component={PatientMedicalHistory}
					/>
					<Route
						path="/add_patient_data/drug_history"
						component={DrugHistory}
					/>
					<Route
						path="/add_patient_data/investigation_history"
						component={InvestigationHistoryForm}
					/>
					<Route
						path="/add_patient_data/treatment_outcome"
						component={TreatmentOutcome}
					/>
					<Route
						path="/search_folder_number"
						component={SearchFolderNoPage}
					/>
					<Route path="/profile" component={ProfilePage} />
					<Route
						exact
						path="/appointments"
						component={AppointmentsPage}
					/>
					<Route exact path="/settings" component={SettingsPage} />
					<Route
						exact
						path="/message_center"
						component={MessageCenter}
					/>
					<Route
						path="/book_appointment"
						component={BookAppointment}
					/>
					<Route exact path="/patients" component={Patients} />
					<Route path="/sign_in" component={SignIn} />
					<Route exact path="/" component={Home} />
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
