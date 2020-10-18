import React, { memo, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/recent_records.module.css';
import localForage from "localforage";
const url = process.env.REACT_APP_BASE_URL;

const EachRecentRecord = ({ patient }) => {
  const [toggle, setToggle] = useState(false);

  const {
    LastName,
    FirstName,
    OrganDiagnosis,
    Diagnosis,
    Triggers,
    FolderNo,
    DateCreated,
  } = patient;

  const [effects, setEffects] = useState({
    loading: false,
    error: {
      error: false,
      message: ""
    }
  });

  const splitDateString = new Date(DateCreated).toDateString().split(' ');

  global.setToggleDeleteBtn = () => {
    try {
      if (toggle)
        setToggle(false);
    } catch (ex) {
      console.log('Might Happen');
    }
  };

  async function deleteRecord(e) {
    e.preventDefault();
    try {
      setEffects({ ...effects, loading: true });
      console.log("DELETE RES", `Bearer ${localStorage.token}`);

      if (window.navigator.onLine) {
        const request = await fetch(`${url}/PatientDelete`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
          },
          body: JSON.stringify({FolderNo:patient.FolderNo})
        });

        if (!request.ok) {
          setEffects({ ...effects, loading: false });
          const error = await request.json();
          throw Error(error.error);
        }

        const data = await request.json();

        console.log("DELETE RES", data);

        localForage.removeItem(patient.FolderNo, {

        }).then(()=>{
          console.log("@deleteRecord");
        });

      } else {
        setEffects({
          ...effects,
          error: {
            error: true,
            message: "Connection Error"
          }
        });
      }
    } catch (error) {
      setEffects({
        ...effects,
        error: {
          error: true,
          message: error.message
        }
      });

      setTimeout(() => {
        setEffects({
          error: {
            error: false,
            message: ""
          }
        });
      }, 3000);
    }
  }

  return (
    <div className={styles.each_record}>
      <Link
        to={{
          pathname:
            window.innerWidth > 600
              ? `/patients/${FolderNo}/bio-data`
              : `/patients/${FolderNo}/record_list`,
          state: patient,
        }}
        style={{ textDecoration: 'none' }}
        className={styles.name}
      >{`${LastName} ${FirstName}`}</Link>

      <div className={styles.details}>
        <small>{OrganDiagnosis || Diagnosis || Triggers}</small>
        <div style={{ display: 'flex' }}>
          <small>{`${splitDateString[2]} ${splitDateString[1]}, ${splitDateString[3]}`}</small>
          <div
            onClick={() => {
                setToggle(!false);
            }}
            className={styles.dots}
          >
            ...
           {/* this is the div for toggle */}
            {toggle ? <div
                className={styles.deleteWrap}
                onClick={(e) => {
                  setToggle(!toggle);
                  deleteRecord(e);
                }}
              >
                <p className={styles.deleteText}>DELETE</p>
              </div>
            : null}
          </div>
        </div>
      </div>
     
      <hr />

      {effects.loading && (
        <p style={{ textAlign: "center" }}>Deleting...</p>
      )}

    </div>
  );
};

const recentRecords = ({ recents, error }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_title}>Recent Records</div>
      <div className={styles.records_div}>
        {recents === null && !error.error ? (
          <p style={{ textAlign: 'center' }}>loading...</p>
        ) : error.error ? (
          <p style={{ textAlign: 'center', color: 'red' }}>{error.message}</p>
        ) : recents.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No recent records yet.</p>
        ) : (
          recents.map((eachRecord) => (
            <Fragment key={eachRecord.FolderNo}>
              <EachRecentRecord patient={eachRecord} />
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default memo(recentRecords);
