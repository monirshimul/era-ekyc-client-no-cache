import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Login.css'
import bg from './image/wave2.png'
import { withRouter, Link } from 'react-router-dom';
import { loginRequest, loginSuccess } from '../../actions/loginAction';

class Login extends Component {

    state = {
        name: '',
        password: ''
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        const { name, password } = this.state
        e.preventDefault();
        console.log("name", this.state.name);
        console.log("password", this.state.password);
        const obj = {
            name,
            password
        }
        this.props.onSubmit(obj)
        this.props.history.push("/dashboard");
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
                                    <input name="name" value={this.state.name} onChange={this.onChange} type="text" id="inputUser" placeholder="username" autoComplete="off"/>
                                </div>
                            </div>
                            <div className="input-div pass">
                                <div className="i">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div id="passwd">
                                    {/* <h5>Password</h5> */}
                                    <input name="password" value={this.state.password} onChange={this.onChange} type="password" id="inputPass" placeholder="password"/>
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

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (p) => {
            dispatch(loginSuccess(p));
        }
    }
}

// export default withRouter(newLogin)
export default connect(
    mapStateToProps,
    mapDispatchToProps)(withRouter(Login));
