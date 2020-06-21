import React, { Component } from "react";
import "./utils/Common.css";
import Nid from './images/nid-f.svg';
import NidOne from './images/nid-f2.svg';
import NidTwo from './images/nid-f3.svg';
import NidThree from './images/nid-f4.svg';
import axios from 'axios';

export class NidImage extends Component {

  continue = async (e) => {
    const {  NidFrontOcr, NidBackOcr } = this.props.values;
    e.preventDefault();

    //   const obj ={
    //     NidFront:values.NidFront,
    //     NidFrontType:values.NidFrontType,
    //     NidBack:values.NidBack,
    //     NidBackType:values.NidBackType
    // }
    // localStorage.setItem("NidImage", JSON.stringify(obj));

    const formData = new FormData();
  
    formData.append("userimage",  NidFrontOcr);
    formData.append("backPart", NidBackOcr);
    formData.append("api_pass", "updateimage");
    let nidData = await axios.post(`http://203.76.150.250/ERAPAYOCR/OCRFromSmartCardImage.do`, formData);
    console.log(nidData.data);

    this.props.handleState("applicantName", nidData.data["Name English"]);
    this.props.handleState("applicantNameBangla", nidData.data["Name Bangla"]);
    this.props.handleState("applicantNidNo", nidData.data["id"]);
    this.props.handleState("applicantDob", nidData.data["DOB"]);
    
    this.props.handleState("fatherNameBangla", nidData.data["Father"]);
    this.props.handleState("motherNameBangla", nidData.data["Mother"]);
    this.props.handleState("spouseName", nidData.data["Husband"]);
    this.props.handleState("permanentAddressBangla", nidData.data["Address"]);

    this.props.nextStep();
  };

  //Nid front Image upload
  fileSelectedHandler = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      this.props.handleState("NidFrontOcr", event.target.files[0]);
      //console.log(file.type);
      var reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = () => {
        // console.log(typeof reader.result);
        // console.log(btoa(reader.result));
        let base64Image = btoa(reader.result);
        // this.setState({
        //   profilePic: base64Image,
        //   profilePicType: file.type

        //   //nidImage: URL.createObjectURL(event.target.files[0])
        // });
        this.props.handleState("NidFront", base64Image);

        this.props.handleState("NidFrontType", file.type);
      };
      reader.onerror = () => {
        console.log("there are some problems");
        alert("File can not be read");
      };
    }
  };

  //Nid Back Image upload
  fileSelectedHandlerTwo = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      this.props.handleState("NidBackOcr", event.target.files[0]);
      console.log(file.type);
      var reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = () => {
        let base64Image = btoa(reader.result);

        this.props.handleState("NidBack", base64Image);

        this.props.handleState("NidBackType", file.type);
      };
      reader.onerror = () => {
        console.log("there are some problems");
        alert("File can not be read");
      };
    }
  };

  render() {
    const { values, handleChange, handleState } = this.props;
    // console.log(values.profilePicType);
    // console.log(values.flag)
    return (
      <div className="animated zoomIn">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-12 d-flex justify-content-around">
            <div className="card col-sm-6" style={{ paddingTop: "25px", marginRight: "30px" }}>
              <div className="card-header up">
                <h3>NID Front</h3>
              </div>
              <div className="card-body d-flex justify-content-center">

                <img
                  src={values.NidFront ? (values.flag + values.NidFront) : NidThree}
                  style={{
                    margin: "auto",
                    cursor: "pointer",
                    width: "300px",
                    height: "200px",
                  }}
                  className="img-fluid img-thumbnail im"
                  id="FrontNidPic"
                  alt=""
                />
              </div>
              <div
                className="card-footer d-flex justify-content-around"
                style={{ background: "#fff" }}
              >
                {/* <input
                                    type="file"
                                    onChange={this.fileSelectedHandler}
                                    className="form-control-file up"
                                    id="input-file"
                                    aria-describedby="fileHelp"
                                    style={{ paddingLeft: "75px" }}
                                ></input> */}
                <div class="input-group mb-3 ">
                  <div class="custom-file">
                    <input type="file"
                      onChange={this.fileSelectedHandler}

                      class="form-control-file" id="input-file" />
                    <label class="custom-file-label" for="input-file">Choose Image</label>
                  </div>
                  {/* <div class="input-group-append">
                    <span class="input-group-text" id=""></span>
                  </div> */}
                </div>
                {/* <div onClick={() => console.log("uploaded")} className="up">
                  Upload
                </div> */}
              </div>
            </div>

            <div className="card col-sm-6" style={{ paddingTop: "25px" }}>
              <div className="card-header up">
                <h3>NID Back</h3>
              </div>
              <div className="card-body d-flex justify-content-center">
                <img
                  src={values.NidBack ? (values.flag + values.NidBack) : NidTwo}
                  style={{
                    margin: "auto",
                    cursor: "pointer",
                    width: "300px",
                    height: "200px",
                  }}
                  className="img-fluid img-thumbnail im"
                  id="nidBack"
                  alt=""
                />
              </div>
              <div
                className="card-footer d-flex justify-content-around"
                style={{ background: "#fff" }}
              >
                {/* <input
                                    type="file"
                                    onChange={this.fileSelectedHandlerTwo}
                                    className="form-control-file up"
                                    id="input-file"
                                    aria-describedby="fileHelp"
                                    style={{ paddingLeft: "75px" }}
                                ></input> */}
                <div class="input-group mb-3 ">
                  <div class="custom-file">
                    <input type="file"
                      onChange={this.fileSelectedHandlerTwo}

                      class="form-control-file" id="input-file-two" />
                    <label class="custom-file-label" for="input-file-two">Choose Image</label>
                  </div>
                  {/* <div class="input-group-append">
                                        <span class="input-group-text" id=""></span>
                                    </div> */}
                </div>


              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center my-5">
          <div className="b" onClick={this.continue}>
            Next
          </div>
          
        </div>

       
      </div>
    );
  }
}

export default NidImage;
