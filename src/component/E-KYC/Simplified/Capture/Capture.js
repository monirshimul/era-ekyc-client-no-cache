import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from "react-notifications";
import { largeTime } from './../../../Utils/notificationTime';

export class Capture extends Component {

    base64Image = "";
    streamObject;

    static propTypes = {
        onConfirm: PropTypes.func.isRequired
    }



    componentDidMount() {
        try {
            const constraints = {
                video: true
            };

            const video = document.querySelector('#videoCap');
            const image = document.querySelector('#imageShow');
            const canvas = document.createElement('canvas');
            const capBtn = document.getElementById("capBtn");
            const imageContainer = document.getElementById("imageContainer");

            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                console.log(stream);
                video.srcObject = stream
                this.streamObject = stream
            }).catch(err => {
                console.log(err);
                NotificationManager.warning("Camera device not Found", "Click to Remove", largeTime);
            });

            capBtn.onclick = video.onclick = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);
                let imageRaw = canvas.toDataURL('image/png');
                this.base64Image = imageRaw.split(',')[1];
                image.src = imageRaw;
                imageContainer.style.display = "block";
            };
        } catch (error) {
            console.log("camera Error", error.response);
        }
    }

    componentWillUnmount() {
        try {
            console.log("*****In unmount*****")
            this.streamObject.getTracks().forEach(function (track) {
                track.stop();
            });
        } catch (error) {
            console.log("error", error.response);
        }
    }

    onConfirm = (e) => {
        this.streamObject.getTracks().forEach(function (track) {
            track.stop();
        });
        this.props.onConfirm(this.base64Image);

    }

    render() {
        return (
            <div className="container imTwoWhite">
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-sm-6" style={{ margin: "auto" }} id="videoContainer">
                        <video className="imTwoWhite" autoPlay width="340px" height="240px" id="videoCap"></video>
                        <br />
                        <button className="b" style={{ border: "none", outline: "none" }} id="capBtn">Capture</button>
                    </div>

                    <div className="col-sm-6 animated slideInLeft" style={{ display: "none" }} id="imageContainer">
                        <img className="imTwoWhite" width="320px" height="240px" src="" style={{ marginBottom: "7px" }} id="imageShow" alt="Please click on video to capture" />
                        <br />
                        <button className="b" style={{ border: "none", outline: "none" }} id="conBtn" onClick={this.onConfirm} data-dismiss="modal" >Confirm</button>
                    </div>


                </div>
            </div>

        )
    }
}

export default Capture