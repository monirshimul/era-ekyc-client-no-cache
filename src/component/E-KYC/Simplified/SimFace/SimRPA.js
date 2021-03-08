import React, { Component } from 'react';
//import { getAge } from '../../../Utils/ageCheck';
import Loading from "../utils/CustomLoding/Loading.js";
import { absAccountCheck, nidValidationRPA } from '../../Url/ApiList';
//import Finger from "../images/fingerprintEC.svg";
//import FingerOk from ".././images/successPrint.svg";
import Sign from '../images/man.svg';
import { NotificationManager } from "react-notifications";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { showDate } from '../../../Utils/dateConversion';
import { largeTime } from '../../../Utils/notificationTime';

export class SimRPA extends Component {

    //Escape  = () => {
    //     this.props.nextStep();
    // }


    // handleClick = async (e) => {
    //     let { nid, dob } = this.props.values;
    //     e.preventDefault();



    //     this.props.handleState('loading', true);

    //     const config = {
    //         headers: {
    //             "x-auth-token": JSON.parse(sessionStorage.getItem('x-auth-token'))
    //         }
    //     };

    //     let dob13 = showDate(dob).split("-")[0];

    //     const obj = {
    //         nid: nid.length === 13 ? dob13 + nid : nid,
    //         dob: showDate(dob)
    //     }

    //     console.log("obj", obj);

    //     try {
    //         let rpaData = await axios.post(nidValidationRPA, obj, config);
    //         console.log(rpaData.data);
    //         //let responseData = rpaData.data.data;
    //         if (rpaData.data.data) {
    //             let dataResp = rpaData.data.data;
    //             this.props.handleState('applicantNameBangla', dataResp.nameBan ? dataResp.nameBan : "");
    //             this.props.handleState('applicantName', dataResp.nameEng ? dataResp.nameEng : "");
    //             this.props.handleState('applicantDob', dataResp.dob ? dataResp.dob : "");
    //             this.props.handleState('applicantNidNo', this.props.values.nid ? this.props.values.nid : "");
    //             this.props.handleState('motherNameBangla', dataResp.motherName ? dataResp.motherName : "");
    //             this.props.handleState('fatherNameBangla', dataResp.fatherName ? dataResp.fatherName : "");
    //            // this.props.handleState('profession', dataResp.occupation ? dataResp.occupation : '');
    //             this.props.handleState('spouseName', dataResp.spouse ? dataResp.spouse : "");
    //             this.props.handleState('ecImage', dataResp.image ? dataResp.image : "");
    //             // Global EC Text start
    //             this.props.handleState('ecApplicantNameBangla', dataResp.nameBan ? dataResp.nameBan : "");
    //             this.props.handleState('ecApplicantName', dataResp.nameEng ? dataResp.nameEng : "");
    //             this.props.handleState('ecMotherNameBangla', dataResp.motherName ? dataResp.motherName : "");
    //             this.props.handleState('ecFatherNameBangla', dataResp.fatherName ? dataResp.fatherName : "");
    //             // Global EC Text end

    //             // Present Address
    //             let preAddress = dataResp.presentAddress;
    //             //console.log("present Address", preAddress)
    //             this.props.handleState('preAdditionalMouzaOrMoholla', preAddress.additionalMouzaOrMoholla ? preAddress.additionalMouzaOrMoholla : '');
    //             this.props.handleState('preAdditionalVillageOrRoad', preAddress.additionalVillageOrRoad ? preAddress.additionalVillageOrRoad : '');
    //             this.props.handleState('preCityCorporationOrMunicipality', preAddress.cityCorporationOrMunicipality ? preAddress.cityCorporationOrMunicipality : '');
    //             this.props.handleState('preDistrict', preAddress.district ? preAddress.district : '');
    //             this.props.handleState('preDivision', preAddress.division ? preAddress.division : '');
    //             this.props.handleState('preHomeOrHoldingNo', preAddress.homeOrHoldingNo ? preAddress.homeOrHoldingNo : '');
    //             this.props.handleState('prePostOffice', preAddress.postOffice ? preAddress.postOffice : '');
    //             this.props.handleState('prePostalCode', preAddress.postalCode ? preAddress.postalCode : '');
    //             this.props.handleState('preRegion', preAddress.region ? preAddress.region : '');
    //             this.props.handleState('preRmo', preAddress.rmo ? preAddress.rmo : '');
    //             this.props.handleState('preUnionOrWard', preAddress.unionOrWard ? preAddress.unionOrWard : '');
    //             this.props.handleState('preUpozila', preAddress.upozila ? preAddress.upozila : '');
    //             this.props.handleState('preWardForUnionPorishod', preAddress.wardForUnionPorishod ? preAddress.wardForUnionPorishod : '');

    //             // Permanent Address
    //             let perAddress = dataResp.permanentAddress;
    //             //console.log("permanent Address", perAddress.additionalVillageOrRoad)
    //             this.props.handleState('perAdditionalMouzaOrMoholla', perAddress.additionalMouzaOrMoholla ? perAddress.additionalMouzaOrMoholla : '');
    //             this.props.handleState('perAdditionalVillageOrRoad', perAddress.additionalVillageOrRoad ? perAddress.additionalVillageOrRoad : '');
    //             this.props.handleState('perCityCorporationOrMunicipality', perAddress.cityCorporationOrMunicipality ? perAddress.cityCorporationOrMunicipality : "");
    //             this.props.handleState('perDistrict', perAddress.district ? perAddress.district : '');
    //             this.props.handleState('perDivision', perAddress.division ? perAddress.division : '');
    //             this.props.handleState('perHomeOrHoldingNo', perAddress.homeOrHoldingNo ? perAddress.homeOrHoldingNo : '');
    //             this.props.handleState('perPostOffice', perAddress.postOffice ? perAddress.postOffice : '');
    //             this.props.handleState('perPostalCode', perAddress.postalCode ? perAddress.postalCode : '');
    //             this.props.handleState('perRegion', perAddress.region ? perAddress.region : '');
    //             this.props.handleState('perRmo', perAddress.rmo ? perAddress.rmo : '');
    //             this.props.handleState('perUnionOrWard', perAddress.unionOrWard ? perAddress.unionOrWard : '');
    //             this.props.handleState('perUpozila', perAddress.upozila ? perAddress.upozila : '');
    //             this.props.handleState('perWardForUnionPorishod', perAddress.wardForUnionPorishod ? perAddress.wardForUnionPorishod : '');

    //         }
    //        
    //         this.props.handleState('loading', false);
    //     } catch (error) {
    //         // console.log(error.response);

    //         if (error.response) {
    //             let message = error.response.data.message
    //             NotificationManager.error(message, "Click to Remove", largeTime);
    //            
    //             this.props.handleState('loading', false);
    //         } else if (error.request) {
    //             // console.log("Error Connecting...", error.request)
    //             NotificationManager.error("Error Connecting...", "Click to Remove", largeTime);
    //            
    //             this.props.handleState('loading', false);
    //         } else if (error) {
    //             NotificationManager.error(error.toString(), "Click to Remove", largeTime);
    //            
    //             this.props.handleState('loading', false);
    //         }
    //     }
    // }

    ///////////////////////////// // // Abs Account Check Added start//////////////////////////////

    handleClick = async (e) => {
        let { nid, dob } = this.props.values;
        let isRpaRequired = true;
        e.preventDefault();

        // Field Validation  Start =========================================== ///
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
                "x-auth-token": JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        // ===========================ABS Account Checking API start ============================


        // let checkObj = {
        //     nid: nid,
        //     productCode: productName
        // }

        // // console.log("objcheck", checkObj);

        // this.props.handleState('loading', true);
        // if (channelName === "ABS") {
        //     try {
        //         let absCheckApi = await axios.post(absAccountCheck, checkObj, config);
        //         // console.log("abs", absCheckApi.data);
        //         if (absCheckApi.data.data === null) {
        //             NotificationManager.error("Integration Server Error", "Click to Remove", largeTime);
        //             
        //             this.props.handleState('loading', false);
        //             return;
        //         }
        //         let apiResult = absCheckApi.data.data.result;
        //         let notificationData = absCheckApi.data.data.channelResponse.AC_INFO.RESPONSE_MSG;
        //         if (apiResult === true) {
        //             isRpaRequired = false;
        //             NotificationManager.info(notificationData, "Click to Remove", largeTime);
        //             
        //             this.props.handleState('loading', false);
        //         }

        //     } catch (error) {
        //         
        //         this.props.handleState('loading', false);
        //         isRpaRequired = false;
        //         if (error.response) {
        //             let message = error.response.data.message
        //             //console.log("Error",error.response)
        //             NotificationManager.error(message, "Error", 5000);
        //         } else if (error.request) {
        //             //console.log("Error Connecting...",error.request)
        //             NotificationManager.error("Error Connecting...", "Error", 5000);
        //         } else if (error) {
        //             NotificationManager.error(error.toString(), "Error", 5000);
        //         }
        //     }
        // }

        // ===========================ABS Account Checking API End ============================

        // RPA CALLING
        if (isRpaRequired === true) {

            let dob13 = showDate(dob).split("-")[0];

            const obj = {
                nid: nid.length === 13 ? dob13 + nid : nid,
                dob: showDate(dob)
            }

            // console.log("obj", obj);

            try {
                this.props.handleState('loading', true);
                let rpaData = await axios.post(nidValidationRPA, obj, config);
                // console.log(rpaData.data);
                // let responseData = rpaData.data.data;
                if (rpaData.data.data.image) {
                    let dataResp = rpaData.data.data;
                    this.props.handleState('applicantNameBangla', dataResp.nameBan ? dataResp.nameBan : "");
                    this.props.handleState('applicantName', dataResp.nameEng ? dataResp.nameEng : "");
                    this.props.handleState('applicantDob', dataResp.dob ? dataResp.dob : "");
                    this.props.handleState('applicantNidNo', this.props.values.nid ? this.props.values.nid : "");
                    this.props.handleState('motherNameBangla', dataResp.motherName ? dataResp.motherName : "");
                    this.props.handleState('fatherNameBangla', dataResp.fatherName ? dataResp.fatherName : "");
                    // this.props.handleState('profession', dataResp.occupation ? dataResp.occupation : '');
                    this.props.handleState('spouseName', dataResp.spouseName ? dataResp.spouseName : "");
                    this.props.handleState('ecImage', dataResp.image ? dataResp.image : "");
                    // Global EC Text start
                    this.props.handleState('ecApplicantNameBangla', dataResp.nameBan ? dataResp.nameBan : "");
                    this.props.handleState('ecApplicantName', dataResp.nameEng ? dataResp.nameEng : "");
                    this.props.handleState('ecMotherNameBangla', dataResp.motherName ? dataResp.motherName : "");
                    this.props.handleState('ecFatherNameBangla', dataResp.fatherName ? dataResp.fatherName : "");
                    // Global EC Text end

                    // Present Address
                    let preAddress = dataResp.presentAddress;
                    //console.log("present Address", preAddress)
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

                } else {

                    this.props.handleState('loading', false);
                    NotificationManager.error("Please Check Your Nid No and Date Of Birth", "Click to Remove", largeTime);
                }

                this.props.handleState('loading', false);
            } catch (error) {
                // console.log(error.response);

                if (error.response) {
                    let message = error.response.data.message
                    NotificationManager.error(message, "Click to Remove", largeTime);

                    this.props.handleState('loading', false);
                } else if (error.request) {
                    // console.log("Error Connecting...", error.request)
                    NotificationManager.error("Error Connecting...", "Click to Remove", largeTime);

                    this.props.handleState('loading', false);
                } else if (error) {
                    NotificationManager.error(error.toString(), "Click to Remove", largeTime);

                    this.props.handleState('loading', false);
                }
            }
        }

    }


    ///////////////////////////// // // Abs Account Check Added End//////////////////////////////




    continue = (e) => {
        e.preventDefault();
        const { nid, dob } = this.props.values;

        if (nid === '') {
            NotificationManager.warning('Please Provide Nid Number', "Click to Remove", largeTime);
            return;
        }

        if (dob === '') {
            NotificationManager.warning('Please Provide Date of Birth', "Click to Remove", largeTime);
            return;
        }



        this.props.nextStep();

    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    };

    escape = () => {
        this.props.nextStep();
    }



    render() {
        let { values, handleChange } = this.props;
        return (
            <div className="container">
                {/* 
                <div className="im col-sm-2" onClick={this.Escape}>
                    Escape
              </div>*/}

                <div className="row d-flex justify-content-center">
                    <div className="col-sm-6 imTwoWhite p-5">
                        <div className="divBg pt-3">
                            <h4>NID Verification</h4>
                            <button onClick={this.escape}>Escape</button>
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
                                            {/* <small className="text-muted">
                                                <span style={{ color: "red", fontSize: "20px" }}>
                                                    *
                                </span>
                                Notice Taskbar For RPA
                              </small> */}
                                        </div>
                                    ) : (
                                            <div className="imTwoWhite text-center">
                                                <img
                                                    src={values.ecImage ? values.flag + values.ecImage : Sign}
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
                                <i className="fa fa-id-card" /> NID Verification
                      </div>

                            <div className="row d-flex justify-content-center mt-3">
                                <span className="b mr-5" onClick={this.back}>
                                    Back
                        </span>
                                {values.ecImage ?
                                    <button type="button" style={{ outline: "none" }} className="b" onClick={this.continue}>
                                        Next
        </button>
                                    : ""
                                }
                            </div>




                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SimRPA;
