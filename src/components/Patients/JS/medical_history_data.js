import React, { useState, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from '../../UI/JS/topbar';
import SecondaryBar from '../../UI/JS/secondary_navbar';
import BottomBar from '../../UI/JS/bottom_toolbar';
import Shell from './detail_shell';
import EachRecord from './each_med_history_record';
import styles from '../CSS/medical_history_data.module.css';
import { Overlay } from 'react-portal-overlay';
const url = process.env.REACT_APP_BASE_URL;

const MedicalHistory = () => {
  const patient = useLocation().state;
  const [openState, setOpenState] = useState('');
  const [showDrop, setShowWrap] = useState(false);
  const [showDropDes, setShowWrapDes] = useState(false);
  const [showDropDur, setShowWrapDur] = useState(false);

  const [editabelRecord, setEditabelRecord] = useState({});
  const [editabelMode, setEditabelMode] = useState(false);

  const [duration, setDuration] = useState("");

  const [effects, setEffects] = useState({
    loading: false,
    error: {
      error: false,
      message: '',
    },
  });

  const assessmentRecords =
    patient.records &&
    patient.records.filter((patient) => patient.Type === 'Assessment');

  const careRecords =
    patient.records &&
    patient.records.filter((patient) => patient.Type === 'Care');

  const complicationRecords =
    patient.records &&
    patient.records.filter((patient) => patient.Type === 'Complication');

  const [showing, switchShowing] = useState('Assessment');

  function enableEditMode(e, editables){
    e.preventDefault();
    setEditabelRecord(editables);
    setEditabelMode(true);
    console.log(editables);
  }

  function GetNatures(){
    const natures = ["Nature0", "Nature1", "Nature2"];
    return (
      <>
      {
          natures.map(function (e, i){
            return <p onClick={() => { 
              var pre = editabelRecord;
              pre.Nature = e;
              setEditabelRecord(pre); 
            }} 
              style={{ position: "relative", top: 0, left: 0, width: 100}} key={i}> {e} </p>
          })
      }
      </>
    );
  }

  function GetDescriptions() {
    const description = ["Description0", "Description1", "Description2"];
    return (
      <>
        {
          description.map(function (e, i) {
            return <p onClick={() => {
              var pre = editabelRecord;
              pre.Description = e;
              setEditabelRecord(pre); 
             }}
              style={{ position: "relative", top: 0, left: 0, width: 100 }} key={i}> {e} </p>
          })
        }
      </>
    );
  }

  function GetDurations() {
    const durations = ["Years", "Months", "Days"];
    return (
      <>
        {
          durations.map(function (e, i) {
            return <p onClick={() => {
              setOpenState(e);
            }}
              style={{ position: "relative", top: 0, left: 0, width: 100 }} key={i}> {e} </p>
          })
        }
      </>
    );
  }

  async function updateRecord(){
    editabelRecord.Type = `MH_${editabelRecord.Type}`;

    console.log("UPDATING API ... ", editabelRecord);
      try {
        setEffects({ ...effects, loading: true });
        if (window.navigator.onLine) {
          const request = await fetch(`${url}/UpdateRecords`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.token}`,
            },
            body: JSON.stringify(editabelRecord),
          });

          if (!request.ok) {
            setEffects({ ...effects, loading: false });
            const error = await request.json();
            throw Error(error.error);
          }
          const data = await request.json();

          console.log("UPDATED SUCCESSFULLY ", data);
        } else {
          setEffects({
            ...effects,
            error: {
              error: true,
              message: 'Connection Error',
            },
          });
        }
      } catch (error) {
        setEffects({
          ...effects,
          error: {
            error: true,
            message: error.message,
          },
        });

        setTimeout(() => {
          setEffects({
            error: {
              error: false,
              message: '',
            },
          });
        }, 3000);
      }
  }

  function deleteRecord(e, record){
    e.preventDefault();

    console.log("DELETE API ... ", record);
  }

  function addNewRecord() {
    editabelRecord.Type = showing;
    console.log("ADD NEW API ... ", editabelRecord, "AND TYPE IS ");
  }


  return (
    <>
      <TopBar />
      <SecondaryBar page_title="Medical History" shadow />
      <Shell name={`${patient.LastName} ${patient.FirstName}`}>
        <div className={styles.container}>
          <select
            name="record"
            value={showing}
            onChange={(e) => switchShowing(e.target.value)}
            className={styles.select}
          >
            <option>Assessment</option>
            <option>Care</option>
            <option>Complication</option>
          </select>

          <div className={styles.editWrap}>
              <p className={styles.formLabel}>Nature</p>
              <div className={styles.inputGpWrap}
                onClick={() => {
                  setShowWrap(!showDrop);
                }}
              >
                <input
                  className={styles.inputName}
                  placeholder="Select Nature"
                  disabled={true}
                  value={editabelRecord.Nature === undefined ? '' : editabelRecord.Nature}
                />
                <img
                  src={require('../../../images/chevDown.svg')}
                  alt=""
                  className={styles.chev}
                />{' '}
                {showDrop ? (
                  <div className={styles.dropWrap}>
                    <GetNatures/>
                  </div>
                ) : null}
              </div>

              {/* form feild two */}
              <p className={styles.formLabel}>Description</p>
              <div className={styles.inputGpWrap}
                onClick={() => {
                  setShowWrapDes(!showDropDes);
                }}>
                <input
                  className={styles.inputName}
                  placeholder="Select Description"
                  disabled={true}
                  value={editabelRecord.Description === undefined ? '' : editabelRecord.Description}
                />
                <img
                  src={require('../../../images/chevDown.svg')}
                  alt=""
                  className={styles.chev}
                />{' '}
                {showDropDes ? (
                  <div className={styles.dropWrap}>
                    <GetDescriptions/>
                  </div>
                ) : null}
              </div>

              {/* form feild three */}
              <p className={styles.formLabel}>Duration/Entry</p>
              <div className={styles.inputGpWrap} 
                onClick={() => {
                  setShowWrapDur(!showDropDur);
                }}>
                <input
                  className={styles.inputName}
                  placeholder="Select Duration"
                  value={editabelRecord.Duration === undefined ? '' : editabelRecord.Duration}
                  readOnly={true}
                />
                <img
                  src={require('../../../images/chevDown.svg')}
                  alt=""
                  className={styles.chev}
                />{' '}
                {showDropDur ? (
                  <div className={styles.dropWrap}>
                    <GetDurations />
                  </div>
                ) : null}
              </div>

            {
              editabelMode ? <> 
                <p onClick={(e) => {
                  e.preventDefault();
                  updateRecord();
                }} className={styles.addRec}>Update Record</p>
                <p onClick={(e) => {
                  e.preventDefault();
                  setEditabelMode(false);
                }} className={styles.addRec}>Cancel</p>

              </> : <p onClick={(e)=>{
                e.preventDefault();
                  addNewRecord();
              }} className={styles.addRec}>Add New Record</p>
            }
            </div>

          {showing === 'Assessment' ? (
            assessmentRecords ? (
              assessmentRecords.map((record) => (
                <Fragment key={`${record.Nature}_${record.Description}`}>
                  <EachRecord record={record} type="Assessment" editMode={(e) => { enableEditMode(e, record) }} />
                </Fragment>
              ))
            ) : (
              <p className={styles.no_record}>No Assessment Record.</p>
            )
          ) : null}
          {showing === 'Care' ? (
            careRecords ? (
              careRecords.map((record) => (
                <Fragment key={`${record.Nature}_${record.Description}`}>
                  <EachRecord record={record} type="Care" editMode={(e) => { enableEditMode(e, record) }} deleteRecord={(e) => { deleteRecord(e, record)}} />
                </Fragment>
              ))
            ) : (
              <p className={styles.no_record}>No Care Record.</p>
            )
          ) : null}
          {showing === 'Complication' ? (
            complicationRecords ? (
              complicationRecords.map((record) => (
                <Fragment key={`${record.Nature}_${record.Description}`}>
                  <EachRecord record={record} type="Complication" editMode={(e) => { enableEditMode(e, record) }} />
                </Fragment>
              ))
            ) : (
              <p className={styles.no_record}>No Complication Record.</p>
            )
          ) : null}
        </div>

        <BottomBar />
      </Shell>

      <Overlay
        className={styles.modal}
        closeOnClick={true}
        open={openState!==''}
        onClose={() => {}}>
        <div className={styles.modal_paper}>
          <div className={styles.modalTop}>
            <p className={styles.appTitle}>{openState}</p>
            <img
              src={require('../../../images/x.svg')}
              alt=""
              onClick={() => {
               setOpenState('');
              }}
            />
          </div>
            <div className={styles.cWrap}>
              <div className={styles.inputGpWrap}>
                <input
                  className={styles.inputName}
                  onChange={(value)=>{
                    setDuration(`${value.target.value} ${openState}`);
                  }}
                  placeholder={`How Many ${openState} ?`}
                />
              </div>
            </div>
            <div
              onClick={() => {
                var pre = editabelRecord;
                pre.Duration = duration
                setEditabelRecord(pre);
                setOpenState('');
              }}
              className={styles.pCreate}>Ok</div>
          </div>
      </Overlay>
    
    </>
  );
};

export default MedicalHistory;
