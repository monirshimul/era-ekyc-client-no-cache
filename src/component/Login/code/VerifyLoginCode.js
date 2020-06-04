import React, { Component } from 'react';
import './VerifyLoginCode.css';
import { NotificationManager } from "react-notifications";
import bg from '../../Login/image/wave2.png';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import {twoFALogin} from '../../E-KYC/Url/ApiList';

export class VerifyLoginCode extends Component {
    state = {
        otp: ''
    }


    onChange = e => this.setState({ otp: e.target.value });



    onSubmit = async(e) => {
        const {otp} = this.state;
        e.preventDefault();

        //console.log("otp", otp);
        //console.log("loginToken", this.props.location.state);
        const loginConfig =  {
            headers: {
            'x-login-token': this.props.location.state
            } 
         };
        
         const obj = { otp};
         //console.log('object', obj);
        
         try{
             let res = await axios.post(twoFALogin,obj, loginConfig );
           //  console.log("2fa",res.data);
             let verifySuccess = res.data.data;
             let token = verifySuccess.authToken;
             let features = verifySuccess.features;
 
             //Session Storage
             sessionStorage.setItem('x-auth-token', JSON.stringify(token));
             sessionStorage.setItem('featureList', JSON.stringify(features));
          //   console.log("token", token);
            
                 let message = "Login Successfull";
                 //alert(statusCode + ' ' + message);
                 NotificationManager.success(message, "Success", 5000);
                 this.props.history.replace('/dashboard');

         }catch(err){
            let error = err.response;
            console.log(err.response);
            let statusCode = err.response.data.statusCode;
             if (statusCode === 401) {
                let errorMessage = "Invalid OTP";
                //alert(statusCode + ' ' + errorMessage);
                NotificationManager.warning(statusCode + ' ' + errorMessage, "Error", 5000);
                this.setState({
                   otp:""
                });
                this.props.history.push('/');
            } else {
                let errorMessage = "Server Error";
                //alert(statusCode + ' ' + errorMessage);
                NotificationManager.error(statusCode + ' ' + errorMessage, "Error", 5000);
                this.setState({
                   otp:""
                });
                this.props.history.push('/');
            }
         }

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
                                    <input name="verifyCode" value={this.state.otp} onChange={this.onChange} type="text" id="verifycode" placeholder="Code" />
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
