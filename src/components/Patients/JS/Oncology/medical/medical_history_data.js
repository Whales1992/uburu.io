import React, { useState, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from '../../../../UI/JS/topbar';
import DatePicker from 'react-date-picker';
import SecondaryBar from '../../../../UI/JS/secondary_navbar';
import BottomBar from '../../../../UI/JS/bottom_toolbar';
import Shell from '../../detail_shell';
import EachRecord from './each_med_history_record';
import styles from '../../../CSS/medical_history_data.module.css';
import { Overlay } from 'react-portal-overlay';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const url = process.env.REACT_APP_BASE_URL;

const chevDown = require('../../../../../images/chevDown.svg');
const x = require('../../../../../images/x.svg');

const MedicalHistory = () => {
  const patient = useLocation().state;
  const [showDrop, setShowWrap] = useState(false);
  const [showDropDes, setShowWrapDes] = useState(false);
  const [showDropDur, setShowWrapDur] = useState(false);
  const [editabelRecord, setEditabelRecord] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editabelMode, setEditabelMode] = useState(false);
  const [RecordDate, setRecordDate] = useState('');
  const [addRecModal, setAddRecModal] = useState(false);
  const [myRecord, setMyRecord] = useState();
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [effects, setEffects] = useState({
    loading: false,
    error: {
      error: false,
      message: '',
      title: 'Info',
    },
  });

  const objStructs = [
    {
      "title": "Assessment", "data": [{
        "title": "Core Symptoms",
        "data": [
          { "title": "Chronic weight loss", "data": { "type": "List", "Duration": { "type": "Date", "data": ["Days", "Weeks", "Years"] } } },
          { "title": "Fever of Unknown Origin", "data": { "type": "List", "Duration": { "type": "Date", "data": ["Days", "Weeks", "Years"] } } },
          { "title": "Chronic Pain", "data": { "type": "List", "Duration": { "type": "Date", "data": ["Days", "Weeks", "Years"] } } },
          { "title": "Breast Mass", "data": { "type": "List", "Duration": { "type": "Date", "data": ["Days", "Weeks", "Years"] } } },
          { "title": "LUTS", "data": { "type": "List", "Duration": { "type": "Date", "data": ["Days", "Weeks", "Years"] } } },
        ]
      },
      {
        "title": "Co-morbidity",
        "data":
          [
            { "title": "Asthma Co-morbidity", "data": { "type": "List", "Duration": { "type": "Date", "data": ["Days", "Weeks", "Years"] } } },
            { "title": "SCA Co-morbidity", "data": { "type": "List", "Duration": { "type": "Date", "data": ["Days", "Weeks", "Years"] } } },
            { "title": "Diabetes Co-morbidity", "data": { "type": "List", "Duration": { "type": "Date", "data": ["Days", "Weeks", "Years"] } } },
            { "title": "Stroke Co-morbidity", "data": { "type": "List", "Duration": { "type": "Date", "data": ["Days", "Weeks", "Years"] } } }
          ]
      },
      {
        "title": "Examination",
        "data":
          [
            { "title": "Systolic BP (unit: mmHg)", "data": { "type": "Entry" } },
            { "title": "Diastolic BP (unit: mmHg)", "data": { "type": "Entry" } },
            { "title": "Weight (unit: Kg)", "data": { "type": "Entry" } },
            { "title": "Height (unit: m)", "data": { "type": "Entry" } },
            { "title": "Pulse Rate (unit: /min)", "data": { "type": "Entry" } },
            { "title": "Respiratory Rate (unit: bpm)", "data": { "type": "Entry" } },
            { "title": "Thrush (no unit)", "data": { "type": "List", "Duration": { "type": "bool", "data": ["Yes", "No"] } } },
            { "title": "Hip Circumference (unit: m)", "data": { "type": "Entry" } },
            { "title": "Waist Circumference (unit: m)", "data": { "type": "Entry" } },
          ]
      }]
    },
    {
      "title": "Care", "data": [{
        "title": "Hospitalization",
        "data": [
          { "title": "Non-emergency", "data": { "type": "List", "Duration": { "type": "Date", "data": ["Days", "Weeks", "Years"] } } },
          { "title": "Emergency", "data": { "type": "List", "Duration": { "type": "Date", "data": ["Days", "Weeks", "Years"] } } },
          { "title": "Intensive Care", "data": { "type": "List", "Duration": { "type": "Date", "data": ["Days", "Weeks", "Years"] } } }
        ]
      },
      {
        "title": "Surgery",
        "data":
          [
            { "title": "Mastectomy", "data": { "type": "None" } },
            { "title": "Mastectomy", "data": { "type": "None" } },
            { "title": "Mastectomy", "data": { "type": "None" } },
            { "title": "Others", "data": { "type": "Text" } },
          ]
      },
      {
        "title": "Chemotherapy",
        "data":
          [
            { "title": "Chemo Regimen", "data": { "type": "List", "Duration": { "type": "List", "data": ["1st Line", "2nd Line", "3rd Line"] } } },
          ]
      },
      {
        "title": "Radiotherapy",
        "data":
          [
            { "title": "Radiation Dose (unit: Gy)", "data": { "type": "Entry" } },
          ]
      },
      {
        "title": "Blood Transfusion",
        "data":
          [
            { "title": "Whole Blood (unit:mls)", "data": { "type": "Entry" } },
            { "title": "Packed Red Blood Cells (unit:mls)", "data": { "type": "Entry" } },
            { "title": "Fresh Frozen Plasma (unit:mls)", "data": { "type": "Entry" } },
            { "title": "Platelets (unit:mls)", "data": { "type": "Entry" } },
            { "title": "Cryoprecipitate (unit:mls)", "data": { "type": "Entry" } },
            { "title": "Granulocytes (unit:mls)", "data": { "type": "Entry" } }
          ]
      }]
    },
    {
      "title": "Complication", "data": [{
        "title": "Chemotherapy Complication",
        "data": [
          { "title": "Alopecia", "data": { "type": "Text", "hint": "…enter drug/combination" } },
          { "title": "Fatigue", "data": { "type": "Text", "hint": "…enter drug/combination" } },
          { "title": "Skin/Nail Changes", "data": { "type": "Text", "hint": "…enter drug/combination" } },
          { "title": "Infection", "data": { "type": "Text", "hint": "…enter drug/combination" } },
          { "title": "Anemia", "data": { "type": "Text", "hint": "…enter drug/combination" } },
          { "title": "Diarrhoea/Constipation", "data": { "type": "Text", "hint": "…enter drug/combination" } },
          { "title": "Fertility Problems", "data": { "type": "Text", "hint": "…enter drug/combination" } },
        ]
      },
      {
        "title": "Radiotherapy Complication",
        "data":
          [
            { "title": "Mucositis", "data": { "type": "Text", "hint": "…enter Radiation dose" } },
            { "title": "Lymphoedema", "data": { "type": "Text", "hint": "…enter Radiation dose" } },
            { "title": "Fertility Problems", "data": { "type": "Text", "hint": "…enter Radiation dose" } },
            { "title": "Skin Changes", "data": { "type": "Text", "hint": "…enter Radiation dose" } },
            { "title": "Xerostomia", "data": { "type": "Text", "hint": "…enter Radiation dose" } },
            { "title": "Enteropathy", "data": { "type": "Text", "hint": "…enter Radiation dose" } },
            { "title": "Cardiovascular Disease", "data": { "type": "Text", "hint": "…enter Radiation dose" } },
            { "title": "Cancer", "data": { "type": "Text", "hint": "…enter Radiation dose" } },
          ]
      },
      ]
    },
  ]

  function resetDuration() {
    var edit = editabelRecord;
    edit.Duration = undefined;
    setEditabelRecord(edit);
  }

  const [selectedNatures, setSelectedNatures] = useState(undefined);
  const [descriptions, setDescriptions] = useState(undefined);
  const [selectedDescription, setSelectedDescription] = useState(undefined);
  const [durations, setDurations] = useState(undefined);
  const [selectedDuration, setSelectedDuration] = useState(undefined);
  const [durationsDateOverlayState, setDurationsDateOverlayState] = useState(undefined);
  const [selectedEntry, setSelectedEntry] = useState(undefined);

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
  const [recordList, setRecordList] = useState(assessmentRecords);

  let groupedRecord = [];

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  function sortByDate() {
    recordList.forEach(function (item) {
      if (item.RecordDate === undefined || item.RecordDate === null) {
        groupedRecord = recordList;
      } else {
        let firstDate = new Date(recordList[0].RecordDate);
        let obj = {
          Type: 'Date',
          Tag: `${firstDate.getDate()} ${monthNames[firstDate.getMonth()]
            }, ${firstDate.getFullYear()}`,
        };

        groupedRecord.push(obj);
        groupedRecord.push(recordList[0]);
        for (let i = 0; i < recordList.length; i++) {
          if (i + 1 === recordList.length) {
            break;
          }

          let left = recordList[i];
          let right = recordList[i + 1];

          let ldate = new Date(left.RecordDate);
          let rdate = new Date(right.RecordDate);

          let lyear = ldate.getFullYear();
          let ryear = rdate.getFullYear();

          let lmonth = ldate.getMonth() + 1;
          let rmonth = rdate.getMonth() + 1;

          let lday = ldate.getDate();
          let rday = rdate.getDate();

          if (lyear === ryear && lmonth === rmonth && lday === rday) {
            //same
            groupedRecord.push(right);
          } else {
            //not same
            let obj = {
              Type: 'Date',
              Tag: `${rdate.getDate()} ${monthNames[rdate.getMonth()]
                }, ${rdate.getFullYear()}`,
            };

            groupedRecord.push(obj);
            groupedRecord.push(right);
          }
        }
      }
    });
  }

  if (recordList.length > 0) {
    sortByDate();
  }

  async function updateRecord() {
    let _RecordDate = RecordDate;
    if (RecordDate !== undefined && RecordDate !== '') {
      const date = new Date(RecordDate);
      _RecordDate = `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`
    }

    let editedRecord = editabelRecord;

    editedRecord.Type = `${showing}`;
    editedRecord.Description = selectedDescription;
    editedRecord.Nature = selectedNatures;
    editedRecord.Entry = selectedEntry;
    editedRecord.Duration = selectedDuration;
    editedRecord.RecordDate = _RecordDate

    // console.log("@updateRecord", editedRecord);
    try {
      if (window.navigator.onLine) {
        setEffects({
          ...effects,
          loading: true,
        });
        const request = await fetch(`${url}/UpdateRecords`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`,
          },
          body: JSON.stringify(editedRecord),
        });

        if (!request.ok) {
          const error = await request.json();
          throw Error(error.error);
        }
        const data = await request.json();

        for (let i = 0; i < recordList.length; i++) {
          const item = recordList[i];
          if (item.RecordID == editedRecord.RecordID) {
            const index = recordList.indexOf(item);
            recordList[index] = editedRecord;
          }
        }

        setAddRecModal(false)

        setEffects({
          ...effects,
          loading: false,
          error: {
            error: false,
            title: 'Success',
            message: `${data.message}`,
          },
        });

      } else {
        setEffects({
          ...effects,
          loading: false,
          error: {
            error: true,
            title: 'Network',
            message: 'Connection Error',
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
            title: 'Error',
            message: error.message,
          },
        });

        setShowInfoDialog(true);
      }, 2000);
    }
  }

  async function addNewRecord() {
    let _RecordDate = RecordDate;
    if (RecordDate !== undefined && RecordDate !== '') {
      const date = new Date(RecordDate);
      _RecordDate = `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`
    }

    const newRecord = { Type: `${showing}`, Description: selectedDescription, Nature: selectedNatures, FolderNo: patient.FolderNo, Entry: selectedEntry, Duration: selectedDuration, RecordDate: _RecordDate }
    // console.log("@addNewRecord", newRecord);
    try {
      if (window.navigator.onLine) {
        setEffects({
          ...effects,
          loading: true,
        });
        const request = await fetch(`${url}/records`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`,
          },
          body: JSON.stringify(newRecord),
        });

        if (!request.ok) {
          const error = await request.json();
          throw Error(error.error);
        }

        let preViousList = recordList;
        preViousList.unshift(newRecord);
        setRecordList(preViousList);

        setAddRecModal(false)

        const data = await request.json();

        setEffects({
          ...effects,
          loading: false,
          error: {
            error: false,
            title: 'Success',
            message: `${data.message}`,
          },
        });

        // setShowInfoDialog(true);
      } else {
        setEffects({
          ...effects,
          loading: false,
          error: {
            error: true,
            title: 'Network',
            message: 'Connection Error',
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
            title: 'Error',
            message: error.message,
          },
        });

        setShowInfoDialog(true);
      }, 2000);
    }
  }

  const deleteRModal = (e, val) => {
    e.preventDefault();
    setShowDeleteDialog(true);
    setMyRecord(val);
  };

  async function deleteRecord(e, record) {
    e.preventDefault();
    console.log('@deleteRecord', record.RecordID);

    try {
      if (window.navigator.onLine) {
        setEffects({
          ...effects,
          loading: true,
        });
        const request = await fetch(`${url}/DeleteRecord`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`,
          },
          body: JSON.stringify({ RecordID: record.RecordID }),
        });

        if (!request.ok) {
          const error = await request.json();
          throw Error(error.error);
        }
        const data = await request.json();

        setEffects({
          ...effects,
          loading: false,
          error: {
            error: false,
            title: 'Success',
            message: `${data.message}`,
          },
        });
        setShowInfoDialog(true);
      } else {
        setEffects({
          ...effects,
          loading: false,
          error: {
            error: true,
            title: 'Network',
            message: 'Connection Error',
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
            title: 'Error',
            message: error.message,
          },
        });

        setShowInfoDialog(true);
      }, 2000);
    }
  }

  function enableEditMode(e, editables) {
    e.preventDefault();

    setEditabelRecord(editables);
    setSelectedNatures(editables.Nature);
    setSelectedDescription(editables.Description);
    setSelectedDuration(editables.Duration);
    setSelectedEntry(editables.Entry);
    setRecordDate(editables.RecordDate);

    setEditabelMode(true);
  }

  function handleSearchPhraseChange(phrase) {
    if (phrase.length > 2) {
      search(phrase);
    } else {
      setRecordList(recordList);
    }
  }

  async function search(key) {
    var result = [];
    recordList.forEach((element) => {
      let target = element.Description + '';
      if (key.length <= target.length) {
        target = target.slice(0, key.length - 1);
        let _key = key.slice(0, key.length - 1);
        if (target.toLocaleLowerCase() === _key.toLocaleLowerCase()) {
          console.log('MATCH');
          result.push(element);
        }
      }
    });

    if (result.length === 0) {
      setRecordList(recordList);
    } else {
      console.log('FOUND');
      setRecordList(result);
    }
  }

  function setShowingRecord(value) {
    resetDuration();
    switchShowing(value);
    if (value === 'Assessment') {
      setRecordList(assessmentRecords);
    } else if (value === 'Care') {
      setRecordList(careRecords);
    } else if (value === 'Complication') {
      setRecordList(complicationRecords);
    }
  }

  const FabTwo = () => {
    return (
      <div>
        <div
          onClick={() => {
            setSelectedNatures(undefined)
            setSelectedDescription(undefined)
            setDescriptions(undefined)
            setDurations(undefined)
            setRecordDate('')
            setAddRecModal(true);
          }}
          className={styles.fab}
        >
          <p>+</p>
        </div>

        <button
          onClick={() => {
            setSelectedNatures(undefined)
            setDescriptions(undefined)
            setSelectedDescription(undefined)
            setDurations(undefined)
            setRecordDate('')
            setAddRecModal(true)
          }}
          className={styles.add_new_record}
          aria-label="Add new record"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5005 10.9995C13.917 10.9995 11.001 13.9155 11.001 17.499C11.001 21.0825 13.9155 24 17.5005 24C21.0855 24 24 21.084 24 17.5005C24 13.917 21.084 10.9995 17.5005 10.9995ZM19.9995 18.4995H18.4995V19.9995C18.4995 20.5515 18.051 21 17.499 21C16.947 21 16.5 20.553 16.5 19.9995V18.4995H15C14.448 18.4995 13.9995 18.051 13.9995 17.499C13.9995 16.947 14.448 16.5 15 16.5H16.5V15C16.5 14.448 16.9485 13.9995 17.5005 13.9995C18.0525 13.9995 18.501 14.448 18.501 15V16.5H20.001C20.553 16.5 21 16.9485 21 17.5005C21 18.0525 20.553 18.4995 19.9995 18.4995Z"
              fill="white"
            />
            <path
              d="M19.0005 0H3C1.3425 0 0 1.3425 0 3C0 4.6575 1.3425 6 3 6H19.0005C20.658 6 22.0005 4.6575 22.0005 3C22.0005 1.3425 20.6565 0 19.0005 0ZM3 4.0005C2.448 4.0005 1.9995 3.552 1.9995 3C1.9995 2.448 2.448 1.9995 3 1.9995C3.552 1.9995 4.0005 2.4465 4.0005 3C4.0005 3.552 3.552 4.0005 3 4.0005ZM7.00049 4.0005C6.44699 4.0005 6 3.552 6 3C6 2.448 6.44699 1.9995 7.00049 1.9995C7.55249 1.9995 8.00099 2.4465 8.00099 3C7.99949 3.552 7.55249 4.0005 7.00049 4.0005Z"
              fill="white"
            />
            <path
              d="M19.0005 7.99951H3C1.3395 7.99951 0 9.33901 0 10.9995C0 12.66 1.3395 13.9995 3 13.9995H9.76049C11.0895 11.0505 14.0595 9.00001 17.5005 9.00001C19.101 9.00001 20.61 9.45001 21.891 10.23C21.5595 8.94001 20.3895 7.99951 19.0005 7.99951ZM3 12C2.4495 12 1.9995 11.55 1.9995 10.9995C1.9995 10.449 2.4495 9.99901 3 9.99901C3.5505 9.99901 4.0005 10.449 4.0005 10.9995C4.0005 11.55 3.5505 12 3 12ZM7.00049 12C6.44999 12 6 11.55 6 10.9995C6 10.449 6.44999 9.99901 7.00049 9.99901C7.55099 9.99901 8.00099 10.449 8.00099 10.9995C8.00099 11.55 7.54949 12 7.00049 12Z"
              fill="white"
            />
            <path
              d="M8.99999 17.5005C8.99999 16.9905 9.04949 16.491 9.13949 16.0005H3C1.3395 16.0005 0 17.34 0 19.0005C0 20.661 1.3395 22.0005 3 22.0005H10.29C9.46949 20.7 8.99999 19.1505 8.99999 17.5005ZM3 19.9995C2.4495 19.9995 1.9995 19.5495 1.9995 18.999C1.9995 18.45 2.4495 18 3 18C3.5505 18 4.0005 18.45 4.0005 19.0005C4.0005 19.5495 3.5505 19.9995 3 19.9995ZM7.00049 19.9995C6.44999 19.9995 5.99999 19.5495 5.99999 18.999C5.99999 18.45 6.44999 18 7.00049 18C7.55099 18 8.00099 18.45 8.00099 19.0005C7.99949 19.5495 7.54949 19.9995 7.00049 19.9995Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    );
  };

  function OptionsView() {
    return (
      objStructs.map((item, key) => {
        return <option key={key} value={item.title}>{item.title}</option>
      })
    )
  }

  function SelectionView() {
    return (
      <select
        className={styles.select}
        name="record"
        value={showing}
        onChange={(e) => setShowingRecord(e.target.value)}
      >
        <OptionsView />
      </select>
    )
  }

  function RecordListView(props) {
    const list = props.list;
    const title = props.title;

    if (list.length === 0) {
      return <p className={styles.no_record}>{`No ${title} Record.`}</p>
    } else {
      return (list.map(function (item, key) {
        if (item.Type === 'Date') {
          return <p key={key} style={{ marginLeft: 20 }}>{item.Tag}</p>
        } else {
          return <Fragment key={key}>
            <EachRecord
              record={item}
              type={title}
              editMode={(e) => {
                enableEditMode(e, item);
                setAddRecModal(true);
              }}
              openDeleteModal={(e) => {
                deleteRModal(e, item);
              }}
            />
          </Fragment>
        }
      }
      )
      )
    }
  }

  function RecordsView() {
    if (showing === 'Assessment') {
      return <RecordListView list={groupedRecord} title={'Assessment'} />
    } else if (showing === 'Care') {
      return <RecordListView list={groupedRecord} title={'Care'} />
    } else {
      return <RecordListView list={groupedRecord} title={'Complication'} />
    }
  }

  function NatureView() {
    let natures = objStructs[0].data;
    if (showing === objStructs[0].title) {
      natures = objStructs[0].data
    } else if (showing === objStructs[1].title) {
      natures = objStructs[1].data
    } else {
      natures = objStructs[2].data
    }

    return (natures.map(function (nature, i) {
      return (
        <p
          onClick={() => {
            setDescriptions(undefined)
            setDurations(undefined)

            setDescriptions(nature.data);
            setSelectedNatures(nature.title);

            setSelectedDescription(undefined)
            setSelectedDuration(undefined)
            setRecordDate('')
          }}
          style={{
            position: 'relative',
            top: 0,
            left: 0,
            width: '100%',
            cursor: 'pointer',
          }}
          key={i}
        >
          {' '}
          {nature.title}{' '}
        </p>
      );
    })
    );
  }

  function DescriptionView() {
    return (descriptions === undefined ? <></> :
      descriptions.map(function (description, key) {
        return (
          <p
            onClick={() => {
              const type = description.data.type;
              if (type === 'None') {
                setDurations(undefined);
              } else {
                setDurations(description.data);
              }

              setSelectedEntry(undefined);
              setSelectedDescription(description.title);
            }}
            style={{
              position: 'relative',
              top: 0,
              left: 0,
              width: '100%',
              cursor: 'pointer',
            }}
            key={key}
          >
            {' '}
            {description.title}{' '}
          </p>
        );
      })
    );
  }

  function EntryView() {
    return (
      <>
        <p className={styles.formLabel}>Duration/Entry</p>
        <div className={styles.inputGpWrap}>
          <input
            autoFocus={true}
            className={styles.inputName}
            placeholder="Entry"
            value={selectedEntry === undefined ? '' : selectedEntry}
            onChange={(e) => {
              setSelectedEntry(e.target.value);
              setSelectedDuration(undefined)
              setRecordDate('')
            }}
            disabled={durations === undefined}
            readOnly={false}
            type="number"
          />
        </div>
      </>
    )
  }

  function TrueOrFalseView() {
    return (
      <>
        <input
          className={styles.inputName}
          placeholder="Select Entry"
          value={selectedEntry === undefined ? '' : selectedEntry}
          readOnly={true}
        />
        <img src={chevDown} alt="" className={styles.chev} />{' '}
        {showDropDur ? <div className={styles.dropWrap}>
          {durations.Duration.data.map(function (item, key) {
            return (
              <p
                onClick={() => {
                  setSelectedEntry(undefined);
                  setShowWrapDur(!showDropDur);
                  setSelectedEntry(item);
                  setSelectedDuration(undefined)
                  setRecordDate('')
                }}
                style={{
                  position: 'relative',
                  top: 0,
                  left: 0,
                  width: '100%',
                  cursor: 'pointer',
                }}
                key={key}
              >
                {' '}
                {item}{' '}
              </p>
            );
          })}
        </div>
          : <></>}
      </>
    );
  }

  function DateDurationListView() {
    return (
      <>
        <input
          className={styles.inputName}
          placeholder="Select Duration"
          value={selectedDuration === undefined ? '' : selectedDuration}
          readOnly={true}
        />
        <img src={chevDown} alt="" className={styles.chev} />{' '}
        {
          showDropDur ? <div className={styles.dropWrap}>
            {durations.Duration.data.map(function (item, key) {
              return (
                <p
                  onClick={() => {
                    setDurationsDateOverlayState(item)
                  }}
                  style={{
                    position: 'relative',
                    top: 0,
                    left: 0,
                    width: '100%',
                    cursor: 'pointer',
                  }}
                  key={key}
                >
                  {' '}
                  {item}{' '}
                </p>
              )
            })}
          </div>
            : <></>
        }
      </>
    );
  }

  function DurationListView() {
    return (
      <>
        <input
          className={styles.inputName}
          placeholder="Select Entry"
          value={selectedEntry === undefined ? '' : selectedEntry}
          readOnly={true}
        />
        <img src={chevDown} alt="" className={styles.chev} />{' '}
        {showDropDur ? <div className={styles.dropWrap}>
          {durations.Duration.data.map(function (item, i) {
            return (
              <p
                onClick={() => {
                  setSelectedEntry(undefined);
                  setSelectedEntry(item);
                  setSelectedDuration(undefined)
                  setRecordDate('')
                }}
                style={{
                  position: 'relative',
                  top: 0,
                  left: 0,
                  width: '100%',
                  cursor: 'pointer',
                }}
                key={i}
              >
                {' '}
                {item}{' '}
              </p>
            )
          })}
        </div>
          : <></>}
      </>
    );
  }

  function ListOptionsView() {
    return (<>
      <p className={styles.formLabel}>Duration/Entry</p>
      <div
        className={styles.inputGpWrap}
        onClick={() => {
          setShowWrapDur(!showDropDur);
        }}
      >
        {durations.Duration.type === 'bool' ? <TrueOrFalseView /> : durations.Duration.type === 'List' ? <DurationListView /> : <DateDurationListView />}
      </div>
    </>
    )
  }

  function DurationView() {
    if (durations === undefined) {
      return <></>
    } else if (durations.type === 'Entry') {
      return <EntryView />
    } else {
      return <ListOptionsView />
    }
  }

  function DisplayEditView() {
    return (
      <div className={styles.editWrap}>
        <p className={styles.formLabel}>Nature</p>
        <div
          className={styles.inputGpWrap}
          onClick={() => {
            setShowWrap(!showDrop);
          }}
        >
          <input
            className={styles.inputName}
            placeholder="Select Nature"
            value={selectedNatures === undefined ? '' : selectedNatures}
            readOnly={true}
          />
          <img src={chevDown} alt="" className={styles.chev} />{' '}
          {showDrop ? (
            <div className={styles.dropWrap}>
              <NatureView />
            </div>
          ) : null}
        </div>

        <p className={styles.formLabel}>Description</p>
        <div
          className={styles.inputGpWrap}
          onClick={() => { setShowWrapDes(!showDropDes) }}>
          <input
            className={styles.inputName}
            placeholder="Select Description"
            disabled={descriptions === undefined}
            value={selectedDescription === undefined ? '' : selectedDescription}
            readOnly={true}
          />
          <img src={chevDown} alt="" className={styles.chev} />{' '}
          {showDropDes ? (
            <div className={styles.dropWrap}>
              <DescriptionView />
            </div>
          ) : null}
        </div>

        <DurationView />
      </div>
    )
  }

  function DisplayNewView() {
    return (
      <div className={styles.editWrap}>
        <p className={styles.formLabel}>Nature</p>
        <div
          className={styles.inputGpWrap}
          onClick={() => {
            setShowWrap(!showDrop);
          }}
        >
          <input
            className={styles.inputName}
            placeholder="Select Nature"
            value={selectedNatures === undefined ? '' : selectedNatures}
            readOnly={true}
          />
          <img src={chevDown} alt="" className={styles.chev} />{' '}
          {showDrop ? (
            <div className={styles.dropWrap}>
              <NatureView />
            </div>
          ) : null}
        </div>

        <p className={styles.formLabel}>Description</p>
        <div
          className={styles.inputGpWrap}
          onClick={() => { setShowWrapDes(!showDropDes) }}>
          <input
            className={styles.inputName}
            placeholder="Select Description"
            disabled={descriptions === undefined}
            value={selectedDescription === undefined ? '' : selectedDescription}
            readOnly={true}
          />
          <img src={chevDown} alt="" className={styles.chev} />{' '}
          {showDropDes ? (
            <div className={styles.dropWrap}>
              <DescriptionView />
            </div>
          ) : null}
        </div>

        <DurationView />
      </div>
    )
  }

  function EditOrAddNewView() {
    return (
      <Overlay
        className={styles.modal}
        closeOnClick={true}
        open={addRecModal}
        onClose={() => {
          setAddRecModal(false);
          setEditabelMode(false);
          setSelectedNatures(undefined);
          setSelectedDescription(undefined);
          setSelectedDuration(undefined);
          setSelectedEntry(undefined);
          setRecordDate('');
        }}
      >
        <div className={styles.modal_paper2}>
          <div className={styles.modalTop2}>
            <p className={styles.appTitle}>{editabelMode ? "Edit Record" : "Add New Record"}</p>
            <img
              src={x}
              alt=""
              onClick={() => {
                setAddRecModal(false);
              }}
            />
          </div>
          {editabelMode ? <DisplayEditView /> : <DisplayNewView />}

          {/* Begin Date */}
          <p className={styles.formLabel}>Date of Record</p>
          <div className={styles.inputGpWrap}>
            <DatePicker
              id="RecordDate"
              name="RecordDate"
              value={RecordDate}
              className={styles.input}
              onChange={(e) => setRecordDate(e)}
              required
              format="dd/MM/y"
            />
          </div>
          {/* End Date */}

          {editabelMode ? (
            <div className={styles.roe}>
              <p
                onClick={(e) => {
                  e.preventDefault();
                  updateRecord();
                }}
                className={styles.addRec}
              >
                Edit Record
              </p>
              <p
                onClick={(e) => {
                  e.preventDefault();
                  setEditabelMode(false);
                  setAddRecModal(false);
                }}
                className={styles.addRec}
              >
                Cancel
              </p>
            </div>
          ) : (
              <p
                onClick={(e) => {
                  e.preventDefault();
                  addNewRecord();
                }}
                className={styles.addRec}
              >
                Add New Record
              </p>
            )}
        </div>
      </Overlay>
    )
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

          {/* Begin category selection View */}
          <SelectionView />
          {/* End category selection View */}

          {/* Begin Record List View */}
          <RecordsView />
          {/* End Record List View */}

        </div>
        <FabTwo />
        <BottomBar />
      </Shell>

      {/* start of modal for edit and add new */}
      <EditOrAddNewView />
      {/* start of modal for edit and add new */}

      {/* Days,Months, and Years Selection Overlay */}
      <Overlay
        className={styles.modal}
        closeOnClick={true}
        open={durationsDateOverlayState !== undefined}
        onClose={() => {
          setDurationsDateOverlayState(undefined);
        }}
      >
        <div className={styles.modal_paper}>
          <div className={styles.modalTop2}>
            <p className={styles.appTitle}>{durationsDateOverlayState}</p>
            <img
              src={x}
              alt=""
              onClick={() => {
                setDurationsDateOverlayState(undefined);
              }}
            />
          </div>
          {/* <div className={styles.cWrap}> */}
          <div className={styles.inputGpWrap}>
            <input
              className={styles.inputName}
              onChange={(value) => {
                setSelectedDuration(`${value.target.value} ${durationsDateOverlayState}`);
                setSelectedEntry(undefined);
              }}
              placeholder={`How Many ${durationsDateOverlayState} ?`}
            />
          </div>
          {/* </div> */}
          <div
            onClick={() => {
              setDurationsDateOverlayState(undefined);
            }}
            className={styles.pCreate}
          >
            Ok
          </div>
        </div>
      </Overlay>
      {/* End Days,Months, and Years Selection Overlay */}

      {/* Begin Show Info Overlay */}
      <Overlay
        className={styles.modal}
        closeOnClick={true}
        open={showInfoDialog}
        onClose={() => {
          setShowInfoDialog(false);
        }}
      >
        <div className={styles.modal_paper}>
          <div className={styles.modalTop2}>
            <p className={styles.appTitle}>{effects.error.title}</p>
          </div>
          <div className={styles.inputGpWrap}>
            <p>{effects.error.message}</p>
          </div>
          <div
            onClick={() => {
              // var pre = editabelRecord;
              // pre.Duration = duration;
              setShowInfoDialog(false);
            }}
            className={styles.pCreate}
          >
            Dismiss
          </div>
        </div>
      </Overlay>
      {/* End Show Info Overlay */}

      {/* Begin Delete Dialog*/}
      <Overlay
        className={styles.modal}
        closeOnClick={true}
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
        }}
      >
        <div className={styles.modal_paper}>
          <div className={styles.modalTop2}>
            <p className={styles.appTitle}>Are you Sure you want to Delete ?</p>
          </div>

          <div className={styles.deRow}>
            <div
              onClick={(e) => {
                deleteRecord(e, myRecord);
                setShowDeleteDialog(false);
              }}
              className={styles.pCreate}
            >
              Yes
            </div>
            <div
              onClick={() => {
                setShowDeleteDialog(false);
              }}
              className={styles.pNo}
            >
              No
            </div>
          </div>
        </div>
      </Overlay>
      {/* End Delete Dialog*/}

      {/* Begin Spinner Overlay */}
      <Overlay
        className={styles.modal}
        closeOnClick={true}
        open={effects.loading}
        onClose={() => {
          setShowInfoDialog(false);
        }}
      >
        <ClipLoader
          css={override}
          size={150}
          color={'#123abc'}
          loading={true}
        />
      </Overlay>
      {/* End Spinner Overlay */}
    </>
  );
};

export default MedicalHistory;