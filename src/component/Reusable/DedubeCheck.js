import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import Loading from '../E-KYC/Simplified/utils/CustomLoding/Loading';
import { largeTime } from '../Utils/notificationTime';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { absAccountCheck, depoApi, getAppSetting } from '../E-KYC/Url/ApiList';
import axios from 'axios';
import { showDate } from '../Utils/dateConversion';


export class DedubeCheck extends Component {

    async componentDidMount() {

        let config = {
            headers: {
                "x-auth-token": JSON.parse(sessionStorage.getItem('x-auth-token')),
            },
        };

        const obj = {
            key: "EKYC_DEPOSITORY_USE"
        }
        try {
            let depositoryUse = await axios.post(getAppSetting, obj, config);
            //   console.log(depositoryUse.data.data[0].value);
            if (depositoryUse.data.data[0].value === "YES") {
                this.props.handleState("useDepo", true);
            } else {
                this.props.handleState("useDepo", false);
            }
        } catch (error) {
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

    continue = async (e) => {
        e.preventDefault();
        let isCheckDepo = true;
        let { nid, dob, productName, channelName, useDepo, productType } = this.props.values;

        //===============================Validation Added===========================
        if (nid === '') {
            NotificationManager.warning('Please Provide Nid Number', "Click to Remove", largeTime);
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
            NotificationManager.warning('Please Provide Date of Birth', "Click to Remove", largeTime);
            return;
        }

        //===============================Validation Added===========================

        let config = {
            headers: {
                "x-auth-token": JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        //=====================ABS Account Check Start=============================


        let checkObj = {
            nid: nid,
            productCode: productName
            // productType
        }

        // console.log("objcheck", checkObj);

        this.props.handleState('loading', true);
        if (channelName === "ABS") {
            try {
                let absCheckApi = await axios.post(absAccountCheck, checkObj, config);
                // console.log("abs", absCheckApi.data);
                if (absCheckApi.data.data === null) {
                    NotificationManager.error("Integration Server Error", "Click to Remove", largeTime);
                    this.props.handleState('loading', false);
                    return;
                }
                let apiResult = absCheckApi.data.data.result;
                let notificationData = absCheckApi.data.data.channelResponse.AC_INFO.RESPONSE_MSG;
                if (apiResult === true) {
                    isCheckDepo = false;
                    NotificationManager.info(notificationData, "Click to Remove", largeTime);
                    this.props.handleState('loading', false);
                    return;
                }

            } catch (error) {
                this.props.handleState('loading', false);
                console.log(error.response);
                isCheckDepo = false;
                if (error.response) {
                    let message = error.response.data.message
                    //console.log("Error",error.response)
                    NotificationManager.error(message, "Error", 5000);
                } else if (error.request) {
                    //console.log("Error Connecting...",error.request)
                    NotificationManager.error("Error Connecting...", "Error", 5000);
                } else if (error) {
                    NotificationManager.error(error.toString(), "Error", 5000);
                }
            }
        }

        //=====================ABS Account Check End =============================

        //=============================Depository Check API Start ==========================
        if (useDepo === true) {
            if (isCheckDepo === true) {

                let dob13 = showDate(dob).split("-")[0];

                let obj = {
                    nid: nid.length === 13 ? dob13 + nid : nid
                }


                try {
                    let rpaDepo = await axios.post(depoApi, obj, config);
                    //   console.log("repo", rpaDepo.data.data);
                    // console.log("Repository call");
                    if (rpaDepo.data.data === null) {
                        this.props.handleState('loading', false);
                        this.props.nextStep();
                    } else if (rpaDepo.data.data.image) {
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


                        this.props.handleState('loading', false);

                        this.props.handleState("step", "exist_1");


                    } else {

                        this.props.handleState('loading', false);
                        //NotificationManager.error("Please Check Your Nid No and Date Of Birth", "Click to Remove", largeTime);
                        this.props.nextStep();
                    }

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
        } else {
            this.props.handleState("loading", false);
            this.props.nextStep();
        }

        //=============================Depository Check API End ===========================


    }

    back = () => {
        this.props.prevStep();
    }

    // Escape = () => {
    //     this.props.nextStep();
    // }


    render() {
        const { values, handleChange } = this.props;
        return (
            <div className="container" style={{ height: "60vh" }} >
                {/* 
                <div className="im col-sm-2" onClick={this.Escape}>
                    Escape
          </div>*/}

                <div className="row d-flex justify-content-center">
                    <div className="col-sm-6 imTwoWhite p-5">
                        <div className="divBg pt-3">
                            <h4>Dedupe Check</h4>
                        </div>

                        <form onSubmit={this.continue} style={{ zIndex: "10" }}>
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
                                <div className='' >

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



                            {
                                values.loading ? (
                                    <div className="row d-flex justify-content-center align-items-center mt-3">
                                        <Loading />
                                    </div>
                                ) :
                                    <div className="row d-flex justify-content-center">
                                        <div className="b mb-3" onClick={this.back} >Back</div>&nbsp; &nbsp;
                <div className="b mb-3" onClick={this.continue} >Next</div>
                                    </div>
                            }




                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default DedubeCheck
