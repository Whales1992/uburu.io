import React, { Component } from 'react';
import localForage from 'localforage';
import Layout from '../../UI/JS/layout';
import BlackBackdrop from '../../../components/Home/JS/black_backdrop';
import QuickActions from '../../../components/Home/JS/quick_actions';
import RecentRecords from '../../../components/Home/JS/recent-records';
import InstitutionBanner from '../../../components/UI/JS/institution_banner';

const url = process.env.REACT_APP_BASE_URL;

let dis;

global.reFresh=()=>{
  dis.setState({});
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      recentRecords: null,
      error: {
        error: false,
        message: '',
      },
    };
  }

  async componentDidMount() {
    // console.log("Bearer ", localStorage.getItem('token'));
    try {
      dis = this;
      this.setState({ loading: true });
      if (window.navigator.onLine) {
        const request = await fetch(`${url}/GetRecentPatient`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        if (!request.ok) {
          this.setState({ loading: false });
          const error = await request.json();
          throw Error(error.error);
        }

        const data = await request.json();
        localForage.setItem("patients", data.Patients).then((res) => {
          this.setState({ recentRecords: res });
        });
      } else {
        localForage.getItem("patients").then((res) => {
          this.setState({ recentRecords: res });
        }).catch((ex)=>{
          this.setState({
            error: {
              error: true,
              message: ex,
            },
          });
        });
      }
    } catch (error) {
      this.setState({
        error: {
          error: true,
          message: error.message,
        },
      });
    }
  }

  render() {
    const { recentRecords, error } = this.state;
    return (
      <div
        onClick={() => {
          try{
            global.dismissMoreMenu();
          }catch(ex){
            console.log("", ex);
          }
        }}
      >
        <Layout
          pageTitle={`Welcome, Dr. ${
            JSON.parse(localStorage.account).LastName
          }`}
        >
          <InstitutionBanner />
          <BlackBackdrop />
          <QuickActions />
          <RecentRecords recents={recentRecords} error={error} />
        </Layout>
      </div>
    );
  }
}

export default Home;
