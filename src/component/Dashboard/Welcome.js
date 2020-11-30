import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Line, Pie, Doughnut } from 'react-chartjs-2';

import profileImage from "./image/undraw_profile_pic_ic5t.svg"
import Watch from './Watch/Watch';
import { connect } from 'react-redux';
import { NotificationManager } from "react-notifications";
import { getProfile, allDataCount, ekycPie } from '../E-KYC/Url/ApiList';
import { image } from '../E-KYC/Profile/damiImage';



class Welcome extends Component {

    state = {
        data: [],
        showLinks: false,
        userProfileImage: '',
        flag: 'data:image/jpeg;base64,',
        // quickLinks: JSON.parse(sessionStorage.getItem("quickLinks")) === null ? [] : JSON.parse(sessionStorage.getItem("quickLinks")),
        linkShower: false,
        branchOrAgentPointCodeArr: JSON.parse(sessionStorage.getItem("branchOrAgentPointCode")) === null ? [] : JSON.parse(sessionStorage.getItem("branchOrAgentPointCode")),
        branchOrAgentPointNameArr: JSON.parse(sessionStorage.getItem("branchOrAgentPointName")) === null ? [] : JSON.parse(sessionStorage.getItem("branchOrAgentPointName")),
        branchCode: JSON.parse(sessionStorage.getItem("currentBranchOrAgentPointCode")) === null ? "" : JSON.parse(sessionStorage.getItem("currentBranchOrAgentPointCode")),
        branchName: JSON.parse(sessionStorage.getItem("currentBranchOrAgentPointName")) === null ? "" : JSON.parse(sessionStorage.getItem("currentBranchOrAgentPointName"))
    }


    async componentDidMount() {

        this.totalDataChart();
        this.onBoardingTypePie();
        //console.log("Props", this.props.txt)


        // this.setState({
        //     linkShower: !this.state.linkShower
        // })




        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }

        };

        try {
            let res = await axios.get(getProfile, config);
            let profileData = res.data.data;
            //console.log("profileData Welcome page", profileData)
            this.setState({

                userProfileImage: profileData.userImage === null ? image.data : profileData.userImage.data
            })


            if (profileData.userImage !== null) {
                localStorage.setItem('profileImage', JSON.stringify(profileData.userImage.data))

            }



        } catch (error) {
            console.log("Error", error)
            if (error.response) {
                let message = error.response.data.message
                console.log("Error", error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }



    }


    // Line Chart Api calling------------------>
    totalDataChart = async () => {
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        try {
            let res = await axios.get(allDataCount, config);
            let dataCount = res.data.data;
            // let modData = {
            //     labels: ['Account', 'User', 'Role', 'E-KYC', 'Verify'],
            //     datasets: [

            //         {
            //             label: "Total Data",
            //             //data:[3,2,5,4,6]
            //             data: [dataCount['accountCount'], dataCount['userCount'], dataCount['roleCount'], dataCount['ekycCount'], dataCount['verificationCount']],
            //             backgroundColor: "#f3fbfb",
            //             borderColor: "#84ceca",
            //             pointBackgroundColor: "red",
            //             pointBorderColor: "red",


            //         }


            //     ]
            // }
            //console.log("Data Welcome page", modData)
            this.setState({
                data: dataCount
            })
            //console.log("Data Welcome page", this.state.data)


        } catch (error) {
            console.log("Error", error)
            if (error.response) {
                let message = error.response.data.message
                console.log("Error", error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }
    }

    // Start Pie Chart ===========================================>

    onBoardingTypePie = async () => {

        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        let d = new Date();
        //new Date("2000-11-25T12:53:08.795Z").toLocaleString()
        let n = d.toISOString();
        console.log(n)

        const dataObj = {
            startDate: "2000-11-25T12:53:08.795Z",
            endDate: n,
            onboardingType: "ASSISTED"
        }

        try {
            let res = await axios.post(ekycPie, dataObj, config);
            let dataCount = res;

            console.log("Data Welcome page", dataCount)
            // this.setState({
            //     data: dataCount
            // })
            //console.log("Data Welcome page", this.state.data)


        } catch (error) {
            console.log("Error", error)
            if (error.response) {
                let message = error.response.data.message
                console.log("Error", error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }

    }



    // End Pie Chart   ===========================================>



    // componentDidUpdate(prevProps, prevState) {
    //     //console.log("In the welcome")
    //     if (prevState.linkShower !== this.state.linkShower) {
    //         this.setState({
    //             quickLinks: JSON.parse(sessionStorage.getItem("quickLinks")),

    //         })

    //     }
    // }


    // onLinkShow = () => {
    //     this.setState({
    //         showLinks: !this.state.showLinks
    //     })
    // }

    onChange = e => {
        //e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        }, () => {
            sessionStorage.setItem("currentBranchOrAgentPointCode", JSON.stringify(this.state.branchCode));
            //  console.log("code",this.state.branchCode);
        });


    }


    selectOptions = () => {
        let options = [];
        //     this.state.branchOrAgentPointCodeArr !== undefined ?

        //     this.state.branchOrAgentPointCodeArr.map((val, ind) => (
        //         <option value={val}>{this.state.branchOrAgentPointNameArr[ind] + ` (${val})`}</option>
        //     ))
        // :
        // ""

        if (this.state.branchOrAgentPointCodeArr !== undefined) {
            this.state.branchOrAgentPointCodeArr.forEach((val, index) => {

                options.push(
                    <option value={val} >{this.state.branchOrAgentPointNameArr[index] + ` (${val})`}</option>
                )
            })

        }
        return options;
    }




    render() {
        // let path = this.props.match.path;
        // let url = this.props.match.url;
        let { userProfileImage, flag, quickLinks, showLinks, branchOrAgentPointCodeArr, branchCode, branchName, data } = this.state
        
        // sessionStorage.setItem("currentBranchOrAgentPointCode", JSON.stringify(this.state.branchCode))
        return (
            <div className="container">

                <div className="row d-flex justify-content-around align-items-center">
                    <div className="col-sm-3 d-flex justify-content-center" style={{ padding: "13px" }}>

                        <Watch />


                    </div>
                    <div className="col-sm-9">

                        <div className="row imTwoWhite  d-flex justify-content-around align-items-center">


                            <div className="col-sm-2 d-flex justify-content-center" style={{ padding: "13px" }}>

                                <img src={userProfileImage ? flag + userProfileImage : profileImage}
                                    alt="profile_img"
                                    className=""

                                    style={{
                                        width: "75px",
                                        height: "75px",
                                        borderRadius: "50%",
                                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.24)"
                                    }}
                                />

                            </div>

                            <div className="col-sm-10 d-flex justify-content-center align-items-center im" style={{ paddingTop: "13px", color: "green" }}>
                                <div className="text-center">
                                    <h5><span style={{ fontSize: "24px", color: "red" }}>Please</span> Choose Branch Or Agent Point  :&nbsp;&nbsp;&nbsp;</h5>
                                </div>
                                {/* <i class="fas fa-dungeon"></i> */}
                                <div className='form-group '>
                                    <label htmlFor=""></label>
                                    <select
                                        style={{ fontSize: "14px" }}
                                        className='custom-select sbtn'
                                        value={branchCode}
                                        onChange={this.onChange}
                                        name="branchCode"
                                    >
                                        <option value='' disabled >--Select Branch Code--</option>
                                        {

                                            this.selectOptions()

                                        }



                                    </select>
                                </div>


                            </div>

                        </div>


                    </div>

                </div>
                <hr />

                <div className="row imTwoWhite d-flex justify-content-around align-items-center">
                    <div className="col-sm-2 lightTwo">
                        <hr />
                        <div className="imTwoWhite">
                            <h2>{data.accountCount}</h2>
                        </div>
                        <hr />
                        <h5>Total Account</h5>
                        <hr />

                    </div>
                    <div className="col-sm-2 lightThree">
                        <hr />
                        <div className="imTwoWhite">
                            <h2>{data.userCount}</h2>
                        </div>
                        <hr />
                        <h5>Total User</h5>
                        <hr />


                    </div>
                    <div className="col-sm-2 lightFour">
                        <hr />
                        <div className="imTwoWhite">
                            <h2>{data.roleCount}</h2>
                        </div>
                        <hr />
                        <h5>Total Role</h5>
                        <hr />

                    </div>
                    <div className="col-sm-2 lightOne">
                        <hr />
                        <div className="imTwoWhite">
                            <h2>{data.ekycCount}</h2>
                        </div>
                        <hr />
                        <h5>Total E-KYC</h5>
                        <hr />

                    </div>
                    <div className="col-sm-2 lightMain">
                        <hr />
                        <div className="imTwoWhite">
                            <h2>{data.verificationCount}</h2>
                        </div>
                        <hr />
                        <h5>Total Verify</h5>
                        <hr />

                    </div>

                </div>





                <div className="row imTwoWhite d-flex justify-content-around align-items-center" style={{ padding: "5px" }}>

                    <div className="col-sm-6 imTwoWhite">

                        <Line
                            data={data}

                        />
                        <hr />

                    </div>
                    <div className="col-sm-6 imTwoWhite">

                        <Line
                            data={data}
                        />
                        <hr />

                    </div>
                    <div className="col-sm-6 imTwoWhite mt-2">

                        <Pie
                            data={data}
                        />
                        <hr />

                    </div>

                    <div className="col-sm-6 imTwoWhite mt-2">

                        <Doughnut
                            data={data}
                        />
                        <hr />

                    </div>





                </div>










                {/* <div className=" im" style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.24)", padding: "40px" }} >

                    <h4 className="text-center text-muted ">
                        <i class="fas fa-link"></i> Quick Links
                </h4>
                <hr/>
                    <div className="row d-flex justify-content-between">

                        {
                            quickLinks.map((vals, ind) => (
                                <div className="col-sm-2">
                                    {
                                        vals !== undefined ? (
                                            <div className="" >
                                                {
                                                    vals.nested !== null ? (
                                                        <div>

                                                            {
                                                                vals.nested.map((nest, ind) => (
                                                                    <div>
                                                                        {
                                                                            nest !== undefined && nest !== null && nest.items.isShowing === true ? (
                                                                                <div className="">

                                                                                    {
                                                                                        nest.nested ? (
                                                                                            <div>
                                                                                                
                                                                                                {

                                                                                                    <div>
                                                                                                        {
                                                                                                            nest.nested.map((deepNest, ind) => (
                                                                                                                deepNest !== undefined && deepNest.items.isShowing === true ? (
                                                                                                                    <div>
                                                                                                                        {
                                                                                                                            deepNest.items.key === "4.2.1" || deepNest.items.key === "4.2.2" ? (
                                                                                                                                <div>
                                                                                                                                    {
                                                                                                                                        ind % 2 === 0 ? (
                                                                                                                                            <div className="sbtn d-flex justify-content-center mt-2" >

                                                                                                                                                <Link style={{ color: "white", fontSize: "12px", textDecoration: "none" }}
                                                                                                                                                    to={`${url}${deepNest.items.path}`}
                                                                                                                                                >
                                                                                                                                                    {deepNest.items.featureName}
                                                                                                                                                </Link>
                                                                                                                                            </div>
                                                                                                                                        ) : (
                                                                                                                                                <div className="sbtnx d-flex justify-content-center mt-2" >

                                                                                                                                                    <Link style={{ color: "white", fontSize: "12px", textDecoration: "none" }}
                                                                                                                                                        to={`${url}${deepNest.items.path}`}
                                                                                                                                                    >
                                                                                                                                                        {deepNest.items.featureName}
                                                                                                                                                    </Link>
                                                                                                                                                </div>
                                                                                                                                            )
                                                                                                                                    }
                                                                                                                                </div>
                                                                                                                            ) : ""
                                                                                                                        }

                                                                                                                    </div>

                                                                                                                ) : ""
                                                                                                            ))
                                                                                                        }
                                                                                                    </div>





                                                                                                }
                                                                                            </div>

                                                                                        ) :
                                                                                            (
                                                                                                <div>
                                                                                                    {
                                                                                                        ind % 2 === 0 ? (
                                                                                                            <div className="sbtn d-flex justify-content-center mt-2" >

                                                                                                                <Link
                                                                                                                    style={{ color: "white", fontSize: "12px", textDecoration: "none" }}
                                                                                                                    to={`${url}${nest.items.path}`}
                                                                                                                >
                                                                                                                    {nest.items.featureName}
                                                                                                                </Link>
                                                                                                            </div>
                                                                                                        ) : (
                                                                                                                <div className="sbtnx d-flex justify-content-center mt-2" >

                                                                                                                    <Link style={{ color: "white", fontSize: "12px", textDecoration: "none" }}
                                                                                                                        to={`${url}${nest.items.path}`}
                                                                                                                    >
                                                                                                                        {nest.items.featureName}
                                                                                                                    </Link>
                                                                                                                </div>
                                                                                                            )
                                                                                                    }
                                                                                                </div>

                                                                                            )
                                                                                    }
                                                                                </div>
                                                                            ) : ""
                                                                        }
                                                                    </div>
                                                                ))
                                                            }

                                                        </div>
                                                    ) : ""

                                                }

                                            </div>
                                        ) : ""
                                    }
                                </div>

                            ))
                        }










                    </div>





                </div> */}


            </div>
        )
    }
}


// const mapStateToProps = (state) => {
//     return {
//         name: state.login.loginResponse.name
//     }
// }

export default withRouter(Welcome)
