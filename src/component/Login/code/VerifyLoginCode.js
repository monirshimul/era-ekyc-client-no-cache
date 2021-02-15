import React, { Component } from 'react';
import "../Login.css";
import { NotificationManager } from "react-notifications";
import bg from '../../Login/image/wave2.png';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { twoFALogin, getAppSetting } from '../../E-KYC/Url/ApiList';
import { largeTime } from './../../Utils/notificationTime';
import { FaLock } from "react-icons/fa";

export class VerifyLoginCode extends Component {
    state = {
        otp: '',
        idleTimeSet: ''
    }


    onChange = e => this.setState({ otp: e.target.value });

    // FOR IDLE TIMEOUT//////////////
    async sessionTimeOut(authVal) {
        let config = {
            headers: {
                "x-auth-token": authVal,
            },
        };
        const obj = {
            key: "USER_IDLE_TIMEOUT"
        }
        try {
            let idleUse = await axios.post(getAppSetting, obj, config);
            // console.log(idleUse.data.data[0].value);
            this.setState({ idleTimeSet: parseInt(idleUse.data.data[0].value) });

        } catch (error) {
            if (error.response) {
                let message = error.response.data.message
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }
    }
    // FOR IDLE TIMEOUT//////////////


    onSubmit = async (e) => {
        const { otp } = this.state;
        e.preventDefault();

        if (otp === "") {
            let otpMessage = "Please Provide OTP";
            NotificationManager.warning(otpMessage, "Warning", 5000);
            return;
        }

        //console.log("otp", otp);
        //console.log("loginToken", this.props.location.state);
        const loginConfig = {
            headers: {
                'x-login-token': this.props.location.state
            }
        };

        const obj = { otp };
        //console.log('object', obj);

        try {
            let res = await axios.post(twoFALogin, obj, loginConfig);
            // console.log("2fa", res.data);
            let verifySuccess = res.data.data;
            let token = verifySuccess.authToken;
            let features = verifySuccess.features;
            let branchCode = verifySuccess.branchOrAgentPointCode;
            let branchName = verifySuccess.branchOrAgentPointName;
            let codeChannel = verifySuccess.channelCode;

            // ----------------------idleTimeout===================
            await this.sessionTimeOut(token);
            // ----------------------idleTimeout===================

            // //Session Storage
            sessionStorage.setItem('x-auth-token', JSON.stringify(token));
            sessionStorage.setItem('featureList', JSON.stringify(features));
            sessionStorage.setItem('branchOrAgentPointCode', JSON.stringify(branchCode));
            sessionStorage.setItem('branchOrAgentPointName', JSON.stringify(branchName));
            sessionStorage.setItem('ChannelCode', JSON.stringify(codeChannel));
            //   console.log("token", token);


            let message = "Login Successfull";
            //alert(statusCode + ' ' + message);
            NotificationManager.success(message, "Success", 5000);
            this.props.history.replace('/dashboard', this.state.idleTimeSet);


        } catch (err) {
            if (err.response) {
                let message = err.response.data.message;
                console.log("res", err.response.data.message);
                if (err.response.data.message === '2FA Failed') {
                    message = "Invalid OTP";
                } else if (err.response.data.message === 'Invalid Token') {
                    message = "Exceeds OTP Time Please Login Again";
                    this.props.history.replace('/');
                }
                this.setState({ otp: '' });
                NotificationManager.error(message, "Click to Remove", largeTime);
            } else if (err.request) {
                // console.log("Error Connecting...", error.request)
                this.setState({ otp: '' });
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (err) {
                this.setState({ otp: '' });
                NotificationManager.error(err.toString(), "Click to Remove", largeTime);
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
                            <div className="loginDivBg pt-2"><h1>E-KYC</h1></div>
                            <h5 className="mb-5">Two Steps Verification</h5>



                            <div className="field mb-3">
                                <input name="otp" value={this.state.otp} onChange={this.onChange} type="password" id="inputUser" placeholder="OTP" autoComplete="off" />
                                <span>
                                    <FaLock />
                                </span>

                                <label>OTP</label>
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

export default withRouter(VerifyLoginCode);
