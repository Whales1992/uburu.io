import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import rootReducer from './reducers/index';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import SignIn from './container/SignIn/JS/sign_in';
import Home from './container/Home/JS/home';
import Patients from './container/Patients/JS/patients';
import AppointmentsPage from './container/Appointments/JS/appointments';
import AppointmentDetailPage from './components/Appointments/JS/appointment_detail';

import BookAppointment from './container/Appointments/JS/book_appointment';
import PatientEngagement from './container/Message_Center/JS/message_center';
import SettingsPage from './components/Settings/JS/settings';
import SearchFolderNoPage from './components/SearchFolderNo/JS/search_folder_no';
import ProfilePage from './container/Profile/JS/profile';
import UpdatePatient from './components/Patients/UpdatePatient/JS/UpdatePatient';

//Patient Detail
import RecordList from './components/Patients/JS/data_category_list';
import OncologyPatientBioData from './components/Patients/Oncology/JS/bio-data';
import DiabetesPatientBioData from './components/Patients/Diabetes/JS/bio-data';
import AsthmaPatientBioData from './components/Patients/Asthma/JS/bio-data';
import MedicalHistory from './components/Patients/JS/medical_history_data';
import PatientDrugHistory from './components/Patients/JS/drug_history';
import InvestigationHistory from './components/Patients/JS/investigation_history';
import PatientTreatmentOutcome from './components/Patients/Oncology/JS/treatment_outcome';

import PatientTreatmentOutcome2 from './components/Patients/JS/patient_treatment_outcome';

//Oncology data forms
import OncologyPatientBiodataForm from './container/AddPatientData/Oncology/patient_biodata';
import OncologyMedicalHistoryForm from './container/AddPatientData/Oncology/medical_history';
import OncologyDrugHistoryForm from './container/AddPatientData/Oncology/drug_history';
import OncologyInvestigationHistoryForm from './container/AddPatientData/Oncology/investigation_history';
import OncologyTreatmentOutcomeForm from './container/AddPatientData/Oncology/treatment_outcome';

//Diabetes data forms
import DiabetesPatientBiodataForm from './container/AddPatientData/Diabetes/patient_biodata';
import DiabetesMedicalHistoryForm from './container/AddPatientData/Diabetes/medical_history';
import DiabetesDrugHistoryForm from './container/AddPatientData/Diabetes/drug_history';
import DiabetesInvestigationHistoryForm from './container/AddPatientData/Diabetes/investigation_history';
import DiabetesTreatmentOutcomeForm from './container/AddPatientData/Diabetes/treatment_outcome';

//Asthma data forms
import AsthmaPatientBiodataForm from './container/AddPatientData/Asthma/patient_biodata';
import AsthmaMedicalHistoryForm from './container/AddPatientData/Asthma/medical_history';
import AsthmDrugHistoryForm from './container/AddPatientData/Asthma/drug_history';
import AsthmaInvestigationHistoryForm from './container/AddPatientData/Asthma/investigation_history';
import AsthmaTreatmentOutcomeForm from './container/AddPatientData/Asthma/treatment_outcome';

import CreateUserPage from './components/CreateUser/create_user';
import MedicalAnalytics from './components/MedicalAnalytics/JS/medical_analytics';
import AppointmentsSidePage from './components/Patients/JS/appointments_page';
import AppointmentDetail from './components/Patients/AppointmentSide/appointment_detail';
import CreateAppointment from './components/Patients/AppointmentSide/create_appointment';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = composeEnhancers()(createStore);

//conditionally import forms
const PatientBiodataForm = (props) => {
  const registry = localStorage.account
    ? JSON.parse(localStorage.account).Name
    : null;

  if (registry === 'Oncology') return <OncologyPatientBiodataForm {...props} />;
  if (registry === 'Diabetes') return <DiabetesPatientBiodataForm {...props} />;
  if (registry === 'Asthma') return <AsthmaPatientBiodataForm {...props} />;
};

const PatientMedicalHistoryForm = (props) => {
  const registry = localStorage.account
    ? JSON.parse(localStorage.account).Name
    : null;
  if (registry === 'Oncology') return <OncologyMedicalHistoryForm {...props} />;
  if (registry === 'Diabetes') return <DiabetesMedicalHistoryForm {...props} />;
  if (registry === 'Asthma') return <AsthmaMedicalHistoryForm {...props} />;
};

const DrugHistoryForm = (props) => {
  const registry = localStorage.account
    ? JSON.parse(localStorage.account).Name
    : null;
  if (registry === 'Oncology') return <OncologyDrugHistoryForm {...props} />;
  if (registry === 'Diabetes') return <DiabetesDrugHistoryForm {...props} />;
  if (registry === 'Asthma') return <AsthmDrugHistoryForm {...props} />;
};

const InvestigationHistoryForm = (props) => {
  const registry = localStorage.account
    ? JSON.parse(localStorage.account).Name
    : null;
  if (registry === 'Oncology')
    return <OncologyInvestigationHistoryForm {...props} />;
  if (registry === 'Diabetes')
    return <DiabetesInvestigationHistoryForm {...props} />;
  if (registry === 'Asthma')
    return <AsthmaInvestigationHistoryForm {...props} />;
};

const TreatmentOutcomeForm = (props) => {
  const registry = localStorage.account
    ? JSON.parse(localStorage.account).Name
    : null;
  if (registry === 'Oncology')
    return <OncologyTreatmentOutcomeForm {...props} />;
  if (registry === 'Diabetes')
    return <DiabetesTreatmentOutcomeForm {...props} />;
  if (registry === 'Asthma') return <AsthmaTreatmentOutcomeForm {...props} />;
};

const PatientBioData = (props) => {
  const registry = localStorage.account
    ? JSON.parse(localStorage.account).Name
    : null;

  console.log("@registry", registry);

  if (registry === 'Oncology') return <OncologyPatientBioData {...props} />;
  if (registry === 'Diabetes') return <DiabetesPatientBioData {...props} />;
  if (registry === 'Asthma') return <AsthmaPatientBioData {...props} />;
};

function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        localStorage.token ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/sign_in',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
}

const App = () => {
  return (
    <div
      onClick={() => {
        global.dismissMoreMenu();
      }}
    >
      <BrowserRouter>
        <Switch>
          <Suspense fallback={<p>Loading</p>}>
            <AuthRoute
              path="/appointment_detail/:id"
              exact
              component={AppointmentDetailPage}
            />

            <AuthRoute
              exact
              path="/patients/:id/treatment_outcome"
              component={PatientTreatmentOutcome}
            />

            <AuthRoute
              exact
              path="/patients/:id/patient_treatment_outcome"
              component={PatientTreatmentOutcome2}
            />

            <AuthRoute
              exact
              path="/patients/:id/appointments_page"
              component={AppointmentsSidePage}
            />
            <AuthRoute
              exact
              path="/patients/appointments_detail"
              component={AppointmentDetail}
            />
            <AuthRoute
              exact
              path="/createAppointment"
              component={CreateAppointment}
            />

            <AuthRoute
              exact
              path="/patients/:id/investigation_history"
              component={InvestigationHistory}
            />

            <AuthRoute
              exact
              path="/patients/:id/drug_history"
              component={PatientDrugHistory}
            />

            <AuthRoute
              exact
              path="/patients/:id/medical_history"
              component={MedicalHistory}
            />

            <AuthRoute
              exact
              path="/patients/:id/bio-data"
              component={PatientBioData}
            />

            <AuthRoute
              exact
              path="/patients/:id/record_list"
              component={RecordList}
            />

            {/* <Route
						exact
						path="/patients/:id"
						component={PatientDetail}
					/> */}

            <AuthRoute
              path="/add_patient_data/patient_biodata"
              component={PatientBiodataForm}
            />

            <AuthRoute
              path="/add_patient_data/medical_history"
              component={PatientMedicalHistoryForm}
            />

            <AuthRoute
              path="/add_patient_data/drug_history"
              component={DrugHistoryForm}
            />

            <AuthRoute
              path="/add_patient_data/investigation_history"
              component={InvestigationHistoryForm}
            />

            <AuthRoute
              path="/add_patient_data/treatment_outcome"
              component={TreatmentOutcomeForm}
            />

            <AuthRoute
              path="/search_folder_number"
              component={SearchFolderNoPage}
            />

            <AuthRoute path="/update_patient" component={UpdatePatient} />

            <AuthRoute path="/profile" component={ProfilePage} />

            <AuthRoute path="/create_user" component={CreateUserPage} />

            <AuthRoute
              exact
              path="/appointments"
              component={AppointmentsPage}
            />

            <AuthRoute path="/settings" component={SettingsPage} />

            <AuthRoute
              exact
              path="/patient_engagement"
              component={PatientEngagement}
            />

            <AuthRoute path="/book_appointment" component={BookAppointment} />

            <AuthRoute path="/medical_analytics" component={MedicalAnalytics} />

            <AuthRoute exact path="/patients" component={Patients} />

            <Route path="/sign_in" component={SignIn} />

            <AuthRoute exact path="/" component={Home} />
          </Suspense>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(
  <Provider store={store(rootReducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
