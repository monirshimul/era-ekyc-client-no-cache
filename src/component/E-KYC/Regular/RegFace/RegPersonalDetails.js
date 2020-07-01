import React, { Component } from 'react';


export class RegPersonalDetails extends Component {
    
    continue = e => {
        const { values } = this.props;
        e.preventDefault();
       
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        const { values, handleChange } = this.props;
        return (
            <div className="container">

            <div className="col-sm-12" style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)" }}>

                <div className="row d-flex justify-content-center divBg">
                    <h3 className="text-center pt-3">Enter Personal Details</h3>
                </div>

                <form className="row d-flex justify-content-around" >

                    <div className="col-sm-4 imTwo">
                        <div className="im" style={{ color: "green" }}>
                            <p>Individuals</p>
                        </div>
                        {/* Applicant's Name */}
                        <div className="form-group">
                            <label htmlFor="">Applicant's Name</label>
                            <input style={{ borderRadius: "50px" }} type="text" value={values.applicantName} name='applicantName' onChange={handleChange('applicantName')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Name" />
                        </div>

                         {/* Applicant's Name  Bangla*/}
                         <div className="form-group">
                            <label htmlFor="">Applicant's Name (Bangla)</label>
                            <input style={{ borderRadius: "50px" }} type="text" value={values.applicantNameBangla} name='applicantNameBangla' onChange={handleChange('applicantNameBangla')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Name (Bangla)" />
                        </div>

                        {/* Applicant's Date Of Birth */}
                        <div className="form-group">
                            <label htmlFor="">Applicant's Date of Birth</label>
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
                            <label htmlFor="">Applicant's Nid No</label>
                            <input style={{ borderRadius: "50px" }} type="text" value={values.applicantNidNo} name='applicantNidNo' onChange={handleChange('applicantNidNo')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Nid No" />
                        </div>

                        {/* Gender */}
                        <div className='form-group '>
                            <label htmlFor="">Gender</label>
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
                            <label htmlFor="">Profession</label>
                            <input style={{ borderRadius: "50px" }} type="text" value={values.profession} name="profession" onChange={handleChange('profession')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Profession" />

                        </div>     

                         {/* Monthly Income */}
                            <div className="form-group ">
                                <label htmlFor="">Monthly Income</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={values.monthlyIncome} name="monthlyIncome" onChange={handleChange('monthlyIncome')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Monthly Income" />

                            </div>

                                      {/* Source of Fund */}
                                      <div className="form-group ">
                                <label htmlFor="">Source Of Fund</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={values.sourceOfFund} name="sourceOfFund" onChange={handleChange('sourceOfFund')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Provide Source of Fund" />

                            </div>


                                      {/* Nationality */}
                                      <div className="form-group ">
                                <label htmlFor="">Nationality</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={values.nationality} name="nationality" onChange={handleChange('nationality')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Provide Nationality" />

                            </div>

                                      {/* Tin No */}
                                      <div className="form-group ">
                                <label htmlFor="">Tin No</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={values.tin} name="tin" onChange={handleChange('tin')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Provide Tin No" />

                            </div>                  
                    
                    </div>


                    <div className="col-sm-4 imTwo">
                        <div className="im" style={{ color: "green" }}>
                            <p>Relations</p>
                        </div>
                        {/* Mother Name */}
                        <div className="form-group">
                            <label htmlFor="">Mother's Name</label>
                            <input style={{ borderRadius: "50px" }} type="text" value={values.motherName} name='motherName' onChange={handleChange('motherName')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mother's Name" />
                            {/* <small className="form-text text-muted">Enter Mother's Name</small> */}
                        </div>

                        {/* Mother Name Bangla*/}
                        <div className="form-group">
                            <label htmlFor="">Mother's Name (Bangla)</label>
                            <input style={{ borderRadius: "50px" }} type="text" value={values.motherNameBangla} name='motherNameBangla' onChange={handleChange('motherNameBangla')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mother's Name (Bangla)" />
                            {/* <small className="form-text text-muted">Enter Mother's Name</small> */}
                        </div>

                            {/* Father Name */}
                        <div className="form-group ">
                            <label htmlFor="">Father's Name</label>
                            <input style={{ borderRadius: "50px" }} type="text" value={values.fatherName} name='fatherName' onChange={handleChange('fatherName')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Father's Name" />
                            {/* <small className="form-text text-muted">Enter Father's Name</small> */}
                        </div>
                        { /* Father Name Bangla*/}
                        <div className="form-group ">
                            <label htmlFor="">Father's Name (Bangla) </label>
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
                    <div className="col-sm-4 imTwo">

                        <div className="im" style={{ color: "green" }}>
                            <p>Contact</p>
                        </div>
                        {/* Mobile Phone Number */}
                        <div className="form-group">
                            <label htmlFor="">Mobile Phone Number</label>
                            <input style={{ borderRadius: "50px" }} type="text" value={values.mobileNumber} name="mobileNumber" onChange={handleChange('mobileNumber')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mobile Phone Number" />

                        </div>

                        {/* Present Address */}
                        <div className="form-group">
                            <label htmlFor="">Present Address</label>
                            <input style={{ borderRadius: "50px" }} type="text" value={values.presentAddress} name="presentAddress" onChange={handleChange('presentAddress')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Provide Present Address" />

                        </div>

                        {/* Permanent Address */}
                        <div className="form-group">
                            <label htmlFor="">Permanent Address</label>
                            <input style={{ borderRadius: "50px" }} type="text" value={values.permanentAddress} name="permanentAddress" onChange={handleChange('permanentAddress')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Provide Permanent Address" />

                        </div>

                        {/* Permanent Address Bangla */}
                        <div className="form-group">
                            <label htmlFor="">Permanent Address (Bangla)</label>
                            <input style={{ borderRadius: "50px" }} type="text" value={values.permanentAddressBangla} name="permanentAddressBangla" onChange={handleChange('permanentAddressBangla')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Provide Permanent Address(Bangla)" />

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

export default RegPersonalDetails;