import React, { Component } from 'react';
import { pendingAccount, pendingSearchbyId } from '../Url/ApiList';
import { NotificationManager } from "react-notifications";
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import {
  FaEdit,
  FaBatteryThreeQuarters, FaMizuni, FaPenNib,
  FaDigitalTachograph, FaArchive, FaBinoculars,
  FaSearch, FaListUl, FaSortNumericUp,
  FaElementor, FaUserShield, FaUserTag, FaUserEdit,
  FaCalendarCheck, FaCalendarAlt, FaMicroblog, FaPenAlt, FaCalendarDay
} from "react-icons/fa";

export class PendingAccount extends Component {
  state = {
    accountType: '',
    channelCode: "",
    accountStatus: "",
    page: 1,
    totalPages: "",
    totalAccount: '',
    accountData: [],
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  handleAPI = async (e) => {
    e.preventDefault();

    let config = {
      headers: {

        'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

      }
    };

    let obj = {};
    console.log("type", this.state.accountType);

    if (e.target.name === "accountType" && e.target.value !== "" || e.target.value !== "none") {
      // this.setState({ accountType: e.target.value });
      obj.type = e.target.value;
    }

    // if (e.target.name === "channelCode" && e.target.value !== "" || e.target.value !== "none") {
    //   this.setState({ channelCode: e.target.value });
    //   obj.channelCode = e.target.value;
    // }

    // if (e.target.name === "accountStatus" && e.target.value !== "" || e.target.value !== "none") {
    //   console.log("statusvalue", e.target.value);
    //   this.setState({ status: e.target.value });
    //   obj.status = e.target.value;
    // }

    console.log("myObj", obj);

    // let pendingApi = await axios.post(pendingAccount + this.state.page, obj, config);
    // console.log("pendingApi", pendingApi.data);
    // let pendingData = pendingApi.data.data;
    // this.setState({ accountData: pendingData.accounts, totalPages: pendingData.totalPages, totalAccount: pendingData.totalAccount });



  }




  render() {
    let { searchValue } = this.state;
    return (
      <div className="container">

        {/* <div className="d-flex justify-content-center">
          <div className="card col" style={{ padding: "25px" }}>
            <div className="im">
              <h5 className="text-muted text-center pt-2">
                <i><FaSearch /></i> Search Account by ID
                        </h5>
            </div>
            <div className="card-body d-flex justify-content-center">
              <form className="col-sm-8">
                <ReactTooltip id="searchUser" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                  <span style={{ fontSize: "15px" }}><span style={{ color: "red" }}>*</span> Please select a search option before searching...</span>
                </ReactTooltip>
                <div className="form-group " >
                  <label htmlFor=""></label>
                  <input data-tip data-for="searchUser" style={{ borderRadius: "50px" }} name="searchValue" value={searchValue} onChange={this.textHandleChange} type="text" className="form-control" placeholder="Search by Account ID " />
                  <small className="text-muted pl-2">
                    <span style={{ color: "#39c12a", fontSize: "14px" }}>*</span> Chosse any option from below for searching.
                            </small>
                </div>
                <div className="form-group d-flex justify-content-center">
                  <div class="form-check">
                    <label class="form-check-label">
                      <input type="radio" class="form-check-input" onChange={this.searchValueChange} name="optionsRadios" id="optionsRadios1" value="Account Id" />
                                            Search By Account ID
                                        </label>
                  </div>&nbsp;&nbsp;&nbsp;


                                </div>
                <div className="d-flex justify-content-center pt-2" >
                  <button onClick={(e) => this.onSearchSubmit(e)} className="b" ><i><FaSearch /></i> Search</button>
                </div>
              </form>
            </div>

          </div>

        </div> */}



        <div className="row d-flex justify-content-center">
          <div className="col-12 col-sm-4 imTwoWhite">
            {/* Account Type */}
            <div className='form-group'>
              <label htmlFor="">Account Type</label>
              <select
                className='custom-select'
                value={this.state.accountType}
                onChange={(e) => { this.onChange(e); this.handleAPI(e) }}
                name="accountType"
              >
                <option value='' disabled>--Select--</option>
                <option value='S'>Single Account</option>
                <option value='J'>Joint Account</option>
                <option value="none" >None</option>

              </select>
            </div>
          </div>

          <div className="col-12 col-sm-4 imTwoWhite">
            {/* Channel Code */}
            <div className='form-group'>
              <label htmlFor="">Channel Code</label>
              <select
                className='custom-select'
                value={this.state.channelCode}
                onChange={(e) => { this.onChange(e); this.handleAPI(e) }}
                name="channelCode"
              >
                <option value='' disabled>--Select--</option>
                <option value='ABS'>Agent Banking</option>
                <option value='CBS'>Conventional Core Banking</option>
                <option value='ICBS'>Islamic Core Banking</option>
                <option value='OMNI'>Omni Channel </option>
                <option value="none">None</option>
                {/* <option value='EKYC'>EKYC</option> */}
              </select>
            </div>
          </div>

          <div className="col-12 col-sm-4 imTwoWhite">
            {/* Channel Code */}
            <div className='form-group'>
              <label htmlFor="">Account Status</label>
              <select
                className='custom-select'
                value={this.state.accountStatus}
                onChange={(e) => { this.onChange(e); this.handleAPI(e) }}
                name="accountStatus"
              >
                <option value='' disabled>--Select--</option>
                <option value='P'>Pending</option>
                <option value='A'>Approved</option>
                <option value='R'>Rejected</option>
                <option value='D'>Deleted </option>
                <option value="none">None</option>

              </select>
            </div>
          </div>

        </div>



      </div>
    )
  }
}

export default PendingAccount;
