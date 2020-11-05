import React, { useState } from 'react';
import localForage from 'localforage';
import { useLocation } from 'react-router-dom';
import Shell from '../../JS/detail_shell';
import TopBar from '../../../UI/JS/topbar';
import SecondaryBar from '../../../UI/JS/secondary_navbar';
import styles from '../../../../container/AddPatientData/CSS/add_patient_data.module.css';
const url = process.env.REACT_APP_BASE_URL;

const BioData = (props) => {
  const bioData = useLocation().state;
  console.log(bioData, ".....");
  const [value, changeValue] = useState({
    LastName: bioData ? bioData.LastName : '',
    FirstName: bioData ? bioData.FirstName : '',
    PhoneNumber: bioData ? bioData.PhoneNumber : '',
    KinsNumber: bioData ? bioData.KinsNumber : '',
    FolderNo: bioData ? bioData.FolderNo : '',
    Gender: bioData ? bioData.Gender : '',
    NextOfKin: bioData ? bioData.NextOfKin : "",
    Age: bioData ? bioData.Age : '',
    MaritalStatus: bioData ? bioData.MaritalStatus : '',
    Occupation: bioData ? bioData.Occupation : '',
    other_Occupation: '',
    EthnicGroup: bioData ? bioData.EthnicGroup : '',
    other_EthnicGroup: '',
    Religion: bioData ? bioData.Religion : '',
    other_Religion: '',
    Residence: bioData ? bioData.Residence : '',
    HighestEducation: bioData ? bioData.HighestEducation : '',
    AlcoholUse: bioData ? bioData.AlcoholUse : '',
    TobaccoUse: bioData ? bioData.TobaccoUse : '',
    FamilyHistory: bioData ? bioData.FamilyHistory : '',
    AlcoholFrequency:
      bioData && bioData.AlcoholFrequency ? bioData.AlcoholFrequency : '',
    AsthmaHistory: bioData ? bioData.AsthmaHistory : '',
    AgeOfOnset: bioData ? bioData.AgeOfOnset : '',
    Triggers: bioData ? bioData.Triggers : '',
    other_triggers: '',
  });

  function handleChange(name, e) {
    e.preventDefault();
    changeValue({ ...value, [name]: e.target.value });
  }

  function update(e) {
    e.preventDefault();

    localForage
      .setItem(bioData.FolderNo, {
        ...bioData,
        bioData: { ...value },
      })
      .then(() => updatePatientDataOnline());
  }

  async function updatePatientDataOnline(e) {
    // e.preventDefault();
    console.log("@BioData", value);

    try {
      if (window.navigator.onLine) {
        const request = await fetch(`${url}/PatientUpdate`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
          },
          body: JSON.stringify(value)
        });

        if (!request.ok) {
          const error = await request.json();
          throw Error(error.error);
        }

        props.history.goBack()
        // const data = await request.json();
      } else {
        // localForage
        //   .setItem(bioData.FolderNo, {
        //     ...bioData,
        //     bioData: { ...value }
        //   })
        //   .then(() => {/**Do nothing for now ... */ });
      }
    } catch (error) {
      // setEffects({
      //   ...effects,
      //   error: {
      //     error: true,
      //     message: error.message
      //   }
      // });
    }
  }


  return (
    <>
      <TopBar hide_on_small_screens />
      <SecondaryBar page_title="Bio-Data" shadow />
      <Shell name={`${bioData.LastName} ${bioData.FirstName}`}>
        <form className={styles.form} onSubmit={(e) => update(e)}>
          <div className={styles.fields}>
            <div>
              <label htmlFor="LastName">Surname</label>
              <input
                id="LastName"
                type="text"
                name="LastName"
                className={styles.input}
                onChange={(e) => handleChange('LastName', e)}
                value={value.LastName}
                placeholder="Enter patient's LastName"
                required
              />
            </div>
            <div>
              <label htmlFor="FirstName">First Name</label>
              <input
                id="FirstName"
                type="text"
                name="FirstName"
                className={styles.input}
                onChange={(e) => handleChange('FirstName', e)}
                value={value.FirstName}
                placeholder="Enter patient's first name"
                required
              />
            </div>
            <div>
              <label htmlFor="PhoneNumber">Phone Number</label>
              <input
                id="PhoneNumber"
                name="PhoneNumber"
                type="tel"
                onChange={(e) => handleChange('PhoneNumber', e)}
                value={value.PhoneNumber}
                className={styles.input}
                placeholder="Enter phone number"
                minLength="11"
                maxLength="11"
                required
              />
            </div>
            <div>
              <label htmlFor="KinsNumber">Next of Kin's Phone Number</label>
              <input
                id="KinsNumber"
                name="KinsNumber"
                type="tel"
                onChange={(e) => handleChange('KinsNumber', e)}
                value={value.KinsNumber}
                className={styles.input}
                placeholder="Enter next of kin's phone number"
                minLength="11"
                maxLength="11"
                required
              />
            </div>
            <div>
              <label htmlFor="NextOfKin">
                Relationship To Next of Kin
              </label>
              <input
                id="NextOfKin"
                type="text"
                name="NextOfKin"
                className={styles.input}
                onChange={(e) => handleChange('NextOfKin', e)}
                value={value.NextOfKin}
                placeholder="Enter relationship to next of kin"
                required
              />
            </div>
            <div>
              <label htmlFor="FolderNo">Folder Number</label>
              <input
                id="FolderNo"
                name="FolderNo"
                type="number"
                onChange={(e) => handleChange('FolderNo', e)}
                value={value.FolderNo}
                className={styles.input}
                placeholder="Enter folder number"
                required
              />
            </div>
            <div>
              <label htmlFor="Gender">Sex</label>
              <select
                id="Gender"
                name="Gender"
                value={value.Gender}
                onChange={(e) => handleChange('Gender', e)}
                className={styles.input}
                required
              >
                <option></option>
                <option>Female</option>
                <option>Male</option>
              </select>
            </div>
            <div>
              <label htmlFor="Age">Age</label>
              <input
                id="Age"
                name="Age"
                type="number"
                onChange={(e) => handleChange('Age', e)}
                value={value.Age}
                className={styles.input}
                placeholder="Enter Age"
                minLength="1"
                maxLength="3"
                required
              />
            </div>
            <div>
              <label htmlFor="MaritalStatus">Marital Status</label>
              <select
                id="MaritalStatus"
                name="MaritalStatus"
                value={value.MaritalStatus}
                onChange={(e) => handleChange('MaritalStatus', e)}
                className={styles.input}
                required
              >
                <option></option>
                <option>Married/co-habiting</option>
                <option>Single</option>
                <option>Widow/Widower</option>
                <option>Divorced/Separated</option>
              </select>
            </div>
            <div>
              <label htmlFor="Occupation">Occupation</label>
              <select
                id="Occupation"
                name="Occupation"
                value={value.Occupation}
                onChange={(e) => handleChange('Occupation', e)}
                className={styles.input}
                required
              >
                <option></option>
                <option>Government employed</option>
                <option>Private sector employed</option>
                <option>Student</option>
                <option>Retired</option>
                <option>Unemployed (able to work)</option>
                <option>Unemployed (Unable to work)</option>
                <option>Others</option>
              </select>
            </div>
            {value.Occupation === 'Others' ? (
              <div>
                <label htmlFor="other_Occupation">Other Occupation</label>
                <input
                  id="other_Occupation"
                  name="other_Occupation"
                  type="text"
                  onChange={(e) => handleChange('other_Occupation', e)}
                  value={value.other_Occupation}
                  className={styles.input}
                  placeholder="Type in other Occupation"
                  required
                />
              </div>
            ) : null}
            <div>
              <label htmlFor="EthnicGroup">Ethnic Group</label>
              <select
                id="EthnicGroup"
                name="EthnicGroup"
                value={value.EthnicGroup}
                onChange={(e) => handleChange('EthnicGroup', e)}
                className={styles.input}
                required
              >
                <option></option>
                <option>Igbo</option>
                <option>Hausa</option>
                <option>Yoruba</option>
                <option>Others</option>
              </select>
            </div>
            {value.EthnicGroup === 'Others' ? (
              <div>
                <label htmlFor="other_EthnicGroup">Other Ethnic Group</label>
                <input
                  id="other_EthnicGroup"
                  name="other_EthnicGroup"
                  type="text"
                  onChange={(e) => handleChange('other_EthnicGroup', e)}
                  value={value.other_EthnicGroup}
                  className={styles.input}
                  placeholder="Type in other ethnic group"
                  required
                />
              </div>
            ) : null}
            <div>
              <label htmlFor="Religion">Religion</label>
              <select
                id="Religion"
                name="Religion"
                value={value.Religion}
                onChange={(e) => handleChange('Religion', e)}
                className={styles.input}
                required
              >
                <option></option>
                <option>Roman Catholic</option>
                <option>Pentecostal</option>
                <option>Anglican</option>
                <option>Jehovah Witness</option>
                <option>Islam</option>
                <option>Others</option>
              </select>
            </div>
            {value.Religion === 'Others' ? (
              <div>
                <label htmlFor="other_Religion">Other Religion</label>
                <input
                  id="other_Religion"
                  name="other_Religion"
                  type="text"
                  onChange={(e) => handleChange('other_Religion', e)}
                  value={value.other_Religion}
                  className={styles.input}
                  placeholder="Type in other Religion"
                  required
                />
              </div>
            ) : null}
            <div>
              <label htmlFor="Residence">Residence</label>
              <select
                id="Residence"
                name="Residence"
                value={value.Residence}
                onChange={(e) => handleChange('Residence', e)}
                className={styles.input}
              >
                <option></option>
                <option>Rural</option>
                <option>Urban</option>
              </select>
            </div>
            <div>
              <label htmlFor="HighestEducation">Highest Education</label>
              <select
                id="HighestEducation"
                name="HighestEducation"
                value={value.HighestEducation}
                onChange={(e) => handleChange('HighestEducation', e)}
                className={styles.input}
              >
                <option></option>
                <option>None</option>
                <option>Primary</option>
                <option>Secondary</option>
                <option>Tertiary</option>
              </select>
            </div>
            <div>
              <label htmlFor="AlcoholUse">Alcohol Use</label>
              <select
                id="AlcoholUse"
                name="AlcoholUse"
                value={value.AlcoholUse}
                onChange={(e) => handleChange('AlcoholUse', e)}
                className={styles.input}
              >
                <option></option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            {value.AlcoholUse === 'Yes' ? (
              <div>
                <label htmlFor="AlcoholFrequency">
                  Alcohol Frequency (bottles per week)
                </label>
                <input
                  id="AlcoholFrequency"
                  type="number"
                  name="AlcoholFrequency"
                  className={styles.input}
                  onChange={(e) => handleChange('AlcoholFrequency', e)}
                  value={value.AlcoholFrequency}
                  placeholder="Bottles per week"
                />
              </div>
            ) : null}
            <div>
              <div>
                <label htmlFor="TabaccoUse">Tabacco Use</label>
                <select
                  id="TabaccoUse"
                  name="TabaccoUse"
                  value={value.TabaccoUse}
                  onChange={(e) => handleChange('TobaccoUse', e)}
                  className={styles.input}
                  required
                >
                  <option></option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <label htmlFor="FamilyHistory">Family History of Asthma</label>
              <select
                id="FamilyHistory"
                name="FamilyHistory"
                value={value.FamilyHistory}
                onChange={(e) => handleChange('FamilyHistory', e)}
                className={styles.input}
              >
                <option></option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label htmlFor="AgeOfOnset">Age of Onset (in years)</label>
              <input
                id="AgeOfOnset"
                type="number"
                name="AgeOfOnset"
                className={styles.input}
                onChange={(e) => handleChange('AgeOfOnset', e)}
                value={value.AgeOfOnset}
                placeholder="Type in year"
              />
            </div>
            <div>
              <label htmlFor="Triggers">Triggers</label>
              <select
                id="Triggers"
                name="Triggers"
                value={value.Triggers}
                onChange={(e) => handleChange('Triggers', e)}
                className={styles.input}
                required
              >
                <option></option>
                <option>Smoke/Fumes</option>
                <option>Drugs</option>
                <option>Foods/Drinks</option>
                <option>Weather</option>
                <option>Infection</option>
                <option>Exercise</option>
                <option>Pollen</option>
                <option>Pets</option>
                <option>Others</option>
              </select>
            </div>
            {value.Triggers === 'Others' ? (
              <div>
                <label htmlFor="other_triggers">Other Triggers</label>
                <input
                  id="other_triggers"
                  type="text"
                  name="other_triggers"
                  className={styles.input}
                  disabled={!value.AgeOfOnset}
                  onChange={(e) => handleChange('other_triggers', e)}
                  value={value.other_triggers}
                  placeholder="Type in other Triggers"
                  required
                />
              </div>
            ) : null}
          </div>
          <div className={styles.btn_area}>
            <button
              className="primary_btn"
              type="submit"
              disabled={value.TabaccoUse===''}
            >
              Update Basic Information
            </button>
          
          

            {/* <button
              className="primary_btn"
              type="submit"
              disabled={
                !value.LastName ||
                  !value.FirstName ||
                  !value.PhoneNumber ||
                  !value.Gender ||
                  !value.Age ||
                  !value.KinsNumber ||
                  !value.RelationshipToNextOfKin ||
                  !value.FolderNo ||
                  !value.MaritalStatus ||
                  !value.DiabetesDiagnosis ||
                  !value.Occupation ||
                  (value.Occupation === 'Others' && !value.other_Occupation) ||
                  !value.EthnicGroup ||
                  (value.EthnicGroup === 'Others' && !value.other_EthnicGroup) ||
                  !value.Religion ||
                  (value.Religion === 'Others' && !value.other_Religion) ||
                  !value.Residence ||
                  !value.HighestEducation ||
                  !value.TobaccoUse ||
                  !value.AlcoholUse ||
                  !value.AsthmaHistory ||
                  !value.AgeOfOnset ||
                  !value.Triggers ||
                  (value.Triggers === 'Others' && !value.other_triggers) ||
                  (value.AlcoholUse === 'Yes' && !value.AlcoholFrequency)
                  ? true
                  : false
              }
            >
              Update Basic Information
            </button> */}

          </div>
        </form>
      </Shell>
    </>
  );
};

export default BioData;
