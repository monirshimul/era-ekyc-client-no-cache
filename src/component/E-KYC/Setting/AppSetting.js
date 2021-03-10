import React, { Component } from 'react';
import axios from 'axios';
import { getAppSetting, updateAppSetting, initAppSetting } from '../Url/ApiList';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import bgOne from './Images/bgOne.svg';
import SettingsOne from './Images/SettingsOne.svg';
import SettingsTwo from './Images/SettingsTwo.svg';
import SettingsMobile from './Images/SettingsMobile.svg';
import SettingsDepo from './Images/SettingsDepo.svg';

class AppSetting extends Component {

    state = {
        settingOne: true,
        settingTwo: true,
        settingThree: "",
        settingFour: true,
        allSetting: []
    }

    async componentDidMount() {
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        const dataObj = {
            key: "abc"
        }

        let allAppSetting = await axios.post(getAppSetting, null, config)
        //console.log("Get App", allAppSetting.data.data)
        allAppSetting.data.data.map(val => {
            if (val.key === "EKYC_SANCTION_SCREENING") {
                this.setState({
                    settingOne: val.value === "YES" ? true : false,
                })

            } else if (val.key === "EKYC_MOBILE_VERIFICATION") {
                this.setState({
                    settingTwo: val.value === "YES" ? true : false,
                })
            }
            else if (val.key === "EKYC_DEPOSITORY_USE") {
                this.setState({
                    settingFour: val.value === "YES" ? true : false,
                })
            } else if (val.key === "USER_IDLE_TIMEOUT") {
                this.setState({
                    settingThree: val.value
                })
            }
        })
        //console.log(this.state.settingOne)

    }

    initApp = async () => {
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        let initAllApp = await axios.post(initAppSetting, null, config);
        console.log("initAllApp", initAllApp)
        initAllApp.data.data.map(val => {
            if (val.key === "EKYC_SANCTION_SCREENING") {
                this.setState({
                    settingOne: val.value === "YES" ? true : false,
                })

            } else if (val.key === "EKYC_MOBILE_VERIFICATION") {
                this.setState({
                    settingTwo: val.value === "YES" ? true : false,
                })
            }
            else if (val.key === "EKYC_DEPOSITORY_USE") {
                this.setState({
                    settingFour: val.value === "YES" ? true : false,
                })
            } else if (val.key === "USER_IDLE_TIMEOUT") {
                this.setState({
                    settingThree: val.value
                })
            }
        })

    }

    handleChange = async (event) => {
        //console.log("In the Event",event.target.checked)
        //console.log("In the State One",this.state)
        this.setState({ [event.target.name]: event.target.checked });
        //console.log("In the State Two",this.state)

        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        let name = event.target.name;
        let dataObj = ""
        if (name === "settingOne") {
            dataObj = {
                key: "EKYC_SANCTION_SCREENING",
                value: event.target.checked === true ? "YES" : "NO"
            }
        } else if (name === "settingTwo") {
            dataObj = {
                key: "EKYC_MOBILE_VERIFICATION",
                value: event.target.checked === true ? "YES" : "NO"
            }
        } else if (name === "settingFour") {
            dataObj = {
                key: "EKYC_DEPOSITORY_USE",
                value: event.target.checked === true ? "YES" : "NO"
            }
        }

        //console.log("DataObj", dataObj)

        let updateSetting = await axios.put(updateAppSetting, dataObj, config);
        console.log("updateSetting", updateSetting);
        let allAppSetting = await axios.post(getAppSetting, null, config)
        console.log("Get App", allAppSetting.data.data)
        this.setState({
            allSetting: allAppSetting.data.data
        })


    }



    SlideChanger = async (e, v) => {
        //console.log(v.toString())
        this.setState({
            settingThree: v
        })
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };


        const dataObj = {
            key: "USER_IDLE_TIMEOUT",
            value: v.toString()
        }


        let updateIdleSetting = await axios.put(updateAppSetting, dataObj, config);
        //console.log("updateIdleSetting", updateIdleSetting)
    }



    render() {
        const { allSetting } = this.state
        //console.log("this.state.settingOne", this.state.settingOne === true ? "YES" : "NO")
        return (
            <div className="container">
                <div className="imTwoWhite row mb-2 d-flex justify-content-center" style={{ background: "rgba(255,255,255, 0.2)", backdropFilter: "blur(10px)" }}>
                    <div className="col-sm-12">
                        <h5 className="im d-flex justify-content-center" style={{ color: "green", fontSize: "17px", marginTop: "5px" }}>Modify Your Own Application Settings</h5>
                    </div>

                </div>

                <div className="imTwoWhite row d-flex justify-content-center" style={{ background: "rgba(255,255,255, 0.2)", backdropFilter: "blur(10px)" }}>
                    <div className="col-sm-12">

                        <div className="row d-flex justify-content-center" style={{ background: `linear-gradient(rgba(224,243,242, 0.8), rgba(224,243,242, 1)),url(${bgOne}) center/cover fixed no-repeat`, }}>
                            <div className="col-sm-3 m-2 imTwoWhite" style={{ background: "rgba(255,255,255, 0.1)", backdropFilter: "blur(10px)" }} >
                                <div>
                                    <img
                                        src={SettingsOne}
                                        style={{
                                            margin: "auto",
                                            cursor: "pointer",
                                            width: "100%",
                                            height: "100px",
                                        }}
                                        defaultValue={SettingsOne}
                                        className="img-fluid img-thumbnail im"
                                        id="FrontNidPic"
                                        alt=""
                                    />
                                </div>
                                <div className="imTwoWhite d-flex justify-content-between align-items-center">
                                    <h5 className="" style={{ color: "green", fontSize: "14px" }}>Sanction Screening</h5>

                                    <Switch
                                        checked={this.state.settingOne}
                                        onChange={this.handleChange}
                                        color="primary"
                                        name="settingOne"

                                    />
                                </div>
                            </div>
                            <div className="col-sm-3 m-2 imTwoWhite" style={{ background: "rgba(255,255,255, 0.1)", backdropFilter: "blur(10px)" }}>
                                <div>
                                    <img
                                        src={SettingsMobile}
                                        style={{
                                            margin: "auto",
                                            cursor: "pointer",
                                            width: "100%",
                                            height: "100px",
                                        }}
                                        defaultValue={SettingsMobile}
                                        className="img-fluid img-thumbnail im"
                                        id="FrontNidPic"
                                        alt=""
                                    />
                                </div>
                                <div className="imTwoWhite d-flex justify-content-between align-items-center">
                                    <h5 className="" style={{ color: "green", fontSize: "14px" }}>Mobile Verification</h5>

                                    <Switch
                                        checked={this.state.settingTwo}
                                        onChange={this.handleChange}
                                        color="primary"
                                        name="settingTwo"

                                    />
                                </div>
                            </div>
                            <div className="col-sm-3 m-2 imTwoWhite" style={{ background: "rgba(255,255,255, 0.1)", backdropFilter: "blur(10px)" }} >
                                <div>
                                    <img
                                        src={SettingsTwo}
                                        style={{
                                            margin: "auto",
                                            cursor: "pointer",
                                            width: "100%",
                                            height: "100px",
                                        }}
                                        defaultValue={SettingsTwo}
                                        className="img-fluid img-thumbnail im"
                                        id="FrontNidPic"
                                        alt=""
                                    />
                                </div>
                                <div className="imTwoWhite">
                                    <h5 className="text-center" style={{ color: "green", fontSize: "14px" }}>Idle Timeout (By Minutes)</h5>


                                    <Slider
                                        aria-label="settingThree"
                                        defaultValue={20}
                                        valueLabelDisplay="auto"
                                        step={2}
                                        marks
                                        min={0}
                                        max={30}
                                        onChange={this.SlideChanger}
                                        value={this.state.settingThree}

                                    />
                                </div>
                            </div>
                            <div className="col-sm-3 m-2 imTwoWhite" style={{ background: "rgba(255,255,255, 0.1)", backdropFilter: "blur(10px)" }} >
                                <div>
                                    <img
                                        src={SettingsDepo}
                                        style={{
                                            margin: "auto",
                                            cursor: "pointer",
                                            width: "100%",
                                            height: "100px",
                                        }}
                                        defaultValue={SettingsDepo}
                                        className="img-fluid img-thumbnail im"
                                        id="FrontNidPic"
                                        alt=""
                                    />
                                </div>
                                <div className="imTwoWhite d-flex justify-content-between align-items-center">
                                    <h5 className="" style={{ color: "green", fontSize: "14px" }}>Depository Use</h5>

                                    <Switch
                                        checked={this.state.settingFour}
                                        onChange={this.handleChange}
                                        color="primary"
                                        name="settingFour"

                                    />
                                </div>
                            </div>

                        </div>


                    </div>

                </div>

                <div className="imTwoWhite mt-2 row d-flex justify-content-center" style={{ background: "rgba(255,255,255, 0.2)", backdropFilter: "blur(10px)" }}>

                    <div className="col-sm-12 text-center im py-2">
                        <Button onClick={this.initApp} className="imTwoWhite" variant="contained" style={{ color: "green", outline: "none", borderRadius: "10px" }}>Reset to Default</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppSetting
