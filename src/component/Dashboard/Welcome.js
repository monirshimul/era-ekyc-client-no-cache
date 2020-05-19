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

                <div className="bigB" style={{ padding: "5px" }}>
                    <hr />
                    <Watch />
                    <hr />
                </div>

                <hr />
                <div className="row justify-content-center" style={{ padding: "10px 0px" }}>

                    <img src={profileImage}
                        alt="profile_img"

                        style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.24)"
                        }}
                    />

                </div>
                <div className="row justify-content-center" style={{ color: "green" }}>
                    <small className="text-center">Welcome, Anis</small>

                </div>
                <hr />




                <div className="jumbotron im" style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.24)" }} >

                    <h4 className="text-center">
                        Quick Links
                </h4>
                    <div className="row d-flex justify-content-center">
                        <div className="col-sm-2 sbtnx mr-2 mt-2">
                            <span className="">Role Create</span>
                        </div>
                        <div className="col-sm-2 sbtn mr-2 mt-2">
                            <span className="">Approve Role</span>
                        </div>
                        <div className="col-sm-2 sbtnx mr-2 mt-2">
                            <span className="">Role List</span>
                        </div>
                        <div className="col-sm-2 sbtn mr-2 mt-2">
                            <span className="">User Create</span>
                        </div>
                        <div className="col-sm-2 sbtnx mr-2 mt-2">
                            <span className="">Approve User</span>
                        </div>
                        <div className="col-sm-2 sbtn mr-2 mt-2">
                            <span className="">User List</span>
                        </div>
                        <div className="col-sm-2 sbtnx mr-2 mt-2">
                            <span className="">Role Create</span>
                        </div>
                        <div className="col-sm-2 sbtn mr-2 mt-2">
                            <span className="">Approve Role</span>
                        </div>
                        <div className="col-sm-2 sbtnx mr-2 mt-2">
                            <span className="">Role List</span>
                        </div>
                        <div className="col-sm-2 sbtn mr-2 mt-2">
                            <span className="">User Create</span>
                        </div>
                        <div className="col-sm-2 sbtnx mr-2 mt-2">
                            <span className="">Approve User</span>
                        </div>
                        <div className="col-sm-2 sbtn mr-2 mt-2">
                            <span className="">User List</span>
                        </div>

                    </div>



                    {/* <h1 className=" text-muted">Welcome</h1>
                    <h4 style={{ color: "green" }}>" {profile.name} "</h4>
                    <h3 className="text-muted">Thank You for Your Login</h3> */}


                </div>
                <hr />

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
