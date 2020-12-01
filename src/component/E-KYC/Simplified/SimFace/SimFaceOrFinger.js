import React, { Component } from 'react';
import Face from '../images/face-scan.svg';
import Finger from '../images/fingerP.svg';
import { Link,withRouter } from 'react-router-dom';


export class SimFaceOrFinger extends Component {
   

    typeVerification = (val)=>{
        //e.preventDefault();
        
        //const obj= { type: val };
        if(val === 'FACE'){
            this.props.history.push('/dashboard/simplified-face');
        }else{
            this.props.history.push('/dashboard/simplified-finger');
        }
        // this.props.history.push("/dashboard/nid-images");
    }
    render() {
        return (
            // style = {{ border: "1px solid red" }}
            <div className="container" >
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-12">
                        <h2 className="im" style={{color:"green"}}>Simplified E-KYC</h2>
                    </div>

                </div>
                <div className=" row d-flex justify-content-center align-items-center mt-5" >
                    <div className="col-sm-6" >
                        <div>
                            <h3 className="" style={{ color: "#099e96" }}><i class="fas fa-user-circle"></i> Facial Recognition</h3>
                        </div>
                        <hr />

                        <div>
                            <p className="text-muted" style={{ paddingLeft: "25px" }} >
                                <span style={{ color: "green", fontSize: "20px" }}>A facial recognition</span> system is a technology capable of identifying or verifying a person from a digital image or a video frame from a video source. <span style={{ color: "green", fontSize: "20px" }}>Face verification</span> is the task of comparing a candidate face to another, and verifying whether it is a match. It is a one-to-one mapping: you have to check if this person is the correct one.
                            </p>
                        </div>


                    </div>
                    <div className="col-sm-6 text-center" >
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
                        {/* <i class="fas fa-long-arrow-alt-right" style={{ color: "green" }}></i> */}
                        {/* <i class="fas fa-walking"></i> */}

                        {/* <button className="b" type="submit" style={{ border: "none" }} ><i class="fas fa-walking"></i> Get Start</button> */}

                        <Link className="imTwoBtn"  onClick={()=>this.typeVerification("FACE")} style={{ color: "#fff", borderRadius: "50px", textDecoration: "none" }}><i class="fas fa-walking"></i> Get Start</Link>
                        <hr />
                    </div>
                            
                </div>

                <div className=" row d-flex justify-content-center align-items-center mt-3" style={{ paddingTop: "70px" }}>
                    <div className="col-sm-6 " >
                        <div>
                            <h3 className="" style={{ color: "#099e96" }}><i class="fas fa-fingerprint"></i> Fingerprint Validation</h3>
                        </div>
                        <hr />

                        <div>
                            <p className="text-muted" style={{ paddingLeft: "25px" }}>
                                <span style={{ color: "green", fontSize: "20px" }}>Fingerprint </span>recognition allows a person to be verified or identified through the analysis and comparison of his or her finger dermal ridges. <span style={{ color: "green", fontSize: "20px" }}>Fingerprint recognition</span> was one of the first techniques used for automatically identifying people and today is still one of the most popular and effective <span style={{ color: "green", fontSize: "20px" }}>biometric</span> techniques.
                            </p>
                        </div>


                    </div>
                    <hr />
                    <div className="col-sm-6 text-center" >
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
                        {/* <i class="fas fa-long-arrow-alt-right" style={{ color: "green" }}></i> */}

                        <Link className="imTwoBtn" onClick={()=>this.typeVerification("FINGER")} style={{ color: "#fff", borderRadius: "50px", textDecoration: "none" }}><i class="fas fa-walking"></i> Get Start</Link>
                        <hr />




                    </div>

                    <hr />


                </div>




            </div>
        )
    }
}

export default withRouter(SimFaceOrFinger);
