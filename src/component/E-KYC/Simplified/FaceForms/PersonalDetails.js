import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NotificationManager } from "react-notifications";

export class PersonalDetails extends Component {
    state = {
        applicantName:JSON.parse(localStorage.getItem('NidImages')).OcrData["Name English"],
        applicantNameBangla:JSON.parse(localStorage.getItem('NidImages')).OcrData["Name Bangla"],
        applicantDob:JSON.parse(localStorage.getItem('NidImages')).OcrData.DOB,
        applicantDobDate: '',
        applicantNidNo:JSON.parse(localStorage.getItem('NidImages')).OcrData.id,
        motherName: '',
        motherNameBangla:JSON.parse(localStorage.getItem('NidImages')).OcrData.Mother,
        fatherName: '',
        fatherNameBangla:JSON.parse(localStorage.getItem('NidImages')).OcrData.Father,
        spouseName: '',
        gender: '',
        profession: '',
        mobileNumber: '',
        presentAddress: '',
        permanentAddress: '',
        permanentAddressBangla:JSON.parse(localStorage.getItem('NidImages')).OcrData.Address
    }

    componentDidMount() {
        if ('NidImages' in localStorage ){
            let data = JSON.parse(localStorage.getItem('NidImages'));
            console.log("All Nid Data",data.OcrData);
            this.setState({
                applicantName: data.OcrData["Name English"],
                applicantNameBangla:data.OcrData["Name Bangla"],
                applicantDob: data.OcrData.DOB,
                applicantNidNo: data.OcrData.id,
                motherName: "",
                motherNameBangla: data.OcrData.Mother,
                fatherName: "",
                fatherNameBangla:data.OcrData.Father,
                spouseName: "",
                gender: "",
                profession: "",
                mobileNumber: "",
                presentAddress: "",
                permanentAddress: "",
                permanentAddressBangla: data.OcrData.Address
            });
        }
        if ('PersonalDetails' in localStorage) {
            let data = JSON.parse(localStorage.getItem('PersonalDetails'));
            // console.log(data);

            this.setState({
                applicantName: data.applicantName,
                applicantNameBangla:data.applicantNameBangla,
                applicantDob: data.applicantDob,
                applicantNidNo: data.applicantNidNo,
                motherName: data.motherName,
                motherNameBangla: data.motherNameBangla,
                fatherName: data.fatherName,
                fatherNameBangla:data.fatherNameBangla,
                spouseName: data.spouseName,
                gender: data.gender,
                profession: data.profession,
                mobileNumber: data.mobileNumber,
                presentAddress: data.presentAddress,
                permanentAddress: data.permanentAddress,
                permanentAddressBangla: data.permanentAddressBangla
            })
        }
        
    }




    onChange = e => this.setState({ [e.target.name]: e.target.value });

    continue = e => {
        let { applicantName,applicantNameBangla, applicantDob,applicantDobDate, applicantNidNo, motherName,motherNameBangla, fatherName,fatherNameBangla, spouseName, gender, profession, mobileNumber, presentAddress, permanentAddress,permanentAddressBangla } = this.state;
        e.preventDefault();


        // if(applicantName === ''){
        //     let applicantNameMessage = "Please Provide Applicant Name";
        //     NotificationManager.warning(applicantNameMessage, "Warning", 5000);
        //     return;
        // }

        // if(applicantDob === ''){
        //     let applicantDobMessage = "Please Provide Applicant Date Of Birth";
        //     NotificationManager.warning(applicantDobMessage, "Warning", 5000);
        //     return;
        // }

        // if(applicantNidNo === '' ){
        //     let applicantNidNoMessage = 'Please Provide Applicant Nid No'; 
        //     NotificationManager.warning(applicantNidNoMessage, "Warning", 5000);
        //     return;
        // }else if(applicantNidNo.length < 10 ){
        //     let NidLengthError1 = "Applicant NID No must be 10, 13 & 17 characters long1";
        //     NotificationManager.warning(NidLengthError1, "Warning", 5000);
        //     return;
        // }else if(applicantNidNo.length >= 11 && applicantNidNo.length <= 12 ){
        //     let NidLengthError2 = "Applicant NID No must be 10, 13 & 17 characters long2";
        //     NotificationManager.warning(NidLengthError2, "Warning", 5000);
        //     return;
        // }else if(applicantNidNo.length >= 14 && applicantNidNo.length <= 16 ){
        //         let NidLengthError3 = "Applicant NID No must be 10, 13 & 17 characters long2";
        //         NotificationManager.warning(NidLengthError3, "Warning", 5000);
        //         return;
        // }else if(applicantNidNo.length > 17){
        //     let NidLengthError4 = "Applicant NID No must be 10, 13 & 17 characters long3";
        //     NotificationManager.warning(NidLengthError4, "Warning", 5000);
        //     return;
        // }

        // if(motherName === ''){
        //     let motherNameMessage = "Please Provide Applicant's Mother Name";
        //     NotificationManager.warning(motherNameMessage, "Warning", 5000);
        //     return;
        // }

        // if(fatherName === ''){
        //     let fatherNameMessage ="Please Provide Applicant's Father Name";
        //     NotificationManager.warning(fatherNameMessage, "Warning", 5000);
        //     return;
        // }

        // if(gender === ''){
        //     let genderMessage = 'Please Select Gender';
        //     NotificationManager.warning(genderMessage, "Warning", 5000);
        //     return;
        // }

        // if(profession === ""){
        //     let professionMessage = "Please Provide Applicant Profession";
        //     NotificationManager.warning(professionMessage, "Warning", 5000);
        //     return;
        // }

        // if(mobileNumber === ""){
        //     let mobileNumberMessage = "Please Provide Applicant Mobile Number";
        //     NotificationManager.warning(mobileNumberMessage, "Warning", 5000);
        //     return;
        // }else if( mobileNumber.length < 11){
        //     let mobileNumberLenth = "Mobile Number Must be 11 digits";
        //     NotificationManager.warning(mobileNumberLenth, "Error", 5000);
        //     return;
        // }else if(mobileNumber.length <=1 0){
        // let mobileNumberLenth1 = "Mobile Number Must be 11 digits";
        //NotificationManager.warning(mobileNumberLenth1, "Error", 5000);
        //return;
        // }

        // if(presentAddress === ''){
        //     let presentAddressMessage = "Please Provide Applicant Present Address";
        //     NotificationManager.warning(presentAddressMessage, "Warning", 5000);
        //     return;
        // }

        // if(permanentAddress === ''){
        //     let permanentAddressMessage = "Please Provide Applicant Permanent Address";
        //     NotificationManager.warning(permanentAddressMessage, "Warning", 5000);
        //     return;
        // }

        let parts= applicantDob.split('-');
        let convertDob = new Date(parts[0], parts[1], parts[2]); 
        const personal = {
            applicantName,
            applicantNameBangla,
            applicantDob,
            applicantDobDate:convertDob,
            applicantNidNo,
            motherName,
            motherNameBangla,
            fatherName,
            fatherNameBangla,
            spouseName,
            gender,
            profession,
            mobileNumber,
            presentAddress,
            permanentAddress,
            permanentAddressBangla
        }

        localStorage.setItem("PersonalDetails", JSON.stringify(personal));

        this.props.history.push('/dashboard/nominee');
    };

    back = e => {
        e.preventDefault();
        this.props.history.push('/dashboard/capture-face');
    }

    render() {
        let { applicantName,applicantNameBangla, applicantDob, applicantNidNo, motherName, motherNameBangla, fatherName,fatherNameBangla, spouseName, gender, profession, mobileNumber, presentAddress, permanentAddress,permanentAddressBangla } = this.state;
        console.log("================",applicantNidNo)
        //console.log("nidno", applicantNidNo.length);
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
                                <input style={{ borderRadius: "50px" }} type="text" value={applicantName} name='applicantName' onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Name" />
                            </div>

                             {/* Applicant's Name  Bangla*/}
                             <div className="form-group">
                                <label htmlFor="">Applicant's Name (Bangla)</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={applicantNameBangla} name='applicantNameBangla' onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Name (Bangla)" />
                            </div>

                            {/* Applicant's Date Of Birth */}
                            <div className="form-group">
                                <label htmlFor="">Applicant's Date of Birth</label>
                                <input style={{ borderRadius: "50px" }} type="date" value={applicantDob} name='applicantDob' onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="dd-mm-YYYY" />
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
                                <input style={{ borderRadius: "50px" }} type="text" value={applicantNidNo} name='applicantNidNo' onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Nid No" />
                            </div>

                            {/* Gender */}
                            <div className='form-group '>
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
                            <div className="form-group ">
                                <label htmlFor="">Profession</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={profession} name="profession" onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Profession" />

                            </div>

                           
                        
                        </div>


                        <div className="col-sm-4 imTwo">
                            <div className="im" style={{ color: "green" }}>
                                <p>Relations</p>
                            </div>
                            {/* Mother Name */}
                            <div className="form-group">
                                <label htmlFor="">Mother's Name</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={motherName} name='motherName' onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mother's Name" />
                                {/* <small className="form-text text-muted">Enter Mother's Name</small> */}
                            </div>

                            {/* Mother Name Bangla*/}
                            <div className="form-group">
                                <label htmlFor="">Mother's Name (Bangla)</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={motherNameBangla} name='motherNameBangla' onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mother's Name (Bangla)" />
                                {/* <small className="form-text text-muted">Enter Mother's Name</small> */}
                            </div>

                                {/* Father Name */}
                            <div className="form-group ">
                                <label htmlFor="">Father's Name</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={fatherName} name='fatherName' onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Father's Name" />
                                {/* <small className="form-text text-muted">Enter Father's Name</small> */}
                            </div>
                            { /* Father Name Bangla*/}
                            <div className="form-group ">
                                <label htmlFor="">Father's Name (Bangla) </label>
                                <input style={{ borderRadius: "50px" }} type="text" value={fatherNameBangla} name='fatherNameBangla' onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Father's Name (Bangla)" />
                                {/* <small className="form-text text-muted">Enter Father's Name</small> */}
                            </div>


                            {/* Spouse Name */}
                            <div className="form-group ">
                                <label htmlFor="">Spouse Name</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={spouseName} name="spouseName" onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Spouse Name" />
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
                                <input style={{ borderRadius: "50px" }} type="text" value={mobileNumber} name="mobileNumber" onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mobile Phone Number" />

                            </div>

                            {/* Present Address */}
                            <div className="form-group">
                                <label htmlFor="">Present Address</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={presentAddress} name="presentAddress" onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Provide Present Address" />

                            </div>

                            {/* Permanent Address */}
                            <div className="form-group">
                                <label htmlFor="">Permanent Address</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={permanentAddress} name="permanentAddress" onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Provide Permanent Address" />

                            </div>

                            {/* Permanent Address Bangla */}
                            <div className="form-group">
                                <label htmlFor="">Permanent Address (Bangla)</label>
                                <input style={{ borderRadius: "50px" }} type="text" value={permanentAddressBangla} name="permanentAddressBangla" onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Provide Permanent Address(Bangla)" />

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
