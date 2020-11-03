import React from 'react';
import styles from '../../Home/CSS/medical_analytics.module.css';
import AgeCarChart from './AgeCarChart';
import PieChartRight from './PieChart';

const PatientStat = () => {
  return (
    <div className={styles.innerCon}>
      <p className={styles.total_patients}>2,623 Patients</p>
      <p className={styles.incoming_num}>+231 in March</p>

      <div className={styles.statRow}>
        <AgeCarChart />
        <PieChartRight />
      </div>
    </div>
  );
};

export default PatientStat;
