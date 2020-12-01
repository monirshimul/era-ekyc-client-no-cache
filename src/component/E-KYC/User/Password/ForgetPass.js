import React, { Component } from 'react'
//import { connect } from 'react-redux';

import '../../../Login/Login.css';
import bg from '../../../Login/image/wave2.png'
import axios from 'axios';
import { FaLock} from "react-icons/fa";
import { withRouter} from 'react-router-dom';
import { NotificationManager } from "react-notifications";
import { largeTime } from './../../../Utils/notificationTime';
import { setPassword } from '../../Url/ApiList';

class ForgetPass extends Component {
    state = {
        newPass: '',
        confirmPass: '',
        mobileToken: this.props.location.state
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });


    onSubmit = async (e) => {
        e.preventDefault();
        const { newPass, confirmPass } = this.state;

        let regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

        if (newPass === '') {
            let msg2 = "Please Provide New Password";
            NotificationManager.warning(msg2, "Click To Remove", largeTime);
            return;
        }

        if (newPass.length < 8) {
            let passlenMessage = "New Password length minimum 8 characters";
            NotificationManager.warning(passlenMessage, "Click To Remove", largeTime);
            return;
        }

        if (regex.exec(newPass) === null) {
            let passRegMessage = "New Password must have capital letter, special character and digits";
            NotificationManager.warning(passRegMessage, "Click To Remove", largeTime);
            return;
        }

        if (confirmPass === "") {
            NotificationManager.warning('Confirm Password field is empty!! Please Enter Confirm Password Field', "Click To Remove", largeTime);
            return;
        }

        if (confirmPass !== newPass) {
            NotificationManager.warning("New Password and Confirm Password are not Same", "Click To Remove", largeTime);
            return;
        }

        const passObj = {
            newPassword: newPass
        }

        const config = {
            headers: {
                'x-auth-passcode': '$Er@InfoTech#LtdCMMI3',
                'x-mobile-token': this.state.mobileToken
            }
        };

        try {
            let setPass = await axios.post(setPassword, passObj, config);
            console.log("response", setPass.data.message);
            if (setPass.data.statusCode === 200) {
                NotificationManager.success("Password Change Successfull", "Success", 10000);
                this.props.history.push('/');
            }

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


        // alert("Password Change Completed");
        // this.props.history.push('/');

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
                            <h2 className="heading mb-5">Set Password</h2>

                            <div className="field mb-3">
                                <input name="newPass" value={this.state.newPass} onChange={this.onChange} type="password" id="inputUser" placeholder="New Password" autoComplete="off" />
                                <span>
                                    <FaLock />
                                </span>

                                <label>New Password</label>
                            </div>
                            <div className="field">
                                <input name="confirmPass" value={this.state.confirmPass} onChange={this.onChange} type="password" id="inputPass" placeholder="Confirm Password" />
                                <span>
                                    <FaLock />
                                </span>
                                <label>Confirm Password</label>
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

export default withRouter(ForgetPass);
