import React, { Component } from 'react';
import axios from 'axios'
import {depoApi, NidFingerVerification,getAppSetting } from '../../Url/ApiList';
import Loading from "../../Simplified/utils/CustomLoding/Loading";
import Finger from "../../Simplified/images/fingerprintEC.svg";
import FingerOk from "../../Simplified/images/successPrint.svg";
import { NotificationManager } from "react-notifications";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { showDate } from '../../../Utils/dateConversion';
import { largeTime } from '../../../Utils/notificationTime';
import {withRouter} from 'react-router-dom';

export class NidFingerPrint extends Component {

    state ={
        isDepo: true
    }

    async componentDidMount(){

        let config = {
            headers: {
              "x-auth-token": JSON.parse(sessionStorage.getItem('x-auth-token')),
            },
          };

          const obj ={
              key: "EKYC_DEPOSITORY_USE"
          }
          try{
              let depositoryUse = await axios.post(getAppSetting, obj, config);
            //   console.log(depositoryUse.data.data[0].value);
            if(depositoryUse.data.data[0].value === "YES"){
                this.setState({isDepo: true});
            }else{
                this.setState({isDepo: false});
            }
          }catch(error){
            if (error.response) {
                let message = error.response.data.message
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
          }
    }


    handleDepo = async() =>{
        const { nid, dob } = this.props.values;
        
        let config = {
            headers: {
              "x-auth-token": JSON.parse(sessionStorage.getItem('x-auth-token')),
            },
          };

         
          this.props.handleState('loading', true);

        let dob13 = showDate(dob).split("-")[0];

        let depObj = {
            nid: nid.length === 13 ? dob13 + nid : nid
        }

        try {
            let rpaDepo = await axios.post(depoApi, depObj, config);
                // console.log("repo", rpaDepo.data.data);
                 if(rpaDepo.data.data === null){
                    this.props.handleState('loading', false);
                     this.handleECFinger();
                 }else if (rpaDepo.data.data.image) {
                    let dataResp = rpaDepo.data.data;
                    this.props.handleState('applicantNameBangla', dataResp.name ? dataResp.name : "");
                    this.props.handleState('applicantName', dataResp.nameEn ? dataResp.nameEn : "");
                    this.props.handleState('applicantDob', dataResp.dateOfBirth ? dataResp.dateOfBirth : "");
                    //this.props.handleState('applicantNidNo', dataResp.nationalId ? dataResp.nationalId : "");
                    this.props.handleState('applicantNidNo', this.props.values.nid ? this.props.values.nid : "");
                    this.props.handleState('motherNameBangla', dataResp.mother ? dataResp.mother : "");
                    this.props.handleState('fatherNameBangla', dataResp.father ? dataResp.father : "");
                    // this.props.handleState('profession', dataResp.occupation ? dataResp.occupation : '');
                    this.props.handleState('spouseName', dataResp.spouse ? dataResp.spouse : "");
                    this.props.handleState('ecImage', dataResp.image ? dataResp.image : "");
                    

                    // Present Address
                    let preAddress = dataResp.presentAddress;
                    // console.log("present Address", preAddress)
                    this.props.handleState('preAdditionalMouzaOrMoholla', preAddress.additionalMouzaOrMoholla ? preAddress.additionalMouzaOrMoholla : '');
                    this.props.handleState('preAdditionalVillageOrRoad', preAddress.additionalVillageOrRoad ? preAddress.additionalVillageOrRoad : '');
                    this.props.handleState('preCityCorporationOrMunicipality', preAddress.cityCorporationOrMunicipality ? preAddress.cityCorporationOrMunicipality : '');
                    this.props.handleState('preDistrict', preAddress.district ? preAddress.district : '');
                    this.props.handleState('preDivision', preAddress.division ? preAddress.division : '');
                    this.props.handleState('preHomeOrHoldingNo', preAddress.homeOrHoldingNo ? preAddress.homeOrHoldingNo : '');
                    this.props.handleState('prePostOffice', preAddress.postOffice ? preAddress.postOffice : '');
                    this.props.handleState('prePostalCode', preAddress.postalCode ? preAddress.postalCode : '');
                    this.props.handleState('preRegion', preAddress.region ? preAddress.region : '');
                    this.props.handleState('preRmo', preAddress.rmo ? preAddress.rmo : '');
                    this.props.handleState('preUnionOrWard', preAddress.unionOrWard ? preAddress.unionOrWard : '');
                    this.props.handleState('preUpozila', preAddress.upozila ? preAddress.upozila : '');
                    this.props.handleState('preWardForUnionPorishod', preAddress.wardForUnionPorishod ? preAddress.wardForUnionPorishod : '');

                    // Permanent Address
                    let perAddress = dataResp.permanentAddress;
                    //console.log("permanent Address", perAddress.additionalVillageOrRoad)
                    this.props.handleState('perAdditionalMouzaOrMoholla', perAddress.additionalMouzaOrMoholla ? perAddress.additionalMouzaOrMoholla : '');
                    this.props.handleState('perAdditionalVillageOrRoad', perAddress.additionalVillageOrRoad ? perAddress.additionalVillageOrRoad : '');
                    this.props.handleState('perCityCorporationOrMunicipality', perAddress.cityCorporationOrMunicipality ? perAddress.cityCorporationOrMunicipality : "");
                    this.props.handleState('perDistrict', perAddress.district ? perAddress.district : '');
                    this.props.handleState('perDivision', perAddress.division ? perAddress.division : '');
                    this.props.handleState('perHomeOrHoldingNo', perAddress.homeOrHoldingNo ? perAddress.homeOrHoldingNo : '');
                    this.props.handleState('perPostOffice', perAddress.postOffice ? perAddress.postOffice : '');
                    this.props.handleState('perPostalCode', perAddress.postalCode ? perAddress.postalCode : '');
                    this.props.handleState('perRegion', perAddress.region ? perAddress.region : '');
                    this.props.handleState('perRmo', perAddress.rmo ? perAddress.rmo : '');
                    this.props.handleState('perUnionOrWard', perAddress.unionOrWard ? perAddress.unionOrWard : '');
                    this.props.handleState('perUpozila', perAddress.upozila ? perAddress.upozila : '');
                    this.props.handleState('perWardForUnionPorishod', perAddress.wardForUnionPorishod ? perAddress.wardForUnionPorishod : '');

                  
                    this.props.handleState('loading', false);

                    this.props.nextStep();


                } else {
                    this.props.handleState('loading', false);
                    //NotificationManager.error("Please Check Your Nid No and Date Of Birth", "Click to Remove", largeTime);
                   this.handleECFinger();
                }
                
            } catch (error) {
                this.props.handleState('loading', false);

                if (error.response) {
                    let message = error.response.data.message
                    NotificationManager.error(message, "Click to Remove", largeTime);
                   
                } else if (error.request) {
                    // console.log("Error Connecting...", error.request)
                    NotificationManager.error("Error Connecting...", "Click to Remove", largeTime);
                   
                } else if (error) {
                    NotificationManager.error(error.toString(), "Click to Remove", largeTime);
                    
                }
            }
          
    }


    handleECFinger = async() =>{
        const { nid, dob, rThumb, rIndex, lThumb, lIndex } = this.props.values;

        const config = {
            headers: {
              "x-auth-token": JSON.parse(sessionStorage.getItem("x-auth-token"))
            }
          };
      
          let obj = {
            nid,
            dob: showDate(dob),
            rIndex,
            rThumb,
            lIndex,
            lThumb,
          };
      
      
        //   console.log("FingerPrintpage", obj);
      
          try {
      
      
            //console.log("Token",obj)
            
            this.props.handleState('loadingSpin',true);
      
      
            let fingerRes = await axios.post(NidFingerVerification, obj, config)
            // console.log("fingerRes.data.data.verificationToken", fingerRes.data.data.fingerVerificationResult.status)
            // console.log("fingerRes", fingerRes.data)
            
      
      
      
      
            if (fingerRes.data.data.fingerVerificationResult.details.statusCode === 404) {
                this.props.handleState("loadingSpin", false);
              // let message = fingerRes.data.data.fingerVerificationResult.details.message;
                NotificationManager.error("Could not connect to Election Commission Server", "ClickToRemove", largeTime);
                return;
            }
      
            if (fingerRes.data.data.fingerVerificationResult.status === false) {
                this.props.handleState("loadingSpin", false);
                let message = "Finger Print not Matched";
                NotificationManager.error(message, "ClickToRemove", largeTime);
                return;
            }
      
      
            // Setting Data to State === start
      
            if (fingerRes.data.data.fingerVerificationResult.details.details) {
              let dataResp = fingerRes.data.data.fingerVerificationResult.details.details;
      
              // For VPN Only
      
              this.props.handleState('applicantNameBangla', dataResp.name ? dataResp.name : "");
              this.props.handleState('applicantName', dataResp.nameEn ? dataResp.nameEn : "");
              this.props.handleState('applicantDob', dataResp.dateOfBirth ? dataResp.dateOfBirth : "");
              //this.props.handleState('applicantNidNo', dataResp.nationalId ? dataResp.nationalId : "");
              this.props.handleState('applicantNidNo', this.props.values.nid ? this.props.values.nid : "");
              this.props.handleState('motherNameBangla', dataResp.mother ? dataResp.mother : "");
              this.props.handleState('fatherNameBangla', dataResp.father ? dataResp.father : "");
              // this.props.handleState('profession', dataResp.occupation ? dataResp.occupation : '');
              this.props.handleState('spouseName', dataResp.spouse ? dataResp.spouse : "");
              this.props.handleState('ecImage', dataResp.photo ? dataResp.photo : "");
              // Present Address
              let preAddress = dataResp.presentAddress;
              // console.log("present Address", preAddress)
              this.props.handleState('preAdditionalMouzaOrMoholla', preAddress.additionalMouzaOrMoholla ? preAddress.additionalMouzaOrMoholla : '');
              this.props.handleState('preAdditionalVillageOrRoad', preAddress.additionalVillageOrRoad ? preAddress.additionalVillageOrRoad : '');
              this.props.handleState('preCityCorporationOrMunicipality', preAddress.cityCorporationOrMunicipality ? preAddress.cityCorporationOrMunicipality : '');
              this.props.handleState('preDistrict', preAddress.district ? preAddress.district : '');
              this.props.handleState('preDivision', preAddress.division ? preAddress.division : '');
              this.props.handleState('preHomeOrHoldingNo', preAddress.homeOrHoldingNo ? preAddress.homeOrHoldingNo : '');
              this.props.handleState('prePostOffice', preAddress.postOffice ? preAddress.postOffice : '');
              this.props.handleState('prePostalCode', preAddress.postalCode ? preAddress.postalCode : '');
              this.props.handleState('preRegion', preAddress.region ? preAddress.region : '');
              this.props.handleState('preRmo', preAddress.rmo ? preAddress.rmo : '');
              this.props.handleState('preUnionOrWard', preAddress.unionOrWard ? preAddress.unionOrWard : '');
              this.props.handleState('preUpozila', preAddress.upozila ? preAddress.upozila : '');
              this.props.handleState('preWardForUnionPorishod', preAddress.wardForUnionPorishod ? preAddress.wardForUnionPorishod : '');
      
              // Permanent Address
              let perAddress = dataResp.permanentAddress;
              //console.log("permanent Address", perAddress.additionalVillageOrRoad)
              this.props.handleState('perAdditionalMouzaOrMoholla', perAddress.additionalMouzaOrMoholla ? perAddress.additionalMouzaOrMoholla : '');
              this.props.handleState('perAdditionalVillageOrRoad', perAddress.additionalVillageOrRoad ? perAddress.additionalVillageOrRoad : '');
              this.props.handleState('perCityCorporationOrMunicipality', perAddress.cityCorporationOrMunicipality ? perAddress.cityCorporationOrMunicipality : "");
              this.props.handleState('perDistrict', perAddress.district ? perAddress.district : '');
              this.props.handleState('perDivision', perAddress.division ? perAddress.division : '');
              this.props.handleState('perHomeOrHoldingNo', perAddress.homeOrHoldingNo ? perAddress.homeOrHoldingNo : '');
              this.props.handleState('perPostOffice', perAddress.postOffice ? perAddress.postOffice : '');
              this.props.handleState('perPostalCode', perAddress.postalCode ? perAddress.postalCode : '');
              this.props.handleState('perRegion', perAddress.region ? perAddress.region : '');
              this.props.handleState('perRmo', perAddress.rmo ? perAddress.rmo : '');
              this.props.handleState('perUnionOrWard', perAddress.unionOrWard ? perAddress.unionOrWard : '');
              this.props.handleState('perUpozila', perAddress.upozila ? perAddress.upozila : '');
              this.props.handleState('perWardForUnionPorishod', perAddress.wardForUnionPorishod ? perAddress.wardForUnionPorishod : '');
      
              this.props.handleState("loadingSpin", false);
              // // Setting Data to State === end
      
            }
      
            // // Verification Token
            //console.log("verifyToken",this.props.values.verifyToken)
            
            let goNext = fingerRes.data.data.fingerVerificationResult.status
            if (goNext === true) {
              this.props.nextStep();
            }
      
      
          } catch (error) {
            console.log("In the error", error)
            this.props.handleState("loadingSpin", false);
            if (error.response) {
              let message = error.response.data.message
              //console.log("Error",error.response)
              NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
              //console.log("Error Connecting...", error.request)
              NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
              NotificationManager.error(error.toString(), "Error", 5000);
            }
          }
      
    }

    handleClick = async(e) =>{
        let { nid, dob} = this.props.values;
        e.preventDefault();

        if (nid === "") {
            NotificationManager.warning("Please Provide NID Number", "Click to Remove", largeTime);
            return;
          }
      
          if (nid.length < 10) {
            NotificationManager.warning("NID Number is less than 10 digits", "Click to Remove", largeTime);
            return;
          } else if (nid.length > 10 && nid.length < 13) {
            NotificationManager.warning("NID Number is greater than 10 and less than 13 digits", "Click to Remove", largeTime);
            return;
          } else if (nid.length > 13 && nid.length < 17) {
            NotificationManager.warning("NID Number is greater than 13 and less than 17 digits", "Click to Remove", largeTime);
            return;
          } else if (nid.length > 17) {
            NotificationManager.warning("NID Number is greater than 17 digits", "Click to Remove", largeTime);
            return;
          }
      
          if (dob === '') {
            NotificationManager.warning("Please Provide Date Of Birth", "Click to Remove", largeTime);
            return;
          }
          // Field Validation End ========================================///////
      
          let config = {
            headers: {
              "x-auth-token": JSON.parse(sessionStorage.getItem('x-auth-token')),
            },
          };

          this.props.handleState("isEnable", true);
          this.props.handleState("loading", true);

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
                //alert("data not found!!");
                NotificationManager.error("data not found!!", "Error", 5000);
              }
              if (data[1].fingerId === 2) {
                this.props.handleState('rIndex', rightIndex);
              } else {
                //alert("data not found!!");
                NotificationManager.error("data not found!!", "Error", 5000);
              }
              if (data[2].fingerId === 6) {
    
                this.props.handleState('lThumb', leftThumb);
              } else {
                //alert("data not found!!");
                NotificationManager.error("data not found!!", "Error", 5000);
              }
              if (data[3].fingerId === 7) {
    
                this.props.handleState('lIndex', leftIndex);
              } else {
                //alert("data not found!!");
                NotificationManager.error("data not found!!", "Error", 5000);
              }
    
              
                this.props.handleState("isEnable", false);
                this.props.handleState("loading", false);
            })
            .catch((err) => {
                this.props.handleState("isEnable", false);
                this.props.handleState("loading", false);
              if (err.response) {
                if (err.response.status === 400 || err.response.status === 401) {
                  // console.log(err.response.data);
                  //alert(err.response.data.message);
                  NotificationManager.error(err.response.data.message, "Error", 5000);
                } else if (err.response.status === 404) {
                  //alert("Not Found");
                  NotificationManager.error("Not Fount", "Error", 5000);
                } else if (err.response.status === 500) {
                  //alert(err.response.data.message);
                  NotificationManager.error(err.response.data.message, "Error", 5000);
                }
              } else if (err.request) {
                //console.log(err.request);
                //alert("Error Connectiong");
                NotificationManager.error("Error Connecting", "Error", 5000);
              } else {
                console.log("Error", err.message);
                //alert(err.message);
                NotificationManager.error(err.message, "Error", 5000);
              }
            });
        
    }


    continue = async (e) => {
        e.preventDefault();
        const { nid, dob, rThumb, rIndex, lThumb, lIndex } = this.props.values;
    
        if (nid === "") {
          NotificationManager.warning("Please Provide NID Number", "Click to Remove", largeTime);
          return;
        }
    
        if (nid.length < 10) {
          NotificationManager.warning("NID Number is less than 10 digits", "Click to Remove", largeTime);
          return;
        } else if (nid.length > 10 && nid.length < 13) {
          NotificationManager.warning("NID Number is greater than 10 and less than 13 digits", "Click to Remove", largeTime);
          return;
        } else if (nid.length > 13 && nid.length < 17) {
          NotificationManager.warning("NID Number is greater than 13 and less than 17 digits", "Click to Remove", largeTime);
          return;
        } else if (nid.length > 17) {
          NotificationManager.warning("NID Number is greater than 17 digits", "Click to Remove", largeTime);
          return;
        }
    
        if (dob === '') {
          NotificationManager.warning("Please Provide Date Of Birth", "Click to Remove", largeTime);
          return;
        }
    
        if (rThumb === "" && rIndex === '' && lThumb === "" && lIndex === "") {
          NotificationManager.warning("Please Provide Finger Print", "Click to Remove", largeTime);
          return;
        }


       if(this.state.isDepo === true){ 
           this.handleDepo();
       }else{
           this.handleECFinger();
       }

    }


    render() {
        let { values, handleChange } = this.props;
        return (
            <div className="container">

            {/* 
            <div className="im col-sm-2" onClick={this.Escape}>
              Escape
                  </div>
            */}
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
    
                  <div className='form-group d-flex justify-content-between'>
                    <div className=''>
                      <label htmlFor='dob'>Date of Birth (dd/mm/YYYY) : </label>
                    </div>
                    <div className=''>
    
                      <DatePicker
                        placeholderText='DD/MM/YYYY'
                        selected={values.dob}
                        dateFormat='dd/MM/yyyy'
                        onChange={d => {
                          this.props.handleState("dob", d);
                        }}
                        isClearable
                        showYearDropdown
                        showMonthDropdown
                        scrollableMonthYearDropdown
    
                      />
                    </div>
                  </div>
    
                  {/* <label htmlFor="dob">Date of Birth:</label><br />
              <input type="date" id="dob" name="dob" onChange={this.onChange} value={this.state.dob} /><br /><br /> */}
    
                  <div className="row d-flex justify-content-center">
                    <div className="col animated zoomIn mt-2">
                      {values.loading ? (
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
    
                  {
                    values.loadingSpin ? (
                      <div className="row d-flex justify-content-center align-items-center mt-3">
                        <Loading />
                      </div>
                    ) : ''
                  }
    
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

export default withRouter(NidFingerPrint);
