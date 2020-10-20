import React, { Component } from 'react';
import { mobileVerification, mobileCodeVerification } from '../../Url/ApiList';
import Loading from '../utils/CustomLoding/Loading';
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { largeTime } from './../../../Utils/notificationTime';
const Joi = require('@hapi/joi');

export class MobileVerification extends Component {

  state = {
    mobileVerifyToken: '',
    status: '',
    loadingSpin: false
  }

  numberSchema = Joi.object({
    MobileNumber: Joi.string().pattern(new RegExp('^01[3456789][0-9]{8}'))
      .required()
      .messages({
        "string.pattern.base": `Please Provide Valid Mobile Number`,
      }),

  })

  codeSchema = Joi.object({
    VerificationCode: Joi.string().min(6).required()
  })



  sendOtp = async (e) => {
    const { values } = this.props;
    e.preventDefault();

    let config = {
      headers: {
        'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
      }
    };

    let data1 = {
      MobileNumber: values.verificationMobile
    }

    try {
      let validationValue1 = await this.numberSchema.validateAsync(data1);
      const mobileObj = { mobile: values.verificationMobile };
      this.setState({ loadingSpin: true })
      let apiReq = await axios.post(mobileVerification, mobileObj, config);
      // console.log("apiRequestforOTP", apiReq.data.data.convalToken);
      this.setState({ mobileVerifyToken: apiReq.data.data.convalToken, loadingSpin: false })
    } catch (error) {
      this.setState({ loadingSpin: false });
      if (error.response) {
        let message = error.response.data.message
        //console.log("Error",error.response)
        NotificationManager.error(message, "Error", 5000);
      } else if (error.request) {
        // console.log("Error Connecting...", error.request)
        NotificationManager.error("Error Connecting...", "Error", 5000);
      } else if (error) {
        NotificationManager.error(error.toString(), "Click to Remove", largeTime);
      }
    }

  }

  verifyCode = async (e) => {
    const { values } = this.props;
    e.preventDefault();

    let config = {
      headers: {
        'x-conval-token': this.state.mobileVerifyToken,
        'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
      }
    };

    let data2 = {
      VerificationCode: values.verificationCodeMobile
    }

    try {
      let validationValue2 = await this.codeSchema.validateAsync(data2);
      const otpObj = { otp: values.verificationCodeMobile };
      // this.setState({ loadingSpin: true })
      let apiCodeReq = await axios.post(mobileCodeVerification, otpObj, config);
      console.log("apiRequestforOTP", apiCodeReq.data);
      // this.setState({ mobileVerifyToken: apiReq.data.data.convalToken, loadingSpin: false })
    } catch (error) {
      this.setState({ loadingSpin: false });
      if (error.response) {
        let message = error.response.data.message
        //console.log("Error",error.response)
        NotificationManager.error(message, "Error", 5000);
      } else if (error.request) {
        // console.log("Error Connecting...", error.request)
        NotificationManager.error("Error Connecting...", "Error", 5000);
      } else if (error) {
        NotificationManager.error(error.toString(), "Click to Remove", largeTime);
      }
    }

  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <div className='container'>
        <div className="row d-flex justify-content-center">

          <div className="divBg col-sm-6 pt-3">
            <h4>Mobile Number Verification</h4>
          </div>
        </div>

        <div className='row d-flex justify-content-center '>


          <div className="col-sm-6 imTwoWhite d-flex justify-content-around" >


            <form className="col">
              <div className="form-group">
                <label htmlFor="">Mobile Number</label>
                <input type="text" value={values.verificationMobile} maxLength="11" name="verificationMobile" onChange={handleChange('verificationMobile')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>


            </form>

            <div className="" style={{ marginTop: "35px" }}>
              <button onClick={this.sendOtp} className="b">Send OTP</button>
            </div>




          </div>


        </div>

        <br />

        {this.state.loadingSpin === true ?
          <div className="row d-flex justify-content-center align-items-center mt-3">
            <Loading />
          </div>
          :
          ""

        }

        {this.state.mobileVerifyToken !== '' ?
          <div className='row d-flex justify-content-center mt-5'>


            <div className="col-sm-6 imTwoWhite d-flex justify-content-around" >


              <form className="col">
                <div className="form-group">
                  <label htmlFor="">OTP Code </label>
                  <input type="text" value={values.mobileCodeVerification} maxLength="6" name="verificationCodeMobile" onChange={handleChange('verificationCodeMobile')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>


              </form>

              <div className="" style={{ marginTop: "35px" }}>
                <button className="b" onClick={this.verifyCode}>Verify</button>
              </div>




            </div>


          </div>


          :
          ""

        }




      </div>
    )
  }
}

export default MobileVerification;
