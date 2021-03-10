import React, { Component } from 'react';
import Capture from '../Capture/Capture';
import Button from '@material-ui/core/Button';
import { NotificationManager } from "react-notifications";
import axios from 'axios'
import Loading from '../utils/CustomLoding/Loading'
import { faceValidate } from '../../Url/ApiList';
import Face from "../images/face.svg";
// import Done from "../images/done.svg";
import "react-datepicker/dist/react-datepicker.css";
import "../utils/Common.css";
import { largeTime } from "../../../Utils/notificationTime";

export class SimCapture extends Component {
  state = {
    cameraOn: false,
    faceCompareRes: false
  }


  captureOn = () => {
    this.setState({
      cameraOn: true
    })
  }

  captureOff = () => {
    this.setState({
      cameraOn: false
    })
  }

  onImageConfirm = (base64Image) => {

    this.props.handleState("faceImage", base64Image);
    this.captureOff();
  }

  FaceCompare = async (e) => {
    e.preventDefault();
    let { values } = this.props;
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
      // console.log("resValidation", resValidation.data.data)
      //  console.log("ver-token", resValidation.data.data.verificationToken);
      //  console.log("validate", values.validate);


      if (resValidation.data.data.faceVerificationResult.status === true) {
        this.setState({ faceCompareRes: true });
        this.props.handleState("validate", resValidation.data.data.faceVerificationResult.status);
        this.props.handleState("loading", false);
        this.props.handleState("verifyToken", resValidation.data.data.verificationToken);

        //sessionStorage.setItem('x-verification-token', JSON.stringify(values.verifyToken))

        NotificationManager.success("Face Validated", "Success", 5000);
      }
      if (resValidation.data.data.faceVerificationResult.status === false) {
        this.setState({ faceCompareRes: false });
        this.props.handleState("loading", false);
        NotificationManager.error("Face does not match", "ClickToRemove", largeTime);
      }


    } catch (error) {
      this.props.handleState("loading", false);
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
    e.preventDefault();
    this.props.nextStep();
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  // escape = () => {
  //   this.props.nextStep();
  // }


  render() {
    const { values } = this.props;
    return (
      <div className="container">
        {/* 
            <div className="im col-sm-2" onClick={this.Escape}>
              Escape
            </div>
            */}
        <div className="row d-flex justify-content-center">
          <div className="imTwoWhite col-sm-10" style={{ paddingTop: "25px" }}>
            <div className="card-header im">
              <h5 style={{ color: "green" }}><i class="fas fa-camera-retro"></i> Face Verification</h5>
              {/* <button onClick={this.escape}>Escape</button>*/}

            </div>
            <div className="row card-body d-flex justify-content-center align-items-center" >
              <div className="imTwoWhite col-sm-6" >
                {/* {imageFlag ? ( */}
                <div className="animated zoomIn">
                  <img

                    src={values.ecImage ? (values.flag + values.ecImage) : Face}
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "280px",
                      height: "200px",
                    }}
                    value={values.ecImage}
                    className=" img-thumbnail center "
                    id="imagePicture"
                    alt="cameraPicture"
                  />

                  <div className="text-center mt-2">
                    <Button
                      data-toggle="modal"
                      data-target="#cameraModal"
                      onClick={this.captureOn}
                      className="im"
                      variant="contained"
                      style={{ color: "green", outline: "none", borderRadius: "10px" }}>Take Photo</Button>
                  </div>
                </div>


              </div>

              {
                values.faceImage ? (
                  <div className="imTwoWhite col-sm-6" >
                    {/* {imageFlag ? ( */}
                    <div className="animated zoomIn">
                      <img

                        src={values.faceImage ? (values.flag + values.faceImage) : Face}
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                          width: "280px",
                          height: "200px",
                        }}
                        value={values.faceImage}
                        className=" img-thumbnail center "
                        id="imagePicture"
                        alt="cameraPicture"
                      />

                      <div className="text-center mt-2">
                        <Button
                          className="im"
                          variant="contained"
                          onClick={this.FaceCompare}
                          style={{ color: "green", outline: "none", borderRadius: "10px" }}>Compare Face</Button>
                      </div>


                    </div>


                  </div>
                ) : ""
              }

            </div>

            {
              values.loading ? (
                <div className="text-center">
                  <Loading />
                </div>
              ) : ""
            }


            <div
              className="card-footer d-flex justify-content-center mt-2"
              style={{ background: "#fff" }}
            >

              <span className="b mr-5" onClick={this.back} >Back</span>
              {
                values.validate === true ? (
                  <span className="b" onClick={this.continue} >Next</span>
                ) : ""
              }
              {/*<span className="b" onClick={this.continue}>Next</span>*/}





            </div>
          </div>



          {/* modal for image */}
          <div class="modal fade " id="cameraModal" tabindex="-1" role="dialog" aria-labelledby="cameraModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog mw-100 w-75" role="document">
              <div class="modal-content">
                <div class="modal-header divBg">
                  <h5 class="modal-title" id="cameraModalLabel">Capture Your Image</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.captureOff}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  {this.state.cameraOn ? <Capture onConfirm={this.onImageConfirm} /> : ""}
                </div>
              </div>
            </div>
          </div>
          {/* modal for image */}



          {/* End Content*/}
        </div>
      </div>
    )
  }
}

export default SimCapture;
