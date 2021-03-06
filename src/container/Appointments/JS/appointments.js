import React, { Component, useState } from 'react';
import Layout from '../../UI/JS/layout';
import { Link } from 'react-router-dom';
import { Overlay } from 'react-portal-overlay';
import { detailSubject } from '../../../actions/general/index';
import { connect } from 'react-redux';
import styles from '../CSS/appointments.module.css';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import AppointmentDetail from '../../../components/Patients/AppointmentSide/appointment_detail';

const url = process.env.REACT_APP_BASE_URL;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

let dis;

class AppointmentsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: [],
      loading: false,
      infoDialog: false,
      title: 'Error',
      msg: '',
    };
    dis = this;
  }

  componentDidMount() {
    this.getAppointments();
  }

  getAppointments = async () => {
    try {
      if (window.navigator.onLine) {
        this.setState({
          loading: true,
          infoDialog: false,
        });

        const request = await fetch(`${url}/getUniversal`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`,
          },
          body: JSON.stringify({ Type: 'Appointment' }),
        });

        if (!request.ok) {
          const error = await request.json();
          throw Error(error.error);
        }
        const data = await request.json();
        this.setState({
          loading: false,
          infoDialog: false,
          title: 'Info',
          msg: data,
          appointments: data.data,
        });
      } else {
        this.setState({
          loading: false,
          infoDialog: true,
          title: 'Network',
          msg: 'Connection Error',
        });
      }
    } catch (error) {
      setTimeout(() => {
        this.setState({
          loading: false,
          infoDialog: true,
          title: 'Error',
          msg: error.message,
        });
      }, 2000);
    }
  };

  GetItems() {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState();
    return (
      <>
        {dis.state.appointments.length === 0 ? (
          <p style={{ marginTop: '140px', textAlign: 'center' }}>
            No appointments yet.
          </p>
        ) : (
          dis.state.appointments.map(function (item, i) {
            return (
              // <div key={i} className={styles.mySrap}>
              <div key={i} className={styles.records_divWe}>
                <div
                  // to={{
                  //   pathname: '/patients/appointments_detail',
                  //   objectItem: item,
                  // }}
                  onClick={() => {
                    setModalData(item);
                    setShowModal(true);
                  }}
                  key={i}
                  style={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                  <div className={styles.secDiv}>
                    <div className={styles.secTextWrap}>
                      <p className={styles.divAppTitle}>{item.Nature}</p>
                      <p className={styles.divAppMini}>{''}</p>
                    </div>

                    <p className={styles.SecDate}>{item.ValueDate}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <AppointmentDetail
          modal={showModal}
          toggleFunc={setShowModal}
          data={modalData}
        />
      </>
    );
  }

  render() {
    return (
      <div style={{ marginTop: 100, marginBottom: 100 }}>
        <Layout pageTitle="Your Appointments">
          <div className={styles.containerWe}>
            <div className={styles.container_titleWe}>Your Appointments</div>

            <this.GetItems />
          </div>
        </Layout>

        {/* Begin Show Info Dialog */}
        <Overlay
          className={styles.modal}
          closeOnClick={true}
          open={this.state.infoDialog}
          onClose={() => {
            this.setState({
              infoDialog: false,
            });
          }}
        >
          <div className={styles.modal_paper}>
            <div className={styles.modalTop2}>
              <p className={styles.appTitle}>{this.state.title}</p>
            </div>
            <div className={styles.inputGpWrap}>
              {/* <p>{this.state.msg}</p> */}
            </div>
            <div
              onClick={() => {
                this.setState({
                  infoDialog: false,
                });
              }}
              className={styles.pCreate}
            >
              Dismiss
            </div>
          </div>
        </Overlay>
        {/* End Show Info Dialog */}

        {/* Begin Spinner Show */}
        <Overlay
          className={styles.modal}
          closeOnClick={true}
          open={this.state.loading}
          onClose={() => {
            this.setState({
              infoDialog: false,
            });
          }}
        >
          <ClipLoader
            css={override}
            size={150}
            color={'#123abc'}
            loading={true}
          />
        </Overlay>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  detailSubject: (arg) => dispatch(detailSubject(arg)),
});

export default connect(null, mapDispatchToProps)(AppointmentsPage);
