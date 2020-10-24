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
  const [showDeleteIcon, setShowDeleteIcon] = useState(false)

  const [effects, setEffects] = useState({
    loading: false,
    error: {
      error: false,
      message: '',
    },
  });

  const splitDateString = new Date(DateCreated).toDateString().split(' ');

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
          {
            showDeleteIcon ? <div onClick={(e)=>{deleteRecord(e)}} className={styles.deleteWrapPa}>
              <svg
                className={styles.delete}
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 3H9.5V1.75C9.5 1.19844 9.05156 0.75 8.5 0.75H3.5C2.94844 0.75 2.5 1.19844 2.5 1.75V3H0.5C0.223437 3 0 3.22344 0 3.5V4C0 4.06875 0.05625 4.125 0.125 4.125H1.06875L1.45469 12.2969C1.47969 12.8297 1.92031 13.25 2.45312 13.25H9.54688C10.0813 13.25 10.5203 12.8313 10.5453 12.2969L10.9312 4.125H11.875C11.9438 4.125 12 4.06875 12 4V3.5C12 3.22344 11.7766 3 11.5 3ZM8.375 3H3.625V1.875H8.375V3Z"
                  fill="#DA6D6D"
                />
              </svg>
            </div> : <div className={styles.dots} onClick={()=>{setShowDeleteIcon(true)}}><p>...</p></div>
          }
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
