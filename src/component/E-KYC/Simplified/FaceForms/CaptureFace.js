import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import "../utils/Common.css";
import Camera from '../utils/Camera';
import Face from "../images/face.svg";
import Done from "../images/done.svg";
import { withRouter } from 'react-router-dom';
import { image } from '../images/images';

export class CaptureFace extends Component {
  state = {
    faceImage: '',
    imageFlag: false,
    showCamera: false,
    validate: false,
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

  validate = (e) => {
    e.preventDefault();
    this.setState({
      validate: !this.state.validate
    })
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

    const capFace = {
      faceImage
    };

    localStorage.setItem("CaptureFace", JSON.stringify(capFace));


    this.props.history.push('/dashboard/personal-details');

  };

  back = (e) => {
    e.preventDefault();
    this.props.history.push('/dashboard/nid-images');
  };

  render() {
    const { faceImage, imageFlag, showCamera, flag, validate } = this.state;
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
                        validate ? (
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
                              onClick={this.validate}
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
              <span className="b" onClick={this.continue}>Next</span>




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
                <div className="modal-header">
                  <h5 className="modal-title" id="cameraModalLabel">
                    Capture Your Image
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
