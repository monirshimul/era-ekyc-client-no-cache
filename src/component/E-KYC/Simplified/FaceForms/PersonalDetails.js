import React, { Component } from 'react'

export class PersonalDetails extends Component {
    state={
        applicantName: '',
        motherName: '',
        fatherName: '',
        spouseName: '',
        gender: '',
        profession: '',
        mobileNumber: '',
        presentAddress: '',
        permanentAddress: ''
    }
    
    componentDidMount(){
        if('PersonalDetails' in localStorage){
            let data = JSON.parse(localStorage.getItem('PersonalDetails'));
           // console.log(data);
            this.setState({ 
                applicantName: data.applicantName,
                motherName: data.motherName,
                fatherName: data.fatherName,
                spouseName: data.spouseName,
                gender: data.gender,
                profession: data.profession,
                mobileNumber: data.mobileNumber,
                presentAddress: data.presentAddress,
                permanentAddress: data.permanentAddress
            });
       }
    }




    onChange = e => this.setState({[e.target.name]: e.target.value});

    continue = e => {
        let {applicantName,motherName,fatherName,spouseName,gender,profession,mobileNumber,presentAddress,permanentAddress} = this.state;
        e.preventDefault();
        const personal = {
            applicantName,
            motherName,
            fatherName,
            spouseName,
            gender,
            mobileNumber,
            presentAddress,
            permanentAddress
        }

        localStorage.setItem("PersonalDetails", JSON.stringify(personal));

        this.props.history.push('/dashboard/nominee');
    };

    back = e => {
        e.preventDefault();
        this.props.history.push('/dashboard/capture-face');
    }

    render() {
        let {applicantName,motherName,fatherName,spouseName,gender,profession,mobileNumber,presentAddress,permanentAddress} = this.state;
        return (
            <div className="row d-flex justify-content-center my-5">
            <div className="col-sm-12">
                <div className="col " style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)" }}>
                    <div className="col">
                        <div className="divBg">
                            <h3 className="text-center pt-3">Enter Personal Details</h3>
                        </div>

                        <form className="row d-flex justify-content-around" >
                            {/* Applicant's Name */}
                            <div className="form-group col-sm-4">
                                <label htmlFor="">Applicant's Name</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={applicantName} name='applicantName' onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Name" />
                            </div>

                            {/* Mother Name */}
                            <div className="form-group col-sm-4">
                                <label htmlFor="">Mother's Name</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={motherName} name='motherName' onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mother's Name" />
                                {/* <small className="form-text text-muted">Enter Mother's Name</small> */}
                            </div>

                            {/* Father Name */}
                            <div className="form-group col-sm-4">
                                <label htmlFor="">Father's Name</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={fatherName} name='fatherName' onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Father's Name" />
                                {/* <small className="form-text text-muted">Enter Father's Name</small> */}
                            </div>

                            {/* Spouse Name */}
                            <div className="form-group col-sm-4">
                                <label htmlFor="">Spouse Name</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={spouseName} name="spouseName" onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Spouse Name" />
                                {/* <small className="form-text text-muted">Enter Spouse Name</small> */}
                            </div>

                            {/* Gender */}
                            <div className='form-group col-sm-4'>
                                <label htmlFor="">Gender</label>
                                <select
                                    style={{ borderRadius: "50px" }}
                                    className='custom-select'
                                    value={gender}
                                    name="gender"
                                    onChange={this.onChange}
                                >
                                    <option value='' disabled>Gender</option>
                                    <option value='M'>Male</option>
                                    <option value='F'>Female</option>
                                    <option value='T'>Other</option>
                                </select>
                            </div>

                            {/* Profession */}
                            <div className="form-group col-sm-4">
                                <label htmlFor="">Profession</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={profession} name="profession" onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Profession" />

                            </div>

                            {/* Mobile Phone Number */}
                            <div className="form-group col-sm-4">
                                <label htmlFor="">Mobile Phone Number</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={mobileNumber} name="mobileNumber" onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mobile Phone Number" />

                            </div>

                            {/* Present Address */}
                            <div className="form-group col-sm-4">
                                <label htmlFor="">Present Address</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={presentAddress} name="presentAddress" onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Provide Present Address" />

                            </div>

                            {/* Permanent Address */}
                            <div className="form-group col-sm-4">
                                <label htmlFor="">Permanent Address</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={permanentAddress} name="permanentAddress" onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Provide Permanent Address" />

                            </div>
                            <div className="d-flex justify-content-center col-sm-3" >

                                <div className="b mb-3" onClick={this.back} >Back</div>&nbsp; &nbsp;
                    <div className="b mb-3" onClick={this.continue} >Next</div>
                            </div>

                        </form>
                    </div>
                </div>




            </div>
        </div>

        )
    }
}

export default PersonalDetails;
