import React, { Component } from 'react'
//import { connect } from 'react-redux';

import '../../../Login/Login.css';
import bg from '../../../Login/image/wave2.png'
import axios from 'axios';
import { FaUser, FaLock, FaKey, FaSignInAlt } from "react-icons/fa";
import { withRouter, Link } from 'react-router-dom';
import { NotificationManager } from "react-notifications";
import { largeTime } from './../../../Utils/notificationTime';
import { forgetPassUserId } from '../../Url/ApiList';

export class VerifyId extends Component {
    state = {
        userId: "",
        convalToken: ''
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = async (e) => {
        e.preventDefault();
        const { userId } = this.state;

        if (userId === "") {
            NotificationManager.warning("Please Provide UserId", "Click TO Remove", largeTime);
            return;
        }

        const obj = {
            userId: this.state.userId
        }

        const config = {
            headers: {
                'x-auth-passcode': '$Er@InfoTech#LtdCMMI3'
            }
        };

        try {
            let userData = await axios.post(forgetPassUserId, obj, config);
            this.setState({ convalToken: userData.data.data.convalToken });

            //  if(this.state.convalToken === ""){
            //     NotificationManager.warning("Token Missing", "Warning", largeTime);
            //  }
            NotificationManager.info("Please check OTP in your Mobile", "Message", largeTime);
            this.props.history.push('./verify-pass-code', this.state.convalToken);

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

    }

    render() {
        return (
            <div>
                <img className="wave" src={bg} alt="" />
                <div id="container">

                    <div className="login-content">
                        <form id="loginForm" onSubmit={this.onSubmit}>

                            {/* <img id="proImg" src={logo} /> */}
                            <div className="loginDivBg pt-2"><h1>Forget Password</h1></div>
                            <h2 className="heading mb-5">User ID</h2>
                            {/* <div className="input-div one">
                                <div className="i">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div id="user">
                                    <h5>Username</h5>
                                    <input name="userId" value={this.state.userId} onChange={this.onChange} type="text" id="inputUser" placeholder="User ID" autoComplete="off" />
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div id="passwd">
                                    <h5>Password</h5>
                                    <input name="password" value={this.state.password} onChange={this.onChange} type="password" id="inputPass" placeholder="Password" />
                                </div>
                            </div> */}


                            <div className="field mb-3">
                                <input name="userId" value={this.state.userId} onChange={this.onChange} type="text" id="inputUser" placeholder="User ID" autoComplete="off" />
                                <span>
                                    <FaUser />
                                </span>

                                <label>User ID</label>
                            </div>


                            <input type="submit" className="neoBtn" value="Submit" />
                            {/* <button type="submit" className="neoBtn">Login</button> */}
                            {/* <Link to="/dashboard" id="btn" >Login</Link> */}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(VerifyId);
