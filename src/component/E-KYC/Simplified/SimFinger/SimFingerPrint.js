import React, { Component } from 'react';
import axios from 'axios'
import { fingerValidate } from '../../Url/ApiList';
import Loading from "../utils/CustomLoding/Loading.js";
import Finger from "../images/tap.svg";
import FingerOk from ".././images/fingerprintOk.svg";
import { NotificationManager } from "react-notifications";

export class SimFingerPrint extends Component {
  handleClick = (e) => {
    e.preventDefault();

    // this.setState({ isEnable: true, loading: !this.state.loading });
    this.props.handleState('isEnableFinger', true);
    this.props.handleState('loadingPrint', true);
    const config = {
      headers: {
        "x-auth-token": sessionStorage.getItem("x-auth-token"),
      },
    };

    const fingerobj = {
      MinQ: 30,
      Retry: 3,
      TokenId: "g86v5s4g5se84g5sfd4g5werx25sdf4f",
    };

    axios
      .post(`http://localhost:20000/api/info/fingerdata`, fingerobj, config)
      .then((res) => {
        //  console.log(res);
        const data = res.data;
        let rightThumb = data[0].fingerData;
        let rightIndex = data[1].fingerData;
        let leftThumb = data[2].fingerData;
        let leftIndex = data[3].fingerData;

        if (data[0].fingerId === 1) {
          this.props.handleState('rThumb', rightThumb);
        } else {
          alert("data not found!!");
        }
        if (data[1].fingerId === 2) {
          this.props.handleState('rIndex', rightIndex);
        } else {
          alert("data not found!!");
        }
        if (data[2].fingerId === 6) {

          this.props.handleState('lThumb', leftThumb);
        } else {
          alert("data not found!!");
        }
        if (data[3].fingerId === 7) {

          this.props.handleState('lIndex', leftIndex);
        } else {
          alert("data not found!!");
        }

        // this.setState({
        //   isEnable: false,
        //   loading: !this.state.loading,
        // });
        this.props.handleState('isEnableFinger', false);
        this.props.handleState('loadingPrint', false);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400 || err.response.status === 401) {
            console.log(err.response.data);
            alert(err.response.data.message);
            this.props.handleState('isEnableFinger', false);
          } else if (err.response.status === 404) {
            alert("Not Found");
            this.props.handleState('isEnableFinger', false);
          } else if (err.response.status === 500) {
            alert(err.response.data.message);
            this.props.handleState('isEnableFinger', false);
          }
        } else if (err.request) {
          console.log(err.request);
          alert("Error Connectiong");
          this.props.handleState('isEnableFinger', false);
        } else {
          console.log("Error", err.message);
          alert(err.message);
          this.props.handleState('isEnableFinger', false);
        }
      });
  };

  continue = async (e) => {
    e.preventDefault();
    const { nid, dob, rThumb, rIndex, lThumb, lIndex } = this.props.values;


    const config = {
      headers: {
        "x-auth-token": JSON.parse(sessionStorage.getItem("x-auth-token"))
      }
    };

    let obj = {
      nid,
      dob,
      rIndex,
      rThumb,
      lIndex,
      lThumb,
    };
    

    try {


      //console.log("Token",obj)

      let fingerRes = await axios.post(fingerValidate, obj, config)
      //console.log("fingerRes.data.data.verificationToken", fingerRes.data.data.verificationToken)
      // console.log("fingerRes", fingerRes.data)
      let dataResp = fingerRes.data.data.fingerVerificationResult.details.details;
      
      // Setting Data to State === start
      this.props.handleState('applicantNameBangla', dataResp.name);
      this.props.handleState('applicantName', dataResp.nameEn);
      this.props.handleState('applicantDob',dataResp.dateOfBirth );
      this.props.handleState('applicantNidNo', dataResp.nationalId);
      this.props.handleState('motherNameBangla', dataResp.mother);
      this.props.handleState('fatherNameBangla',dataResp.father );
      this.props.handleState('profession',dataResp.occupation );
      this.props.handleState('spouseName',dataResp.spouse);

       // Present Address
       let preAddress = dataResp.presentAddress;
      this.props.handleState('preAdditionalMouzaOrMoholla',preAddress.additionalMouzaOrMoholla ? preAddress.additionalMouzaOrMoholla : '');
      this.props.handleState('preAdditionalVillageOrRoad',preAddress.additionalVillageOrRoad ? preAddress.additionalVillageOrRoad : '');
      this.props.handleState('preCityCorporationOrMunicipality',preAddress.cityCorporationOrMunicipality ? preAddress.cityCorporationOrMunicipality : '');
      this.props.handleState('preDistrict',preAddress.district ? preAddress.district : '');
      this.props.handleState('preDivision',preAddress.division ? preAddress.division : '');
      this.props.handleState('preHomeOrHoldingNo',preAddress.homeOrHoldingNo ? preAddress.homeOrHoldingNo :'');
      this.props.handleState('prePostOffice',preAddress.postOffice ? preAddress.postOffice : '');
      this.props.handleState('prePostalCode',preAddress.postalCode ? preAddress.postalCode : '');
      this.props.handleState('preRegion',preAddress.region ? preAddress.region :'');
      this.props.handleState('preRmo',preAddress.rmo ? preAddress.rmo :'');
      this.props.handleState('preUnionOrWard',preAddress.unionOrWard ? preAddress.unionOrWard : '');
      this.props.handleState('preUpozila',preAddress.upozila ? preAddress.upozila : '');
      this.props.handleState('preWardForUnionPorishod',preAddress.wardForUnionPorishod ? preAddress.wardForUnionPorishod : '');

      // Permanent Address
      let perAddress = dataResp.permanentAddress;
      this.props.handleState('perAdditionalMouzaOrMoholla',perAddress.additionalMouzaOrMoholla ? perAddress.additionalMouzaOrMoholla : '');
      this.props.handleState('perAdditionalVillageOrRoad',perAddress.additionalVillageOrRoad ? perAddress.additionalVillageOrRoad : '');
      this.props.handleState('perCityCorporationOrMunicipality', perAddress.cityCorporationOrMunicipality ? perAddress.cityCorporationOrMunicipality : "" );
      this.props.handleState('perDistrict',perAddress.district ? perAddress.district : '');
      this.props.handleState('perDivision',perAddress.division ? perAddress.division : '');
      this.props.handleState('perHomeOrHoldingNo',perAddress.homeOrHoldingNo ? perAddress.homeOrHoldingNo : '');
      this.props.handleState('perPostOffice',perAddress.postOffice ? perAddress.postOffice : '');
      this.props.handleState('perPostalCode',perAddress.postalCode ? perAddress.postalCode : '');
      this.props.handleState('perRegion',perAddress.region ? perAddress.region : '');
      this.props.handleState('perRmo',perAddress.rmo ? perAddress.rmo : '');
      this.props.handleState('perUnionOrWard',perAddress.unionOrWard ? perAddress.unionOrWard : '');
      this.props.handleState('perUpozila',perAddress.upozila ? perAddress.upozila : '');
      this.props.handleState('perWardForUnionPorishod',perAddress.wardForUnionPorishod ? perAddress.wardForUnionPorishod : '');
     
     
      // Verification Token
      this.props.handleState('verifyToken', fingerRes.data.data.verificationToken);
      console.log("verifyToken",this.props.values.verifyToken)
      // Setting Data to State === end

      

      this.props.nextStep();




      // if(verifyToken){


      // }else{
      //   NotificationManager.error("Please Provide Finger","Error",5000)
      // }

    } catch (error) {
      if (error.response) {
        let message = error.response.data.message
        //console.log("Error",error.response)
        NotificationManager.error(message, "Error", 5000);
      } else if (error.request) {
        console.log("Error Connecting...", error.request)
        NotificationManager.error("Error Connecting...", "Error", 5000);
      } else if (error) {
        NotificationManager.error(error.toString(), "Error", 5000);
      }
    }

  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };


  render() {
    let { values, handleChange } = this.props;
    console.log("Date of birth", values.dob)
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-6 imTwoWhite p-5">
            <div className="divBg pt-3">
              <h4>FingerPrint Verification</h4>
            </div>

            <form onSubmit={this.continue}>
              {/* <label htmlFor="nidNo">Nid No:</label><br />
          <input type="text" id="nidNo" name="nidNo" value={this.state.nidNo} /><br /> */}
              <div className="form-group">
                <label htmlFor="">Nid No:</label>
                <input
                  style={{ borderRadius: "50px" }}
                  type="text"
                  value={values.nid}
                  name="nid"
                  onChange={handleChange('nid')}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter NID NO"
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Date of Birth:</label>
                <input
                  style={{ borderRadius: "50px" }}
                  type="date"
                  value={values.dob}
                  name="dob"
                  onChange={handleChange('dob')}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Applicant's Name"
                />
              </div>
              {/* <label htmlFor="dob">Date of Birth:</label><br />
          <input type="date" id="dob" name="dob" onChange={this.onChange} value={this.state.dob} /><br /><br /> */}

              <div className="row d-flex justify-content-center">
                <div className="col animated zoomIn mt-2">
                  {values.loadingPrint ? (
                    <div className="text-center">
                      <Loading />
                      <small className="text-muted">
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                            </span>
                            Notice Taskbar For Fingerprint Application Icon
                          </small>
                    </div>
                  ) : (
                      <div className="imTwoWhite text-center">
                        <img
                          src={values.rThumb ? FingerOk : Finger}
                          style={{
                            margin: "0 auto",
                            width: "300px",
                            height: "200px",
                            border: "none",
                          }}
                          className="img-fluid img-thumbnail"
                          id="FrontNidPic"
                          alt=""
                        />
                      </div>
                    )}
                </div>
              </div>

              <div
                // disabled={this.state.isEnable}
                className="imTwoWhite text-center mt-2"
                style={{ color: "green", cursor: "pointer", fontSize: "17px" }}
                onClick={this.handleClick}
              >
                <i className="fas fa-fingerprint" /> Provide Finger Print
                  </div>

              <div className="row d-flex justify-content-center mt-3">
                <span className="b mr-5" onClick={this.back}>
                  Back
                    </span>
                <span className="b" onClick={this.continue}>
                  Next
                    </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SimFingerPrint;
