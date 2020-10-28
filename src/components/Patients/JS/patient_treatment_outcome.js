import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-date-picker';
// import localForage from "localforage";
import SecondaryBar from '../../UI/JS/secondary_navbar';
import TopBar from '../../UI/JS/topbar';
import Shell from './detail_shell';

import { Overlay } from 'react-portal-overlay';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import styles from '../../../container/AddPatientData/CSS/add_patient_data.module.css';
const url = process.env.REACT_APP_BASE_URL;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const PatientTreatmentOutcome2 = () => {
  const patient = useLocation().state;
  const treatmentOutcome =
    patient.records &&
    patient.records.filter((patient) => patient.Type === 'Treatment');

  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [effects, setEffects] = useState({
    loading: false,
    error: {
      error: false,
      message: '',
      title: "Info"
    },
  });

  const [values, changeValues] = useState({
    Status: treatmentOutcome ? treatmentOutcome.Status : '',
    StatusDate: treatmentOutcome ? treatmentOutcome.StatusDate : '',
  });

  function handleChange(name, e) {
    e.preventDefault();
    let value;

    if (name === 'StatusDate') {
      value = e;
    } else {
      value = e.target.value;
    }

    changeValues({ ...values, [name]: value });
  }

  async function update(e) {
    e.preventDefault();

    const payload = { Type: 'Treatment', Outcome: values.Status, RecordDate: values.StatusDate, RecordID: treatmentOutcome.RecordID }
    console.log("@update", payload);

    try {
      if (window.navigator.onLine) {
        setEffects({
          ...effects,
          loading: true
        });
        const request = await fetch(`${url}/UpdateRecords`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!request.ok) {
          const error = await request.json();
          throw Error(error.error);
        }

        const data = await request.json();
        setEffects({
          ...effects,
          loading: false,
          error: {
            error: false,
            title: "Success",
            message: `${data.message}`,
          },
        });
        setShowInfoDialog(true);
      } else {
        setEffects({
          ...effects,
          loading: false,
          error: {
            error: true,
            title: "Network",
            message: "Connection Error",
          },
        });
        setShowInfoDialog(true);
      }
    } catch (error) {
      setTimeout(() => {
        setEffects({
          ...effects,
          loading: false,
          error: {
            error: true,
            title: "Error",
            message: error.message,
          },
        });

        setShowInfoDialog(true);
      }, 2000);
    }
  }

  return (
    <>
      <TopBar hide_on_small_screens />
      <SecondaryBar page_title="Treatment Outcome" shadow />
      <Shell name={`${patient.LastName} ${patient.FirstName}`}>
        <form className={styles.form} onSubmit={(e) => update(e, 'Treatment')}>
          <div className={styles.fields}>
            <div>
              <label htmlFor="outcome">Status</label>
              <select
                id="outcome"
                name="treatment outcome"
                className={styles.input}
                selected={treatmentOutcome.Status !== undefined ? treatmentOutcome.Status : 'JJJ'}
                value={values.Status !== '' ? values.Status : treatmentOutcome.Status !== undefined ? '' : treatmentOutcome.Status}
                onChange={(e) => handleChange('Status', e)}
                required
              >
                <option></option>
                <option>Good Clinical Response</option>
                <option>Poor Clinical Response</option>
                <option>Complete Remission</option>
                <option>Disease Progression</option>
                <option>Alive and Stable</option>
                <option>Died on Treatment</option>
                <option>Died after Treatment</option>
              </select>
            </div>
            <div>
              <label className={!values.Status ? 'disabled_label' : ''}>
                Status Date
              </label>
              <DatePicker
                name="StatusDate"
                className={styles.input}
                onChange={(e) => handleChange('StatusDate', e)}
                value={values.StatusDate}
                format="dd/MM/y"
                required
                disabled={!values.Status}
              />
            </div>
          
          </div>
          <div className={styles.btn_area}>
            <button
              className="primary_btn"
              type="submit"
              disabled={!values.Status}
              onClick={(e) => update(e)}>
              Update Treatment Outcome
            </button>
          </div>
        </form>
      </Shell>


      {/* Begin Show Info Dialog */}
      <Overlay
        className={styles.modal}
        closeOnClick={true}
        open={showInfoDialog}
        onClose={() => {
          setShowInfoDialog(false);
        }}>
        <div className={styles.modal_paper}>
          <div className={styles.modalTop2}>
            <p className={styles.appTitle}>{effects.error.title}</p>
          </div>
          <div className={styles.inputGpWrap}>
            <p>{effects.error.message}</p>
          </div>
          <div
            onClick={() => {
              setShowInfoDialog(false);
            }}
            className={styles.pCreate}
          >
            Dismiss
          </div>
        </div>
      </Overlay>
      {/* End Show Info Dialog */}


      {/* Begin Spinner Show */}
      <Overlay
        className={styles.modal}
        closeOnClick={true}
        open={effects.loading}
        onClose={() => {
          setShowInfoDialog(false);
        }}>
        <ClipLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={true}
        />
      </Overlay>

    </>
  );
};

export default PatientTreatmentOutcome2;
