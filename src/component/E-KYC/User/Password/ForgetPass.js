import React, { Component } from 'react';
import '../Password/ForgetPass.css';
//import '../Login/focusBlur.js'
import bg from '../../../Login/image/wave2.png';
import { withRouter, Link } from 'react-router-dom';

class ForgetPass extends Component {
    state ={
        newPass:'',
        confirmPass: ''
    }

    onChange = e => this.setState({ [e.target.name] : e.target.value});

    onSubmit = e =>{
        e.preventDefault();
        const {newPass, confirmPass} = this.state;
        
        if(newPass === ""){
            alert('New Password field is empty!! Please Enter New Password Field');
           return;
        }

        if(confirmPass === ""){
            alert('Confirm Password field is empty!! Please Enter Confirm Password Field');
            return;
        }

        if(newPass !== confirmPass){
            alert("New Password and Confirm Password are not Same");
            return;
        }


        alert("Password Change Completed");
        this.props.history.push('/');

    }


    render() {
        return (
            <div>
            <img className="wave" src={bg} />
            <div id="container">

                <div className="login-content">
                    <form id="loginForm" onSubmit={this.onSubmit}>

                        {/* <img id="proImg" src={logo} /> */}
                        <div id="proImg"><h1>Set Password</h1></div>
                        <h2 className="title"> Set Password</h2>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div id="newPass">   
                                <input name="newPass" value={this.state.newPass} onChange={this.onChange} type="password" id="InputNewPass" placeholder="New Password" />
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div id="conPass">
                                <input name="confirmPass" value={this.state.confirmPass} onChange={this.onChange} type="password" id="InputConPass" placeholder="Confirm Password" />
                            </div>
                        </div>
                        {/* <a id="forgetPass" href="#">Forgot Password?</a> */}
                        <input type="submit" id="btn" value="Submit" />
                        {/* <Link to="/dashboard" id="btn" >Login</Link> */}
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(ForgetPass);
