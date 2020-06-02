import React, { Component } from 'react'
import axios from 'axios'
import { NotificationManager } from "react-notifications";




class ApproveRole extends Component {
    state = {
        pendingList: [],
        modalData: [],
        approvedReject: false
    }

    componentDidMount() {

        let apiCall = async () => {
            try {
                const Obj = { status: "P" };
                let url = 'http://127.0.0.1:3001/role/get/';
                let res = await axios.post(url, Obj);
                this.setState({
                    pendingList: res.data.data
                })
                //console.log("PendingList", this.state.pendingList)
            } catch (error) {
                console.log(error.response)
            }
        }

        apiCall();




        //console.log("All Data", this.state.pendingList.data)

    }




    async componentDidUpdate(prevProps, prevState) {


        //console.log("prevState", prevState)

        if (prevState.approvedReject !== this.state.approvedReject) {
            console.log("prevState", prevState)
            console.log("this.state.pendingList", this.state.pendingList)
            const Obj = { status: "P" };
            let url = 'http://127.0.0.1:3001/role/get/';
            let res = await axios.post(url, Obj);
            //console.log("res", res)
            this.setState({
                pendingList: res.data.data
            })
        }
        else {
            return false
        }




    }


    onApprove = async (id) => {

        try {
            //console.log("id", id)
            let url = 'http://127.0.0.1:3001/role/status';
            let data = {
                id: id,
                status: "A"
            }
            let res = await axios.put(url, data)
            this.setState({
                approvedReject: !this.state.approvedReject
            })
            NotificationManager.success("Role Approved", "Success", 5000);
            //console.log(res.data)
        } catch (error) {
            let { message } = error.response.data
            let { statusCode } = error.response.data
            console.log("error.response", error.response.data)
            NotificationManager.error(statusCode + ',' + message, "Error", 5000);
        }


    }
    onReject = async (id) => {
        try {
            //console.log("id", id)
            let url = 'http://127.0.0.1:3001/role/status';
            let data = {
                id: id,
                status: "R"
            }
            let res = await axios.put(url, data)
            this.setState({
                approvedReject: !this.state.approvedReject
            })
            NotificationManager.warning("Role Rejected", "Confirmed", 5000);
            //console.log(res.data)
        } catch (error) {
            let { message } = error.response.data
            let { statusCode } = error.response.data
            console.log("error.response", error.response.data)
            NotificationManager.error(statusCode + ',' + message, "Error", 5000);
        }


    }


    onModalShow = async (id) => {
        try {

            let url = 'http://127.0.0.1:3001/role/get/';
            let obj = {
                id: id
            }
            let res = await axios.post(url, obj)
            let data = res.data.data
            this.setState({
                modalData: data
            })
            console.log(data)

        } catch (error) {
            // let { reason } = error.response.data

            // alert(reason.map(v => (
            //     JSON.stringify(Object.values(v.constraints))
            // )))
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
                            <i class="fas fa-user-check"></i> Approve Role
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="row d-flex justify-content-center">
                            {
                                pendingList.map((value, index) => (
                                    <div key={index} className="col-sm-3 mr-2 divBgCard" style={{ color: "#333", padding: "15px" }}>
                                        <div className="text-center im">
                                            <small className="text-muted"><i className="fas fa-sort-numeric-up"></i> ID : <span>{value.id}</span></small>
                                        </div>
                                        <hr />


                                        <div>
                                            <small className="text-muted"><i className="fas fa-battery-three-quarters"></i> Status : <span>{value.status}</span></small>
                                        </div>
                                        <div>
                                            <small className="text-muted"><i className="fab fa-mizuni"></i> Role Name : <span>{value.roleName}</span></small>
                                        </div>

                                        <div>
                                            <small className="text-muted"><i className="fas fa-pen-nib"></i> Description : <span>{value.description}</span></small>
                                        </div>
                                        <div>
                                            <small className="text-muted"><i className="fas fa-digital-tachograph"></i> IP List : <span>{value.grantedIPList !== null ? value.grantedIPList.map(v => v + ", "): ""}</span></small>
                                        </div>
                                        <hr />

                                        <div className="d-flex justify-content-center mt-2">
                                            <span className="sbtn mr-2" onClick={() => this.onApprove(value.id)}><i class="far fa-check-circle"></i> Approve</span>
                                            <span className="sbtnx mr-2" onClick={() => this.onReject(value.id)}><i class="far fa-window-close"></i> Reject</span>
                                            <span className="sbtnxy" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => this.onModalShow(value.id)} ><i class="fas fa-binoculars"></i> Details</span>
                                        </div>



                                        {/* <!-- Modal --> */}
                                        <div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                <div className="modal-content imTwo">
                                                    <div className="modal-header divBg">
                                                        <h5 className="modal-title" id="exampleModalCenterTitle"><i class="far fa-arrow-alt-circle-right"></i> Role Details</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        {modalData.map(val => (
                                                            <div className="">
                                                                <div className="">
                                                                    <small className="text-muted"><i className="fas fa-sort-numeric-up"></i> ID : <span>{val.id}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i className="fas fa-battery-three-quarters"></i> Status : <span>{val.status}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i className="fab fa-mizuni"></i> Role Name : <span>{val.roleName}</span></small>
                                                                </div>
                                                                <hr />
                                                                <div>
                                                                    <small className="text-muted"><i className="fas fa-pen-nib"></i> Description : <span>{val.description}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i className="fas fa-digital-tachograph"></i> IP List : <span>{val.grantedIPList.map(v => v + ", ")}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i className="fab fa-elementor"></i> Features : <span>{val.rolePrivileges.map(v => v[1] + ", ")}</span></small>
                                                                </div>
                                                                <hr />
                                                                <div>
                                                                    <small className="text-muted"><i className="fas fa-user-shield"></i> Created By : <span>{val.createdBy}</span></small>
                                                                </div>
                                                                <div>
                                                                    <small className="text-muted"><i className="fas fa-user-tag"></i> Approved By : <span>{val.approvedBy}</span></small>
                                                                </div>
                                                                <div>
                                                                    <small className="text-muted"><i className="fas fa-user-edit"></i> Updated By : <span>{val.updatedBy}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i className="fas fa-calendar-check"></i> Created Date : <span>{val.createDate}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i className="far fa-calendar-alt"></i> Approved Date : <span>{val.approveDate}</span></small>
                                                                </div>


                                                                <div>
                                                                    <small className="text-muted"><i className="far fa-calendar-check"></i> Updated Date : <span>{val.updateDate}</span></small>
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
