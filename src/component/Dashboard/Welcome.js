import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios'
import profileImage from "./image/undraw_profile_pic_ic5t.svg"
import Watch from './Watch/Watch';
import { connect } from 'react-redux';
import { NotificationManager } from "react-notifications";
import { getProfile } from '../E-KYC/Url/ApiList';
import { image } from '../E-KYC/Profile/damiImage';



class Welcome extends Component {

    state = {
        showLinks: false,
        userProfileImage: '',
        flag: 'data:image/jpeg;base64,',
        quickLinks: JSON.parse(sessionStorage.getItem("quickLinks")) === null ? [] : JSON.parse(sessionStorage.getItem("quickLinks")),
        linkShower:false
    }


    async componentDidMount() {

        this.setState({
            linkShower: !this.state.linkShower
        })

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
        }

    }

    componentDidUpdate(prevProps, prevState) {
        //console.log("In the welcome")
        if (prevState.linkShower !== this.state.linkShower) {
            this.setState({
            quickLinks:JSON.parse(sessionStorage.getItem("quickLinks"))
            })
        }
    }


    onLinkShow = () => {
        this.setState({
            showLinks: !this.state.showLinks
        })
    }



    render() {
        let path = this.props.match.path;
        let url = this.props.match.url;
        let { userProfileImage, flag, quickLinks, showLinks } = this.state
        console.log("quickLinks", quickLinks)
        return (
            <div className="container">

                <div className="" style={{ padding: "5px" }}>

                    <Watch />
                    <hr />
                </div>


                <div className="row divBg justify-content-center" style={{ padding: "10px 0px" }}>

                    <img src={userProfileImage ? flag + userProfileImage : profileImage}
                        alt="profile_img"

                        style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.24)"
                        }}
                    />

                </div>
                <div className="row justify-content-center" style={{ color: "green" }}>
                    <small className="text-center"><i class="fas fa-dungeon"></i> Welcome</small>

                </div>
                <hr />






                <div className="jumbotron im" style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.24)", padding: "50px" }} >

                    <h4 className="text-center text-muted ">
                        <i class="fas fa-link"></i> Quick Links
                </h4>
                    <div className="row d-flex justify-content-between">

                        {
                            quickLinks.map((vals, ind) => (
                                <div className="col-sm-2">
                                    {
                                        vals !== undefined ? (
                                            <div className="" >
                                                {
                                                    vals.nested !== null ? (
                                                        <div>

                                                            {
                                                                vals.nested.map((nest, ind) => (
                                                                    <div>
                                                                        {
                                                                            nest !== undefined && nest !== null && nest.items.isShowing === true ? (
                                                                                <div className="">
            
                                                                                    {
                                                                                        nest.nested ? (
                                                                                            <div>
                                                                                                {/* <div className="neoBg d-flex justify-content-between mt-2">
                                                                                                    <Link>
                                                                                                        {nest.items.featureName}
                                                                                                    </Link>
                                                                                                    <i className="fas fa-angle-down"></i>
                                                                                                </div> */}
                                                                                                {
            
                                                                                                    <div>
                                                                                                        {
                                                                                                            nest.nested.map((deepNest, ind) => (
                                                                                                                deepNest !== undefined && deepNest.items.isShowing === true ? (
                                                                                                                    <div>
                                                                                                                        {
                                                                                                                            deepNest.items.key === "4.2.1" || deepNest.items.key === "4.2.2" ? (
                                                                                                                                <div>
                                                                                                                                    {
                                                                                                                                        ind % 2 === 0 ? (
                                                                                                                                            <div className="sbtn d-flex justify-content-center mt-2" >
            
                                                                                                                                                <Link style={{ color: "white", fontSize: "12px", textDecoration: "none" }}
                                                                                                                                                to={`${url}${deepNest.items.path}`}
                                                                                                                                                >
                                                                                                                                                    {deepNest.items.featureName}
                                                                                                                                                </Link>
                                                                                                                                            </div>
                                                                                                                                        ) : (
                                                                                                                                                <div className="sbtnx d-flex justify-content-center mt-2" >
            
                                                                                                                                                    <Link style={{ color: "white", fontSize: "12px", textDecoration: "none" }}
                                                                                                                                                    to={`${url}${deepNest.items.path}`}
                                                                                                                                                    >
                                                                                                                                                        {deepNest.items.featureName}
                                                                                                                                                    </Link>
                                                                                                                                                </div>
                                                                                                                                            )
                                                                                                                                    }
                                                                                                                                </div>
                                                                                                                            ) : ""
                                                                                                                        }
            
                                                                                                                    </div>
            
                                                                                                                ) : ""
                                                                                                            ))
                                                                                                        }
                                                                                                    </div>
            
            
            
            
            
                                                                                                }
                                                                                            </div>
            
                                                                                        ) :
                                                                                            (
                                                                                                <div>
                                                                                                    {
                                                                                                        ind % 2 === 0 ? (
                                                                                                            <div className="sbtn d-flex justify-content-center mt-2" >
            
                                                                                                                <Link 
                                                                                                                style={{ color: "white", fontSize: "12px", textDecoration: "none" }}
                                                                                                                to={`${url}${nest.items.path}`}
                                                                                                                >
                                                                                                                    {nest.items.featureName}
                                                                                                                </Link>
                                                                                                            </div>
                                                                                                        ) : (
                                                                                                                <div className="sbtnx d-flex justify-content-center mt-2" >
            
                                                                                                                    <Link style={{ color: "white", fontSize: "12px", textDecoration: "none" }}
                                                                                                                    to={`${url}${nest.items.path}`}
                                                                                                                    >
                                                                                                                        {nest.items.featureName}
                                                                                                                    </Link>
                                                                                                                </div>
                                                                                                            )
                                                                                                    }
                                                                                                </div>
            
                                                                                            )
                                                                                    }
                                                                                </div>
                                                                            ) : ""
                                                                        }
                                                                    </div>
                                                                ))
                                                            }

                                                        </div>
                                                    ):""
                                                    
                                                }

                                            </div>
                                        ) : ""
                                    }
                                </div>

                            ))
                        }










                    </div>





                </div>


            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        name: state.login.loginResponse.name
    }
}

export default connect(
    mapStateToProps, null)(withRouter(Welcome))
