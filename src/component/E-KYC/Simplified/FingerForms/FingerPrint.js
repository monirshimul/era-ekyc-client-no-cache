import React, { Component } from "react";
import axios from "axios";
import {fingerValidate} from "../../Url/ApiList";
import Loading from "../utils/CustomLoding/Loading.js";
import Finger from "../images/tap.svg";
import FingerOk from "../images/fingerprintOk.svg";
import { NotificationManager } from "react-notifications";

export class FingerVerification extends Component {
  state = {
    nid: JSON.parse(localStorage.getItem("NidImages")) ? JSON.parse(localStorage.getItem("NidImages")).OcrData.id: "",
    dob: JSON.parse(localStorage.getItem("NidImages"))? JSON.parse(localStorage.getItem("NidImages")).OcrData.DOB: "",
    rIndex: "",
    rThumb: "",
    lIndex: "",
    lThumb: "",
    isEnable: false,
    loading: false,
    verifyToken:""
  };

  componentDidMount() {
    if ("FingerPrint" in localStorage) {
      let data = JSON.parse(localStorage.getItem("FingerPrint"));
      // console.log(data);
      this.setState({
        nidNo: data.nidNo,
        dob: data.dob,
        rIndex: data.rIndex,
        rThumb: data.rThumb,
        lIndex: data.lIndex,
        lThumb: data.lThumb,
      });
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleClick = (e) => {
    e.preventDefault();

    this.setState({ isEnable: true, loading: !this.state.loading });

    const config = {
      headers: {
        "x-auth-token": sessionStorage.getItem("x-auth-token"),
      },
    };

    const fingerobj = {
      MinQ: 30,
      Retry: 3,
      TokenId: "g86v5s4g5se84g5sfd4g5werx25sdf4f",
    };

    axios
      .post(`http://localhost:20000/api/info/fingerdata`, fingerobj, config)
      .then((res) => {
        //  console.log(res);
        const data = res.data;
        let rightThumb = data[0].fingerData;
        let rightIndex = data[1].fingerData;
        let leftThumb = data[2].fingerData;
        let leftIndex = data[3].fingerData;

        if (data[0].fingerId === 1) {
          this.setState({ rThumb: rightThumb });
        } else {
          alert("data not found!!");
        }
        if (data[1].fingerId === 2) {
          this.setState({ rIndex: rightIndex });
        } else {
          alert("data not found!!");
        }
        if (data[2].fingerId === 6) {
          this.setState({ lThumb: leftThumb });
        } else {
          alert("data not found!!");
        }
        if (data[3].fingerId === 7) {
          this.setState({ lIndex: leftIndex });
        } else {
          alert("data not found!!");
        }

        this.setState({
          isEnable: false,
          loading: !this.state.loading,
        });
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400 || err.response.status === 401) {
            console.log(err.response.data);
            alert(err.response.data.message);
            this.setState({ isEnable: false });
          } else if (err.response.status === 404) {
            alert("Not Found");
            this.setState({ isEnable: false });
          } else if (err.response.status === 500) {
            alert(err.response.data.message);
            this.setState({ isEnable: false });
          }
        } else if (err.request) {
          console.log(err.request);
          alert("Error Connectiong");
          this.setState({ isEnable: false });
        } else {
          console.log("Error", err.message);
          alert(err.message);
          this.setState({ isEnable: false });
        }
      });
  };

  continue = async(e) => {
    e.preventDefault();
    const { nid, dob, rThumb, rIndex, lThumb, lIndex, verifyToken } = this.state;

    
    const config = {
      headers: {
        "x-auth-token": JSON.parse(sessionStorage.getItem("x-auth-token"))
      }
    };

    let obj = {
      nid,
      dob,
      rIndex,
      rThumb,
      lIndex,
      lThumb,
    };
    this.props.history.push("/dashboard/personal-details");

    try {
      

      //console.log("Token",obj)
  
      let fingerRes = await axios.post(fingerValidate, obj, config)
      //console.log("fingerRes",fingerRes.data.data.verificationToken)
      this.setState({
        verifyToken: fingerRes.data.data.verificationToken
      })
      
      localStorage.setItem("FingerPrint", JSON.stringify(obj));
      sessionStorage.setItem('x-verification-token', JSON.stringify(fingerRes.data.data.verificationToken))
      this.props.history.push("/dashboard/personal-details");
      // if(verifyToken){
        
        
      // }else{
      //   NotificationManager.error("Please Provide Finger","Error",5000)
      // }
      
    } catch (error) {
      if (error.response) {
        let message = error.response.data.message
        //console.log("Error",error.response)
        NotificationManager.error(message, "Error", 5000);
    } else if (error.request) {
        console.log("Error Connecting...", error.request)
        NotificationManager.error("Error Connecting...", "Error", 5000);
    } else if (error) {
        NotificationManager.error(error.toString(), "Error", 5000);
    }
    }
    
  };

  back = (e) => {
    e.preventDefault();
    this.props.history.push("/dashboard/nid-images");
  };

  render() {
    let { loading, rThumb } = this.state;
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-6 imTwoWhite p-5">
            <div className="divBg pt-3">
              <h4>FingerPrint Verification</h4>
            </div>

            <form onSubmit={this.continue}>
              {/* <label htmlFor="nidNo">Nid No:</label><br />
      <input type="text" id="nidNo" name="nidNo" value={this.state.nidNo} /><br /> */}
              <div className="form-group">
                <label htmlFor="">Nid No:</label>
                <input
                  style={{ borderRadius: "50px" }}
                  type="text"
                  value={this.state.nid}
                  name="nidNo"
                  onChange={this.onChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Applicant's Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Date of Birth:</label>
                <input
                  style={{ borderRadius: "50px" }}
                  type="text"
                  value={this.state.dob}
                  name="dob"
                  onChange={this.onChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Applicant's Name"
                />
              </div>
              {/* <label htmlFor="dob">Date of Birth:</label><br />
      <input type="date" id="dob" name="dob" onChange={this.onChange} value={this.state.dob} /><br /><br /> */}

              <div className="row d-flex justify-content-center">
                <div className="col animated zoomIn mt-2">
                  {loading ? (
                    <div className="text-center">
                      <Loading />
                      <small className="text-muted">
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                        Notice Taskbar For Fingerprint Application Icon
                      </small>
                    </div>
                  ) : (
                    <div className="imTwoWhite text-center">
                      <img
                        src={rThumb ? FingerOk : Finger}
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
                    </div>
                  )}
                </div>
              </div>

              <div
                // disabled={this.state.isEnable}
                className="imTwoWhite text-center mt-2"
                style={{ color: "green", cursor: "pointer", fontSize: "17px" }}
                onClick={this.handleClick}
              >
                <i className="fas fa-fingerprint" /> Provide Finger Print
              </div>

              <div className="row d-flex justify-content-center mt-3">
                <span className="b mr-5" onClick={this.back}>
                  Back
                </span>
                <span className="b" onClick={this.continue}>
                  Next
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FingerVerification;
