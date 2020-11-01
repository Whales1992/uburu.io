import React from 'react';
import { Overlay } from 'react-portal-overlay';
import styles from '../CSS/appointments_side_page.module.css';

const AppointmentDetail = (props) => {
  const { modal, toggleFunc, data } = props;
  console.log({ data });
  // const { history, location } = props;
  // const { objectItem } = location;

  // if (objectItem === undefined) {
  //   history.goBack();
  // }

  const reSchdule = async () => {};

  return (
    <>
      {data === undefined ? (
        <p></p>
      ) : (
        <Overlay
          className={styles.modal}
          closeOnClick
          open={modal}
          onClose={() => {
            // history.goBack();
            toggleFunc(false);
          }}
        >
          <div className={styles.modal_paper}>
            <div className={styles.modalTop}>
              <p className={styles.appTitle}>Appointment Details</p>
              <img
                src={require('../../../images/x.svg')}
                alt=""
                onClick={() => {
                  // history.goBack();
                  toggleFunc(false);
                }}
              />
            </div>
            <p className={styles.moTitle}>{!data.title ? null : data.title}</p>

            <div className={styles.pWrap}>
              <p className={styles.pLeft}>Patient's Name</p>
              <p className={styles.pRight}>
                {data.name === undefined || data.name === null
                  ? 'Unknow Patient'
                  : data.name}
              </p>
            </div>

            <div className={styles.pWrap}>
              <p className={styles.pLeft}>Nature</p>
              <p className={styles.pRight}>
                {!data.Nature ? null : data.Nature}
              </p>
            </div>

            <div className={styles.pWrap}>
              <p className={styles.pLeft}>Age</p>
              <p className={styles.pRight}>
                {data.age === undefined || data.age === null
                  ? 'UnKnown'
                  : data.age}
              </p>
            </div>

            <div className={styles.pWrap}>
              <p className={styles.pLeft}>Severity</p>
              <p className={styles.pRight}>
                {!data.Status ? null : data.Status}
              </p>
            </div>

            <div className={styles.pWrap}>
              <p className={styles.pLeft}>Time</p>
              <p className={styles.pRight}>
                {!data.ValueTime ? null : data.ValueTime}
              </p>
            </div>

            <div className={styles.appButtons}>
              <div
                onClick={() => {
                  toggleFunc(false);
                }}
                className={styles.whiteBg}
              >
                Cancel Appointment
              </div>
              <div
                onClick={() => {
                  reSchdule();
                }}
                className={styles.blackBg}
              >
                Reshedule
              </div>
            </div>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default AppointmentDetail;
