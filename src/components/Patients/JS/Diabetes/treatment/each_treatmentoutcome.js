import React from 'react';
import styles from '../../../CSS/each_investigation.module.css';

const EachTreatmentRecord = ({ record, editMode, openDeleteModal }) => {
  const { Outcome, Status, RecordDate } = record;
  return (
    <div className={styles.record}>
      <div className={styles.investigation}>
        <span className={styles.date}>
          <b>OUTCOME:</b> {Outcome}
        </span>
        <div>
          <svg
            onClick={(e) => {
              editMode(e, record);
            }}
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6667 12.3333H1.33335C1.15654 12.3333 0.986968 12.4036 0.861944 12.5286C0.736919 12.6536 0.666681 12.8232 0.666681 13C0.666681 13.1768 0.736919 13.3464 0.861944 13.4714C0.986968 13.5964 1.15654 13.6667 1.33335 13.6667H10.6667C10.8435 13.6667 11.0131 13.5964 11.1381 13.4714C11.2631 13.3464 11.3333 13.1768 11.3333 13C11.3333 12.8232 11.2631 12.6536 11.1381 12.5286C11.0131 12.4036 10.8435 12.3333 10.6667 12.3333ZM1.33335 11H1.39335L4.17335 10.7467C4.47788 10.7163 4.7627 10.5822 4.98001 10.3667L10.98 4.36667C11.2129 4.12065 11.3387 3.79234 11.33 3.45369C11.3213 3.11504 11.1786 2.79367 10.9333 2.56L9.10668 0.733335C8.86828 0.509399 8.55587 0.380908 8.2289 0.372303C7.90193 0.363699 7.5832 0.475582 7.33335 0.686669L1.33335 6.68667C1.11786 6.90398 0.983684 7.1888 0.953348 7.49334L0.666681 10.2733C0.657701 10.371 0.670371 10.4694 0.703789 10.5616C0.737207 10.6538 0.790549 10.7375 0.860015 10.8067C0.922308 10.8685 0.996185 10.9173 1.07741 10.9505C1.15864 10.9837 1.24561 11.0005 1.33335 11ZM8.18002 1.66667L10 3.48667L8.66668 4.78667L6.88001 3L8.18002 1.66667Z"
              fill="#4FC2E7"
            />
          </svg>
          <svg
            onClick={(e) => {
              openDeleteModal(e, record);
            }}
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
        </div>
      </div>
     <span className={styles.date}>
        <b>DATE:</b> {RecordDate}
      </span>
      <span className={styles.date}>
        <b>STATUS:</b> {Status}
      </span>
    </div>
  );
};

export default EachTreatmentRecord;
