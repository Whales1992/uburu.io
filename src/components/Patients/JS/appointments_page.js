import React, { useState } from 'react';
import TopBar from '../../UI/JS/topbar';
import { useLocation } from 'react-router-dom';
import SecondaryBar from '../../UI/JS/secondary_navbar';
import Shell from './detail_shell';
import BottomBar from '../../UI/JS/bottom_toolbar';
import styles from '../CSS/appointments_side_page.module.css';
import TabHead from '../AppointmentSide/tab_head';
import TabConOne from '../AppointmentSide/tab_con_one';

const AppointmentsSidePage = () => {
  const patient = useLocation().state;

  const [active, setActive] = useState(true);

  return (
    <>
      <TopBar />
      <SecondaryBar page_title="Appointments" shadow />
      <Shell name={`${patient.LastName} ${patient.FirstName}`}>
        <div className={styles.container}>
          <TabHead active={active} activeToogle={setActive} />

          {active ? <TabConOne /> : null}
        </div>
        <BottomBar />
      </Shell>
    </>
  );
};

export default AppointmentsSidePage;
