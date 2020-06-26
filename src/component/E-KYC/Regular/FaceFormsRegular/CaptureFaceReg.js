import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import "../../Simplified/utils/Common.css";
import axios from 'axios'
import Loading from '../../Simplified/utils/CustomLoding/Loading'
import { faceValidate } from '../../Url/ApiList'
import Camera from '../../Simplified/Liveness/Camera';
import Face from "../../Simplified/images/face.svg";
import Done from "../../Simplified/images/done.svg";
import buffer from "../../Simplified/images/loading.svg";
import { withRouter } from 'react-router-dom';
import { image } from '../../Simplified/images/images';

export class CaptureFace extends Component {
  state = {
    faceImage: '',
    imageFlag: false,
    showCamera: false,
    validate: false,
    loading: false,
    verifyToken: '',
    flag: 'data:image/jpeg;base64,'
  }


  componentDidMount() {
    if ('CaptureFace' in localStorage) {
      let data = JSON.parse(localStorage.getItem('CaptureFace'));

      // console.log(data);
      this.setState({
        faceImage: data.faceImage,
      });
    }
  }

  validate = async (e) => {
    e.preventDefault();

    this.setState({
      loading: !this.state.loading
    })

    const token = {
      headers: {
        'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
      }

    };

    try {
      let nidf = JSON.parse(localStorage.getItem('NidImages'))
      //console.log("nidF",nidf.NidFront)   
      let imgData = {
        photo: this.state.faceImage,
        nidFront: nidf.NidFront
      }

      let resValidation = await axios.post(faceValidate, imgData, token);
      //console.log("resValidation", resValidation.data.data.faceVerificationResult)
      //console.log("ver-token", resValidation.data.data.verificationToken)
      if (resValidation.data.data.faceVerificationResult.status) {

      }

      if (resValidation.data.data.faceVerificationResult.status === true) {
        this.setState({
          validate: resValidation.data.data.faceVerificationResult.status,
          loading: !this.state.loading,
          verifyToken: resValidation.data.data.verificationToken
        })


        sessionStorage.setItem('x-verification-token', JSON.stringify(this.state.verifyToken))

        NotificationManager.success("Face Validated", "Success", 5000);
      }
      if (resValidation.data.data.faceVerificationResult.status === false) {
        this.setState({
          loading: false
        })
        NotificationManager.error("Face does not match", "Error", 5000);
      }


    } catch (error) {
      let { message } = error.response.data
      let { statusCode } = error.response.data
      console.log("error.response", error.response.data)
      NotificationManager.error(statusCode + ',' + message, "Error", 5000);

    }


  }


  onImageConfirm = (base64Image) => {
    this.setState({ faceImage: base64Image, imageFlag: true });
    this.closeCamera();
  };


  showCamera = () => this.setState({ showCamera: true });

  closeCamera = () => this.setState({ showCamera: false });

  continue = (e) => {
    e.preventDefault();
    const { faceImage } = this.state;

    // if(faceImage === ''){
    //   let faceImageMessage = 'Please Provide your faceImage';
    //   NotificationManager.warning(faceImageMessage, "Warning", 5000);
    //   return;
    // }

    let capFace = {
      faceImage
    };

    localStorage.setItem("CaptureFace", JSON.stringify(capFace));


    this.props.history.push('/dashboard/regular-personaldetails');

  };

  back = (e) => {
    e.preventDefault();

    const { faceImage } = this.state;

    let capFace = {
      faceImage
    };

    localStorage.setItem("CaptureFace", JSON.stringify(capFace));
    this.props.history.push('/dashboard/regular-nidimages');
  };

  render() {
    const { faceImage, imageFlag, showCamera, flag, validate, loading, verifyToken } = this.state;
    //console.log("LiveImage", faceImage)
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
                    value={faceImage}
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
                  faceImage ? (
                    <div className="row imTwoWhite d-flex justify-content-center ">
                      {
                        loading ? (
                          // <div className="animated slideInDown d-flex justify-content-center align-items-center" style={{height:"250px"}}>
                          //   <h1 className="text-muted text-center">Loading...</h1>

                          // </div>
                          <div className="row d-flex justify-content-center align-items-center mt-3">
                            <Loading />
                          </div>
                        ) : (
                            <div>
                              {
                                validate === true ? (
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
                                      value={faceImage}
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
                                        src={flag + faceImage}
                                        style={{
                                          display: "block",
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          width: "300px",
                                          height: "200px",

                                        }}
                                        value={faceImage}
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
                verifyToken ? (
                  <span className="b" onClick={this.continue}>Next</span>
                ):""
              }
              




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
                  {showCamera ? (
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
    )
  }
}

export default withRouter(CaptureFace);
