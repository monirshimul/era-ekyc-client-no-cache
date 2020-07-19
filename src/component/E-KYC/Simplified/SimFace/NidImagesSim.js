import React, { Component } from 'react';
import "../utils/Common.css";
import NidOne from '../images/nid-f2.svg';
import NidTwo from '../images/nid-f3.svg';
import NidThree from '../images/nid-f4.svg';
import Loading from '../utils/CustomLoding/Loading.js';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from "react-notifications";
import axios from 'axios';
import Capture from '../Capture/Capture';

export class NidImagesSim extends Component {

  state = {
    cameraOnFront : false,
    cameraOnBack : false,
    
  }

  captureOnFront = ()=>{
    this.setState({
      cameraOnFront: true
    })
  }

  captureOffFront = ()=>{
    this.setState({
      cameraOnFront: false
    })
  }

  captureOnBack = ()=>{
    this.setState({
      cameraOnBack: true
    })
  }

  captureOffBack = ()=>{
    this.setState({
      cameraOnBack: false
    })
  }

  onImageConfirm = (base64Image) => {
    //console.log("In image confirm");
    //console.log("Image",base64Image);
    if(this.state.cameraOnFront){
      this.props.handleState("NidFront", base64Image);
      this.captureOffFront();
    }
    if(this.state.cameraOnBack){
      this.props.handleState("NidBack", base64Image);
      this.captureOffBack();
    }
    
    
}

// onImageConfirmBack = (base64Image) => {
//   //console.log("In image confirm");
//   //console.log("Image",base64Image);
//   this.props.handleState("NidBack", base64Image);
//   this.captureOff();
// }

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
    
    
    
      doOcr = async (e)=>{
    
        e.preventDefault();
        let {values} = this.props;
        if(values.NidFront && values.NidBack){
          // this.setState({
          //   loading: !this.state.loading
          // })
      this.props.handleState('loadingSpin', !(values.loadingSpin));
          // if (NidFront === "") {
          //   let NidFrontMessage = "Please Provide Nid Front Image";
          //   NotificationManager.warning(NidFrontMessage, "Warning", 5000);
          //   return;
          // }
      
          // if (NidBack === "") {
          //   let NidBackMessage = "Please Provide Nid Back Image";
          //   NotificationManager.warning(NidBackMessage, "Warning", 5000);
          //   return;
          // }
      
      
          const formData = new FormData();
      
          formData.append("userimage", values.NidFrontOcr);
          formData.append("backPart", values.NidBackOcr);
          formData.append("api_pass", "updateimage");
          let nidData = await axios.post(`http://203.76.150.250/ERAPAYOCR/OCRFromSmartCardImage.do`, formData);
          console.log("NIDdATA",nidData.data);
          // this.setState({
          //  allData:nidData.data,
          //   loading: false
          // })
        
        this.props.handleState('allData', nidData.data);
        this.props.handleState('loadingSpin', false);
        // this.props.handleState("applicantName", nidData.data["Name English"]);
        // this.props.handleState("applicantNameBangla", nidData.data["Name Bangla"]);
        // this.props.handleState("applicantNidNo", nidData.data["id"]);
        // this.props.handleState("applicantDob", nidData.data["DOB"]);
       
        this.props.handleState("nid", nidData.data["id"]);    
        this.props.handleState("dob", nidData.data["DOB"]);
        
        // this.props.handleState("fatherNameBangla", nidData.data["Father"]);
        // this.props.handleState("motherNameBangla", nidData.data["Mother"]);
        // this.props.handleState("spouseName", nidData.data["Husband"]);
        // this.props.handleState("permanentAddressBangla", nidData.data["Address"]);
       
          //console.log("OCR STate",this.state.allData);
      
          NotificationManager.success("OCR Completed", "Success",5000);
        }else{
          NotificationManager.warning("Please Provide NID Images", "Warning",5000);
        } 
        
      }
    
      continue = async (e) => {
        e.preventDefault();
        let {values} = this.props;
     
       
        // if(allData.Response_Code){
      
        this.props.nextStep();
      // }else{
      //   let nidOcrMessage = "Please Do OCR First";
      //   NotificationManager.warning(nidOcrMessage, "Warning", 5000);
      // }
      
    }
    
    render() {
        let {values} = this.props;
        return (
            <div className="container">
        <div className="row d-flex justify-content-center">
          
            <div className="card col-sm-5" style={{ paddingTop: "25px" }}>
              <div className="card-header up">
                <h3>NID Front</h3>
              </div>
              <div className="card-body d-flex justify-content-center">

                <img
                  src={values.NidFront ? (values.flag+ values.NidFront) : NidThree}
                  style={{
                    margin: "auto",
                    cursor: "pointer",
                    width: "300px",
                    height: "200px",
                  }}
                  defaultValue={values.NidFront}
                  className="img-fluid img-thumbnail im"
                  id="FrontNidPic"
                  alt=""
                />
              </div>
              <div
                className="card-footer"
                style={{ background: "#fff" }}
              >
                
                <div className="input-group">
                  <div className="custom-file">
                    <input type="file"
                      onChange={this.fileSelectedHandler}

                      className="form-control-file" id="input-file" />
                    <label className="custom-file-label" htmlFor="input-file">Choose Image</label>
                  </div>

                </div>

                {/* <p className="text-center mt-3"style={{color:"green"}}>Or</p> */}

                <div className="im mt-3" style={{color:"green"}} data-toggle="modal" data-target="#cameraModal" onClick={this.captureOnFront}>
                <i class="fas fa-camera"></i> Capture Image
                </div>
                
                
                
              </div>
              
              
              
            </div>

            <div className="card col-sm-5" style={{ paddingTop: "25px" }}>
              <div className="card-header up">
                <h3>NID Back</h3>
              </div>
              <div className="card-body d-flex justify-content-center">
                <img
                  src={values.NidBack ? (values.flag+ values.NidBack) : NidTwo}
                  style={{
                    margin: "auto",
                    cursor: "pointer",
                    width: "300px",
                    height: "200px",
                  }}
                  defaultValue={values.NidBack}
                  className="img-fluid img-thumbnail im"
                  id="nidBack"
                  alt=""
                />
              </div>
              <div
                className="card-footer"
                style={{ background: "#fff" }}
              >
                
                <div className="input-group">
                  <div className="custom-file">
                    <input type="file"
                      onChange={this.fileSelectedHandlerTwo}

                      className="form-control-file" id="input-file-two" />
                    <label className="custom-file-label" htmlFor="input-file-two">Choose Image</label>
                  </div>
                </div>
                {/* <p className="text-center mt-3"style={{color:"green"}}>Or</p> */}

                <div className="im mt-3" style={{color:"green"}} data-toggle="modal" data-target="#cameraModal" onClick={this.captureOnBack}>
                <i class="fas fa-camera"></i> Capture Image
                </div>


              </div>
            </div>
          
        </div>

        <div class="modal fade " id="cameraModal" tabindex="-1" role="dialog" aria-labelledby="cameraModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                    <div class="modal-dialog mw-100 w-75" role="document">
                        <div class="modal-content">
                            <div class="modal-header divBg">
                                <h5 class="modal-title" id="cameraModalLabel">Capture Your Image</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.state.cameraOnFront ? this.captureOffFront : this.captureOffBack }>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {this.state.cameraOnFront || this.state.cameraOnBack ? <Capture onConfirm={this.onImageConfirm}/> : ""}
                            </div>
                        </div>
                    </div>
        </div>

        {
          values.loadingSpin ? (
            <div className="row d-flex justify-content-center mt-5">
                  <Loading/>

          </div>
          ):""
          
        }
                  
                  
                  
       




        <div className="row d-flex justify-content-center my-5">
        <div className="b mr-2" onClick={this.doOcr}>
            OCR
          </div>
          {/* {
            allData.Response_Code ? (
              <div className="b" onClick={this.continue}>
            Next
          </div>
            ):""
          } */}
          
          <div className="b" onClick={this.continue}>
            Next
          </div>

        </div>

      </div>
        )
    }
}

export default NidImagesSim;
