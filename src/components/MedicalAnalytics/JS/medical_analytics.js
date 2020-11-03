import React from 'react';
import Layout from '../../../container/UI/JS/layout';
import InstitutionBanner from '../../../components/UI/JS/institution_banner';
import styles from '../../Home/CSS/medical_analytics.module.css';
import Headswitch from '../Headswitch';
import PatientStat from './patients_stats';

const MedicalAnalytics = () => {
  return (
    <Layout pageTitle="Medical Analytics">
      <InstitutionBanner />
      <div className={styles.container}>
        <Headswitch />
        <PatientStat />
      </div>
    </Layout>
  );
};

export default MedicalAnalytics;
