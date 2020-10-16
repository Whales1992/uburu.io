import React, { memo, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/recent_records.module.css';

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

  const splitDateString = new Date(DateCreated).toDateString().split(' ');

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
              setToggle(!toggle);
            }}
            className={styles.dots}
          >
            ...
          </div>

          {/* this is the div for toggle */}
          {toggle ? (
            <div
              className={styles.deleteWrap}
              onClick={() => {
                console.log('presed');
              }}
            >
              <p className={styles.deleteText}>DELETE</p>
            </div>
          ) : null}
        </div>
      </div>
      <hr />
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
