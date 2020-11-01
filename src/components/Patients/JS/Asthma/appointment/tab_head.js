import React from 'react';
import styles from '../../../CSS/appointments_side_page.module.css';

const TabHead = (props) => {
  const { active, activeToogle } = props;
  return (
    <div className={styles.tabLine}>
      <div className={styles.tabWrap}>
        <p
          onClick={() => {
            activeToogle(!active);
          }}
          className={active ? styles.tabText : styles.tabTextPlain}
        >
          Upcoming
        </p>
        <p
          onClick={() => {
            activeToogle(!active);
          }}
          className={!active ? styles.tabText : styles.tabTextPlain}
        >
          All
        </p>
      </div>
    </div>
  );
};

export default TabHead;
