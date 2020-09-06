import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import rootReducer from "./reducers/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import TreatmentOutcome from "./container/AddPatientData/JS/treatment_outcome";
import InvestigationHistoryForm from "./container/AddPatientData/JS/investigation_history";
import PatientMedicalHistory from "./container/AddPatientData/JS/medical_history";
import PatientBiodata from "./container/AddPatientData/JS/patient_biodata";
import PatientDetail from "./container/Patients/JS/patient_detail";
import BookAppointment from "./container/Appointments/JS/book_appointment";
import MessageCenter from "./container/Message_Center/JS/message_center";
import SettingsPage from "./components/Settings/JS/settings";
import SearchFolderNoPage from "./components/SearchFolderNo/JS/search_folder_no";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = composeEnhancers()(createStore);

const SignIn = lazy(() => import("./container/SignIn/JS/sign_in"));
const Home = lazy(() => import("./container/Home/JS/home"));
const Patients = lazy(() => import("./container/Patients/JS/patients"));
const AppointmentsPage = lazy(() =>
	import("./container/Appointments/JS/appointments")
);
const AppointmentDetailPage = lazy(() =>
	import("./components/Appointments/JS/appointment_detail")
);
const ProfilePage = lazy(() => import("./container/Profile/JS/profile"));

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
						path="/patient_detail/:id"
						component={PatientDetail}
					/>
					<Route
						path="/add_patient_data/patient_biodata"
						component={PatientBiodata}
					/>
					<Route
						path="/add_patient_data/medical_history"
						component={PatientMedicalHistory}
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
