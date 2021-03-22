import React, { Component } from 'react';
import Sign from '../images/man.svg';
import Capture from '../Capture/Capture';
import { nidFaceCompareNew } from '../../Url/ApiList';
import { NotificationManager } from "react-notifications";
import { datePickerPrefiilConv } from '../../../Utils/dateConversion';
import { largeTime, mediumTime } from '../../../Utils/notificationTime';
import { ImageCompressor } from '../../../Utils/ImageCompressor';
import Loading from '../utils/CustomLoding/Loading';
import axios from 'axios';


export class SimCutomerPic extends Component {


    state = {
        cameraOn: false
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

    fileSelectedHandler = async (event) => {
        if (event.target.files[0]) {
            let base = await ImageCompressor(event)
            this.props.handleState('faceImage', base);

        }
    };

    continue = async (e) => {
        const { values } = this.props;
        e.preventDefault();

        if (values.faceImage === "") {
            let picMessage = "Please Provide Photograph";
            NotificationManager.warning(picMessage, "Click to Remove", largeTime);
            return;
        }

        let config = {
            headers: {
                "x-auth-token": JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        let obj = {
            nid: values.nid,
            photo: values.faceImage,
            nidFrontImage: values.ecImage
        }

        try {
            this.props.handleState('confirmFlag', true);
            let faceComRes = await axios.post(nidFaceCompareNew, obj, config);
            console.log(faceComRes.data.data.faceVerificationResult);
            let goNext = faceComRes.data.data.faceVerificationResult.details;
            let verificationStatus = faceComRes.data.data.faceVerificationResult.status;


            if (goNext.statusCode === 404) {
                NotificationManager.warning(goNext.message, "Click to Remove", largeTime);
            }

            if (verificationStatus) {
                NotificationManager.success("Face match completed", "Click to Remove", mediumTime);
                this.props.nextStep();

            } else {
                NotificationManager.warning("Face does not matched", "Click to Remove", largeTime);
            }

            this.props.handleState('confirmFlag', false);


        } catch (error) {
            this.props.handleState('confirmFlag', false);
            if (error.response) {
                let message = error.response.data.message
                NotificationManager.error(message, "Click to Remove", largeTime);
            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Click to Remove", largeTime);
            } else if (error) {
                NotificationManager.error(error.toString(), "Click to Remove", largeTime);
            }
        }

    };

    back = e => {
        let { values } = this.props;
        e.preventDefault();

        for (let i = 0; i < values.jointArray.length; i++) {
            if (values.jointArray[i].isShow === true) {
                if (values.jointArray[i].dob !== "") {
                    let copyArray = Object.assign([], this.props.values.jointArray);
                    copyArray[i].dob = datePickerPrefiilConv(copyArray[i].dob);
                    this.props.handleState('jointArray', copyArray);
                }
            } else {
                if (values.jointArray[i].minorDob !== '') {
                    let copyArray = Object.assign([], this.props.values.jointArray);
                    copyArray[i].minorDob = datePickerPrefiilConv(copyArray[i].minorDob);
                    this.props.handleState('jointArray', copyArray);
                }
            }

        }


        this.props.prevStep();
    }
    render() {
        let { values } = this.props;

        return (

            <div className="col-sm-12 d-flex justify-content-center" >
                <div className="card col-sm-5" style={{ paddingTop: "25px" }}>
                    <div className="card-header up">
                        <h3>Provide Customer Photo</h3>
                    </div>
                    <div className="card-body d-flex justify-content-center">

                        <img

                            src={values.faceImage ? (values.flag + values.faceImage) : Sign}
                            style={{

                                width: "300px",
                                height: "200px",
                            }}
                            className=" img-fluid img-thumbnail im"
                            id='SignaturePic'
                            alt=""
                        />



                    </div>
                    <div
                        className="card-footer"
                        style={{ background: "#fff" }}
                    >

                        <div class="input-group mb-3 ">
                            <div class="custom-file">
                                <input type="file"
                                    onChange={this.fileSelectedHandler}
                                    onClick={(event) => event.target.value = null}

                                    class="form-control-file" id="input-file" />
                                <label class="custom-file-label" htmlFor="input-file">Choose Image</label>
                            </div>

                        </div>
                        <div className="im mt-3" style={{ color: "green" }} data-toggle="modal" data-target="#cameraModal" onClick={this.captureOn}>
                            <i class="fas fa-camera"></i> Capture Image
                        </div>


                    </div>

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


                    {
                        values.confirmFlag ? (
                            <div className="row d-flex justify-content-center align-items-center mt-3">
                                <Loading />
                            </div>
                        ) : ''
                    }
                    <br />


                    <div
                        className="card-footer d-flex justify-content-between"
                        style={{ background: "#fff" }}
                    >

                        <span className="b mr-5" onClick={this.back}>Back</span>
                        {
                            values.confirmFlag ? "" : (
                                <span className="b" onClick={this.continue}>Next</span>
                            )
                        }


                    </div>
                </div>

            </div>
        )
    }
}

export default SimCutomerPic;
