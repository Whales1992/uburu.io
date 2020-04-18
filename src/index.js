import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import rootReducer from "./reducers/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import PatientDetail from "./container/Patients/JS/patient_detail";
import BookAppointment from "./container/Appointments/JS/book_appointment";
import MessageCenter from "./container/Message_Center/JS/message_center";
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

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Suspense fallback={<p>Loading</p>}>
					<Route
						path="/appointments/:id"
						component={AppointmentDetailPage}
					/>
					<Route path="/profile" component={ProfilePage} />
					<Route
						exact
						path="/appointments"
						component={AppointmentsPage}
					/>
					<Route
						exact
						path="/message_center"
						component={MessageCenter}
					/>
					<Route
						path="/book_appointment"
						component={BookAppointment}
					/>
					<Route path="/patients" component={Patients} />
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
