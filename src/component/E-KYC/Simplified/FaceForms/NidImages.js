import React, { Component } from 'react';
import "../utils/Common.css";
import NidOne from '../images/nid-f2.svg';
import NidTwo from '../images/nid-f3.svg';
import NidThree from '../images/nid-f4.svg';
import Loading from '../utils/CustomLoding/Loading.js';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from "react-notifications";
import axios from 'axios';

export class NidImages extends Component {
  state = {
    NidFront: "",
    NidFrontOcr:"",
    NidFrontType: '',
    NidBack: '',
    NidBackOcr: '',
    NidBackType: '',
    allData:'',
    loading:false,
    flag: 'data:image/jpeg;base64,',
    binaryFlag:"updateimage"
  }


  componentDidMount() {
    if ('NidImages' in localStorage) {
      let data = JSON.parse(localStorage.getItem('NidImages'));
      console.log(data);
      this.setState({
        NidFront: data.NidFront,
        NidFrontOcr: data.NidFrontOcr,
        NidFrontType: data.NidFrontType,
        NidBackOcr:data.NidBackOcr,
        NidBack: data.NidBack,
        NidBackType: data.NidBackType

      })
    }

  }

  //Nid front Image upload
  fileSelectedHandler = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      this.setState({
        NidFrontOcr: file
      })
     // console.log(file.type);
      var reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = () => {
        let base64Image = btoa(reader.result);
        this.setState({
          NidFront: base64Image,
          NidFrontType: file.type

        });
      };
      reader.onerror = () => {
        console.log("there are some problems");
        alert("File can not be read");
      };
    }
  };

  // fileSelectedHandler = (event) => {
  //   if (event.target.files[0]) {
  //     this.setState({
  //       NidFront:event.target.files[0]
  //     })
  //   }
  // }


  // fileSelectedHandlerTwo = (event) => {
  //   if (event.target.files[0]) {
  //     this.setState({
  //       NidBack:event.target.files[0]
  //     })
  //   }
  // }

  // //Nid Back Image upload
  fileSelectedHandlerTwo = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      this.setState({
        NidBackOcr: file
      })
     // console.log(file.type);
      var reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = () => {
        let base64Image = btoa(reader.result);
        this.setState({
          NidBack: base64Image,
          NidBackType: file.type
        })
      };
      reader.onerror = () => {
        console.log("there are some problems");
        alert("File can not be read");
      };
    }
  };



  doOcr = async (e)=>{
    e.preventDefault();
    const { NidFront, NidFrontOcr, NidFrontType, NidBack, NidBackOcr,NidBackType } = this.state;
    if(NidFront && NidBack){
      this.setState({
        loading: !this.state.loading
      })
  
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
  
      formData.append("userimage", this.state.NidFrontOcr);
      formData.append("backPart", this.state.NidBackOcr);
      formData.append("api_pass", "updateimage");
      let nidData = await axios.post(`http://203.76.150.250/ERAPAYOCR/OCRFromSmartCardImage.do`, formData);
      console.log(nidData.data);
      this.setState({
        allData:nidData.data,
        loading: false
      })
      console.log("OCR STate",this.state.allData);
  
      NotificationManager.success("OCR Completed", "Success",5000);
    }else{
      NotificationManager.warning("Please Provide NID Images", "Warning",5000);
    }
    
    
    
  }

  continue = async (e) => {
    e.preventDefault();
    const { NidFront, NidFrontOcr, NidFrontType, NidBack, NidBackOcr,NidBackType, allData } = this.state;
    
 
   
    if(allData.Response_Code){
   

    const obj = {
      NidFront,
      NidFrontOcr,
      NidFrontType,
      NidBack,
      NidBackOcr,
      NidBackType,
      OcrData : allData
    }
    localStorage.setItem("NidImages", JSON.stringify(obj));
    
    let nextRoute = JSON.parse(localStorage.getItem('Verification'));

    if (nextRoute.type === "FACE") {

      this.props.history.push('/dashboard/capture-face');
    } else {
      this.props.history.push('/dashboard/finger-print');
    }
  }else{
    let nidOcrMessage = "Please Do OCR First";
    NotificationManager.warning(nidOcrMessage, "Warning", 5000);
  }
  
}


  render() {

    const { NidFront, NidBack, flag, allData, loading } = this.state;
    // console.log(this.state.NidFrontOcr);
    return (
      <div className="">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-12 d-flex justify-content-around">
            <div className="card col-sm-6" style={{ paddingTop: "25px", marginRight: "30px" }}>
              <div className="card-header up">
                <h3>NID Front</h3>
              </div>
              <div className="card-body d-flex justify-content-center">

                <img
                  src={NidFront ? (flag+NidFront) : NidThree}
                  style={{
                    margin: "auto",
                    cursor: "pointer",
                    width: "300px",
                    height: "200px",
                  }}
                  defaultValue={NidFront}
                  className="img-fluid img-thumbnail im"
                  id="FrontNidPic"
                  alt=""
                />
              </div>
              <div
                className="card-footer d-flex justify-content-around"
                style={{ background: "#fff" }}
              >
                <div className="input-group mb-3 ">
                  <div className="custom-file">
                    <input type="file"
                      onChange={this.fileSelectedHandler}

                      className="form-control-file" id="input-file" />
                    <label className="custom-file-label" htmlFor="input-file">Choose Image</label>
                  </div>

                </div>
              </div>
            </div>

            <div className="card col-sm-6" style={{ paddingTop: "25px" }}>
              <div className="card-header up">
                <h3>NID Back</h3>
              </div>
              <div className="card-body d-flex justify-content-center">
                <img
                  src={NidBack ? (flag+ NidBack) : NidTwo}
                  style={{
                    margin: "auto",
                    cursor: "pointer",
                    width: "300px",
                    height: "200px",
                  }}
                  defaultValue={NidBack}
                  className="img-fluid img-thumbnail im"
                  id="nidBack"
                  alt=""
                />
              </div>
              <div
                className="card-footer d-flex justify-content-around"
                style={{ background: "#fff" }}
              >
                <div className="input-group mb-3 ">
                  <div className="custom-file">
                    <input type="file"
                      onChange={this.fileSelectedHandlerTwo}

                      className="form-control-file" id="input-file-two" />
                    <label className="custom-file-label" htmlFor="input-file-two">Choose Image</label>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>

        {
          loading ? (
            <div className="row d-flex justify-content-center mt-5">
                  <Loading/>

          </div>
          ):""
          
        }
                  
                  
                  
       




        <div className="row d-flex justify-content-center my-5">
        <div className="b mr-2" onClick={this.doOcr}>
            OCR
          </div>
          {
            allData.Response_Code ? (
              <div className="b" onClick={this.continue}>
            Next
          </div>
            ):""
          }
          
        </div>

      </div>
    )
  }
}

export default withRouter(NidImages);

