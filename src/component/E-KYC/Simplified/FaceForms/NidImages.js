import React, { Component } from 'react';
import "../utils/Common.css";
import NidOne from '../images/nid-f2.svg';
import NidTwo from '../images/nid-f3.svg';
import NidThree from '../images/nid-f4.svg';
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

  continue = async (e) => {
    e.preventDefault();
    const { NidFront, NidFrontOcr, NidFrontType, NidBack, NidBackOcr,NidBackType } = this.state;

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

   
    if(nidData.data.Response_Code){
   

    const obj = {
      NidFront,
      NidFrontOcr,
      NidFrontType,
      NidBack,
      NidBackOcr,
      NidBackType,
      OcrData : nidData.data
    }
    localStorage.setItem("NidImages", JSON.stringify(obj));

    this.props.history.push('/dashboard/capture-face');
  }else{
    let nidOcrMessage = "Please Again Input Nid";
    NotificationManager.warning(nidOcrMessage, "Warning", 5000);
  }
  
}


  render() {

    const { NidFront, NidBack, flag } = this.state;
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
                <div class="input-group mb-3 ">
                  <div class="custom-file">
                    <input type="file"
                      onChange={this.fileSelectedHandler}

                      class="form-control-file" id="input-file" />
                    <label class="custom-file-label" for="input-file">Choose Image</label>
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
                <div class="input-group mb-3 ">
                  <div class="custom-file">
                    <input type="file"
                      onChange={this.fileSelectedHandlerTwo}

                      class="form-control-file" id="input-file-two" />
                    <label class="custom-file-label" for="input-file-two">Choose Image</label>
                  </div>
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
    )
  }
}

export default withRouter(NidImages);
