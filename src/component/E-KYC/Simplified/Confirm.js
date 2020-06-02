import React, { Component } from 'react'
import { formatDate } from './utils/DateFormat';
export class Confirm extends Component {



    continue = e => {
        const { values } = this.props;
        e.preventDefault();
        //Process form//
        console.log("all data", values);
        // localStorage.removeItem("NidImage");
        // localStorage.removeItem("CaptureImage");
        // localStorage.removeItem("PersonalDetailsJoin");
        // localStorage.removeItem("NomineeArray");
        // localStorage.removeItem("Signature");
        // // localStorage.setItem("StableButton",JSON.stringify(true));
        this.props.nextStep();
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
                    <div class="row card-body d-flex justify-content-around">
                        <div className="card col-sm-5" style={{ margin: "20px 0px" }}>
                            <div className="card-header im">
                                <h5>Account Details</h5>
                            </div>
                            <div className="card-body">
                                <p className="text-muted">Account Number : {values.accountNumber}</p>
                                <p className="text-muted">Product and Services : {values.product}</p>
                                <p className="text-muted">Account Type : {values.accountType}</p>
                            </div>
                        </div>
                        <div className="card col-sm-5" style={{ margin: "20px 0px" }}>
                            <div className="card-header im">
                                <h5>Nominee Details</h5>
                            </div>
                            <div className="card-body">
                                {values.jointArray.map((arr, i) => (
                                    arr.isShow === true ?

                                    <div>
                                    <p className="text-muted">Nominee {i + 1}</p >
                                    <p className="text-muted">Nominee : {arr.nominee}</p>
                                    <p className="text-muted">Relation : {arr.relation}</p>
                                    <p className="text-muted">Date of Birth : {arr.dob}</p>
                                    <p className="text-muted">Picture :
                            <img src={values.flag + arr.photograph} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                    </p>
                                    {/* <p className="text-muted">Photograph : {arr.photograph}</p> */}
                                    <p className="text-muted">Percentage : {arr.percentage}&#37;</p>
                                </div>
                                :
                                // Minor
                                <div>
                                <p className="text-muted">Nominee {i + 1}</p >
                                <p className="text-muted">Minor Nominee : {arr.minorNominee}</p>
                                <p className="text-muted">Name of Guardian : {arr.minorGuarrdian}</p>
                                <p className="text-muted">Address : {arr.minorAddress}</p>
                                <p className="text-muted">Relation : {arr.minorRelation}</p>
                                <p className="text-muted">Guardian Nid No : {arr.minorNidGuardian}</p>
                                {/* <p className="text-muted">NID Image of Guardian :
                        <img src={values.flag + arr.minorNidGuardian} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                </p> */}
                                <p className="text-muted">Photograph of Guardian :
                        <img src={values.flag + arr.minorPhotoGuardian} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                </p>

                                <p className="text-muted">Percentage : {arr.minorPercentage}&#37;</p>

                            </div>
                                ))}

                            </div>
                        </div>



                        <div className="card col-sm-5" style={{ margin: "20px 0px" }}>
                            <div className="card-header im">
                                <h5>Nid Details</h5>
                            </div>
                            <div className="card-body text-center">
                                <p className="text-muted">Nid front side :
                                    <img src={values.flag + values.NidFront} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                </p>

                                <p className="text-muted">Nid back side :
                                    <img src={values.flag + values.NidBack} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                </p>
                            </div>
                        </div>
                        <div className="card col-sm-5" style={{ margin: "20px 0px" }}>
                            <div className="card-header im">
                                <h5>Personal Information</h5>
                            </div>
                            <div className="card-body">

                                <p className="text-muted">Applicant's Name : {values.applicantName}</p>
                                <p className="text-muted">Mother's Name : {values.motherName}</p>
                                <p className="text-muted">Father's Name : {values.fatherName}</p>
                                <p className="text-muted">Spouse Name : {values.spouseName}</p>
                                <p className="text-muted">Gender : {values.gender}</p>
                                <p className="text-muted">Profession : {values.profession}</p>
                                <p className="text-muted">Mobile Phone Number : {values.mobileNumber}</p>
                                <p className="text-muted">Present Address : {values.presentAddress}</p>
                                <p className="text-muted">Permanent Address : {values.permanentAddress}</p>

                            </div>
                        </div>

                        <div className="card col-sm-5" style={{ margin: "20px 0px" }}>
                            <div className="card-header im">
                                <h5>Applicant Image</h5>
                            </div>
                            <div className="card-body text-center" style={{ margin: "20px 0px" }}>
                                <p className="text-muted">Picture :
                                    <img src={values.flag + values.faceImage} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
                                </p>

                            </div>
                        </div>

                        <div className="card col-sm-5" style={{ margin: "20px 0px" }}>
                            <div className="card-header im">
                                <h5>Applicant Signature</h5>
                            </div>
                            <div className="card-body text-center">
                                <p>Signature :
                                    <img src={values.flag + values.signature} alt="" style={{ width: "150px", height: "120px", border: "1px solid #00bdaa", marginLeft: "25px" }}></img>
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

export default Confirm;
