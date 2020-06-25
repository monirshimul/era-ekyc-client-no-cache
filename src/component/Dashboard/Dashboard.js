import React, { Component } from 'react'
import Nav from './Nav';
import Welcome from './Welcome';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import MultiStepFace from '../E-KYC/Simplified/MainFace'
import JointMultiStep from '../E-KYC/Simplified/DynamicComp';
import Success from '../E-KYC/Role/SuccessRole';

import { logoutUser } from '../E-KYC/Url/ApiList';

import "./sidebar.css";
import { pruneRouteArray, getFlatRouteArray } from '../flattenObjectTwo';
import profileImage from "./image/undraw_profile_pic_ic5t.svg"
// E-kyc List
import ShowMore from '../E-KYC/ekyc-list/ShowMore';
import fullEkyc from '../E-KYC/ekyc-list/FullEkyc';

// face Verification forms
import NidImages from '../E-KYC/Simplified/FaceForms/NidImages';
import CaptureFace from '../E-KYC/Simplified/FaceForms/CaptureFace';
import PersonalDetails from '../E-KYC/Simplified/FaceForms/PersonalDetails';
import Nominee from '../E-KYC/Simplified/FaceForms/Nominee';
import Signature from '../E-KYC/Simplified/FaceForms/Signature';
import ConfirmInfo from '../E-KYC/Simplified/FaceForms/ConfirmInfo';
import Complete from '../E-KYC/Simplified/FaceForms/Complete';

// Finger Verification Forms
import FingerPrint from '../E-KYC/Simplified/FingerForms/FingerPrint';
import CustomerPic from '../E-KYC/Simplified/FingerForms/CustomerPic';

import { withRouter } from 'react-router-dom';
import axios from 'axios';
import FaceOrFinger from '../E-KYC/Simplified/FaceOrFinger';


class Dashboard extends Component {

    state = {
        isLogOut: false
    }

    feature = JSON.parse(sessionStorage.getItem("featureList"));
    firstMenu = pruneRouteArray(this.feature);
    allMenu = getFlatRouteArray(this.firstMenu);


    //const [profile, setProfile] = useState(JSON.parse(sessionStorage.getItem("profile")));

    componentDidMount() {
        console.log("componentDidMount Called==============")

        this.feature = JSON.parse(sessionStorage.getItem("featureList"))


        this.firstMenu = pruneRouteArray(this.feature);

        this.allMenu = getFlatRouteArray(this.firstMenu);

        // console.log("mount Called")

    }
    // componentWillMount(){
    //     console.log("In the will mount")
    // }

    // componentWillUnmount(){
       

    //     console.log("Unmount Called")
    // }



    //======================== Logout Function In the Navbar ==================================
    logOut = async (e)=>{

        e.preventDefault();

        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        try {
           // console.log("config", config);
            let res = await axios.post(logoutUser, null, config);
            console.log(res.data);
            sessionStorage.clear();
            localStorage.clear();
            this.setState({
                isLogOut: !this.state.isLogOut
            })
            

           
            
        }catch (err) {
             console.log(err.response);
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





    render() {
        let path = this.props.match.path;
        let url = this.props.match.url;

        //================= Redirect to login page,,,for componentUnmount =====================
        if (this.state.isLogOut) {
            return <Redirect to="/" push={true} />
        } 

        return (
            <Router>
                <div>                 
                    <Nav logOut = {this.logOut}/>
                    <div className="d-flex" style={{ margin: "0", padding: "0", overflowX: "hidden" }}>
                        <input type="checkbox" id="check" />
                        <label htmlFor="check">
                            <i className="fas fa-backspace" id="cancel"></i>
                            <i className="fas fa-arrow-right" id="showMenu"></i>
                        </label>
                        <div id="sidebar">
                            <div id="profile_info">
                                <div id="profile_img">
                                    <img src={profileImage}
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
                                                        <Link id="linkOne" to={`${url}${route.items.path}`}><i className={route.items.className}></i><span id="menuOne">{route.items.featureName} {route.nested ? <i className="fas fa-angle-right" style={{ marginTop: "3px" }}></i> : ""}</span> </Link>

                                                        <div id="sub-menu-one">
                                                            <ul>
                                                                {
                                                                    route.nested.map((nest, ind) => (
                                                                        <div key={ind}>
                                                                            {
                                                                                nest !== undefined && nest.items.isShowing === true ? (
                                                                                    <li id="side-menu">
                                                                                        {/* First Nested Menu */}
                                                                                        <Link to={`${url}${nest.items.path}`}>{nest.items.featureName} {nest.nested ? <i className="fas fa-angle-right" style={{ marginTop: "3px" }}></i> : ""}</Link>

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
                                                                                                                            <Link to={`${url}${deepNest.items.path}`}>{deepNest.items.featureName} {deepNest.nested ? <i className="fas fa-angle-right" style={{ marginTop: "3px" }}></i> : ""}</Link>
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
                            <div className="row d-flex justify-content-center" >


                                <Switch>
                                    <Route exact path={path} component={Welcome} />

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


                                    {/* MultiSteps */}
                                    {/* <Route path={`${path}/face-account`} component={MultiStepFace} /> */}
                                    <Route path={`${path}/dynamic-comp`} component={JointMultiStep} />

                                    {/* face forms */}
                                    <Route path={`${path}/nid-images`} component={NidImages} />
                                    <Route path={`${path}/type-verification`} component={FaceOrFinger} />
                                    <Route path={`${path}/capture-face`} component={CaptureFace} />
                                    <Route path={`${path}/personal-details`} component={PersonalDetails} />
                                    <Route path={`${path}/nominee`} component={Nominee} />
                                    <Route path={`${path}/signature`} component={Signature} />
                                    <Route path={`${path}/confirm-info`} component={ConfirmInfo} />
                                    <Route path={`${path}/complete`} component={Complete} />

                                    {/* Finger Forms  */}
                                    <Route path={`${path}/finger-print`} component={FingerPrint} />
                                    <Route path={`${path}/customer-photo`} component={CustomerPic} />

                                    <Route path={`${path}/success`} component={Success} />


                                </Switch>




                            </div>

                        </div>








                    </div>



                </div>
            </Router>

        )
    }
}



export default withRouter(Dashboard);
