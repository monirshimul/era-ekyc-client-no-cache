
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { allDataCount, ekycPie, lineChart } from '../Url/ApiList';
import { Line, Doughnut } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';




class AllStatistics extends Component {

    state = {
        lineData: [],
        lineDataSpe: [],
        dData: [],
        dDataTwo: [],
        data: [],
        year: "",
        fromDate: new Date(),
        tillDate: new Date(),
        findData:0

    }


    async componentDidMount() {

        this.totalDataChart();
        this.onBoardingTypePie();
        this.lineChartData();

    }

    findByDate = async () => {
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        const dataObj = {
            startDate: this.state.fromDate.toISOString(),
            endDate: this.state.tillDate.toISOString()
        }
        try {
            let res = await axios.post(ekycPie, dataObj, config);
            let dataCount = res.data.data.count;
            this.setState({findData:dataCount})
            //console.log("Find Data", dataCount)
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

    specificYear = (e) => {
        this.setState({
            year: e.target.value
        })
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        // const dataObj = {
        //     year: this.state.year
        // }

        try {
            //let res = await axios.post(lineChart, dataObj, config);
            //let dataCount = res.data.data;
            //console.log("dataCount", dataCount)
            let tD = [
                {
                    month: 1,
                    count: "29"
                },
                {
                    month: 12,
                    count: "39"
                },
                {
                    month: 3,
                    count: "47"
                },
                {
                    month: 11,
                    count: "50"
                },
                {
                    month: 2,
                    count: "22"
                },
                {
                    month: 7,
                    count: "31"
                },
                {
                    month: 9,
                    count: "84"
                },
                {
                    month: 10,
                    count: "116"
                },
                {
                    month: 5,
                    count: "99"
                }
            ]

            let tDTwo = [
                {
                    month: 1,
                    count: "23"
                },
                {
                    month: 12,
                    count: "30"
                },
                {
                    month: 3,
                    count: "85"
                },
                {
                    month: 11,
                    count: "29"
                },
                {
                    month: 2,
                    count: "24"
                },
                {
                    month: 7,
                    count: "39"
                },
                {
                    month: 9,
                    count: "44"
                },
                {
                    month: 10,
                    count: "98"
                },
                {
                    month: 5,
                    count: "58"
                },
                {
                    month: 4,
                    count: "33"
                },
                {
                    month: 6,
                    count: "30"
                },
                {
                    month: 8,
                    count: "53"
                }
            ]
            let emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            console.log("Spe Year", this.state.year)
            if (e.target.value === "2019") {

                for (let i = 0; i < tD.length; i++) {

                    //console.log("In the Loop", tD[i]['month']-1, tD[i]['count'])
                    // console.log("Index", emptyData.indexOf(tD[i]['month']))
                    emptyData[tD[i].month - 1] = parseInt(tD[i].count)

                }

            } else if (e.target.value === "2018") {
                for (let i = 0; i < tDTwo.length; i++) {

                    //console.log("In the Loop", tD[i]['month']-1, tD[i]['count'])
                    // console.log("Index", emptyData.indexOf(tD[i]['month']))
                    emptyData[tDTwo[i].month - 1] = parseInt(tDTwo[i].count)

                }
            }


            //console.log("Empty", emptyData)

            let modData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [

                    {
                        label: `Total E-KYC(${e.target.value})`,
                        // data:[3,2,5,4,6],
                        data: emptyData,
                        backgroundColor: `${e.target.value === "2019" ? "#fff0f0" : "#d9ecf2"}`,
                        borderColor: "#84ceca",
                        pointBackgroundColor: "red",
                        pointBorderColor: "red",


                    }



                ]
            }



            this.setState({
                lineDataSpe: modData,

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



    // Line Chart Api calling------------------>
    lineChartData = async () => {
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        const dataObj = {
            year: "2020"
        }

        try {
            let res = await axios.post(lineChart, dataObj, config);
            let dataCount = res.data.data;
            //console.log("dataCount", dataCount)
            let tD = [
                {
                    month: 1,
                    count: "29"
                },
                {
                    month: 12,
                    count: "39"
                },
                {
                    month: 3,
                    count: "47"
                },
                {
                    month: 11,
                    count: "50"
                },
                {
                    month: 2,
                    count: "22"
                },
                {
                    month: 7,
                    count: "31"
                },
                {
                    month: 9,
                    count: "84"
                },
                {
                    month: 10,
                    count: "116"
                },
                {
                    month: 5,
                    count: "99"
                }
            ]

            let tDTwo = [
                {
                    month: 1,
                    count: "23"
                },
                {
                    month: 12,
                    count: "30"
                },
                {
                    month: 3,
                    count: "85"
                },
                {
                    month: 11,
                    count: "29"
                },
                {
                    month: 2,
                    count: "24"
                },
                {
                    month: 7,
                    count: "39"
                },
                {
                    month: 9,
                    count: "44"
                },
                {
                    month: 10,
                    count: "98"
                },
                {
                    month: 5,
                    count: "58"
                },
                {
                    month: 4,
                    count: "33"
                },
                {
                    month: 6,
                    count: "30"
                },
                {
                    month: 8,
                    count: "53"
                }
            ]
            let emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            for (let i = 0; i < tD.length; i++) {

                //console.log("In the Loop", tD[i]['month']-1, tD[i]['count'])
                // console.log("Index", emptyData.indexOf(tD[i]['month']))
                emptyData[tD[i].month - 1] = parseInt(tD[i].count)

            }
            let emptyDataTwo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            for (let i = 0; i < tDTwo.length; i++) {

                //console.log("In the Loop", tD[i]['month']-1, tD[i]['count'])
                // console.log("Index", emptyData.indexOf(tD[i]['month']))
                emptyDataTwo[tDTwo[i].month - 1] = parseInt(tDTwo[i].count)

            }
            //console.log("Empty", emptyData)

            let modData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [

                    {
                        label: "Total E-KYC(2020)",
                        // data:[3,2,5,4,6],
                        data: emptyData,
                        backgroundColor: "#dbf6e9",
                        borderColor: "#84ceca",
                        pointBackgroundColor: "red",
                        pointBorderColor: "red",


                    },
                    {
                        label: "Total E-KYC(2019)",
                        // data:[3,2,5,4,6],
                        data: emptyDataTwo,
                        backgroundColor: "#f2f4c0",
                        borderColor: "#84ceca",
                        pointBackgroundColor: "green",
                        pointBorderColor: "green",


                    }


                ]
            }



            this.setState({
                lineData: modData,

            })

            //console.log("Line Data", modData)

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
        //For Self and Assisted
        const dataObj = {
            startDate: "2000-11-25T12:53:08.795Z",
            endDate: n,
            onboardingType: "SELF"
        }
        const dataObjTwo = {
            startDate: "2000-11-25T12:53:08.795Z",
            endDate: n,
            onboardingType: "ASSISTED"
        }
        const dataObjFace = {
            startDate: "2000-11-25T12:53:08.795Z",
            endDate: n,
            verificationType: "FACE"
        }
        const dataObjFiner = {
            startDate: "2000-11-25T12:53:08.795Z",
            endDate: n,
            verificationType: "FINGER"
        }

        try {

            //For Self and Assisted
            let resOne = await axios.post(ekycPie, dataObj, config);
            let resTwo = await axios.post(ekycPie, dataObjTwo, config);
            let resFace = await axios.post(ekycPie, dataObjFace, config);
            let resFinger = await axios.post(ekycPie, dataObjFiner, config);
            let dataCountOne = resOne.data.data.count;
            let dataCountTwo = resTwo.data.data.count;
            let dataCountFace = resFace.data.data.count;
            let dataCountFinger = resFinger.data.data.count;
            let countVal = [];
            let countFaceFing = [];
            countVal.push(dataCountOne, dataCountTwo)
            countFaceFing.push(dataCountFace, dataCountFinger)
            //console.log("SelfDAta", countVal)
            let douData = {
                labels: ['Self', 'Assisted'],
                datasets: [
                    {
                        label: "Total E-KYC(2020)",
                        // data:[3,2,5,4,6],
                        data: countVal,
                        backgroundColor: ["#2ec1ac", "#fabea7"],
                        //backgroundColor: ["#ffb0b0", "#40a8c4"],
                    }
                ]
            }
            // For Face and Finger
            let douDataFaceFin = {
                labels: ['Face', 'Finger'],
                datasets: [
                    {
                        label: "Total E-KYC(2020)",
                        // data:[3,2,5,4,6],
                        data: countFaceFing,
                        backgroundColor: ["#ffb0b0", "#40a8c4"],
                    }
                ]
            }

            this.setState({
                dData: douData,
                dDataTwo: douDataFaceFin
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



    // End Pie Chart   ===========================================>




    render() {

        let { lineData, data, dData, lineDataSpe, dDataTwo, findData } = this.state
        

        return (
            <div className="container">
                <div className="row divBg d-flex justify-content-around align-items-center">

                    <h4 className="mt-2">Statistics for E-KYC</h4>

                </div>
                <div className="row d-flex justify-content-center">


                    <div className=" col-sm-4 imTwoWhite d-flex justify-content-center align-items-center">
                        <h1 className="neoBg" style={{fontSize:"25px", color:"green"}}>E-KYC: {findData}</h1>
                    </div>


                    <div className="col-sm-8 imTwoWhite">

                        <div className="text-muted text-center">
                            <h5 className="lightTwo" style={{ fontWeight: "light", fontSize: "16px", color: "#52575d" }}>Search E-KYC between from date to till date</h5>

                        </div>

                        <div className="row d-flex justify-content-around align-items-center">
                            <div className="col-sm-5">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="From Date"
                                        value={this.state.fromDate}
                                        onChange={(date) => this.setState({ fromDate: date })}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="col-sm-5">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Till Date"
                                        value={this.state.tillDate}
                                        onChange={(date) => this.setState({ tillDate: date })}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="col-sm-2">

                                <Button onClick={this.findByDate} className="lightMain" variant="contained" style={{ outline: "none", borderRadius: "10px" }}>Find</Button>

                            </div>
                        </div>
                    </div>
                </div>
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
                {/* <div className="row imTwoWhite d-flex justify-content-center align-items-center" style={{ padding: "5px" }}>
                    <div className="col-sm-10 imTwoWhite">
                        <Line
                            data={lineData}
                        />
                        <hr />
                    </div>
                    
                </div> */}
                <div className="row imTwoWhite d-flex justify-content-center" style={{ padding: "5px" }}>
                    <div className="col-sm-6 imTwoWhite">
                        <h5 className="text-center lightTwo" style={{ color: "", fontSize: "16px" }} htmlFor="">
                            E-KYC compare betweeen running year and previous year.
                        </h5>
                        <hr />
                        <Line
                            data={lineData}
                        />
                        <hr />
                    </div>
                    <div className="col-sm-6 imTwoWhite">
                        <div className='form-group'>
                            <h5 className="text-center lightOne" style={{ color: "", fontSize: "16px" }} htmlFor="">
                                Choose a Year to see specific e-kyc on this year.
                            </h5>
                            <select
                                className='custom-select'
                                value={this.state.year}
                                onChange={(e) => this.specificYear(e)}
                                name="year"
                            >
                                <option value='' disabled>--Select Year--</option>
                                <option value='2019'>2019</option>
                                <option value='2018'>2018</option>

                            </select>
                        </div>
                        <Line
                            data={lineDataSpe}
                        />
                        <hr />
                    </div>


                </div>
                <div className="row imTwoWhite d-flex justify-content-center align-items-center" style={{ padding: "5px" }}>

                    <div className="col-sm-6 imTwoWhite">
                        <Doughnut
                            data={dData}
                        />
                        <hr />
                    </div>
                    <div className="col-sm-6 imTwoWhite">
                        <Doughnut
                            data={dDataTwo}
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

