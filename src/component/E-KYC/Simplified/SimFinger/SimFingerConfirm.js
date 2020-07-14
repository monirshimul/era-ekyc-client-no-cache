import React, { Component } from 'react';
import axios from 'axios';
import { confirmApi } from '../../Url/ApiList';
import { NotificationManager } from "react-notifications";
import Family from '../images/family.svg';
import Avater from '../images/user-two.svg';
import front from '../images/id-front-three.svg';
import Loading from '../utils/CustomLoding/Loading';
import back from '../images/id-back-three.svg';
import Sign from '../images/signature.svg';
import Familyes from '../images/candidates.svg';
import adult from '../images/age-limit-one.svg';
import child from '../images/age-limit-two.svg';

export class SimFingerConfirm extends Component {

    continue = async (e) => {

        let { values } = this.props;
        e.preventDefault();

        let accountInfo = {
            title: values.applicantName,
            type: values.accountType,
            productType: values.product,
            productCategoryCode:values.product,
            branchOrAgentPointCode:"",
            transactionOrMaturityAmount:values.transactionOrMaturityAmount,
            productCode: values.productName,
            channelCode: values.channelName
        }

        let applicantInfo = {
            nid: values.applicantNidNo,
            name: values.applicantName,
            nameBangla: values.applicantNameBangla,
            dob: values.applicantDob,
            dobDate: values.applicantDob ? new Date(values.applicantDob).toISOString() : '',
            motherName: values.motherName,
            motherNameBangla: values.motherNameBangla,
            fatherName: values.fatherName,
            fatherNameBangla: values.fatherNameBangla,
           // spouseName: values.spouseName,
            gender: values.gender,
            profession: values.profession,
            mobile: values.mobileNumber,
            verificationType: "FINGER"
        }

        if(values.spouseName !== '' ) applicantInfo.spouseName = values.spouseName;

        let applicantPresentInfo = {
            addressType: "PRESENT",
            district:values.preDistrict,
            upozila:values.preUpozila,
            unionOrWard:values.preUnionOrWard,
            districtEng:values.preDistrictEn,
            upozilaEng:values.preUpozilaEn,
            unionOrWardEng:values.preUnionOrWardEn 
        }

        let applicantPermanentInfo = {
            addressType: "PERMANENT",
            district:values.perDistrict,
            upozila:values.perUpozila,
            unionOrWard:values.perUnionOrWard,
            districtEng:values.perDistrictEn,
            upozilaEng:values.perUpozilaEn,
            unionOrWardEng:values.perUnionOrWardEn 
        }

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
        //console.log("fingerObj", fingerObj)



        let confirmObj = {
            account: accountInfo,
            applicant: applicantInfo,
            applicantFile: applicantFileInfo,
            applicantPresentAddress:applicantPresentInfo,
            applicantPermanentAddress:applicantPermanentInfo,
            nominees: nomineesInfo,
            fingerprint: fingerObj
        }

        const config = {
            headers: {
                'x-verification-token': values.verifyToken,
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };

        console.log("Token", config)

        try {
            this.props.handleState('confirmFlag', true);
            let res = await axios.post(confirmApi, confirmObj, config);
            this.props.handleState('confirmFlag', false);
            console.log(res.data);
            let resData = res.data;
            let statusCode = resData.statusCode;
            let successMessage = "Account Opening " + resData.message;
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

export default SimFingerConfirm;
