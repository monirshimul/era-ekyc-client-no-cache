import React, { Component } from 'react'
import profileImage from "./image/undraw_profile_pic_ic5t.svg"
import Watch from './Watch/Watch';
import { connect } from 'react-redux';



class Welcome extends Component {

    // state = {
    //     profile: JSON.parse(sessionStorage.getItem("profile"))
    // }
    render() {
        //let { profile } = this.state
        return (
            <div className="container">
                <Watch />
                <div className="jumbotron my-5 im" style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.24)" }} >

                    <div className="divBg" style={{ padding: "10px 0px" }}>
                        <img src={profileImage}
                            alt="profile_img"

                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%"
                            }}
                        />

                    </div>





                    <h1 className="display-3 text-muted">Welcome</h1>
                    {/* <h4 style={{ color: "green" }}>" {profile.name} "</h4> */}
                    <h3 className="text-muted">Thank You for Your Login</h3>


                </div>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        name: state.login.loginResponse.name
    }
}

export default connect(
    mapStateToProps, null)(Welcome)
