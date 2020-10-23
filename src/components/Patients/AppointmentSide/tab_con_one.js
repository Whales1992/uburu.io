import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/appointments_side_page.module.css';

const detailsArray = [
  {
    title: 'Oncology Test',
    name: 'Jane Cooper',
    date: 'Aug 28, 2013',
    serialN: 'ID 1812384593',
    age: '42 Years',
    severity: 'Normal',
    time: '12/02/2020, 09:00AM',
  },
  {
    title: 'Albert Fox',
    name: 'Guy Hawkins',
    date: 'Jan 18, 2020',
    serialN: 'ID 18123845932',
    age: '39 Years',
    severity: 'Severe',
    time: '18/01/2020, 10:00AM',
  },
  {
    title: 'Morris Wilson',
    name: 'Esther Howard',
    date: 'Aug 27, 2014',
    serialN: 'ID 1812384595',
    age: '24 Years',
    severity: 'Normal',
    time: '27/08/2014, 09:00AM',
  },
  {
    title: 'Courtney Murphy',
    name: 'Wade Warren',
    date: 'Nov 19, 2015',
    serialN: 'ID 1812384548',
    age: '49 Years',
    severity: 'Normal',
    time: '19/11/2015, 11:05AM',
  },
  {
    title: 'Guy Russell',
    name: 'Cameron Williamson',
    date: 'Aug 17, 2013',
    serialN: 'ID 1812384534',
    age: '28 Years',
    severity: 'Normal',
    time: '17/08/2013, 12:00PM',
  },
];

const TabConOne = () => {
  const [calender, setCalVal] = useState('Sort Date');
  return (
    <div className={styles.contentWrap}>
      <div className={styles.fistDiv}>
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
      </div>

      {detailsArray.map((item, i) => {
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
                <p className={styles.divAppTitle}>{item.title}</p>
                <p className={styles.divAppMini}>{item.name}</p>
              </div>

              <p className={styles.SecDate}>{item.date}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default TabConOne;
