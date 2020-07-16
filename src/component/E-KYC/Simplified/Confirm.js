import React, { Component } from 'react'
import { formatDate } from './utils/DateFormat';
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { simplifiedJointAPI, simplifiedJointAddAPI } from '../Url/ApiList';

import down from './images/downArrow.svg';
import Avater from './images/profile.svg';
import front from './images/nid-f.svg';
import Loading from './utils/CustomLoding/Loading';
import back from './images/nid-f2.svg';
import Sign from './images/signature2.svg';
import up from './images/upArrow.svg';
import adult from './images/adultNominee.svg';
import child from './images/child2.svg';
import guardian from './images/guardian.svg';
import Acordion from '../Acordion/Acordion';


export class Confirm extends Component {


    continue = async (e) => {
        const { values } = this.props;
        e.preventDefault();
        //Process form//
        console.log(values.applicantEkycId);
        if (values.applicantEkycId === '') {


            let accountInfo = {
                title: values.applicantName,
                type: values.accountType,
                productType: values.product,
                productCategoryCode:values.product,
                branchOrAgentPointCode:"101",
                transactionOrMaturityAmount:values.transactionOrMaturityAmount,
                productCode: values.productName,
                channelCode: values.channelName

            }

            let applicantInfo = {
                operatorType: values.operatorType,
                nid: values.applicantNidNo,
                name: values.applicantName,
                nameBangla: values.applicantNameBangla,
                dob: values.applicantDob,
                dobDate: values.applicantDob ? new Date(values.applicantDob).toISOString() : '',
                motherName: values.motherName,
                motherNameBangla: values.motherNameBangla,
                fatherName: values.fatherName,
                fatherNameBangla: values.fatherNameBangla,
                gender: values.gender,
                profession: values.profession,
                mobile: values.mobileNumber,
                verificationType: 'FACE'
            }

            if (values.spouseName !== '') applicantInfo.spouseName = values.spouseName;

            let applicantPresentInfo = {
                addressType: "PRESENT",
                district: values.preDistrict,
                upozila: values.preUpozila,
                unionOrWard: values.preUnionOrWard,
                districtEng: values.preDistrictEn,
                upozilaEng: values.preUpozilaEn,
                unionOrWardEng: values.preUnionOrWardEn
            }
    
            if (values.preAdditionalMouzaOrMoholla !== '') applicantPresentInfo.additionalMouzaOrMoholla = values.preAdditionalMouzaOrMoholla;
            if (values.preAdditionalVillageOrRoad !== '') applicantPresentInfo.additionalVillageOrRoad = values.preAdditionalVillageOrRoad;
            if (values.preCityCorporationOrMunicipality !== '') applicantPresentInfo.cityCorporationOrMunicipality = values.preCityCorporationOrMunicipality;
            if (values.preDistrictCode !== '') applicantPresentInfo.districtCode = values.preDistrictCode;
            if (values.preUpozilaCode !== '') applicantPresentInfo.upozilaCode = values.preUpozilaCode;
            if (values.preUnionOrWardCode !== '') applicantPresentInfo.unionCode = values.preUnionOrWardCode;
            if (values.preDivision !== '') applicantPresentInfo.division = values.preDivision;
            if (values.preHomeOrHoldingNo !== '') applicantPresentInfo.homeOrHoldingNo = values.preHomeOrHoldingNo;
            if (values.prePostOffice !== '') applicantPresentInfo.postOffice = values.prePostOffice;
            if (values.preRegion !== '') applicantPresentInfo.region = values.preRegion;
            if (values.prePostalCode !== '') applicantPresentInfo.postalCode = values.prePostalCode;
            if (values.preRmo !== '') applicantPresentInfo.rmo = values.preRmo;
            if (values.preWardForUnionPorishod !== '') applicantPresentInfo.wardForUnionPorishod = values.preWardForUnionPorishod;
            if (values.preAdditionalMouzaOrMohollaEn !== '') applicantPresentInfo.additionalMouzaOrMohollaEng = values.preAdditionalMouzaOrMohollaEn;
            if (values.preAdditionalVillageOrRoadEn !== '') applicantPresentInfo.additionalVillageOrRoadEng = values.preAdditionalVillageOrRoadEn;
            if (values.preCityCorporationOrMunicipalityEn !== '') applicantPresentInfo.cityCorporationOrMunicipalityEng = values.preCityCorporationOrMunicipalityEn;
            if (values.preDivisionEn !== '') applicantPresentInfo.divisionEng = values.preDivisionEn;
            if (values.preHomeOrHoldingNoEn !== '') applicantPresentInfo.homeOrHoldingNoEng = values.preHomeOrHoldingNoEn;
            if (values.prePostOfficeEn !== '') applicantPresentInfo.postOfficeEng = values.prePostOfficeEn;
            if (values.preRegionEn !== '') applicantPresentInfo.regionEng = values.preRegionEn;
    
            let applicantPermanentInfo = {
                addressType: "PERMANENT",
                district: values.perDistrict,
                upozila: values.perUpozila,
                unionOrWard: values.perUnionOrWard,
                districtEng: values.perDistrictEn,
                upozilaEng: values.perUpozilaEn,
                unionOrWardEng: values.perUnionOrWardEn
            }
    
    
            if (values.perAdditionalMouzaOrMoholla !== '') applicantPermanentInfo.additionalMouzaOrMoholla = values.perAdditionalMouzaOrMoholla;
            if (values.perAdditionalVillageOrRoad !== '') applicantPermanentInfo.additionalVillageOrRoad = values.perAdditionalVillageOrRoad;
            if (values.perCityCorporationOrMunicipality !== '') applicantPermanentInfo.cityCorporationOrMunicipality = values.perCityCorporationOrMunicipality;
            if (values.perDistrictCode !== '') applicantPermanentInfo.districtCode = values.perDistrictCode;
            if (values.perUpozilaCode !== '') applicantPermanentInfo.upozilaCode = values.perUpozilaCode;
            if (values.perUnionOrWardCode !== '') applicantPermanentInfo.unionCode = values.perUnionOrWardCode;
            if (values.perDivision !== '') applicantPermanentInfo.division = values.perDivision;
            if (values.perHomeOrHoldingNo !== '') applicantPermanentInfo.homeOrHoldingNo = values.perHomeOrHoldingNo;
            if (values.perPostOffice !== '') applicantPermanentInfo.postOffice = values.perPostOffice;
            if (values.perRegion !== '') applicantPermanentInfo.region = values.perRegion;
            if (values.perPostalCode !== '') applicantPermanentInfo.postalCode = values.perPostalCode;
            if (values.perRmo !== '') applicantPermanentInfo.rmo = values.perRmo;
            if (values.perWardForUnionPorishod !== '') applicantPermanentInfo.wardForUnionPorishod = values.perWardForUnionPorishod;
            if (values.perAdditionalMouzaOrMohollaEn !== '') applicantPermanentInfo.additionalMouzaOrMohollaEng = values.perAdditionalMouzaOrMohollaEn;
            if (values.perAdditionalVillageOrRoadEn !== '') applicantPermanentInfo.additionalVillageOrRoadEng = values.perAdditionalVillageOrRoadEn;
            if (values.perCityCorporationOrMunicipalityEn !== '') applicantPermanentInfo.cityCorporationOrMunicipalityEng = values.perCityCorporationOrMunicipalityEn;
            if (values.perDivisionEn !== '') applicantPermanentInfo.divisionEng = values.perDivisionEn;
            if (values.perHomeOrHoldingNoEn !== '') applicantPermanentInfo.homeOrHoldingNoEng = values.perHomeOrHoldingNoEn;
            if (values.perPostOfficeEn !== '') applicantPermanentInfo.postOfficeEng = values.perPostOfficeEn;
            if (values.perRegionEn !== '') applicantPermanentInfo.regionEng = values.perRegionEn;

            let applicantFileInfo = {
                nidFront: values.NidFront,
                nidBack: values.NidFront,
                photo: values.faceImage,
                signature: values.signature
            }

            let nomineesInfo = [];
            for (let i = 0; i < values.jointArray.length; i++) {
                if (values.jointArray[i].isShow === true) {
                    let nomineeObj = {
                        name: values.jointArray[i].nominee,
                        relation: values.jointArray[i].relation,
                        dob: values.jointArray[i].dob ? new Date(values.jointArray[i].dob).toISOString() : '',
                        photo: values.jointArray[i].photograph,
                        isMinor: !(values.jointArray[i].isShow),
                        percentage: parseInt(values.jointArray[i].percentage)
                    }
                    nomineesInfo.push(nomineeObj);
                } else {
                    let guardianInfo = {
                        nid: values.jointArray[i].minorGuardianNid,
                        name: values.jointArray[i].minorGuardianName,
                        relation: values.jointArray[i].guardianRelationWMinor,
                        address: values.jointArray[i].minorGuardianAddress,
                        photo: values.jointArray[i].minorPhotoGuardian
                    }

                    let nomineeObj = {
                        name: values.jointArray[i].minorNominee,
                        relation: values.jointArray[i].minorRelationWAccH,
                        dob: values.jointArray[i].minorDob ? new Date(values.jointArray[i].minorDob).toISOString() : '',
                        //dob: convertminorIso,
                        photo: values.jointArray[i].minorNomineePhoto,
                        isMinor: !(values.jointArray[i].isShow),
                        percentage: parseInt(values.jointArray[i].minorPercentage),
                        guardian: guardianInfo
                    }
                    nomineesInfo.push(nomineeObj);

                }

            }

            let confirmObj = {
                account: accountInfo,
                applicant: applicantInfo,
                applicantFile: applicantFileInfo,
                applicantPresentAddress: applicantPresentInfo,
                applicantPermanentAddress: applicantPermanentInfo,
                nominees: nomineesInfo
            }
            console.log("Confirm obj", confirmObj);

            const config = {
                headers: {
                    'x-verification-token': values.verifyToken,
                    'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

                }
            };
            console.log(config)

            try {
                this.props.handleState('confirmFlag', true);
                let responseFirst = await axios.post(simplifiedJointAPI, confirmObj, config);
                this.props.handleState('confirmFlag', false);
                console.log("responseforFIRST", responseFirst.data);
                let data = responseFirst.data;
                let statusCode = data.statusCode;
                let successMessage = data.message;
                NotificationManager.success(statusCode + " " + successMessage, "Success", 5000);
                let resAccountId = responseFirst.data.data.accountId;
                this.props.handleState('applicantEkycId', resAccountId);
                localStorage.setItem("accountId", JSON.stringify(resAccountId));
                this.props.nextStep();

            } catch (error) {

                this.props.handleState('confirmFlag', false);
                if (error.response) {
                    let message = error.response.data.message
                    console.log("Error",error.response)
                    NotificationManager.error(message, "Error", 5000);
                } else if (error.request) {
                    console.log("Error Connecting...", error.request)
                    NotificationManager.error("Error Connecting...", "Error", 5000);
                } else if (error) {
                    NotificationManager.error(error.toString(), "Error", 5000);
                }
            }

        }
        else {

            
            let accountIdInfo = values.applicantEkycId;
            let applicantInfo = {
                operatorType: values.operatorType,
                nid: values.applicantNidNo,
                name: values.applicantName,
                nameBangla: values.applicantNameBangla,
                dob: values.applicantDob,
                dobDate: new Date(values.applicantDob).toISOString(),
                motherName: values.motherName,
                motherNameBangla: values.motherNameBangla,
                fatherName: values.fatherName,
                fatherNameBangla: values.fatherNameBangla,
                gender: values.gender,
                profession: values.profession,
                mobile: values.mobileNumber,
                verificationType: 'FACE'
            }

            if (values.spouseName !== '') applicantInfo.spouseName = values.spouseName;

            let applicantPresentInfo = {
                addressType: "PRESENT",
                district: values.preDistrict,
                upozila: values.preUpozila,
                unionOrWard: values.preUnionOrWard,
                districtEng: values.preDistrictEn,
                upozilaEng: values.preUpozilaEn,
                unionOrWardEng: values.preUnionOrWardEn
            }
    
            if (values.preAdditionalMouzaOrMoholla !== '') applicantPresentInfo.additionalMouzaOrMoholla = values.preAdditionalMouzaOrMoholla;
            if (values.preAdditionalVillageOrRoad !== '') applicantPresentInfo.additionalVillageOrRoad = values.preAdditionalVillageOrRoad;
            if (values.preCityCorporationOrMunicipality !== '') applicantPresentInfo.cityCorporationOrMunicipality = values.preCityCorporationOrMunicipality;
            if (values.preDistrictCode !== '') applicantPresentInfo.districtCode = values.preDistrictCode;
            if (values.preUpozilaCode !== '') applicantPresentInfo.upozilaCode = values.preUpozilaCode;
            if (values.preUnionOrWardCode !== '') applicantPresentInfo.unionCode = values.preUnionOrWardCode;
            if (values.preDivision !== '') applicantPresentInfo.division = values.preDivision;
            if (values.preHomeOrHoldingNo !== '') applicantPresentInfo.homeOrHoldingNo = values.preHomeOrHoldingNo;
            if (values.prePostOffice !== '') applicantPresentInfo.postOffice = values.prePostOffice;
            if (values.preRegion !== '') applicantPresentInfo.region = values.preRegion;
            if (values.prePostalCode !== '') applicantPresentInfo.postalCode = values.prePostalCode;
            if (values.preRmo !== '') applicantPresentInfo.rmo = values.preRmo;
            if (values.preWardForUnionPorishod !== '') applicantPresentInfo.wardForUnionPorishod = values.preWardForUnionPorishod;
            if (values.preAdditionalMouzaOrMohollaEn !== '') applicantPresentInfo.additionalMouzaOrMohollaEng = values.preAdditionalMouzaOrMohollaEn;
            if (values.preAdditionalVillageOrRoadEn !== '') applicantPresentInfo.additionalVillageOrRoadEng = values.preAdditionalVillageOrRoadEn;
            if (values.preCityCorporationOrMunicipalityEn !== '') applicantPresentInfo.cityCorporationOrMunicipalityEng = values.preCityCorporationOrMunicipalityEn;
            if (values.preDivisionEn !== '') applicantPresentInfo.divisionEng = values.preDivisionEn;
            if (values.preHomeOrHoldingNoEn !== '') applicantPresentInfo.homeOrHoldingNoEng = values.preHomeOrHoldingNoEn;
            if (values.prePostOfficeEn !== '') applicantPresentInfo.postOfficeEng = values.prePostOfficeEn;
            if (values.preRegionEn !== '') applicantPresentInfo.regionEng = values.preRegionEn;
    
            let applicantPermanentInfo = {
                addressType: "PERMANENT",
                district: values.perDistrict,
                upozila: values.perUpozila,
                unionOrWard: values.perUnionOrWard,
                districtEng: values.perDistrictEn,
                upozilaEng: values.perUpozilaEn,
                unionOrWardEng: values.perUnionOrWardEn
            }
    
    
            if (values.perAdditionalMouzaOrMoholla !== '') applicantPermanentInfo.additionalMouzaOrMoholla = values.perAdditionalMouzaOrMoholla;
            if (values.perAdditionalVillageOrRoad !== '') applicantPermanentInfo.additionalVillageOrRoad = values.perAdditionalVillageOrRoad;
            if (values.perCityCorporationOrMunicipality !== '') applicantPermanentInfo.cityCorporationOrMunicipality = values.perCityCorporationOrMunicipality;
            if (values.perDistrictCode !== '') applicantPermanentInfo.districtCode = values.perDistrictCode;
            if (values.perUpozilaCode !== '') applicantPermanentInfo.upozilaCode = values.perUpozilaCode;
            if (values.perUnionOrWardCode !== '') applicantPermanentInfo.unionCode = values.perUnionOrWardCode;
            if (values.perDivision !== '') applicantPermanentInfo.division = values.perDivision;
            if (values.perHomeOrHoldingNo !== '') applicantPermanentInfo.homeOrHoldingNo = values.perHomeOrHoldingNo;
            if (values.perPostOffice !== '') applicantPermanentInfo.postOffice = values.perPostOffice;
            if (values.perRegion !== '') applicantPermanentInfo.region = values.perRegion;
            if (values.perPostalCode !== '') applicantPermanentInfo.postalCode = values.perPostalCode;
            if (values.perRmo !== '') applicantPermanentInfo.rmo = values.perRmo;
            if (values.perWardForUnionPorishod !== '') applicantPermanentInfo.wardForUnionPorishod = values.perWardForUnionPorishod;
            if (values.perAdditionalMouzaOrMohollaEn !== '') applicantPermanentInfo.additionalMouzaOrMohollaEng = values.perAdditionalMouzaOrMohollaEn;
            if (values.perAdditionalVillageOrRoadEn !== '') applicantPermanentInfo.additionalVillageOrRoadEng = values.perAdditionalVillageOrRoadEn;
            if (values.perCityCorporationOrMunicipalityEn !== '') applicantPermanentInfo.cityCorporationOrMunicipalityEng = values.perCityCorporationOrMunicipalityEn;
            if (values.perDivisionEn !== '') applicantPermanentInfo.divisionEng = values.perDivisionEn;
            if (values.perHomeOrHoldingNoEn !== '') applicantPermanentInfo.homeOrHoldingNoEng = values.perHomeOrHoldingNoEn;
            if (values.perPostOfficeEn !== '') applicantPermanentInfo.postOfficeEng = values.perPostOfficeEn;
            if (values.perRegionEn !== '') applicantPermanentInfo.regionEng = values.perRegionEn;

            let applicantFileInfo = {
                nidFront: values.NidFront,
                nidBack: values.NidFront,
                photo: values.faceImage,
                signature: values.signature
            }



            let nomineesInfo = [];
            for (let i = 0; i < values.jointArray.length; i++) {
                if (values.jointArray[i].isShow === true) {
                    let nomineeObj = {
                        name: values.jointArray[i].nominee,
                        relation: values.jointArray[i].relation,
                        dob: new Date(values.jointArray[i].dob).toISOString(),
                        photo: values.jointArray[i].photograph,
                        isMinor: !(values.jointArray[i].isShow),
                        percentage: parseInt(values.jointArray[i].percentage)
                    }
                    nomineesInfo.push(nomineeObj);
                } else {
                    let guardianInfo = {
                        nid: values.jointArray[i].minorGuardianNid,
                        name: values.jointArray[i].minorGuardianName,
                        relation: values.jointArray[i].guardianRelationWMinor,
                        address: values.jointArray[i].minorGuardianAddress,
                        photo: values.jointArray[i].minorPhotoGuardian
                    }

                    let nomineeObj = {
                        name: values.jointArray[i].minorNominee,
                        relation: values.jointArray[i].minorRelationWAccH,
                        dob: new Date(values.jointArray[i].minorDob).toISOString(),
                        //dob: convertminorIso,
                        photo: values.jointArray[i].minorNomineePhoto,
                        isMinor: !(values.jointArray[i].isShow),
                        percentage: parseInt(values.jointArray[i].minorPercentage),
                        guardian: guardianInfo
                    }
                    nomineesInfo.push(nomineeObj);

                }

            }

            let confirmObjSecond = {
                accountId: accountIdInfo,
                applicant: applicantInfo,
                applicantFile: applicantFileInfo,
                applicantPresentAddress: applicantPresentInfo,
                applicantPermanentAddress: applicantPermanentInfo,
                nominees: nomineesInfo
            }

            console.log('SecondApi', confirmObjSecond);

            const config = {
                headers: {
                    'x-verification-token': values.verifyToken,
                    'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

                }
            };

            try {
                this.props.handleState('confirmFlag', true);
                let resJointAdded = await axios.post(simplifiedJointAddAPI, confirmObjSecond, config);
                this.props.handleState('confirmFlag', false);
                console.log(resJointAdded.data);

                let respStatus = resJointAdded.data.statusCode;
                let respMessage = resJointAdded.data.message;
                NotificationManager.success(respStatus + " " + respMessage, "Success", 5000);
                this.props.nextStep();
            } catch (error) {

                this.props.handleState('confirmFlag', false);
                if (error.response) {
                    let message = error.response.data.message
                    console.log("Error",error.response)
                    NotificationManager.error(message, "Error", 5000);
                } else if (error.request) {
                    console.log("Error Connecting...", error.request)
                    NotificationManager.error("Error Connecting...", "Error", 5000);
                } else if (error) {
                    NotificationManager.error(error.toString(), "Error", 5000);
                }
            }


        }


    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        const { values } = this.props;
        // console.log(values);
        return (
            <div className="container">
                <div className="card col-sm-12" style={{ paddingTop: "25px" }}>
                    <div className="card-header up">
                        <h3>All Information</h3>
                    </div>


                    <div className="row d-flex justify-content-center">
                        <div className="col-sm-6 " style={{ margin: "20px 0px" }}>
                            <div className="im">
                                <p style={{ color: "green" }}>Account Details</p>
                            </div>
                            <hr />
                            <div className="">
                                <small className="text-muted">
                                    Account Type : {values.accountType},<br />
                                    Product and Services : {values.product},<br /> 
                                    channel Name : {values.channelName},<br /> 
                                    Product Name : {values.productName},<br /> 
                                    Transaction Amount : {values.transactionOrMaturityAmount},<br /> 
                                    </small>
                                {/* <p className="text-muted">Product and Services : {accountData.product}</p>
                            <p className="text-muted">channel Name : {accountData.channelName}</p> */}
                            </div>
                            <hr />
                        </div>

                        <div className="col-sm-6 " style={{ margin: "20px 0px" }}>
                            <div className="im">
                                <p style={{ color: "green" }}>Personal Information</p>
                            </div>
                            <hr />
                            <div className="">

                                <small className="text-muted">
                                    Applicant's Name : {values.applicantName}<br />
                                    Applicant's Name Bangla : {values.applicantNameBangla}<br />
                                    Applicant's DOB : {values.applicantDob}<br />
                                    Mother's Name : {values.motherName}<br />
                                    Mother's Name Bangla : {values.motherNameBangla}<br />
                                    Father's Name : {values.fatherName}<br />
                                    Father's Name Bangla : {values.fatherNameBangla}<br />
                                    Spouse Name : {values.spouseName}<br />
                                    Gender : {values.gender}<br />
                                    Profession : {values.profession}<br />
                                    Operator Type : {values.operatorType}<br />





                                </small>


                            </div>
                        </div>

                        {/* <div className=" col-sm-6 animated zoomIn" style={{ margin: "20px 0px" }}>
                            <div className="text-center">
                                <h3 style={{ color: "green" }}>NID Images</h3>
                            </div>
                            <hr />
                            
                        </div> */}

                    </div>


                    <hr />

                    <div className="row d-flex justify-content-center">
                        <div className="col-sm-6">
                            <Acordion
                                size={"col"}
                                heading={"Permanent Address Details"}
                                acBody={
                                    <div className="imTwoWhite">
                                        <small className="text-muted">
                                            Mouza Or Moholla : {values.perAdditionalMouzaOrMoholla + "(" + values.perAdditionalMouzaOrMohollaEn + ")"}<br />
                                            Village Or Road : {values.perAdditionalVillageOrRoad + "(" + values.perAdditionalVillageOrRoadEn + ")"}<br />
                                            City Corp. : {values.perCityCorporationOrMunicipality + "(" + values.perCityCorporationOrMunicipalityEn + ")"}<br />
                                            District : {values.perDistrict + "(" + values.perDistrictEn + ")"}<br />
                                            District Code : {values.perDistrictCode}<br />
                                            Division : {values.perDivision + "(" + values.perDivisionEn + ")"}<br />
                                            Home Or Holding No. : {values.perHomeOrHoldingNo + "(" + values.perHomeOrHoldingNoEn + ")"}<br />
                                            Post Office : {values.perPostOffice + "(" + values.perPostOfficeEn + ")"}<br />
                                            Postal Code : {values.perPostalCode + "(" + values.perPostalCodeEn + ")"}<br />
                                            Region : {values.perRegion + "(" + values.perRegionEn + ")"}<br />
                                            RMO : {values.perRmo + "(" + values.perRmoEn + ")"}<br />
                                            Union Or Ward : {values.perUnionOrWard + "(" + values.perUnionOrWardEn + ")"}<br />
                                            Union Or Ward Code : {values.perUnionOrWardCode}<br />
                                            Upozila : {values.perUpozila + "(" + values.perUpozilaEn + ")"}<br />
                                            Upozila Code : {values.perUpozilaCode}<br />
                                            Ward For Union Porishod : {values.perWardForUnionPorishod + "(" + values.perWardForUnionPorishodEn + ")"}<br />
                                        </small>

                                    </div>
                                }
                            />
                        </div>

                        <div className="col-sm-6">
                            <Acordion
                                size={"col"}
                                heading={"Present Address Details"}
                                acBody={
                                    <div className="imTwoWhite">
                                        <small className="text-muted">
                                            Mouza Or Moholla : {values.preAdditionalMouzaOrMoholla + "(" + values.preAdditionalMouzaOrMohollaEn + ")"}<br />
                                            Village Or Road : {values.preAdditionalVillageOrRoad + "(" + values.preAdditionalVillageOrRoadEn + ")"}<br />
                                            City Corp. : {values.preCityCorporationOrMunicipality + "(" + values.preCityCorporationOrMunicipalityEn + ")"}<br />
                                            District : {values.preDistrict + "(" + values.preDistrictEn + ")"}<br />
                                            District Code : {values.preDistrictCode}<br />
                                            Division : {values.preDivision + "(" + values.preDivisionEn + ")"}<br />
                                            Home Or Holding No. : {values.preHomeOrHoldingNo + "(" + values.preHomeOrHoldingNoEn + ")"}<br />
                                            Post Office : {values.prePostOffice + "(" + values.prePostOfficeEn + ")"}<br />
                                            Postal Code : {values.prePostalCode + "(" + values.prePostalCodeEn + ")"}<br />
                                            Region : {values.preRegion + "(" + values.preRegionEn + ")"}<br />
                                            RMO : {values.preRmo + "(" + values.preRmoEn + ")"}<br />
                                            Union Or Ward : {values.preUnionOrWard + "(" + values.preUnionOrWardEn + ")"}<br />
                                            Union Or Ward Code : {values.preUnionOrWardCode}<br />
                                            Upozila : {values.preUpozila + "(" + values.preUpozilaEn + ")"}<br />
                                            Upozila Code : {values.preUpozilaCode}<br />
                                            Ward For Union Porishod : {values.preWardForUnionPorishod + "(" + values.preWardForUnionPorishodEn + ")"}<br />



                                        </small>

                                    </div>
                                }
                            />
                        </div>
                    </div>
                    <hr />

                    <div className="row d-flex justify-content-center">
                        <div className="imTwo text-center col-sm-3">
                            <div className="im">
                                <small>NID Front</small>
                            </div>

                            <img src={values.NidFront ? values.flag + values.NidFront : front}
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
                                <small>NID Back</small>
                            </div>

                            <img src={values.NidBack ? values.flag + values.NidBack : back}
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
                                <small>Profile Image</small>
                            </div>

                            <img src={values.faceImage ? values.flag + values.faceImage : Avater}
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

                        <div className="imTwo text-center col-sm-3">
                            <div className="im">
                                <small>Signature</small>
                            </div>

                            <img src={values.signature ? values.flag + values.signature : Sign}
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
                    </div>

                    <hr />


                    <div class="col-sm-12">
                        <div className="col-sm-12 im">
                            <p style={{ color: "green" }}>Nominee Details</p>
                        </div>
                        <div className="row d-flex justify-content-center">


                            {values.jointArray.map((val, i) => (
                                val.isShow === true ?
                                    // Major
                                    <div className="col-sm-6 ">
                                        <div className="im">
                                            <small style={{ color: "green" }}>Nominee {i + 1}</small>
                                        </div>
                                        <small className="text-muted">
                                            Nominee : {val.nominee},<br />
                                                    Relation : {val.relation},<br />
                                                    percentage : {val.percentage}&#37;
                                        </small >

                                    </div>
                                    :
                                    // Minor

                                    <div className="col-sm-6 ">

                                        <div className="im">
                                            <small style={{ color: "green" }}>Nominee {i + 1}</small>
                                        </div>

                                        <small className="text-muted">
                                            Minor Nominee : {val.minorNominee}<br />
                                        Minor Nominee Date of Birth : {val.minorDob}<br />
                                        Minor Nominee Relation With Account Holder: {val.minorRelationWAccH}<br />
                                        Percentage : {val.minorPercentage}<br />
                                        Minor Nominee Guardian NID No : {val.minorGuardianNid}<br />
                                        Minor Nominee Guardian Name : {val.minorGuardianName}<br />
                                        Guardian Relation with Minor Nominee : {val.guardianRelationWMinor}<br />
                                        Guardian Address : {val.minorGuardianAddress}<br />

                                        </small >




                                    </div>
                            ))}



                        </div>
                        <hr />

                        <div className="row d-flex justify-content-center">
                            {
                                values.jointArray.map((val, i) => (
                                    val.isShow === true ? (
                                        <div className="imTwo text-center col-sm-3">
                                            <div className="im">
                                                <small>Adult Nominee {i + 1}</small>
                                            </div>

                                            <img src={val.photograph ? values.flag + val.photograph : adult}
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
                                    ) : (
                                            <React.Fragment>
                                                <div className="imTwo text-center col-sm-3">
                                                    <div className="im">
                                                        <small>Minor Nominee {i + 1}</small>
                                                    </div>

                                                    <img src={val.minorNomineePhoto ? values.flag + val.minorNomineePhoto : child}
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
                                                        <small>Nominee's Guardian {i + 1}</small>
                                                    </div>

                                                    <img src={val.minorPhotoGuardian ? values.flag + val.minorPhotoGuardian : guardian}
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
                                            </React.Fragment>
                                        )
                                ))
                            }

                        </div>



                    </div>


                    {
                        values.confirmFlag ? <Loading /> : ''
                    }

                    <br />

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

export default Confirm;
