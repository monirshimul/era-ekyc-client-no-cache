import React, { Component } from 'react'
import Capture from '../../Simplified/Capture/Capture';
import Face from "../../Simplified/images/face.svg";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { nidFaceCompareNew } from '../../Url/ApiList';
import { NotificationManager } from "react-notifications";
//import { showDate } from '../../../Utils/dateConversion';
import Loading from "../../Simplified/utils/CustomLoding/Loading";
import { largeTime } from '../../../Utils/notificationTime';


export class FaceCompare extends Component {

    state = {
        cameraOn: false,
        faceCompareRes: ""
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

    FaceCompare = async () => {
        let { nid, ecImage, faceImage } = this.props.values
        let config = {
            headers: {
                "x-auth-token": JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        let obj = {
            nid: nid,
            photo: faceImage,
            nidFrontImage: ecImage
        }

        //console.log(obj)
        try {
            this.props.handleState('loading', true);
            let faceComRes = await axios.post(nidFaceCompareNew, obj, config);
            console.log("faceComRes", faceComRes);
            let goNext = faceComRes.data.data.faceVerificationResult.details;

            if (goNext.statusCode === 404) {
                NotificationManager.warning(goNext.message, "Click to Remove", largeTime);
            }

            if (goNext.result) {
                let message = goNext.result === "True" ? NotificationManager.success("Face Validated, Please go next", "Click to Remove", largeTime) : NotificationManager.warning("Face is not valid", "Click to Remove", largeTime)
                this.setState({
                    faceCompareRes: faceComRes.data.data.faceVerificationResult.details.result
                })
            }

            this.props.handleState('loading', false);



        } catch (error) {
            console.log(error);

            if (error.response) {
                let message = error.response.data.message
                NotificationManager.error(message, "Click to Remove", largeTime);
                this.props.handleState('isEnableFace', false);
                this.props.handleState('loading', false);
            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Click to Remove", largeTime);
                this.props.handleState('isEnableFace', false);
                this.props.handleState('loading', false);
            } else if (error) {
                NotificationManager.error(error.toString(), "Click to Remove", largeTime);
                this.props.handleState('isEnableFace', false);
                this.props.handleState('loading', false);
            }
        }

    }

    Back = () => {
        this.props.prevStep();
    }


    render() {
        const { values } = this.props;
        //console.log("state", this.state.faceCompareRes)
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

                            <span className="b mr-5" onClick={this.Back} >Back</span>
                            {
                                this.state.faceCompareRes === "True" ? (
                                    <span className="b" >Next</span>
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

export default FaceCompare;
