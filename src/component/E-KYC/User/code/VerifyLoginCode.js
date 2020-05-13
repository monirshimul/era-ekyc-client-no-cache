import React, { Component } from 'react';
import './VerifyLoginCode.css';
//import '../../'
import bg from '../../../Login/image/wave2.png';
import { withRouter, Link } from 'react-router-dom';

export class VerifyLoginCode extends Component {
    state = {
        verifyLoginCode: ''
    }

    componentDidMount() {
        document.title = 'Login Code';
    };


    onChange = e => this.setState({ verifyLoginCode: e.target.value });



    onSubmit = e => {
        e.preventDefault();
        console.log(this.state.verifyLoginCode);
        if (this.state.verifyLoginCode === "yes") {
            this.props.history.push('/dashboard');
        } else {
            this.props.history.push('/');

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
                                    <input name="verifyCode" value={this.state.verifyLoginCode} onChange={this.onChange} type="text" id="verifycode" placeholder="Code" />
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
