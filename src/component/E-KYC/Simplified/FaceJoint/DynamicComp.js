import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import MainFace from './MainFace';
//import NidImages from './FaceForms/NidImages';
//import Finger from '../Simplified/FingerMultiForm/Finger';
import FingerPrintMain from '../FingerPrintJoint/FingerPrintMain';
import { simplifiedJointConfirmAPI } from '../../Url/ApiList';
import { withRouter } from 'react-router-dom';
import '../utils/Common.css';
import adult from '../images/face-scan.svg'
import child from '../images/fingerprint-three.svg'
import bio from '../images/verified.svg'
import userDelete from '../images/userDel.svg'
import userAdd from '../images/userAdd.svg'
import userFinish from '../images/userFinish.svg'
import complete from '../images/complete.svg'
import axios from 'axios';
import Loading from '../utils/CustomLoding/Loading';

export class DynamicComp extends Component {
    state = {
        jointArray: [],
        comp: '',
        showHide: false,
        bioShow: false,
        finishAdd: false,
        accountId: '',
        processComplete: false,
        loadingFlag: false,
    }


    onProcess = e => {
        e.preventDefault();
        this.setState({
            accountId: JSON.parse(sessionStorage.getItem('accountId')),
            processComplete: true,
            showHide:!this.state.showHide,
            finishAdd: !this.state.finishAdd
            
        })
    }

    complete = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };




        let obj = {
            accountId: this.state.accountId
        }

        try {
            this.setState({ loadingFlag: true });
            let completeApi = await axios.post(simplifiedJointConfirmAPI, obj, config);
            //console.log(completeApi.data);
            this.setState({ loadingFlag: false });
            let statusCode = completeApi.data.statusCode;
            let successMessage = completeApi.data.message;
            NotificationManager.success(statusCode + " " + successMessage, "Success", 5000);
            //localStorage.clear();
            sessionStorage.removeItem("accountId");
            this.props.history.push('/dashboard');
        } catch (error) {
            //console.log(err.response.data);
            this.setState({ loadingFlag: false });
            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                //console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }
    }




    deleteComp = (index) => {
        const copyArray = Object.assign([], this.state.jointArray);
        copyArray.splice(index, 1);
        this.setState({
            jointArray: copyArray

        })
        if (index === 0) {
            this.setState({
                bioShow: !this.state.bioShow, 
                
            })


        }

        if(this.state.bioShow === false){
            this.setState({
                bioShow: !this.state.bioShow,
                showHide: true,
                finishAdd: true
                
            })
        }
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

    bioShow = () => {
        this.setState({
            bioShow: !this.state.bioShow,
            showHide: true,
            finishAdd: true
            
            
        })
    }



    render() {
        //console.log("stable", this.state.applicantId);
        let { showHide, bioShow, finishAdd } = this.state
        //console.log(this.state.jointArray.length)
        return (
            <div className="container" >




                {
                    this.state.jointArray.map((arr, index) => {
                        return (
                            <div className="">
                                <h2 style={{ fontSize: "17px" }} className="text-muted im text-center"><i className="fas fa-user" style={{ color: "#e3174c" }}></i> Applicant <span style={{ fontSize: "17px" }}>{index + 1}</span></h2>
                                {arr.comp}
                                <hr />
                                {/* <button className="b" style={{ border: "none", background: "#e3174c" }} onClick={(e) => window.confirm("Are you sure? All your data will be lost.") && this.deleteComp(index)}>Delete</button> */}
                                {/* <button className="b" style={{ border: "none", background: "#e3174c" }} onClick={(e) => this.deleteComp(index)}>Delete</button>
                                 */}

                                <div>
                                    <hr />
                                    <div className="row d-flex justify-content-center" >
                                        {
                                            finishAdd ? (
                                                <div className="imTwoWhite text-center col-sm-3">
                                            <img
                                                src={userDelete}
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

                                            <h4 className="im" style={{ color: "green" }} onClick={(e) => this.deleteComp(index)}><i class="fas fa-vote-yea"></i>  Delete Applicant <span style={{ fontSize: "17px" }}>{index + 1}</span></h4>

                                        </div>
                                            ):""
                                        }
                                        
                                        {
                                            !showHide && index + 1 === this.state.jointArray.length ? (
                                                <div className="imTwoWhite text-center col-sm-3">
                                                    <img
                                                        src={userAdd}
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

                                                    <h4 className="im" style={{ color: "green" }} onClick={this.showHide}><i class="fas fa-vote-yea"></i>  Add New Applicant</h4>

                                                </div>
                                            ) : ""
                                        }


                                        {
                                            this.state.jointArray.length > 1 && this.state.processComplete === false && index + 1 === this.state.jointArray.length ?


                                                <div className="imTwoWhite text-center col-sm-3">
                                                    <img
                                                        src={userFinish}
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

                                                    <h4 className="im" style={{ color: "green" }} onClick={this.onProcess}><i class="fas fa-vote-yea"></i>  Finish Adding</h4>

                                                </div>


                                                :
                                                ""
                                        }


                                        {

                                            this.state.jointArray.length > 1 && this.state.processComplete === true && index + 1 === this.state.jointArray.length ?

                                                
                                                    <div className="imTwoWhite text-center col-sm-3">
                                                    <img
                                                        src={complete}
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

                                                    <h4 className="im" disabled={this.state.loadingFlag} style={{ color: "green" }} onClick={this.complete}><i class="fas fa-vote-yea"></i>  Complete</h4>
                                                    {/* <button className="b" disabled={this.state.loadingFlag} style={{ border: "none", background: "green" }} onClick={this.complete} >Complete</button> */}

                                                </div>
                                                    
                                                
                                                :
                                                ""

                                        }






                                    </div>


                                </div>

                                <hr />
                            </div>

                        )
                    })


                }



                {this.state.loadingFlag ? <Loading /> : ''}
                <br />







                {!bioShow ? (
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

                                <h4 className="im" style={{ color: "green" }} onClick={this.bioShow}><i class="fas fa-vote-yea"></i>  Select Biometric Options</h4>

                            </div>
                        </div>
                        <hr />

                    </div>


                ) : ""}





                {

                    showHide && finishAdd  ? (
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