
import React, { Component } from 'react'
import {withRouter } from 'react-router-dom';
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { allDataCount, ekycPie, lineChart } from '../Url/ApiList';
import { Line } from 'react-chartjs-2';




class AllStatistics extends Component {

    state = {
        lineData: [],
        data:[]
        
    }


    async componentDidMount() {

        this.totalDataChart();
        this.onBoardingTypePie();
        this.lineChartData();
    }

    // Line Chart Api calling------------------>
    lineChartData = async ()=>{
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        const dataObj = {
            year:"2020"
        }

        try {
            let res = await axios.post(lineChart, dataObj, config);
            let dataCount = res.data.data;
            console.log("dataCount", dataCount)
            let tD = [
                {
                    month:1,
                    count:"29"
                },
                {
                    month:12,
                    count:"39"
                },
                {
                    month:3,
                    count:"47"
                },
                {
                    month:11,
                    count:"50"
                },
                {
                    month:2,
                    count:"22"
                },
                {
                    month:7,
                    count:"31"
                },
                {
                    month:9,
                    count:"84"
                },
                {
                    month:10,
                    count:"116"
                },
                {
                    month:5,
                    count:"99"
                }
            ]
            let emptyData = [0,0,0,0,0,0,0,0,0,0,0,0]
            for(let i = 0; i< tD.length; i++){

                //console.log("In the Loop", tD[i]['month']-1, tD[i]['count'])
                // console.log("Index", emptyData.indexOf(tD[i]['month']))
                emptyData[tD[i].month - 1] = parseInt(tD[i].count)

            }
            //console.log("Empty", emptyData)
            
            let modData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [

                    {
                        label: "Total E-KYC",
                        // data:[3,2,5,4,6],
                        data: emptyData,
                        backgroundColor: "#f3fbfb",
                        borderColor: "#84ceca",
                        pointBackgroundColor: "red",
                        pointBorderColor: "red",


                    }


                ]
            }

            this.setState({
                lineData: modData
            })

            console.log("Line Data", modData)

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




    // All Data Api calling------------------>
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
        
        let {lineData, data } = this.state
        
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
                <div className="row imTwoWhite d-flex justify-content-center align-items-center" style={{ padding: "5px" }}>

                    <div className="col-sm-10 imTwoWhite">

                        <Line
                            data={lineData}

                        />
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

