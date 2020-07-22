import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../E-KYC/Simplified/utils/Common.css';
import axios from 'axios';
import {changePassword} from '../Url/ApiList';
import { NotificationManager } from "react-notifications";


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

        let regex= new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');


        if(oldPassword === ''){
            let msg1= "Please Provide Old Password";
            NotificationManager.warning(msg1, "Warning", 5000);
            return;
        }

        if(oldPassword.length < 8){
            let passlenMessage = " Old Password length minimum 8 characters";
            NotificationManager.warning(passlenMessage, "Warning", 5000);
            return;
        }

        if(regex.exec(oldPassword) === null){
            let passRegMessage = "Old Password must have capital letter, special character and digits";
            NotificationManager.warning(passRegMessage, "Warning", 5000);
            return;
        }


        if(newPassword === ''){
            let msg2="Please Provide New Password";
            NotificationManager.warning(msg2, "Warning", 5000);
            return;
        }

        if(newPassword.length < 8){
            let passlenMessage = "New Password length minimum 8 characters";
            NotificationManager.warning(passlenMessage, "Warning", 5000);
            return;
        }

        if(regex.exec(newPassword) === null){
            let passRegMessage = "New Password must have capital letter, special character and digits";
            NotificationManager.warning(passRegMessage, "Warning", 5000);
            return;
        }

        if(confirmPassword === ''){
            let msg3 ="Please Provide Confirm Password";
            NotificationManager.warning(msg3, "Warning", 5000);
            return;
        }

        if(confirmPassword.length < 8){
            let passlenMessage = "Confirm Password length minimum 8 characters";
            NotificationManager.warning(passlenMessage, "Warning", 5000);
            return;
        }

        if(regex.exec(confirmPassword) === null){
            let passRegMessage = "Confirm Password must have capital letter, special character and digits";
            NotificationManager.warning(passRegMessage, "Warning", 5000);
            return;
        }

        if(confirmPassword !== newPassword ){
            let msg4="Confirm Password and New Password are not same";
            NotificationManager.warning(msg4, "Warning", 5000);
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
           // console.log("token", sessionStorage.getItem('x-auth-token'));
            let passChange = await axios.post(changePassword,obj, config  );
                // {
                // headers: {
                //           'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
                //         } 
                //        } 
               
           // console.log("Api Status",passChange.data);
            let statusCode = passChange.data.statusCode;
            let message = "Password Change Completed";
            // alert(statusCode+ " "+ message);
            NotificationManager.success(statusCode+" "+ message, "Success", 5000);
            //Session Storage clear
            sessionStorage.clear();
            localStorage.clear();
            this.props.history.push('/');
            //window.location.reload(true);
            
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
        }catch(error){
            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
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
                            <input type="password" value={this.state.oldPassword} onChange={this.onChange} className="form-control" name="oldPassword" id="inputUserId" aria-describedby="emailHelp" placeholder="Old Password" />
                        </div>


                     {/* New Password */}
                     <div className="form-group">
                            <label htmlFor="">New Password</label>
                            <input type="password" value={this.state.newPassword} onChange={this.onChange} className="form-control" name="newPassword" id="inputUserId" aria-describedby="emailHelp" placeholder="New Password" />
                        </div>



                     {/* Old Password */}
                     <div className="form-group">
                            <label htmlFor="">Confirm Password</label>
                            <input type="password" value={this.state.confirmPassword} onChange={this.onChange} className="form-control" name="confirmPassword" id="inputUserId" aria-describedby="emailHelp" placeholder="Confirm Password" />
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
