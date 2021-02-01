import React, { Component } from 'react';
import axios from 'axios';
import { getAppSetting } from '../Url/ApiList';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';

class AppSetting extends Component {

    state = {
        settingOne: true,
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
        console.log("Get App", allAppSetting.data.data)
        this.setState({
            allSetting: allAppSetting.data.data
        })
    }

    handleChange = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    }
    render() {
        const { allSetting } = this.state
        return (
            <div className="container">
                <div className="imTwoWhite mb-2 row d-flex justify-content-center" style={{background:"rgba(224,243,242, 0.2)", backdropFilter:"blur(10px)"}}>
                    <div className="col-sm-6 text-center">
                        <Button className="imTwoWhite" variant="contained" style={{ outline: "none", borderRadius: "10px" }}>Reset to Default</Button>
                    </div>
                </div>
                <div className="imTwoWhite row d-flex justify-content-center" style={{background:"rgba(224,243,242, 0.2)", backdropFilter:"blur(10px)"}}>
                    <div className="col-sm-12">
                        
                                <div className="row d-flex justify-content-center">
                                    <div className="col-sm-3 m-2 imTwoWhite d-flex justify-content-between align-items-center" style={{background:"rgba(255,255,255, 0.7)", backdropFilter:"blur(10px)"}} >
                                        <div>
                                        <h5 className="" style={{color:"green", fontSize:"14px"}}>Sanction Screening</h5>
                                        </div>
                                        
                                        <Switch
                                            checked={this.state.settingOne}
                                            onChange={this.handleChange}
                                            color="primary"
                                            name="settingOne"
                                            
                                        />
                                    </div>
                                    <div className="col-sm-3 m-2 imTwoWhite d-flex justify-content-between align-items-center" style={{background:"rgba(255,255,255, 0.7)", backdropFilter:"blur(10px)"}}>
                                    <div>
                                        <h5 className="" style={{color:"green", fontSize:"14px"}}>Sanction Screening</h5>
                                        </div>
                                        <Switch
                                            checked={this.state.settingOne}
                                            onChange={this.handleChange}
                                            color="primary"
                                            name="settingOne"
                                            
                                        />
                                    </div>
                                    <div className="col-sm-3 m-2 imTwoWhite d-flex justify-content-between align-items-center" style={{background:"rgba(255,255,255, 0.7)", backdropFilter:"blur(10px)"}} >
                                    <div>
                                        <h5 className="" style={{color:"green", fontSize:"14px"}}>Sanction Screening</h5>
                                        </div>
                                        <Switch
                                            checked={this.state.settingOne}
                                            onChange={this.handleChange}
                                            color="primary"
                                            name="settingOne"
                                            
                                        />
                                    </div>
                                    <div className="col-sm-3 m-2 imTwoWhite d-flex justify-content-between align-items-center" style={{background:"rgba(255,255,255, 0.7)", backdropFilter:"blur(10px)"}} >
                                    <div>
                                        <h5 className="" style={{color:"green", fontSize:"14px"}}>Sanction Screening</h5>
                                        </div>
                                        <Switch
                                            checked={this.state.settingOne}
                                            onChange={this.handleChange}
                                            color="primary"
                                            name="settingOne"
                                            
                                        />
                                    </div>
                                    
                                </div>
                       

                    </div>

                </div>
            </div>
        )
    }
}

export default AppSetting
