import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from "react-notifications";
import axios from 'axios';
import { getFlatRouteArray } from '../../flattenObjectTwo';
import { allRoutes } from '../../flattenObjectTwo';
import {updateRole} from '../Url/ApiList';
import ReactTooltip from 'react-tooltip';
const Joi = require('@hapi/joi');


export class UpdateRole extends Component {
    constructor(props) {
        super(props);
        //console.log("props", props)
        this.allMenu = getFlatRouteArray(allRoutes)
    }



    state = {
        id: "",
        status: "",
        roleName: "",
        description: "",
        ipList: "",
        grantedIPList: [],
        featureList: this.props.history.location.state.rolePrivileges


    }

    componentDidMount() {
        let { id, status, roleName, description, grantedIPList } = this.props.history.location.state
        this.setState({
            id: id,
            status: status,
            roleName: roleName,
            description: description,
            ipList: grantedIPList.toString()




        })

        // console.log("this.state.featureList", this.state.featureList)
        // console.log("this.state.iplist", this.state.ipList)

    }








    // ================== Multi Check box onChange Method ==========================

    isChecked = (key) => {
        //console.log("Feature key", key)
        //console.log("Feature List", this.state.featureList.map(f => f[0]))
        const existingFeaturesFlat = this.state.featureList.map(f => f[0]);
        //console.log("existingFeaturesFlat.includes(key)", existingFeaturesFlat.includes(key))
        return existingFeaturesFlat.includes(key.toString());
    }


    getIndex = (key) => {
        const featureList = this.state.featureList;
        for (let i = 0; i < featureList.length; i++) {
            if (featureList[i][0] === key)
                return i;
        }
        return -1;
    }

    handleCheckBoxChange = (e) => {
        const keyValue = e.value.split(',');
        const featureList = this.state.featureList;
        const index = this.getIndex(keyValue[0]);
        if (index > -1) {
            featureList.splice(index, 1);
            this.setState({
                featureList: featureList
            }, () => {
                console.log(this.state.featureList);
            });
        }
        else {
            featureList.push(keyValue);
            this.setState({
                featureList: featureList
            }, () => {
                console.log(this.state.featureList);
            });
        }
    }

    // ==================End of Multi Check box onChange Method =====================





    onFormSubmit = async (e) => {
        e.preventDefault();
        let { id, status, roleName, description, ipList, grantedIPList, featureList } = this.state

        try {
            if (ipList === "") {
                grantedIPList = []
            } else {
                grantedIPList = ipList.split(',')
            }


            let data = {
                id: id,
                status: status,
                roleName: roleName,
                description: description,
                grantedIPList: grantedIPList,
                rolePrivileges: featureList

            }

            let joiData = {

                status: status,
                roleName: roleName,
                description: description,
                grantedIPList: grantedIPList,
                rolePrivileges: featureList

            }
            const config = {
                headers: {

                    'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

                }
            };
            //console.log("Data", data)
            const validationValue = await schema.validateAsync(joiData);
            //console.log("validationValue", validationValue)

            //let url = 'http://127.0.0.1:3001/role';
            let res = await axios.put(updateRole, data, config)
            //console.log("response", res.data)

            //localStorage.setItem("Role Data", JSON.stringify(data))
            NotificationManager.success("Role Updated Successfully", "Great", 5000);
            this.props.history.push("/dashboard/role-list")

        } catch (error) {

            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
               // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }

        }


    }

    // Back Button
    onBack = e =>{
        e.preventDefault();
        this.props.history.push("/dashboard/role-list")
    }

    textHandleChange = e => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const { status, roleName, description, ipList } = this.state



        return (
            <div className="card col-sm-10" style={{ paddingTop: "25px" }}>

                <div className="card-header divBg">
                    <h3 className="text-center pt-3">
                        <i class="fas fa-user-edit"></i> Update Role
                    </h3>
                </div>
                <div className="card-body">
                    <form >

                        <ReactTooltip id="createRole" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize:"15px"}}><span style={{color:"red"}}>*</span> A Role Name should be like "Super Admin", it's a mandatory input-field</span>
                        </ReactTooltip>
                        <ReactTooltip id="roleStatus" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize:"15px"}}><span style={{color:"red"}}>*</span> Change your Role Status, it's a mandatory input-field</span>
                        </ReactTooltip>
                        <ReactTooltip id="des" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize:"15px"}}><span style={{color:"red"}}>*</span> Description can be anything, it's a mandatory input-field</span>
                        </ReactTooltip>
                        <ReactTooltip id="ip" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize:"15px"}}><span style={{color:"red"}}>*</span> Provide valid IP Address or keep it blank</span>
                        </ReactTooltip>
                        <ReactTooltip id="feature" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize:"15px"}}><span style={{color:"red"}}>*</span> Please Select desire feature from the list</span>
                        </ReactTooltip>


                        <div className="form-group">
                            <label htmlFor="">Role Name</label>
                            <input data-tip data-for='createRole' name="roleName" type="text" value={roleName} onChange={this.textHandleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Role Name" />
                        </div>
                        {/* 
                        <div className="form-group">
                            <label htmlFor="">Role Status</label>
                            <input data-tip data-for='roleStatus' name="status" type="text" value={status} onChange={this.textHandleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Role Status P/A/R" />
                        </div>
                            */}

                            <div className='form-group'>
                            <label htmlFor="">Role Status</label>
                            <select
                                className='custom-select'
                                value={status}
                                onChange={this.textHandleChange}
                                name="status"
                            >
                                <option value='' disabled>--Select--</option>
                                <option value='A'>Approved</option>
                                <option value='P'>Pending</option>
                                <option value='D'>Archived</option>


                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Description</label>
                            <textarea data-tip data-for='des' name="description" value={description} onChange={this.textHandleChange} class="form-control" id="exampleTextareaOne" rows="3" placeholder="Enter Role Description"></textarea>

                        </div>

                        <div className="form-group">
                            <label for="exampleTextarea">IP List</label>
                            <textarea data-tip data-for='ip' name="ipList" value={ipList} onChange={this.textHandleChange} class="form-control" id="exampleTextareaTwo" rows="3" placeholder="Enter Granted IP list"></textarea>

                        </div>




                        <div className="form-group"  >




                            <p className="text-muted">Choose Feature From Feature's List</p>
                            {
                                this.allMenu.map((features, index) => (
                                    <div>

                                        {
                                            features.key !== "*" ? (
                                                <div>
                                                    {
                                                        features.key % 1 === 0 ? (
                                                            <div data-tip data-for='feature' className="">
                                                                <hr />
                                                                <h1 className="text-center im" >{features.featureName}</h1>
                                                                <hr />

                                                            </div>

                                                        ) : (

                                                                <div className="custom-control custom-checkbox" style={{ marginLeft: "25px" }} key={index} >

                                                                    <input
                                                                        type="checkbox"
                                                                        name={features.key}
                                                                        checked={this.isChecked(features.key)}
                                                                        className="custom-control-input"
                                                                        id={index + 1}
                                                                        style={{ marginRight: "5px" }}
                                                                        onChange={(e) => {
                                                                            this.handleCheckBoxChange({
                                                                                value: e.target.value
                                                                            })
                                                                        }}
                                                                        value={features.key + "," + features.featureName}
                                                                        style={{ cursor: "pointer" }}

                                                                    />
                                                                    <label className="custom-control-label" for={index + 1}>{features.featureName}</label>

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


                        <div className="d-flex justify-content-center" >
                        <ReactTooltip id="sub" place="top" type="warning" effect="float">
                            <span style={{ fontSize:"15px"}}> Before submit, check all the mandatory fields again</span>
                        </ReactTooltip>
                        <button onClick={() => this.props.history.push('/dashboard/role-list') } className="b mr-2" style={{ border: "none" }} ><i class="fas fa-edit"></i> Back</button>
                            <button data-tip data-for="sub" onClick={(e) => this.onFormSubmit(e)} className="b" style={{ border: "none" }} ><i class="fas fa-edit"></i> Update</button>
                            
                        </div>

                    </form>
                </div>



            </div>
        )
    }
}

const schema = Joi.object({
    status: Joi.string().required(),
    roleName: Joi.string().min(5).max(30).required(),
    description: Joi.string().optional(),
    grantedIPList: Joi.array().min(0),
    rolePrivileges: Joi.array().min(0)

})

export default withRouter(UpdateRole)
