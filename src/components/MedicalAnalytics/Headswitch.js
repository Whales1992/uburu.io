import React from 'react';
import styles from '../Home/CSS/medical_analytics.module.css';

const Headswitch = () => {
  return (
    <div className={styles.headRow}>
      <p className={styles.active}>Patients</p>
      <p className={styles.inActive}>Clinical</p>
    </div>
  );
};

export default Headswitch;
