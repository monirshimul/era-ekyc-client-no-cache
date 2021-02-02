import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import axios from 'axios'
import Loading from '../utils/CustomLoding/Loading'
import { faceValidate } from '../../Url/ApiList';
import Face from "../images/face.svg";
import Done from "../images/done.svg";
import Camera from "../Liveness/Camera";
//import { formatDate } from "./utils/DateFormat";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../utils/Common.css";
import { largeTime } from "../../../Utils/notificationTime";


export class CaptureImage extends Component {


  validate = async (e) => {
    const { values } = this.props;
    
    e.preventDefault();
    // this.setState({
    //   loading: !this.state.loading
    // })
    this.props.handleState("loading", true);

    const token = {
      headers: {
        'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
      }

    };

    try {
      // let nidf = JSON.parse(localStorage.getItem('NidImages'))
      //console.log("nidF",nidf.NidFront)   
      let imgData = {
        photo: values.faceImage,
        nidFront: values.ecImage
      }

      let resValidation = await axios.post(faceValidate, imgData, token);
      console.log(resValidation);
      //console.log("resValidation", resValidation.data.data.faceVerificationResult)
      console.log("ver-token", resValidation.data.data.verificationToken)
      // if (resValidation.data.data.faceVerificationResult.status) {

      // }

      if (resValidation.data.data.faceVerificationResult.status === true) {

        this.props.handleState("validate", resValidation.data.data.faceVerificationResult.status);
        this.props.handleState("loading", false);
        this.props.handleState("verifyToken", resValidation.data.data.verificationToken);

        //sessionStorage.setItem('x-verification-token', JSON.stringify(values.verifyToken))

        NotificationManager.success("Face Validated", "Success", 5000);
      }
      if (resValidation.data.data.faceVerificationResult.status === false) {
        // this.setState({
        //   loading: false
        // })
        this.props.handleState("loading",false);
        NotificationManager.error("Face does not match", "Error", 5000);
      }


    } catch (error) {
      if (error.response) {
        let message = error.response.data.message
        //console.log("Error",error.response)
        NotificationManager.error(message, "Error", 5000);
    } else if (error.request) {
        //console.log("Error Connecting...", error.request)
        NotificationManager.error("Error Connecting...", "Error", 5000);
    } else if (error) {
        NotificationManager.error(error.toString(), "Error", 5000);
    }

    }


  }






  continue = (e) => {
    const { values } = this.props;
    e.preventDefault();
    if(values.faceImage ===  ""){
      NotificationManager.error("Please Click Liveness again for Liveness Detection", "Click TO Remove", largeTime);
      return;
    }
    this.closeCamera();
    this.props.nextStep();
  };

  back = (e) => {
   // const { values } = this.props;
    e.preventDefault();
    this.closeCamera();
    this.props.prevStep();
  };

  onImageConfirm = (base64Image) => {
    //console.log("In image confirm");
    //console.log(base64Image);
    //this.setState({faceImage: base64Image, imageFlag: true});
    this.props.handleState("faceImage", base64Image);
    this.props.handleState("imageFlag", true);
    this.closeCamera();
  };

  // showCamera = () => this.props.handleState("showCamera", true);
  showCamera = () => {
    this.props.handleState("validate", false);
    this.props.handleState("faceImage", "");
    this.props.handleState("showCamera", true);
    };


  closeCamera = () => this.props.handleState("showCamera", false);

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { values } = this.props;

    return (
      <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="imTwoWhite col-sm-8" style={{ paddingTop: "25px" }}>
          <div className="card-header up">
            <h3><i class="fas fa-camera-retro"></i> Face Verification</h3>
          </div>
          <div className="row card-body d-flex justify-content-center align-items-center" >
            <div className="imTwoWhite col-sm-6" >
              {/* {imageFlag ? ( */}
              <div className="animated zoomIn">
                <img
                  src={Face}
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "300px",
                    height: "200px",
                  }}
                  value={values.faceImage}
                  className=" img-thumbnail center "
                  id="imagePicture"
                  alt="cameraPicture"
                />

                <div className="im"
                  style={{ width: "300px", color: "green", textAlign: "center", margin: "0 auto", marginBottom: "10px" }}
                  data-toggle="modal"
                  data-target="#cameraModal"
                  onClick={this.showCamera}
                >
                  <i class="fas fa-camera"></i> Check Liveness
          </div>
              </div>


            </div>

            <div className="col-sm-6" >

              {
                values.faceImage ? (
                  <div className="row imTwoWhite d-flex justify-content-center ">
                    {
                      values.loading ? (
                        // <div className="animated slideInDown d-flex justify-content-center align-items-center" style={{height:"250px"}}>
                        //   <h1 className="text-muted text-center">Loading...</h1>

                        // </div>
                        <div className="row d-flex justify-content-center align-items-center mt-3">
                          <Loading />
                        </div>
                      ) : (
                          <div>
                            {
                              values.validate === true ? (
                                <div className="animated slideInDown">
                                  <img
                                    src={Done}
                                    style={{
                                      display: "block",
                                      marginLeft: "auto",
                                      marginRight: "auto",
                                      width: "300px",
                                      height: "200px",
                                    }}
                                    value={values.faceImage}
                                    className=" img-thumbnail center"
                                    id="imagePicture"
                                    alt="cameraPicture"
                                  />
                                  <div className="im"
                                    style={{ width: "300px", color: "green", textAlign: "center", margin: "0 auto", marginBottom: "10px" }}

                                  >
                                    <i class="fas fa-user-check"></i> Success, Click Next
                          </div>
                                </div>
                              ) : (
                                  <div className="animated zoomIn">
                                    <img
                                      src={values.flag + values.faceImage}
                                      style={{
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        width: "300px",
                                        height: "200px",

                                      }}
                                      value={values.faceImage}
                                      className=" img-thumbnail center"
                                      id="imagePicture"
                                      alt="cameraPicture"
                                    />
                                    <div className="im"
                                      style={{ width: "300px", color: "green", textAlign: "center", margin: "0 auto", marginBottom: "10px" }}
                                      onClick={this.validate}
                                    >
                                      <i class="fas fa-user-check"></i> Check Validation
                          </div>
                                  </div>

                                )
                            }
                          </div>

                        )
                    }



                  </div>
                ) : (
                    <p className="text-muted" style={{ fontSize: "14px" }}>
                      <span style={{ color: "green", fontSize: "20px" }}>A facial recognition</span> system is a technology capable of identifying or verifying a person from a digital image or a video frame from a video source.<hr /> <span style={{ color: "green", fontSize: "20px" }}>Face verification</span> is the task of comparing a candidate face to another, and verifying whether it is a match. It is a one-to-one mapping: you have to check if this person is the correct one.
                    </p>
                  )
              }




            </div>
          </div>


          <div
            className="card-footer d-flex justify-content-center mt-2"
            style={{ background: "#fff" }}
          >

            <span className="b mr-5" onClick={this.back}>Back</span>
            {
              values.verifyToken ? (
                <span className="b" onClick={this.continue}>Next</span>
              ):""
            }
            
            {/* <span className="b" onClick={this.continue}>Next</span> */}




          </div>
        </div>



        {/* modal for image */}
        <div
          className="modal fade "
          id="cameraModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="cameraModalLabel"
          aria-hidden="true"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div className="modal-dialog mw-100 w-75" role="document">
            <div className="modal-content">
              <div className="modal-header divBg">
                <h5 className="modal-title" id="cameraModalLabel">

                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.closeCamera}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.showCamera ? (
                  <Camera onConfirm={this.onImageConfirm} />
                ) : (
                    ""
                  )}
              </div>
            </div>
          </div>
        </div>
        {/* modal for image */}



        {/* End Content*/}
      </div>
    </div>
    );
  }
}

export default CaptureImage;
