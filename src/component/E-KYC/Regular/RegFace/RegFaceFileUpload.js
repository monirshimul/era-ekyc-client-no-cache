import React, { Component } from 'react'

import passImage from '../../Simplified/images/passport.svg';
import tinImage from '../../Simplified/images/diploma.svg';
import birthImage from '../../Simplified/images/tin.svg';
import ok from '../../Simplified/images/ok.svg';
import ok1 from '../../Simplified/images/ok1.svg';
import ok2 from '../../Simplified/images/ok2.svg';

export class RegFaceFileUpload extends Component {

    // state={
    //     passOk: true,
    //     birthOk: true,
    //     tinOk: true
    // }

    fileSelectedHandlerPass = event => {
       
        if (event.target.files[0]) {
            let file = event.target.files[0];
            //console.log(file.type);
            var reader = new FileReader();
            reader.readAsBinaryString(file);

            reader.onload = () => {
                // console.log(typeof reader.result);
                // console.log(btoa(reader.result));
                let base64Image = btoa(reader.result);
                // this.setState({
                //   profilePic: base64Image,
                //   profilePicType: file.type

                //   //nidImage: URL.createObjectURL(event.target.files[0])
                // });
                this.props.handleState('passport', base64Image);
                this.props.handleState('passportFileName', file.name);
                this.props.handleState('passFileType', file.type);
                
            };
            reader.onerror = () => {
                //console.log('there are some problems');
                alert('File can not be read');
            };
        }
    };

    fileSelectedHandlerBirth = event => {
        if (event.target.files[0]) {
            let file = event.target.files[0];
            //console.log(file.type);
            var reader = new FileReader();
            reader.readAsBinaryString(file);

            reader.onload = () => {
                // console.log(typeof reader.result);
                // console.log(btoa(reader.result));
                let base64Image = btoa(reader.result);
                // this.setState({
                //   profilePic: base64Image,
                //   profilePicType: file.type

                //   //nidImage: URL.createObjectURL(event.target.files[0])
                // });
                this.props.handleState('birthCertificate', base64Image);
                this.props.handleState('birthCertificateFileName', file.name);
                this.props.handleState('birthCerFileType', file.type)
            };
            reader.onerror = () => {
                //console.log('there are some problems');
                alert('File can not be read');
            };
        }
    };

    fileSelectedHandlerTin = event => {
        if (event.target.files[0]) {
            let file = event.target.files[0];
            //console.log(file.type);
            var reader = new FileReader();
            reader.readAsBinaryString(file);

            reader.onload = () => {
                // console.log(typeof reader.result);
                // console.log(btoa(reader.result));
                let base64Image = btoa(reader.result);
                // this.setState({
                //   profilePic: base64Image,
                //   profilePicType: file.type

                //   //nidImage: URL.createObjectURL(event.target.files[0])
                // });
                this.props.handleState('tinCertificate', base64Image);
                this.props.handleState('tinCertificateFileName', file.name);
                this.props.handleState('tinFileType', file.type);
            };
            reader.onerror = () => {
                //console.log('there are some problems');
                alert('File can not be read');
            };
        }
    };

    back = e => {
        
        this.props.prevStep();
    }
    continue = e => {
    //     const { values } = this.props;
    //    e.preventDefault();
    //    if (values.passport === "") {
    //        let signatureMessage = "Please Provide Passport";
    //        NotificationManager.warning(signatureMessage, "Warning", 5000);
    //        return;
    //      }
    //    if (values.birthCertificate === "") {
    //        let signatureMessage = "Please Provide Birth Certificate";
    //        NotificationManager.warning(signatureMessage, "Warning", 5000);
    //        return;
    //      }
    //    if (values.tinCertificate === "") {
    //        let signatureMessage = "Please Provide Tin Certificate";
    //        NotificationManager.warning(signatureMessage, "Warning", 5000);
    //        return;
    //      }
       this.props.nextStep();
   };



    render() {
        // let {passOk, birthOk, tinOk} = this.state
        let {values} = this.props
        // console.log("pass",values.passport)
        // console.log("birth",values.birthCertificate)
        // console.log("tin",values.tinCertificate)
        
        return (
            <div className="container">

            <div className="card-header divBg">

            <h3 className="text-center pt-3">Optional File Upload</h3>

          </div>

                <div className="row d-flex justify-content-center">

                    <div className="card col-sm-4" style={{ paddingTop: "25px" }}>
                        <div className="card-header up">
                            <h3>Passport</h3>
                        </div>
                        {
                            values.passport ? (
                               

                                
                                <div className="card-body d-flex justify-content-center animated zoomIn">
                                    

                                <img
                                    src={ok2}
                                    style={{
                                        margin: "auto",
                                        cursor: "pointer",
                                        width: "200px",
                                        height: "200px",
                                        borderRadius:"50%"
                                    }}
                                    defaultValue=""
                                    className="img-fluid img-thumbnail im"
                                    id="FrontNidPic"
                                    alt=""
                                />
                            </div>
                            
                            ):(
                            <div className="card-body d-flex justify-content-center">

                            <img
                                src={values.passport ? (values.flag + values.passport) : passImage}
                                style={{
                                    margin: "auto",
                                    cursor: "pointer",
                                    width: "300px",
                                    height: "200px",
                                }}
                                defaultValue=""
                                className="img-fluid img-thumbnail im"
                                id="FrontNidPic"
                                alt=""
                            />
                        </div>
                            )
                        }
                        
                        <div
                            className="card-footer"
                            style={{ background: "#fff" }}
                        >

                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file"
                                        onChange={this.fileSelectedHandlerPass}
                                        onClick={(event) => event.target.value = null}

                                        className="form-control-file" id="input-file-one" />
                                    <label className="custom-file-label" htmlFor="input-file-one">Choose Image</label>
                                </div>

                            </div>

                            {/* <p className="text-center mt-3"style={{color:"green"}}>Or</p> */}

                            {/* <div className="im mt-3" style={{ color: "green" }} data-toggle="modal" data-target="#cameraModal" onClick={}>
      <i class="fas fa-camera"></i> Capture Image
      </div> */}



                        </div>
                       
                        



                    </div>

                    
                        <div className="card col-sm-4" style={{ paddingTop: "25px" }}>
                            <div className="card-header up">
                                <h3>Birth Certificate</h3>
                            </div>
                            {
                            values.birthCertificate ? (
                                <div className="card-body d-flex justify-content-center animated zoomIn">

                                <img
                                    src={ok1}
                                    style={{
                                        margin: "auto",
                                        cursor: "pointer",
                                        width: "200px",
                                        height: "200px",
                                        borderRadius:"50%"
                                    }}
                                    defaultValue=""
                                    className="img-fluid img-thumbnail im"
                                    id="FrontNidPic"
                                    alt=""
                                />
                            </div>
                            ):(
                                <div className="card-body d-flex justify-content-center">
                                <img
                                    src={values.birthCertificate ? (values.flag + values.birthCertificate) : birthImage}
                                    style={{
                                        margin: "auto",
                                        cursor: "pointer",
                                        width: "300px",
                                        height: "200px",
                                    }}
                                    defaultValue=""
                                    className="img-fluid img-thumbnail im"
                                    id="nidBack"
                                    alt=""
                                />
                            </div>
                            )
                        }
                            
                            <div
                                className="card-footer"
                                style={{ background: "#fff" }}
                            >

                                <div className="input-group">
                                    <div className="custom-file">
                                        <input type="file"

                                            onChange={this.fileSelectedHandlerBirth}
                                            onClick={(event) => event.target.value = null}

                                            className="form-control-file" id="input-file-two" />
                                        <label className="custom-file-label" htmlFor="input-file-two">Choose Image</label>
                                    </div>
                                </div>
                                {/* <p className="text-center mt-3"style={{color:"green"}}>Or</p> */}

                                {/* <div className="im mt-3" style={{ color: "green" }} data-toggle="modal" data-target="#cameraModal" onClick={}>
      <i class="fas fa-camera"></i> Capture Image
      </div> */}


                            </div>
                           
                        </div>
                   

                    
                        <div className="card col-sm-4" style={{ paddingTop: "25px" }}>
                            <div className="card-header up">
                                <h3>Tin</h3>
                            </div>
                            {
                            values.tinCertificate ? (
                                <div className="card-body d-flex justify-content-center animated zoomIn">

                                <img
                                    src={ok}
                                    style={{
                                        margin: "auto",
                                        cursor: "pointer",
                                        width: "200px",
                                        height: "200px",
                                        borderRadius:"50%"
                                    }}
                                    defaultValue=""
                                    className="img-fluid img-thumbnail im"
                                    id="FrontNidPic"
                                    alt=""
                                />
                            </div>
                            ):(
                                <div className="card-body d-flex justify-content-center">

                                <img
                                    src={values.tinCertificate ? (values.flag + values.tinCertificate) : tinImage}
                                    style={{
                                        margin: "auto",
                                        cursor: "pointer",
                                        width: "300px",
                                        height: "200px",
                                    }}
                                    defaultValue=""
                                    className="img-fluid img-thumbnail im"
                                    id="FrontNidPic"
                                    alt=""
                                />
                            </div>
                            )
                        }
                            
                            <div
                                className="card-footer"
                                style={{ background: "#fff" }}
                            >

                                <div className="input-group">
                                    <div className="custom-file">
                                        <input type="file"
                                            onChange={this.fileSelectedHandlerTin}
                                            onClick={(event) => event.target.value = null}

                                            className="form-control-file" id="input-file-three" />
                                        <label className="custom-file-label" htmlFor="input-file-three">Choose Image</label>
                                    </div>

                                </div>

                                {/* <p className="text-center mt-3"style={{color:"green"}}>Or</p> */}

                                {/* <div className="im mt-3" style={{ color: "green" }} data-toggle="modal" data-target="#cameraModal" onClick={}>
      <i class="fas fa-camera"></i> Capture Image
      </div> */}



                            </div>

                            


                        </div>
                    





                </div>
                
                <div
                    className="mt-5 d-flex justify-content-center"
                    
                >

                    <span className="b mr-5" onClick={this.back}>Back</span>
                    <span className="b" onClick={this.continue}>Next</span>




                </div>

            </div>
        )
    }
}

export default RegFaceFileUpload
