import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Account from '../Account';
import Family from '../images/family.svg'
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
        nidImagesData: JSON.parse(localStorage.getItem('NidImages')),
        captureFaceData: JSON.parse(localStorage.getItem('CaptureFace')),
        personalDetailsData: JSON.parse(localStorage.getItem('PersonalDetails')),
        nomineeData: JSON.parse(localStorage.getItem('NomineeArray')),
        signatureData: JSON.parse(localStorage.getItem('Signature')),
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

    continue = e => {
        e.preventDefault();
        this.props.history.replace('/dashboard/complete');
    }

    back = e => {
        e.preventDefault();
        this.props.history.push('/dashboard/signature');
    }





    render() {
        if (localStorage.length === 0) {
            return <Account />;
        }
        let { accountData, nidImagesData, captureFaceData, personalDetailsData, nomineeData, signatureData, flag } = this.state;
        // console.log("Nominee data", nomineeData);
        return (
            <div className="container">
                <div className="card col-sm-12" style={{ paddingTop: "25px" }}>
                    <div className="card-header up">
                        <h3>All Information</h3>
                    </div>
                    <div class="row card-body d-flex justify-content-around">
                        <div className="col-sm-5" style={{ margin: "20px 0px" }}>
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
                        {/* <div className="col-sm-5" style={{ margin: "20px 0px" }}>
                            <img
                                src={adult}
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
                            <hr />
                        </div> */}

                        <div className=" col-sm-5" style={{ margin: "20px 0px" }}>
                            <div className="text-center">
                                <h1 style={{ color: "green" }}>Applicant Image</h1>
                            </div>
                            <hr />
                            <div className="text-center" style={{ margin: "20px 0px" }}>

                                <img src={captureFaceData.faceImage ? flag + captureFaceData.faceImage : adult}
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



                        <div className="col-sm-5" style={{ margin: "20px 0px" }}>

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
                                            Nominee : {nomineeData[i].nominee},<br />
                                            Relation : {nomineeData[i].relation},<br />
                                            Picture :
                                    <img src={nomineeData[i].photograph ? flag + nomineeData[i].photograph : adult} alt="" style={{ width: "100px", height: "100px", borderRadius: "50px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                            ,<br />
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
                                            <p className="text-muted">Name of Guardian : {nomineeData[i].minorGuarrdian}</p>
                                            <p className="text-muted">Address : {nomineeData[i].minorAddress}</p>
                                            <p className="text-muted">Relation : {nomineeData[i].minorRelation}</p>
                                            <p className="text-muted">Guardian Nid No : {nomineeData[i].minorNidGuardian}</p>
                                            {/* <p className="text-muted">NID Image of Guardian :
                                    <img src={flag + nomineeData[i].minorNidGuardian} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                            </p> */}
                                            <p className="text-muted">Photograph of Guardian :
                                    <img src={nomineeData[i].minorPhotoGuardian ? flag + nomineeData[i].minorPhotoGuardian : child} alt="" style={{ width: "100px", height: "100px", borderRadius: "50px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                            </p>
                                            <p className="text-muted">Percentage : {nomineeData[i].minorPercentage}&#37;</p>
                                            <hr />
                                        </div>
                                ))}

                            </div>
                        </div>



                        <div className="col-sm-5" style={{ margin: "20px 0px" }}>
                            <img
                                src={adult}
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
                            <hr />
                        </div>

                        <div className="card col-sm-5" style={{ margin: "20px 0px" }}>
                            <div className="card-header im">
                                <h5>Personal Information</h5>
                            </div>
                            <div className="card-body">

                                <p className="text-muted">Applicant's Name : {personalDetailsData.applicantName}</p>
                                <p className="text-muted">Mother's Name : {personalDetailsData.motherName}</p>
                                <p className="text-muted">Father's Name : {personalDetailsData.fatherName}</p>
                                <p className="text-muted">Spouse Name : {personalDetailsData.spouseName}</p>
                                <p className="text-muted">Gender : {personalDetailsData.gender}</p>
                                <p className="text-muted">Profession : {personalDetailsData.profession}</p>
                                <p className="text-muted">Mobile Phone Number : {personalDetailsData.mobileNumber}</p>
                                <p className="text-muted">Present Address : {personalDetailsData.presentAddress}</p>
                                <p className="text-muted">Permanent Address : {personalDetailsData.permanentAddress}</p>

                            </div>
                        </div>





                        <div className="card col-sm-5" style={{ margin: "20px 0px" }}>
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
                        </div>


                        <div className="card col-sm-5" style={{ margin: "20px 0px" }}>
                            <div className="card-header im">
                                <h5>Applicant Image</h5>
                            </div>
                            <div className="card-body text-center" style={{ margin: "20px 0px" }}>
                                <p className="text-muted">Picture :
                                    <img src={flag + captureFaceData.faceImage} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                </p>

                            </div>
                        </div>

                        <div className="card col-sm-5" style={{ margin: "20px 0px" }}>
                            <div className="card-header im">
                                <h5>Applicant Signature</h5>
                            </div>
                            <div className="card-body text-center">
                                <p>Signature :
                                    <img src={flag + signatureData.signature} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                </p>

                            </div>
                        </div>

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
