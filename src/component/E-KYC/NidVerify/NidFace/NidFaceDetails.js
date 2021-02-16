import React, { Component } from 'react';
import style from './NidFaceDetails.module.css';
import Face from "../../Simplified/images/face.svg";

class NidFaceDetails extends Component {
    render() {
        const { values } = this.props;
        console.log(values.applicantName)
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
                        <div>
                            <h5 className="text-center mt-2" style={{ textTransform: "uppercase", color: "green" }}>{values.applicantName}</h5>
                        </div>
                    </div>

                </div>

                <div className="imTwoWhite row d-flex justify-content-center pt-5">
                    <div className="col-sm-4 mt-5 imTwoWhite">
                        <h5 className="im" style={{ color: "green", cursor: "text" }}>Details</h5>
                        <hr />
                        <small className="" style={{ fontSize: "14px" }}>
                            <span style={{ color: "green", fontSize: "14px" }}>Applicant's Nid No :</span> {values.applicantNidNo}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Applicant's Name :</span> {values.applicantName}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Applicant's Name Bangla :</span> {values.applicantNameBangla}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Mother's Name :</span> {values.motherName}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Mother's Name Bangla :</span> {values.motherNameBangla}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Father's Name :</span> {values.fatherName}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Father's Name Bangla :</span> {values.fatherNameBangla}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Spouse Name :</span> {values.spouseName}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Profession :</span> {values.profession}<br />



                        </small>
                    </div>
                    <div className="col-sm-4 mt-5 imTwoWhite">
                        <h5 className="im" style={{ color: "green", cursor: "text" }}>Present Address</h5>
                        <hr />
                        <small className="" style={{ fontSize: "14px" }}>
                            <span style={{ color: "green", fontSize: "14px" }}>Mouza Or Moholla :</span> {values.perAdditionalMouzaOrMoholla + `${values.perAdditionalMouzaOrMohollaEn ? `(${values.perAdditionalMouzaOrMohollaEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Village Or Road :</span> {values.perAdditionalVillageOrRoad + `${values.perAdditionalVillageOrRoadEn ? `(${values.perAdditionalVillageOrRoadEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>City Corp. :</span> {values.perCityCorporationOrMunicipality + `${values.perCityCorporationOrMunicipalityEn ? `(${values.perCityCorporationOrMunicipalityEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>District :</span> {values.perDistrict + `${values.perDistrictEn ? `(${values.perDistrictEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>District Code :</span> {values.perDistrictCode}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Division :</span> {values.perDivision + `${values.perDivisionEn ? `(${values.perDivisionEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Home Or Holding No. :</span> {values.perHomeOrHoldingNo + `${values.perHomeOrHoldingNoEn ? `(${values.perHomeOrHoldingNoEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Post Office :</span> {values.perPostOffice + `${values.perPostOfficeEn ? `(${values.perPostOfficeEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Postal Code :</span> {values.perPostalCode + `${values.perPostalCodeEn ? `(${values.perPostalCodeEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Region :</span> {values.perRegion + `${values.perRegionEn ? `(${values.perRegionEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>RMO :</span> {values.perRmo + `${values.perRmoEn ? `(${values.perRmoEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward :</span> {values.perUnionOrWard + `${values.perUnionOrWardEn ? `(${values.perUnionOrWardEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward Code :</span> {values.perUnionOrWardCode}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Upozila :</span> {values.perUpozila + `${values.perUpozilaEn ? `(${values.perUpozilaEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Upozila Code :</span> {values.perUpozilaCode}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Ward For Union Porishod :</span> {values.perWardForUnionPorishod + `${values.perWardForUnionPorishodEn ? `(${values.perWardForUnionPorishodEn})` : ""}`}<br />
                        </small>
                    </div>
                    <div className="col-sm-4 mt-5 imTwoWhite">
                        <h5 className="im" style={{ color: "green", cursor: "text" }}>Permanent Address</h5>
                        <hr />
                        <small className="" style={{ fontSize: "14px" }}>
                            <span style={{ color: "green", fontSize: "14px" }}>Mouza Or Moholla :</span> {values.preAdditionalMouzaOrMoholla + `${values.preAdditionalMouzaOrMohollaEn ? `(${values.preAdditionalMouzaOrMohollaEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Village Or Road :</span> {values.preAdditionalVillageOrRoad + `${values.preAdditionalVillageOrRoadEn ? `(${values.preAdditionalVillageOrRoadEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>City Corp. :</span> {values.preCityCorporationOrMunicipality + `${values.preCityCorporationOrMunicipalityEn ? `(${values.preCityCorporationOrMunicipalityEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>District :</span> {values.preDistrict + `${values.preDistrictEn ? `(${values.preDistrictEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>District Code :</span> {values.preDistrictCode}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Division :</span> {values.preDivision + `${values.preDivisionEn ? `(${values.preDivisionEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Home Or Holding No. :</span> {values.preHomeOrHoldingNo + `${values.preHomeOrHoldingNoEn ? `(${values.preHomeOrHoldingNoEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Post Office :</span> {values.prePostOffice + `${values.prePostOfficeEn ? `(${values.prePostOfficeEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Postal Code :</span> {values.prePostalCode + `${values.prePostalCodeEn ? `(${values.prePostalCodeEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Region :</span> {values.preRegion + `${values.preRegionEn ? `(${values.preRegionEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>RMO :</span> {values.preRmo + `${values.preRmoEn ? `(${values.preRmoEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward :</span> {values.preUnionOrWard + `${values.preUnionOrWardEn ? `(${values.preUnionOrWardEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward Code :</span> {values.preUnionOrWardCode}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Upozila :</span> {values.preUpozila + `${values.preUpozilaEn ? `(${values.preUpozilaEn})` : ""}`}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Upozila Code :</span> {values.preUpozilaCode}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Ward For Union Porishod :</span> {values.preWardForUnionPorishod + `${values.preWardForUnionPorishodEn ? `(${values.preWardForUnionPorishodEn})` : ""}`}<br />
                        </small>
                    </div>
                </div>
            </div>
        )
    }
}

export default NidFaceDetails
