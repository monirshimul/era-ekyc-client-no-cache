import React, { Component } from 'react';
import { formatDate } from '../utils/DateFormat';
import {ProductCodeGetName,ProductCategoryType,AccountType,JointOperatorType,GenderForm} from '../../../Utils/fullFormConversion';
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { simplifiedJointAPI, simplifiedJointAddAPI } from '../../Url/ApiList';
import down from '../images/downArrow.svg';
import Avater from '../images/profile.svg';
import front from '../images/nid-f.svg';
import Loading from '../utils/CustomLoding/Loading';
import back from '../images/nid-f2.svg';
import Sign from '../images/signature2.svg';
import up from '../images/upArrow.svg';
import adult from '../images/adultNominee.svg';
import child from '../images/child2.svg';
import guardian from '../images/guardian.svg';
import Acordion from '../../Acordion/Acordion';


export class JointFingerConfirm extends Component {
    state={
        ProductCodetoName:""
    }

    async componentDidMount(){
        let data = await ProductCodeGetName(this.props.values.productName);
        this.setState({ProductCodetoName: data});
    }

    continue = async (e) => {
        const { values } = this.props;
        e.preventDefault();
        //Process form//
        //console.log(values.applicantEkycId);
        if (values.applicantEkycId === '') {

            let branchOrAgentPointCode = JSON.parse(sessionStorage.getItem("currentBranchOrAgentPointCode"));
           
            let accountInfo = {
                title: values.applicantName,
                type: values.accountType,
                productType: values.product,
                productCategoryCode: values.product,
                branchOrAgentPointCode: branchOrAgentPointCode,
                transactionOrMaturityAmount: values.transactionOrMaturityAmount,
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
                verificationType: "FINGER"
            }

            if (values.spouseName !== '') applicantInfo.spouseName = values.spouseName;

            let applicantPresentInfo = {
                addressType: "PRESENT",
                district: values.preDistrict.toString(),
                upozila: values.preUpozila.toString(),
                unionOrWard: values.preUnionOrWard.toString(),
                districtEng: values.preDistrictEn.toString(),
                upozilaEng: values.preUpozilaEn.toString(),
                unionOrWardEng: values.preUnionOrWardEn.toString()
            }

            if (values.preAdditionalMouzaOrMoholla !== '') applicantPresentInfo.additionalMouzaOrMoholla = values.preAdditionalMouzaOrMoholla.toString();
            if (values.preAdditionalVillageOrRoad !== '') applicantPresentInfo.additionalVillageOrRoad = values.preAdditionalVillageOrRoad.toString();
            if (values.preCityCorporationOrMunicipality !== '') applicantPresentInfo.cityCorporationOrMunicipality = values.preCityCorporationOrMunicipality.toString();
            if (values.preDistrictCode !== '') applicantPresentInfo.districtCode = values.preDistrictCode.toString();
            if (values.preUpozilaCode !== '') applicantPresentInfo.upozilaCode = values.preUpozilaCode.toString();
            if (values.preUnionOrWardCode !== '') applicantPresentInfo.unionCode = values.preUnionOrWardCode.toString();
            if (values.preDivision !== '') applicantPresentInfo.division = values.preDivision.toString();
            if (values.preHomeOrHoldingNo !== '') applicantPresentInfo.homeOrHoldingNo = values.preHomeOrHoldingNo.toString();
            if (values.prePostOffice !== '') applicantPresentInfo.postOffice = values.prePostOffice.toString();
            if (values.preRegion !== '') applicantPresentInfo.region = values.preRegion.toString();
            if (values.prePostalCode !== '') applicantPresentInfo.postalCode = values.prePostalCode.toString();
            if (values.preRmo !== '') applicantPresentInfo.rmo = values.preRmo.toString();
            if (values.preWardForUnionPorishod !== '') applicantPresentInfo.wardForUnionPorishod = values.preWardForUnionPorishod.toString();
            if (values.preAdditionalMouzaOrMohollaEn !== '') applicantPresentInfo.additionalMouzaOrMohollaEng = values.preAdditionalMouzaOrMohollaEn.toString();
            if (values.preAdditionalVillageOrRoadEn !== '') applicantPresentInfo.additionalVillageOrRoadEng = values.preAdditionalVillageOrRoadEn.toString();
            if (values.preCityCorporationOrMunicipalityEn !== '') applicantPresentInfo.cityCorporationOrMunicipalityEng = values.preCityCorporationOrMunicipalityEn.toString();
            if (values.preDivisionEn !== '') applicantPresentInfo.divisionEng = values.preDivisionEn.toString();
            if (values.preHomeOrHoldingNoEn !== '') applicantPresentInfo.homeOrHoldingNoEng = values.preHomeOrHoldingNoEn.toString();
            if (values.prePostOfficeEn !== '') applicantPresentInfo.postOfficeEng = values.prePostOfficeEn.toString();
            if (values.preRegionEn !== '') applicantPresentInfo.regionEng = values.preRegionEn.toString();


            let applicantPermanentInfo = {
                addressType: "PERMANENT",
                district: values.perDistrict.toString(),
                upozila: values.perUpozila.toString(),
                unionOrWard: values.perUnionOrWard.toString(),
                districtEng: values.perDistrictEn.toString(),
                upozilaEng: values.perUpozilaEn.toString(),
                unionOrWardEng: values.perUnionOrWardEn.toString()
            }

            if (values.perAdditionalMouzaOrMoholla !== '') applicantPermanentInfo.additionalMouzaOrMoholla = values.perAdditionalMouzaOrMoholla.toString();
            if (values.perAdditionalVillageOrRoad !== '') applicantPermanentInfo.additionalVillageOrRoad = values.perAdditionalVillageOrRoad.toString();
            if (values.perCityCorporationOrMunicipality !== '') applicantPermanentInfo.cityCorporationOrMunicipality = values.perCityCorporationOrMunicipality.toString();
            if (values.perDistrictCode !== '') applicantPermanentInfo.districtCode = values.perDistrictCode.toString();
            if (values.perUpozilaCode !== '') applicantPermanentInfo.upozilaCode = values.perUpozilaCode.toString();
            if (values.perUnionOrWardCode !== '') applicantPermanentInfo.unionCode = values.perUnionOrWardCode.toString();
            if (values.perDivision !== '') applicantPermanentInfo.division = values.perDivision.toString();
            if (values.perHomeOrHoldingNo !== '') applicantPermanentInfo.homeOrHoldingNo = values.perHomeOrHoldingNo.toString();
            if (values.perPostOffice !== '') applicantPermanentInfo.postOffice = values.perPostOffice.toString();
            if (values.perRegion !== '') applicantPermanentInfo.region = values.perRegion.toString();
            if (values.perPostalCode !== '') applicantPermanentInfo.postalCode = values.perPostalCode.toString();
            if (values.perRmo !== '') applicantPermanentInfo.rmo = values.perRmo.toString();
            if (values.perWardForUnionPorishod !== '') applicantPermanentInfo.wardForUnionPorishod = values.perWardForUnionPorishod.toString();
            if (values.perAdditionalMouzaOrMohollaEn !== '') applicantPermanentInfo.additionalMouzaOrMohollaEng = values.perAdditionalMouzaOrMohollaEn.toString();
            if (values.perAdditionalVillageOrRoadEn !== '') applicantPermanentInfo.additionalVillageOrRoadEng = values.perAdditionalVillageOrRoadEn.toString();
            if (values.perCityCorporationOrMunicipalityEn !== '') applicantPermanentInfo.cityCorporationOrMunicipalityEng = values.perCityCorporationOrMunicipalityEn.toString();
            if (values.perDivisionEn !== '') applicantPermanentInfo.divisionEng = values.perDivisionEn.toString();
            if (values.perHomeOrHoldingNoEn !== '') applicantPermanentInfo.homeOrHoldingNoEng = values.perHomeOrHoldingNoEn.toString();
            if (values.perPostOfficeEn !== '') applicantPermanentInfo.postOfficeEng = values.perPostOfficeEn.toString();
            if (values.perRegionEn !== '') applicantPermanentInfo.regionEng = values.perRegionEn.toString();

            let applicantFileInfo = {
                nidFront: values.NidFront,
                nidBack: values.NidBack,
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

            let fingerObj = {
                rIndex: values.rIndex
            }

           // console.log("Finger Obj===========>", fingerObj)

            let confirmObj = {
                account: accountInfo,
                applicant: applicantInfo,
                applicantFile: applicantFileInfo,
                applicantPresentAddress: applicantPresentInfo,
                applicantPermanentAddress: applicantPermanentInfo,
                nominees: nomineesInfo,
                fingerprint: fingerObj
            }
            console.log("Confirm obj", confirmObj);

            const config = {
                headers: {
                    'x-verification-token': values.verifyToken,
                    'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

                }
            };

            try {

                this.props.handleState('confirmFlag', true);
                let responseFirst = await axios.post(simplifiedJointAPI, confirmObj, config);
                //console.log("responseforFIRST", responseFirst.data);
                this.props.handleState('confirmFlag', false);
                let data = responseFirst.data;
                let statusCode = data.statusCode;
                let successMessage = data.message;

                let resAccountId = responseFirst.data.data.accountId;
                this.props.handleState('applicantEkycId', resAccountId);
                sessionStorage.setItem("accountId", JSON.stringify(resAccountId));
                NotificationManager.success(statusCode + " " + successMessage, "Success", 5000);
                this.props.nextStep();

            } catch (error) {
                console.log(error);
                this.props.handleState('confirmFlag', false);
                if (error.response) {
                    let message = error.response.data.message
                    console.log("Error", error.response)
                    NotificationManager.error(message, "Error", 5000);
                } else if (error.request) {
                    //console.log("Error Connecting...", error.request)
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
                verificationType: 'FINGER'
            }

            if (values.spouseName !== '') applicantInfo.spouseName = values.spouseName;

            let applicantPresentInfo = {
                addressType: "PRESENT",
                district: values.preDistrict.toString(),
                upozila: values.preUpozila.toString(),
                unionOrWard: values.preUnionOrWard.toString(),
                districtEng: values.preDistrictEn.toString(),
                upozilaEng: values.preUpozilaEn.toString(),
                unionOrWardEng: values.preUnionOrWardEn.toString()
            }

            if (values.preAdditionalMouzaOrMoholla !== '') applicantPresentInfo.additionalMouzaOrMoholla = values.preAdditionalMouzaOrMoholla.toString();
            if (values.preAdditionalVillageOrRoad !== '') applicantPresentInfo.additionalVillageOrRoad = values.preAdditionalVillageOrRoad.toString();
            if (values.preCityCorporationOrMunicipality !== '') applicantPresentInfo.cityCorporationOrMunicipality = values.preCityCorporationOrMunicipality.toString();
            if (values.preDistrictCode !== '') applicantPresentInfo.districtCode = values.preDistrictCode.toString();
            if (values.preUpozilaCode !== '') applicantPresentInfo.upozilaCode = values.preUpozilaCode.toString();
            if (values.preUnionOrWardCode !== '') applicantPresentInfo.unionCode = values.preUnionOrWardCode.toString();
            if (values.preDivision !== '') applicantPresentInfo.division = values.preDivision.toString();
            if (values.preHomeOrHoldingNo !== '') applicantPresentInfo.homeOrHoldingNo = values.preHomeOrHoldingNo.toString();
            if (values.prePostOffice !== '') applicantPresentInfo.postOffice = values.prePostOffice.toString();
            if (values.preRegion !== '') applicantPresentInfo.region = values.preRegion.toString();
            if (values.prePostalCode !== '') applicantPresentInfo.postalCode = values.prePostalCode.toString();
            if (values.preRmo !== '') applicantPresentInfo.rmo = values.preRmo.toString();
            if (values.preWardForUnionPorishod !== '') applicantPresentInfo.wardForUnionPorishod = values.preWardForUnionPorishod.toString();
            if (values.preAdditionalMouzaOrMohollaEn !== '') applicantPresentInfo.additionalMouzaOrMohollaEng = values.preAdditionalMouzaOrMohollaEn.toString();
            if (values.preAdditionalVillageOrRoadEn !== '') applicantPresentInfo.additionalVillageOrRoadEng = values.preAdditionalVillageOrRoadEn.toString();
            if (values.preCityCorporationOrMunicipalityEn !== '') applicantPresentInfo.cityCorporationOrMunicipalityEng = values.preCityCorporationOrMunicipalityEn.toString();
            if (values.preDivisionEn !== '') applicantPresentInfo.divisionEng = values.preDivisionEn.toString();
            if (values.preHomeOrHoldingNoEn !== '') applicantPresentInfo.homeOrHoldingNoEng = values.preHomeOrHoldingNoEn.toString();
            if (values.prePostOfficeEn !== '') applicantPresentInfo.postOfficeEng = values.prePostOfficeEn.toString();
            if (values.preRegionEn !== '') applicantPresentInfo.regionEng = values.preRegionEn.toString();


            let applicantPermanentInfo = {
                addressType: "PERMANENT",
                district: values.perDistrict.toString(),
                upozila: values.perUpozila.toString(),
                unionOrWard: values.perUnionOrWard.toString(),
                districtEng: values.perDistrictEn.toString(),
                upozilaEng: values.perUpozilaEn.toString(),
                unionOrWardEng: values.perUnionOrWardEn.toString()
            }

            if (values.perAdditionalMouzaOrMoholla !== '') applicantPermanentInfo.additionalMouzaOrMoholla = values.perAdditionalMouzaOrMoholla.toString();
            if (values.perAdditionalVillageOrRoad !== '') applicantPermanentInfo.additionalVillageOrRoad = values.perAdditionalVillageOrRoad.toString();
            if (values.perCityCorporationOrMunicipality !== '') applicantPermanentInfo.cityCorporationOrMunicipality = values.perCityCorporationOrMunicipality.toString();
            if (values.perDistrictCode !== '') applicantPermanentInfo.districtCode = values.perDistrictCode.toString();
            if (values.perUpozilaCode !== '') applicantPermanentInfo.upozilaCode = values.perUpozilaCode.toString();
            if (values.perUnionOrWardCode !== '') applicantPermanentInfo.unionCode = values.perUnionOrWardCode.toString();
            if (values.perDivision !== '') applicantPermanentInfo.division = values.perDivision.toString();
            if (values.perHomeOrHoldingNo !== '') applicantPermanentInfo.homeOrHoldingNo = values.perHomeOrHoldingNo.toString();
            if (values.perPostOffice !== '') applicantPermanentInfo.postOffice = values.perPostOffice.toString();
            if (values.perRegion !== '') applicantPermanentInfo.region = values.perRegion.toString();
            if (values.perPostalCode !== '') applicantPermanentInfo.postalCode = values.perPostalCode.toString();
            if (values.perRmo !== '') applicantPermanentInfo.rmo = values.perRmo.toString();
            if (values.perWardForUnionPorishod !== '') applicantPermanentInfo.wardForUnionPorishod = values.perWardForUnionPorishod.toString();
            if (values.perAdditionalMouzaOrMohollaEn !== '') applicantPermanentInfo.additionalMouzaOrMohollaEng = values.perAdditionalMouzaOrMohollaEn.toString();
            if (values.perAdditionalVillageOrRoadEn !== '') applicantPermanentInfo.additionalVillageOrRoadEng = values.perAdditionalVillageOrRoadEn.toString();
            if (values.perCityCorporationOrMunicipalityEn !== '') applicantPermanentInfo.cityCorporationOrMunicipalityEng = values.perCityCorporationOrMunicipalityEn.toString();
            if (values.perDivisionEn !== '') applicantPermanentInfo.divisionEng = values.perDivisionEn.toString();
            if (values.perHomeOrHoldingNoEn !== '') applicantPermanentInfo.homeOrHoldingNoEng = values.perHomeOrHoldingNoEn.toString();
            if (values.perPostOfficeEn !== '') applicantPermanentInfo.postOfficeEng = values.perPostOfficeEn.toString();
            if (values.perRegionEn !== '') applicantPermanentInfo.regionEng = values.perRegionEn.toString();

            let applicantFileInfo = {
                nidFront: values.NidFront,
                nidBack: values.NidBack,
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

            let fingerObj = {
                rIndex: values.rIndex
            }

            let confirmObjSecond = {
                accountId: accountIdInfo,
                applicant: applicantInfo,
                applicantFile: applicantFileInfo,
                applicantPresentAddress: applicantPresentInfo,
                applicantPermanentAddress: applicantPermanentInfo,
                nominees: nomineesInfo,
                fingerprint: fingerObj
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
                console.log(error);
                this.props.handleState('confirmFlag', false);
                if (error.response) {
                    let message = error.response.data.message
                    console.log("Error", error.response)
                    NotificationManager.error(message, "Error", 5000);
                } else if (error.request) {
                  //  console.log("Error Connecting...", error.request)
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
                                <small className="" style={{ fontSize: "14px" }}>
                                    <span style={{ color: "green", fontSize: "14px" }}>Account Type :</span> {AccountType(values.accountType)},<br />
                                    <span style={{ color: "green", fontSize: "14px" }}>Product and Services :</span> {ProductCategoryType(values.product)},<br />
                                    <span style={{ color: "green", fontSize: "14px" }}>channel Name :</span> {values.channelName},<br />
                                    <span style={{ color: "green", fontSize: "14px" }}>Product Name :</span> {`${values.productName} (${this.state.ProductCodetoName})`},<br />
                                    <span style={{ color: "green", fontSize: "14px" }}>Transaction Amount :</span> {values.transactionOrMaturityAmount},<br />
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

                                <small className="" style={{ fontSize: "14px" }}>
                                    <span style={{ color: "green", fontSize: "14px" }}>Applicant's Name :</span> {values.applicantName}<br />
                                    <span style={{ color: "green", fontSize: "14px" }}>Applicant's Name Bangla :</span> {values.applicantNameBangla}<br />
                                    <span style={{ color: "green", fontSize: "14px" }}>Applicant's DOB :</span> {values.applicantDob}<br />
                                    <span style={{ color: "green", fontSize: "14px" }}>Mother's Name :</span> {values.motherName}<br />
                                    <span style={{ color: "green", fontSize: "14px" }}>Mother's Name Bangla :</span> {values.motherNameBangla}<br />
                                    <span style={{ color: "green", fontSize: "14px" }}>Father's Name :</span> {values.fatherName}<br />
                                    <span style={{ color: "green", fontSize: "14px" }}>Father's Name Bangla :</span> {values.fatherNameBangla}<br />
                                    <span style={{ color: "green", fontSize: "14px" }}>Spouse Name :</span> {values.spouseName}<br />
                                    <span style={{ color: "green", fontSize: "14px" }}>Gender :</span> {GenderForm(values.gender)}<br />
                                    <span style={{ color: "green", fontSize: "14px" }}>Profession :</span> {values.profession}<br />
                                    <span style={{ color: "green", fontSize: "14px" }}>Operator Type :</span> {JointOperatorType(values.operatorType)}<br />





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
                                        <small className="" style={{ fontSize: "14px" }}>
                                            <span style={{ color: "green", fontSize: "14px" }}>Mouza Or Moholla :</span> {values.perAdditionalMouzaOrMoholla + `${values.perAdditionalMouzaOrMohollaEn ? `(${values.perAdditionalMouzaOrMohollaEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Village Or Road :</span> {values.perAdditionalVillageOrRoad + `${values.perAdditionalVillageOrRoadEn ? `(${values.perAdditionalVillageOrRoadEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>City Corp. :</span> {values.perCityCorporationOrMunicipality + `${values.perCityCorporationOrMunicipalityEn ? `(${values.perCityCorporationOrMunicipalityEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>District :</span> {values.perDistrict + `${values.perDistrictEn ? `(${values.perDistrictEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>District Code :</span> {values.perDistrictCode}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Division :</span> {values.perDivision + `${values.perDivisionEn ? `(${values.perDivisionEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Home Or Holding No. :</span> {values.perHomeOrHoldingNo + `${values.perHomeOrHoldingNoEn ? `(${values.perHomeOrHoldingNoEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Post Office :</span> {values.perPostOffice + `${values.perPostOfficeEn ? `(${values.perPostOfficeEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Postal Code :</span> {values.perPostalCode + `${values.perPostalCodeEn ? `(${values.perPostalCodeEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Region :</span> {values.perRegion + `${values.perRegionEn ? `(${values.perRegionEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>RMO :</span> {values.perRmo + `${values.perRmoEn ? `(${values.perRmoEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward :</span> {values.perUnionOrWard + `${values.perUnionOrWardEn ? `(${values.perUnionOrWardEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward Code :</span> {values.perUnionOrWardCode}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Upozila :</span> {values.perUpozila + `${values.perUpozilaEn ? `(${values.perUpozilaEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Upozila Code :</span> {values.perUpozilaCode}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Ward For Union Porishod :</span> {values.perWardForUnionPorishod + `${values.perWardForUnionPorishodEn ? `(${values.perWardForUnionPorishodEn})` : "" }`}<br />
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
                                        <small className="" style={{ fontSize: "14px" }}>
                                            <span style={{ color: "green", fontSize: "14px" }}>Mouza Or Moholla :</span> {values.preAdditionalMouzaOrMoholla + `${values.preAdditionalMouzaOrMohollaEn ? `(${values.preAdditionalMouzaOrMohollaEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Village Or Road :</span> {values.preAdditionalVillageOrRoad + `${values.preAdditionalVillageOrRoadEn ? `(${values.preAdditionalVillageOrRoadEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>City Corp. :</span> {values.preCityCorporationOrMunicipality + `${values.preCityCorporationOrMunicipalityEn ? `(${values.preCityCorporationOrMunicipalityEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>District :</span> {values.preDistrict + `${values.preDistrictEn ? `(${values.preDistrictEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>District Code :</span> {values.preDistrictCode}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Division :</span> {values.preDivision + `${values.preDivisionEn ? `(${values.preDivisionEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Home Or Holding No. :</span> {values.preHomeOrHoldingNo + `${values.preHomeOrHoldingNoEn ? `(${values.preHomeOrHoldingNoEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Post Office :</span> {values.prePostOffice + `${values.prePostOfficeEn ? `(${values.prePostOfficeEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Postal Code :</span> {values.prePostalCode + `${values.prePostalCodeEn ? `(${values.prePostalCodeEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Region :</span> {values.preRegion + `${values.preRegionEn ? `(${values.preRegionEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>RMO :</span> {values.preRmo + `${values.preRmoEn ? `(${values.preRmoEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward :</span> {values.preUnionOrWard + `${values.preUnionOrWardEn ? `(${values.preUnionOrWardEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward Code :</span> {values.preUnionOrWardCode}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Upozila :</span> {values.preUpozila + `${values.preUpozilaEn ? `(${values.preUpozilaEn})` : "" }`}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Upozila Code :</span> {values.preUpozilaCode}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Ward For Union Porishod :</span> {values.preWardForUnionPorishod + `${values.preWardForUnionPorishodEn ? `(${values.preWardForUnionPorishodEn})` : "" }`}<br />
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
                                        <small className="" style={{ fontSize: "14px" }}>
                                            <span style={{ color: "green", fontSize: "14px" }}>Nominee :</span> {val.nominee},<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Relation :</span> {val.relation},<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>percentage :</span> {val.percentage}&#37;
                                        </small >

                                    </div>
                                    :
                                    // Minor

                                    <div className="col-sm-6 ">

                                        <div className="im">
                                            <small style={{ color: "green" }}>Nominee {i + 1}</small>
                                        </div>

                                        <small className="text-muted">
                                            <span style={{ color: "green", fontSize: "14px" }}>Minor Nominee :</span> {val.minorNominee}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Minor Nominee Date of Birth :</span> {val.minorDob}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Minor Nominee Relation With Account Holder:</span> {val.minorRelationWAccH}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Percentage :</span> {val.minorPercentage}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Minor Nominee Guardian NID No :</span> {val.minorGuardianNid}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Minor Nominee Guardian Name :</span> {val.minorGuardianName}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Guardian Relation with Minor Nominee :</span> {val.guardianRelationWMinor}<br />
                                            <span style={{ color: "green", fontSize: "14px" }}>Guardian Address :</span> {val.minorGuardianAddress}<br />

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
                        values.confirmFlag ? (
                            <div className="row d-flex justify-content-center align-items-center mt-3">
                                <Loading />
                            </div>
                        ) : ''
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

export default JointFingerConfirm;
