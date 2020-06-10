import * as faceapi from 'face-api.js';




export default class LibImage extends EventTarget {

    FACE_THRESH = 0.40;
    streamObj = null;


    constructor() {
        super();
        this.faceMatcher = null;
        this.video = null;
        this.imageContainer = null;
        this.canvas = null;
        this.neutralStatus = false;
        this.happyStatus = false;
        this.interval = null;
    }

    nets() {
        return faceapi.nets;
    }

    getFaceApi() {
        return faceapi;
    }

    getMaxKey(obj) {
        let keys = Object.keys(obj);
        let max = obj[keys[0]];
        let maxKey = keys[0];
        for (let k of keys) {
            if (obj[k] > max) {
                max = obj[k];
                maxKey = k;
            }
        }
        return maxKey;
    }

    async loadModels(modelUrl) {
        await faceapi.nets.ssdMobilenetv1.loadFromUri(modelUrl);
        await faceapi.nets.faceExpressionNet.loadFromUri(modelUrl);
        await faceapi.nets.faceRecognitionNet.loadFromUri(modelUrl);

        await faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl);
        this.dispatchEvent(new Event("modelLoaded"));
    }

    setImage() {
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        this.canvas.getContext('2d').drawImage(this.video, 0, 0);
        let imageRaw = this.canvas.toDataURL('image/png');
        //console.log("Image Raw", imageRaw)
        this.imageContainer.src = imageRaw;
        let context = this.canvas.getContext("2d");
        context.clearRect(0, 0, context.width, context.height);
        this.neutralStatus = false;
        this.happyStatus = false;
        this.faceMatcher = null;
        this.dispatchEvent(new Event("imageRendered"));
    }

    async capture(videoId, imageId, modelUrl, callback) {

        if (navigator.mediaDevices) {

            await this.loadModels(modelUrl);

            this.faceMatcher = null;

            this.neutralStatus = false;
            this.happyStatus = false;

            const constraints = {
                video: true
            };
            this.video = document.getElementById(videoId);
            this.imageContainer = document.getElementById(imageId);
            this.canvas = document.createElement('canvas');

            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                console.log(stream);
                this.video.srcObject = stream
                this.streamObj = stream
                if (typeof callback === "function") callback();
            }).catch(err => {
                console.error(err)
                this.dispatchEvent(new Event("mediaDeviceException"))
            });

        }
        else {
            console.error("Media devices not supported");
            this.dispatchEvent(new Event("mediaDeviceNotSupported"))
        }

    }


    startDetection() {

        clearInterval(this.interval);
        this.faceMatcher = null;
        this.neutralStatus = false;
        this.happyStatus = false;
        this.interval = null;
        this.imageContainer.src = "";

        this.interval = setInterval(async () => {
            try {

                const detection = await faceapi.detectSingleFace(this.video).withFaceLandmarks().withFaceExpressions().withFaceDescriptor();
                //console.log("detection", detection)
                if(detection){
                    let expression = this.getMaxKey(detection.expressions);
                this.dispatchEvent(new CustomEvent("expressionDetected", {detail: expression}));
                switch (expression) {
                    case 'neutral':
                        this.neutralStatus = true;
                        if (this.faceMatcher == null) {
                            this.faceMatcher = new faceapi.FaceMatcher(detection);
                        }
                        break;
                    default:
                        this.happyStatus = true;
                        if (this.faceMatcher == null) {
                            this.faceMatcher = new faceapi.FaceMatcher(detection);
                        }
                        break;
                }
                if (this.neutralStatus && this.happyStatus) {
                    const match = this.faceMatcher.matchDescriptor(detection.descriptor);
                    if (match.distance < this.FACE_THRESH) {
                        clearInterval(this.interval);
                        this.dispatchEvent(new Event("livenessDetected"));
                        this.setImage();
                        
                        // const detectionAfter = await faceapi.detectSingleFace(this.video).withFaceExpressions();
                        // let expressionAfter = this.getMaxKey(detectionAfter.expressions);
                        // console.log("Please be neutral");
                        // if(expressionAfter === 'neutral') {
                        //     console.log("neutral face found");
                        //     this.setImage();
                        // }
                        // else {
                        //     console.log("neutral face not found");
                        // }
                        
                    }
                    else {
                        this.dispatchEvent(new Event("faceSpoofingDetected"));
                        this.neutralStatus = false;
                        this.happyStatus = false;
                        this.faceMatcher = null;
                    }

                }
                }
                
            }
            catch (ex) {
                console.log("Exception during detection");
                throw ex;
            }


        }, 350);
    }

    stopDetection() {
        clearInterval(this.interval);
        this.neutralStatus = false;
        this.happyStatus = false;
        this.faceMatcher = null;
        this.dispatchEvent(new Event("detectionInterrupted"))
    }

    closeStream(){
        if (this.streamObj) {
            this.streamObj.getTracks().forEach(function (track) {
                track.stop();
              });
        } 
    }


}