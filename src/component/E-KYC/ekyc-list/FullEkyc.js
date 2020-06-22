import React, { Component } from 'react'
import NidThree from '../Simplified/images/nid-f4.svg';
import NidTwo from '../Simplified/images/nid-f3.svg';
import face from '../Simplified/images/face.svg';
import man from '../Simplified/images/man.svg';

class FullEkyc extends Component {

    state = {
        ekyc: this.props.location.state.data,
        flag: 'data:image/jpeg;base64,'
    }

    componentDidMount() {
        console.log("All data", this.state.ekyc)
    }

    backEkyc = () => {
        this.props.history.push('/dashboard/e-kyc-list-&-search')
    }

    render() {
        let { ekyc, flag } = this.state
        return (
            <div className="container">

                <div className="row">
                    <div className="imTwoWhite col-sm-12">
                        <div className="im">
                            <h5 className="text-muted text-center pt-2">
                                <i class="fas fa-user-tag"></i> Full E-KYC Profile
                        </h5>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-10">


                                <div className="row justify-content-center mt-3">
                                    <div className="col-sm-6 ">
                                        <hr />
                                        <div className="text-muted">
                                            <h5>Account Info</h5>
                                            <hr />
                                        </div>
                                        <div className="pl-3" style={{ fontSize: "14px" }}>
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Title : </span>{ekyc.account.title}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Product Type : </span>{ekyc.account.productType}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Product Code : </span>{ekyc.account.productCode}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Status : </span>{ekyc.account.status}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Type : </span>{ekyc.account.type}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>ID : </span>{ekyc.account.id}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Created By : </span>{ekyc.account.createdBy}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Created Date : </span>{ekyc.account.createDate}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Code : </span>{ekyc.account.channelCode}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Response : </span>{ekyc.account.channelResponse}</small><br />
                                        </div>
                                        <hr />

                                        <div className="text-muted">
                                            <h5>Nominee Info</h5>
                                            <hr />
                                        </div>
                                        <div className="pl-3" style={{ fontSize: "14px" }}>
                                            {
                                                ekyc.nominees.map((data, ind) => (
                                                    <div>
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Name : </span>{data.name}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Date Of Birth : </span>{data.dob}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>ID : </span>{data.id}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Gurdian : </span>{data.gurdian}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Minor : </span>{data.isMinor}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Percentage : </span>{data.percentage}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Relation : </span>{data.relation}</small><br />

                                                    </div>
                                                ))
                                            }

                                        </div>
                                        <hr />

                                        <div className="text-muted">
                                            <h5>Others Info</h5>
                                            <hr />
                                        </div>
                                        <div className="pl-3" style={{ fontSize: "14px" }}>
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Update By : </span>{ekyc.updateBy === null ? "" : ekyc.updateBy}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Update Date : </span>{ekyc.updateDate}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Pin : </span>{ekyc.pin}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Review Count : </span>{ekyc.reviewCount}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Risk Grading : </span>{ekyc.riskGrading}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Sanction Screening : </span>{ekyc.sanctionScreening}</small><br />
                                        </div>




                                    </div>
                                    <div className="col-sm-6  ">
                                        <hr />
                                        <div className="text-muted">
                                            <h5>Personal Info</h5>
                                            <hr />
                                        </div>
                                        <div className="pl-3" style={{ fontSize: "14px" }}>
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Name : </span>{ekyc.name}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Name Bangla : </span>{ekyc.nameBangla}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Gender : </span>{ekyc.gender}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>ID : </span>{ekyc.id}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Status : </span>{ekyc.verificationStatus}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Type : </span>{ekyc.verificationType}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Date : </span>{ekyc.verificationDate}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>NID No : </span>{ekyc.nid}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Cell No : </span>{ekyc.mobile}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Date Of Birth : </span>{ekyc.dob}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Father Name : </span>{ekyc.fatherName}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Father Name Bangla : </span>{ekyc.fatherNameBangla}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Mother Name : </span>{ekyc.motherName}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Mother Name Bangla : </span>{ekyc.motherNameBangla}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Spouse Name : </span>{ekyc.spouseName}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Nationality : </span>{ekyc.nationality === null ? "" : ekyc.nationality}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Profession : </span>{ekyc.profession}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Monthly Income : </span>{ekyc.monthlyIncome === null ? "" : ekyc.monthlyIncome}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Source Of Fund : </span>{ekyc.sourceOfFund === null ? "" : ekyc.sourceOfFund}</small><br />


                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Present Address : </span>{ekyc.presentAddress}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Permanent Address : </span>{ekyc.permanentAddress}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Permanent Address Bangla : </span>{ekyc.permanentAddressBangla}</small><br />
                                        </div>

                                    </div>





                                    <div className="col-sm-12 ">
                                        <hr />
                                        <div className="text-muted">
                                            <h5>Document Info</h5>
                                            <hr />
                                        </div>
                                        <div className="row justify-content-center" style={{ fontSize: "14px" }}>
                                        <div className="imTwoWhite col-sm-3" >
                                                <div className="text-center">
                                                    <small>NID Front</small>
                                                </div>
                                                <div className="d-flex justify-content-center">

                                                    <img
                                                        src={ ekyc.files.nidFront ? flag + ekyc.files.nidFront : NidThree}
                                                        style={{
                                                            margin: "auto",
                                                            cursor: "pointer",
                                                            width: "200px",
                                                            height: "150px",
                                                        }}
                                                        defaultValue=""
                                                        className="img-fluid img-thumbnail im"
                                                        id="FrontNidPic"
                                                        alt=""
                                                    />
                                                </div>

                                            </div>

                                            <div className="imTwoWhite col-sm-3">
                                                <div className="text-center">
                                                    <small>NID Back</small>
                                                </div>
                                                <div className="d-flex justify-content-center">

                                                    <img
                                                        src={ekyc.files.nidBack ? flag + ekyc.files.nidBack : NidTwo}
                                                        style={{
                                                            margin: "auto",
                                                            cursor: "pointer",
                                                            width: "200px",
                                                            height: "150px",
                                                        }}
                                                        defaultValue=""
                                                        className="img-fluid img-thumbnail im"
                                                        id="FrontNidPic"
                                                        alt=""
                                                    />
                                                </div>

                                            </div>

                                            <div className="imTwoWhite col-sm-3" >
                                                <div className="text-center">
                                                    <small>Profile</small>
                                                </div>
                                                <div className="d-flex justify-content-center">

                                                    <img
                                                        src={ekyc.files.photo ? flag + ekyc.files.photo : man}
                                                        style={{
                                                            margin: "auto",
                                                            cursor: "pointer",
                                                            width: "200px",
                                                            height: "150px",
                                                        }}
                                                        defaultValue=""
                                                        className="img-fluid img-thumbnail im"
                                                        id="FrontNidPic"
                                                        alt=""
                                                    />
                                                </div>

                                            </div>

                                            {
                                                ekyc.nominees.map((data, ind)=>(
                                                    <div key={ind} className="imTwoWhite col-sm-3" >
                                                <div className="text-center">
                                                <small>Nominee {data.id} Photo</small>
                                                </div>
                                                <div className="d-flex justify-content-center">

                                                    <img
                                                        src={data.photo ? flag + data.photo : face}
                                                        style={{
                                                            margin: "auto",
                                                            cursor: "pointer",
                                                            width: "200px",
                                                            height: "150px",
                                                        }}
                                                        defaultValue=""
                                                        className="img-fluid img-thumbnail im"
                                                        id="FrontNidPic"
                                                        alt=""
                                                    />
                                                </div>

                                            </div>
                                                ))
                                            }

                                            

                                            
                                            
                                        </div>

                                    </div>

                                </div>




                            </div>
                        </div>
                        <hr />
                        <div className="row d-flex justify-content-center">
                            <button className="neoBtnSmall mr-2" style={{ color: "#308f8f" }} onClick={this.backEkyc}>Back</button>
                            <button className="neoBtnSmall" style={{ color: "#308f8f" }}>Print</button>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default FullEkyc
