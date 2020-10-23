import React, { useState, useEffect } from 'react';
import { Overlay } from 'react-portal-overlay';
import styles from '../CSS/appointments_side_page.module.css';

const AppointmentDetail = (props) => {
  const { history, location } = props;
  const [openState, setOpenState] = useState(true);

  const { objectItem } = location;

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
          <p className={styles.appTitle}>Appointment Details</p>
          <img
            src={require('../../../images/x.svg')}
            alt=""
            onClick={() => {
              history.goBack();
            }}
          />
        </div>
        <p className={styles.moTitle}>{objectItem.title}</p>

        <div className={styles.pWrap}>
          <p className={styles.pLeft}>Patient's Name</p>
          <p className={styles.pRight}>{objectItem.name}</p>
        </div>

        <div className={styles.pWrap}>
          <p className={styles.pLeft}>Serial Number</p>
          <p className={styles.pRight}>{objectItem.serialN}</p>
        </div>

        <div className={styles.pWrap}>
          <p className={styles.pLeft}>Age</p>
          <p className={styles.pRight}>{objectItem.age}</p>
        </div>

        <div className={styles.pWrap}>
          <p className={styles.pLeft}>Severity</p>
          <p className={styles.pRight}>{objectItem.severity}</p>
        </div>

        <div className={styles.pWrap}>
          <p className={styles.pLeft}>Time</p>
          <p className={styles.pRight}>{objectItem.time}</p>
        </div>

        <div className={styles.appButtons}>
          <div
            onClick={() => {
              history.goBack();
            }}
            className={styles.whiteBg}
          >
            Cancel Appointment
          </div>
          <div
            onClick={() => {
              history.goBack();
            }}
            className={styles.blackBg}
          >
            Reshedule
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default AppointmentDetail;
