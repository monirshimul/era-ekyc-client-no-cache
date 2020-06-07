import React, { Component } from 'react'
import './VerifyPassCode.css';
//import '../Login/focusBlur.js'
import bg from '../../../Login/image/wave2.png';
import { withRouter, Link } from 'react-router-dom';
import { NotificationManager } from "react-notifications";

export class VerifyPassCode extends Component {
    state= {
        verifyCode:""
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    onSubmit = e =>{
        e.preventDefault();
        const {verifyCode} = this.state;
        console.log("verifaction code for forget password ", verifyCode);

        if(verifyCode === ""){
            let verifyCodeMessage = "Verify Code field is empty";
            NotificationManager.warning(verifyCodeMessage, "Warning", 5000);
            return;
        }
        
        this.props.history.push('/forget-pass');

    }

    render() {
        return (
            <div>
                <img className="wave" src={bg} />
                <div id="container">

                    <div className="login-content">
                        <form id="loginForm" onSubmit={this.onSubmit}>

                          
                            <div id="proImg"><h1>Verify Code</h1></div>
                            <h2 className="title"> </h2>
                            <div className="input-div one">
                                <div className="i">
                                    <i className="fas fa-cogs"></i>
                                </div>
                                        {/* Input field of given mobile verification code for forget password */}
                                <div id="verify">
                                    {/* <h5>Username</h5> */}
                                    <input name="verifyCode" value={this.state.verifyCode} onChange={this.onChange} type="text" id="verifycode" placeholder="Code" />
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

export default VerifyPassCode;
