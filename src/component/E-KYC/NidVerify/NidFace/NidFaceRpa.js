import React, { Component } from 'react';
import Loading from "../../Simplified/utils/CustomLoding/Loading";
import { absAccountCheck, depoApi, getAppSetting, nidValidationRPA } from '../../Url/ApiList';
//import Finger from "../images/fingerprintEC.svg";
//import FingerOk from ".././images/successPrint.svg";
//import Sign from '../images/man.svg';
import Sign from '../../Simplified/images/man.svg';
import { NotificationManager } from "react-notifications";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { showDate } from '../../../Utils/dateConversion';
import { largeTime } from '../../../Utils/notificationTime';
import Button from '@material-ui/core/Button';

export class NidFaceRpa extends Component {

    state = {
        depoUse: ''
    }

    async componentDidMount() {

        //! Depo Status calling ==========================================================
        let config = {
            headers: {
                "x-auth-token": JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        let obj = {
            key: "EKYC_DEPOSITORY_USE"
        }

        try {
            let depoCheck = await axios.post(getAppSetting, obj, config);
            console.log("Depo Check", depoCheck.data.data[0]["value"])
            this.setState(
                {
                    depoUse: depoCheck.data.data[0]["value"] === "YES" ? true : false
                }
            )
            console.log(this.state.depoUse)
        } catch (error) {
            console.log("Error", error)
        }
    }


    //! Nid Verify click e ja ja hobe ===================================================================
    handleClick = async (e) => {
        let { nid, dob } = this.props.values;
        let { depoUse } = this.state;
        e.preventDefault();

        let config = {
            headers: {
                "x-auth-token": JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };


        if (depoUse === true) {

            let dob13 = showDate(dob).split("-")[0];

            let obj = {
                nid: nid.length === 13 ? dob13 + nid : nid
            }


            try {

                //! Depo checking===================================================================
                this.props.handleState('loading', true);
                let rpaDepo = await axios.post(depoApi, obj, config);
                console.log("Depo Check", rpaDepo.data.data);

                //! Jodi Depo na thake, thaole RPA call Hobe========================================
                if (rpaDepo.data.data === null) {
                    let dob13 = showDate(dob).split("-")[0];

                    const obj = {
                        nid: nid.length === 13 ? dob13 + nid : nid,
                        dob: showDate(dob)
                    }

                    //! RPA calling=======================================================
                    try {
                        this.props.handleState('loading', true);
                        let rpaData = await axios.post(nidValidationRPA, obj, config);
                        console.log("RPA Data", rpaData.data);
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
                            this.props.handleState('isEnableFace', false);
                            this.props.handleState('loading', false);
                            NotificationManager.error("Please Check Your Nid No and Date Of Birth", "Click to Remove", largeTime);
                        }
                        this.props.handleState('isEnableFace', false);
                        this.props.handleState('loading', false);
                    } catch (error) {
                        console.log(error);

                        if (error.response) {
                            let message = error.response.data.message
                            NotificationManager.error(message, "Click to Remove", largeTime);
                            this.props.handleState('isEnableFace', false);
                            this.props.handleState('loading', false);
                        } else if (error.request) {
                            // console.log("Error Connecting...", error.request)
                            NotificationManager.error("Error Connecting...", "Click to Remove", largeTime);
                            this.props.handleState('isEnableFace', false);
                            this.props.handleState('loading', false);
                        } else if (error) {
                            NotificationManager.error(error.toString(), "Click to Remove", largeTime);
                            this.props.handleState('isEnableFace', false);
                            this.props.handleState('loading', false);
                        }
                    }
                    //! RPA Call End Here =============================================================
                }
                //! Ar jodi Depo Thake tahole =====================================================
                else if (rpaDepo.data.data.image) {

                    let dataResp = rpaDepo.data.data;
                    console.log("In the Depo")
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
                    // Global EC Text start
                    this.props.handleState('ecApplicantNameBangla', dataResp.name ? dataResp.name : "");
                    this.props.handleState('ecApplicantName', dataResp.nameEn ? dataResp.nameEn : "");
                    this.props.handleState('ecMotherNameBangla', dataResp.mother ? dataResp.mother : "");
                    this.props.handleState('ecFatherNameBangla', dataResp.father ? dataResp.father : "");
                    // Global EC Text end

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

                    // ================Converted Type Verification to FACE ================
                    this.props.handleState('typeVerification', "FACE");
                    // ================Converted Type Verification to FACE ================

                    this.props.handleState('isEnableFace', false);
                    this.props.handleState('loading', false);




                } else {
                    this.props.handleState('isEnableFace', false);
                    this.props.handleState('loading', false);
                    NotificationManager.error("Please Check Your Nid No and Date Of Birth", "Click to Remove", largeTime);

                }

            } catch (error) {
                // console.log(error.response);

                if (error.response) {
                    let message = error.response.data.message
                    NotificationManager.error(message, "Click to Remove", largeTime);
                    this.props.handleState('isEnableFace', false);
                    this.props.handleState('loading', false);
                } else if (error.request) {
                    // console.log("Error Connecting...", error.request)
                    NotificationManager.error("Error Connecting...", "Click to Remove", largeTime);
                    this.props.handleState('isEnableFace', false);
                    this.props.handleState('loading', false);
                } else if (error) {
                    NotificationManager.error(error.toString(), "Click to Remove", largeTime);
                    this.props.handleState('isEnableFace', false);
                    this.props.handleState('loading', false);
                }
            }



        }
        //! Ar jodi Depo False thake,,tahole shudhu RPA Call hobe ========================================
        else {

            let dob13 = showDate(dob).split("-")[0];

            const obj = {
                nid: nid.length === 13 ? dob13 + nid : nid,
                dob: showDate(dob)
            }

            // RPA calling=======================================================
            try {
                this.props.handleState('loading', true);
                let rpaData = await axios.post(nidValidationRPA, obj, config);
                console.log("From RPA", rpaData.data);
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
                    this.props.handleState('spouseName', dataResp.spouse ? dataResp.spouse : "");
                    this.props.handleState('ecImage', dataResp.image ? dataResp.image : "");
                    this.props.handleState('profession', dataResp.occupation ? dataResp.occupation : "");
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
                    this.props.handleState('isEnableFace', false);
                    this.props.handleState('loading', false);
                    NotificationManager.error("Please Check Your Nid No and Date Of Birth", "Click to Remove", largeTime);
                }
                this.props.handleState('isEnableFace', false);
                this.props.handleState('loading', false);
            } catch (error) {
                // console.log(error.response);

                if (error.response) {
                    let message = error.response.data.message
                    NotificationManager.error(message, "Click to Remove", largeTime);
                    this.props.handleState('isEnableFace', false);
                    this.props.handleState('loading', false);
                } else if (error.request) {
                    // console.log("Error Connecting...", error.request)
                    NotificationManager.error("Error Connecting...", "Click to Remove", largeTime);
                    this.props.handleState('isEnableFace', false);
                    this.props.handleState('loading', false);
                } else if (error) {
                    NotificationManager.error(error.toString(), "Click to Remove", largeTime);
                    this.props.handleState('isEnableFace', false);
                    this.props.handleState('loading', false);
                }
            }

        }


        // Field Validation  Start =========================================== ///
        // if (nid === "") {
        //     NotificationManager.warning("Please Provide NID Number", "Click to Remove", largeTime);
        //     return;
        // }

        // if (nid.length < 10) {
        //     NotificationManager.warning("NID Number is less than 10 digits", "Click to Remove", largeTime);
        //     return;
        // } else if (nid.length > 10 && nid.length < 13) {
        //     NotificationManager.warning("NID Number is greater than 10 and less than 13 digits", "Click to Remove", largeTime);
        //     return;
        // } else if (nid.length > 13 && nid.length < 17) {
        //     NotificationManager.warning("NID Number is greater than 13 and less than 17 digits", "Click to Remove", largeTime);
        //     return;
        // } else if (nid.length > 17) {
        //     NotificationManager.warning("NID Number is greater than 17 digits", "Click to Remove", largeTime);
        //     return;
        // }

        // if (dob === '') {
        //     NotificationManager.warning("Please Provide Date Of Birth", "Click to Remove", largeTime);
        //     return;
        // }
        // Field Validation End ========================================///////

        // RPA CALLING

    }




    continue = () => {
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
                        <div className="imTwoWhite pt-2 mb-2">
                            <h5 className="im" style={{ color: "green" }}>NID Verification</h5>
                        </div>

                        <form>
                            {/* <label htmlFor="nidNo">Nid No:</label><br />
              <input type="text" id="nidNo" name="nidNo" value={this.state.nidNo} /><br /> */}
                            <div className="imTwoWhite">
                                <div className="form-group ">
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
                                                    src={values.ecImage ? (values.flag + values.ecImage) : Sign}
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


                            >
                                <Button
                                    onClick={this.handleClick}
                                    className="im"
                                    variant="contained"
                                    style={{ color: "green", outline: "none", borderRadius: "10px" }}>Verify NID</Button>
                                <i className="fa fa-id-card" />
                            </div>

                            <div className="row d-flex justify-content-center mt-3">
                                {/* <span className="b mr-5" onClick={this.back}>
                                    Back
                                </span> */}
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

export default NidFaceRpa
