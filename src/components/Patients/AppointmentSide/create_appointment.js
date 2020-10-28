import React, { useState } from 'react';
import { Overlay } from 'react-portal-overlay';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import styles from '../CSS/appointments_side_page.module.css';

const CreateAppointment = (props) => {
  const [openState, setOpenState] = useState(true);
  const [myValue, setMyValue] = useState('');
  const [myDateValue, setMyDateValue] = useState(new Date());
  const [myTimeValue, setMyTimeValue] = useState('');
  const [showDrop, setShowWrap] = useState(false);
  const { history } = props;

  const onSubmit = () => {
    const params = {
      Nature: myValue,
      ValueDate: myDateValue,
      ValueTime: myTimeValue,
    };
    console.log({ params });
  };

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
              <div
                className={styles.dropWrap}
                onClick={() => {
                  setMyValue('ill nature picker');
                  setShowWrap(false);
                }}
              >
                <p className={styles.pBlack}>No records Found</p>
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
              src={require('../../../images/cal.svg')}
              alt=""
              className={styles.chev}
            />{' '}
          </div>

          <p className={styles.formLabel}>Appointment Time</p>
          <div className={styles.inputGpWrap}>
            {/* <input
              onChange={() => {}}
              className={styles.inputName}
              placeholder="time"
              disabled={false}
              value={myTimeValue}
            /> */}
            <TimePicker
              onChange={setMyTimeValue}
              clearIcon={null}
              clockIcon={null}
              autoFocus={false}
              format={'HH mm a'}
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
            // history.goBack();
            onSubmit();
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
