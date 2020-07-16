import React, { Component } from 'react'
import NidThree from '../Simplified/images/nid-f4.svg';
import NidTwo from '../Simplified/images/nid-f3.svg';
import face from '../Simplified/images/face.svg';
import man from '../Simplified/images/man.svg';
import { Loading } from '../Simplified/utils/CustomLoding/Loading'
import { NotificationManager } from "react-notifications";
import { profileDownload } from '../Url/ApiList'
import Acordion from '../Acordion/Acordion'
import axios from 'axios';
import { saveAs } from 'file-saver';

class FullEkyc extends Component {

    state = {
        ekyc: this.props.location.state.data,
        flag: 'data:image/jpeg;base64,',
        loading: false
    }

    componentDidMount() {
        console.log("All data", this.state.ekyc)
    }

    backEkyc = () => {
        this.props.history.push('/dashboard/e-kyc-list-&-search')
    }

    onDownload = async (id) => {

        let config = {
            responseType: 'arraybuffer',
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        let idObj = {
            applicantId: id
        }

        try {

            this.setState({
                loading: !this.state.loading
            })

            let downloalData = await axios.post(profileDownload, idObj, config)

            //console.log("downloalData", downloalData.data)

            const blob = new Blob([downloalData.data], { type: 'application/pdf', encoding: 'UTF-8' })

            saveAs(blob, `${this.state.ekyc.nid}.pdf`);
            this.setState({
                loading: !this.state.loading
            })

        } catch (error) {
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
            this.setState({
                loading: !this.state.loading
            })
        }



    }

    render() {
        let { ekyc, flag, loading } = this.state
        console.log("single value",ekyc.presentAddress.additionalMouzaOrMoholla)
        return (
            <div className="container">

                <div className="row">
                    <div className="imTwoWhite col-sm-12">
                        <div className="im">
                            <h5 className="text-muted text-center pt-2">
                                <i class="fas fa-user-tag"></i> Full E-KYC Profile
                        </h5>
                        </div>
                        <div className="row d-flex justify-content-center ">
                            <div className="col-sm-10">


                                <div className="row justify-content-center mt-3">
                                    <div className="col-sm-6 ">
                                        <hr />
                                        <div className="text-muted">
                                            <h5>Account Info</h5>
                                            <hr />
                                        </div>
                                        <div className="" style={{ fontSize: "17px" }}>
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
                                            <h5>Others Info</h5>
                                            <hr />
                                        </div>
                                        <div className="" style={{ fontSize: "17px" }}>
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Update By : </span>{ekyc.updateBy === null ? "" : ekyc.updateBy}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Update Date : </span>{ekyc.updateDate}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Pin : </span>{ekyc.pin}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Review Count : </span>{ekyc.reviewCount}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Risk Grading : </span>{ekyc.riskGrading}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Sanction Screening : </span>{ekyc.sanctionScreening}</small><br />
                                        </div>




                                    </div>
                                    <div className="col-sm-6">
                                        <hr />
                                        <div className="text-muted">
                                            <h5>Personal Info</h5>
                                            <hr />
                                        </div>
                                        <div className="" style={{ fontSize: "17px" }}>
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


                                            {/* <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Present Address : </span>{ekyc.presentAddress}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Permanent Address : </span>{ekyc.permanentAddress}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Permanent Address Bangla : </span>{ekyc.permanentAddressBangla}</small><br /> */}
                                        </div>

                                    </div>


                                    <div className="col-sm-12">
                                        <hr/>
                                        <div className="text-muted">
                                            <h5>Nominee Info</h5>
                                            <hr />
                                        </div>
                                        <div className="row d-flex justify-content-between" style={{ fontSize: "17px" }}>
                                            {
                                                ekyc.nominees.map((data, ind) => (
                                                    <div className="col-sm-6">
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Nominee : </span>{ind + 1}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Name : </span>{data.name}</small><br />

                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Date Of Birth : </span>{data.dob}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>ID : </span>{data.id}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Gurdian : </span>{data.gurdian}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Minor : </span>{data.isMinor}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Percentage : </span>{data.percentage}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Relation : </span>{data.relation}</small><br />
                                                        <hr />

                                                    </div>
                                                ))
                                            }

                                        </div>

                                    </div>

                                   

                                    
                                        <div className="col-sm-6">
                                            <hr/>
                                            <Acordion
                                                size={"col"}
                                                heading={"Permanent Address Details"}
                                                acBody={
                                                    <div className="imTwoWhite">
                                                        <small className="" style={{fontSize:"14px"}}>

                                                            <span style={{color:"green", fontSize:"14px"}}>Mouza Or Moholla :</span> {ekyc.permanentAddress.additionalMouzaOrMoholla + "(" + ekyc.permanentAddress.additionalMouzaOrMohollaEng + ")"}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>Village Or Road :</span> {ekyc.permanentAddress.additionalVillageOrRoad + "(" + ekyc.permanentAddress.additionalVillageOrRoadEng + ")"}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>City Corp. :</span> {ekyc.permanentAddress.cityCorporationOrMunicipality + "(" + ekyc.permanentAddress.cityCorporationOrMunicipalityEng + ")"}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>District :</span> {ekyc.permanentAddress.district + "(" + ekyc.permanentAddress.districtEng + ")"}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>District Code :</span> {ekyc.permanentAddress.districtCode}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>Address Type :</span> {ekyc.permanentAddress.addressType}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>ID :</span> {ekyc.permanentAddress.id}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>Division :</span> {ekyc.permanentAddress.division + "(" + ekyc.permanentAddress.divisionEng + ")"}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>Home Or Holding No. :</span> {ekyc.permanentAddress.homeOrHoldingNo + "(" + ekyc.permanentAddress.homeOrHoldingNoEng + ")"}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>Post Office :</span> {ekyc.permanentAddress.postOffice + "(" + ekyc.permanentAddress.postOfficeEng + ")"}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>Postal Code :</span> {ekyc.permanentAddress.postalCode}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>Region :</span> {ekyc.permanentAddress.region + "(" + ekyc.permanentAddress.regionEng + ")"}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>RMO :</span> {ekyc.permanentAddress.rmo}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>Union Or Ward :</span> {ekyc.permanentAddress.unionOrWard + "(" + ekyc.permanentAddress.unionOrWardEng + ")"}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>Union Or Ward Code :</span> {ekyc.permanentAddress.unionCode}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>Upozila :</span> {ekyc.permanentAddress.upozila + "(" + ekyc.permanentAddress.upozilaEng + ")"}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>Upozila Code :</span> {ekyc.permanentAddress.upozilaCode}<br />
                                                            <span style={{color:"green", fontSize:"14px"}}>Ward For Union Porishod :</span> {ekyc.permanentAddress.wardForUnionPorishod}<br />
                                                        </small>

                                                    </div>
                                                }
                                            />
                                            <hr/>
                                        </div>

                                        <div className="col-sm-6">
                                        <hr/>
                                            <Acordion
                                                size={"col"}
                                                heading={"Permanent Address Details"}
                                                acBody={
                                                    <div className="imTwoWhite">
                                                        <small className="" style={{fontSize:"14px"}}>

                                            <span style={{color:"green", fontSize:"14px"}}>Mouza Or Moholla :</span> {ekyc.presentAddress.additionalMouzaOrMoholla + "(" + ekyc.presentAddress.additionalMouzaOrMohollaEng + ")"}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>Village Or Road :</span> {ekyc.presentAddress.additionalVillageOrRoad + "(" + ekyc.presentAddress.additionalVillageOrRoadEng + ")"}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>City Corp. :</span> {ekyc.presentAddress.cityCorporationOrMunicipality + "(" + ekyc.presentAddress.cityCorporationOrMunicipalityEng + ")"}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>District :</span> {ekyc.presentAddress.district + "(" + ekyc.presentAddress.districtEng + ")"}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>District Code :</span> {ekyc.presentAddress.districtCode}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>Address Type :</span> {ekyc.presentAddress.addressType}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>ID :</span> {ekyc.presentAddress.id}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>Division :</span> {ekyc.presentAddress.division + "(" + ekyc.presentAddress.divisionEng + ")"}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>Home Or Holding No. :</span> {ekyc.presentAddress.homeOrHoldingNo + "(" + ekyc.presentAddress.homeOrHoldingNoEng + ")"}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>Post Office :</span> {ekyc.presentAddress.postOffice + "(" + ekyc.presentAddress.postOfficeEng + ")"}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>Postal Code :</span> {ekyc.presentAddress.postalCode}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>Region :</span> {ekyc.presentAddress.region + "(" + ekyc.presentAddress.regionEng + ")"}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>RMO :</span> {ekyc.presentAddress.rmo}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>Union Or Ward :</span> {ekyc.presentAddress.unionOrWard + "(" + ekyc.presentAddress.unionOrWardEng + ")"}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>Union Or Ward Code :</span> {ekyc.presentAddress.unionCode}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>Upozila :</span> {ekyc.presentAddress.upozila + "(" + ekyc.presentAddress.upozilaEng + ")"}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>Upozila Code :</span> {ekyc.presentAddress.upozilaCode}<br />
                                            <span style={{color:"green", fontSize:"14px"}}>Ward For Union Porishod :</span> {ekyc.presentAddress.wardForUnionPorishod}<br />
                                                        </small>

                                                    </div>
                                                }
                                            />
                                            <hr/>
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
                                                        src={ekyc.files.nidFront ? flag + ekyc.files.nidFront : NidThree}
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
                                                ekyc.nominees.map((data, ind) => (
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
                            {
                                loading ? (<Loading />) : ""

                            }


                        </div>


                        <div className="row d-flex justify-content-center">
                            <button className="neoBtnSmall mr-2" style={{ color: "#308f8f" }} onClick={this.backEkyc}>Back</button>
                            <button className="neoBtnSmall mr-2" style={{ color: "#308f8f" }} >Print</button>
                            <button className="neoBtnSmall" style={{ color: "#308f8f" }} onClick={() => this.onDownload(ekyc.id)}>Download</button>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default FullEkyc
