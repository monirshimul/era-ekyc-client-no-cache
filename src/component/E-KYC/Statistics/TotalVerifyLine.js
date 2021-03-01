import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { lineChartVerify } from '../Url/ApiList';
import { toLowerObject } from './../../Utils/ObjectUtils';
class TotalVerifyLine extends Component {

    state = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        totalVerLine: []
    }

    async componentDidMount() {
        const dataObj = {
            month: this.state.month,
            year: this.state.year
        }
        //console.log("data", dataObj)
        await this.verifyLine(dataObj)
    }




    //!main api call===============================================

    verifyLine = async (dataObj) => {
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        //let myYear = e.target.value;
        try {
            let res = await axios.post(lineChartVerify, dataObj, config);
            //console.log("Result", res)
            let dataCount = res.data.data;
            dataCount = toLowerObject(dataCount);
            //console.log("dataCount", dataCount)
            let emptyData = []
            for (let i = 0; i <= 30; i++) {
                emptyData.push(0)
            }
            //console.log("EmptyData", emptyData.length)
            for (let i = 0; i < dataCount.length; i++) {
                emptyData[dataCount[i].day - 1] = parseInt(dataCount[i].count)
            }
            //console.log("EmptyData", emptyData)

            let days = []
            for (let i = 0; i <= 30; i++) {
                days.push(`Day-${i + 1}`)
            }

            // console.log(days)

            let modData = {
                labels: days,
                datasets: [

                    {
                        label: `Total Verify in (${this.state.year})`,
                        // data:[3,2,5,4,6],
                        data: emptyData,
                        backgroundColor: `${this.state.year === "2020" ? "#fff0f0" : "#d9ecf2"}`,
                        borderColor: "#84ceca",
                        pointBackgroundColor: "red",
                        pointBorderColor: "red",
                    }
                ]
            }
            this.setState({
                totalVerLine: modData,
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

    specificMonth = async (e) => {
        this.setState({
            month: parseInt(e.target.value)
        })

        const dataObj = {
            month: parseInt(e.target.value),
            year: this.state.year
        }

        console.log(dataObj)



        try {
            await this.verifyLine(dataObj)


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


    specificYear = async (e) => {

        this.setState({
            year: parseInt(e.target.value)
        })

        const dataObj = {
            month: this.state.month,
            year: parseInt(e.target.value)
        }

        console.log(dataObj)

        try {
            let result = await this.verifyLine(dataObj)
            console.log('Res', result)

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

    render() {
        return (
            <div className="container" style={{ margin: "0", padding: "0" }}>
                <div className="row imTwoWhite d-flex justify-content-center">
                    <div className="col-sm-10 imTwoWhite">
                        <div className='form-group'>
                            <h5 className="text-center lightOne" style={{ color: "", fontSize: "16px" }} htmlFor="">
                                Choose a Year and month to see specific verification.
                            </h5>
                            <select
                                className='custom-select'
                                value={this.state.month}
                                onChange={(e) => this.specificMonth(e)}
                                name="month"
                            >
                                <option value='' disabled>--Select Month--</option>
                                <option value='1'>January</option>
                                <option value='2'>February</option>
                                <option value='3'>March</option>
                                <option value='4'>April</option>
                                <option value='5'>May</option>
                                <option value='6'>June</option>
                                <option value='7'>July</option>
                                <option value='8'>August</option>
                                <option value='9'>September</option>
                                <option value='10'>Octber</option>
                                <option value='11'>November</option>
                                <option value='12'>December</option>

                            </select>
                            <select
                                className='custom-select'
                                value={this.state.year}
                                onChange={(e) => this.specificYear(e)}
                                name="year"
                            >
                                <option value='' disabled>--Select Year--</option>
                                <option value='2025'>2025</option>
                                <option value='2024'>2024</option>
                                <option value='2023'>2023</option>
                                <option value='2022'>2022</option>
                                <option value='2021'>2021</option>
                                <option value='2020'>2020</option>
                                <option value='2019'>2019</option>

                            </select>
                        </div>
                        <Line
                            data={this.state.totalVerLine}
                        />
                        <hr />
                    </div>

                </div>
            </div>
        )
    }
}

export default TotalVerifyLine
