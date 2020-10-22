import React, { memo, Fragment, useState, Modal } from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/recent_records.module.css';
import localForage from 'localforage';
const url = process.env.REACT_APP_BASE_URL;


// localForage.removeItem("2").then((res)=>{
//   console.log("DELETING == ", res);
// });

localForage.getItem("patients").then((res) => {
  console.log("RESPONSE", res);
});

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
      message: '',
    },
  });

  const splitDateString = new Date(DateCreated).toDateString().split(' ');

  global.setToggleDeleteBtn = () => {
    try {
      setToggle(false);
    } catch (ex) {
      console.log('Null Pointer Exception');
    }
  };

  async function deleteRecord(e) {
    e.preventDefault();
    try {
      setEffects({ ...effects, loading: true });

      if (window.navigator.onLine) {
        const request = await fetch(`${url}/PatientDelete`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`,
          },
          body: JSON.stringify({ FolderNo: patient.FolderNo }),
        });

        if (!request.ok) {
          const error = await request.json();
          global.reFresh();
          setEffects({
            ...effects, loading: false});
          
          // alert('Error:' + error.error);
          throw Error(error.error);
        }

        const data = await request.json();
        console.log("WHY???", data);

        localForage.removeItem(patient.FolderNo, {}).then(() => {
          console.log('@deleteRecord');
        });



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
            {toggle ? (
              <div
                className={styles.deleteWrap}
                onClick={(e) => {
                  setToggle(!toggle);
                  deleteRecord(e);
                }}
              >
                <p className={styles.deleteText}>DELETE</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <hr />

      {effects.loading && <p style={{ textAlign: 'center' }}>Deleting...</p>}
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default memo(recentRecords);
