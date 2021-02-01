import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { channelAccountSearch } from "../../Url/ApiList";
import { largeTime, mediumTime } from "../../../Utils/notificationTime";
import axios from "axios";
import {FaSearch} from "react-icons/fa";
import Pagination from "../../../Reusable/Pagination";

export class ChannelSearch extends Component {
  state = {
    channelCode: "",
    channelData: "",
    channelApplicants: [],
    channelCode: "",
    channelAccountId: "",
  };

  async componentDidMount() {
    //   console.log(this.props.location.state);
    try {
      if (
        this.props.location.state.channelCode !== "" &&
        this.props.location.state.channelAccountId !== ""
      ) {
        let config = {
          headers: {
            "x-auth-token": JSON.parse(sessionStorage.getItem("x-auth-token")),
          },
        };

        let newObj = {
          channelCode: this.props.location.state.channelCode,
          channelAccountId: this.props.location.state.channelAccountId,
        };

        try {
          let res = await axios.post(channelAccountSearch, newObj, config);
          //   console.log("channelData", res.data.data);
          if (res.data.data === null) {
            NotificationManager.info("No Data Found", "Message", mediumTime);
            return;
          }
          this.setState({
            channelData: res.data.data,
            channelApplicants: res.data.data.applicants,
          });
        } catch (error) {
          if (error.response) {
            let message = error.response.data.message;
            //console.log("Error",error.response)
            NotificationManager.error(message, "Click TO Remove", largeTime);
          } else if (error.request) {
            //  console.log("Error Connecting...", error.request)
            NotificationManager.error(
              "Error Connecting...",
              "Click TO Remove",
              largeTime
            );
          } else if (error) {
            NotificationManager.error(
              error.toString(),
              "Click TO Remove",
              largeTime
            );
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAPI = async (e) => {
    let { channelCode, channelAccountId } = this.state;
    e.preventDefault();

    this.setState({channelData:"", channelApplicants:[]});

    let config = {
      headers: {
        "x-auth-token": JSON.parse(sessionStorage.getItem("x-auth-token")),
      },
    };

    let obj = {
      channelCode,
      channelAccountId,
    };

    try {
      let res = await axios.post(channelAccountSearch, obj, config);
      //   console.log("channelData", res.data.data);
      if (res.data.data === null) {
        NotificationManager.info("No Data Found", "Message", mediumTime);
        return;
      }
      this.setState({
        channelData: res.data.data,
        channelApplicants: res.data.data.applicants,
        currentObj: obj,
      });
    } catch (error) {
      if (error.response) {
        let message = error.response.data.message;
        //console.log("Error",error.response)
        NotificationManager.error(message, "Click TO Remove", largeTime);
      } else if (error.request) {
        //  console.log("Error Connecting...", error.request)
        NotificationManager.error(
          "Error Connecting...",
          "Click TO Remove",
          largeTime
        );
      } else if (error) {
        NotificationManager.error(
          error.toString(),
          "Click TO Remove",
          largeTime
        );
      }
    }
  };

  fullProfile = (id) => {
    //   this.props.history.push('/dashboard/fullEkyc', id);
    let currObj = {
      channelCode: this.state.channelCode,
      channelAccountId: this.state.channelAccountId,
      id,
    };
    this.props.history.push("/dashboard/fullChannelEkycData", currObj);
  };

  render() {
    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="card col" style={{ padding: "25px" }}>
            <div className="im">
              <h5 className="text-muted text-center pt-2">
                <i>
                  <FaSearch />
                </i>{" "}
                Channel Search
              </h5>
            </div>
            <div className="card-body">
              <div className="row d-flex justify-content-center">
                <div
                  className="col-12 col-sm-5 imTwoWhite"
                  style={{ margin: "0 25px" }}
                >
                  {/* Channel Code */}
                  <div className="form-group">
                    <label htmlFor="">Channel Code</label>
                    <select
                      className="custom-select"
                      value={this.state.channelCode}
                      onChange={this.onChange}
                      name="channelCode"
                    >
                      <option value="" disabled>
                        --Select--
                      </option>
                      <option value="ABS">Agent Banking</option>
                      <option value="CBS">Conventional Core Banking</option>
                      <option value="ICBS">Islamic Core Banking</option>
                      <option value="OMNI">Omni Channel </option>
                      {/* <option value='EKYC'>EKYC</option> */}
                    </select>
                  </div>
                </div>

                <div className="col-12 col-sm-5 imTwoWhite">
                  {/* Channel Code */}
                  <div className="form-group">
                    <label htmlFor="">Channel Account Number</label>
                    <input
                      type="text"
                      value={this.state.channelAccountId}
                      onChange={this.onChange}
                      className="form-control"
                      name="channelAccountId"
                      id="channelId"
                      aria-describedby="emailHelp"
                      placeholder="Channel Account Number"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center pt-2">
              <button onClick={(e) => this.handleAPI(e)} className="b">
                <i>
                  <FaSearch />
                </i>{" "}
                Search
              </button>
            </div>
          </div>
        </div>

        <br></br>

        {/* Card start */}
        <div className="row">
          <div className="imTwoWhite col-sm-12">
            <div className="im">
              <h5 className="text-muted text-center pt-2">
                <i className="fas fa-list-ul"></i> Channel Account Data
              </h5>
            </div>
            <div className="imTwoGray mt-2">
              <div className="row d-flex justify-content-center">
                {this.state.channelApplicants.map((data, index) => (
                  <div
                    key={index}
                    className="neoBg col-sm-3 m-2 p-3 animated zoomIn"
                  >
                    <div className="im">
                      <small style={{ color: "#308f8f" }}>{data.name}</small>
                    </div>
                    <hr />
                    <div className="" style={{ fontSize: "16px" }}>
                      <small style={{ color: "green" }}>
                        <span style={{ color: "#d3830a" }}>NID No : </span>
                        {data.nid}
                      </small>
                      <br />
                      <small style={{ color: "green" }}>
                        <span style={{ color: "#d3830a" }}>
                          Channel Account No. :{" "}
                        </span>
                        {this.state.channelData.channelAccountId === null
                          ? ""
                          : this.state.channelData.channelAccountId
                          ? this.state.channelData.channelAccountId
                          : ""}
                      </small>
                      <br />
                      <small style={{ color: "green" }}>
                        <span style={{ color: "#d3830a" }}>Cell No : </span>
                        {data.mobile}
                      </small>
                      <br />
                      <small style={{ color: "green" }}>
                        <span style={{ color: "#d3830a" }}>
                          Verification Type :{" "}
                        </span>
                        {data.verificationType}
                      </small>
                      <br />
                      <small style={{ color: "green" }}>
                        <span style={{ color: "#c47a0b" }}>
                          Onboarding Type :{" "}
                        </span>
                        {data.onboardingType}
                      </small>
                      <br />
                      {/* <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Address : </span>{data.permanentAddressBangla}</small><br /> */}
                    </div>

                    <hr />
                    <div className="row d-flex justify-content-around">
                      <button
                        className="neoBtnSmall"
                        style={{ color: "#308f8f" }}
                        onClick={() => this.fullProfile(data.id)}
                      >
                        Full Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Card start */}
      </div>
    );
  }
}

export default withRouter(ChannelSearch);
