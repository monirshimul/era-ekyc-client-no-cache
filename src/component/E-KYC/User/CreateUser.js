import React, { Component } from 'react';
import '../../E-KYC/Simplified/utils/Common.css';

class CreateUser extends Component {
    state = {
        user_id: '',
        user_name: '',
        password: '',
        mobile: '',
        email: '',
        approved_by: '',
        approve_date: '',
        created_by: '',
        created_date: ''
    }

    //State change when typing in the field
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    // OnSubmit for Submit button
    onSubmit = e => {
        e.preventDefault();
        const { user_id, user_name, password, mobile, email, created_by, created_date, approve_date, approved_by } = this.state;

        const obj = {
            user_id,
            user_name,
            password,
            mobile,
            email,

        }

        //console.log(obj);

        alert("User created Successful and wait for the approval");

        this.setState({
            user_id: '',
            user_name: '',
            password: '',
            mobile: '',
            email: '',

        })

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
                            <input type="text" value={this.state.user_id} onChange={this.onChange} className="form-control" name="user_id" id="inputUserId" aria-describedby="emailHelp" placeholder="UserId" />
                        </div>


                        {/* User Name */}
                        <div className="form-group">
                            <label htmlFor="">UserName</label>
                            <input type="text" value={this.state.user_name} onChange={this.onChange} className="form-control" name="user_name" id="inputUserName" aria-describedby="emailHelp" placeholder="UserName" />
                        </div>


                        {/* Password */}
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="text" value={this.state.password} onChange={this.onChange} className="form-control" name="password" id="inputPassword" aria-describedby="emailHelp" placeholder="Password" />
                        </div>


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

export default CreateUser;
