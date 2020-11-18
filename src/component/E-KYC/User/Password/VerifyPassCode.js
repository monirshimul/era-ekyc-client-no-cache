import React, { Component } from 'react'
//import { connect } from 'react-redux';

import '../../../Login/Login.css';
import bg from '../../../Login/image/wave2.png'
import axios from 'axios';
import { FaUser, FaLock, FaKey, FaSignInAlt } from "react-icons/fa";
import { withRouter, Link } from 'react-router-dom';
import { NotificationManager } from "react-notifications";
import { largeTime } from './../../../Utils/notificationTime';
import { forgetPasswordVerifyCode } from '../../Url/ApiList';

export class VerifyPassCode extends Component {
    state = {
        verifyCode: "",
        convalToken: this.props.location.state,
        mobileToken: ""
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = async (e) => {
        e.preventDefault();
        const { verifyCode } = this.state;
        //  console.log("verifaction code for forget password ", verifyCode);

        if (verifyCode === "") {
            let verifyCodeMessage = "Verify Code field is empty";
            NotificationManager.warning(verifyCodeMessage, "Warning", 10000);
            return;
        }

        const objCode = {
            otp: verifyCode
        }

        const config = {
            headers: {
                'x-auth-passcode': '$Er@InfoTech#LtdCMMI3',
                'x-conval-token': this.state.convalToken
            }
        };

        try {
            let verifyCode = await axios.post(forgetPasswordVerifyCode, objCode, config);
            // console.log("code verification", verifyCode);
            this.setState({ mobileToken: verifyCode.headers["x-mobile-token"] })
            if (verifyCode.headers["x-mobile-token"] !== "" && verifyCode.data.status === true) {
                this.props.history.push('/forget-pass', this.state.mobileToken);
            } else {
                NotificationManager.warning('Please Provide Valid OTP', "Click To Remove", largeTime);
                this.setState({ verifyCode: '' });
            }


        } catch (error) {
            if (error.response) {
                if (error.response.data.message === "Invalid Token") {
                    // console.log("Error", error.response)
                    NotificationManager.info("OTP time Exceeds", "Message", largeTime);
                    this.props.history.push('/');
                }

            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", largeTime);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", largeTime);
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
                            <h2 className="heading mb-5">Verification Code</h2>



                            <div className="field mb-3">
                                <input name="verifyCode" value={this.state.verifyCode} onChange={this.onChange} type="password" id="inputUser" placeholder="Code" autoComplete="off" />
                                <span>
                                    <FaLock />
                                </span>

                                <label>Verification Code</label>
                            </div>


                            <input type="submit" className="neoBtn" value="Submit" />

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default VerifyPassCode;
