import React, { useState } from 'react';
import { Overlay } from 'react-portal-overlay';
import styles from '../CSS/appointments_side_page.module.css';

const CreateAppointment = (props) => {
  const [openState, setOpenState] = useState(true);
  const [myValue, setMyValue] = useState('');
  const [myDateValue, setMyDateValue] = useState('12/02/2020');
  const [myTimeValue, setMyTimeValue] = useState('10:30AM');
  const [showDrop, setShowWrap] = useState(false);
  const { history } = props;
  return (
    <Overlay
      className={styles.modal}
      closeOnClick
      open={openState}
      onClose={() => {
        history.goBack();
      }}
    >
      <div className={styles.modal_paper}>
        <div className={styles.modalTop}>
          <p className={styles.appTitle}>Create Appointment</p>
          <img
            src={require('../../../images/x.svg')}
            alt=""
            onClick={() => {
              history.goBack();
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
              placeholder="Testing"
              disabled={true}
              value={myValue}
            />
            <img
              src={require('../../../images/chevDown.svg')}
              alt=""
              className={styles.chev}
            />{' '}
            {showDrop ? (
              <div className={styles.dropWrap}>
                <p className={styles.pBlack}>No records Found</p>
              </div>
            ) : null}
          </div>

          <p className={styles.formLabel}>Appointment Date</p>
          <div className={styles.inputGpWrap}>
            <input
              className={styles.inputName}
              placeholder="dd/mm/yy"
              disabled={true}
              value={myDateValue}
            />
            <img
              src={require('../../../images/cal.svg')}
              alt=""
              className={styles.chev}
            />{' '}
          </div>

          <p className={styles.formLabel}>Appointment Time</p>
          <div className={styles.inputGpWrap}>
            <input
              className={styles.inputName}
              placeholder="time"
              disabled={false}
              value={myTimeValue}
            />
            <img
              src={require('../../../images/clock.svg')}
              alt=""
              className={styles.chev}
            />{' '}
          </div>
        </div>
        <div
          onClick={() => {
            history.goBack();
          }}
          className={styles.pCreate}
        >
          Create Appointment
        </div>
      </div>
    </Overlay>
  );
};

export default CreateAppointment;
