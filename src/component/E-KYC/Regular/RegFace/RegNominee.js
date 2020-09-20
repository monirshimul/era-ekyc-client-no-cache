import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import { getAge } from '../../../Utils/ageCheck';
import Face from "../../Simplified/images/face.svg";
import Family from '../../Simplified/images/family.svg';
import Familyes from '../../Simplified/images/candidates.svg';
import adult from '../../Simplified/images/age-limit-one.svg';
import child from '../../Simplified/images/age-limit-two.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { showDate, convert } from '../../../Utils/dateConversion';
import {largeTime} from '../../../Utils/notificationTime';



export class RegNominee extends Component {

    state = {
        showHide: false
    }

    //Nominee part function
    showHideChange = () => {
        this.setState({
            showHide: !(this.state.showHide)
        })
    }

    handleAdultNomineeDateChange = (index, event, d) => {
        event.preventDefault();
      //  console.log("index", index);
        // console.log("event", event.target.value);
       // console.log("d", d);
        let copyArray = Object.assign([], this.props.values.jointArray);
        copyArray[index].dob = d;
     //   console.log("copyArray", copyArray);
        this.props.handleState("jointArray", copyArray);

    }

    handleMinorNomineeDateChange = (index, event, d) => {
        event.preventDefault();
      //  console.log("index", index);
        // console.log("event", event.target.value);
      //  console.log("d", d);
        let copyArray = Object.assign([], this.props.values.jointArray);
        copyArray[index].minorDob = d;
     //   console.log("copyArray", copyArray);
        this.props.handleState("jointArray", copyArray);
    }

    deteteRow = (e, index) => {
        e.preventDefault();
        let copyArray = Object.assign([], this.props.values.jointArray);
        console.log("copyArrat", copyArray)
        console.log("index", index)
        copyArray.splice(index, 1);
        this.props.handleState("jointArray", copyArray);

    }

    continue = e => {
        const { values } = this.props;
        e.preventDefault();
        //    ====================== Validation Start =============================






        let checkPercentage = 0;
        for (let i = 0; i < values.jointArray.length; i++) {
            if (values.jointArray[i].isShow === true) {
                if (values.jointArray[i].nominee === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Nominee field is empty`, "Click to Remove", largeTime);
                    return;
                }

                if (values.jointArray[i].dob === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Date of Birth field is empty`, "Click to Remove", largeTime);
                    return;
                }

                if (this.props.values.jointArray[i].dob !== "") {
                    let checkAge = convert(this.props.values.jointArray[i].dob);
                    if (getAge(checkAge) < 18) {
                        NotificationManager.warning(`Nominee ${i + 1} -- Age is less than 18 please add as a Minor Nominee `, "Click to Remove", largeTime);
                        return;
                    }
                }

                if (values.jointArray[i].relation === '') {
                    NotificationManager.warning(`Nominee ${i + 1} -- Relation field is empty`, "Click to Remove", largeTime);
                    return;
                }

                if (values.jointArray[i].photograph === '') {
                    NotificationManager.warning(`Nominee ${i + 1} -- Photo is not provided`, "Click to Remove", largeTime);
                    return;
                }

                if (values.jointArray[i].percentage === '') {
                    NotificationManager.warning(`Nominee ${i + 1} -- Percentage field is empty`, "Click to Remove", largeTime);
                    return;
                }

                if (values.jointArray[i].percentage !== '') {
                    checkPercentage = checkPercentage + parseInt(values.jointArray[i].percentage);
                }




            } else {

                if (values.jointArray[i].minorNominee === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Name field is empty`, "Click to Remove", largeTime);
                    return;
                }

                if (values.jointArray[i].minorDob === '') {
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Date of Birth field is empty`, "Click to Remove", largeTime);
                    return;
                }

                if (this.props.values.jointArray[i].minorDob !== "") {
                    let checkAge = convert(this.props.values.jointArray[i].minorDob);
                    if (getAge(checkAge) >= 18) {
                        NotificationManager.warning(`Nominee ${i + 1} -- Age is 18 or more please add as a Adult Nominee`, "Click to Remove", largeTime);
                        return;
                    }
                }

                if (values.jointArray[i].minorRelationWAccH === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Relation With Account Holder field is empty`, "Click to Remove", largeTime);
                    return;
                }

                if (values.jointArray[i].minorNomineePhoto === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Photo is not provided`, "Click to Remove", largeTime);
                    return;
                }

                if (values.jointArray[i].minorPercentage === '') {
                    NotificationManager.warning(`Nominee ${i + 1} -- Percentage field is empty`, "Click to Remove", largeTime);
                    return;
                }

                if (values.jointArray[i].minorPercentage !== '') {
                    checkPercentage = checkPercentage + parseInt(values.jointArray[i].minorPercentage);
                }

                if (values.jointArray[i].minorGuardianNid.length < 10) {
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Guardian NID number must be 10, 13 and 17 digits`, "Click to Remove", largeTime);
                    return;
                } else if (values.jointArray[i].minorGuardianNid.length > 10 && values.jointArray[i].minorGuardianNid.length <= 12) {
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Guardian NID number must be 10, 13 and 17 digits`, "Click to Remove", largeTime);
                    return;
                } else if (values.jointArray[i].minorGuardianNid.length > 13 && values.jointArray[i].minorGuardianNid.length <= 16) {
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Guardian NID number must be 10, 13 and 17 digits`, "Click to Remove", largeTime);
                    return;
                } else if (values.jointArray[i].minorGuardianNid.length > 17) {
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Guardian NID number must be 10, 13 and 17 digits`, "Click to Remove", largeTime);
                    return;
                }

                if (values.jointArray[i].minorGuardianName === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Minor Nominee Guardian Name field is empty`, "Click to Remove", largeTime);
                    return;
                }

                if (values.jointArray[i].guardianRelationWMinor === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Relation With Minor Nominee field is empty`, "Click to Remove", largeTime);
                    return;
                }

                if (values.jointArray[i].minorGuardianAddress === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Guardian Address field is empty`, "Click to Remove", largeTime);
                    return;
                }

                if (values.jointArray[i].minorPhotoGuardian === "") {
                    NotificationManager.warning(`Nominee ${i + 1} -- Guardian Photo is not provided`, "Click to Remove", largeTime);
                    return;
                }




            }



        }


        if (checkPercentage > 100) {
            NotificationManager.warning("Total Percentage is greater than 100", "Click to Remove", largeTime);
            return;
        } else if (checkPercentage < 100) {
            NotificationManager.warning("Total Percentage is less than 100", "Click to Remove", largeTime);
            return;
        }
        //    ====================== Validation End =============================


        for (let j = 0; j < values.jointArray.length; j++) {
            if (values.jointArray[j].isShow === true) {
                if (values.jointArray[j].dob !== "") {
                    let copyArray = Object.assign([], this.props.values.jointArray);
                    copyArray[j].dob = showDate(copyArray[j].dob);
                    this.props.handleState('jointArray', copyArray);

                }
            } else {
                if (values.jointArray[j].minorDob !== '') {
                    let copyArray = Object.assign([], this.props.values.jointArray);
                    copyArray[j].minorDob = showDate(copyArray[j].minorDob);
                    this.props.handleState('jointArray', copyArray);
                }
            }
        }

        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }


    handleSubmit = e => {
        e.preventDefault()

        // console.log(this.props.values.fields);

    }

    render() {
        const { values, jointArray, addNomineeOne, addNomineeTwo, deteteRow, onChange } = this.props;
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
                                                                placeholder="Name of Nominee"
                                                            />
                                                        </div>

                                                      {/* Nominee Date of Birth */}
                                                      <div className='form-group d-flex justify-content-between'>
                                                      <div className=''>
                                                          <label htmlFor='dob'>Date of Birth (dd/mm/YYYY) : </label>
                                                      </div>
                                                      <div className=''>

                                                          <DatePicker
                                                              placeholderText='DD/MM/YYYY'
                                                              selected={arr.dob}
                                                              dateFormat='dd/MM/yyyy'
                                                              onChange={(d, event) => {
                                                                  this.handleAdultNomineeDateChange(index, event, d)

                                                              }}
                                                              isClearable
                                                              showYearDropdown
                                                              showMonthDropdown
                                                              scrollableMonthYearDropdown

                                                          />
                                                      </div>
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
                                                                placeholder="Relation With Account Holder"
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
                                                                placeholder="Percentage"
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
                                                                placeholder="Name of Minor Nominee"
                                                            />
                                                        </div>


                                                           {/* Minor Nominee Date of Birth  */}
                                                           <div className='form-group d-flex justify-content-between'>
                                                           <div className=''>
                                                               <label htmlFor='dob'>Minor Nominee Date of Birth (dd/mm/YYYY) : </label>
                                                           </div>
                                                           <div className=''>

                                                               <DatePicker
                                                                   placeholderText='DD/MM/YYYY'
                                                                   selected={arr.minorDob}
                                                                   dateFormat='dd/MM/yyyy'
                                                                   onChange={(d, event) => {
                                                                       this.handleMinorNomineeDateChange(index, event, d)

                                                                   }}
                                                                   isClearable
                                                                   showYearDropdown
                                                                   showMonthDropdown
                                                                   scrollableMonthYearDropdown

                                                               />
                                                           </div>
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
                                                                placeholder="Relation With Account Holder"
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
                                                                placeholder="Percentage"
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
                                                                placeholder="Guardian Nid No"
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
                                                                placeholder="Minor Nominee Guardian Name"
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
                                                                placeholder="Guardian Relation With Minor Nominee"
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
                                                                placeholder="Guardian Address"
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
                                                    <button className="b" style={{ border: "none", background: "#e3174c" }} onClick={(e) => this.deteteRow(e, index)}>Cancel</button>
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
                                    <button className="imTwoWhite animated zoomIn" style={{ border: "none", borderRadius: "10px" }} onClick={() => { addNomineeOne(); this.showHideChange() }}>

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
                                    <button className="imTwoWhite animated zoomIn" style={{ border: "none", borderRadius: "10px" }} onClick={() => { addNomineeTwo(); this.showHideChange(); }}>

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

export default RegNominee;
