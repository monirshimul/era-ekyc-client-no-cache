import React, { Component } from 'react'
import { NotificationManager } from "react-notifications";


const Joi = require('@hapi/joi');


export class PersonalDetails extends Component {

    schema = Joi.object({
        applicantName: Joi.string().required(),
        applicantNameBangla: Joi.string().required(),
        applicantDob: Joi.string().required(),
        applicantNidNo: Joi.string().required(),
        gender: Joi.string().required(),
        profession: Joi.string().required(),
        operatorType:Joi.string().required(),
        motherName: Joi.string().required(),
        motherNameBangla: Joi.string().required(),
        fatherName: Joi.string().required(),
        fatherNameBangla: Joi.string().required(),
        perDistrict: Joi.string().required(),
        perDistrictEn: Joi.string().required(),
        preDistrict: Joi.string().required(),
        preDistrictEn: Joi.string().required(),
        perUnionOrWard: Joi.string().required(),
        perUnionOrWardEn: Joi.string().required(),
        preUnionOrWard: Joi.string().required(),
        preUnionOrWardEn: Joi.string().required(),
        perUpozila: Joi.string().required(),
        perUpozilaEn: Joi.string().required(),
        preUpozila: Joi.string().required(),
        preUpozilaEn: Joi.string().required()
    
    })

    continue = e => {
        const { values } = this.props;
        e.preventDefault();
        // const obj={
        //     applicantName: values.applicantName,
        //     motherName: values.motherName,
        //     fatherName: values.fatherName,
        //     spouseName: values.spouseName,
        //     gender: values.gender,
        //     profession: values.profession,
        //     mobileNumber: values.mobileNumber,
        //     presentAddress: values.presentAddress,
        //     permanentAddress: values.permanentAddress,
        // };
        // localStorage.setItem("PersonalDetailsJoin", JSON.stringify(obj));

        let data = {
            applicantName: values.applicantName,
            applicantNameBangla: values.applicantNameBangla,
            applicantDob: values.applicantDob,
            applicantNidNo: values.applicantNidNo,
            gender: values.gender,
            profession: values.profession,
            operatorType: values.operatorType,
            motherName: values.motherName,
            motherNameBangla: values.motherNameBangla,
            fatherName: values.fatherName,
            fatherNameBangla: values.fatherNameBangla,
            perDistrict: values.perDistrict,
            perDistrictEn: values.perDistrictEn,
            preDistrict: values.preDistrict,
            preDistrictEn: values.preDistrictEn,
            perUnionOrWard: values.perUnionOrWard,
            perUnionOrWardEn: values.perUnionOrWardEn,
            preUnionOrWard: values.preUnionOrWard,
            preUnionOrWardEn: values.preUnionOrWardEn,
            perUpozila: values.perUpozila,
            perUpozilaEn: values.perUpozilaEn,
            preUpozila: values.preUpozila,
            preUpozilaEn: values.preUpozilaEn
        }

        try {
            // const validationValue = await this.schema.validateAsync(data);
            // console.log("validationValue", validationValue)
            this.props.nextStep();
        } catch (error) {
            NotificationManager.error(error.toString(), "Error", 5000);
            console.log("error====>", error.response)
        }
        
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { values, handleChange } = this.props;
        // console.log(values.fatherName);
        return (
            <div className="container">

                <div className="col-sm-12">

                    <div className="row d-flex justify-content-center divBg">
                        <h3 className="text-center pt-3">Enter Personal Details</h3>
                    </div>

                    <form className="" style={{ fontSize: "10px" }} >
                        <div className="row mb-3 d-flex justify-content-center">
                            <div className="col-sm-6 neoBg">
                                <div className="im" style={{ color: "green" }}>
                                    <p>Individuals</p>
                                </div>
                                {/* Applicant's Name */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Applicant's Name</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.applicantName} name='applicantName' onChange={handleChange('applicantName')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Name" />
                                </div>

                                {/* Applicant's Name  Bangla*/}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Applicant's Name (Bangla)</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.applicantNameBangla} name='applicantNameBangla' onChange={handleChange('applicantNameBangla')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Name (Bangla)" />
                                </div>

                                {/* Applicant's Date Of Birth */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Applicant's Date of Birth</label>
                                    <input style={{ borderRadius: "50px" }} type="date" value={values.applicantDob} name='applicantDob' onChange={handleChange('applicantDob')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="dd-mm-YYYY" />
                                </div>
                                {/* Applicant's Date Of Birth
                        <div className="form-group">
                        <label htmlFor="">Applicant's Date of Birth</label>
                        <DatePicker
                            placeholderText='DD/MM/YYYY'
                            selected={this.state.applicantDob}
                            dateFormat='dd/MM/yyyy'
                            onChange={d => {
                                this.setState({ applicantDob: d });
                            }}
                        />
                        </div> */}

                                {/* Applicant's Nid No */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Applicant's Nid No</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.applicantNidNo} name='applicantNidNo' onChange={handleChange('applicantNidNo')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Nid No" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Applicant's Mobile No.</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.mobileNumber} name='mobileNumber' onChange={handleChange('mobileNumber')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Mobile Number" />
                                </div>

                                {/* Gender */}
                                <div className='form-group '>
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Gender</label>
                                    <select
                                        style={{ borderRadius: "50px" }}
                                        className='custom-select'
                                        value={values.gender}
                                        name="gender"
                                        onChange={handleChange('gender')}
                                    >
                                        <option value='' disabled>Gender</option>
                                        <option value='M'>Male</option>
                                        <option value='F'>Female</option>
                                        <option value='T'>Other</option>
                                    </select>
                                </div>

                                {/* Profession */}
                                <div className="form-group ">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Profession</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.profession} name="profession" onChange={handleChange('profession')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Profession" />

                                </div>
                                {/* Operator Type */}
                                <div className='form-group '>
                                    <label htmlFor="">Operator Type</label>
                                    <select
                                        style={{ borderRadius: "50px" }}
                                        className='custom-select'
                                        value={values.operatorType}
                                        name="operatorType"
                                        onChange={handleChange('operatorType')}
                                    >
                                        <option value='' disabled>---Operator Type---</option>
                                        <option value='M'>Mandatory</option>
                                        <option value='O'>Optional</option>
                                    </select>
                                </div>

                            </div>


                            <div className="col-sm-6 neoBg">
                                <div className="im" style={{ color: "green" }}>
                                    <p>Relations</p>
                                </div>
                                {/* Mother Name */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Mother's Name</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.motherName} name='motherName' onChange={handleChange('motherName')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mother's Name" />
                                    {/* <small className="form-text text-muted">Enter Mother's Name</small> */}
                                </div>

                                {/* Mother Name Bangla*/}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Mother's Name (Bangla)</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.motherNameBangla} name='motherNameBangla' onChange={handleChange('motherNameBangla')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mother's Name (Bangla)" />
                                    {/* <small className="form-text text-muted">Enter Mother's Name</small> */}
                                </div>

                                {/* Father Name */}
                                <div className="form-group ">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Father's Name</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.fatherName} name='fatherName' onChange={handleChange('fatherName')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Father's Name" />
                                    {/* <small className="form-text text-muted">Enter Father's Name</small> */}
                                </div>
                                { /* Father Name Bangla*/}
                                <div className="form-group ">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Father's Name (Bangla) </label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.fatherNameBangla} name='fatherNameBangla' onChange={handleChange('fatherNameBangla')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Father's Name (Bangla)" />
                                    {/* <small className="form-text text-muted">Enter Father's Name</small> */}
                                </div>


                                {/* Spouse Name */}
                                <div className="form-group ">
                                    <label htmlFor="">Spouse Name</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.spouseName} name="spouseName" onChange={handleChange('spouseName')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Spouse Name" />
                                    {/* <small className="form-text text-muted">Enter Spouse Name</small> */}
                                </div>


                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-3 neoBg">

                                <div className="im" style={{ color: "green" }}>
                                    <p>Permanent Address Bangla</p>
                                </div>
                                {/* Mobile Phone Number */}
                                <div className="form-group">
                                    <label htmlFor="">Mouza Or Moholla</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perAdditionalMouzaOrMoholla} name="perAdditionalMouzaOrMoholla" onChange={handleChange('perAdditionalMouzaOrMoholla')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Present Address */}
                                <div className="form-group">
                                    <label htmlFor="">Village Or Road</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perAdditionalVillageOrRoad} name="perAdditionalVillageOrRoad" onChange={handleChange('perAdditionalVillageOrRoad')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Permanent Address */}
                                <div className="form-group">
                                    <label htmlFor="">City Corp. Or Municipality</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perCityCorporationOrMunicipality} name="perCityCorporationOrMunicipality" onChange={handleChange('perCityCorporationOrMunicipality')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Permanent Address Bangla */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>District</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perDistrict} name="perDistrict" onChange={handleChange('perDistrict')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Division</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perDivision} name="perDivision" onChange={handleChange('perDivision')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Home Or Holding No.</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perHomeOrHoldingNo} name="perHomeOrHoldingNo" onChange={handleChange('perHomeOrHoldingNo')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Post Office</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perPostOffice} name="perPostOffice" onChange={handleChange('perPostOffice')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Postal Code</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perPostalCode} name="perPostalCode" onChange={handleChange('perPostalCode')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Region</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perRegion} name="perRegion" onChange={handleChange('perRegion')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">RMO</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perRmo} name="perRmo" onChange={handleChange('perRmo')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Union Or Ward</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perUnionOrWard} name="perUnionOrWard" onChange={handleChange('perUnionOrWard')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Upazila</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perUpozila} name="perUpozila" onChange={handleChange('perUpozila')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Ward For Union Parishad</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perWardForUnionPorishod} name="perWardForUnionPorishod" onChange={handleChange('perWardForUnionPorishod')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>


                            </div>
                            <div className="col-sm-3 neoBg">

                                <div className="im" style={{ color: "green" }}>
                                    <p>Permanent Address English</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Mouza Or Moholla</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perAdditionalMouzaOrMohollaEn} name="perAdditionalMouzaOrMohollaEn" onChange={handleChange('perAdditionalMouzaOrMohollaEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Present Address */}
                                <div className="form-group">
                                    <label htmlFor="">Village Or Road</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perAdditionalVillageOrRoadEn} name="perAdditionalVillageOrRoadEn" onChange={handleChange('perAdditionalVillageOrRoadEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Permanent Address */}
                                <div className="form-group">
                                    <label htmlFor="">City Corp. Or Municipality</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perCityCorporationOrMunicipalityEn} name="perCityCorporationOrMunicipalityEn" onChange={handleChange('perCityCorporationOrMunicipalityEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Permanent Address Bangla */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>District</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perDistrictEn} name="perDistrictEn" onChange={handleChange('perDistrictEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Division</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perDivisionEn} name="perDivisionEn" onChange={handleChange('perDivisionEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Home Or Holding No.</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perHomeOrHoldingNoEn} name="perHomeOrHoldingNoEn" onChange={handleChange('perHomeOrHoldingNoEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Post Office</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perPostOfficeEn} name="perPostOfficeEn" onChange={handleChange('perPostOfficeEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Postal Code</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perPostalCodeEn} name="perPostalCodeEn" onChange={handleChange('perPostalCodeEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Region</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perRegionEn} name="perRegionEn" onChange={handleChange('perRegionEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">RMO</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perRmoEn} name="perRmoEn" onChange={handleChange('perRmoEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Union Or Ward</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perUnionOrWardEn} name="perUnionOrWardEn" onChange={handleChange('perUnionOrWardEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Upazila</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perUpozilaEn} name="perUpozilaEn" onChange={handleChange('perUpozilaEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Ward For Union Parishad</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perWardForUnionPorishodEn} name="perWardForUnionPorishodEn" onChange={handleChange('perWardForUnionPorishodEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                            </div>

                            <div className="col-sm-3 neoBg">

                                <div className="im" style={{ color: "green" }}>
                                    <p>Present Address Bangla</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Mouza Or Moholla</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preAdditionalMouzaOrMoholla} name="preAdditionalMouzaOrMoholla" onChange={handleChange('preAdditionalMouzaOrMoholla')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Prest Address */}
                                <div className="form-group">
                                    <label htmlFor="">Village Or Road</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preAdditionalVillageOrRoad} name="preAdditionalVillageOrRoad" onChange={handleChange('preAdditionalVillageOrRoad')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* premant Address */}
                                <div className="form-group">
                                    <label htmlFor="">City Corp. Or Municipality</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preCityCorporationOrMunicipality} name="preCityCorporationOrMunicipality" onChange={handleChange('preCityCorporationOrMunicipality')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* premant Address Bangla */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>District</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preDistrict} name="preDistrict" onChange={handleChange('preDistrict')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Division</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preDivision} name="preDivision" onChange={handleChange('preDivision')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Home Or Holding No.</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preHomeOrHoldingNo} name="preHomeOrHoldingNo" onChange={handleChange('preHomeOrHoldingNo')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Post Office</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.prePostOffice} name="prePostOffice" onChange={handleChange('prePostOffice')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Postal Code</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.prePostalCode} name="prePostalCode" onChange={handleChange('prePostalCode')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Region</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preRegion} name="preRegion" onChange={handleChange('preRegion')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">RMO</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preRmo} name="preRmo" onChange={handleChange('preRmo')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Union Or Ward</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preUnionOrWard} name="preUnionOrWard" onChange={handleChange('preUnionOrWard')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Upazila</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preUpozila} name="preUpozila" onChange={handleChange('preUpozila')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Ward For Union Parishad</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preWardForUnionPorishod} name="preWardForUnionPorishod" onChange={handleChange('preWardForUnionPorishod')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                            </div>


                            <div className="col-sm-3 neoBg">

                                <div className="im" style={{ color: "green" }}>
                                    <p>Present Address English</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Mouza Or Moholla</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preAdditionalMouzaOrMohollaEn} name="preAdditionalMouzaOrMohollaEn" onChange={handleChange('preAdditionalMouzaOrMohollaEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Present Address */}
                                <div className="form-group">
                                    <label htmlFor="">Village Or Road</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preAdditionalVillageOrRoadEn} name="preAdditionalVillageOrRoadEn" onChange={handleChange('preAdditionalVillageOrRoadEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* premanent Address */}
                                <div className="form-group">
                                    <label htmlFor="">City Corp. Or Municipality</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preCityCorporationOrMunicipalityEn} name="preCityCorporationOrMunicipalityEn" onChange={handleChange('preCityCorporationOrMunicipalityEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* premanent Address Bangla */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>District</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preDistrictEn} name="preDistrictEn" onChange={handleChange('preDistrictEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Division</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preDivisionEn} name="preDivisionEn" onChange={handleChange('preDivisionEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Home Or Holding No.</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preHomeOrHoldingNoEn} name="preHomeOrHoldingNoEn" onChange={handleChange('preHomeOrHoldingNoEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Post Office</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.prePostOfficeEn} name="prePostOfficeEn" onChange={handleChange('prePostOfficeEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Postal Code</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.prePostalCodeEn} name="prePostalCodeEn" onChange={handleChange('prePostalCodeEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Region</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preRegionEn} name="preRegionEn" onChange={handleChange('preRegionEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">RMO</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preRmoEn} name="preRmoEn" onChange={handleChange('preRmoEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Union Or Ward</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preUnionOrWardEn} name="preUnionOrWardEn" onChange={handleChange('preUnionOrWardEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Upazila</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preUpozilaEn} name="preUpozilaEn" onChange={handleChange('preUpozilaEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Ward For Union Parishad</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preWardForUnionPorishodEn} name="preWardForUnionPorishodEn" onChange={handleChange('preWardForUnionPorishodEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                            </div>
                        </div>









                    </form>
                    <hr />
                    <div className="row d-flex justify-content-center">
                        <div className="b mb-3" onClick={this.back} >Back</div>&nbsp; &nbsp;
                <div className="b mb-3" onClick={this.continue} >Next</div>
                    </div>

                </div>





            </div>

        )
    }
}

export default PersonalDetails;
