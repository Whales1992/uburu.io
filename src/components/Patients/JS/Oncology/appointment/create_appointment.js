import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Overlay } from 'react-portal-overlay';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import styles from '../../../CSS/appointments_side_page.module.css';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const url = process.env.REACT_APP_BASE_URL;

const cal = require('../../../../../images/cal.svg');
const chevDown = require('../../../../../images/chevDown.svg');
const clock = require('../../../../../images/clock.svg');
const x = require('../../../../../images/x.svg');

const CreateAppointment = (props) => {
  const patient = useLocation().state;
  const [myValue, setMyValue] = useState('');
  const [myDateValue, setMyDateValue] = useState(new Date());
  const [myTimeValue, setMyTimeValue] = useState('');
  const [showDrop, setShowWrap] = useState(false);
  const { history } = props;

  const natures = ['Medical', 'Drug', 'Investigation', 'Treatment Outcome'];

  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [effects, setEffects] = useState({
    loading: false,
    error: {
      error: false,
      message: '',
      title: 'Info',
    },
  });

  const GetNatures = () => {
    return (
      <>
        {natures.map(function (e, i) {
          return (
            <p
              onClick={() => {
                setMyValue(e);
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
          );
        })}
      </>
    );
  };

  const onSubmit = async () => {
    const payload = {
      Nature: myValue,
      ValueDate: myDateValue,
      ValueTime: myTimeValue,
      FolderNo: patient.FolderNo,
    };

    try {
      if (window.navigator.onLine) {
        setEffects({
          ...effects,
          loading: true,
        });
        const request = await fetch(`${url}/appointment`, {
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
        console.log('@SUBMIT', data);

        setEffects({
          ...effects,
          loading: false,
          error: {
            error: false,
            title: 'Success',
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
            title: 'Network',
            message: 'Connection Error',
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
            title: 'Error',
            message: error.message,
          },
        });

        setShowInfoDialog(true);
      }, 2000);
    }
  };

  return (
    <>
      <Overlay
        className={styles.modal}
        closeOnClick
        // open={true}
        open={props.modal}
        onClose={() => {
          props.toggleFunc(false);
          // history.goBack();
        }}
      >
        <div className={styles.modal_paper}>
          <div className={styles.modalTop}>
            <p className={styles.appTitle}>Create Appointment</p>
            <img
              src={x}
              alt=""
              onClick={() => {
                // history.goBack();
                props.toggleFunc(false);
              }}
            />
          </div>

          <div className={styles.cWrap}>
            <p className={styles.formLabel}>Nature</p>
            <div
              className={styles.inputGpWrap}
              onClick={() => {
                setShowWrap(!showDrop);
              }}
            >
              <input
                className={styles.inputName}
                placeholder="Select ..."
                disabled={true}
                value={myValue}
              />
              <img
                src={chevDown}
                alt=""
                className={styles.chev}
              />{' '}
              {showDrop ? (
                <div
                  className={styles.dropWrap}
                  onClick={() => {
                    setShowWrap(false);
                  }}
                >
                  <GetNatures />
                </div>
              ) : null}
            </div>

            <p className={styles.formLabel}>Appointment Date</p>
            <div className={styles.inputGpWrap}>
              <DatePicker
                onChange={setMyDateValue}
                calendarIcon={null}
                value={myDateValue}
                clearIcon={null}
              />
              <img
                src={cal}
                alt=""
                className={styles.chev}
              />{' '}
            </div>

            <p className={styles.formLabel}>Appointment Time</p>
            <div className={styles.inputGpWrap}>
              <TimePicker
                onChange={setMyTimeValue}
                clearIcon={null}
                clockIcon={null}
                autoFocus={false}
                format={'HH mm a'}
                value={myTimeValue}
              />
              <img
                src={clock}
                alt=""
                className={styles.chev}
              />{' '}
            </div>
          </div>
          <div
            onClick={() => {
              // history.goBack();
              onSubmit();
            }}
            className={styles.pCreate}
          >
            Create Appointment
          </div>
        </div>
      </Overlay>

      {/* Begin Show Info Overlay */}
      <Overlay
        className={styles.modal}
        closeOnClick={true}
        open={showInfoDialog}
        onClose={() => {
          setShowInfoDialog(false);
        }}
      >
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
      {/* End Show Info Overlay */}

      {/* Begin Spinner Overlay */}
      <Overlay
        className={styles.modal}
        closeOnClick={true}
        open={effects.loading}
        onClose={() => {
          setShowInfoDialog(false);
        }}
      >
        <ClipLoader
          css={override}
          size={150}
          color={'#123abc'}
          loading={true}
        />
      </Overlay>
      {/* End Spinner Overlay */}
    </>
  );
};

export default CreateAppointment;
