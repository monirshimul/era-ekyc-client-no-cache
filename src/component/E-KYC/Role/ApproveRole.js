import React, { Component } from 'react';
import axios from 'axios';
import {RoleAndUserStatus} from '../../Utils/fullFormConversion';
import { NotificationManager } from "react-notifications";
import {getRoleWithStatus, roleApproval} from "../Url/ApiList";
import { FaBatteryThreeQuarters, FaMizuni, FaPenNib,
        FaDigitalTachograph, FaBinoculars, FaUserCheck, FaSortNumericUp,
            FaCheckCircle, FaWindowClose, FaArrowAltCircleRight,
             FaElementor, FaUserShield, FaUserTag, FaUserEdit,
              FaCalendarCheck, FaCalendarAlt } from "react-icons/fa";




class ApproveRole extends Component {
    state = {
        pendingList: [],
        modalData: [],
        approvedReject: false
    }

    componentDidMount() {

        let apiCall = async () => {

            const config = {
                headers: {

                    'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

                }
            };

            try {
                const Obj = { status: "P" };
                let res = await axios.post(getRoleWithStatus, Obj, config);
                this.setState({
                    pendingList: res.data.data
                })
                //console.log("PendingList", this.state.pendingList)
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

        apiCall();




        //console.log("All Data", this.state.pendingList.data)

    }




    async componentDidUpdate(prevProps, prevState) {


        //console.log("prevState", prevState)
        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };

        if (prevState.approvedReject !== this.state.approvedReject) {
            // console.log("prevState", prevState)
            // console.log("this.state.pendingList", this.state.pendingList)
            const Obj = { status: "P" };
            try {
                // let url = 'http://127.0.0.1:3001/role/get/';
                let res = await axios.post( getRoleWithStatus, Obj, config);
                //console.log("res", res)
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
        }
        else {
            return false
        }




    }


    onApprove = async (id) => {

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
                status: "A"
            }
            let res = await axios.put(roleApproval, data, config)
            this.setState({
                approvedReject: !this.state.approvedReject
            })
            NotificationManager.success("Role Approved", "Success", 5000);
            //console.log(res.data)
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
    onReject = async (id) => {

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
                status: "R"
            }
            let res = await axios.put(roleApproval, data, config)
            this.setState({
                approvedReject: !this.state.approvedReject
            })
            NotificationManager.warning("Role Rejected", "Confirmed", 5000);
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
        const { pendingList, modalData } = this.state
        //console.log(pendingList)
        // pendingList.map(v => {
        //     // console.log(v.rolePrivileges)
        //     v.rolePrivileges.map(b => {
        //         console.log(b[1])
        //     })
        // })

        return (
            <div className="col-sm-12" >
                {/* <div className="divBg">
                    <h4 className="text-center pt-3">
                        Approve Pending Role
                    </h4>
                </div>

                <table class="table table-hover" style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.24)" }}>
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
                                        <span className="sbtn" onClick={() => this.onApprove(value.id)}>Approve</span>
                                        <span className="sbtnx" onClick={() => this.onReject(value.id)}>Reject</span>
                                    </div>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table> */}
                <div className="card mt-3">
                    <div className="im">
                        <h5 className="text-muted text-center pt-2">
                            <i ><FaUserCheck/></i> Approve Role
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="row d-flex justify-content-center">
                            {
                                pendingList.map((value, index) => (
                                    <div key={index} className="col-sm-3 mr-2 divBgCard" style={{ color: "#333", padding: "15px" }}>
                                        <div className="text-center im">
                                            <small className="text-muted"><i ><FaSortNumericUp/></i> ID : <span>{value.id}</span></small>
                                        </div>
                                        <hr />


                                        <div>
                                            <small className="text-muted"><i ><FaBatteryThreeQuarters/></i> Status : <span>{RoleAndUserStatus(value.status)}</span></small>
                                        </div>
                                        <div>
                                            <small className="text-muted"><i ><FaMizuni/></i> Role Name : <span>{value.roleName}</span></small>
                                        </div>

                                        <div>
                                            <small className="text-muted"><i ><FaPenNib/></i> Description : <span>{value.description}</span></small>
                                        </div>
                                        <div>
                                            <small className="text-muted"><i ><FaDigitalTachograph/></i> IP List : <span>{value.grantedIPList !== null ? value.grantedIPList.map(v => v + ", ") : ""}</span></small>
                                        </div>
                                        <hr />

                                        <div className="d-flex justify-content-center mt-2">
                                            <span className="sbtn mr-2" onClick={() => this.onApprove(value.id)}><i ><FaCheckCircle/></i> Approve</span>
                                            <span className="sbtnx mr-2" onClick={() =>window.confirm("Are you sure you want to reject the Role ?") && this.onReject(value.id)}><i ><FaWindowClose/></i> Reject</span>
                                            <span className="sbtnxy" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => this.onModalShow(value.id)} ><i ><FaBinoculars/></i> Details</span>
                                        </div>



                                        {/* <!-- Modal --> */}
                                        <div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                <div className="modal-content imTwo">
                                                    <div className="modal-header divBg">
                                                        <h5 className="modal-title" id="exampleModalCenterTitle"><i ><FaArrowAltCircleRight/></i> Role Details</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        {modalData.map(val => (
                                                            <div className="">
                                                                <div className="">
                                                                    <small className="text-muted"><i ><FaSortNumericUp/></i> ID : <span>{val.id}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i ><FaBatteryThreeQuarters/></i> Status : <span>{RoleAndUserStatus(val.status)}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i ><FaMizuni/></i> Role Name : <span>{val.roleName}</span></small>
                                                                </div>
                                                                <hr />
                                                                <div>
                                                                    <small className="text-muted"><i ><FaPenNib/></i> Description : <span>{val.description}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i ><FaDigitalTachograph/></i> IP List : <span>{val.grantedIPList === null ? "" : val.grantedIPList.map(v => v + ", ")}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i ><FaElementor/></i> Features : <span>{val.rolePrivileges.map(v => v[1] + ", ")}</span></small>
                                                                </div>
                                                                <hr />
                                                                <div>
                                                                    <small className="text-muted"><i ><FaUserShield/></i> Created By : <span>{val.createdBy}</span></small>
                                                                </div>
                                                                <div>
                                                                    <small className="text-muted"><i ><FaUserTag/></i> Approved By : <span>{val.approvedBy}</span></small>
                                                                </div>
                                                                <div>
                                                                    <small className="text-muted"><i ><FaUserEdit/></i> Updated By : <span>{val.updatedBy}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i ><FaCalendarCheck/></i> Created Date : <span>{val.createDate}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i ><FaCalendarAlt/></i> Approved Date : <span>{val.approveDate}</span></small>
                                                                </div>


                                                                <div>
                                                                    <small className="text-muted"><i ><FaCalendarCheck/></i> Updated Date : <span>{val.updateDate}</span></small>
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

export default ApproveRole
