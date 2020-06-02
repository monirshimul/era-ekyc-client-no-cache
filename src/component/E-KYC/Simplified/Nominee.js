import React, { Component } from 'react'
import Face from "./images/face.svg";

export class Nominee extends Component {


    continue = e => {
        const { values } = this.props;
        e.preventDefault();
        // localStorage.setItem("NomineeArray", JSON.stringify(values.jointArray));
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
        return (
            <div>
                <div className="row d-flex justify-content-center">
                    <div className="card col-sm-12" style={{ paddingTop: "25px" }}>
                        <div className="card-header up">
                            <h3>Nominee's Information</h3>
                        </div>
                        <div className="card-body d-flex justify-content-center">
                            <form onSubmit={this.handleSubmit}>


                                {
                                    values.jointArray.map((arr, index) => {
                                       // console.log("nominee value", arr);
                                        // let nomineeId = `nominee-${idx}`, relationId = `relation-${idx}`, photographId = `photograph-${idx}`
                                        return (
                                            <div>
                                                {arr.isShow === true ?
                                                    <div >
                                                        <h1>Nominee{index + 1}</h1>
                                                        {/* Nominee Name */}
                                                        <div className="form-group col-sm-10">
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
                                                        <div className="form-group col-sm-10">
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
                                                        <div className="form-group col-sm-10">
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
                                                        <div className="form-group col-sm-10">
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


                                                         {/* Percentage for Major */}
                                                         <div className="form-group col-sm-10">
                                                            <label htmlFor="percentage">Percentage</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="percentage"
                                                                name="percentage"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.percentage}
                                                            />
                                                        </div>



                                                    </div>
                                                    :

                                                    <div>
                                                        <h1>Nominee{index + 1}</h1>
                                                        {/* Minor Nominee  */}
                                                        <div className="form-group col-sm-10">
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


                                                        {/* Minor Nominee Guardian  */}
                                                        <div className="form-group col-sm-10">
                                                            <label htmlFor="nominee">Minor Nominee Guardian Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="minorGuarrdian"
                                                                name="minorGuarrdian"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.minorGuarrdian}
                                                            />
                                                        </div>



                                                        {/* Minor Nominee Address  */}
                                                        <div className="form-group col-sm-10">
                                                            <label htmlFor="nominee">Minor Nominee Address</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="minorAddress"
                                                                name="minorAddress"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.minorAddress}
                                                            />
                                                        </div>


                                                        {/* Minor Nominee Relation  */}
                                                        <div className="form-group col-sm-10">
                                                            <label htmlFor="nominee">Relation</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="minorRelation"
                                                                name="minorRelation"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.minorRelation}
                                                            />
                                                        </div>


                                                         {/* Minor Nominee Guardian Nid No  */}
                                                         <div className="form-group col-sm-10">
                                                            <label htmlFor="guardianNidNo">Guardian NID No</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="minorNidGuardian"
                                                                name="minorNidGuardian"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.minorNidGuardian}
                                                            />
                                                        </div>


                                                    {/* Minor Nominee guardian nid image if needed */}

                                                        {/* Minor Nominee Guardian NID
                                                        <div className="form-group col-sm-10">
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

                                                        {/* Minor Nominee guardian nid image if needed */}


                                                        {/*Minor Nominee Guardian Photo */}
                                                        <div className="form-group col-sm-10">
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
                                                         <div className="form-group col-sm-10">
                                                            <label htmlFor="percentage">Minor Nominee Percentage</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                id="minorPercentage"
                                                                name="minorPercentage"
                                                                onChange={event => onChange(index, event)}
                                                                value={arr.minorPercentage}
                                                            />
                                                        </div>

                                                    </div>
                                                }

                                                {/* Delete Button */}

                                                <div className="form-group ">
                                                    <button
                                                        className="b"
                                                        style={{ border: "none", background: "#e3174c" }}
                                                        onClick={() => deteteRow(index)}
                                                    >
                                                        Delete
                                    </button>

                                                </div>


                                            </div>

                                        )
                                    })

                                }



                            </form>

                            {/* Add Adult Nominee */}
                            <div className="form-group ">
                                <button
                                    type="button"
                                    className="bigB mr-2"
                                    style={{ border: "none" }}
                                    onClick={() => addNomineeOne()}
                                >
                                    Adult
                                    </button>
                            </div>

                                {/* Add Minor Nominee */}
                            <div className="form-group ">
                                <button
                                    type="button"
                                    className="bigB mr-2"
                                    style={{ border: "none" }}
                                    onClick={() => addNomineeTwo()}
                                >
                                    Minor
                                    </button>
                            </div>

                        </div>


                                {/* Back and Continue button */}
                        <div
                            className="card-footer d-flex justify-content-between"
                            style={{ background: "#fff" }}
                        >

                            <span className="b mr-5" onClick={this.back}>Back</span>
                            <span className="b" onClick={this.continue}>Next</span>

                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default Nominee;
