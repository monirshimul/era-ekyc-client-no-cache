import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import MainFace from '../Simplified/MainFace';
//import NidImages from './FaceForms/NidImages';
//import Finger from '../Simplified/FingerMultiForm/Finger';
import FingerPrintMain from './FingerPrintJoint/FingerPrintMain';
import { simplifiedJointConfirmAPI } from '../Url/ApiList';
import { withRouter } from 'react-router-dom';
import './utils/Common.css'
import adult from './images/face-scan.svg'
import child from './images/fingerprint-three.svg'
import bio from './images/verified.svg'
import axios from 'axios';

export class DynamicComp extends Component {
    state = {
        jointArray: [],
        comp: '',
        showHide: false,
        accountId: '',
        processComplete: false
    }


    onProcess = e => {
        e.preventDefault();
        this.setState({
            accountId: JSON.parse(localStorage.getItem('accountId')),
            processComplete: true
        })
    }

    complete = async (e) => {
        e.preventDefault();
        // this.setState({
        //     accountId: JSON.parse(localStorage.getItem('accountId'))
        // })

        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };




        let obj = {
            accountId: this.state.accountId
        }

        try {
            let completeApi = await axios.post(simplifiedJointConfirmAPI, obj, config);
            console.log(completeApi.data);
            let statusCode = completeApi.data.statusCode;
            let successMessage = completeApi.data.message;
            NotificationManager.success(statusCode + " " + successMessage, "Success", 5000);
            localStorage.clear();
            this.props.history.push('/dashboard');
        } catch (err) {
            //console.log(err.response.data);
            let ErrorStatus = err.response.data.statusCode;
            let ErrorMessage = err.response.data.message;
            NotificationManager.error(ErrorStatus + " " + ErrorMessage, "Error", 5000);
        }
    }




    deleteComp = (index) => {
        const copyArray = Object.assign([], this.state.jointArray);
        copyArray.splice(index, 1);
        this.setState({
            jointArray: copyArray

        })
    }

    addComp = (val) => {

        const copyArray = Object.assign([], this.state.jointArray);
        copyArray.push({
            comp: val
        })
        this.setState({
            jointArray: copyArray,
            showHide: !this.state.showHide
        })
    }


    showHide = (e) => {
        e.preventDefault();
        this.setState({
            showHide: !this.state.showHide
        })
        //console.log("ShowHide", this.state.showHide)
    }



    render() {
        //console.log("stable", this.state.applicantId);
        let { showHide } = this.state
        return (
            <div className="col text-center" >


                {
                    this.state.jointArray.map((arr, index) => {
                        return (
                            <div className="my-3">
                                <h2 className="text-muted"><i className="fas fa-user" style={{ color: "#e3174c" }}></i> Applicant <small >{index + 1}</small></h2>
                                {arr.comp}
                                <hr />
                                {/* <button className="b" style={{ border: "none", background: "#e3174c" }} onClick={(e) => window.confirm("Are you sure? All your data will be lost.") && this.deleteComp(index)}>Delete</button> */}
                                <button className="b" style={{ border: "none", background: "#e3174c" }} onClick={(e) => this.deleteComp(index)}>Delete</button>
                                <br />
                                <hr />
                            </div>

                        )
                    })


                }

                {

                    this.state.jointArray.length > 1 && this.state.processComplete === false ?
                        <div>
                            <button className="neoBg" style={{ border: "none", background: "gray", color:'white' }} onClick={this.onProcess} >Finish Adding</button>
                        </div>
                        :
                        ""

                }

                {

                    this.state.jointArray.length > 1 && this.state.processComplete === true ?
                        <div>
                            <button className="b" style={{ border: "none", background: "green" }} onClick={this.complete} >Complete</button>
                        </div>
                        :
                        ""

                }



                {!showHide ? (
                    <div>
                        <hr />
                        <div className="row d-flex justify-content-center" >
                            <div className="imTwoWhite text-center">
                                <img
                                    src={bio}
                                    style={{
                                        margin: "0 auto",
                                        width: "250px",
                                        height: "150px",
                                        border: "none",
                                    }}

                                    className="img-fluid img-thumbnail"
                                    id="FrontNidPic"
                                    alt=""
                                />
                                <hr />

                                <h4 className="im" style={{ color: "green" }} onClick={this.showHide}><i class="fas fa-vote-yea"></i>  Select Biometric Options</h4>

                            </div>
                        </div>
                        <hr />

                    </div>


                ) : ""}





                {

                    showHide ? (
                        <div>
                            <hr />
                            <div className="row d-flex justify-content-center ">
                                <div className="col-sm-8 d-flex justify-content-around">
                                    <button className="imTwoWhite animated zoomIn" disabled={this.state.stableButton} style={{ border: "none", borderRadius: "10px" }} onClick={() => this.addComp(<MainFace />)}>

                                        <img
                                            src={adult}
                                            style={{
                                                margin: "0 auto",
                                                width: "300px",
                                                height: "150px",
                                                border: "none"

                                            }}

                                            className="img-fluid img-thumbnail"
                                            id="FrontNidPic"
                                            alt=""
                                        />



                                        <h4 className="im" style={{ color: "green" }}>Face</h4>

                                    </button>
                                    <button className="imTwoWhite animated zoomIn" disabled={this.state.stableButton} style={{ border: "none", borderRadius: "10px" }} onClick={() => this.addComp(<FingerPrintMain />)}>

                                        <img
                                            src={child}
                                            style={{
                                                margin: "0 auto",
                                                width: "300px",
                                                height: "150px",
                                                border: "none"

                                            }}

                                            className="img-fluid img-thumbnail"
                                            id="FrontNidPic"
                                            alt=""
                                        />
                                        <h4 className="im" style={{ color: "green" }}>Fingerprint</h4>

                                    </button>
                                </div>
                                {/* <div className="col-sm-8 d-flex justify-content-around mt-1">
                        <p className="text-muted imTwoWhite col-sm-5" >
                            <span style={{ color: "green", fontSize: "20px" }}>A facial recognition</span> system is a technology capable of identifying or verifying a person from a digital image or a video frame from a video source. <span style={{ color: "green", fontSize: "20px" }}>Face verification</span> is the task of comparing a candidate face to another, and verifying whether it is a match. It is a one-to-one mapping: you have to check if this person is the correct one.
                            </p>
                        <p className="text-muted imTwoWhite col-sm-5" >
                            <span style={{ color: "green", fontSize: "20px" }}>Fingerprint </span>recognition allows a person to be verified or identified through the analysis and comparison of his or her finger dermal ridges. <span style={{ color: "green", fontSize: "20px" }}>Fingerprint recognition</span> was one of the first techniques used for automatically identifying people and today is still one of the most popular and effective <span style={{ color: "green", fontSize: "20px" }}>biometric</span> techniques.
                            </p>
                    </div> */}


                            </div>
                            <hr />
                        </div>

                    ) : ""
                }




                {/* <button disabled={this.state.stableButton} className="bigB mr-2" style={{ border: "none" }} onClick={() => this.addComp(<MainFace />)}>Face</button>
                <button disabled={this.state.stableButton} className="bigB" style={{ border: "none" }} onClick={() => this.addComp(<Finger />)}>Finger</button> */}
            </div>
        )
    }
}

export default withRouter(DynamicComp);