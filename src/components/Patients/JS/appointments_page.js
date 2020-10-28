import React, { useState,useEffect } from 'react';
import TopBar from '../../UI/JS/topbar';
import { useLocation } from 'react-router-dom';
import SecondaryBar from '../../UI/JS/secondary_navbar';
import Shell from './detail_shell';
import BottomBar from '../../UI/JS/bottom_toolbar';
import styles from '../CSS/appointments_side_page.module.css';
import TabHead from '../AppointmentSide/tab_head';
import TabConOne from '../AppointmentSide/tab_con_one';

import { Overlay } from 'react-portal-overlay';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const url = process.env.REACT_APP_BASE_URL;

const AppointmentsSidePage = () => {
  const patient = useLocation().state;
  const [active, setActive] = useState(true);
  const [appointmentList, setAppointmentList] = useState([]);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [effects, setEffects] = useState({
    loading: false,
    error: {
      error: false,
      message: '',
      title: "Info"
    },
  });
  
  useEffect(()=>{
    getAppointments();
  },[null])

  

  async function getAppointments() {
    const payload = { FolderNo: patient.FolderNo, Type: 'Appointment'}
    // console.log("@getAppointments DidMount", payload);
      try {
        if (window.navigator.onLine) {
          setEffects({
            ...effects,
            loading: true
          });
          const request = await fetch(`${url}/getUniversal`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.token}`,
            },
            body: JSON.stringify(payload),
          });

          if (!request.ok) {
            const error = await request.json();
            throw Error(error.error);
          }
          const data = await request.json();

          setEffects({
            ...effects,
            loading: false
          });
       
          setAppointmentList(data.data);
        } else {
          setEffects({
            ...effects,
            loading: false,
            error: {
              error: true,
              title: "Network",
              message: "Connection Error",
            },
          });
          setShowInfoDialog(true);
        }
      } catch (error) {
        setTimeout(() => {
          setEffects({
            ...effects,
            loading: false,
            error: {
              error: true,
              title: "Error",
              message: error.message,
            },
          });

          setShowInfoDialog(true);
        }, 2000);
      }
  }



  return (
    <>
      <TopBar />
      <SecondaryBar page_title="Appointments" shadow />
      <Shell name={`${patient.LastName} ${patient.FirstName}`}>
        <div className={styles.container}>
          <TabHead active={active} activeToogle={setActive} />
          {active ? <TabConOne appointmentList={appointmentList}/> : null}
        </div>
        <BottomBar />
      </Shell>


      {/* Begin Show Info Dialog */}
      <Overlay
        className={styles.modal}
        closeOnClick={true}
        open={showInfoDialog}
        onClose={() => {
          setShowInfoDialog(false);
        }}>
        <div className={styles.modal_paper}>
          <div className={styles.modalTop2}>
            <p className={styles.appTitle}>{effects.error.title}</p>
          </div>
          <div className={styles.inputGpWrap}>
            <p>{effects.error.message}</p>
          </div>
          <div
            onClick={() => {
              setShowInfoDialog(false);
            }}
            className={styles.pCreate}
          >
            Dismiss
          </div>
        </div>
      </Overlay>
      {/* End Show Info Dialog */}


      {/* Begin Spinner Show */}
      <Overlay
        className={styles.modal}
        closeOnClick={true}
        open={effects.loading}
        onClose={() => {
          setShowInfoDialog(false);
        }}>
        <ClipLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={true}
        />
      </Overlay>

    </>
  );
};

export default AppointmentsSidePage;