import React, { Component } from 'react'
import Family from '../../Simplified/images/family.svg'
import Familyes from '../../Simplified/images/candidates.svg'
import adult from '../../Simplified/images/age-limit-one.svg'
import child from '../../Simplified/images/age-limit-two.svg'

export class Nominee extends Component {
    state = {
        jointArray: [],
        showHide: false
    }



    componentDidMount() {
        if ("NomineeArray" in localStorage) {
            let data = JSON.parse(localStorage.getItem("NomineeArray"));
            this.setState({
                jointArray: data
            })
        }
    }

    addComp = (value) => {
        let copyArray = Object.assign([], this.state.jointArray);
        copyArray.push(value);
        this.setState({ jointArray: copyArray, showHide: !this.state.showHide });
    }

    deleteComp = (e, index) => {
        console.log("deleteIndex", index);
        e.preventDefault();
        // const copyArray = Object.assign([], this.state.jointArray);
        // copyArray.splice(index, 0);
        // this.setState({ jointArray: copyArray })
        const list = [...this.state.jointArray];
        list.splice(index, 1)
        this.setState({ jointArray: list });
    }

    handleInputChange = (index, event) => {
        let copyArray = Object.assign([], this.state.jointArray);
        // if (event.target.name === "nominee") {
        //     copyArray[index].nominee = event.target.value;
        // } else if (event.target.name === "minorNominee") {
        //     copyArray[index].minorNominee = event.target.value;
        // } else if (event.target.name === "relation") {
        //     copyArray[index].relation = event.target.value;
        // } else if (event.target.name === "minorRelation") {
        //     copyArray[index].minorRelation = event.target.value;
        // } else if (event.target.name === "percentage") {
        //     copyArray[index].percentage = event.target.value;
        // } else if (event.target.name === "minorPercentage") {
        //     copyArray[index].minorPercentage = event.target.value;
        // } else if (event.target.name === 'dob') {
        //     copyArray[index].dob = event.target.value;
        // } else if (event.target.name === 'dob') {
        //     copyArray[index].dob = event.target.value;
        // } else if (event.target.name === "minorGuarrdian") {
        //     copyArray[index].minorGuarrdian = event.target.value;
        // } else if (event.target.name === "minorAddress") {
        //     copyArray[index].minorAddress = event.target.value;
        // } else if (event.target.name === "minorNidGuardian") {
        //     copyArray[index].minorNidGuardian = event.target.value;
        // } 
        copyArray[index][event.target.name] = event.target.value;

        if (event.target.name === "photograph") {
            if (event.target.files[0]) {
                let file = event.target.files[0];
                //console.log(file.type);
                var reader = new FileReader();
                reader.readAsBinaryString(file);

                reader.onload = () => {

                    let base64Image = btoa(reader.result);

                    copyArray[index].photograph = base64Image;
                };
                reader.onerror = () => {
                    console.log('there are some problems');
                    alert('File can not be read');
                };
            }
        }
        else if (event.target.name === "minorNomineePhoto") {
            if (event.target.files[0]) {
                let file = event.target.files[0];
                //console.log(file.type);
                var reader = new FileReader();
                reader.readAsBinaryString(file);

                reader.onload = () => {

                    let base64Image = btoa(reader.result);

                    copyArray[index].minorNomineePhoto = base64Image;
                };
                reader.onerror = () => {
                    console.log('there are some problems');
                    alert('File can not be read');
                };
            }
        }
        else if (event.target.name === "minorPhotoGuardian") {
            if (event.target.files[0]) {
                let file = event.target.files[0];
                //console.log(file.type);
                var reader = new FileReader();
                reader.readAsBinaryString(file);

                reader.onload = () => {

                    let base64Image = btoa(reader.result);

                    copyArray[index].minorPhotoGuardian = base64Image;
                };
                reader.onerror = () => {
                    console.log('there are some problems');
                    alert('File can not be read');
                };
            }
        }

        this.setState({ jointArray: copyArray });

    }

    showHide = (e) => {
        e.preventDefault();
        this.setState({
            showHide: !this.state.showHide
        })
        //console.log("ShowHide", this.state.showHide)
    }



    continue = e => {
        e.preventDefault();
        localStorage.setItem("NomineeArray", JSON.stringify(this.state.jointArray));

        let nextRoute = JSON.parse(localStorage.getItem('Verification'));

        if (nextRoute.type === "FACE") {

            this.props.history.push('/dashboard/regular-signature');
        } else {
            this.props.history.push('/dashboard/regular-customerphoto');
        }
        
    }

    back = e => {
        e.preventDefault();
        localStorage.setItem("NomineeArray", JSON.stringify(this.state.jointArray));
        this.props.history.push('/dashboard/regular-personaldetails');
    }




    render() {
        let { showHide } = this.state
        return (
            <div className="container card" style={{ margin: "0", padding: "0" }}>
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-6 imTwoWhite mt-3" >
                        <h4 className="im text-muted mt-2"><i className="fas fa-user" style={{ color: "green" }}></i> Nominee</h4>
                        <div className="col">
                            <form>
                                {
                                    this.state.jointArray.map((arr, index) => {
                                        return (

                                            <div key={`${this.state.jointArray}~${index}`} className="my-3" >
                                                <h2 className="imTwo" style={{color:"green", fontWeight:"bold"}}> Nominee : {index + 1}</h2>
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                    onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
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
                                                                onChange={event => this.handleInputChange(index, event)}
                                                                value={arr.minorPercentage}
                                                            />
                                                        </div> */}



                                                    </div>
                                                }
                                                <hr />
                                                <div className="d-flex justify-content-center">
                                                    <button className="b" style={{ border: "none", background: "#e3174c" }} onClick={(e) => this.deleteComp(e, index)}>Cancel</button>
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
                {!showHide ? (
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

                            <h4 className="im" style={{ color: "green" }} onClick={this.showHide}><i class="fas fa-user-plus"></i> Add Nominee</h4>





                        </div>
                    </div>
                ) : ""}


                {
                    showHide ? (
                        <div>
                            <hr />
                            <div className="row d-flex justify-content-center ">
                                <div className="col-sm-8 d-flex justify-content-around">
                                    <button className="imTwoWhite animated zoomIn" style={{ border: "none", borderRadius: "10px" }} onClick={() => this.addComp({ nominee: '', dob: '', relation: '', photograph: '', percentage: '', isShow: true })}>

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
                                    <button className="imTwoWhite animated zoomIn" style={{ border: "none", borderRadius: "10px" }} onClick={() => this.addComp({ minorNominee: '', minorDob: '', minorRelationWAccH: '', minorNomineePhoto: '', minorPercentage: '', minorGuardianNid: '', minorGuardianName: '', guardianRelationWMinor: '', minorGuardianAddress: '', minorPhotoGuardian: '', isShow: false })}>

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