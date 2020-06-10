import React, { Component } from "react";
import PropTypes from "prop-types";
import LibImage from "./liveness";
import { getElementError } from "@testing-library/react";
import Face from "../images/bio.svg";

export class Camera extends Component {
  base64Image = "";
  streamObject;

  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
  };

  state = {
    status:"",
    modelType:"",
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
      "https://ovichowdhury.github.io/face-api-models/"
    );
    this.libImage = libImage;

    //Event Emiter
    libImage.addEventListener("modelLoaded", (e) => {
      console.log("model loaded successfully",e.type);
      this.setState({
        modelType:e.type
      })
    });

    libImage.addEventListener("expressionDetected", (e) => {
      console.log(e.detail);
      this.setState({
        status:e.detail
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

  startDetection = (e) => {
    console.log("In the Start Detection");
    this.libImage.startDetection();
  
  };

  onConfirm = (e) => {
    this.libImage.closeStream();

    const imgData = document.getElementById("imageCap");
    this.base64Image = imgData.src.split(",")[1];
    console.log("imgData", this.base64Image);

    this.props.onConfirm(this.base64Image);
  };

  render() {
    let { status, modelType } = this.state
    return (
      <div className="container mb-3" style={{margin:"0 auto", padding:"0"}}>
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
              :(
              <img

              className="imTwoWhite"
              width="340px"
              height="240px"
              src={Face}
              style={{ marginBottom: "7px" }}
              id=""
              alt="Live Image "
            />
              )
          }
            

            <br />
            {/* <button className="btn btn-info" id="capBtn">
              Capture
            </button> */}
            <button
              className="imTwoWhite text-center"
              id="startDetection"
              style={{border:"none", width:"340px", color:"green", fontSize:"17px"}}
              onClick={this.startDetection}
            >
              START DETECTION
            </button>
          </div>
        
            <div className="col-sm-6 imTwo text-center animated zoomIn" id="imageContainer">
              
            <img

              className="imTwoWhite"
              width="315px"
              height="240px"
              src=""
              style={{ marginBottom: "7px" }}
              id="imageCap"
              alt="Live Image "
            />
            <br />
            {
              status ? (
                <button
              className="imTwoWhite text-center"
              id="conBtn"
              style={{border:"none", width:"315px", color:"green", fontSize:"17px"}}
              onClick={this.onConfirm}
              data-dismiss="modal"
            >
              CONFIRM
            </button>
              ):""
            }
            
          </div>
            
          
          
        </div>
        
        <div className="row imTwoWhite d-flex justify-content-center align-items-center">
          
          <h3 className="imPlain text-muted">STATUS : </h3>
          &nbsp;&nbsp;&nbsp;
         
          <h3 className="imPlain"  style={{textTransform:"uppercase", color:"green"}}><i class="far fa-surprise"></i> <span id="status"></span></h3>
            
          
          
          
        </div>
        
        <div className="row d-flex justify-content-center">
          
        </div>
      </div>
    );
  }
}

export default Camera;
