import React, { Component } from 'react'
//import { connect } from 'react-redux';
import { NotificationManager } from "react-notifications";
import './Login.css'
import bg from './image/wave2.png'
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { loginAPI } from '../E-KYC/Url/ApiList';
//=====Redux work above
//import { loginRequest, loginSuccess } from '../../actions/loginAction';

class Login extends Component {

    state = {
        userId: '',
        password: ''
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = async (e) => {
        const { userId, password } = this.state
        e.preventDefault();
        const obj = {
            userId,
            password
        }
        //console.log("loginObj", obj);

        try {
            let userLogin = await axios.post(loginAPI, obj);
            //console.log("loginapi ", userLogin.data);

            let loginSuccess = userLogin.data;
            let token = loginSuccess.data.authToken;
            let features = loginSuccess.data.features;

            //Session Storage
            sessionStorage.setItem('x-auth-token', JSON.stringify(token));
            sessionStorage.setItem('featureList', JSON.stringify(features));
            console.log("token", token);
            let statusCode = loginSuccess.statusCode;

            if (statusCode === 200) {
                let message = "Login Successfull";
                //alert(statusCode + ' ' + message);
                NotificationManager.success(message, "Success", 5000);
                this.props.history.replace('/dashboard');
            } else {
                this.props.history.push('/verify-login');
            }

        } catch (err) {
            // console.log(err.response);
            let error = err.response;
            console.log(err.response);
            let statusCode = err.response.data.statusCode;
            if (statusCode === 400) {
                let errorMessage = "Invalid Credentials";
                //alert(statusCode + ' ' + errorMessage);
                NotificationManager.error(statusCode + ' ' + errorMessage, "Error", 5000);
                this.setState({
                    userId: '',
                    password: ''
                });
            } else if (statusCode === 401) {
                let errorMessage = "Invalid Credentials";
                //alert(statusCode + ' ' + errorMessage);
                NotificationManager.warning(statusCode + ' ' + errorMessage, "Error", 5000);
                this.setState({
                    userId: '',
                    password: ''
                });
            } else {
                let errorMessage = "Server Error";
                //alert(statusCode + ' ' + errorMessage);
                NotificationManager.error(statusCode + ' ' + errorMessage, "Error", 5000);
                this.setState({
                    userId: '',
                    password: ''
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
        return (
            <div>
                <img className="wave" src={bg} />
                <div id="container">

                    <div className="login-content">
                        <form id="loginForm" onSubmit={this.onSubmit}>

                            {/* <img id="proImg" src={logo} /> */}
                            <div id="proImg"><h1>E-KYC</h1></div>
                            <h2 className="title">Login</h2>
                            <div className="input-div one">
                                <div className="i">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div id="user">
                                    {/* <h5>Username</h5> */}
                                    <input name="userId" value={this.state.userId} onChange={this.onChange} type="text" id="inputUser" placeholder="User ID" autoComplete="off" />
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div id="passwd">
                                    {/* <h5>Password</h5> */}
                                    <input name="password" value={this.state.password} onChange={this.onChange} type="password" id="inputPass" placeholder="Password" />
                                </div>
                            </div>
                            <Link to="/verify-id" id="forgetPass" >Forgot Password?</Link>
                            <input type="submit" id="btn" value="Login" />
                            {/* <Link to="/dashboard" id="btn" >Login</Link> */}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}



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