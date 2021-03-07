import React, { Component } from 'react'
import NidThree from '../Simplified/images/nid-f4.svg';
import NidTwo from '../Simplified/images/nid-f3.svg';
import face from '../Simplified/images/face.svg';
import man from '../Simplified/images/man.svg';
import { Loading } from '../Simplified/utils/CustomLoding/Loading'
import { NotificationManager } from "react-notifications";
import { profileDownload, opFileDownload, regPdfDownload, ekycFullProfile } from '../Url/ApiList';
import { AccountVerificationStatus, ProductCategoryType, AccountType, EkycAccountStatus, GenderForm, ProductCodeGetName } from '../../Utils/fullFormConversion';
import Acordion from '../Acordion/Acordion';
import { saveAs } from 'file-saver';
//import ReactTooltip from 'react-tooltip';
import { b64toBlob } from '../../Utils/FileUtils';
import { dayMonthYearFormat } from '../../Utils/dateConversion';
import { FaFileDownload, FaArrowCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import axios from 'axios';
//import { Button } from 'reactstrap';

class FullEkyc extends Component {

    state = {
        ekyc: null,
        ProductCodetoName: '',
        flag: 'data:image/jpeg;base64,',
        loading: false,
        opFileDownloadLoading: false,
        additionalFile: [],
        arrowUp: false,
        riskGradingData: [],
        business: "",
        showRiskBtn: ""
    }

    async componentDidMount() {
        // console.log("All data", this.state.ekyc);

        // console.log("id", this.props.location.state);
        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };

        try {
            let idObj = {
                applicantId: this.props.location.state
            }
            let fullEkyc = await axios.post(ekycFullProfile, idObj, config)
            let ekycRes = []
            if (fullEkyc.data.data.riskGrading != null) {
                ekycRes = fullEkyc.data.data.riskGrading.riskGradingData
                //console.log("full Ekyc", ekycRes.sort())
                let occupation = ekycRes[7]
                let match = occupation.indexOf("5.a")
                //console.log("matching", match);

                if (match >= 0) {
                    this.setState({
                        business: true
                    })
                } else {
                    this.setState({
                        business: false
                    })
                }

                // console.log("====", this.state.business)

                this.setState({
                    riskGradingData: ekycRes.sort(),
                    showRiskBtn: true

                })
            } else {
                console.log("No Data Found for Risk Grading")
                this.setState({
                    showRiskBtn: false
                })
            }

            // let dataObj = {
            //     data: fullEkyc.data.data
            // }
            this.setState({ ekyc: fullEkyc.data.data });

            // this.props.history.push('/dashboard/fullEkyc', dataObj)
        } catch (error) {
            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }
        try {
            let data = await ProductCodeGetName(this.state.ekyc.account.productCode);
            this.setState({ ProductCodetoName: data });
        } catch (error) {
            console.log("Error======>", error)
        }

    }

    backEkyc = () => {
        // this.props.history.push('/dashboard/e-kyc-list-&-search')
        this.props.history.goBack();
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

        if (this.state.ekyc.riskGrading) {
            try {

                this.setState({
                    loading: !this.state.loading
                })

                let downloalData = await axios.post(regPdfDownload, idObj, config)

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
                    //  console.log("Error Connecting...", error.request)
                    NotificationManager.error("Error Connecting...", "Error", 5000);
                } else if (error) {
                    NotificationManager.error(error.toString(), "Error", 5000);
                }
                this.setState({
                    loading: !this.state.loading
                })
            }
        } else {
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
                    //  console.log("Error Connecting...", error.request)
                    NotificationManager.error("Error Connecting...", "Error", 5000);
                } else if (error) {
                    NotificationManager.error(error.toString(), "Error", 5000);
                }
                this.setState({
                    loading: !this.state.loading
                })
            }
        }







    }

    showAdditionalFile = async (id) => {

        let config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        let idObj = {
            applicantId: id
        }

        try {

            this.setState({
                opFileDownloadLoading: !this.state.opFileDownloadLoading
            })


            let additionalFileRes = await axios.post(opFileDownload, idObj, config)
            this.setState({
                additionalFile: additionalFileRes.data.data.additionalFiles,
                arrowUp: !this.state.arrowUp,
                opFileDownloadLoading: !this.state.opFileDownloadLoading
            })
            // console.log("All File", this.state.additionalFile, this.state.arrowUp)






        } catch (error) {
            console.log(error.response)
            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                //  console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
            this.setState({
                opFileDownloadLoading: !this.state.opFileDownloadLoading
            })

        }

    }

    //Risk Measure Function
    measureRisk = (score) => {
        if (score < 15) {
            return "REGULAR"
        }
        if (score >= 15) {
            return "HIGH"
        }
    }

    printData = () => {
        window.print();
    }

    onBtnClick = (e) => {
        console.log("e.target", this.state.additionalFile[e.target.id].data)
        let fileData = this.state.additionalFile[e.target.id].data
        let fileType = this.state.additionalFile[e.target.id].fileType
        let fileName = this.state.additionalFile[e.target.id].fileName

        const blobFile = b64toBlob(fileData, fileType);
        saveAs(blobFile, fileName);
    }

    render() {
        let { ekyc, flag, loading, additionalFile, arrowUp, opFileDownloadLoading, riskGradingData, business, showRiskBtn } = this.state;
        //console.log("single value",ekyc.presentAddress.additionalMouzaOrMoholla)
        //console.log("Arrow", arrowUp)
        // console.log("ekyc", ekyc?.account?.id);
        // console.log("dob", typeof (ekyc?.dob));

        return (
            <div className="container">

                <div className="row">
                    <div className="imTwoWhite col-sm-12">
                        <div className="im">
                            <h5 className="text-muted text-center pt-2">
                                <i className="fas fa-user-tag"></i> Full E-KYC Profile
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
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Account ID : </span>{ekyc?.account === null ? "" : ekyc?.account?.id}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Branch/Agent Point : </span>{ekyc?.account === null ? "" : ekyc?.account?.branchOrAgentPointCode}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Title : </span>{ekyc?.account === null ? "" : ekyc?.account?.title}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Account Number : </span>{ekyc?.account === null ? "" : ekyc?.account?.channelAccountId}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Product Type : </span>{ekyc?.account === null ? "" : ProductCategoryType(ekyc?.account?.productCategoryCode)}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Code : </span>{ekyc?.account === null ? "" : ekyc?.account?.channelCode}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Product Code : </span>{ekyc?.account === null ? "" : `${ekyc?.account?.productCode} (${this.state.ProductCodetoName === null ? "" : this.state.ProductCodetoName})`}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Status : </span>{ekyc?.account === null ? "" : EkycAccountStatus(ekyc?.account?.status)}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Type : </span>{ekyc?.account === null ? "" : AccountType(ekyc?.account?.type)}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Created By : </span>{ekyc?.account === null ? "" : ekyc?.account?.createdBy}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Created Date : </span>{ekyc?.account === null ? "" : ekyc?.account?.createDate}</small><br />


                                            {/* <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Response : </span>{ekyc.account.channelResponse}</small><br /> */}
                                        </div>
                                        <hr />



                                        <div className="text-muted">
                                            <h5>Others Info</h5>
                                            <hr />
                                        </div>
                                        <div className="" style={{ fontSize: "17px" }}>
                                            {/* <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Update By : </span>{ekyc.updateBy === null ? "" : ekyc.updateBy}</small><br />*/}
                                            {/*  <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Update Date : </span>{ekyc.updateDate}</small><br />*/}
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Pin : </span>{ekyc?.pin}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Review Count : </span>{ekyc?.reviewCount}</small><br />
                                            {/* <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Risk Grading : </span>{ekyc.riskGrading}</small><br /> */}
                                            {/*<small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Sanction Screening : </span>{ekyc.sanctionScreening}</small><br />*/}

                                            {
                                                showRiskBtn ? (
                                                    <div>
                                                        <hr />
                                                        <span className="neoBg" style={{ color: "green", cursor: "pointer" }} data-toggle="modal" data-target="#exampleModalCenter" >Risk Grading Details</span>
                                                    </div>
                                                ) : ""
                                            }


                                        </div>







                                    </div>
                                    <div className="col-sm-6">
                                        <hr />
                                        <div className="text-muted">
                                            <h5>Personal Info</h5>
                                            <hr />
                                        </div>
                                        <div className="" style={{ fontSize: "17px" }}>
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>EKYC ID : </span>{ekyc?.id}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Name : </span>{ekyc?.name}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Name Bangla : </span>{ekyc?.nameBangla}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Gender : </span>{GenderForm(ekyc?.gender)}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Status : </span>{AccountVerificationStatus(ekyc?.verificationStatus)}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Type : </span>{ekyc?.verificationType}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Onboarding Type : </span>{ekyc?.onboardingType}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Date : </span>{ekyc?.verificationDate}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>NID No : </span>{ekyc?.nid}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Cell No : </span>{ekyc?.mobile}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Date Of Birth : </span>{dayMonthYearFormat(ekyc?.dob)}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Father Name : </span>{ekyc?.fatherName}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Father Name Bangla : </span>{ekyc?.fatherNameBangla}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Mother Name : </span>{ekyc?.motherName}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Mother Name Bangla : </span>{ekyc?.motherNameBangla}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Spouse Name : </span>{ekyc?.spouseName}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Nationality : </span>{ekyc?.nationality === null ? "" : ekyc?.nationality}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Profession : </span>{ekyc?.profession}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Monthly Income : </span>{ekyc?.monthlyIncome === null ? "" : ekyc?.monthlyIncome}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Source Of Fund : </span>{ekyc?.sourceOfFund === null ? "" : ekyc?.sourceOfFund}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Created By : </span>{ekyc?.createdBy === null ? "" : ekyc?.createdBy}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Create Date : </span>{ekyc?.createDate === null ? '' : ekyc?.createDate}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Update By : </span>{ekyc?.updatedBy === null ? "" : ekyc?.updatedBy}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Update Date : </span>{ekyc?.updateDate === null ? '' : ekyc?.updateDate}</small><br />

                                            {/* <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Present Address : </span>{ekyc.presentAddress}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Permanent Address : </span>{ekyc.permanentAddress}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Permanent Address Bangla : </span>{ekyc.permanentAddressBangla}</small><br /> */}
                                        </div>

                                    </div>


                                    <div className="col-sm-12">
                                        <hr />
                                        <div className="text-muted">
                                            <h5>Nominee Info</h5>
                                            <hr />
                                        </div>
                                        <div className="row d-flex justify-content-between" style={{ fontSize: "17px" }}>
                                            {
                                                ekyc?.nominees.map((data, ind) => (
                                                    <div className="col-sm-6" key={ind}>

                                                        <small className="imPlain" style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>{data.isMinor ? "Minor" : "Adult"} Nominee : </span>{ind + 1}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>ID : </span>{data.id}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Name : </span>{data.name}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Percentage : </span>{data.percentage}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Nominee Relation : </span>{data.relation}</small><br />
                                                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Date Of Birth : </span>{data.dob}</small><br />

                                                        {
                                                            data.isMinor ? (
                                                                <div>
                                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Guardian ID : </span>{data.guardian.id}</small><br />
                                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Guardian Name : </span>{data.guardian.name}</small><br />
                                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Guardian Relation : </span>{data.guardian.relation}</small><br />
                                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Guardian Address : </span>{data.guardian.address}</small><br />
                                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Guardian NID : </span>{data.guardian.nid}</small><br />

                                                                </div>
                                                            ) : ""
                                                        }


                                                        {/* <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Minor : </span>{data.isMinor}</small><br /> */}

                                                        <hr />

                                                    </div>
                                                ))
                                            }

                                        </div>

                                    </div>

                                    {
                                        ekyc?.riskGrading ? (
                                            <div className="col-sm-12">
                                                <div className="row d-flex justify-content-between">
                                                    <div className="col-sm-6">
                                                        <hr />
                                                        <div className="text-muted">
                                                            <h5 className="">Risk Grading</h5>
                                                            <hr />
                                                        </div>
                                                        <div className="" style={{ fontSize: "17px" }}>

                                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Overall Score : </span>{ekyc?.riskGrading === null ? "" : ekyc?.riskGrading?.score}</small><br />
                                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Risk Type : </span>{ekyc?.riskGrading === null ? "" : this.measureRisk(ekyc?.riskGrading?.score)}</small><br />
                                                        </div>

                                                    </div>
                                                    <div className="col-sm-6 ">
                                                        <hr />


                                                        <div className="im text-muted">
                                                            <button className=" text-center" style={{ border: "none", outline: "none" }} onClick={() => this.showAdditionalFile(ekyc.id)}><span style={{ color: "green" }}>Additional File <i>{arrowUp ? <FaArrowAltCircleUp /> : <FaArrowCircleDown />}</i></span></button>

                                                        </div>
                                                        {
                                                            opFileDownloadLoading ?
                                                                (
                                                                    <div className="row d-flex justify-content-center mt-3">
                                                                        <Loading />
                                                                    </div>
                                                                )
                                                                : (
                                                                    <div>
                                                                        {
                                                                            arrowUp ? (
                                                                                <div>
                                                                                    {
                                                                                        additionalFile.map((file, i) => (
                                                                                            <div key={file.id} className="imTwoWhite animated zoomIn" style={{ cursor: "pointer" }}>
                                                                                                <p className="" onClick={(e) => this.onBtnClick(e)} style={{ color: "green", textTransform: "uppercase" }} id={i}>{file.type}-Download <FaFileDownload /></p>

                                                                                            </div>

                                                                                        ))
                                                                                    }




                                                                                </div>
                                                                            ) : ""
                                                                        }
                                                                    </div>
                                                                )
                                                        }






                                                    </div>

                                                </div>
                                            </div>
                                        ) : ""
                                    }






                                    <div className="col-sm-6">
                                        <hr />
                                        <Acordion
                                            size={"col"}
                                            heading={"Permanent Address Details"}
                                            acBody={
                                                <div className="imTwoWhite animated zoomIn">
                                                    <small className="" style={{ fontSize: "14px" }}>

                                                        <span style={{ color: "green", fontSize: "14px" }}>Mouza Or Moholla :</span> {ekyc?.permanentAddress?.additionalMouzaOrMoholla + "(" + ekyc?.permanentAddress?.additionalMouzaOrMohollaEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Village Or Road :</span> {ekyc?.permanentAddress?.additionalVillageOrRoad + "(" + ekyc?.permanentAddress?.additionalVillageOrRoadEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>City Corp. :</span> {ekyc?.permanentAddress?.cityCorporationOrMunicipality + "(" + ekyc?.permanentAddress?.cityCorporationOrMunicipalityEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>District :</span> {ekyc?.permanentAddress?.district + "(" + ekyc?.permanentAddress?.districtEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>District Code :</span> {ekyc?.permanentAddress?.districtCode}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Address Type :</span> {ekyc?.permanentAddress?.addressType}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>ID :</span> {ekyc?.permanentAddress?.id}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Division :</span> {ekyc?.permanentAddress?.division + "(" + ekyc?.permanentAddress?.divisionEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Home Or Holding No. :</span> {ekyc?.permanentAddress?.homeOrHoldingNo + "(" + ekyc?.permanentAddress?.homeOrHoldingNoEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Post Office :</span> {ekyc?.permanentAddress?.postOffice + "(" + ekyc?.permanentAddress?.postOfficeEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Postal Code :</span> {ekyc?.permanentAddress?.postalCode}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Region :</span> {ekyc?.permanentAddress?.region + "(" + ekyc?.permanentAddress?.regionEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>RMO :</span> {ekyc?.permanentAddress?.rmo}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward :</span> {ekyc?.permanentAddress?.unionOrWard + "(" + ekyc?.permanentAddress?.unionOrWardEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward Code :</span> {ekyc?.permanentAddress?.unionCode}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Upozila :</span> {ekyc?.permanentAddress?.upozila + "(" + ekyc?.permanentAddress?.upozilaEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Upozila Code :</span> {ekyc?.permanentAddress?.upozilaCode}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Ward For Union Porishod :</span> {ekyc?.permanentAddress?.wardForUnionPorishod}<br />
                                                    </small>

                                                </div>
                                            }
                                        />
                                        <hr />
                                    </div>

                                    <div className="col-sm-6">
                                        <hr />
                                        <Acordion
                                            size={"col"}
                                            heading={"Present Address Details"}
                                            acBody={
                                                <div className="imTwoWhite animated zoomIn">
                                                    <small className="" style={{ fontSize: "14px" }}>

                                                        <span style={{ color: "green", fontSize: "14px" }}>Mouza Or Moholla :</span> {ekyc?.presentAddress?.additionalMouzaOrMoholla + "(" + ekyc?.presentAddress?.additionalMouzaOrMohollaEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Village Or Road :</span> {ekyc?.presentAddress?.additionalVillageOrRoad + "(" + ekyc?.presentAddress?.additionalVillageOrRoadEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>City Corp. :</span> {ekyc?.presentAddress?.cityCorporationOrMunicipality + "(" + ekyc?.presentAddress?.cityCorporationOrMunicipalityEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>District :</span> {ekyc?.presentAddress?.district + "(" + ekyc?.presentAddress?.districtEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>District Code :</span> {ekyc?.presentAddress?.districtCode}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Address Type :</span> {ekyc?.presentAddress?.addressType}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>ID :</span> {ekyc?.presentAddress?.id}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Division :</span> {ekyc?.presentAddress?.division + "(" + ekyc?.presentAddress?.divisionEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Home Or Holding No. :</span> {ekyc?.presentAddress?.homeOrHoldingNo + "(" + ekyc?.presentAddress?.homeOrHoldingNoEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Post Office :</span> {ekyc?.presentAddress?.postOffice + "(" + ekyc?.presentAddress?.postOfficeEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Postal Code :</span> {ekyc?.presentAddress?.postalCode}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Region :</span> {ekyc?.presentAddress?.region + "(" + ekyc?.presentAddress?.regionEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>RMO :</span> {ekyc?.presentAddress?.rmo}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward :</span> {ekyc?.presentAddress?.unionOrWard + "(" + ekyc?.presentAddress?.unionOrWardEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward Code :</span> {ekyc?.presentAddress?.unionCode}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Upozila :</span> {ekyc?.presentAddress?.upozila + "(" + ekyc?.presentAddress?.upozilaEng + ")"}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Upozila Code :</span> {ekyc?.presentAddress?.upozilaCode}<br />
                                                        <span style={{ color: "green", fontSize: "14px" }}>Ward For Union Porishod :</span> {ekyc?.presentAddress?.wardForUnionPorishod}<br />
                                                    </small>

                                                </div>
                                            }
                                        />
                                        <hr />
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
                                                        src={ekyc?.files?.nidFront ? flag + ekyc?.files?.nidFront : NidThree}
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
                                                        src={ekyc?.files?.nidBack ? flag + ekyc?.files?.nidBack : NidTwo}
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
                                                        src={ekyc?.files?.photo ? flag + ekyc?.files?.photo : man}
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
                                                ekyc?.nominees.map((data, ind) => (
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
                            <button className="neoBtnSmall mr-2" style={{ color: "#308f8f" }} onClick={this.printData}>Print</button>
                            <button className="neoBtnSmall" style={{ color: "#308f8f" }} onClick={() => this.onDownload(ekyc.id)}>Download</button>
                        </div>



                        <div className="row modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                                <div className="modal-content imTwo">
                                    <div className="modal-header divBg">
                                        <h5 className="modal-title" id="exampleModalCenterTitle"> Risk Grading Details</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row d-flex justify-content-center imTwoWhite">
                                            <div className="card col-sm-12" style={{ paddingTop: "25px" }}>
                                                {/* 
                <div className="im col-sm-2" onClick={this.Escape}>
                    Escape
              </div>*/}


                                                <div className="card-body">
                                                    <form>

                                                        <div className='form-group'>
                                                            <label htmlFor="">Type Of On-boarding</label>
                                                            <select
                                                                disabled
                                                                className='custom-select'
                                                                value={riskGradingData[0]}

                                                                name="onBoardingValue"
                                                            >
                                                                <option value='' disabled>--Select Category--</option>
                                                                <option value='1.1'>Branch/Relationship Manager</option>
                                                                <option value='1.2'>Direct Sales Agent</option>
                                                                <option value='1.3'>Walk-in</option>
                                                                <option value='1.4'>Internet/Self check-in/Other non Face to Face</option>


                                                            </select>
                                                        </div>

                                                        <div className='form-group'>
                                                            <label htmlFor="">Geographic Risks</label>
                                                            <select
                                                                disabled
                                                                className='custom-select'
                                                                value={riskGradingData[1]}

                                                                name="geoRiskClient"
                                                            >
                                                                <option value='' disabled>--Select Client--</option>
                                                                <option value='2.1.1'>Resident Bangladeshi</option>
                                                                <option value='2.1.2'>Non-resident Bangladeshi</option>
                                                                <option value='2.1.3'>Foreign Citizen</option>



                                                            </select>
                                                        </div>

                                                        {/* For Foreigners */}

                                                        {
                                                            riskGradingData[1] === "2.1.3" ? (
                                                                <div>
                                                                    <div className='form-group'>
                                                                        <label htmlFor="">
                                                                            Does client's country of
                                                                            citizenship feature in
                                                                            FATF/EU/OFAC/UN Black
                                                                            List/Grey List?

                        </label>
                                                                        <select
                                                                            disabled
                                                                            className='custom-select'
                                                                            value={riskGradingData[2]}

                                                                            name="foreignOrigin"
                                                                        >
                                                                            <option value='' disabled>--Select Category--</option>
                                                                            <option value='2.2.1'>No</option>
                                                                            <option value='2.2.2'>Yes</option>

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            ) : ""
                                                        }


                                                        <div className="row d-flex justify-content-center">
                                                            <h3 className="col-sm-12 im">
                                                                Type Of Customer
                        </h3>

                                                        </div>
                                                        <hr />

                                                        <div className='form-group'>
                                                            <label htmlFor="">
                                                                Is client a PEP/Chief or High
                                                                Official of International
                                                                Organization, as per BFIU
                                                                Circular?

                        </label>
                                                            <select
                                                                disabled
                                                                className='custom-select'
                                                                value={riskGradingData[3]}

                                                                name="highOfficial"
                                                            >
                                                                <option value='' disabled>--Select Category--</option>
                                                                <option value='3.1.2'>Yes</option>
                                                                <option value='3.1.1'>No</option>

                                                            </select>
                                                        </div>

                                                        <div className='form-group'>
                                                            <label htmlFor="">
                                                                Is client’s family/close associates
                                                                related to PEP/Chief or High
                                                                Official of International
                                                                Organization?


                        </label>
                                                            <select
                                                                disabled
                                                                className='custom-select'
                                                                value={riskGradingData[4]}

                                                                name="closeHighOfficial"
                                                            >
                                                                <option value='' disabled>--Select Category--</option>
                                                                <option value='3.2.2'>Yes</option>
                                                                <option value='3.2.1'>No</option>

                                                            </select>
                                                        </div>

                                                        <div className='form-group'>
                                                            <label htmlFor="">
                                                                Is client a IP? or his family/close
                                                                associates related to IP?



                        </label>
                                                            <select
                                                                disabled
                                                                className='custom-select'
                                                                value={riskGradingData[5]}

                                                                name="isClientIp"
                                                            >
                                                                <option value='' disabled>--Select Category--</option>
                                                                <option value='3.3.2'>Yes - based on assessed risk</option>
                                                                <option value='3.3.1'>No</option>

                                                            </select>
                                                        </div>



                                                        <div className="row d-flex justify-content-center">
                                                            <h3 className="col-sm-12 im">
                                                                Product and Channel Risk
                        </h3>

                                                        </div>
                                                        <hr />

                                                        <div className='form-group'>
                                                            <label htmlFor="">Type of Product</label>
                                                            <select
                                                                disabled
                                                                className='custom-select'
                                                                value={riskGradingData[6]}

                                                                name="productTypes"
                                                            >
                                                                <option value='' disabled>--Select Status--</option>
                                                                <option value='4.1.1'>Savings account</option>
                                                                <option value='4.1.2'>Current account</option>
                                                                <option value='4.1.3'>FDR</option>
                                                                <option value='4.1.4'>Deposit Scheme upto12 lac</option>
                                                                <option value='4.1.5'>Deposit Scheme above 12 lac</option>
                                                                <option value='4.1.6'>Forex account</option>
                                                                <option value='4.1.7'>S.N.D.</option>
                                                                <option value='4.1.8'>R.F.C.D.</option>

                                                            </select>
                                                        </div>

                                                        <div className="row d-flex justify-content-center">
                                                            <h3 className="col-sm-12 im">
                                                                Business and Activity Risk
                        </h3>

                                                        </div>
                                                        <hr />

                                                        <div className="form-group d-flex justify-content-center">
                                                            {
                                                                business === true ? (
                                                                    <div class="form-check">
                                                                        <label class="form-check-label">
                                                                            <input type="radio" disabled class="form-check-input" name="optionsRadios" id="optionsRadios1" value="5.a" />
                                        Business
                                    </label>
                                                                    </div>
                                                                ) : (
                                                                        <div class="form-check">
                                                                            <label class="form-check-label">
                                                                                <input type="radio" disabled class="form-check-input" name="optionsRadios" id="optionsRadios1" value="5.b" />
                                        Profession
                                    </label>
                                                                        </div>
                                                                    )
                                                            }




                                                        </div>

                                                        {
                                                            business === true ? (
                                                                <div>

                                                                    <div className='form-group'>
                                                                        <label htmlFor="">Type of Product</label>
                                                                        <select
                                                                            disabled
                                                                            className='custom-select'
                                                                            value={riskGradingData[7]}

                                                                            name="businessName"
                                                                        >
                                                                            <option value='' disabled>--Select Business--</option>
                                                                            <option value='5.a.1'>Jeweller/Gold/Valuable Metals Business</option>
                                                                            <option value='5.a.2'>Money Changer/Courier Service/MobileBanking Agent</option>
                                                                            <option value='5.a.3'>Real Estate Developer/Agent</option>
                                                                            <option value='5.a.4'>Promoter/Contractor: ConstructionProjects</option>
                                                                            <option value='5.a.5'>Art and Antiquities Dealer</option>
                                                                            <option value='5.a.6'>Restaurant/Bar/NightClub/Parlour/Hotel</option>
                                                                            <option value='5.a.7'>Export/Import</option>
                                                                            <option value='5.a.8'>Manpower export</option>
                                                                            <option value='5.a.9'>Firearms</option>
                                                                            <option value='5.a.10'>RMG/Garments Accessories/BuyingHouse</option>
                                                                            <option value='5.a.11'>Share/Stocks Investor</option>
                                                                            <option value='5.a.12'>Software/Information and Technology Business</option>
                                                                            <option value='5.a.13'>Travel Agent</option>
                                                                            <option value='5.a.14'>Merchant with over 10 million takas invested in business</option>
                                                                            <option value='5.a.15'>Freight/Shipping/Cargo Agent</option>
                                                                            <option value='5.a.16'>Automobiles business (New or Reconditioned)</option>
                                                                            <option value='5.a.17'>Leather/Leather goods Business</option>
                                                                            <option value='5.a.18'>Construction Materials Trader</option>
                                                                            <option value='5.a.19'>Business Agent</option>
                                                                            <option value='5.a.20'>Thread/"Jhut" Merchant</option>
                                                                            <option value='5.a.21'>Transport Operator</option>
                                                                            <option value='5.a.22'>Tobacco and Cigarettes Business</option>
                                                                            <option value='5.a.23'>Amusement Park/Entertainment Provider</option>
                                                                            <option value='5.a.24'>Motor Parts Trader/Workshop</option>
                                                                            <option value='5.a.25'>Small Business (Investment below BDT 5 million)</option>
                                                                            <option value='5.a.26'>Computer/Mobile Phone Dealer</option>
                                                                            <option value='5.a.27'>Manufacturer (except, weapons)</option>
                                                                            <option value='5.a.28'>Others</option>

                                                                        </select>
                                                                    </div>



                                                                    <hr />
                                                                </div>

                                                            ) : ""
                                                        }

                                                        {
                                                            business === false ?
                                                                (
                                                                    <div>

                                                                        <div className='form-group'>
                                                                            <label htmlFor="">Type of Product</label>
                                                                            <select
                                                                                disabled
                                                                                className='custom-select'
                                                                                value={riskGradingData[7]}

                                                                                name="professionName"
                                                                            >
                                                                                <option value='' disabled>--Select Profession--</option>
                                                                                <option value='5.b.1'>Pilot/Flight Attendant</option>
                                                                                <option value='5.b.2'>Trustee</option>
                                                                                <option value='5.b.3'>Professional (Journalist, Lawyer, Doctor, Engineer, Chartered Accountant, etc.)</option>
                                                                                <option value='5.b.4'>Director (Private/Public Limited Company)</option>
                                                                                <option value='5.b.5'>High Official of Multinational Company (MNC)</option>
                                                                                <option value='5.b.6'>Homemaker</option>
                                                                                <option value='5.b.7'>Information Technology (IT) sector employee</option>
                                                                                <option value='5.b.8'>Athlete/Media Celebrity/Producer/Director</option>
                                                                                <option value='5.b.9'>Freelance Software Developer</option>
                                                                                <option value='5.b.10'>Government Service</option>
                                                                                <option value='5.b.11'>Landlord/Homeowner</option>
                                                                                <option value='5.b.12'>Private Service: Managerial</option>
                                                                                <option value='5.b.13'>Teacher (Public/Private/Autonomous Educational Institution)</option>
                                                                                <option value='5.b.14'>Private Sector Employee</option>
                                                                                <option value='5.b.15'>Self-employed Professional</option>
                                                                                <option value='5.b.16'>Student</option>
                                                                                <option value='5.b.17'>Retiree</option>
                                                                                <option value='5.b.18'>Farmer/Fisherman/Labourer</option>
                                                                                <option value='5.b.19'>Others</option>


                                                                            </select>
                                                                        </div>



                                                                        <hr />

                                                                    </div>

                                                                ) : ""
                                                        }





                                                        <div className="row d-flex justify-content-center">
                                                            <h3 className="col-sm-12 im">
                                                                Transactional Risks
                        </h3>

                                                        </div>
                                                        <hr />

                                                        <div className='form-group'>
                                                            <label htmlFor="">
                                                                What is the Client's Average
                                                                Yearly Transactions Worth?

                        </label>
                                                            <select
                                                                disabled
                                                                className='custom-select'
                                                                value={riskGradingData[8]}

                                                                name="yearlyTransaction"
                                                            >
                                                                <option value='' disabled>--Select Status--</option>
                                                                <option value='6.1.1'>Less than BDT 1 million</option>
                                                                <option value='6.1.2'>From BDT 1 million to 5 million</option>
                                                                <option value='6.1.3'>From BDT 5 million to 50 million</option>
                                                                <option value='6.1.4'>More than BDT 50 million</option>


                                                            </select>
                                                        </div>

                                                        <div className="row d-flex justify-content-center">
                                                            <h3 className="col-sm-12 im">
                                                                Transparency Risk
                        </h3>

                                                        </div>
                                                        <hr />

                                                        <div className='form-group'>
                                                            <label htmlFor="">
                                                                Does client has Provided
                                                                credible source of funds


                        </label>
                                                            <select
                                                                disabled
                                                                className='custom-select'
                                                                value={riskGradingData[9]}

                                                                name="hasSourceOfFunds"
                                                            >
                                                                <option value='' disabled>--Select Status--</option>
                                                                <option value='7.1.1'>No</option>
                                                                <option value='7.1.2'>Yes</option>



                                                            </select>
                                                        </div>








                                                    </form>
                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer imTwo">
                                        <span className="sbtnx" data-dismiss="modal">Close</span>

                                    </div>
                                </div>
                            </div>
                        </div>







                    </div>
                </div>


            </div>
        )
    }
}

export default FullEkyc
