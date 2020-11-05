import React from 'react';
import styles from '../../Home/CSS/medical_analytics.module.css';
import AgeCarChart from './AgeCarChart';
import PieChartRight from './PieChart';
import VisitingDays from './VisitingDays';

const PatientStat = () => {
  return (
    <div className={styles.innerCon}>
      <p className={styles.total_patients}>2,623 Patients</p>
      <p className={styles.incoming_num}>+231 in March</p>

      <div className={styles.statRow}>
        <div style={{ width: '100%' }}>
          <p className={styles.ageRange}>Age Range</p>
          <AgeCarChart />
        </div>
        <div style={{ width: '100%' }}>
          <p className={styles.ageRange}>Gender</p>
          <div className={styles.Gen}>
            <PieChartRight />
            <div className={styles.menRow}>
              <div>
                <p className={styles.woCent}>73%</p>
                <p className={styles.woText}>women</p>
              </div>
              <div>
                <p className={styles.woCent}>37%</p>
                <p className={styles.woText}>men</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.statRow}>
        <div style={{ width: '100%' }}>
          <p className={styles.ageRange}>Visiting days</p>
          <VisitingDays />
        </div>
        <div style={{ width: '100%', display: 'flex', flex: 2 }} />
      </div>
    </div>
  );
};
export default PatientStat;
