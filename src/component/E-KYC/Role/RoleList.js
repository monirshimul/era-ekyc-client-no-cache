import React, { Component } from 'react';
import axios from 'axios';
import {RoleAndUserStatus} from '../../Utils/fullFormConversion';
import { withRouter } from 'react-router-dom'
import { NotificationManager } from "react-notifications";
import { getRoleWithStatus, roleApproval } from '../Url/ApiList';
import ReactTooltip from 'react-tooltip';
import {
    FaUser, FaHome, FaIndent,
    FaAddressCard, FaTools, FaBookReader,
    FaAddressBook, FaMicrochip, FaGetPocket,
    FaClone, FaUsers, FaPhone, FaEdit, FaSignOutAlt,
    FaBatteryThreeQuarters, FaMizuni, FaPenNib,
    FaDigitalTachograph, FaArchive, FaBinoculars,
    FaSearch, FaListUl, FaUsersCog, FaFileSignature,
    FaAlignLeft, FaClipboardList, FaCheckSquare,
    FaPlusCircle, FaUserCheck, FaSortNumericUp,
    FaCheckCircle, FaWindowClose, FaArrowAltCircleRight,
    FaElementor, FaUserShield, FaUserTag, FaUserEdit,
    FaCalendarCheck, FaCalendarAlt
} from "react-icons/fa";

class RoleList extends Component {
    state = {
        pendingList: [],
        modalData: [],
        searchValue: "",
        checkBoxOne: false,
        checkBoxValue: "",
        checkBoxTwo: false,
        checkBoxThree: false,
        archeived: false
    }

    async componentDidMount() {

        const Obj = { status: "A" };
        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };
        try {
            //let url = 'http://127.0.0.1:3001/role/get/';
            let res = await axios.post(getRoleWithStatus, Obj, config);
            this.setState({
                pendingList: res.data.data
            })
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

        //console.log("All Data", this.state.pendingList.data)

    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.archeived !== this.state.archeived) {
            const Obj = { status: "A" };
            const config = {
                headers: {

                    'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

                }
            };
            try {
                //let url = 'http://127.0.0.1:3001/role/get/';
                let res = await axios.post(getRoleWithStatus, Obj, config);
                this.setState({
                    pendingList: res.data.data
                })
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

        } else {
            return false
        }

    }

    textHandleChange = e => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value });
    }


    onSearchSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };
        let { searchValue } = this.state
        if (this.state.checkBoxValue === "id") {



            try {
                let obj = {
                    id: parseInt(searchValue)
                }




                //let url = 'http://127.0.0.1:3001/role/get/';
                let res = await axios.post(getRoleWithStatus, obj, config);
                this.setState({
                    pendingList: res.data.data,
                    checkBoxValue: "",
                    searchValue: "",
                    checkBoxOne: false
                })

            } catch (error) {
                if (error.response) {
                    let message = error.response.data.message
                    //console.log("Error",error.response)
                    NotificationManager.error(message, "Error", 5000);
                } else if (error.request) {
                    //  console.log("Error Connecting...", error.request)
                    NotificationManager.error("Error Connecting...", "Error", 5000);
                } else if (error) {
                    NotificationManager.error(error.toString(), "Error", 5000);
                }
            }
        }
        if (this.state.checkBoxValue === "status") {
            try {
                let obj = {
                    status: searchValue
                }
                //let url = 'http://127.0.0.1:3001/role/get/';
                let res = await axios.post(getRoleWithStatus, obj, config);
                this.setState({
                    pendingList: res.data.data,
                    checkBoxValue: "",
                    searchValue: "",
                    checkBoxTwo: false
                })

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
        if (this.state.checkBoxValue === "roleName") {
            try {
                let obj = {
                    roleName: searchValue
                }
                //let url = 'http://127.0.0.1:3001/role/get/';
                let res = await axios.post(getRoleWithStatus, obj, config);
                this.setState({
                    pendingList: res.data.data,
                    checkBoxValue: "",
                    searchValue: "",
                    checkBoxThree: false
                })

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
    }

    onCheckOneChange = (e) => {
        let value = e.target.value
        //console.log("Check Value", value)
        //this.state.checkBoxOneValue = value
        if (this.state.checkBoxOne === false) {
            this.setState({
                checkBoxOne: !this.state.checkBoxOne,
                checkBoxValue: value

            })
        } else {
            this.setState({
                checkBoxOne: !this.state.checkBoxOne,
                checkBoxValue: ""

            })
        }


    }
    onCheckTwoChange = (e) => {
        let value = e.target.value
        //console.log("Check Value", value)
        //this.state.checkBoxOneValue = value
        if (this.state.checkBoxTwo === false) {
            this.setState({
                checkBoxTwo: !this.state.checkBoxTwo,
                checkBoxValue: value

            })
        } else {
            this.setState({
                checkBoxTwo: !this.state.checkBoxTwo,
                checkBoxValue: ""

            })
        }


    }
    onCheckThreeChange = (e) => {
        let value = e.target.value
        //console.log("Check Value", value)
        //this.state.checkBoxOneValue = value
        if (this.state.checkBoxThree === false) {
            this.setState({
                checkBoxThree: !this.state.checkBoxThree,
                checkBoxValue: value

            })
        } else {
            this.setState({
                checkBoxThree: !this.state.checkBoxThree,
                checkBoxValue: ""

            })
        }


    }


    onUpdate = async (id) => {

        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };
        try {
            //console.log("id", id)
            // let url = 'http://127.0.0.1:3001/role/get/';
            let obj = {
                id: id

            }
            let res = await axios.post(getRoleWithStatus, obj, config)
            // console.log("200line", res.data)
            let data = res.data.data
            //console.log(data)

            let roleData = {
                id: data[0].id,
                status: data[0].status,
                roleName: data[0].roleName,
                description: data[0].description,
                grantedIPList: data[0].grantedIPList !== null ? data[0].grantedIPList : "",
                rolePrivileges: data[0].rolePrivileges

            }
            //console.log("All Role Data", roleData)

            this.props.history.push("/dashboard/update-role", roleData)
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
    onArchive = async (id) => {
        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };
        try {
            //console.log("id", id)
            //let url = 'http://127.0.0.1:3001/role/status';
            let data = {
                id: id,
                status: "D"
            }
            let res = await axios.put(roleApproval, data, config)
            this.setState({
                archeived: !this.state.archeived
            })
            NotificationManager.warning("Role Archeived", "Confirmed", 5000);
            //console.log(res.data)
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

    onModalShow = async (id) => {
        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };
        try {

            //let url = 'http://127.0.0.1:3001/role/get/';
            let obj = {
                id: id
            }
            let res = await axios.post(getRoleWithStatus, obj, config)
            let data = res.data.data
            this.setState({
                modalData: data
            })
            //console.log(data)

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





    render() {
        const { pendingList, modalData, checkBoxOne, checkBoxTwo, checkBoxThree, checkBoxValue, searchValue } = this.state

        // {
        //     console.log("Check One", checkBoxOne)
        //     console.log("Check One value", checkBoxValue)
        //     console.log("Check Two", checkBoxTwo)
        //     console.log("Check Two value", checkBoxValue)
        //     console.log("Check Three", checkBoxThree)
        //     console.log("Check Three value", checkBoxValue)
        // }

        //console.log("Pendinglist", pendingList);

        return (
            <div className="col-sm-12" >


                <div className="d-flex justify-content-center">
                    <div className="card col" style={{ padding: "25px" }}>
                        <div className="im">
                            <h5 className="text-muted text-center pt-2">
                                <i ><FaSearch /></i> Search Role
                        </h5>
                        </div>
                        <div className="card-body d-flex justify-content-center">

                            <ReactTooltip id="searchRole" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                                <span style={{ fontSize: "15px" }}><span style={{ color: "red" }}>*</span> Please select a search option before searching...</span>
                            </ReactTooltip>

                            <form className="col-sm-8">
                                <div className="form-group " >
                                    <label htmlFor=""></label>
                                    <input data-tip data-for='searchRole' style={{ borderRadius: "50px" }} name="searchValue" value={searchValue} onChange={this.textHandleChange} type="text" className="form-control" placeholder="Search by Id / Role Name / Status" />
                                    <small className="text-muted pl-2">
                                        <span style={{ color: "#39c12a", fontSize: "14px" }}>*</span> Chosse any option from below for searching.
                            </small>
                                </div>
                                <div className="form-group d-flex justify-content-center">
                                    <div className="custom-control custom-checkbox" style={{ marginLeft: "25px" }} >

                                        <input
                                            type="checkbox"
                                            name=""
                                            checked={checkBoxOne}
                                            onChange={(e) => this.onCheckOneChange(e)}
                                            className="custom-control-input"
                                            style={{ marginRight: "5px" }}
                                            value="id"
                                            style={{ cursor: "pointer" }}
                                            id="one"
                                            disabled={checkBoxValue !== "" ? true : false}
                                        />
                                        <label className="custom-control-label" htmlFor="one">Search By ID</label>

                                    </div>
                                    <div className="custom-control custom-checkbox" style={{ marginLeft: "25px" }} >

                                        <input
                                            type="checkbox"
                                            name=""
                                            checked={checkBoxTwo}
                                            onChange={(e) => this.onCheckTwoChange(e)}
                                            className="custom-control-input"
                                            style={{ marginRight: "5px" }}
                                            value="status"
                                            style={{ cursor: "pointer" }}
                                            id="two"
                                            disabled={checkBoxValue !== "" ? true : false}
                                        />
                                        <label className="custom-control-label" htmlFor="two">Search By Status</label>

                                    </div>
                                    <div className="custom-control custom-checkbox" style={{ marginLeft: "25px" }} >

                                        <input
                                            type="checkbox"
                                            name=""
                                            checked={checkBoxThree}
                                            onChange={(e) => this.onCheckThreeChange(e)}
                                            className="custom-control-input"
                                            style={{ marginRight: "5px" }}
                                            value="roleName"
                                            style={{ cursor: "pointer" }}
                                            id="three"
                                            disabled={checkBoxValue !== "" ? true : false}
                                        />
                                        <label className="custom-control-label" htmlFor="three">Search By Role Name</label>

                                    </div>
                                </div>
                                <div className="d-flex justify-content-center pt-2" >
                                    <button onClick={(e) => this.onSearchSubmit(e)} className="b" ><i ><FaSearch /></i> Search</button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>

                {/* <table className="table table-hover mt-5" style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.24)" }}>
                    <thead>

                        <tr className="text-center text-muted im">

                            <th scope="col" style={{ fontSize: "17px", borderRight: "1px solid #d4d4d4" }}>ID</th>
                            <th scope="col" style={{ fontSize: "17px", borderRight: "1px solid #d4d4d4" }}>RoleName</th>
                            <th scope="col" style={{ fontSize: "17px", borderRight: "1px solid #d4d4d4" }}>Description</th>
                            <th scope="col" style={{ fontSize: "17px", borderRight: "1px solid #d4d4d4" }}>IP List</th>
                            <th scope="col" style={{ fontSize: "17px", borderRight: "1px solid #d4d4d4" }}>Features</th>
                            <th scope="col" style={{ fontSize: "17px", borderRight: "1px solid #d4d4d4" }}>Status</th>
                            <th scope="col" style={{ fontSize: "17px" }}>Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        {pendingList.map((value, index) => (
                            <tr key={index} className="text-center" style={{ padding: "10px" }}>
                                <td style={{ fontSize: "14px", borderRight: "1px solid #d4d4d4" }}>{value.id}</td>
                                <td style={{ fontSize: "14px", borderRight: "1px solid #d4d4d4" }}>{value.roleName}</td>
                                <td style={{ fontSize: "14px", borderRight: "1px solid #d4d4d4" }}>{value.description}</td>
                                <td style={{ fontSize: "14px", borderRight: "1px solid #d4d4d4" }}>{value.grantedIPList.map(v => v + ", ")}</td>
                                <td style={{ fontSize: "14px", borderRight: "1px solid #d4d4d4" }}>{value.rolePrivileges.map(v => v[1] + ", ")}</td>
                                <td style={{ fontSize: "14px", borderRight: "1px solid #d4d4d4" }}>{value.status === "P" ? "Pending" : value.status}</td>
                                <td style={{ fontSize: "14px" }}>
                                    <div className="d-flex">
                                        <span className="sbtn" onClick={() => this.onUpdate(value.id)}>Update</span>
                                        <span className="sbtnx" onClick={() => this.onReject(value.id)}>Archive</span>
                                    </div>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table> */}



                <div className="card mt-3">
                    <div className="im">
                        <h5 className="text-muted text-center pt-2">
                            <i><FaListUl /></i> Role List
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="row d-flex justify-content-center">
                            {
                                pendingList.map((value, index) => (
                                    <div key={index} className="col-sm-3 mr-2 divBgCard" style={{ color: "#333", padding: "15px" }}>
                                        <div className="text-center im">
                                            <small className="text-muted"><i ><FaSortNumericUp /></i> ID : <span>{value.id}</span></small>
                                        </div>
                                        <hr />


                                        <div>
                                            <small className="text-muted"><i ><FaBatteryThreeQuarters /></i> Status : <span>{`${value.status} (${RoleAndUserStatus(value.status)})`}</span></small>
                                        </div>
                                        <div>
                                            <small className="text-muted"><i ><FaMizuni /></i> Role Name : <span>{value.roleName}</span></small>
                                        </div>

                                        <div>
                                            <small className="text-muted"><i ><FaPenNib /></i> Description : <span>{value.description}</span></small>
                                        </div>
                                        <div>
                                            <small className="text-muted"><i ><FaDigitalTachograph /></i> IP List : <span>{value.grantedIPList !== null ? value.grantedIPList.map(v => v + ", ") : ""}</span></small>
                                        </div>
                                        <hr />

                                        <div className="d-flex justify-content-center mt-2">
                                            <ReactTooltip id="arc" place="top" type="warning" effect="float">
                                                <span style={{ fontSize: "15px" }}> Warning..! Role will be deleted permanently.</span>
                                            </ReactTooltip>
                                            <span className="sbtn mr-2" onClick={() => this.onUpdate(value.id)}><i ><FaEdit /></i> Update</span>
                                            <span data-tip data-for= "arc" className="sbtnx mr-2" onClick={() =>window.confirm("Are you sure you want to archive the Role?") && this.onArchive(value.id)}><i ><FaArchive /></i> Archive</span>
                                            <span className="sbtnxy" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => this.onModalShow(value.id)} ><i ><FaBinoculars /></i> Details</span>
                                        </div>



                                        {/* <!-- Modal --> */}
                                        <div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                <div className="modal-content imTwo">
                                                    <div className="modal-header divBg">
                                                        <h5 className="modal-title" id="exampleModalCenterTitle"><i><FaArrowAltCircleRight /></i> Role Details</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        {modalData.map(val => (
                                                            <div className="">
                                                                <div className="">
                                                                    <small className="text-muted"><i ><FaSortNumericUp /></i> ID : <span>{val.id}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i ><FaBatteryThreeQuarters /></i> Status : <span>{RoleAndUserStatus(val.status)}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i ><FaMizuni /></i> Role Name : <span>{val.roleName}</span></small>
                                                                </div>
                                                                <hr />
                                                                <div>
                                                                    <small className="text-muted"><i ><FaPenNib /></i> Description : <span>{val.description}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i ><FaDigitalTachograph /></i> IP List : <span>{val.grantedIPList === null ? "" : val.grantedIPList.map(v => v + ", ")}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i ><FaElementor /></i> Features : <span>{val.rolePrivileges.map(v => v[1] + ", ")}</span></small>
                                                                </div>
                                                                <hr />
                                                                <div>
                                                                    <small className="text-muted"><i ><FaUserShield /></i> Created By : <span>{val.createdBy}</span></small>
                                                                </div>
                                                                <div>
                                                                    <small className="text-muted"><i ><FaUserTag /></i> Approved By : <span>{val.approvedBy}</span></small>
                                                                </div>
                                                                <div>
                                                                    <small className="text-muted"><i ><FaUserEdit /></i> Updated By : <span>{val.updatedBy}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i ><FaCalendarCheck /></i> Created Date : <span>{val.createDate}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i ><FaCalendarAlt /></i> Approved Date : <span>{val.approveDate}</span></small>
                                                                </div>


                                                                <div>
                                                                    <small className="text-muted"><i ><FaCalendarCheck /></i> Updated Date : <span>{val.updateDate}</span></small>
                                                                </div>


                                                            </div>

                                                        ))}
                                                    </div>
                                                    <div className="modal-footer imTwo">
                                                        <span className="sbtnx" data-dismiss="modal">Close</span>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                ))
                            }
                        </div>

                    </div>





                </div>

            </div>
        )
    }
}

export default withRouter(RoleList)
