import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {confirmFaceApi} from '../../Url/ApiList';
import { NotificationManager } from "react-notifications";
import Account from '../Account';
import Family from '../images/family.svg'
import Avater from '../images/user-two.svg'
import front from '../images/id-front-three.svg'

import back from '../images/id-back-three.svg'
import Sign from '../images/signature.svg'
import Familyes from '../images/candidates.svg'
import adult from '../images/age-limit-one.svg'
import child from '../images/age-limit-two.svg'

export class ConfirmInfo extends Component {
    state = {
        // accountData:'' ,
        // nidImagesData: '',
        // captureFaceData:'' ,
        // personalDetailsData:'',
        // nomineeData:'' ,
        // signatureData:'' ,
        // flag: 'data:image/jpeg;base64,'
        accountData: JSON.parse(localStorage.getItem('accountInfo')),
        verificationData: JSON.parse(localStorage.getItem('VerificationType')),
        nidImagesData: JSON.parse(localStorage.getItem('NidImages')),
        captureFaceData: JSON.parse(localStorage.getItem('CaptureFace')),
        personalDetailsData: JSON.parse(localStorage.getItem('PersonalDetails')),
        nomineeData: JSON.parse(localStorage.getItem('NomineeArray')),
        signatureData: JSON.parse(localStorage.getItem('Signature')),
        verificationData: JSON.parse(localStorage.getItem('Verification')),
        flag: 'data:image/jpeg;base64,'
    }

    // componentDidMount(){
    //     this.setState({
    //     accountData: JSON.parse(localStorage.getItem('accountInfo')),
    //     nidImagesData: JSON.parse(localStorage.getItem('NidImages')),
    //     captureFaceData: JSON.parse(localStorage.getItem('CaptureFace')),
    //     personalDetailsData: JSON.parse(localStorage.getItem('PersonalDetails')),
    //     nomineeData: JSON.parse(localStorage.getItem('NomineeArray')),
    //     signatureData: JSON.parse(localStorage.getItem('Signature')),
    //     flag: 'data:image/jpeg;base64,'
    //     })
    // }

    continue = async(e) => {
        const { accountData, nidImagesData, captureFaceData, personalDetailsData, nomineeData, signatureData,verificationData } = this.state;
        e.preventDefault();
        let accountInfo = {
            title: personalDetailsData.applicantName,
            type: accountData.accountType,
            productType: accountData.product,
            productCode: "S01",
            channelCode: accountData.channelName
        }

        let dobDateFormat = personalDetailsData.applicantDob;
        let applicantInfo = {
            nid: personalDetailsData.applicantNidNo,
            name: personalDetailsData.applicantName,
            nameBangla: personalDetailsData.applicantNameBangla,
            dob: personalDetailsData.applicantDob,
            dobDate: personalDetailsData.applicantDobDate,
            motherName: personalDetailsData.motherName,
            motherNameBangla: personalDetailsData.motherNameBangla,
            fatherName: personalDetailsData.fatherName,
            fatherNameBangla: personalDetailsData.fatherNameBangla,
            spouseName: personalDetailsData.spouseName,
            gender: personalDetailsData.gender,
            profession: personalDetailsData.profession,
            mobile: personalDetailsData.mobileNumber,
            presentAddress: personalDetailsData.presentAddress,
            permanentAddress: personalDetailsData.permanentAddress,
            permanentAddressBangla: personalDetailsData.permanentAddressBangla,
            verificationType: verificationData.type
        }

        let applicantFileInfo ={
            nidFront:nidImagesData.NidFront,
            nidBack:nidImagesData.NidFront,
            photo:captureFaceData.faceImage,
            signature:signatureData.signature
        }

        let nomineesInfo =[];
        for(let i =0; i< nomineeData.length; i++){  
            if(nomineeData[i].isShow === true){
                let nomineeObj={
                name: nomineeData[i].nominee,
                relation:nomineeData[i].relation,
                dob: nomineeData[i].dob,
                photo: nomineeData[i].photograph,
                isMinor: !(nomineeData[i].isShow) ,
                percentage: parseInt(nomineeData[i].percentage)
            }
            nomineesInfo.push(nomineeObj);
            }else{
                let guardianInfo ={
                    nid:nomineeData[i].minorGuardianNid,
                    name:nomineeData[i].minorGuardianName,
                    relation:nomineeData[i].guardianRelationWMinor,
                    address:nomineeData[i].minorGuardianAddress,
                    photo:nomineeData[i].minorPhotoGuardian
                }

                let nomineeObj={
                    name:nomineeData[i].minorNominee,
                    relation:nomineeData[i].minorRelationWAccH,
                    dob:nomineeData[i].minorDob,
                    photo:nomineeData[i].minorNomineePhoto,
                    isMinor:!(nomineeData[i].isShow),
                    percentage:parseInt(nomineeData[i].minorPercentage),
                    guardian:guardianInfo
                }
                nomineesInfo.push(nomineeObj);

            }
            
        }
        
        let confirmObj ={
            account:accountInfo ,
            applicant:applicantInfo ,
            applicantFile: applicantFileInfo,
            nominees:nomineesInfo
        }

        // console.log("confirm", confirmObj);
       // console.log(JSON.stringify(confirmObj));

        const config =  {
            headers: {
                'x-verification-token': JSON.parse(sessionStorage.getItem('x-verification-token')),
            'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            
            } 
         };

        try{
        let res = await axios.post(confirmFaceApi,confirmObj,config);
        console.log(res.data);
         let resData =res.data;
         let statusCode = resData.statusCode;
         let successMessage = "Account Opening "+ resData.message;
         NotificationManager.success(statusCode +" "+ successMessage ,"Success", 5000);
         localStorage.clear();
        this.props.history.replace('/dashboard/complete');

        }catch(err){
            console.log(err.response);
            let statusCodeError = err.response.data.statusCode;
            let messageError = err.response.data.message;
            NotificationManager.error(statusCodeError +" "+ messageError ,"Error", 5000);
        }


        
    }

    back = e => {
        e.preventDefault();
        this.props.history.push('/dashboard/signature');
    }





    render() {
        if (localStorage.length === 0) {
            return <Account />;
        }
        console.log("personalDetailsData",this.state.personalDetailsData)
        let { accountData, nidImagesData, captureFaceData, personalDetailsData, nomineeData, signatureData, flag } = this.state;
        // console.log("Nominee data", nomineeData);
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
                                <p className="text-muted">Account Type : {accountData.accountType},<br /> Product and Services : {accountData.product},<br /> channel Name : {accountData.channelName}</p>
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

                                <img src={captureFaceData.faceImage ? flag + captureFaceData.faceImage : Avater}
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

                                <p className="text-muted">Applicant's Name : {personalDetailsData.applicantName}</p>
                                <p className="text-muted">Applicant's Name Bangla : {personalDetailsData.applicantNameBangla}</p>
                                <p className="text-muted">Applicant's DOB : {personalDetailsData.applicantDob}</p>
                                <p className="text-muted">Mother's Name : {personalDetailsData.motherName}</p>
                                <p className="text-muted">Mother's Name Bangla : {personalDetailsData.motherNameBangla}</p>
                                <p className="text-muted">Father's Name : {personalDetailsData.fatherName}</p>
                                <p className="text-muted">Father's Name Bangla : {personalDetailsData.fatherNameBangla}</p>
                                <p className="text-muted">Spouse Name : {personalDetailsData.spouseName}</p>
                                <p className="text-muted">Gender : {personalDetailsData.gender}</p>
                                <p className="text-muted">Profession : {personalDetailsData.profession}</p>
                                <p className="text-muted">Mobile Phone Number : {personalDetailsData.mobileNumber}</p>
                                <p className="text-muted">Present Address : {personalDetailsData.presentAddress}</p>
                                <p className="text-muted">Permanent Address : {personalDetailsData.permanentAddress}</p>
                                <p className="text-muted">Permanent Address Bangla : {personalDetailsData.permanentAddressBangla}</p>

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

                                <img src={nidImagesData.NidFront ? flag + nidImagesData.NidFront : front}
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

                                <img src={nidImagesData.NidBack ? flag + nidImagesData.NidBack : back}
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
                                {nomineeData.map((val, i) => (
                                    val.isShow === true ?
                                        // Major
                                        <div>
                                            <p className="text-muted">Nominee {i + 1}, <br />
                                            Picture :   <img src={nomineeData[i].photograph ? flag + nomineeData[i].photograph : adult} alt="" style={{ width: "300px", height: "200px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                                 ,<br />
                                            Nominee : {nomineeData[i].nominee},<br />
                                            Relation : {nomineeData[i].relation},<br />



                                            percentage : {nomineeData[i].percentage}&#37;
                                            </p >
                                            {/* <p className="text-muted">Nominee : {nomineeData[i].nominee}</p>
                                            <p className="text-muted">Relation : {nomineeData[i].relation}</p>
                                            <p className="text-muted">Picture :
                                    <img src={flag + nomineeData[i].photograph} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                            </p> */}
                                            {/* <p className="text-muted">Photograph : {nomineeData[i].photograph}</p> */}
                                            {/* <p className="text-muted">percentage : {nomineeData[i].percentage}&#37;</p> */}
                                            <hr />
                                        </div>
                                        :
                                        // Minor

                                        <div>

                                            <p className="text-muted">Nominee {i + 1}</p >
                                            <p className="text-muted">Minor Nominee : {nomineeData[i].minorNominee}</p>
                                            <p className="text-muted">Minor Nominee Date of Birth : {nomineeData[i].minorDob}</p>
                                            <p className="text-muted">Minor Nominee Relation With Account Holder: {nomineeData[i].minorRelationWAccH}</p>
                                            <p className="text-muted">Photograph of Minor Nominee :
                                                <img src={nomineeData[i].minorNomineePhoto ? flag + nomineeData[i].minorNomineePhoto : child} alt="" style={{ width: "300px", height: "200px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                            </p>
                                            
                                            <p className="text-muted">Percentage : {nomineeData[i].minorPercentage}</p>

                                            <p className="text-muted">Minor Nominee Guardian NID No : {nomineeData[i].minorGuardianNid}</p>
                                            <p className="text-muted">Minor Nominee Guardian Name : {nomineeData[i].minorGuardianName}</p>
                                            <p className="text-muted">Guardian Relation with Minor Nominee : {nomineeData[i].guardianRelationWMinor}</p>
                                            <p className="text-muted"> Guardian Address : {nomineeData[i].minorGuardianAddress}</p>
                                            <p className="text-muted">Photograph of Guardian :
                                                <img src={nomineeData[i].minorPhotoGuardian ? flag + nomineeData[i].minorPhotoGuardian : child} alt="" style={{ width: "300px", height: "200px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                            </p>

                                            {/* <p className="text-muted">Photograph of Guardian :
                                    <img src={nomineeData[i].minorPhotoGuardian ? flag + nomineeData[i].minorPhotoGuardian : child} alt="" style={{ width: "300px", height: "200px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                            </p>
                                            <p className="text-muted">Minor Nominee : {nomineeData[i].minorNominee}</p>
                                            <p className="text-muted">Name of Guardian : {nomineeData[i].minorGuarrdian}</p>
                                            <p className="text-muted">Address : {nomineeData[i].minorAddress}</p>
                                            <p className="text-muted">Relation : {nomineeData[i].minorRelation}</p>
                                            <p className="text-muted">Guardian Nid No : {nomineeData[i].minorNidGuardian}</p> */}
                                            {/* <p className="text-muted">NID Image of Guardian :
                                    <img src={flag + nomineeData[i].minorNidGuardian} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                            </p> */}

                                            {/* <p className="text-muted">Percentage : {nomineeData[i].minorPercentage}&#37;</p> */}
                                            
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

                                <img src={signatureData.signature ? flag + signatureData.signature : Sign}
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







                        {/* <div className="card col-sm-5" style={{ margin: "20px 0px" }}>
                            <div className="card-header im">
                                <h5>Nid Details</h5>
                            </div>
                            <div className="card-body text-center">
                                <p className="text-muted">Nid front side :
                                    <img src={flag + nidImagesData.NidFront} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                </p>

                                <p className="text-muted">Nid back side :
                                    <img src={flag + nidImagesData.NidBack} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                </p>
                            </div>
                        </div> */}


                        {/* <div className="card col-sm-5" style={{ margin: "20px 0px" }}>
                            <div className="card-header im">
                                <h5>Applicant Image</h5>
                            </div>
                            <div className="card-body text-center" style={{ margin: "20px 0px" }}>
                                <p className="text-muted">Picture :
                                    <img src={flag + captureFaceData.faceImage} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                </p>

                            </div>
                        </div> */}

                        {/* <div className="card col-sm-5" style={{ margin: "20px 0px" }}>
                            <div className="card-header im">
                                <h5>Applicant Signature</h5>
                            </div>
                            <div className="card-body text-center">
                                <p>Signature :
                                    <img src={flag + signatureData.signature} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                </p>

                            </div>
                        </div> */}

                    </div>
                    <div className="d-flex justify-content-center"
                        style={{ marginBottom: "20px" }}
                    >

                        <span className="b mr-5" onClick={this.back}>Back</span>
                        <span className="b" onClick={this.continue}>Confirm</span>
                    </div>
                </div>


            </div>
        )
    }
}

export default withRouter(ConfirmInfo);
