import React, { Fragment, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/records.module.css';
import localForage from 'localforage';
import { Button } from 'react-bootstrap';

const url = process.env.REACT_APP_BASE_URL;

export const EachRecentRecord = ({ record }) => {
  const {
    LastName,
    FirstName,
    OrganDiagnosis,
    Diagnosis,
    Triggers,
    FolderNo,
    DateCreated,
  } = record;

  const [toggle, setToggle] = useState(false);

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
      console.log('Might Happen');
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
          body: JSON.stringify({ FolderNo: FolderNo }),
        });

        if (!request.ok) {
          setEffects({ ...effects, loading: false });
          const error = await request.json();
          throw Error(error.error);
        }

        localForage.removeItem(FolderNo).then(() => {
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
          state: record,
        }}
        className={styles.each_record}
      >
        <div className={styles.name}>{`${LastName} ${FirstName}`}</div>
      </Link>

      <div className={styles.details}>
        <small>{OrganDiagnosis || Diagnosis || Triggers}</small>
        <div style={{ display: 'flex' }}>
          <small>{`${splitDateString[2]} ${splitDateString[1]}, ${splitDateString[3]}`}</small>
          <div className={styles.deleteWrapPa}>
            <p
              onClick={(e) => {
                deleteRecord(e);
              }}
              className={styles.deleteTextPa}
            >
              DELETE
            </p>
          </div>
        </div>
      </div>
      <hr />
      {effects.loading && <p style={{ textAlign: 'center' }}>Deleting...</p>}
    </div>
  );
};

const RecentRecords = ({ recents, error }) => {
  return (
    <div className={styles.container}>
      <div className={styles.records_div}>
        {recents === null && !error.error ? (
          <p style={{ textAlign: 'center' }}>loading...</p>
        ) : error.error ? (
          <p style={{ textAlign: 'center', color: 'red' }}>{error.message}</p>
        ) : recents.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No records.</p>
        ) : (
          <>
            {recents.map((eachRecord) => (
              <Fragment key={eachRecord.FolderNo}>
                <EachRecentRecord record={eachRecord} />
              </Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default memo(RecentRecords);
