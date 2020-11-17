import React, { Component } from 'react';
import './VerifyLoginCode.css';
import { NotificationManager } from "react-notifications";
import bg from '../../Login/image/wave2.png';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { twoFALogin } from '../../E-KYC/Url/ApiList';
import { largeTime } from './../../Utils/notificationTime';

export class VerifyLoginCode extends Component {
    state = {
        otp: ''
    }


    onChange = e => this.setState({ otp: e.target.value });



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
            this.props.history.replace('/dashboard');


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
        //     if (statusCode === 401) {
        //         let errorMessage = "Invalid OTP";
        //         //alert(statusCode + ' ' + errorMessage);
        //         NotificationManager.error(statusCode + ' ' + errorMessage, "Error", 5000);
        //         this.setState({
        //             otp: ""
        //         });
        //         this.props.history.push('/');
        //     } else {
        //         let errorMessage = "Server Error";
        //         //alert(statusCode + ' ' + errorMessage);
        //         NotificationManager.error(statusCode + ' ' + errorMessage, "Error", 5000);
        //         this.setState({
        //             otp: ""
        //         });
        //         this.props.history.push('/');
        //     }
        // }

    }


    render() {
        return (
            <div>
                <img className="wave" src={bg} />
                <div id="container">

                    <div className="login-content">
                        <form id="loginForm" onSubmit={this.onSubmit}>


                            <div id="proImg"><h1>Verification</h1></div>
                            <h2 className="title">Login Code</h2>
                            <div className="input-div one">
                                <div className="i">
                                    <i className="fas fa-cogs"></i>
                                </div>
                                {/* Input field of verify code  */}
                                <div id="verify">
                                    {/* <h5>Username</h5> */}
                                    <input name="verifyCode" value={this.state.otp} onChange={this.onChange} type="password" id="verifycode" placeholder="Code" />
                                </div>
                            </div>


                            <input type="submit" id="btn" value="Submit" />

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(VerifyLoginCode);
