import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import rootReducer from "./reducers/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = composeEnhancers()(createStore);

const SignIn = lazy(() => import("./container/JS/sign_in"));
const Home = lazy(() => import("./container/JS/Home/home"));
const Patients = lazy(() => import("./container/JS/Patients/patients"));

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Suspense fallback={<p>Loading</p>}>
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
