import React from 'react';
import TopBar from '../../UI/JS/topbar';
import { useLocation } from 'react-router-dom';
import SecondaryBar from '../../UI/JS/secondary_navbar';
import Shell from './detail_shell';
import BottomBar from '../../UI/JS/bottom_toolbar';

const AppointmentsPage = () => {
  const patient = useLocation().state;
  return (
    <>
      <TopBar />
      <SecondaryBar page_title="Appointments" shadow />
      <Shell name={`${patient.LastName} ${patient.FirstName}`}>
        kjfnvlkfmvlkfmv
      </Shell>
      <BottomBar />
    </>
  );
};

export default AppointmentsPage;
