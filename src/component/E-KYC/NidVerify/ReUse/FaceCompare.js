import React, { Component } from 'react'
import Capture from '../../Simplified/Capture/Capture';
import Face from "../../Simplified/images/face.svg";
import Button from '@material-ui/core/Button';

export class FaceCompare extends Component {

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

    Back = ()=>{
        this.props.prevStep();
    }


    render() {
        const {values} = this.props;
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
                            <h5 style={{color:"green"}}><i class="fas fa-camera-retro"></i> Face Verification</h5>
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
                                        style={{ color:"green", outline: "none", borderRadius: "10px" }}>Take Photo</Button>
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
                                        style={{ color:"green", outline: "none", borderRadius: "10px" }}>Compare Face</Button>
                                    </div>

                                    
                                </div>


                            </div>
                                ):""
                            }

                        </div>


                        <div
                            className="card-footer d-flex justify-content-center mt-2"
                            style={{ background: "#fff" }}
                        >

                            <span className="b mr-5" onClick={this.Back} >Back</span>
                            {
                                values.verifyToken ? (
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

export default FaceCompare
