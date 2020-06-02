import React, { Component } from 'react'

export class Nominee extends Component {
    state={
        jointArray:[]
    }



    componentDidMount(){
        if("NomineeArray" in localStorage){
            let data = JSON.parse(localStorage.getItem("NomineeArray"));
            this.setState({
              jointArray:data  
            })
        }
    }

    addComp = (value) =>{
        let copyArray = Object.assign([], this.state.jointArray);
        copyArray.push(value);
        this.setState({jointArray:copyArray});
    }

    deleteComp = (e,index) => {
        console.log("deleteIndex",index);
        e.preventDefault();
        // const copyArray = Object.assign([], this.state.jointArray);
        // copyArray.splice(index, 0);
        // this.setState({ jointArray: copyArray })
        const list = [...this.state.jointArray];
        list.splice(index,1)
        this.setState({jointArray:list});
    }

   handleInputChange=(index,event) =>{
       let copyArray = Object.assign([], this.state.jointArray);
       if (event.target.name === "nominee") {
        copyArray[index].nominee = event.target.value;
    } else if (event.target.name === "minorNominee") {
        copyArray[index].minorNominee = event.target.value;
    }else if (event.target.name === "relation") {
        copyArray[index].relation = event.target.value;
    }else if (event.target.name === "minorRelation") {
        copyArray[index].minorRelation = event.target.value;
    }else if (event.target.name === "percentage") {
        copyArray[index].percentage = event.target.value;
    }else if (event.target.name === "minorPercentage") {
        copyArray[index].minorPercentage = event.target.value;
    }else if (event.target.name === 'dob') {
        copyArray[index].dob = event.target.value;
    }else if (event.target.name === 'dob') {
            copyArray[index].dob = event.target.value;
    }else if (event.target.name === "minorGuarrdian") {
        copyArray[index].minorGuarrdian = event.target.value;
    }else if (event.target.name === "minorAddress") {
        copyArray[index].minorAddress = event.target.value;
    }else if (event.target.name === "minorNidGuardian") {
        copyArray[index].minorNidGuardian = event.target.value;
    }else if (event.target.name === "photograph") {
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
    // else if (event.target.name === "minorNidGuardian") {
    //     if (event.target.files[0]) {
    //         let file = event.target.files[0];
    //         //console.log(file.type);
    //         var reader = new FileReader();
    //         reader.readAsBinaryString(file);

    //         reader.onload = () => {

    //             let base64Image = btoa(reader.result);

    //             copyArray[index].minorNidGuardian = base64Image;
    //         };
    //         reader.onerror = () => {
    //             console.log('there are some problems');
    //             alert('File can not be read');
    //         };
    //     }
    // }
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

  

    continue = e =>{
        e.preventDefault();
        localStorage.setItem("NomineeArray", JSON.stringify(this.state.jointArray));
        this.props.history.push('/dashboard/signature');
    }

     back = e =>{
        e.preventDefault();
        localStorage.setItem("NomineeArray", JSON.stringify(this.state.jointArray));
        this.props.history.push('/dashboard/personal-details');
    }




    render() {
        console.log()
        return (
            <div className="col text-center" >

                <form>
                {
                    this.state.jointArray.map((arr, index) => {
                        return (

                            <div key={`${this.state.jointArray}~${index}`} className="my-3" >
                                <h2 className="text-muted"><i className="fas fa-user" style={{ color: "#e3174c" }}></i> Nominee <small >{index + 1}</small></h2>
                                {arr.isShow === true ?
                                    
                                        <div >
                                            
                                            {/* Nominee Name */}
                                            <div className="form-group col-sm-10">
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
                                              <div className="form-group col-sm-10">
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
                                          <div className="form-group col-sm-10">
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
                                             <div className="form-group col-sm-10">
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
                                          <div className="form-group col-sm-10">
                                                <label htmlFor="percentage">percentage</label>
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
                                        <div className="form-group col-sm-10">
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
                                       
                                   
                                        {/* Minor Nominee Guardian  */}
                                        <div className="form-group col-sm-10">
                                            <label htmlFor="nominee">Minor Nominee Guardian Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="minorGuarrdian"
                                                name="minorGuarrdian"
                                                onChange={event => this.handleInputChange(index, event)}
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
                                                onChange={event => this.handleInputChange(index, event)}
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
                                                onChange={event => this.handleInputChange(index, event)}
                                                value={arr.minorRelation}
                                            />
                                        </div>

                                        {/* ===========if Guardian Nid Image */}

                                         {/* Minor Nominee Guardian NID
                                         <div className="form-group col-sm-10">
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
                                            <div className="form-group col-sm-10">
                                            <label htmlFor="guardianNidNo">Guardian Nid No</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="minorNidGuardian"
                                                name="minorNidGuardian"
                                                onChange={event => this.handleInputChange(index, event)}
                                                value={arr.minorNidGuardian}
                                            />
                                        </div>




                                            {/*Minor Nominee Guardian Photo */}
                                         <div className="form-group col-sm-10">
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
                                        <div className="form-group col-sm-10">
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



                                          </div>
                                }
                                <hr />
                                <button className="b" style={{ border: "none", background: "#e3174c" }} onClick={(e) => this.deleteComp(e,index)}>Delete</button>
                                <br />
                                <hr />
                                
                            </div>

                        )
                    })

                }
</form>


                <button className="bigB mr-2" style={{ border: "none" }} onClick={() => this.addComp({ nominee: '', dob:'',relation:'',photograph:'', percentage:'', isShow: true })}>Adult</button>
                <button className="bigB" style={{ border: "none" }} onClick={() => this.addComp({ minorNominee: '',minorGuarrdian:'',minorAddress:'',minorRelation:'',minorNidGuardian:'',minorPhotoGuardian:'',minorPercentage:'', isShow: false })}>Minor</button>
                <button className="b" style={{ border: "none", background: "#e3174c" }} onClick={(e)=>this.continue(e)}>Next</button>
                <button className="b" style={{ border: "none", background: "#e3174c" }} onClick={(e)=>this.back(e)}>Back</button>
            </div>
        )
    }
}

export default Nominee;
