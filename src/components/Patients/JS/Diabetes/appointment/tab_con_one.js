import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import styles from '../../../CSS/appointments_side_page.module.css';
import localForage from 'localforage';
// import Shell from '../../../JS/detail_shell';
import CreateAppointment from './create_appointment';
import AppointmentDetail from '../../../AppointmentSide/appointment_detail';

const cal = require('../../../../../images/cal.svg');

const TabConOne = (appointmentList) => {
  const [calender] = useState('Sort Date');
  const [showCreate, setShowCreate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();

  return (
    <div className={styles.contentWrap}>
      <>
        {appointmentList.appointmentList.length !== 0 ? (
          <div className={styles.fistDiv}>
            <div className={styles.dateWrap}>
              <input
                placeholder={calender}
                className={styles.calender}
                disabled={true}
              />
              <img src={cal} alt="" />
            </div>

            <div className={styles.appointWrap}>
              <p className={styles.appointLeft}>Appointment Compliance</p>
              <p className={styles.appointRight}>40%</p>
            </div>
          </div>
        ) : null}

        {appointmentList.appointmentList.length === 0 ? (
          <div className={styles.empty}>
            <p>You don't have any appointment yet</p>
          </div>
        ) : (
          appointmentList.appointmentList.map((item, i) => {
            return (
              <div
                // to={{
                //   pathname: '/patients/appointments_detail',
                //   objectItem: item,
                // }}
                onClick={() => {
                  setModalData(item);
                  setShowModal(true);
                }}
                key={i}
                style={{ cursor: 'pointer', textDecoration: 'none' }}
              >
                <div className={styles.secDiv}>
                  <div className={styles.secTextWrap}>
                    <p className={styles.divAppTitle}>{item.Nature}</p>
                    <p
                      className={styles.divAppMini}
                    >{`${item.LastName} ${item.FirstName}`}</p>
                  </div>

                  <p className={styles.SecDate}>{item.ValueDate}</p>
                </div>
              </div>
            );
          })
        )}
      </>
      <div
        onClick={() => {
          setShowCreate(true);
        }}
        className={styles.fab}
      >
        <p>+</p>
      </div>
      <button
        onClick={() => {
          setShowCreate(true);
        }}
        className={styles.add_new_record}
        aria-label="Add new record"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5005 10.9995C13.917 10.9995 11.001 13.9155 11.001 17.499C11.001 21.0825 13.9155 24 17.5005 24C21.0855 24 24 21.084 24 17.5005C24 13.917 21.084 10.9995 17.5005 10.9995ZM19.9995 18.4995H18.4995V19.9995C18.4995 20.5515 18.051 21 17.499 21C16.947 21 16.5 20.553 16.5 19.9995V18.4995H15C14.448 18.4995 13.9995 18.051 13.9995 17.499C13.9995 16.947 14.448 16.5 15 16.5H16.5V15C16.5 14.448 16.9485 13.9995 17.5005 13.9995C18.0525 13.9995 18.501 14.448 18.501 15V16.5H20.001C20.553 16.5 21 16.9485 21 17.5005C21 18.0525 20.553 18.4995 19.9995 18.4995Z"
            fill="white"
          />
          <path
            d="M19.0005 0H3C1.3425 0 0 1.3425 0 3C0 4.6575 1.3425 6 3 6H19.0005C20.658 6 22.0005 4.6575 22.0005 3C22.0005 1.3425 20.6565 0 19.0005 0ZM3 4.0005C2.448 4.0005 1.9995 3.552 1.9995 3C1.9995 2.448 2.448 1.9995 3 1.9995C3.552 1.9995 4.0005 2.4465 4.0005 3C4.0005 3.552 3.552 4.0005 3 4.0005ZM7.00049 4.0005C6.44699 4.0005 6 3.552 6 3C6 2.448 6.44699 1.9995 7.00049 1.9995C7.55249 1.9995 8.00099 2.4465 8.00099 3C7.99949 3.552 7.55249 4.0005 7.00049 4.0005Z"
            fill="white"
          />
          <path
            d="M19.0005 7.99951H3C1.3395 7.99951 0 9.33901 0 10.9995C0 12.66 1.3395 13.9995 3 13.9995H9.76049C11.0895 11.0505 14.0595 9.00001 17.5005 9.00001C19.101 9.00001 20.61 9.45001 21.891 10.23C21.5595 8.94001 20.3895 7.99951 19.0005 7.99951ZM3 12C2.4495 12 1.9995 11.55 1.9995 10.9995C1.9995 10.449 2.4495 9.99901 3 9.99901C3.5505 9.99901 4.0005 10.449 4.0005 10.9995C4.0005 11.55 3.5505 12 3 12ZM7.00049 12C6.44999 12 6 11.55 6 10.9995C6 10.449 6.44999 9.99901 7.00049 9.99901C7.55099 9.99901 8.00099 10.449 8.00099 10.9995C8.00099 11.55 7.54949 12 7.00049 12Z"
            fill="white"
          />
          <path
            d="M8.99999 17.5005C8.99999 16.9905 9.04949 16.491 9.13949 16.0005H3C1.3395 16.0005 0 17.34 0 19.0005C0 20.661 1.3395 22.0005 3 22.0005H10.29C9.46949 20.7 8.99999 19.1505 8.99999 17.5005ZM3 19.9995C2.4495 19.9995 1.9995 19.5495 1.9995 18.999C1.9995 18.45 2.4495 18 3 18C3.5505 18 4.0005 18.45 4.0005 19.0005C4.0005 19.5495 3.5505 19.9995 3 19.9995ZM7.00049 19.9995C6.44999 19.9995 5.99999 19.5495 5.99999 18.999C5.99999 18.45 6.44999 18 7.00049 18C7.55099 18 8.00099 18.45 8.00099 19.0005C7.99949 19.5495 7.54949 19.9995 7.00049 19.9995Z"
            fill="white"
          />
        </svg>
      </button>

      <CreateAppointment modal={showCreate} toggleFunc={setShowCreate} />
      <AppointmentDetail
        modal={showModal}
        toggleFunc={setShowModal}
        data={modalData}
      />
    </div>
  );
};
export default TabConOne;
