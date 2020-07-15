import React, { Component } from 'react';
import { formatDate } from '../utils/DateFormat';
import Avater from '../images/user-two.svg';
import front from '../images/id-front-three.svg';
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import {simplifiedJointAPI, simplifiedJointAddAPI} from '../../Url/ApiList';
import Loading from '../utils/CustomLoding/Loading';
import back from '../images/id-back-three.svg';
import Sign from '../images/signature.svg';
import adult from '../images/age-limit-one.svg';
import child from '../images/age-limit-two.svg';

export class JointFingerConfirm extends Component {
   

    continue = async(e) => {
        const { values } = this.props;
        e.preventDefault();
        //Process form//
        console.log(values.applicantEkycId);
        if(values.applicantEkycId === ''){


        let accountInfo = {
            title: values.applicantName,
            type: values.accountType,
            productType: values.product,
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
            spouseName: values.spouseName,
            gender: values.gender,
            profession: values.profession,
            mobile: values.mobileNumber,
            presentAddress: values.presentAddress,
            permanentAddress: values.permanentAddress,
            permanentAddressBangla: values.permanentAddressBangla,
            verificationType: "FINGER"
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

        let applicantFileInfo ={
            nidFront:values.NidFront,
            nidBack:values.NidFront,
            photo:values.faceImage,
            signature:values.signature
        }

        let nomineesInfo =[];
        for(let i =0; i< values.jointArray.length; i++){  
            if(values.jointArray[i].isShow === true){
                let nomineeObj={
                name: values.jointArray[i].nominee,
                relation:values.jointArray[i].relation,
                dob: values.jointArray[i].dob ? new Date(values.jointArray[i].dob).toISOString() : '',
                photo: values.jointArray[i].photograph,
                isMinor: !(values.jointArray[i].isShow) ,
                percentage: parseInt(values.jointArray[i].percentage)
            }
            nomineesInfo.push(nomineeObj);
            }else{
                let guardianInfo ={
                    nid:values.jointArray[i].minorGuardianNid,
                    name:values.jointArray[i].minorGuardianName,
                    relation:values.jointArray[i].guardianRelationWMinor,
                    address:values.jointArray[i].minorGuardianAddress,
                    photo:values.jointArray[i].minorPhotoGuardian
                }

                let nomineeObj={
                    name:values.jointArray[i].minorNominee,
                    relation:values.jointArray[i].minorRelationWAccH,
                    dob: values.jointArray[i].minorDob ? new Date(values.jointArray[i].minorDob).toISOString() : '',
                    //dob: convertminorIso,
                    photo:values.jointArray[i].minorNomineePhoto,
                    isMinor:!(values.jointArray[i].isShow),
                    percentage:parseInt(values.jointArray[i].minorPercentage),
                    guardian:guardianInfo
                }
                nomineesInfo.push(nomineeObj);

            }
            
        }

        let fingerObj = {
            rIndex: values.rIndex
        }

        console.log("Finger Obj===========>", fingerObj)
        
        let confirmObj ={
            account:accountInfo ,
            applicant:applicantInfo ,
            applicantFile: applicantFileInfo,
            applicantPresentAddress: applicantPresentInfo,
            applicantPermanentAddress: applicantPermanentInfo,
            nominees:nomineesInfo,
            fingerprint: fingerObj
        }
        console.log("Confirm obj", confirmObj);

        const config = {
            headers: {
                'x-verification-token': values.verifyToken,
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };

        try{

         this.props.handleState('confirmFlag', true);
         let responseFirst = await axios.post(simplifiedJointAPI, confirmObj, config);
         console.log("responseforFIRST", responseFirst.data);
         this.props.handleState('confirmFlag', false);
         let data = responseFirst.data;
         let statusCode= data.statusCode;
         let successMessage = data.message;
         
         let resAccountId=  responseFirst.data.data.accountId;
         this.props.handleState('applicantEkycId', resAccountId);
         localStorage.setItem("accountId", JSON.stringify(resAccountId));
         NotificationManager.success(statusCode + " " + successMessage, "Success", 5000);
         this.props.nextStep();
        
        } catch (error) {
            
            this.props.handleState('confirmFlag', false);
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

    }
    else{

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
            spouseName: values.spouseName,
            gender: values.gender,
            profession: values.profession,
            mobile: values.mobileNumber,
            presentAddress: values.presentAddress,
            permanentAddress: values.permanentAddress,
            permanentAddressBangla: values.permanentAddressBangla,
            verificationType: 'FINGER'
        }

        let applicantFileInfo ={
            nidFront:values.NidFront,
            nidBack:values.NidFront,
            photo:values.faceImage,
            signature:values.signature
        }

        let nomineesInfo =[];
        for(let i =0; i< values.jointArray.length; i++){  
            if(values.jointArray[i].isShow === true){
                let nomineeObj={
                name: values.jointArray[i].nominee,
                relation:values.jointArray[i].relation,
                dob: new Date(values.jointArray[i].dob).toISOString(),
                photo: values.jointArray[i].photograph,
                isMinor: !(values.jointArray[i].isShow) ,
                percentage: parseInt(values.jointArray[i].percentage)
            }
            nomineesInfo.push(nomineeObj);
            }else{
                let guardianInfo ={
                    nid:values.jointArray[i].minorGuardianNid,
                    name:values.jointArray[i].minorGuardianName,
                    relation:values.jointArray[i].guardianRelationWMinor,
                    address:values.jointArray[i].minorGuardianAddress,
                    photo:values.jointArray[i].minorPhotoGuardian
                }

                let nomineeObj={
                    name:values.jointArray[i].minorNominee,
                    relation:values.jointArray[i].minorRelationWAccH,
                    dob: new Date(values.jointArray[i].minorDob).toISOString(),
                    //dob: convertminorIso,
                    photo:values.jointArray[i].minorNomineePhoto,
                    isMinor:!(values.jointArray[i].isShow),
                    percentage:parseInt(values.jointArray[i].minorPercentage),
                    guardian:guardianInfo
                }
                nomineesInfo.push(nomineeObj);

            }
            
        }

        let fingerObj = {
            rIndex: values.rIndex
        }
        
        let confirmObjSecond ={
            accountId:accountIdInfo,
            applicant:applicantInfo,
            applicantFile:applicantFileInfo,
            nominees:nomineesInfo,
            fingerprint: fingerObj
        }

        console.log('SecondApi', confirmObjSecond);

        const config = {
            headers: {
                'x-verification-token': values.verifyToken,
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };

        try{
            this.props.handleState('confirmFlag', true);
            let resJointAdded = await axios.post(simplifiedJointAddAPI, confirmObjSecond, config);
            this.props.handleState('confirmFlag', false);
            console.log(resJointAdded.data);
            
            let respStatus = resJointAdded.data.statusCode;
            let respMessage =resJointAdded.data.message;
            NotificationManager.success(respStatus + " " + respMessage, "Success", 5000);
            this.props.nextStep();
        }catch (error){
            
            this.props.handleState('confirmFlag', false);
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
                    <div class="row card-body d-flex justify-content-around">
                        <div className="col-sm-5 animated zoomIn" style={{ margin: "20px 0px" }}>
                            <div className="">
                                <h1 style={{ color: "green" }}>Account Details</h1>
                            </div>
                            <hr />
                            <div className="">
                                <p className="text-muted">Account Type : {values.accountType},<br /> Product and Services : {values.product},<br /> channel Name : {values.channelName}</p>
                                {/* <p className="text-muted">Product and Services : {accountData.product}</p>
                                <p className="text-muted">channel Name : {accountData.channelName}</p> */}
                            </div>
                            <hr />
                        </div>


                        <div className=" col-sm-5 animated zoomIn" style={{ margin: "20px 0px" }}>
                            <div className="text-center">
                                <h1 style={{ color: "green" }}>Applicant Image</h1>
                            </div>
                            <hr />
                            <div className="text-center" style={{ margin: "20px 0px" }}>

                                <img src={values.faceImage ? values.flag + values.faceImage : Avater}
                                    style={{
                                        margin: "0 auto",
                                        width: "200px",
                                        height: "150px",
                                        border: "none"

                                    }}
                                    className="img-fluid img-thumbnail"
                                />
                                <hr />


                            </div>
                        </div>

                        <div className="col-sm-5 animated zoomIn" style={{ margin: "20px 0px" }}>
                            <div className="">
                                <h1 style={{ color: "green" }}>Personal Information</h1>
                            </div>
                            <hr />
                            <div className="">

                                <p className="text-muted">Applicant's Name : {values.applicantName}</p>
                                <p className="text-muted">Applicant's Name Bangla : {values.applicantNameBangla}</p>
                                <p className="text-muted">Applicant's DOB : {values.applicantDob}</p>
                                <p className="text-muted">Mother's Name : {values.motherName}</p>
                                <p className="text-muted">Mother's Name Bangla : {values.motherNameBangla}</p>
                                <p className="text-muted">Father's Name : {values.fatherName}</p>
                                <p className="text-muted">Father's Name Bangla : {values.fatherNameBangla}</p>
                                <p className="text-muted">Spouse Name : {values.spouseName}</p>
                                <p className="text-muted">Gender : {values.gender}</p>
                                <p className="text-muted">Profession : {values.profession}</p>
                                <p className="text-muted">Mobile Phone Number : {values.mobileNumber}</p>
                                <p className="text-muted">Present Address : {values.presentAddress}</p>
                                <p className="text-muted">Permanent Address : {values.permanentAddress}</p>
                                <p className="text-muted">Permanent Address Bangla : {values.permanentAddressBangla}</p>
                                <p className="text-muted">Operator Type : {values.operatorType}</p>

                            </div>
                        </div>




                        <div className=" col-sm-5 animated zoomIn" style={{ margin: "20px 0px" }}>
                            <div className="text-center">
                                <h1 style={{ color: "green" }}>NID Images</h1>
                            </div>
                            <hr />
                            <div className="text-center" style={{ margin: "20px 0px" }}>
                                <div className="">
                                    <h5>NID Front</h5>
                                </div>

                                <img src={values.NidFront ? values.flag + values.NidFront : front}
                                    style={{
                                        margin: "0 auto",
                                        width: "300px",
                                        height: "200px",
                                        border: "none",
                                    }}
                                    className="img-fluid img-thumbnail"
                                />
                                <hr />


                            </div>
                            <div className="text-center" style={{ margin: "20px 0px" }}>
                                <div className="">
                                    <h5>NID Back</h5>
                                </div>

                                <img src={values.NidBack ? values.flag + values.NidBack : back}
                                    style={{
                                        margin: "0 auto",
                                        width: "300px",
                                        height: "200px",
                                        border: "none",
                                    }}
                                    className="img-fluid img-thumbnail"
                                />
                                <hr />


                            </div>
                        </div>


                        <div className="col-sm-5 animated zoomIn" style={{ margin: "20px 0px" }}>

                            <div className="">
                                <h1 style={{ color: "green" }}>Nominee Details</h1>
                            </div>
                            <hr />
                            <div className="">
                                {values.jointArray.map((val, i) => (
                                    val.isShow === true ?
                                        // Major
                                        <div>
                                            <p className="text-muted">Nominee {i + 1}, <br />
                                            Picture :   <img src={val.photograph ? values.flag + val.photograph : adult} alt="" style={{ width: "300px", height: "200px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                                 ,<br />
                                            Nominee : {val.nominee},<br />
                                            Relation : {val.relation},<br />



                                            percentage : {val.percentage}&#37;
                                            </p >
                                            <hr />
                                        </div>
                                        :
                                        // Minor

                                        <div>

                                            <p className="text-muted">Nominee {i + 1}</p >
                                            <p className="text-muted">Minor Nominee : {val.minorNominee}</p>
                                            <p className="text-muted">Minor Nominee Date of Birth : {val.minorDob}</p>
                                            <p className="text-muted">Minor Nominee Relation With Account Holder: {val.minorRelationWAccH}</p>
                                            <p className="text-muted">Photograph of Minor Nominee :
                                                <img src={val.minorNomineePhoto ? values.flag + val.minorNomineePhoto : child} alt="" style={{ width: "300px", height: "200px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                            </p>
                                            
                                            <p className="text-muted">Percentage : {val.minorPercentage}</p>

                                            <p className="text-muted">Minor Nominee Guardian NID No : {val.minorGuardianNid}</p>
                                            <p className="text-muted">Minor Nominee Guardian Name : {val.minorGuardianName}</p>
                                            <p className="text-muted">Guardian Relation with Minor Nominee : {val.guardianRelationWMinor}</p>
                                            <p className="text-muted"> Guardian Address : {val.minorGuardianAddress}</p>
                                            <p className="text-muted">Photograph of Guardian :
                                                <img src={val.minorPhotoGuardian ? values.flag + val.minorPhotoGuardian : child} alt="" style={{ width: "300px", height: "200px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                            </p>

                                            <hr />
                                        </div>
                                ))}

                            </div>
                        </div>



                        <div className=" col-sm-5 animated zoomIn" style={{ margin: "20px 0px" }}>
                            <div className="text-center">
                                <h1 style={{ color: "green" }}>Applicant Signature</h1>
                            </div>
                            <hr />
                            <div className="text-center" style={{ margin: "20px 0px" }}>

                                <img src={values.signature ? values.flag + values.signature : Sign}
                                    style={{
                                        margin: "0 auto",
                                        width: "200px",
                                        height: "200px",
                                        border: "none"

                                    }}
                                    className="img-fluid img-thumbnail"
                                />
                                <hr />


                            </div>
                        </div>


                    </div>

                    {
                        values.confirmFlag ? <Loading/> : ''
                    }

                    <br/>

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
