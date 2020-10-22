import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/quick_actions.module.css';
import AddPatientDataIcon from '../../../images/add_patient_data.svg';
import SyncDataIcon from '../../../images/sync_data.svg';

const quickActions = () => (
  <div className={styles.div}>
    <div className={styles.top}>{`${
      JSON.parse(localStorage.account).Name
    } Registry - Quick Actions`}</div>

    <div className={styles.actions}>
      <div>
        <Link className={styles.link} to="/add_patient_data/patient_biodata">
          <img src={AddPatientDataIcon} alt="add patient icon" />
          Add <br /> Patient Data
        </Link>
      </div>
      {/* <div>
        <Link className={styles.link} to="/add_patient_data/patient_biodata">
          <img src={AddPatientDataIcon} alt="add patient icon" />
          Add <br /> Patient Data
        </Link>
      </div>
      <div>
			<Link className={styles.link} to="/update_patient">
          <img src={AddPatientDataIcon} alt="add update patient icon" />
          Update <br /> Patient Data
        </Link>
      </div> */}

      <div>
        <Link className={styles.link} to="/search_folder_number">
          <img src={AddPatientDataIcon} alt="add patient icon" />
          Create <br /> Appointment
        </Link>
      </div>

      <div className={styles.non_link}>
        <img src={SyncDataIcon} alt="sync data icon" />
        Sync <br /> Data Online
      </div>
    </div>
  </div>
);

export default memo(quickActions);
