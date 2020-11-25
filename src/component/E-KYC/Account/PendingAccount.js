import React, { Component } from 'react';
import { pendingAccount, getProduct, discardAccount } from '../Url/ApiList';
import { NotificationManager } from "react-notifications";
import ReactTooltip from 'react-tooltip';
import { AccountType, PendingStatus, ProductCategoryType, ProductCodeGetName } from '../../Utils/fullFormConversion'
import axios from 'axios';
import Pagination from '../../Reusable/Pagination';
import {
  FaEdit,
  FaBatteryThreeQuarters, FaMizuni, FaPenNib,
  FaDigitalTachograph, FaArchive, FaBinoculars,
  FaSearch, FaListUl, FaSortNumericUp,
  FaElementor, FaUserShield, FaUserTag, FaUserEdit,
  FaCalendarCheck, FaCalendarAlt, FaMicroblog, FaPenAlt, FaCalendarDay
} from "react-icons/fa";
import { largeTime } from './../../Utils/notificationTime';

export class PendingAccount extends Component {
  state = {
    accountType: 'none',
    channelCode: "none",
    accountStatus: "none",
    productCategory: "none",
    id: '',
    currentStateObj: "",
    ProductCodeConvertName: "",
    page: 1,
    totalPages: "",
    totalAccount: '',
    accountData: [],
    accountDetails: "",
    text_input: "",
    goButton: false,
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

    if (this.state.id !== "") {
      obj.id = this.state.id
    } else {

      if (this.state.accountType !== "none") {
        obj.type = this.state.accountType
      }

      if (this.state.channelCode !== "none") {
        obj.channelCode = this.state.channelCode
      }

      if (this.state.accountStatus !== "none") {
        obj.status = this.state.accountStatus
      }

      if (this.state.productCategory !== "none") {
        obj.productCategoryCode = this.state.productCategory
      }

    }



    console.log("myObj", obj);
    try {
      let pendingApi = await axios.post(pendingAccount + this.state.page, obj, config);
      console.log("pendingApi", pendingApi.data.data);

      let pendingData = pendingApi.data.data;
      if (pendingData.length !== 0) {
        this.setState({ accountData: pendingData.accounts, totalPages: pendingData.totalPages, totalAccount: pendingData.totalAccount });
        this.setState({ currentStateObj: obj });

        console.log("currentObj", this.state.currentStateObj);
        // let data = await ProductCodeGetName(pendingData.accounts.productCode);
        // console.log("productName", data);
        // this.setState({ ProductCodeConvertName: data });

      } else {
        NotificationManager.info("No Data Found", "Message", largeTime);
      }

    } catch (error) {
      if (error.response) {
        let message = error.response.data.message
        //console.log("Error",error.response)
        NotificationManager.error(message, "Click TO Remove", largeTime);
      } else if (error.request) {
        // console.log("Error Connecting...", error.request)
        NotificationManager.error("Error Connecting...", "Click TO Remove", largeTime);
      } else if (error) {
        NotificationManager.error(error.toString(), "Click TO Remove", largeTime);
      }
    }

  }


  // ===========================Pagination=====================================================
  handlePage = (e) => {
    if (e.target.value !== "") {
      this.setState({
        text_input: e.target.value,
        goButton: true,
      })
    } else {
      this.setState({
        text_input: e.target.value,
        goButton: false
      })
    }
  }

  handleGoInput = (e) => {
    e.preventDefault();
    const { totalPages, text_input } = this.state;
    let pageReq = "";
    if (text_input !== "" && text_input > 0 && text_input <= totalPages) {
      pageReq = text_input;
      this.setState({ pages: pageReq });
      this.pageChanges(pageReq);
    } else {
      console.log('Invalid Page No.');
      //alert('Invalid Page No.');
      let invalidMessage = 'Invalid Page No.';
      NotificationManager.warning(invalidMessage, "Warning", 5000);
      this.setState({ text_input: "", goButton: false });
    }

  }

  increment = () => {
    const { pages, totalPages } = this.state;
    let nextPage = this.state.pages + 1;
    this.setState({ pages: nextPage })
    //console.log(nextPage);
    if (nextPage > 0 && nextPage <= totalPages) {
      this.pageChanges(nextPage);
    } else {
      //console.log('Page out of bound');
      let pageOutBoundMessage = 'Page out of bound';
      NotificationManager.warning(pageOutBoundMessage, "Warning", 5000);

    }
  }

  //=================================Decrement function=======================================
  decrement = () => {
    const { pages, totalPages } = this.state;

    let nextPage = this.state.pages - 1;
    this.setState({ pages: nextPage })
    // console.log(nextPage);
    if (nextPage > 0 && nextPage <= totalPages) {
      this.pageChanges(nextPage);
    } else {
      //console.log('Page out of bound');
      //alert('Page out of bound');
      let pageOutBoundMessage = 'Page out of bound';
      NotificationManager.warning(pageOutBoundMessage, "Warning", 5000);

    }
  }


  pageChanges = async (newPage) => {
    const config = {
      headers: {

        'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

      }
    };
    try {
      let paginationUser = await axios.post(pendingAccount + newPage, "", config);
      // console.log("pagination pages", paginationUser.data.data.users);
      let paginUser = paginationUser.data.data;
      let numPages = paginUser.totalPages;
      let numUsers = paginUser.totalUsers;
      let approveNew = paginUser.users;
      this.setState({ totalPages: numPages, totalUsers: numUsers, allAppUser: approveNew });

    } catch (error) {
      if (error.response) {
        let message = error.response.data.message
        //console.log("Error",error.response)
        NotificationManager.error(message, "Click TO Remove", largeTime);
      } else if (error.request) {
        // console.log("Error Connecting...", error.request)
        NotificationManager.error("Error Connecting...", "Click TO Remove", largeTime);
      } else if (error) {
        NotificationManager.error(error.toString(), "Click TO Remove", largeTime);
      }
    }


  }





  // =====================================Pagination====================================================

  onDetails = async (e) => {
    e.preventDefault();
    // console.log("allDetails", this.state.accountData[e.target.id]);
    this.setState({ accountDetails: this.state.accountData[e.target.id] });

    // let data = await ProductCodeGetName(this.state.accountDetails.productCode);
    // console.log("data", data);
    // this.setState({ ProductCodeConvertName: data });

    let config = {
      headers: {
        'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
      }
    };


    let idObj = {
      code: this.state.accountData[e.target.id].productCode
    }

    // console.log("obj", idObj);


    try {
      let detailsRes = await axios.post(getProduct, idObj, config)
      // console.log('detailsRes', detailsRes.data.data[0].name);
      this.setState({ ProductCodeConvertName: detailsRes.data.data[0].name });


    } catch (error) {
      if (error.response) {
        let message = error.response.data.message
        //console.log("Error",error.response)
        NotificationManager.error(message, "Error", 5000);
      } else if (error.request) {
        //  console.log("Error Connecting...", error.request)
        NotificationManager.error("Error Connecting...", "Error", 5000);
      } else if (error) {
        NotificationManager.error(error.toString(), "Error", 5000);
      }
    }



  }


  onDiscard = async (e) => {
    e.preventDefault();

    let config = {
      headers: {
        'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
      }
    };


    let discardObj = {
      id: this.state.accountData[e.target.id].id
    }

    try {

      let discardData = await axios.post(discardAccount, discardObj, config);
      NotificationManager.success("Discard Successfull", "Success", 10000);
    } catch (error) {
      if (error.response) {
        let message = error.response.data.message
        //console.log("Error",error.response)
        NotificationManager.error(message, "Click TO Remove", largeTime);
      } else if (error.request) {
        //  console.log("Error Connecting...", error.request)
        NotificationManager.error("Error Connecting...", "Click TO Remove", largeTime);
      } else if (error) {
        NotificationManager.error(error.toString(), "Click TO Remove", largeTime);
      }
    }



    try {
      let pendingApi = await axios.post(pendingAccount + this.state.page, this.state.currentStateObj, config);
      // console.log("pendingApi", pendingApi.data.data);

      let pendingData = pendingApi.data.data;
      if (pendingData.length !== 0) {
        this.setState({ accountData: pendingData.accounts, totalPages: pendingData.totalPages, totalAccount: pendingData.totalAccount });

      } else {
        NotificationManager.info("No Data Found", "Message", largeTime);
      }

    } catch (error) {
      if (error.response) {
        let message = error.response.data.message
        //console.log("Error",error.response)
        NotificationManager.error(message, "Click TO Remove", largeTime);
      } else if (error.request) {
        // console.log("Error Connecting...", error.request)
        NotificationManager.error("Error Connecting...", "Click TO Remove", largeTime);
      } else if (error) {
        NotificationManager.error(error.toString(), "Click TO Remove", largeTime);
      }
    }


  }




  render() {
    let { searchValue } = this.state;
    return (
      <div className="container">

        <div className="d-flex justify-content-center">
          <div className="card col" style={{ padding: "25px" }}>
            <div className="im">
              <h5 className="text-muted text-center pt-2">
                <i><FaSearch /></i> Filter Search
                        </h5>
            </div>
            <div className="card-body">

              <div className="row d-flex justify-content-center">
                <div className="col-12 col-sm-6">
                  <form>
                    <div className="form-group">

                      <input type="text" style={{ borderRadius: "50px" }} value={this.state.id} onChange={this.onChange} className="form-control" name="id" id="inputUserId" aria-describedby="emailHelp" placeholder="Account ID" />
                    </div>
                  </form>
                </div>
              </div>

              <div className="row d-flex justify-content-center">
                <div className="col-12 col-sm-3 imTwoWhite">
                  {/* Account Type */}
                  <div className='form-group'>
                    <label htmlFor="">Account Type</label>
                    <select
                      className='custom-select'
                      value={this.state.accountType}
                      onChange={this.onChange}
                      name="accountType"
                    >
                      <option value='' disabled>--Select--</option>
                      <option value='S'>Single Account</option>
                      <option value='J'>Joint Account</option>
                      <option value="none" >None</option>

                    </select>
                  </div>
                </div>

                <div className="col-12 col-sm-3 imTwoWhite">
                  {/* Channel Code */}
                  <div className='form-group'>
                    <label htmlFor="">Channel Code</label>
                    <select
                      className='custom-select'
                      value={this.state.channelCode}
                      onChange={this.onChange}
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

                <div className="col-12 col-sm-3 imTwoWhite">
                  {/* Channel Code */}
                  <div className='form-group'>
                    <label htmlFor="">Account Status</label>
                    <select
                      className='custom-select'
                      value={this.state.accountStatus}
                      onChange={this.onChange}
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


                <div className="col-12 col-sm-3 imTwoWhite">
                  {/* Product Category */}
                  <div className='form-group'>
                    <label htmlFor="">Product Category</label>
                    <select
                      className='custom-select'
                      value={this.state.productCategory}
                      onChange={this.onChange}
                      name="productCategory"
                    >
                      <option value='' disabled>--Select--</option>
                      <option value='S0'>Savings Account</option>
                      <option value='C0'>Current Account</option>
                      <option value='TD'>Term Deposit</option>
                      <option value='RD'>Recurring Deposit</option>
                      <option value="none">None</option>

                    </select>
                  </div>
                </div>








              </div>



            </div>

            <div className="d-flex justify-content-center pt-2" >
              <button onClick={(e) => this.handleAPI(e)} className="b" ><i><FaSearch /></i> Search</button>
            </div>

          </div>

        </div>

        <br></br>



        <div className="row">
          <div className="imTwoWhite col-sm-12">
            <div className="im">
              <h5 className="text-muted text-center pt-2">
                <i class="fas fa-list-ul"></i> Account List
                        </h5>
            </div>
            <div className="imTwoGray mt-2">
              <div className="row d-flex justify-content-center">
                {this.state.accountData.length === 0 ? "" : this.state.accountData.map((data, index) => (
                  <div key={index} className="neoBg col-sm-4 m-2 p-3 animated zoomIn">
                    <div className="im">
                      <small style={{ color: "#308f8f" }}>{data.title}</small>

                    </div>
                    <hr />
                    <div className="" style={{ fontSize: "16px" }}>
                      <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Type : </span>{AccountType(data.type)}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Channel Code : </span>{data.channelCode}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Product Type : </span>{ProductCategoryType(data.productType)}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Status : </span>{PendingStatus(data.status)}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Account ID : </span>{data.channelAccountId}</small><br />
                      {/* <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Address : </span>{data.permanentAddressBangla}</small><br /> */}
                    </div>


                    <hr />
                    <div className="row d-flex justify-content-center">
                      {data.status === "P" ?
                        <button className="neoBtnSmall mr-2" style={{ color: "#308f8f" }} onClick="">Reopen</button>
                        :
                        ""
                      }
                      <button className="neoBtnSmall mr-2" data-toggle="modal" data-target="#modalForPendingDetails" style={{ color: "#d3830a" }} id={index} onClick={(e) => this.onDetails(e)}>Details</button>
                      {data.status === "P" ?
                        <button className="neoBtnSmall" style={{ color: "red" }} id={index} onClick={() => window.confirm("Are you sure you want to discard this Account ?") && this.onDiscard}>Discard</button>
                        :
                        ""
                      }
                    </div>

                  </div>
                ))}

                {/* Modal */}
                <div className="modal fade" id="modalForPendingDetails" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content imTwo">
                      <div className="modal-header divBg">
                        <h5 className="modal-title" id="exampleModalCenterTitle"><i class="far fa-arrow-alt-circle-right"></i> Account Details</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">

                        <div className="">
                          <div className="">
                            <small className="text-muted"><i className="fas fa-sort-numeric-up"><FaSortNumericUp /></i> Account ID : <span>{this.state.accountDetails.id}</span></small>
                          </div>

                          <div className="">
                            <small className="text-muted"><i className="fas fa-sort-numeric-up"><FaSortNumericUp /></i> Account Title : <span>{this.state.accountDetails.title}</span></small>
                          </div>

                          <div className="">
                            <small className="text-muted"><i className="fas fa-sort-numeric-up"><FaSortNumericUp /></i> Channel Account ID : <span>{this.state.accountDetails.channelAccountId}</span></small>
                          </div>

                          <div className="">
                            <small className="text-muted"><i className="fas fa-sort-numeric-up"><FaSortNumericUp /></i> Account Type : <span>{AccountType(this.state.accountDetails.type)}</span></small>
                          </div>

                          <div>
                            <small className="text-muted"><i className="fab fa-mizuni"><FaMizuni /></i> Channel Code : <span>{this.state.accountDetails.channelCode}</span></small>
                          </div>

                          <div>
                            <small className="text-muted"><i className="fab fa-mizuni"><FaMizuni /></i> Product Category Code : <span>{ProductCategoryType(this.state.accountDetails.productCategoryCode)}</span></small>
                          </div>

                          <div>
                            <small className="text-muted"><i className="fab fa-mizuni"><FaMizuni /></i> Product Name : <span>{this.state.ProductCodeConvertName}</span></small>
                          </div>



                          <div>
                            <small className="text-muted"><i className="fab fa-mizuni"><FaMizuni /></i> Product Code : <span>{this.state.accountDetails.productCode}</span></small>
                          </div>

                          <div>
                            <small className="text-muted"><i className="fas fa-battery-three-quarters"><FaBatteryThreeQuarters /></i> Status : <span>{PendingStatus(this.state.accountDetails.status)}</span></small>
                          </div>

                          <hr />
                          <div>
                            <small className="text-muted"><i className="fas fa-pen-nib"><FaPenAlt /></i> Branch or Agent Point Code : <span>{this.state.accountDetails.branchOrAgentPointCode}</span></small>
                          </div>

                          <div>
                            <small className="text-muted"><i className="fas fa-pen-nib"><FaPenAlt /></i> Transaction or Maturity Amount : <span>{this.state.accountDetails.transactionOrMaturityAmount}</span></small>
                          </div>


                          <hr />
                          <div>
                            <small className="text-muted"><i className="fas fa-user-shield"><FaUserShield /></i> Created By : <span>{this.state.accountDetails.createdBy}</span></small>
                          </div>

                          <div>
                            <small className="text-muted"><i className="fas fa-calendar-check"><FaCalendarCheck /></i> Created Date : <span>{this.state.accountDetails.createDate}</span></small>
                          </div>



                        </div>


                      </div>
                      <div className="modal-footer imTwo">
                        <span className="sbtnx" data-dismiss="modal">Close</span>

                      </div>
                    </div>
                  </div>
                </div>

                {/* ======= */}



              </div>
            </div>
          </div>

        </div>


        {/* pagination added*/}

        {this.state.totalPages > 1 ?
          (<Pagination
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
          />) :
          <div>
            <br /><br /><br />
            <p style={{ textAlign: 'center' }}> <strong> page No: {this.state.page + "/" + this.state.totalPages}</strong> </p>
          </div>
        }



      </div>
    )
  }
}

export default PendingAccount;
