import React, { Component } from 'react'
//import { connect } from 'react-redux';

import { NotificationManager } from "react-notifications";
import './Login.css'
import bg from './image/wave2.png'
import { withRouter, Link,Redirect } from 'react-router-dom';
import axios from 'axios';
import { loginAPI } from '../E-KYC/Url/ApiList';
import { FaUser, FaLock, FaKey, FaSignInAlt } from "react-icons/fa";


const Joi = require('@hapi/joi');

//import Dashboard from '../Dashboard/Dashboard';
//=====Redux work above
//import { loginRequest, loginSuccess } from '../../actions/loginAction';



class Login extends Component {

    state = {
        userId: '',
        password: '',
        channelLogin: false
    }

    componentDidMount(){
        let screenWidth = window.screen.width;
        let screenHeight = window.screen.height;

        if(screenWidth <= 1366 && screenHeight <= 768){
            NotificationManager.warning("Please make sure Browser zoom 75 - 80 % for optimum User Experience", "Click to Remove",50000000);
        }

        
    }

  

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    handleChannelLogin = e =>{
        const { channelLogin } = e.target
        this.setState({
          channelLogin: !this.state.channelLogin
        })
       // console.log("Channel Status in func", this.state.channelLogin)

    }

    onSubmit = async (e) => {
        const { userId, password,channelLogin } = this.state
        e.preventDefault();
        const obj = {
            userId,
            password,
            channelLogin
        }
        const joiObj = {
            userId,
            password
        }
        //console.log("loginObj", obj);

        //this.schema.validate(obj)


        try {

            const validationValue = await schema.validateAsync(joiObj);
            // console.log("validationValue", validationValue)
            let userLogin = await axios.post(loginAPI, obj);
             console.log("loginapi ", userLogin.data);

            let loginSuccess = userLogin.data.data;
            //console.log("login", loginSuccess.branchOrAgentPointCode);
            let branchCode = loginSuccess.branchOrAgentPointCode;
            let branchName = loginSuccess.branchOrAgentPointName;
            let codeChannel = loginSuccess.channelCode;
            sessionStorage.setItem('branchOrAgentPointCode', JSON.stringify(branchCode));
            sessionStorage.setItem('branchOrAgentPointName', JSON.stringify(branchName));
            sessionStorage.setItem('ChannelCode', JSON.stringify(codeChannel));
            

            if (loginSuccess.loginToken) {
                let loginToken = loginSuccess.loginToken;
                this.props.history.replace('/verify-login', loginToken);
            } else {

                let token = loginSuccess.authToken;
                let features = loginSuccess.features;

                //Session Storage
                sessionStorage.setItem('x-auth-token', JSON.stringify(token));
                sessionStorage.setItem('featureList', JSON.stringify(features));
                //   console.log("token", token);

                let message = "Login Successfull";
                //alert(statusCode + ' ' + message);
                NotificationManager.success(message, "Success", 5000);
                this.props.history.replace('/dashboard');
            }



        } catch (err) {
           // console.log(err.response);

           if(err.response){
            let errorMessage = err.response.data.reason;
            NotificationManager.warning( errorMessage, "Error", 5000);
            this.setState({
            userId: '',
            password: '',
            channelLogin: false
            
            });
            
            } else if (err.request) {
            NotificationManager.error("Error Connecting...", "Error", 5000);
            this.setState({
            userId: '',
            password: '',
            channelLogin: false
            
            });
            }else if (err) {
            NotificationManager.error(err.toString(), "Error", 5000);
            this.setState({
            userId: '',
            password: '',
            channelLogin: false
            
            });
            }
            
        }

        //============================= 
        //Redux work
        // this.props.onSubmit(obj)
        //=============================
        //this.props.history.push("/dashboard");
    }

    render() {
       // console.log("channelLogin Render", this.state.channelLogin);
        return (
            <div>
                <img className="wave" src={bg} alt="" />
                <div id="container">

                    <div className="login-content">
                        <form id="loginForm" onSubmit={this.onSubmit}>

                            {/* <img id="proImg" src={logo} /> */}
                            <div className="loginDivBg pt-2"><h1>E-KYC</h1></div>
                            <h2 className="heading mb-5">Login</h2>
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
                                    <FaUser/>
                                </span>
                                
                                <label>User ID</label>
                            </div>
                            <div className="field">
                            <input name="password" value={this.state.password} onChange={this.onChange} type="password" id="inputPass" placeholder="Password" />
                                <span>
                                    <FaLock/>
                                </span>
                                <label>Password</label>
                            </div>

                            <div id="channelLogin" className='d-flex align-items-center'>
                            <input type="checkbox" checked={this.state.channelLogin}  onChange={e => this.handleChannelLogin(e)} defaultChecked={this.state.channelLogin}/> &nbsp;
                            <label id="channelLabel">Channel Login</label>
                            </div>

                            <div className="mt-2">
                            <Link to="/verify-id" id="forgetPass" >Forgot Password?</Link>
                            </div>
                            
                            <input type="submit" className="neoBtn" value="Login" />
                            {/* <button type="submit" className="neoBtn">Login</button> */}
                            {/* <Link to="/dashboard" id="btn" >Login</Link> */}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


const schema = Joi.object({
    userId: Joi.string().min(6).max(30).required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'))
    .messages({
        "string.pattern.base": `Password must have minimum 8 characters with one Capital letter,one number and one special Chararcter`,
    }),

})
//Redux work Above===================================

// const mapStateToProps = (state) => {
//     return {

//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onSubmit: (p) => {
//             dispatch(loginSuccess(p));
//         }
//     }
// }

// // export default withRouter(newLogin)
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps)(withRouter(Login));
//Redux work ===================================

export default withRouter(Login);