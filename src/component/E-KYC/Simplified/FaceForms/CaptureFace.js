import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import "../utils/Common.css";
import Camera from '../utils/Camera';
import Face from "../images/face.svg";
import {withRouter} from 'react-router-dom';
import { image } from '../images/images';

export class CaptureFace extends Component {
    state={
        faceImage:'',
        imageFlag: false,
        showCamera:false,
        flag: 'data:image/jpeg;base64,'
    }


    componentDidMount(){
        if('CaptureFace' in localStorage){
            let data = JSON.parse(localStorage.getItem('CaptureFace'));
           // console.log(data);
            this.setState({ 
              faceImage: data.faceImage,
            });
       }
    }

    
    onImageConfirm = (base64Image) => {
        this.setState({faceImage: base64Image, imageFlag: true});
        this.closeCamera();
      };


    showCamera = () => this.setState({showCamera:true});

    closeCamera = () => this.setState({showCamera:false});

    continue = (e) => {
        e.preventDefault();
        const{faceImage} = this.state;

        if(faceImage === ''){
          let faceImageMessage = 'Please Provide your faceImage';
          NotificationManager.error(faceImageMessage, "Error", 5000);
          return;
        }

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
        const {faceImage, imageFlag,showCamera, flag} = this.state;
        return (
            <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="card col-sm-5" style={{ paddingTop: "25px" }}>
            <div className="card-header up">
              <h3>Face Verification</h3>
            </div>
            <div className="card-body d-flex justify-content-center">
              {/* {imageFlag ? ( */}
                <img
                  src={faceImage? (flag + faceImage): Face}
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "250px",
                    height: "200px",
                  }}
                  value ={faceImage}
                  className=" img-thumbnail center animated slideInDown"
                  id="imagePicture"
                  alt="cameraPicture"
                />
{/*             
              ) : (
                 <img
                    src={Face}
                    style={{
                      margin: "auto",
                      cursor: "pointer",
                      width: "300px",
                      height: "200px",
                    }}
                    className="img-fluid round img-thumbnail im"
                    id="FrontNidPic"
                    alt=""
                  />
                )}
 */}

            </div>
            <div className="up "
              style={{ width: "300px", textAlign: "center", margin: "0 auto", marginBottom: "10px" }}
              data-toggle="modal"
              data-target="#cameraModal"
              onClick={this.showCamera}
            >
              Capture Image
            </div>
            <div
              className="card-footer d-flex justify-content-between"
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
