import React, { Component } from 'react'
import Nav from './Nav';
import Welcome from './Welcome';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { FaAngleRight, FaBackspace, FaArrowRight } from "react-icons/fa";
//import MultiStepFace from '../E-KYC/Simplified/MainFace'
import JointMultiStep from '../E-KYC/Simplified/FaceJoint/DynamicComp';
import Success from '../E-KYC/Role/SuccessRole';
import footerWave from './image/footerWave6.svg'
import data from './image/protect.svg'
import ReactTooltip from 'react-tooltip';
// Reg Joint Dynamic Component
import RegDynamicComp from '../E-KYC/Regular/RegJointFace/RegDynamicComp';

import { logoutUser, getAppSetting } from '../E-KYC/Url/ApiList';
import { NotificationManager } from "react-notifications";
import { getProfile } from '../E-KYC/Url/ApiList';
import { image } from '../E-KYC/Profile/damiImage';


import "./sidebar.css";
import { pruneRouteArray, getFlatRouteArray } from '../flattenObjectTwo';
import profileImage from "./image/undraw_profile_pic_ic5t.svg"
//import profileImage from "../Page-Loader/era.png"
// E-kyc List
import ShowMore from '../E-KYC/ekyc-list/ShowMore';
import fullEkyc from '../E-KYC/ekyc-list/FullEkyc';

// Channel Account Search Full Data
// import fullChannelData from '../E-KYC/Account/ChannelAccountSearch/FullChannelData';
// Reopen Complete
import ReopenComplete from '../E-KYC/Account/ReopenComplete';
// ===============Simplified start==============
//import FaceOrFinger from '../E-KYC/Simplified/FaceOrFinger';
import SimFaceOrFinger from '../E-KYC/Simplified/SimFace/SimFaceOrFinger';
import SimFaceMain from '../E-KYC/Simplified/SimFace/SimFaceMain';
import SimFingerMain from '../E-KYC/Simplified/SimFinger/SimFingerMain';
// face Verification forms
// import NidImages from '../E-KYC/Simplified/FaceForms/NidImages';
// import CaptureFace from '../E-KYC/Simplified/FaceForms/CaptureFace';
// import PersonalDetails from '../E-KYC/Simplified/FaceForms/PersonalDetails';
// import Nominee from '../E-KYC/Simplified/FaceForms/Nominee';
// import Signature from '../E-KYC/Simplified/FaceForms/Signature';
// import ConfirmInfo from '../E-KYC/Simplified/FaceForms/ConfirmInfo';
// import Complete from '../E-KYC/Simplified/FaceForms/Complete';

// Finger Verification Forms
// import FingerPrint from '../E-KYC/Simplified/FingerForms/FingerPrint';
// import CustomerPic from '../E-KYC/Simplified/FingerForms/CustomerPic';
// ===============Simplified end==============

//==================Regular Start======================
import RegFaceOrFinger from '../E-KYC/Regular/RegFaceOrFinger';
import RegFaceMain from '../E-KYC/Regular/RegFace/RegFaceMain';
import RegFingerPrintMain from '../E-KYC/Regular/RegFingerPrint/RegFingerPrintMain';
// Face Verification
// import NidImagesReg from '../E-KYC/Regular/FaceFormsRegular/NidImagesReg';
// import CaptureFaceReg from '../E-KYC/Regular/FaceFormsRegular/CaptureFaceReg';
// import PersonalDetailsReg from '../E-KYC/Regular/FaceFormsRegular/PersonalDetailsReg';
// import NomineeReg from '../E-KYC/Regular/FaceFormsRegular/NomineeReg';
// import SignatureReg from '../E-KYC/Regular/FaceFormsRegular/SignatureReg';
// import ConfirmInfoReg from '../E-KYC/Regular/FaceFormsRegular/ConfirmInfoReg';
// import CompleteReg from '../E-KYC/Regular/FaceFormsRegular/CompleteReg';

// Finger Verification Forms
// import FingerPrintReg from '../E-KYC/Regular/FingerFormsRegular/FingerPrintReg';
// import CustomerPicReg from '../E-KYC/Regular/FingerFormsRegular/CustomerPicReg';

//==================Regular End========================

import NidFingerMain from '../E-KYC/NidVerify/NidFinger/NidFingerMain';
import NidFaceMain from '../E-KYC/NidVerify/NidFace/NidFaceMain';


import { withRouter } from 'react-router-dom';
import axios from 'axios';
import UpgradeDetails from '../E-KYC/Upgrade-ekyc/UpgradeDetails';
import MultiUpgrade from '../E-KYC/Upgrade-ekyc/MulitStepUpgrade.js/MultiUpgrade';
import IdleTimer from 'react-idle-timer';
import { largeTime } from './../Utils/notificationTime';








class Dashboard extends Component {



    state = {
        isLogOut: false,
        userProfileImage: JSON.parse(localStorage.getItem("profileImage")) === null ? "" : JSON.parse(localStorage.getItem("profileImage")),
        flag: 'data:image/jpeg;base64,',
        quickLinks: '',
        imgFlag: false,
        isAuthToken: JSON.parse(sessionStorage.getItem('x-auth-token')),
        idleTimeVal: JSON.parse(sessionStorage.getItem('idleTimeout'))
    }

    // feature = JSON.parse(sessionStorage.getItem("featureList"));
    // firstMenu = pruneRouteArray(this.feature);
    // allMenu = getFlatRouteArray(this.firstMenu);



    constructor() {
        super();
        this.idleTimer = null;
        if (this.state.isAuthToken !== null) {
            this.feature = JSON.parse(sessionStorage.getItem("featureList"));
            this.firstMenu = pruneRouteArray(this.feature);
            this.allMenu = getFlatRouteArray(this.firstMenu);
        }

    }






    async componentDidMount() {

        if (this.state.isAuthToken !== null) {
            this.feature = JSON.parse(sessionStorage.getItem("featureList"))


            this.firstMenu = pruneRouteArray(this.feature);

            this.allMenu = getFlatRouteArray(this.firstMenu);
            // this.setState({
            //     quickLinks:this.allMenu
            // })
            // console.log(this.firstMenu)
            //sessionStorage.setItem("quickLinks", JSON.stringify(this.firstMenu))


            const config = {
                headers: {
                    'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
                }

            };

            try {
                let res = await axios.get(getProfile, config);
                let profileData = res.data.data;
                //console.log("profileData", profileData)
                this.setState({

                    userProfileImage: profileData.userImage === null ? image.data : profileData.userImage.data
                })



            } catch (error) {
                console.log("Error", error)
                if (error.response) {
                    let message = error.response.data.message
                    console.log("Error", error)
                    NotificationManager.error(message, "Error", 5000);
                } else if (error.request) {
                    console.log("Error Connecting...", error.request)
                    NotificationManager.error("Error Connecting...", "Error", 5000);
                } else if (error) {
                    NotificationManager.error(error.toString(), "Error", 5000);
                }
            }
        }


        // console.log("mount Called")

    }
    // async componentDidUpdate(prevProps, prevState) {
    //     console.log("profileData")
    //     if (prevState.userProfileImage !== this.state.userProfileImage) {
    //         const config = {
    //             headers: {
    //                 'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
    //             }

    //         };

    //         try {
    //             let res = await axios.get(getProfile, config);
    //             let profileData = res.data.data;
    //             //console.log("profileData", profileData)
    //             this.setState({

    //                 userProfileImage: profileData.userImage === null ? image.data : profileData.userImage.data
    //             })



    //         } catch (error) {
    //             if (error.response) {
    //                 let message = error.response.data.message
    //                 //console.log("Error",error.response)
    //                 NotificationManager.error(message, "Error", 5000);
    //             } else if (error.request) {
    //                 console.log("Error Connecting...", error.request)
    //                 NotificationManager.error("Error Connecting...", "Error", 5000);
    //             } else if (error) {
    //                 NotificationManager.error(error.toString(), "Error", 5000);
    //             }
    //         }

    //     }
    // }
    // componentWillMount(){
    //     console.log("In the will mount")
    // }

    // componentWillUnmount(){


    //     console.log("Unmount Called")
    // }



    //======================== Logout Function In the Navbar ==================================
    logOut = async (e) => {

        e.preventDefault();

        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        try {
            // console.log("config", config);
            let res = await axios.post(logoutUser, null, config);
            //console.log(res.data);
            sessionStorage.clear();
            localStorage.clear();
            this.setState({
                isLogOut: !this.state.isLogOut
            })




        } catch (err) {
            if (err.response) {
                let message = "Logout Failed";
                NotificationManager.error(message, "Click TO Remove", largeTime);
            } else if (err.request) {
                NotificationManager.error(
                    "Error Connecting...",
                    "Click TO Remove",
                    largeTime
                );
            } else if (err) {
                NotificationManager.error(
                    err.toString(),
                    "Click TO Remove",
                    largeTime
                );
            }
        }


    }


    //=========== Testing The Feature File ===============

    // firstMenu.map((v, i) => {
    //     if (v === undefined) {

    //     } else {
    //         console.log("Key ", v.items.key)
    //         console.log("First Nested", v.nested)
    //         v.nested.map((x, n) => {
    //             if (x === undefined) {

    //             } else {
    //                 console.log("Key ", x.items.key)
    //                 console.log("Second Nested", x.nested)
    //                 if (x.nested) {
    //                     x.nested.map((z, m) => {
    //                         console.log("Key ", z.items.key)
    //                         console.log("Third Nested", z.items)
    //                     })
    //                 }

    //             }
    //         })
    //     }
    // })

    //=========== End of Testing The Feature File ===============

    // Idle Timer onIdle Function Implementation start////////////////////////////

    onIdle = async () => {

        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        try {
            let res = await axios.post(logoutUser, "", config);
            // console.log("logoutComplete", res.data);
            sessionStorage.clear();
            localStorage.clear();
            this.setState({
                isLogOut: !this.state.isLogOut
            })

        } catch (error) {
            if (error.response) {
                let message = "Logout Failed";
                NotificationManager.error(message, "Click TO Remove", largeTime);
            } else if (error.request) {
                NotificationManager.error(
                    "Error Connecting...",
                    "Click TO Remove",
                    largeTime
                );
            } else if (error) {
                NotificationManager.error(
                    error.toString(),
                    "Click TO Remove",
                    largeTime
                );
            }
        }


    }


    // Idle Timer onIdle Function Implementation start////////////////////////////


    render() {
        let path = this.props.match.path;
        let url = this.props.match.url;
        let { userProfileImage, flag, idleTimeVal } = this.state;

        //================= Redirect to login page,,,for componentUnmount =====================
        // console.log("Auth Token", this.state.isAuthToken);
        if (this.state.isAuthToken === null) {
            return <Redirect to="/" push={true} />
        }

        if (this.state.isLogOut) {
            return <Redirect to="/" push={true} />
        }

        return (

            <Router >
                <div style={{ minHeight: "100%" }}>
                    {/*Idle Timer Implementation Start */}
                    <IdleTimer
                        ref={ref => { this.idleTimer = ref }}
                        timeout={1000 * 60 * idleTimeVal}
                        onIdle={this.onIdle}
                    >
                    </IdleTimer>
                    {/*Idle Timer Implementation End */}

                    <Nav logOut={this.logOut} />
                    <div className="d-flex" style={{ margin: "0", padding: "0", overflowX: "hidden" }}>
                        <ReactTooltip id="show" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize: "15px" }}> Expand Sidebar</span>
                        </ReactTooltip>
                        <ReactTooltip id="hide" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize: "15px" }}> Hide Sidebar</span>
                        </ReactTooltip>
                        <input type="checkbox" id="check" />
                        <label htmlFor="check">
                            <i id="cancel" data-tip data-for="hide"><FaBackspace /></i>
                            <i id="showMenu" data-tip data-for="show"><FaArrowRight /></i>
                        </label>
                        <div id="sidebar">
                            <div id="profile_info">
                                <div id="profile_img">
                                    <img src={userProfileImage ? flag + userProfileImage : profileImage}

                                        alt="profile_img"

                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%"
                                        }}
                                    />
                                </div>
                                <div id="profile_data">
                                    {/* <p id="name">{profile.name}</p> */}

                                </div>
                            </div>

                            <ul>


                                {this.firstMenu.map((route, index) => (
                                    <div key={index}>
                                        {
                                            route !== undefined ? (
                                                <div>
                                                    <li>
                                                        {/* First Menu */}
                                                        <Link id="linkOne" to={`${url}${route.items.path}`}><span className="mr-2" style={{}}>{route.items.className}</span> <span id="menuOne">{route.items.featureName} {route.nested ? <i style={{ float: "right" }}><FaAngleRight /></i> : ""}</span> </Link>

                                                        <div id="sub-menu-one">
                                                            <ul>
                                                                {
                                                                    route.nested.map((nest, ind) => (
                                                                        <div key={ind}>
                                                                            {
                                                                                nest !== undefined && nest.items.isShowing === true ? (
                                                                                    <li id="side-menu">
                                                                                        {/* First Nested Menu */}
                                                                                        <Link to={`${url}${nest.items.path}`}>{nest.items.featureName} {nest.nested ? <i style={{ float: "right" }}><FaAngleRight /></i> : ""}</Link>

                                                                                        <div id="sub-menu-two">
                                                                                            <ul>
                                                                                                {
                                                                                                    nest.nested ? (
                                                                                                        nest.nested.map((deepNest, index) => (
                                                                                                            <div key={index}>
                                                                                                                {
                                                                                                                    deepNest !== undefined && deepNest.items.isShowing === true ? (
                                                                                                                        <li>
                                                                                                                            {/* Second Nested menu */}
                                                                                                                            <Link to={`${url}${deepNest.items.path}`}>{deepNest.items.featureName} {deepNest.nested ? <i style={{ float: "right" }}><FaAngleRight /></i> : ""}</Link>
                                                                                                                        </li>

                                                                                                                    ) : ""
                                                                                                                }
                                                                                                            </div>
                                                                                                        ))
                                                                                                    ) : ""

                                                                                                }
                                                                                            </ul>

                                                                                        </div>
                                                                                    </li>
                                                                                ) : ""
                                                                            }
                                                                        </div>
                                                                    ))}
                                                            </ul>
                                                        </div>
                                                    </li>

                                                </div>
                                            ) : ""
                                        }


                                    </div>


                                ))}

                            </ul>

                        </div>






                        {/*Start Content Area */}



                        <div className="container my-5">
                            <img

                                src={data}
                                style={{

                                    width: "30vw",
                                    position: "absolute",
                                    zIndex: "-2",
                                    outline: "none",
                                    right: "0",
                                    top: "10%",
                                    margin: "0",
                                    padding: "0",
                                    border: "none",
                                    opacity: "0.3"
                                }}
                                className=" img-fluid img-thumbnail"
                                id='SignaturePic'
                                alt=""
                            />
                            <div className="row d-flex justify-content-center" >


                                <Switch>
                                    <Route exact path={path} component={() => <Welcome />} />

                                    {this.allMenu.map((route, index) => (



                                        <Route
                                            key={index}
                                            path={`${path}${route.path}`}
                                            exact={route.exact}


                                        >
                                            {route.component}
                                        </Route>

                                    ))}

                                    {/* E-kyc List */}
                                    <Route path={`${path}/showMore`} component={ShowMore} />
                                    <Route path={`${path}/fullEkyc`} component={fullEkyc} />

                                    {/*Channel Account Data List */}
                                    {/* 
                                    <Route path={`${path}/fullChannelEkycData`} component={fullChannelData} />
                                    */}

                                    {/*Reopen Complete Page */}
                                    <Route path={`${path}/reopencofirm`} component={ReopenComplete} />
                                    {/* MultiSteps */}
                                    {/* <Route path={`${path}/face-account`} component={MultiStepFace} /> */}
                                    <Route path={`${path}/dynamic-comp`} component={JointMultiStep} />
                                    <Route path={`${path}/reg-dynamiccomp`} component={RegDynamicComp} />


                                    {/* Success Role */}
                                    <Route path={`${path}/success`} component={Success} />


                                    {/* Simplified */}
                                    {/* face forms */}
                                    {/* <Route path={`${path}/nid-images`} component={NidImages} />
                                    <Route path={`${path}/type-verification`} component={FaceOrFinger} />
                                    <Route path={`${path}/capture-face`} component={CaptureFace} />
                                    <Route path={`${path}/personal-details`} component={PersonalDetails} />
                                    <Route path={`${path}/nominee`} component={Nominee} />
                                    <Route path={`${path}/signature`} component={Signature} />
                                    <Route path={`${path}/confirm-info`} component={ConfirmInfo} />
                                    <Route path={`${path}/complete`} component={Complete} /> */}

                                    {/* Finger Forms  */}
                                    {/* <Route path={`${path}/finger-print`} component={FingerPrint} />
                                    <Route path={`${path}/customer-photo`} component={CustomerPic} /> */}


                                    {/* Regular */}

                                    {/* face forms */}
                                    {/* <Route path={`${path}/regular-nidimages`} component={NidImagesReg} />
                                    <Route path={`${path}/regular-typeverification`} component={FaceOrFingerReg} />
                                    <Route path={`${path}/regular-captureface`} component={CaptureFaceReg} />
                                    <Route path={`${path}/regular-personaldetails`} component={PersonalDetailsReg} />
                                    <Route path={`${path}/regular-nominee`} component={NomineeReg} />
                                    <Route path={`${path}/regular-signature`} component={SignatureReg} />
                                    <Route path={`${path}/regular-confirminfo`} component={ConfirmInfoReg} />
                                    <Route path={`${path}/regular-complete`} component={CompleteReg} />
                                    <Route path={`${path}/regular-riskGrading`} component={RiskGrading} /> */}


                                    {/* Finger Forms  */}
                                    {/* <Route path={`${path}/regular-fingerprint`} component={FingerPrintReg} />
                                    <Route path={`${path}/regular-customerphoto`} component={CustomerPicReg} /> */}


                                    {/* Simplified */}

                                    <Route path={`${path}/simplified-face`} component={SimFaceMain} />
                                    <Route path={`${path}/simplified-finger`} component={SimFingerMain} />
                                    <Route path={`${path}/type-verification`} component={SimFaceOrFinger} />

                                    {/* Regular */}
                                    <Route path={`${path}/regular-typeverification`} component={RegFaceOrFinger} />
                                    <Route path={`${path}/regular-face`} component={RegFaceMain} />
                                    <Route path={`${path}/regular-fingerprint`} component={RegFingerPrintMain} />

                                    {/* convert sim to Regular */}
                                    <Route path={`${path}/upgrade-details`} component={UpgradeDetails} />
                                    <Route path={`${path}/multiform-Regular-conversion`} component={MultiUpgrade} />

                                    {/* Nid Verification*/}

                                    <Route path={`${path}/nid-face`} component={NidFaceMain} />
                                    <Route path={`${path}/nid-finger`} component={NidFingerMain} />



                                </Switch>




                            </div>



                        </div>









                    </div>

                    {/* Footer */}



                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill=" #099e96" fill-opacity="0.5" d="M0,256L80,240C160,224,320,192,480,197.3C640,203,800,245,960,218.7C1120,192,1280,96,1360,48L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                        </svg> */}
                    <img

                        src={footerWave}
                        style={{

                            width: "100vw",
                            position: "absolute",
                            zIndex: "-3",
                            outline: "none",
                            bottom: "0",
                            right: "0",
                            margin: "0",
                            padding: "0",
                            border: "none"
                        }}
                        className=" img-fluid img-thumbnail"
                        id='SignaturePic'
                        alt=""
                    />
                    <div className="d-flex justify-content-center">
                        <small className="" style={{ position: "absolute", bottom: "15px", color: "#333", fontSize: "14px" }}>© 2020 All rights reserved to ERA-InfoTech Ltd.</small>
                    </div>










                </div>
            </Router>

        )
    }
}



export default withRouter(Dashboard);
