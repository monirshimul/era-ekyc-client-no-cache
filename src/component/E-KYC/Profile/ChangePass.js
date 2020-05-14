import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../E-KYC/Simplified/utils/Common.css';
import axios from 'axios';
import {changePassword} from '../Url/ApiList';


class ChangePass extends Component {
    state ={
        oldPassword :'',
        newPassword :'',
        confirmPassword:''
    }


    onChange = e => this.setState({[e.target.name]: e.target.value});

    handleSubmit = async(e) =>{
        e.preventDefault();

        const {oldPassword, newPassword, confirmPassword} = this.state;



        if(oldPassword === ''){
            alert("Please Provide Old Password");
            return;
        }

        if(newPassword === ''){
            alert("Please Provide New Password");
            return;
        }

        if(confirmPassword === ''){
            alert("Please Provide Confirm Password");
            return;
        }

        if(confirmPassword !== newPassword ){
            alert("Confirm Password and New Password are not same");
            return;
        }


        const obj={
            oldPassword,
            newPassword
        }

        console.log(obj);

        //Header set
        const config =  {
            headers: {
            'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            } 
         };


        try{
            console.log("token", sessionStorage.getItem('x-auth-token'));
            let passChange = await axios.post(changePassword,obj, config  );
                // {
                // headers: {
                //           'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
                //         } 
                //        } 
               
            console.log("Api Status",passChange.data);
            let statusCode = passChange.data.statusCode;
            let message = "Change Password Completed";
            alert(statusCode+ " "+ message);
            //Session Storage clear
            sessionStorage.clear();
            this.props.history.push('/');
            window.location.reload(true);
            
            // axios({
            //     method: 'post', //you can set what request you want to be
            //    // url: `http://127.0.0.1:3001/profile/change-password`,
            //    url: changePassword,
            //     data: obj,
            //     headers: {
            //       'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            //     }
            //   })
           
            console.log("passChange", passChange.data);
        }catch(err){
            console.log(err.response.data);
            let error = err.response.data;
            let statusCode = error.statusCode;
            let errorMessage = error.reason;
            alert(statusCode+ '  '+ errorMessage);
        }
    
    }


    render() {
        return (
            <div className="card col-sm-7" style={{ paddingTop: "25px" }}>

                <div className="card-header divBg">

                    <h3 className="text-center pt-3">Change Password</h3>

                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>

                      {/* Old Password */}
                      <div className="form-group">
                            <label htmlFor="">Old Password</label>
                            <input type="text" value={this.state.oldPassword} onChange={this.onChange} className="form-control" name="oldPassword" id="inputUserId" aria-describedby="emailHelp" placeholder="Old Password" />
                        </div>


                     {/* New Password */}
                     <div className="form-group">
                            <label htmlFor="">New Password</label>
                            <input type="text" value={this.state.newPassword} onChange={this.onChange} className="form-control" name="newPassword" id="inputUserId" aria-describedby="emailHelp" placeholder="New Password" />
                        </div>



                     {/* Old Password */}
                     <div className="form-group">
                            <label htmlFor="">Confirm Password</label>
                            <input type="text" value={this.state.confirmPassword} onChange={this.onChange} className="form-control" name="confirmPassword" id="inputUserId" aria-describedby="emailHelp" placeholder="Confirm Password" />
                        </div>
                    
                     

                        <div className="d-flex justify-content-center" >

                            <button className="b" type="submit" style={{ border: "none" }} >Submit</button>

                        </div>

                    </form>
                </div>



            </div>



        )
    }
}

export default withRouter(ChangePass);
