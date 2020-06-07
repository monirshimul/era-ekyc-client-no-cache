import React, { Component } from 'react';
import axios from 'axios';
import '../../E-KYC/Simplified/utils/Common.css';
//import '../CSS/table.css';
import { getUserWithStatus, userApprovalAPI } from '../Url/ApiList';
// import {getUnique} from '../../Utils/UniqueArr';


export class UserApproval extends Component {
    state = {
        ApproveUser: [],
        page: 1,
        totalPages: '',
        details: [],
        showPending: []

    }

    async componentDidMount() {
        const { page } = this.state;
        const ApproveObj = { status: "P" };
        try {
            // API call for Pending User List
            let AppUserList = await axios.post(getUserWithStatus + 1, ApproveObj);
            //Get User Data
            let appUserData = AppUserList.data.data;
            // console.log("AppUserData", appUserData);
            let numberPages = AppUserList.data.totalPages;
            let pendingStatus = new Array(appUserData.length).fill(false);


            this.setState({ ApproveUser: appUserData, showPending: pendingStatus, totalPages: numberPages });
        } catch (e) {
            console.log(e.response);
        }

    }



    // Approve / Reject button clicked then accept/reject  user approval 
    onDecisionApprove = async (id) => {
        // console.log("approveid", id);
        // let showload = this.state.showPendingStatus;
        // showload[index] = true;
        // this.setState({ showPendingStatus: showload });
        //obj creating for api call
        const obj = { id, status: "A" };
        //console.log(obj);

        try {
            let approveUser = await axios.put(userApprovalAPI, obj);
            // console.log(approveUser.data);
            // this.state.showPendingStatus[index].status = "Approve";
            // showload[index] = false;
            // this.setState({ showPendingStatus: showload });
            console.log(approveUser.data);
            let statusCode = approveUser.data.statusCode;

            let message = "Approve " + approveUser.data.message;
            alert(statusCode + " " + message);


        } catch (e) {
            // showload[index] = false;
            // this.setState({ showPendingStatus: showload });
            console.log(e.response);
        }



    }


    onDecisionReject = async (id) => {
        // console.log("approveid", id);
        // let showload = this.state.showPendingStatus;
        // showload[index] = true;
        // this.setState({ showPendingStatus: showload });
        //obj creating for api call
        const obj = { id, status: "R" };
        //console.log(obj);

        try {
            let approveUser = await axios.put(userApprovalAPI, obj);
            // console.log(approveUser.data);
            // this.state.showPendingStatus[index].status = "Approve";
            // showload[index] = false;
            // this.setState({ showPendingStatus: showload });
            console.log(approveUser.data);
            let statusCode = approveUser.data.statusCode;



            let message = "Reject " + approveUser.data.message;
            alert(statusCode + " " + message);


        } catch (e) {
            // showload[index] = false;
            // this.setState({ showPendingStatus: showload });
            console.log(e.response);
        }



    }





    // 
    onDetails = async (id) => {
        const detailsObj = { id, status: "P" };

        try {
            let detailsUser = await axios.post(getUserWithStatus + 1, detailsObj);
            let pendingDetails = detailsUser.data.data;
            this.setState({ details: pendingDetails });
        } catch (e) {
            console.log(e.response);
        }

    }




    // Render Table function for dynamically render Approve User data
    renderTableData() {

        return this.state.ApproveUser.map((user, index) => {
            const { id, userId, name, mobile, email, status, roles } = user //destructuring
            const data1 = "A";
            const data2 = "R";
            let aprId = "status" + id;
            let mystatus = "Approve"
            return (
                <tr key={id}>

                    <td>{userId}</td>
                    <td>{name}</td>
                    <td>{mobile}</td>
                    <td>{email}</td>
                    <td id={aprId}>
                        {this.state.showPending[index]
                            ? `Loading ...`
                            : status
                        }


                    </td>


                    {/* Show Role Name */}
                    <td>
                        {roles.map((val, i) => (

                            roles[i].roleName + '  '
                        ))}
                    </td>



                    {/* Show Role Previleges */}
                    <td>
                        {roles.map((val, i) => {
                            const a = roles[i].rolePrivileges;
                            const preArr = [];
                            for (let i = 0; i < a.length; i++) {

                                preArr.push(a[i][1] + " , ")
                            }
                            return preArr
                        })}
                    </td>



                    {/* Details Button  */}

                    <td style={{ textAlign: 'center' }}>
                        <span
                            type='button'
                            className="sbtn"
                            onClick={() => this.onDetails(id)}
                            data-toggle='modal'
                            data-target='#myModal'

                        >
                            Details
            </span>
                        <div className='modal' id='myModal'>
                            <div className='modal-dialog'>
                                <div className='modal-content'>
                                    <div className='modal-header'>
                                        <h4 className='modal-title'>User Details</h4>
                                        <button
                                            type='button'
                                            className='close'
                                            data-dismiss='modal'
                                        >
                                            &times;
                    </button>
                                    </div>

                                    {this.state.details.map((user, index) => (
                                        <div key={user.id}>
                                            <p>User Id:{user.userId}</p>
                                            <p> Name:{user.name}</p>
                                            <p> Mobile:{user.mobile}</p>
                                            <p>Email:{user.email}</p>
                                            <p> RoleName:
                      {roles.map((val, i) => (

                                                roles[i].roleName + '  '
                                            ))}
                                            </p>
                                            <p> Role Previleges:
                        {roles.map((val, i) => {
                                                const a = roles[i].rolePrivileges;
                                                const preArr = [];
                                                for (let i = 0; i < a.length; i++) {

                                                    preArr.push(a[i][1] + " , ")
                                                }
                                                return preArr
                                            })}
                                            </p>
                                        </div>
                                    ))
                                    }


                                    <div className='modal-footer'></div>
                                </div>
                            </div>
                        </div>
                    </td>



                    {/* Action Button */}

                    <td >
                        <div className="d-flex">
                            <span className="sbtn" onClick={() => this.onDecision(id, data1)}>Approve</span>&nbsp;
                            <span className="sbtnx" onClick={() => this.onDecision(id, data2)}>Reject</span>&nbsp;
                        </div>
                    </td>

                </tr>
            )
        })
    }







    render() {
        //console.log(this.state.ApproveUser);
        return (
            <div className="col-sm-12">
                {/* <h1>Approve User</h1>
                <div className='row '>
                    

                    <table id='data' style={{ fontSize: '11pt' }}>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Role Name</th>
                                <th>Privileges Role</th>
                                <th>Details</th>
                                <th>Action</th>


                            </tr>
                        </thead>
                        <tbody>{this.renderTableData()}</tbody>
                    </table>

                   
                </div> */}



                <div className="card mt-3">
                    <div className="im">
                        <h5 className="text-muted text-center pt-2">
                            <i class="fas fa-user-check"></i> Approve User
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="row d-flex justify-content-center">
                            {
                                this.state.ApproveUser.map((user, index) => (

                                    <div key={index} className="col-sm-3 mr-2 divBgCard" style={{ color: "#333", padding: "15px" }}>
                                        <div className="text-center im">
                                            <small className="text-muted"><i className="fas fa-sort-numeric-up"></i> User ID : <span style={{ color: "green" }}>{user.userId}</span></small>
                                        </div>
                                        <hr />
                                        <div>
                                            <small className="text-muted"><i className="fas fa-battery-three-quarters"></i> Status : <span>{user.status}</span></small>
                                        </div>
                                        <div>
                                            <small className="text-muted"><i className="fas fa-pen-nib"></i> Name : <span>{user.name}</span></small>
                                        </div>

                                        <div>
                                            <small className="text-muted"><i className="fab fa-mizuni"></i> Mobile : <span>{user.mobile}</span></small>
                                        </div>
                                        {/* <div>
                                                <small className="text-muted"><i className="fas fa-digital-tachograph"></i> Role Name : <span>{user.roles.map((v, i) => v.roleName + ',')}</span></small>
                                            </div> */}
                                        <hr />

                                        <div className="d-flex justify-content-center mt-2">
                                            <span className="sbtn mr-2" onClick={() => this.onDecisionApprove(user.id)} ><i class="far fa-edit"></i> Approve</span>
                                            <span className="sbtnx mr-2" onClick={() => this.onDecisionReject(user.id)} ><i class="fas fa-archive"></i> Reject</span>
                                            <span className="sbtnxy" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => this.onDetails(user.id)}  ><i class="fas fa-binoculars"></i> Details</span>
                                        </div>



                                        {/* <!-- Modal --> */}
                                        <div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                <div className="modal-content imTwo">
                                                    <div className="modal-header divBg">
                                                        <h5 className="modal-title" id="exampleModalCenterTitle"><i class="far fa-arrow-alt-circle-right"></i> User Details</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        {this.state.details.map(val => (
                                                            <div className="">
                                                                <div className="">
                                                                    <small className="text-muted"><i className="fas fa-sort-numeric-up"></i> ID : <span>{val.userId}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i className="fas fa-battery-three-quarters"></i> Status : <span>{val.status}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i className="fab fa-mizuni"></i> Role Name : <span>{val.roles.map((v, i) => v.roleName + ',')}</span></small>
                                                                </div>
                                                                <div>
                                                                    <small className="text-muted"><i className="fab fa-mizuni"></i> Email : <span>{val.email}</span></small>
                                                                </div>
                                                                <hr />
                                                                <div>
                                                                    <small className="text-muted"><i className="fas fa-pen-nib"></i> Description : <span>{val.roles.map((v, i) => v.description)}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i className="fas fa-digital-tachograph"></i> IP List : <span>{val.roles.map((v, i) => v.grantedIPList.map(ip => ip))}</span></small>
                                                                </div>

                                                                <div>
                                                                    <small className="text-muted"><i className="fab fa-elementor"></i> Features : <span>{val.roles.map(v => v.rolePrivileges.map(r => r[1] + ", "))}</span></small>
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

export default UserApproval;
