import React, { Component } from 'react';
import Face from '../../Simplified/images/face-scan.svg';
import Finger from '../../Simplified/images/fingerP.svg';
import { Link, withRouter } from 'react-router-dom';

export class NidDecision extends Component {

    typeVerification = (val) => {
        //const obj= { type: val };
        if (val === 'FACE') {
            this.props.history.push('/dashboard/nid-face');
        } else {
            this.props.history.push('/dashboard/nid-finger');
        }
        
    }
    render() {
        return (
             <div className="container imTwoWhite" >
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-12">
                        <h2 className="im" style={{ color: "green" }}>Nid Verification Type</h2>
                    </div>

                </div>
                <div className=" row d-flex justify-content-center align-items-center mt-5" >
                    <div className="col-sm-6" style={{ paddingLeft: "50px" }}>
                        <div>
                            <h3 className="" style={{ color: "#099e96" }}><i class="fas fa-user-circle"></i> Facial Recognition</h3>
                        </div>
                        <hr />

                        <div>
                            <p className="text-muted">
                                <span style={{ color: "green", fontSize: "20px" }}>A facial recognition</span> system is a technology capable of identifying or verifying a person from a digital image or a video frame from a video source. <span style={{ color: "green", fontSize: "20px" }}>Face verification</span> is the task of comparing a candidate face to another, and verifying whether it is a match. It is a one-to-one mapping: you have to check if this person is the correct one.
                            </p>
                        </div>


                    </div>
                    <div className="col-sm-6 text-center" >
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-sm-8">
                                <img
                                    src={Face}
                                    style={{
                                        margin: "auto",

                                        width: "300px",
                                        height: "200px",
                                        border: "none"

                                    }}

                                    className="img-fluid img-thumbnail"
                                    id="FrontNidPic"
                                    alt=""
                                />
                            </div>

                            <div className="col-sm-4">
                                <Link className="imTwoBtn" onClick={()=>this.typeVerification("FACE")} style={{ color: "#fff", borderRadius: "50px", textDecoration: "none" }}><i class="fas fa-walking"></i> Get Start</Link>
                            </div>
                        </div>


                    </div>

                </div>
                <hr />

                <div className=" row d-flex justify-content-center align-items-center mt-3" style={{ paddingTop: "70px" }}>
                    <div className="col-sm-6 " style={{ paddingLeft: "50px" }}>
                        <div>
                            <h3 className="" style={{ color: "#099e96" }}><i class="fas fa-fingerprint"></i> Fingerprint Validation</h3>
                        </div>
                        <hr />

                        <div>
                            <p className="text-muted">
                                <span style={{ color: "green", fontSize: "20px" }}>Fingerprint </span>recognition allows a person to be verified or identified through the analysis and comparison of his or her finger dermal ridges. <span style={{ color: "green", fontSize: "20px" }}>Fingerprint recognition</span> was one of the first techniques used for automatically identifying people and today is still one of the most popular and effective <span style={{ color: "green", fontSize: "20px" }}>biometric</span> techniques.
                            </p>
                        </div>


                    </div>
                    <div className="col-sm-6 text-center" >

                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-sm-8">
                                <img
                                    src={Finger}
                                    style={{
                                        margin: "auto",

                                        width: "300px",
                                        height: "200px",
                                        border: "none",

                                    }}

                                    className="img-fluid img-thumbnail"
                                    id="FrontNidPic"
                                    alt=""
                                />
                            </div>
                            <div className="col-sm-4">
                                <Link className="imTwoBtn" onClick={()=>this.typeVerification("FINGER")} style={{ color: "#fff", borderRadius: "50px", textDecoration: "none" }}><i class="fas fa-walking"></i> Get Start</Link>
                            </div>
                        </div>


                    </div>

                </div>
                <hr />

            </div>
        )
    }
}

export default withRouter(NidDecision);
