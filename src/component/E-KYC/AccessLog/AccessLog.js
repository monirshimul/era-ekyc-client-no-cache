import React, { Component } from "react";
import { accessLog } from "../Url/ApiList";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { largeTime } from "../../Utils/notificationTime";
import Pagination from "../../Reusable/Pagination";

export class AccessLog extends Component {
  state = {
    accessLog: [],
    page: 1,
    totalPages: "",
    totalLogs: "",
    text_input: "",
    goButton: false,
  };

  async componentDidMount() {
    const config = {
      headers: {
        "x-auth-token": JSON.parse(sessionStorage.getItem("x-auth-token")),
      },
    };

    try {
      let accessData = await axios.get(accessLog + this.state.page, config);
    //    console.log('accessLog', accessData.data.data);
      let accessDetails = accessData.data.data;
      this.setState({
        accessLog: accessDetails.data,
        page: accessDetails.currentPage,
        totalPages: accessDetails.totalPages,
        totalLogs: accessDetails.totalLogs,
      });
    } catch (error) {
      if (error.response) {
        let message = error.response.data.message;
        //console.log("Error",error.response)
        NotificationManager.error(message, "Click TO Remove", largeTime);
      } else if (error.request) {
        // console.log("Error Connecting...", error.request)
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

  // ===========================Pagination=====================================================
  handlePage = (e) => {
    if (e.target.value !== "") {
      this.setState({
        text_input: e.target.value,
        goButton: true,
      });
    } else {
      this.setState({
        text_input: e.target.value,
        goButton: false,
      });
    }
  };

  handleGoInput = (e) => {
    e.preventDefault();
    const { totalPages, text_input } = this.state;
    let pageReq = "";
    if (text_input !== "" && text_input > 0 && text_input <= totalPages) {
      pageReq = text_input;
      this.setState({ page: pageReq });
      this.pageChanges(pageReq);
      this.setState({text_input:''});
    } else {
      console.log("Invalid Page No.");
      //alert('Invalid Page No.');
      let invalidMessage = "Invalid Page No.";
      NotificationManager.warning(invalidMessage, "Warning", 5000);
      this.setState({ text_input: "", goButton: false });
    }
  };

  increment = () => {
    const { totalPages } = this.state;
    let nextPage = this.state.page + 1;
    this.setState({ page: nextPage });
    //console.log(nextPage);
    if (nextPage > 0 && nextPage <= totalPages) {
      this.pageChanges(nextPage);
    } else {
      //console.log('Page out of bound');
      let pageOutBoundMessage = "Page out of bound";
      NotificationManager.warning(pageOutBoundMessage, "Warning", 5000);
    }
  };

  //=================================Decrement function=======================================
  decrement = () => {
    const { totalPages } = this.state;

    let nextPage = this.state.page - 1;
    this.setState({ page: nextPage });
    // console.log(nextPage);
    if (nextPage > 0 && nextPage <= totalPages) {
      this.pageChanges(nextPage);
    } else {
      //console.log('Page out of bound');
      //alert('Page out of bound');
      let pageOutBoundMessage = "Page out of bound";
      NotificationManager.warning(pageOutBoundMessage, "Warning", 5000);
    }
  };

  pageChanges = async (newPage) => {
    const config = {
      headers: {
        "x-auth-token": JSON.parse(sessionStorage.getItem("x-auth-token")),
      },
    };

    try {
      let paginationUser = await axios.get(accessLog + newPage, config);
      //    console.log("pagination pages", paginationUser.data.data);
      this.setState({ totalPages: paginationUser.data.data.totalPages });
      let paginUser = paginationUser.data.data;
      this.setState({
        page: paginUser.currentPage,
        totalLogs: paginUser.totalLogs,
        accessLog: paginUser.data,
      });
    } catch (error) {
      if (error.response) {
        let message = error.response.data.message;
        //console.log("Error",error.response)
        NotificationManager.error(message, "Click TO Remove", largeTime);
      } else if (error.request) {
        // console.log("Error Connecting...", error.request)
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

  // =====================================Pagination====================================================

  renderTableData() {
    try {
      return this.state.accessLog.map((al, index) => {
        const { id, loginDateTime, logoutDateTime, userIdRef } = al; //destructuring
        return (
          <tr key={id}>
            <td style={{ textAlign: "center", fontWeight: "600px" }}>{id}</td>
            <td style={{ textAlign: "center", fontWeight: "600px" }}>
              {new Date(loginDateTime).toLocaleString()}
            </td>
            <td style={{ textAlign: "center", fontWeight: "600px" }}>
              { logoutDateTime === null ? "" : new Date(logoutDateTime).toLocaleString()}
            </td>
            <td style={{ textAlign: "center", fontWeight: "600px" }}>
              {userIdRef}
            </td>
          </tr>
        );
      });
    } catch (err) {
      console.log("err", err);
    }
  }

  render() {
    return (
      <div>
        <div className="im">
          <h5 className="text-muted text-center pt-2">
            <i class="fas fa-list-ul"></i> Access Log
          </h5>
        </div>
        <table id="data" style={{ fontSize: "11pt" }}>
          <thead>
            <tr>
              <th style={{ width: "100px", textAlign: "center" }}>ID</th>
              <th style={{ width: "300px", textAlign: "center" }}>
                Login Date & Time
              </th>
              <th style={{ width: "300px", textAlign: "center" }}>
                Logout Date & Time
              </th>
              <th style={{ width: "200px", textAlign: "center" }}>User ID</th>
            </tr>
          </thead>

          <tbody>{this.renderTableData()}</tbody>
        </table>

        {/* pagination added*/}

        {this.state.totalPages > 1 ? (
          <Pagination
            //   historyPerPage={this.state.historyPerPage}
            //   totalHistory={this.state.totalHistory}
            // increment, decrement, page, total_pages, onInputChange, handleGo, text_input, goButton
            increment={this.increment}
            decrement={this.decrement}
            page={this.state.page}
            total_pages={this.state.totalPages}
            onInputChange={this.handlePage}
            text_input={this.state.text_input}
            goButton={this.state.goButton}
            handleGo={this.handleGoInput}
          />
        ) : (
          <div>
            <br />
            <br />
            <br />
            <p style={{ textAlign: "center" }}>
              {" "}
              <strong>
                {" "}
                page No: {this.state.page + "/" + this.state.totalPages}
              </strong>{" "}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(AccessLog);
