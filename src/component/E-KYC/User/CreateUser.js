import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
// import './CreateUser.css';
import '../../E-KYC/Simplified/utils/Common.css';
import '../CSS/table.css';
import { getRoleWithFilter, createUserWithRole } from '../Url/ApiList';
import { convertNumber } from '../../Utils/StrToNum';

import axios from 'axios';

class CreateUser extends Component {
    state = {
        userId: '',
        name: '',
        password: '',
        mobile: '',
        email: '',
        approved_by: '',
        approve_date: '',
        created_by: '',
        created_date: '',
        role_list: [],
        roles: [],
        features: [],
        page:1,
        pinAuthStatus: ""
    }


    async componentDidMount() {
        const {page} = this.state;
        const roleObj = { status: "A" }
        try {
            let listRoles = await axios.post(getRoleWithFilter, roleObj);
            
            //listRoles data get from API
            let filterRoles = listRoles.data.data;
            console.log("filterroles ", filterRoles);
            //Create an array filter data for filter id and roleName key from each object get from API
            let filterData = Object.assign([], this.state.role_list);
            //Filter id and roleName from listRoles API
            const filteredKeys = ['id', 'roleName', "rolePrivileges"];
            //map filterRoles for Filter data [id, roleName] keys
            filterRoles.map((val, i) => {
                const filtered = filteredKeys.reduce((obj, key) => ({ ...obj, [key]: filterRoles[i][key] }), {});
                //console.log("after filter", filtered);
                filtered['isAdded'] = false;
               // console.log("isAdded add", filtered);
                filterData.push(filtered);
            });
          

            this.setState({ role_list: filterData });
    
            //  console.log(this.state.role_list[0].rolePrivileges[0][1]); 

        } catch (err) {
            console.log(err.response);
        }
    }




    //State change when typing in the field
    onChange = e => this.setState({ [e.target.name]: e.target.value });


    onAddingItem = (item) => {
        const isChecked = item.target.checked;
        const value = item.target.value;

        this.setState(prevState => ({ role_list: prevState.role_list.map(roll => roll.roleName === value ? { ...roll, isAdded: isChecked } : roll) }));

        if (isChecked)
            this.setState(prevState => ({ roles: [...prevState.roles, value] }));
        else {
            const newAddedroles = this.state.roles.filter(roll => roll !== value)
            
            this.setState({ roles: newAddedroles });
        }
    }

    // OnSubmit for Submit button
    onSubmit = async (e) => {
        e.preventDefault();
        const { userId, name, password, mobile, email, roles, pinAuthStatus } = this.state;

        if (userId === "") {
            alert("Please Provide your User ID");
            return;
        }

        if (name === "") {
            alert("Please Provide your Name");
            return;
        }

        if (password === "") {
            alert("Please Provide your Password");
            return;
        }

        if (mobile === "") {
            alert("Please Provide your Mobile");
            return;
        }

        if (email === "") {
            alert("Please Provide your Email");
            return;
        }

        if (pinAuthStatus === "") {
            alert("please fill up two factor verification");
            return;
        }
        if(roles.length === 0){
            alert("Please select Role Selection");
            return;
        }
        const myrole = convertNumber(roles);
        //const dualVerification = JSON.parse(pinAuthStatus);

        const obj = {
            userId,
            name,
            password,
            mobile,
            email,
            roles: myrole,
            pinAuthStatus: JSON.parse(pinAuthStatus)

        }

        if (pinAuthStatus === "") {
            alert("Please fill up two factor verification field");
        }

        console.log("CreateObj", obj);
        try {
            let createUser = await axios.post(createUserWithRole, obj);
            console.log(createUser.data);
            let succ = createUser.data.statusCode;
            let suc_message = createUser.data.message;
            alert(succ + "  " + suc_message);
            this.props.history.push('/dashboard');
            
            
             
        } catch (err) {
           // console.log(err.response.data);
            let error = err.response.data;
            let errorStatus = error.statusCode;
            let errorMessage = error.message;
            
            alert(errorStatus + " " + errorMessage );
            window.location.reload(true);

        }


        //alert("User created Successful and wait for the approval");

        this.setState({
            userId: '',
            name: '',
            password: '',
            mobile: '',
            email: '',
            pinAuthStatus: ''
        })
    }

    renderTableData() {
        return this.state.role_list.map((role, index) => {
            const { id, roleName, rolePrivileges } = role //destructuring
            return (
                <tr key={id}>
                    
                    <td>{roleName}</td>
                    <td>
                    {rolePrivileges.map((val, i) => (
                       rolePrivileges[i][1] + " ,"
                    ))
                    }
                        </td>
                        
                    
                    <td>
                        <div >
                            <input type="checkbox" id="myCheckbox" name="role_checkbox" checked={role.isChecked} value={(role.id)} onChange={this.onAddingItem} />
                            <label > &nbsp;{role.roleName}</label>

                        </div>
                    </td>
                </tr>
            )
        })
    }


    onRefresh = () =>{
        window.location.reload(true);
    }

    render() {
        return (
            <div className="card col-sm-7 " style={{ paddingTop: "25px" }}>

                <div className="card-header divBg">

                    <h3 className="text-center pt-3">Create User</h3>

                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>

                        {/* User ID */}
                        <div className="form-group">
                            <label htmlFor="">User Id</label>
                            <input type="text" value={this.state.userId} onChange={this.onChange} className="form-control" name="userId" id="inputUserId" aria-describedby="emailHelp" placeholder="UserId" />
                        </div>


                        {/* User Name */}
                        <div className="form-group">
                            <label htmlFor="">Name</label>
                            <input type="text" value={this.state.name} onChange={this.onChange} className="form-control" name="name" id="inputUserName" aria-describedby="emailHelp" placeholder="Name" />
                        </div>


                        {/* Password */}
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="password" value={this.state.password} onChange={this.onChange} className="form-control" name="password" id="inputPassword" aria-describedby="emailHelp" placeholder="Password" />
                        </div>


                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="email" value={this.state.email} onChange={this.onChange} className="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" placeholder="Email" />
                        </div>


                        {/* Mobile */}
                        <div className="form-group">
                            <label htmlFor="">Mobile</label>
                            <input type="text" value={this.state.mobile} onChange={this.onChange} className="form-control" name="mobile" id="inputMobileNumber" aria-describedby="emailHelp" placeholder="Mobile Number" />
                        </div>

                        {/* Two factor Verification */}
                        <div className='form-group'>
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

                        {/* Checkbox testing
                        <div>
                        <label htmlFor="">Role Selection</label>
                        {this.state.role_list.map((list, index) => (
                            <div key={index}>
                                <input type="checkbox" id="myCheckbox" name="role_checkbox"  checked={list.isChecked} value={(list.id)} onChange={this.onAddingItem} />
                                <label > &nbsp;{list.roleName}</label>

                            </div>
                        ))
                        }
                        </div> */}

                        {/* Table for Selected Role */}

                        <div className='form-group'>
                        <label htmlFor="">Role Selection:</label>
                        <table id='data' style={{ fontSize: '11pt' }}>
                            <thead>
                                <tr>
                                  
                                    <th>Role Name</th>
                                    <th>Privileges</th>
                                    <th>Checkbox</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>

                        {/* Roles Added show */}
                        {/* <div style={{ marginTop: "20px" }}>Selected: {this.state.roles.join(', ')}</div> */}
                        <br></br> <br></br>
                        {/* Submit Button */}
                        <div className="d-flex justify-content-center" >

                            <button className="b" type="submit" style={{ border: "none" }} >Submit</button>

                        </div>

                    </form>

                   
                </div>



            </div>



        )
    }
}

export default withRouter(CreateUser);
