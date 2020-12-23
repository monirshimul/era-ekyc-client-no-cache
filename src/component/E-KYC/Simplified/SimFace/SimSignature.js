import React, { Component } from 'react';
import Sign from '../images/sign.svg';
import Capture from '../Capture/Capture';
//import { NotificationManager } from "react-notifications";
import { datePickerPrefiilConv } from '../../../Utils/dateConversion';
import { demoSignature } from './../../../Utils/demoSignature';
import { ImageCompressor } from '../../../Utils/ImageCompressor'
import { NotificationManager } from "react-notifications";
import { largeTime } from '../../../Utils/notificationTime';

export class SimSignature extends Component {

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
        //console.log("In image confirm");
        //console.log("Image",base64Image);


        this.props.handleState("signature", base64Image);
        this.captureOff();



    }


    continue = e => {
        const { values } = this.props;
        e.preventDefault();
        // if (values.signature === "") {
        //     let signatureMessage = "Please Provide Signature";
        //     NotificationManager.warning(signatureMessage, "Warning", 5000);
        //     return;
        //   }

        if (values.signature === "") {
            this.props.handleState("signature", demoSignature);
        }
        this.props.nextStep();
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

    fileSelectedHandler = async (event) => {
        if (event.target.files[0]) {
            let base = await ImageCompressor(event)
            // console.log("Base", base)
            this.props.handleState("signature", base);

        }
    };


    render() {
        const { values } = this.props;
        // console.log(values.signature);
        return (


            <div className="col-sm-12 d-flex justify-content-center" >
                <div className="card col-sm-5" style={{ paddingTop: "25px" }}>
                    <div className="card-header up">
                        <h3>Provide Customer Signature</h3>
                    </div>
                    <div className="card-body d-flex justify-content-center">

                        <img

                            src={values.signature ? (values.flag + values.signature) : Sign}
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
                                <label class="custom-file-label" for="input-file">Choose Image</label>
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



                    <div
                        className="card-footer d-flex justify-content-between"
                        style={{ background: "#fff" }}
                    >

                        <span className="b mr-5" onClick={this.back}>Back</span>
                        <span className="b" onClick={this.continue}>Next</span>




                    </div>
                </div>

            </div>






        )
    }
}

export default SimSignature;
