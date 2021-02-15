import React, { Component } from 'react';
import style from './NidFaceDetails.module.css';
import Face from "../../Simplified/images/face.svg";

class NidFaceDetails extends Component {
    render() {
        const { values } = this.props;
        return (
            <div className="container">
                <div className={`row d-flex justify-content-center imTwoWhite ${style.bgForUser}`} style={{ position: "relative" }}>
                    <div className="animated zoomIn" style={{
                        position: "absolute",
                        bottom: "-70px"


                    }}>
                        <img

                            src={values.ecImage ? (values.flag + values.ecImage) : Face}
                            style={{

                                width: "150px",
                                height: "150px",
                                borderRadius: "50%"


                            }}
                            value={values.ecImage}
                            className={`img-thumbnail ${style.imgHover}`}
                            id="imagePicture"
                            alt="cameraPicture"
                        />


                    </div>

                </div>

                <div className="imTwoWhite row d-flex justify-content-center pt-5">
                    <div className="col-sm-4 text-center mt-5">
                        <h5 className="im" style={{ color: "green", cursor: "text" }}>Hello</h5>
                        <hr />
                        <h5>Hello</h5>
                    </div>
                    <div className="col-sm-4 text-center mt-5">
                        <h5 className="im" style={{ color: "green", cursor: "text" }}>Hello</h5>
                        <hr />
                        <h5>Hello</h5>
                    </div>
                    <div className="col-sm-4 text-center mt-5">
                        <h5 className="im" style={{ color: "green", cursor: "text" }}>Hello</h5>
                        <hr />
                        <h5>Hello</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default NidFaceDetails
