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
            let pendingStatus =  new Array(appUserData.length).fill(false) ;
           

            this.setState({ ApproveUser: appUserData, showPending: pendingStatus, totalPages: numberPages });
        } catch (e) {
            console.log(e.response);
        }

    }



    // Approve / Reject button clicked then accept/reject  user approval 
    onDecision = async(id, aprId, index, data) => {
       // console.log("approveid", id);
        // let showload = this.state.showPendingStatus;
        // showload[index] = true;
        // this.setState({ showPendingStatus: showload });
        //obj creating for api call
        const obj = { id, status: data };
        //console.log(obj);

        try {
            let approveUser = await axios.put(userApprovalAPI, obj);
           // console.log(approveUser.data);
            // this.state.showPendingStatus[index].status = "Approve";
            // showload[index] = false;
            // this.setState({ showPendingStatus: showload });
            console.log(approveUser.data);
            let statusCode = approveUser.data.statusCode;
            if(data === "A"){
                let message = "Approve " + approveUser.data.message;
                alert(statusCode + " " + message);
            }else{
                let message = "Reject " + approveUser.data.message;
                alert(statusCode + " " + message);
            }
          
        } catch (e) {
            // showload[index] = false;
            // this.setState({ showPendingStatus: showload });
            console.log(e.response);
        }

       

    }

   



    // 
    onDetails = async (id) => {
       const detailsObj ={id, status:"P"};

       try{
       let detailsUser = await axios.post(getUserWithStatus+1, detailsObj);
        let pendingDetails = detailsUser.data.data;
        this.setState({details:pendingDetails});
    }catch(e){
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
                            <span className="sbtn" onClick={() => this.onDecision(id, aprId, index, data1)}>Approve</span>&nbsp;
                            <span className="sbtnx" onClick={() => this.onDecision(id, aprId, index, data2)}>Reject</span>&nbsp;
                        </div>
                    </td>

                </tr>
            )
        })
    }







    render() {
        //console.log(this.state.ApproveUser);
        return (
            <div>
                <h1>Approve User</h1>
                <div className='row '>
                    {/* Start Content*/}

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

                    {/* End Content*/}
                </div>
            </div>
        )
    }
}

export default UserApproval;
