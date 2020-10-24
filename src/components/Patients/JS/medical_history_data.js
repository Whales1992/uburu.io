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

  console.log(patient.records);

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

  const [recordList, setRecordList] = useState([]);

  function enableEditMode(e, editables){
    e.preventDefault();
    setEditabelRecord(editables);
    setEditabelMode(true);
    console.log(editables);
  }

  async function deleteRecord(e, record) {
    e.preventDefault();
    try {
      setEffects({ ...effects, loading: true });
      if (window.navigator.onLine) {
        const request = await fetch(`${url}/DeleteRecord`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`,
          },
          body: JSON.stringify({ RecordID: record.RecordId }),
        });

        if (!request.ok) {
          setEffects({ ...effects, loading: false });
          const error = await request.json();
          console.log("DELETE API FAILED... ", error.error);
          throw Error(error.error);
        }
        const data = await request.json();

        console.log("DELETED SUCCESSFULLY ", data);
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

  function handleSearchPhraseChange(phrase) {
    if (phrase.length > 2) {
      search(phrase);
    }else{
      setRecordList(recordList);
    }
  }

  async function search(key) {
    var result = [];
    recordList.forEach(element => {
      let target = element.Description + "";
      if (key.length <= target.length){
        target = target.slice(0, (key.length - 1));
        let _key = key.slice(0, (key.length - 1));
        if (target.toLocaleLowerCase() === _key.toLocaleLowerCase()) {
          console.log("MATCH");
          result.push(element);
        }
      }
    });

    if (result.length === 0) {
      setRecordList(recordList);
    } else {
      console.log("FOUND");
      setRecordList(result);
    }
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

  async function addNewRecord() {
    editabelRecord.Type = `${showing}`;
    console.log("ADD NEW API ... ", editabelRecord);
   
    try {
      setEffects({ ...effects, loading: true });
      if (window.navigator.onLine) {
        const request = await fetch(`${url}/records`, {
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

        console.log("ADDED SUCCESSFULLY ", data);
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

  function setShowingRecord(value){
    switchShowing(value);
    if (value === 'Assessment'){
      setRecordList(assessmentRecords);
    } else if (value === 'Care'){
      setRecordList(careRecords);
    } else if (value === 'Complication'){
      setRecordList(complicationRecords);
    }
  }

  return (
    <>
      <TopBar />
      <SecondaryBar page_title="Medical History" shadow />
      <Shell name={`${patient.LastName} ${patient.FirstName}`}>
        <div className={styles.container}>
         
          {/* Begin search section */}
          <form className={styles.form}>
            <input
              className={styles.input}
              name="search_folder_no"
              type="text"
              placeholder="Search"
              onChange={(e) => handleSearchPhraseChange(e.target.value)}
            />
            <button aria-label="search" disabled={true}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M16.8395 15.4605L13.1641 11.7852C14.0489 10.6072 14.5266 9.17331 14.525 7.7C14.525 3.93672 11.4633 0.875 7.7 0.875C3.93672 0.875 0.875 3.93672 0.875 7.7C0.875 11.4633 3.93672 14.525 7.7 14.525C9.17331 14.5266 10.6072 14.0489 11.7852 13.1641L15.4605 16.8395C15.6466 17.0058 15.8893 17.0945 16.1387 17.0876C16.3881 17.0806 16.6255 16.9784 16.8019 16.8019C16.9784 16.6255 17.0806 16.3881 17.0876 16.1387C17.0945 15.8893 17.0058 15.6466 16.8395 15.4605ZM2.825 7.7C2.825 6.73582 3.11091 5.79329 3.64659 4.9916C4.18226 4.18991 4.94363 3.56506 5.83442 3.19609C6.72521 2.82711 7.70541 2.73057 8.65107 2.91867C9.59672 3.10678 10.4654 3.57107 11.1471 4.25285C11.8289 4.93464 12.2932 5.80328 12.4813 6.74894C12.6694 7.69459 12.5729 8.67479 12.2039 9.56558C11.8349 10.4564 11.2101 11.2177 10.4084 11.7534C9.60672 12.2891 8.66418 12.575 7.7 12.575C6.40755 12.5735 5.16847 12.0593 4.25457 11.1454C3.34066 10.2315 2.82655 8.99246 2.825 7.7Z"
                  fill="#A7A9BC"
                />
              </svg>
            </button>
          </form>
          {/* End search section */}

          <select
            name="record"
            value={showing}
            onChange={(e) => setShowingRecord(e.target.value)}
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
            recordList ? (
              recordList.map((record) => (
                <Fragment key={`${record.Nature}_${record.Description}`}>
                  <EachRecord record={record} type="Assessment" editMode={(e) => { enableEditMode(e, record) }} />
                </Fragment>
              ))
            ) : (
              <p className={styles.no_record}>No Assessment Record.</p>
            )
          ) : null}
          {showing === 'Care' ? (
            recordList ? (
              recordList.map((record) => (
                <Fragment key={`${record.Nature}_${record.Description}`}>
                  <EachRecord record={record} type="Care" editMode={(e) => { enableEditMode(e, record) }} deleteRecord={(e) => { deleteRecord(e, record)}} />
                </Fragment>
              ))
            ) : (
              <p className={styles.no_record}>No Care Record.</p>
            )
          ) : null}
          {showing === 'Complication' ? (
            recordList ? (
              recordList.map((record) => (
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
