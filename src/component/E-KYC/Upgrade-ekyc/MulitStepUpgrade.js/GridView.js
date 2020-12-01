import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import Loading from '../../Simplified/utils/CustomLoding/Loading';
//import passImage from '../../Simplified/images/passport.svg';
//import tinImage from '../../Simplified/images/diploma.svg';
//import birthImage from '../../Simplified/images/tin.svg';
import ok from '../../Simplified/images/ok.svg';
import ok1 from '../../Simplified/images/ok1.svg';
import ok2 from '../../Simplified/images/ok2.svg';
import cross from '../../Simplified/images/cross.svg';
import { simRegApi } from '../../Url/ApiList';
import getJsonObjectToArray from '../../Simplified/utils/jsonObjToArray';
import axios from 'axios';

export class GridView extends Component {

  continue = async (e) => {

    let { values } = this.props;

    let tinInfo = {
      fileName: values.tinCertificateFileName,
      fileType: values.tinFileType,
      data: values.tinCertificate
    }

    let passportInfo = {
      fileName: values.passportFileName,
      fileType: values.passFileType,
      data: values.passport
    }

    let birthCertificateInfo = {
      fileName: values.birthCertificateFileName,
      fileType: values.birthCerFileType,
      data: values.birthCertificate
    }

    let regularInfo = {
      monthlyIncome: parseInt(values.monthlyIncome),
      sourceOfFund: values.sourceOfFund,
      nationality: values.nationality,
      riskInfo: values.riskGradingArray
    }

    if (Object.values(tinInfo)[0] !== '' || Object.values(tinInfo)[1] !== "" || Object.values(tinInfo)[2] !== '') regularInfo.tin = tinInfo;
    if (Object.values(passportInfo)[0] !== '' || Object.values(passportInfo)[1] !== "" || Object.values(passportInfo)[2] !== '') regularInfo.passport = passportInfo;
    if (Object.values(birthCertificateInfo)[0] !== '' || Object.values(birthCertificateInfo)[1] !== "" || Object.values(birthCertificateInfo)[2] !== '') regularInfo.birthCertificate = birthCertificateInfo;

    let confirmObj = {
      applicantId: values.applicantId,
      regularAdditionalData: regularInfo
    }

    console.log("confirmobj", confirmObj);

    const config = {
      headers: {
        'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

      }
    };

    try {
      this.props.handleState('confirmFlag', true);
      let res = await axios.post(simRegApi, confirmObj, config);
      this.props.handleState('confirmFlag', false);
      console.log(res.data);
      let resData = res.data.data;
      let resToArr = getJsonObjectToArray(resData)
      //console.log("Result Array",resToArr)
      this.props.handleState('channelAccStatus', resToArr);

      this.props.nextStep();

    } catch (error) {
      console.log("Error", error.response)
      this.props.handleState('confirmFlag', false);
      if (error.response) {
        let message = error.response.data.message
        console.log("Error", error.response)
        NotificationManager.error(message, "Error", 5000);
      } else if (error.request) {
        console.log("Error Connecting...", error.request)
        NotificationManager.error("Error Connecting...", "Error", 5000);
      } else if (error) {
        NotificationManager.error(error.toString(), "Error", 5000);
      }
      // this.props.handleState('confirmFlag', false);
      // console.log(error);
    }



  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }




  render() {
    const { values } = this.props;
    console.log("allvalues", values);
    return (
      <div className="container">
        <div className="card col-sm-12" style={{ paddingTop: "25px" }}>
          <div className="card-header up">
            <h3>All Information</h3>
          </div>


          <div className="row d-flex justify-content-center">


            <div className="col-sm-6 " style={{ margin: "20px 0px" }}>
              <div className="im">
                <p style={{ color: "green" }}>Personal Information</p>
              </div>
              <hr />
              <div className="">

                <small className="" style={{ fontSize: "14px" }}>

                  <span style={{ color: "green", fontSize: "14px" }}>Monthly Income :</span> {values.monthlyIncome}<br />
                  <span style={{ color: "green", fontSize: "14px" }}>Source of Fund :</span> {values.sourceOfFund}<br />
                  <span style={{ color: "green", fontSize: "14px" }}>Nationality :</span> {values.nationality}<br />

                </small>


              </div>
            </div>



          </div>


          <hr />

          <div className="im">
          <p style={{ color: "green" }}>Optional File Upload</p>
        </div>
        
          <hr />



          <div className="row d-flex justify-content-center">
            <div className="imTwo text-center col-sm-3">
              <div className="im">
                <small>Passport</small>
              </div>

              <img src={values.passport ? ok2 : cross}
                alt=""
                style={{
                  margin: "0 auto",
                  width: "250px",
                  height: "150px",
                  border: "none",
                }}
                className="img-fluid img-thumbnail"
              />
              <hr />



            </div>
            <div className="imTwo text-center col-sm-3" >
              <div className="im">
                <small>Tin Certificate</small>
              </div>

              <img src={values.tinCertificate ? ok :cross}
                alt=""
                style={{
                  margin: "0 auto",
                  width: "250px",
                  height: "150px",
                  border: "none",
                }}
                className="img-fluid img-thumbnail"
              />
              <hr />



            </div>

            <div className="imTwo text-center col-sm-3">
              <div className="im">
                <small>Birth Certificate</small>
              </div>

              <img src={values.birthCertificate ? ok1 : cross}
                alt=""
                style={{
                  margin: "0 auto",
                  width: "250px",
                  height: "150px",
                  border: "none"

                }}
                className="img-fluid img-thumbnail"
              />
              <hr />


            </div>



            <hr />



            

          </div>
          
          {
            values.confirmFlag ? (
              <div className="row d-flex justify-content-center align-items-center mt-3">
                <Loading />
              </div>
            ) : ''
          }
          <br />

          
          <hr />


          <div className="d-flex justify-content-center"
            style={{ marginBottom: "20px" }}
          >

            <span className="b mr-5" onClick={this.back}>Back</span>
            <span className="b" disabled={values.confirmFlag} onClick={this.continue}>Confirm</span>
          </div>
        </div>
      </div>
    )
  }
}

export default GridView;
