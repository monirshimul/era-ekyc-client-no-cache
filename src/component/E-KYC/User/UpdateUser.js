import React, { Component } from 'react';
import '../../E-KYC/Simplified/utils/Common.css';
import { withRouter } from 'react-router-dom';
import { getupdateUser, getRoleWithFilter,userUpdate } from '../Url/ApiList';
import axios from 'axios';

class UpdateUser extends Component {

    state = {
        id:"",
        userId: '',
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
    //    console.log(this.props.location.state);
        let getId = this.props.location.state;
        this.setState({id: getId});
        let arr = [];
        //Update user api
        const obj = { userId: this.props.location.state };
        const actRole = { status: "A" };
        // 
        try {
            let updata = await axios.post(getupdateUser + 1, obj);
            const prefillData = updata.data.data;
        //    console.log("prefilled", prefillData);
            this.setState({
                userId: prefillData[0].userId,
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
            this.setState({checking: arr});

        } catch (err) {
            //console.log(err.response);
        }
        //getRolewithFilter

        try {
            let listRoles = await axios.post(getRoleWithFilter + 1, actRole);

            //listRoles data get from API
            let filterRoles = listRoles.data.data.data;
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

        } catch (err) {
            console.log(err.response);
        }



    }

    ///checkbox

    onAddingItem = (id) => (item) => {
        const isChecked = item.target.checked;
        const value = item.target.value;
        let idValue = id;

        if (isChecked === false) {
            console.log("false");
            try {
                let r = this.state.checking.filter(repo => repo !== idValue);

                console.log("false inside", r);
                this.setState({ checking: r });
            } catch (err) {

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

                    <td>{roleName}</td>
                    <td>
                        {rolePrivileges.map((val, i) => (
                            rolePrivileges[i][1] + " ,"
                        ))
                        }
                    </td>


                    <td>
                        <div >
                            <input type="checkbox" id="myCheckbox" name="role_checkbox" defaultChecked={role.isAdded} value={role.id || ''} onChange={this.onAddingItem(role.id)} />
                            {/* <label class="checkbox-checked" > &nbsp;{role.roleName}</label> */}

                        </div>
                    </td>
                </tr>
            )
        })
    }








    //Handle Submit for Submit button
    handleSubmit =async(e)  => {
        e.preventDefault();
        const { id,userId, name, mobile, email, pinAuthStatus, checking,roles } = this.state;

        if (userId === "") {
            alert("Please Provide your User ID");
            return;
        }

        if (name === "") {
            alert("Please Provide your Name");
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
      

        const obj = {
            id: parseInt(id),
            userId,
            name,
            mobile,
            email,
            roles: checking,
            pinAuthStatus: JSON.parse(pinAuthStatus),
        };
        console.log("obj", obj);
        //alert("User Update Successful and wait for the approval");
        try{
        let update = await axios.put(userUpdate, obj);
         console.log(update.data);
         let statusCode = update.data.statusCode;
         let message ="Update Completed"
         alert(statusCode + " " + message);
         this.props.history.push('/dashboard');
        }catch(err){
         console.log(err.response);
         let error = err.response.data;
         let statusCode = error.statusCode;
         let message = error.message;
         alert(statusCode + ' ' + message);
        }
    }


    render() {
        //console.log("role-list", this.state.role_list);
        // console.log("getRoles", this.state.getRoleName);
       // console.log("checking from state", this.state.checking);
        return (
            <div className="card col-sm-7 " style={{ paddingTop: "25px" }}>

                <div className="card-header divBg">

                    <h3 className="text-center pt-3">Update User</h3>

                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>



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



                        {/* Password

                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="text" readOnly value={this.state.password} onChange={this.onChange} className="form-control" name="password" id="inputPassword" aria-describedby="emailHelp" placeholder="Password" />
                        </div> */}


                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="text" value={this.state.email} onChange={this.onChange} className="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" placeholder="Email" />
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

export default withRouter(UpdateUser);
