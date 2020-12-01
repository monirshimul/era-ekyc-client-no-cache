import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { allRoutes } from '../../flattenObjectTwo'
import { NotificationManager } from "react-notifications";
import { getFlatRouteArray } from '../../flattenObjectTwo';
import {createRole} from '../Url/ApiList';
import { largeTime} from '../../Utils/notificationTime';
import ReactTooltip from 'react-tooltip';
import {  FaUsersCog, FaFileSignature,
          FaAlignLeft, FaClipboardList, FaCheckSquare, FaPlusCircle } from "react-icons/fa";

const Joi = require('@hapi/joi');

class CreateRole extends Component {
    constructor() {
        super();
        //console.log("Create Role All Routes", allRoutes);
        this.allMenu = getFlatRouteArray(allRoutes);

    }








    state = {
        roleName: "",
        description: "",
        ipList: "",
        grantedIPList: [],
        rolePrivileges: [],
        checkedItems: new Map()
    }


    // ================== Multi Check box onChange Method ==========================
    checkHandleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        if (this.state.checkedItems.has(key)) {
            this.state.checkedItems.delete(key)

            this.setState({

                rolePrivileges: Array.from(this.state.checkedItems.entries())
            })

        } else {
            this.setState({
                checkedItems: this.state.checkedItems.set(key, value),
                rolePrivileges: Array.from(this.state.checkedItems.entries())
            });

        }
    }

    // ==================End of Multi Check box onChange Method ======================

    onFormSubmit = async (e) => {
        e.preventDefault();
        let { roleName, description, ipList, grantedIPList, rolePrivileges } = this.state
        try {
            if (ipList === "" || ipList === null) {
                grantedIPList = []
            } else {
                grantedIPList = ipList.split(',')
            }

            let data = {
                roleName: roleName,
                description: description,
                grantedIPList: grantedIPList,
                rolePrivileges: rolePrivileges
            }

            const config = {
                headers: {

                    'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

                }
            };

            const validationValue = await schema.validateAsync(data);
          //  console.log("validationValue", validationValue)

            //console.log("Create Role Data", data)
            //let url = 'http://127.0.0.1:3001/role/';
            let res = await axios.post(createRole, data, config)
            //console.log("response", res.data)

            // localStorage.setItem("Role Data", JSON.stringify(data))
            NotificationManager.success("Role Created", "Success", 5000);
            this.props.history.push("/dashboard/success", data)

        } catch (error) {

            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
               // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Click to Remove", largeTime);
            }


            // let { message } = error.response.data
            // let { statusCode } = error.response.data
            // let { reason } = error.response.data

            // reason.map(v => (
            //     NotificationManager.error(statusCode + ' ' + JSON.stringify(Object.values(v.constraints)), "Error", 5000)
            // ))

            // console.log(error.response.data)
            // let erRes = error.response.data.reason.toString()
            // NotificationManager.error(erRes, "Error", 5000)
        }


    }

    textHandleChange = e => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value });
    }





    render() {
        const { roleName, description, ipList } = this.state


        return (
            <div className="card col-sm-10" style={{ paddingTop: "25px" }}>
                {/* {

                    rolePrivileges.map(v => console.log("Create Role", v))

                } */}

                <div className="card-header divBg">
                    <h3 className="text-center pt-3">
                        <i ><FaUsersCog/></i> Create Role
                    </h3>
                </div>
                <div className="card-body">
                    <form >

                        <ReactTooltip id="createRole" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize:"15px"}}><span style={{color:"red"}}>*</span> A Role Name should be like "Super Admin", it's a mandatory input-field</span>
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
                            <label htmlFor="" className="text-muted"><i ><FaFileSignature/></i> Role Name</label>
                            <input data-tip data-for='createRole' name="roleName" type="text" value={roleName} onChange={this.textHandleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Role Name" />
                        </div>

                        
                        <div className="form-group">
                            <label htmlFor="" className="text-muted"><i ><FaAlignLeft/></i> Description</label>
                            <textarea data-tip data-for='des' name="description" value={description} onChange={this.textHandleChange} class="form-control" id="exampleTextareaOne" rows="3" placeholder="Enter Role Description"></textarea>

                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleTextarea" className="text-muted"><i ><FaClipboardList/></i> IP List</label>
                            <textarea name="ipList" data-tip data-for='ip' value={ipList} onChange={this.textHandleChange} class="form-control" id="exampleTextareaTwo" rows="3" placeholder="Enter Granted IP list"></textarea>

                        </div>



                        <div className="form-group"  >




                            <p className="text-muted"><i ><FaCheckSquare/></i> Choose Feature From Feature's List</p>
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

                                                        ) :


                                                            (

                                                                <div className="custom-control custom-checkbox" style={{ marginLeft: "25px" }} key={index} >

                                                                    <input
                                                                        
                                                                        type="checkbox"
                                                                        name={features.key}
                                                                        checked={this.state.checkedItems.get(features.key)}
                                                                        className="custom-control-input" id={index + 1}
                                                                        style={{ marginRight: "5px" }}
                                                                        onChange={this.checkHandleChange}
                                                                        value={features.featureName}
                                                                        style={{ cursor: "pointer" }}

                                                                    />
                                                                    <label  className="custom-control-label" for={index + 1}>{features.featureName}</label>

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
                        <ReactTooltip id="create" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize:"15px"}}><span style={{color:"red"}}>*</span> Please re-check the mandatory area before create role...</span>
                        </ReactTooltip>
                            <button data-tip data-for="create" onClick={(e) => this.onFormSubmit(e)} className="b" style={{ border: "none" }} ><i ><FaPlusCircle/></i> Create</button>
                        </div>

                    </form>
                </div>



            </div>
        )
    }
}

const schema = Joi.object({
    roleName: Joi.string().min(5).max(30).required(),
    description: Joi.string().optional(),
    grantedIPList: Joi.array().min(0),
    rolePrivileges: Joi.array().min(0)

})

export default withRouter(CreateRole)