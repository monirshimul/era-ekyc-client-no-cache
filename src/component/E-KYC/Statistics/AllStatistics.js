
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { allDataCount, ekycPie } from '../Url/ApiList';




class AllStatistics extends Component {

    state = {
        data: [],
        
    }


    async componentDidMount() {

        this.totalDataChart();
        this.onBoardingTypePie();
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
            
            this.setState({
                data: dataCount
            })
            


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
        let n = d.toISOString();

        const dataObj = {
            startDate: "2000-11-25T12:53:08.795Z",
            endDate: n,
            onboardingType: "SELF"
        }

        try {
            let res = await axios.post(ekycPie, dataObj, config);
            let dataCount = res.data.data;

            console.log("Data Welcome page", dataCount)

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




    render() {
        
        let {data } = this.state
        
        return (
            <div className="container">
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
        </div>
        )
    }
}


// const mapStateToProps = (state) => {
//     return {
//         name: state.login.loginResponse.name
//     }
// }

export default withRouter(AllStatistics)

