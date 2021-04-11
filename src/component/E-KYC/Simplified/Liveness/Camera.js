import React, { Component } from "react";
import PropTypes from "prop-types";
import LibImage from "./liveness";
import Loading from '../utils/CustomLoding/Loading'
//import { getElementError } from "@testing-library/react";
//import Face from "../images/loading.svg";
import { largeTime } from './../../../Utils/notificationTime';
import { NotificationManager } from "react-notifications";

export class Camera extends Component {
  base64Image = "";
  streamObject;


  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
  };

  state = {
    status: "",
    modelType: "",
    loading: false
  }

  libImage;

  componentDidMount() {
    const constraints = {
      video: true,
    };

    // Model Instantiate
    let libImage = new LibImage();
    libImage.capture(
      "videoCap",
      "imageCap",
      "http://103.17.69.111/models/"
      // "https://ovichowdhury.github.io/face-api-models/"
      // "https://agent1.bankasia-bd.com:3000/models/"
    );
    this.libImage = libImage;

    //Event Emiter
    libImage.addEventListener("modelLoaded", (e) => {
      console.log("model loaded successfully", e.type);
      this.setState({
        modelType: e.type
      })
    });

    libImage.addEventListener("expressionDetected", (e) => {
      console.log(e.detail);
      this.setState({
        status: e.detail,
        loading: false
      })
      let show = document.getElementById("status");
      show.innerHTML = e.detail;
    });

    libImage.addEventListener("livenessDetected", (e) => {
      console.log("Liveness detected........................");
    });

    libImage.addEventListener("faceSpoofingDetected", (e) => {
      console.log("face spoofing detected");
    });

    libImage.addEventListener("detectionInterrupted", (e) => {
      console.log("detectionInterrupted fired");
    });

    libImage.addEventListener("mediaDeviceException", (e) => {
      NotificationManager.error("Camera device not found", "Click To Remove", largeTime);
    })

    // const video = document.querySelector('#videoCap');
    // const image = document.querySelector('#imageShow');
    // const canvas = document.createElement('canvas');
    // const capBtn = document.getElementById("capBtn");
    // const imageContainer = document.getElementById("imageContainer");

    // navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    //   //console.log(stream);
    //   video.srcObject = stream
    //   this.streamObject = stream
    // }).catch(err => console.log(err));

    // capBtn.onclick = video.onclick = () => {
    //   canvas.width = video.videoWidth;
    //   canvas.height = video.videoHeight;
    //   canvas.getContext('2d').drawImage(video, 0, 0);
    //   let imageRaw = canvas.toDataURL('image/png');
    //   this.base64Image = imageRaw.split(',')[1];
    //   image.src = imageRaw;
    //   imageContainer.style.display = "block";
    // };
  }

  // UNSAFE_componentWillUnmount() {
  //   console.log("*****In unmount*****")
  //   this.streamObject.getTracks().forEach(function (track) {
  //     track.stop();
  //   });
  // }

  componentWillUnmount() {
    this.libImage.closeStream();
  }

  startDetection = (e) => {


    this.setState({
      loading: !this.state.loading
    })
    this.libImage.startDetection();





  };

  onConfirm = (e) => {
    //this.libImage.closeStream();

    const imgData = document.getElementById("imageCap");
    this.base64Image = imgData.src.split(",")[1];
    //console.log("imgData", this.base64Image);

    this.props.onConfirm(this.base64Image);
  };

  render() {
    let { status, modelType, loading } = this.state
    return (
      <div className="container mb-3" style={{ margin: "0 auto", padding: "0" }}>
        <div className="row d-flex justify-content-center align-items-center divBg">
          {/* <div className="col-sm-10">
          <p className="">
                   <span style={{color:"green", fontSize:"20px"}}>Liveness detection</span> is any technique used to detect a spoof attempt by determining whether the source of a biometric sample is a live human being or a fake representation. This is accomplished through algorithms that analyze data collected from biometric sensors to determine whether the source is live or reproduced.
          </p>
          </div> */}
          <h3>Face Liveness Detection</h3>
        </div>
        <div
          className="row imTwoWhite d-flex justify-content-center"

        >
          <div
            className="col-sm-6 imTwo text-center"
            style={{ margin: "auto" }}
            id="videoContainer"
          >
            {
              modelType ?
                (
                  <video className="imTwoWhite" autoPlay width="340px" height="240px" id="videoCap"></video>
                )
                : (
                  //   <img

                  //   className="imTwoWhite"
                  //   width="340px"
                  //   height="240px"
                  //   src={Face}
                  //   style={{ marginBottom: "7px" }}
                  //   id=""
                  //   alt="Live Image "
                  // />
                  // <h1 className="text-muted">Loading...</h1>

                  <div className="row d-flex justify-content-center align-items-center mt-3">
                    <Loading />
                  </div>

                )
            }


            <br />
            {/* <button className="btn btn-info" id="capBtn">
              Capture
            </button> */}
            {
              modelType ? (
                <button
                  className="imTwo text-center"
                  id="startDetection"
                  style={{ border: "none", width: "340px", color: "green", fontSize: "17px" }}
                  onClick={this.startDetection}
                >
                  <i class="fas fa-play"></i> START DETECTION
                </button>
              ) : ""
            }

          </div>

          <div className="col-sm-6 imTwo text-center animated zoomIn" id="imageContainer">

            <img

              className="imTwoWhite"
              width="315px"
              height="240px"
              src=""
              style={{ marginBottom: "7px" }}
              id="imageCap"
              alt="Liveness detection is any technique used to detect a spoof attempt by determining whether the source of a biometric sample is a live human being or a fake representation. This is accomplished through algorithms that analyze data collected from biometric sensors to determine whether the source is live or reproduced."
            />
            <br />
            {
              loading ? (
                <div className="row d-flex justify-content-center align-items-center mt-3">
                  <Loading />
                </div>
              ) : (
                <div>
                  {
                    status ? (
                      <button
                        className="imTwo text-center"
                        id="conBtn"
                        style={{ border: "none", width: "315px", color: "green", fontSize: "17px" }}
                        onClick={this.onConfirm}
                        data-dismiss="modal"
                      >
                        <i class="fas fa-check-circle"></i> CONFIRM
                      </button>
                    ) : ""

                  }
                </div>
              )
            }


          </div>



        </div>

        <div className="row imTwoWhite d-flex justify-content-center align-items-center">

          <h1 className="imPlain text-muted"><i class="far fa-smile-beam" style={{ color: "green" }}></i> STATUS : </h1>
          &nbsp;&nbsp;&nbsp;

          <h1 className="imPlain" style={{ textTransform: "uppercase", color: "green" }}> <span id="status"></span></h1>




        </div>

        <div className="row d-flex justify-content-center">

        </div>
      </div>
    );
  }
}

export default Camera;
