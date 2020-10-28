import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/appointments_side_page.module.css';
import localForage from 'localforage';

const detailsArray = [
  {
    AppointmentID: 2,
    UserID: '9',
    RegistryID: '7',
    PatientID: null,
    FolderNo: '900',
    DateCreated: '2020-10-26T00:00:00.000Z',
    Nature: 'Drug',
    ValueDate: '12/03/2020',
    ValueTime: '19:00',
    Duration: null,
    Type: null,
    Status: 'Active',
  },
];

const patientName = (item) => {
  let name = 'Unknown';
  if (item !== null && item !== undefined) {
    localForage
      .getItem('patients')
      .then((res) => {
        res.forEach((element) => {
          if (element.PatientID == item.PatientID) {
            console.log('PATIENT FOUND', element);
            name = `${element.LastName} ${element.FirstName}`;
          }
        });
      })
      .catch((ex) => {
        console.log('@patientName', ex);
        // this.setState({
        //   error: {
        //     error: true,
        //     message: ex,
        //   },
        // });
      });
  }
  return name;
};

patientName();

const TabConOne = (appointmentList) => {
  const [calender, setCalVal] = useState('Sort Date');
  return (
    <div className={styles.contentWrap}>
      <>
      {
          appointmentList.appointmentList.length !== 0 ? <div className={styles.fistDiv}>
            <div className={styles.dateWrap}>
              <input
                placeholder={calender}
                className={styles.calender}
                disabled={true}
              />
              <img src={require('../../../images/cal.svg')} alt="" />
            </div>

            <div className={styles.appointWrap}>
              <p className={styles.appointLeft}>Appointment Compliance</p>
              <p className={styles.appointRight}>40%</p>
            </div>
          </div>:null
      }

        {appointmentList.appointmentList.length === 0 ? (
          <div className={styles.empty}>
            <p>You don't have any appointment yet</p>
          </div>
        ) : (
          appointmentList.appointmentList.map((item, i) => {
            return (
              <Link
                to={{
                  pathname: '/patients/appointments_detail',
                  objectItem: item,
                }}
                key={i}
                style={{ cursor: 'pointer', textDecoration: 'none' }}
              >
                <div className={styles.secDiv}>
                  <div className={styles.secTextWrap}>
                    <p className={styles.divAppTitle}>{item.Nature}</p>
                    <p className={styles.divAppMini}>{patientName(item)}</p>
                  </div>

                  <p className={styles.SecDate}>{item.ValueDate}</p>
                </div>
              </Link>
            );
          })
        )}
      </>
    </div>
  );
};
export default TabConOne;
