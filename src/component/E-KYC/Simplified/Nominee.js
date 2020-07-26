import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import {getAge} from '../../Utils/ageCheck';
import Face from "./images/face.svg";
import Family from './images/family.svg';
import Familyes from './images/candidates.svg';
import adult from './images/age-limit-one.svg';
import child from './images/age-limit-two.svg';

export class Nominee extends Component {
 state ={
     showHide: false
 }


  //Nominee part function
  showHideChange = () => {
    this.setState({
        showHide: !(this.state.showHide)
    })
}

    // showHideChange = (e) => {
    //     const{values} = this.props;
    //     e.preventDefault();
    //     this.props.handleState("showHide", values.showHide);
    //     //console.log("ShowHide", this.state.showHide)
    // }


    continue = e => {
        const { values } = this.props;
        e.preventDefault();
        
        //    ====================== Validation Start =============================

        let checkPercentage = 0;
        for (let i = 0; i < values.jointArray.length; i++) {
            if (values.jointArray[i].isShow === true) {
                if (values.jointArray[i].nominee === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Nominee field is empty`, "Warning", 5000);
                    return;
                }

                if (values.jointArray[i].dob === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Date of Birth field is empty`, "Warning", 5000);
                    return;
                }

                if (getAge(values.jointArray[i].dob) < 18) {
                    NotificationManager.warning(`Nominee ${i + 1} -- Age is less than 18 please add as a Minor Nominee `, "Warning", 5000);
                    return;
                }

                if (values.jointArray[i].relation === '') {
                    NotificationManager.warning(`Nominee ${i + 1} -- Relation field is empty`, "Warning", 5000);
                    return;
                }

                if (values.jointArray[i].photograph === '') {
                    NotificationManager.warning(`Nominee ${i + 1} -- Photo is not provided`, "Warning", 5000);
                    return;
                }

                if (values.jointArray[i].percentage === '') {
                    NotificationManager.warning(`Nominee ${i + 1} -- Percentage field is empty`, "Warning", 5000);
                    return;
                }

                if (values.jointArray[i].percentage !== '') {
                    checkPercentage = checkPercentage + parseInt(values.jointArray[i].percentage);
                }
            } else {

                if (values.jointArray[i].minorNominee === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Name field is empty`, "Warning", 5000);
                    return;
                }

                if (values.jointArray[i].minorDob === '') {
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Date of Birth field is empty`, "Warning", 5000);
                    return;
                }

                if (getAge(values.jointArray[i].minorDob) >= 18) {
                    NotificationManager.warning(`Nominee ${i + 1} -- Age is 18 or more please add as a Adult Nominee`, "Warning", 5000);
                    return;
                }


                if (values.jointArray[i].minorRelationWAccH === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Relation With Account Holder field is empty`, "Warning", 5000);
                    return;
                }

                if (values.jointArray[i].minorNomineePhoto === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Photo is not provided`, "Warning", 5000);
                    return;
                }

                if (values.jointArray[i].minorPercentage === '') {
                    NotificationManager.warning(`Nominee ${i + 1} -- Percentage field is empty`, "Warning", 5000);
                    return;
                }

                if (values.jointArray[i].minorPercentage !== '') {
                    checkPercentage = checkPercentage + parseInt(values.jointArray[i].minorPercentage);
                }

                if (values.jointArray[i].minorGuardianNid.length < 10 ) {
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Guardian NID number must be 10, 13 and 17 digits`, "Warning", 5000);
                    return;
                }else if(values.jointArray[i].minorGuardianNid.length > 10 && values.jointArray[i].minorGuardianNid.length <=12){
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Guardian NID number must be 10, 13 and 17 digits`, "Warning", 5000);
                    return;
                }else if(values.jointArray[i].minorGuardianNid.length > 13 && values.jointArray[i].minorGuardianNid.length <= 16 ){
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Guardian NID number must be 10, 13 and 17 digits`, "Warning", 5000);
                    return;
                }else if(values.jointArray[i].minorGuardianNid.length > 17){
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Guardian NID number must be 10, 13 and 17 digits`, "Warning", 5000);
                    return;
                }

                if (values.jointArray[i].minorGuardianName === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Guardian Name field is empty`, "Warning", 5000);
                    return;
                }

                if (values.jointArray[i].guardianRelationWMinor === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Relation With Minor Nominee field is empty`, "Warning", 5000);
                    return;
                }

                if (values.jointArray[i].minorGuardianAddress === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Guardian Address field is empty`, "Warning", 5000);
                    return;
                }

                if (values.jointArray[i].minorPhotoGuardian === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Guardian Photo is not provided`, "Warning", 5000);
                    return;
                }


            }



        }


        if (checkPercentage > 100) {
            NotificationManager.warning("Total Percentage is greater than 100", "Warning", 5000);
            return;
        } else if (checkPercentage < 100) {
            NotificationManager.warning("Total Percentage is less than 100", "Warning", 5000);
            return;
        }
        //    ====================== Validation End =============================
        
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    // addNominee = (val) =>{
    //     let copyArray = Object.assign([], this.props.values.jointArray);
    //     copyArray.push(val);
    //     // this.setState({ jointArray: copyArray});
    //     this.props.handleState({jointArray: copyArray });
    // }

    // fileSelectedHandler = (event) => {
    //     if (event.target.files[0]) {
    //         let file = event.target.files[0];
    //         // console.log(file);
    //         //  console.log(idx);
    //         var reader = new FileReader();
    //         reader.readAsBinaryString(file);

    //         reader.onload = () => {
    //             let base64Image = btoa(reader.result);
    //             this.props.handleState(this.props.values.fields['photograph'], base64Image);
    //         };
    //         reader.onerror = () => {
    //             console.log('there are some problems');
    //             alert('File can not be read');
    //         };
    //     }
    // };


    handleSubmit = e => {
        e.preventDefault()

       // console.log(this.props.values.fields);

    }


    render() {
        const { values, jointArray, addNomineeOne, addNomineeTwo, deteteRow, onChange } = this.props;
        //console.log(values.jointArray.isShow);
        //console.log("showHide",this.state.showHide);
        return (
            <div className="container card" style={{ margin: "0", padding: "0" }}>
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-6 imTwoWhite mt-3" >
                        <h4 className="im text-muted mt-2"><i className="fas fa-user" style={{ color: "green" }}></i> Nominee</h4>
                        <div className="col">
                            <form>
                                {
                                    values.jointArray.map((arr, index) => {
                                        return (

                                            <div key={`${values.jointArray}~${index}`} className="my-3" >
                                                <h2 className="imTwo text-muted"> Nominee : <small >{index + 1}</small></h2>
                                                {arr.isShow === true ?

                                                    <div >

                                                        {/* Nominee Name */}
                                                        <div className="form-group">
                                                            <label htmlFor="nominee">Nominee</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="nominee"
                                                                name="nominee"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.nominee}
                                                            />
                                                        </div>

                                                        {/* Nominee Date of Birth */}
                                                        <div className="form-group">
                                                            <label htmlFor="dob">Date of Birth</label>
                                                            {/* Using Html input but dateformat = mm-dd-yyyy */}
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                id="dob"
                                                                name="dob"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.dob}
                                                            />
                                                        </div>

                                                        {/* Relation With Account holder */}
                                                        <div className="form-group">
                                                            <label htmlFor="relation">Relation</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="relation"
                                                                name="relation"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.relation}
                                                            />
                                                        </div>

                                                        {/* Nominee Photograph */}
                                                        <div className="form-group">
                                                            <label htmlFor="photograph">Photo</label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                id="photograph"
                                                                name="photograph"
                                                                onChange={event => onChange(index, event)}
                                                            //defaultValue={arr.photograph}
                                                            />
                                                        </div>

                                                        {/* Percentage for Major Nominee */}
                                                        <div className="form-group">
                                                            <label htmlFor="percentage">Percentage</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                min="1"
                                                                max="100"
                                                                id="percentage"
                                                                name="percentage"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.percentage}
                                                            />
                                                        </div>



                                                    </div>

                                                    :
                                                    <div>
                                                        {/* Minor Nominee  */}
                                                        <div className="form-group">
                                                            <label htmlFor="nominee">Minor Nominee Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="minorNominee"
                                                                name="minorNominee"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.minorNominee}
                                                            />
                                                        </div>


                                                        {/* Minor Nominee Date of Birth  */}
                                                        <div className="form-group">
                                                            <label htmlFor="nominee">Minor Nominee Date of Birth</label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                id="minorDob"
                                                                name="minorDob"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.minorDob}
                                                            />
                                                        </div>


                                                        {/* Minor Nominee Relation With Account Holder  */}
                                                        <div className="form-group">
                                                            <label htmlFor="nominee">Relation With Account Holder</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="minorRelationWAccH"
                                                                name="minorRelationWAccH"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.minorRelationWAccH}
                                                            />
                                                        </div>


                                                        {/*Minor Nominee's Photo */}
                                                        <div className="form-group">
                                                            <label htmlFor="photograph">Minor Nominee Photo</label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                id="minorNomineePhoto"
                                                                name="minorNomineePhoto"
                                                                onChange={event => onChange(index, event)}
                                                            //defaultValue={arr.minorNomineePhoto}
                                                            />
                                                        </div>


                                                        {/* Minor Nominee Percentage  */}
                                                        <div className="form-group">
                                                            <label htmlFor="percent">Percentage</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                min="1"
                                                                max="100"
                                                                id="minorPercentage"
                                                                name="minorPercentage"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.minorPercentage}
                                                            />
                                                        </div>



                                                        {/*================= Minor Nominee Guardian part started from above ================================= */}

                                                        {/* Minor Nominee Guardian NID */}
                                                        <div className="form-group">
                                                            <label htmlFor="nominee">Minor Nominee Guardian NID</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="minorGuardianNid"
                                                                name="minorGuardianNid"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.minorGuardianNid}
                                                            />
                                                        </div>



                                                        {/* Minor Nominee Guardian Name */}
                                                        <div className="form-group">
                                                            <label htmlFor="nominee">Minor Nominee Guardian Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="minorGuardianName"
                                                                name="minorGuardianName"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.minorGuardianName}
                                                            />
                                                        </div>


                                                        {/* Guardian relation With Minor Nominee  */}
                                                        <div className="form-group">
                                                            <label htmlFor="nominee">Relation With Minor Nominee</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="guardianRelationWMinor"
                                                                name="guardianRelationWMinor"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.guardianRelationWMinor}
                                                            />
                                                        </div>




                                                        {/*Guardian Address  */}
                                                        <div className="form-group">
                                                            <label htmlFor="nominee">Guardian Address</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="minorGuardianAddress"
                                                                name="minorGuardianAddress"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.minorGuardianAddress}
                                                            />
                                                        </div>




                                                        {/* ===========if Guardian Nid Image */}

                                                        {/* Minor Nominee Guardian NID
                                         <div className="form-group">
                                                <label htmlFor="photograph">Guardian NID</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="minorNidGuardian"
                                                    name="minorNidGuardian"
                                                    onChange={event => onChange(index, event)}
                                                    //defaultValue={arr.minorNidGuardian}
                                                />
                                            </div> */}

                                                        {/* ===========if Guardian Nid Image */}



                                                        {/* Minor Nid NO of Guardian */}
                                                        {/* <div className="form-group">
                                                            <label htmlFor="guardianNidNo">Guardian Nid No</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="minorNidGuardian"
                                                                name="minorNidGuardian"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.minorNidGuardian}
                                                            />
                                                        </div> */}




                                                        {/*Minor Nominee Guardian Photo */}
                                                        <div className="form-group">
                                                            <label htmlFor="photograph">Guardian Photo</label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                id="minorPhotoGuardian"
                                                                name="minorPhotoGuardian"
                                                                onChange={event => onChange(index, event)}
                                                            //defaultValue={arr.minorPhotoGuardian}
                                                            />
                                                        </div>

                                                        {/* Minor Nominee Percentage  */}
                                                        {/* <div className="form-group">
                                                            <label htmlFor="percent">Percentage</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                min="1"
                                                                max="100"
                                                                id="minorPercentage"
                                                                name="minorPercentage"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.minorPercentage}
                                                            />
                                                        </div> */}



                                                    </div>
                                                }
                                                <hr />
                                                <div className="d-flex justify-content-center">
                                                    <button className="b" style={{ border: "none", background: "#e3174c" }} onClick={(e) => deteteRow(e, index)}>Cancel</button>
                                                </div>



                                            </div>

                                        )
                                    })

                                }
                            </form>
                        </div>

                    </div>

                </div>

                <hr />
                {!(this.state.showHide) ? (
                    <div className="row d-flex justify-content-center" >
                        <div className="imTwoWhite text-center">
                            <img
                                src={Family}
                                style={{
                                    margin: "0 auto",
                                    width: "300px",
                                    height: "200px",
                                    border: "none",
                                }}

                                className="img-fluid img-thumbnail"
                                id="FrontNidPic"
                                alt=""
                            />

                            <h4 className="im" style={{ color: "green" }} onClick={this.showHideChange}><i class="fas fa-user-plus"></i> Add Nominee</h4>





                        </div>
                    </div>
                ) : ""}


                {
                    (this.state.showHide) ? (
                        <div>
                            <hr />
                            <div className="row d-flex justify-content-center ">
                                <div className="col-sm-8 d-flex justify-content-around">
                                    <button className="imTwoWhite animated zoomIn" style={{ border: "none", borderRadius: "10px" }} onClick={() =>{ addNomineeOne(); this.showHideChange()}}>

                                        <img
                                            src={adult}
                                            style={{
                                                margin: "0 auto",
                                                width: "300px",
                                                height: "150px",
                                                border: "none"

                                            }}

                                            className="img-fluid img-thumbnail"
                                            id="FrontNidPic"
                                            alt=""
                                        />



                                        <h4 className="im" style={{ color: "green" }}>Adult</h4>

                                    </button>
                                    <button className="imTwoWhite animated zoomIn" style={{ border: "none", borderRadius: "10px" }} onClick={() =>{ addNomineeTwo(); this.showHideChange();}}>

                                        <img
                                            src={child}
                                            style={{
                                                margin: "0 auto",
                                                width: "300px",
                                                height: "150px",
                                                border: "none"

                                            }}

                                            className="img-fluid img-thumbnail"
                                            id="FrontNidPic"
                                            alt=""
                                        />
                                        <h4 className="im" style={{ color: "green" }}>Minor</h4>

                                    </button>
                                </div>


                            </div>
                        </div>


                    ) : ""
                }
                <hr />


                <div className="row d-flex justify-content-center mb-3">

                    <button className="b mr-2" style={{ border: "none" }} onClick={(e) => this.back(e)}>Back</button>
                    <button className="b" style={{ border: "none" }} onClick={(e) => this.continue(e)}>Next</button>
                </div>



            </div>
        )
    }
}

export default Nominee;
