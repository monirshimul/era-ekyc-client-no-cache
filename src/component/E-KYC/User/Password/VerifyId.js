import React, { Component } from 'react'
import "./VerifyId.css";
//import '/Login/focusBlur.js'
import bg from '../../../Login/image/wave2.png';
import { withRouter, Link } from 'react-router-dom';

export class VerifyId extends Component {
    state = {
        user_id: ""
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const { user_id } = this.state;

        if (user_id === "") {
            alert('User Id field is empty');
            return;
        }

        this.props.history.push('./verify-pass-code')

    }

    render() {
        return (
            <div>
                <img className="wave" src={bg} />
                <div id="container">

                    <div className="login-content">
                        <form id="loginForm" onSubmit={this.onSubmit}>


                            <div id="proImg"><h1>User ID</h1></div>
                            <h2 className="title"></h2>
                            <div className="input-div one">
                                <div className="i">
                                    <i className="fas fa-user-cog"></i>
                                </div>
                                {/* Input field of user id field for forget password */}

                                <div id="userId">
                                    {/* <h5>Username</h5> */}
                                    <input name="user_id" value={this.state.user_id} onChange={this.onChange} type="text" id="verifyUserId" placeholder="UserID" />
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

export default withRouter(VerifyId);
