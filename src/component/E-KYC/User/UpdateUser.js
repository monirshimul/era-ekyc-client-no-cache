import React, { Component } from 'react';
import '../../E-KYC/Simplified/utils/Common.css';
import { withRouter } from 'react-router-dom';
import { getupdateUser, getRoleWithFilter, userUpdate } from '../Url/ApiList';
import { NotificationManager } from "react-notifications";
import axios from 'axios';
import { largeTime } from '../../Utils/notificationTime';
import ReactTooltip from 'react-tooltip';

class UpdateUser extends Component {

    state = {
        id: "",
        userId: '',
        channelName: '',
        name: '',
        password: '',
        mobile: '',
        email: '',
        status: '',
        // get role name for getting roleName of a person
        getRoleName: [],
        // Show role Name and adding is added to existing role
        role_list: [],
        roles: [],
        checking: [],
        pinAuthStatus: "",
        approved_by: '',
        approve_date: '',
        created_by: '',
        created_date: ''
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    async componentDidMount() {
        //console.log(this.props.location.state);
        //let getId = this.props.location.state;
        //console.log("getId",this.props.location);
        let arr = [];
        //Update user api
        const obj = { userId: this.props.location.state };
        //console.log("obj", obj);
        const actRole = { status: "A" };
        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };

        try {
            let updata = await axios.post(getupdateUser + 1, obj, config);
            const prefillData = updata.data.data;
            //console.log("prefilled", prefillData);
            this.setState({
                id: prefillData[0].id,
                userId: prefillData[0].userId,
                channelName: prefillData[0].channelCode,
                name: prefillData[0].name,
                mobile: prefillData[0].mobile,
                email: prefillData[0].email,
                status: prefillData[0].status,
                pinAuthStatus: prefillData[0].pinAuthStatus,
                getRoleName: prefillData[0].roles
            })

            //   console.log("getrole", this.state.getRoleName)
            //Array for getRoleName from user
            for (let i = 0; i < this.state.getRoleName.length; i++) {

                arr.push(this.state.getRoleName[i].id);
            }
            this.setState({ checking: arr });

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
        //getRolewithFilter

        try {
            let listRoles = await axios.post(getRoleWithFilter, actRole, config);

            //listRoles data get from API
            let filterRoles = listRoles.data.data;
            //Create an array filter data for filter id and roleName key from each object get from API
            let filterData = Object.assign([], this.state.role_list);
            //Filter id and roleName from listRoles API
            const filteredKeys = ['id', 'roleName', "rolePrivileges", "isAdded"];
            //map filterRoles for Filter data [id, roleName] keys

            let myArray = this.state.checking;
            //Without sort isAdded true/false is not working
            let marray = myArray.sort();

            //console.log("before loop",this.state.checking);
            for (let j = 0; j < marray.length; j++) {
                for (let k = 0; k < filterRoles.length; k++) {
                    if (marray[j] === filterRoles[k].id) {
                        filterRoles[k]['isAdded'] = true;
                        break;
                    } else {
                        filterRoles[k]['isAdded'] = false;
                    }
                }
            }

            //console.log("filterRoles", filterRoles);

            //map filterRoles for Filter data [id, roleName] keys
            filterRoles.map((val, i) => {
                const filtered = filteredKeys.reduce((obj, key) => ({ ...obj, [key]: filterRoles[i][key] }), {});
                filterData.push(filtered);
            });
            this.setState({ role_list: filterData });
            //console.log("role_list", this.state.role_list);

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



    ///checkbox

    onAddingItem = (id) => (item) => {
        const isChecked = item.target.checked;
        const value = item.target.value;
        let idValue = id;

        if (isChecked === false) {
            //  console.log("false");
            try {
                let r = this.state.checking.filter(repo => repo !== idValue);

                //   console.log("false inside", r);
                this.setState({ checking: r });
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

            this.state.checking.push(id);
            // console.log("true inside", this.state.checking);
        }




        this.setState(prevState => ({ role_list: prevState.role_list.map(roll => roll.roleName === value ? { ...roll, isAdded: isChecked } : roll) }));

        if (isChecked)
            this.setState(prevState => ({ roles: [...prevState.roles, value] }));
        else {
            const newAddedroles = this.state.roles.filter(roll => roll !== value)
            this.setState({ roles: newAddedroles });

        }
    }



    // Render table

    renderTableData() {
        return this.state.role_list.map((role, index) => {
            const { id, roleName, rolePrivileges } = role //destructuring
            return (
                <tr key={id}>

                    <td className="text-center" style={{ fontWeight: "600" }}>{roleName}</td>
                    <td className="text-center" style={{ color: "green" }}>
                        {rolePrivileges.map((val, i) => (
                            rolePrivileges[i][1] + " / "
                        ))
                        }
                    </td>


                    <td>
                        <div className="text-center">
                            <input type="checkbox" id="myCheckbox" name="role_checkbox" defaultChecked={role.isAdded} value={role.id || ''} onChange={this.onAddingItem(role.id)} />
                            {/* <label class="checkbox-checked" > &nbsp;{role.roleName}</label> */}

                        </div>
                    </td>
                </tr>
            )
        })
    }








    //Handle Submit for Submit button
    handleSubmit = async (e) => {
        e.preventDefault();
        const { id, userId, channelName, name, mobile, email, pinAuthStatus, checking, roles } = this.state;
        let mobileCheck = /^(?:\+88|88)?(01[3-9]\d{8})$/;

        if (userId === "") {
            let userIdMessage = "Please Provide your User ID";
            NotificationManager.warning(userIdMessage, "Click to Remove", largeTime);
            return;
        }

        if (channelName === "") {
            let channelNameMessage = "Please Provide Channel Name";
            NotificationManager.warning(channelNameMessage, "Click to Remove", largeTime);
            return;
        }


        if (name === "") {
            let nameMessage = "Please Provide your Name";
            NotificationManager.warning(nameMessage, "Click to Remove", largeTime);
            return;
        }


        if (mobile === "") {
            let mobileMessage = "Please Provide your Mobile Number";
            NotificationManager.warning(mobileMessage, "Click to Remove", largeTime);
            return;
        }

        if (mobile.length > 11) {
            let mobileLengthMessage = "Mobile Number must be 11 digits long";
            NotificationManager.warning(mobileLengthMessage, "Click to Remove", largeTime);
            return;
        } else if (mobile.length <= 10) {
            let mobileLengthMessage = "Mobile Number must be 11 digits long";
            NotificationManager.warning(mobileLengthMessage, "Click to Remove", largeTime);
            return;
        }


        if (mobileCheck.test(mobile) === false) {
            let mobileLengthMessage = "Invalid Mobile Number";
            NotificationManager.warning(mobileLengthMessage, "Click to Remove", largeTime);
            return;
        }

        if (email === "") {
            let emailMessage = "Please Provide Email Address";
            NotificationManager.warning(emailMessage, "Click to Remove", largeTime);
            return;
        }


        if (pinAuthStatus === "") {
            let pinAuthStatusMessage = "Please fill up two factor verification";
            NotificationManager.warning(pinAuthStatusMessage, "Click to Remove", largeTime);
            return;
        }

        if (checking.length === 0) {
            if (roles.length === 0) {
                let rolesMessage = "Please Select Role";
                NotificationManager.warning(rolesMessage, "Click to Remove", largeTime);
                return;
            }
        }
        const dualVerification = JSON.parse(pinAuthStatus);
        const obj = {
            id,
            userId,
            channelCode: channelName,
            name,
            mobile,
            email,
            roles: checking,
            pinAuthStatus: dualVerification,
        };

        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };
        //console.log("obj", obj);
        //alert("User Update Successful and wait for the approval");
        try {
            let update = await axios.put(userUpdate, obj, config);
            //console.log(update.data);
            //let statusCode = update.data.statusCode;
            let message = "Update Successfull";
            //alert(statusCode + " " + message);
            NotificationManager.success(message, "Success", 5000);
            // this.props.history.push('/dashboard');
            this.props.history.push('/dashboard/user-list');
        } catch (err) {
            console.log(err.response);
            let error = err.response.data;
            let statusCode = error.statusCode;
            let message = error.message;
            //alert(statusCode + ' ' + message);
            NotificationManager.error(statusCode + ' ' + message, "Error", 5000);
        }
    }

    // Back Button 
    onBack = e => {
        e.preventDefault();
        this.props.history.push('/dashboard/user-list');
    }


    render() {
        //console.log("role-list", this.state.role_list);
        // console.log("getRoles", this.state.getRoleName);
        // console.log("checking from state", this.state.checking);
        return (
            <div className="card col-sm-10 " style={{ paddingTop: "25px" }}>

                <div className="card-header divBg">

                    <h3 className="text-center pt-3">Update User</h3>

                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>

                        <ReactTooltip id="userId" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize: "15px" }}><span style={{ color: "red" }}>*</span> Provide user id (Ex. 'ABID007' or '000999' ), it's a mandatory input-field</span>
                        </ReactTooltip>
                        <ReactTooltip id="channel" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize: "15px" }}><span style={{ color: "red" }}>*</span> Please choose a channel name, it's a mandatory field</span>
                        </ReactTooltip>
                        <ReactTooltip id="userName" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize: "15px" }}><span style={{ color: "red" }}>*</span> Provide User Name, it's a mandatory input-field</span>
                        </ReactTooltip>

                        <ReactTooltip id="userEmail" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize: "15px" }}><span style={{ color: "red" }}>*</span> Provide valid email address, it's a mandatory input-field </span>
                        </ReactTooltip>
                        <ReactTooltip id="userMobile" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize: "15px" }}><span style={{ color: "red" }}>*</span> Provide valid mobile number, it's a mandatory input-field </span>
                        </ReactTooltip>
                        <ReactTooltip id="twoStep" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize: "15px" }}><span style={{ color: "red" }}>*</span> Please select any option, it's a mandatory input-field </span>
                        </ReactTooltip>
                        <ReactTooltip id="role" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                            <span style={{ fontSize: "15px" }}><span style={{ color: "red" }}>*</span> Please select any role or select multiple, it's mandatory</span>
                        </ReactTooltip>



                        {/* User ID */}
                        <div className="form-group">
                            <label htmlFor="">User Id</label>
                            <input data-tip data-for="userId" type="text" value={this.state.userId} onChange={this.onChange} className="form-control" name="userId" id="inputUserId" aria-describedby="emailHelp" placeholder="UserId" />
                        </div>

                        {/* Channel Name */}
                        <div data-tip data-for="channel" className='form-group'>
                            <label htmlFor="">Channel Name</label>
                            <select
                                className='custom-select'
                                value={this.state.channelName}
                                onChange={this.onChange}
                                name="channelName"
                            >
                                <option value='' disabled>--Select--</option>
                                <option value='ABS'>Agent Banking</option>
                                <option value='CBS'>Conventional Core Banking</option>
                                <option value='ICBS'>Islamic Core Banking</option>
                                <option value='OMNI'>Omni Channel </option>
                                <option value='EKYC'>EKYC </option>
                            </select>
                        </div>



                        {/* User Name */}

                        <div className="form-group">
                            <label htmlFor="">Name</label>
                            <input data-tip data-for="userName" type="text" value={this.state.name} onChange={this.onChange} className="form-control" name="name" id="inputUserName" aria-describedby="emailHelp" placeholder="Name" />
                        </div>



                        {/* Password

                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="text" readOnly value={this.state.password} onChange={this.onChange} className="form-control" name="password" id="inputPassword" aria-describedby="emailHelp" placeholder="Password" />
                        </div> */}


                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input data-tip data-for="userEmail" type="text" value={this.state.email} onChange={this.onChange} className="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" placeholder="Email" />
                        </div>


                        {/* Mobile */}

                        <div className="form-group">
                            <label htmlFor="">Mobile</label>
                            <input data-tip data-for="userMobile" type="text" maxLength="11" value={this.state.mobile} onChange={this.onChange} className="form-control" name="mobile" id="inputMobileNumber" aria-describedby="emailHelp" placeholder="Mobile Number" />
                        </div>


                        {/* Two factor Verification */}
                        <div data-tip data-for="twoStep" className='form-group'>
                            <label htmlFor="">Two Steps Verification</label>
                            <select
                                className='custom-select'
                                value={this.state.pinAuthStatus}
                                onChange={this.onChange}
                                name="pinAuthStatus"
                            >
                                <option value='' disabled>--Select--</option>
                                <option value="true">Yes</option>
                                <option value='false'>No</option>

                            </select>
                        </div>

                        <div data-tip data-for="role" className='form-group'>
                            <label htmlFor="">Role Selection:</label>
                            <table id='data' className="" style={{ fontSize: '14px' }}>
                                <thead className="divBg" style={{ fontWeight: "400", fontSize: "14px" }}>
                                    <tr>

                                        <th className="text-center" style={{ width: "150px" }}>Role Name</th>
                                        <th className="text-center">Privileges</th>
                                        <th>Checkbox</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderTableData()}
                                </tbody>
                            </table>
                        </div>




                        {/* Submit Button */}
                        <div className="d-flex justify-content-center" >
                            <ReactTooltip id="sub" place="top" type="warning" effect="float">
                                <span style={{ fontSize: "15px" }}> Before submit, check all the mandatory fields again</span>
                            </ReactTooltip>


                            <button onClick={() => this.props.history.push('/dashboard/user-list')} className="b mr-2" style={{ border: "none" }} ><i class="fas fa-edit"></i> Back</button>
                            <button data-tip data-for="sub" className="b" type="submit" style={{ border: "none" }} >Submit</button>

                        </div>

                    </form>
                </div>



            </div>
        )
    }
}

export default withRouter(UpdateUser);
