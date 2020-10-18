import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import axios from 'axios';
import { mediumTime, largeTime } from './../../Utils/notificationTime';
import { simConvReg } from '../Url/ApiList';
import { withRouter } from 'react-router-dom';
const Joi = require('@hapi/joi');

export class SimUpgradeReg extends Component {
  state = {
    cardData: [],
    search: "",
    radioValue: "",
    show: false
  }


  searchValueChange = (e) => {

    this.setState({
      radioValue: e.target.value
    })
  }


  searchHandle = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });

  }

  doSearch = async (e) => {
    e.preventDefault();
    let { radioValue, search } = this.state
    const config = {
      headers: {

        'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

      }
    };



    if (radioValue === "nid") {
      let val = {
        nid: search
      }
      try {
        let searchResult = await axios.post(simConvReg, val, config)
        console.log("searchResult", searchResult)
        if (searchResult.data.data.length === 0) {
          NotificationManager.warning("No Nid Match", "Warning", mediumTime)
        }
        this.setState({
          cardData: searchResult.data.data,
          show: true,
          search: ''
        })
      } catch (error) {
        this.setState({ show: false, search: '' });
        if (error.response) {
          let message = error.response.data.message
          //console.log("Error",error.response)
          NotificationManager.error(message, "ClickToRemove", largeTime);
        } else if (error.request) {
          console.log("Error Connecting...", error.request)
          NotificationManager.error("Error Connecting...", "ClickToRemove", largeTime);
        } else if (error) {
          NotificationManager.error(error.toString(), "ClickToRemove", largeTime);
        }
      }
    }




    if (radioValue === "mobile") {
      let val = {
        mobile: search
      }
      try {
        let searchResult = await axios.post(simConvReg, val, config)
        console.log("searchResult", searchResult)
        if (searchResult.data.data.length === 0) {
          NotificationManager.warning("Mobile Number does not Match", "Warning", mediumTime)
        }
        this.setState({
          cardData: searchResult.data.data,
          show: true,
          search: ''
        })
      } catch (error) {
        this.setState({ show: false, search: '' });
        if (error.response) {
          let message = error.response.data.message
          //console.log("Error",error.response)
          NotificationManager.error(message, "ClickToRemove", 5000);
        } else if (error.request) {
          // console.log("Error Connecting...", error.request)
          NotificationManager.error("Error Connecting...", "ClickToRemove", 5000);
        } else if (error) {
          NotificationManager.error(error.toString(), "ClickToRemove", 5000);
        }
      }
    }
  }


  // Full details show

  fullDetails = (e) => {

    this.props.history.push('/dashboard/upgrade-details', this.state.cardData[e.target.id]);
  }

  // UPGRADE BUTTON functionality

  upgrade = (e) => {
    console.log("cardId", e.target.id)
    this.props.history.push('/dashboard/multiform-Regular-conversion', this.state.cardData[e.target.id]);
  }



  render() {
    let { cardData, search } = this.state;

    return (
      <div className="container">

        {/* Search EKYC FOR CONVERTING REGULAR START */}
        <div className="row">
          <div className="imTwoWhite col-sm-12" style={{ padding: "25px" }}>
            <div className="im">
              <h5 className="text-muted text-center pt-2">
                <i class="fas fa-search"></i> Search E-KYC
                        </h5>
            </div>
            <div className="card-body d-flex justify-content-center">
              <form className="col-sm-8">
                <div className="form-group " >
                  <label htmlFor=""></label>
                  <input style={{ borderRadius: "50px" }} onChange={this.searchHandle} name="search" value={search} type="text" className="form-control" placeholder="Search by  Nid / Mobile Number" />
                  <small className="text-muted pl-2">
                    <span style={{ color: "#39c12a", fontSize: "14px" }}>*</span> Chosse any option from below for searching.
                            </small>
                </div>
                <div className="form-group d-flex justify-content-center">

                  <div class="form-check">
                    <label class="form-check-label">
                      <input type="radio" class="form-check-input" onChange={this.searchValueChange} name="optionsRadios" id="optionsRadios1" value="nid" />
                                            Search By Nid
                                        </label>
                  </div>&nbsp;&nbsp;&nbsp;
                                    <div class="form-check">
                    <label class="form-check-label">
                      <input type="radio" class="form-check-input" onChange={this.searchValueChange} name="optionsRadios" id="optionsRadios1" value="mobile" />
                                            Search By Mobile Number
                                        </label>
                  </div>

                </div>
                <div className="d-flex justify-content-center pt-2" >
                  <button className="b" onClick={this.doSearch} style={{ outline: "none" }} ><i class="fas fa-search"></i> Search</button>

                </div>
              </form>
            </div>

          </div>

        </div>

        {/* Search EKYC FOR CONVERTING REGULAR END */}


        {/* cardView start*/}
        <div className="row">
          <div className="imTwoWhite col-sm-12">
            <div className="im">
              <h5 className="text-muted text-center pt-2">
                <i class="fas fa-list-ul"></i> E-KYC List
                        </h5>
            </div>
            <div className="imTwoGray mt-2">
              <div className="row d-flex justify-content-center">
                {cardData.map((data, index) => (
                  <div key={index} className="neoBg col-sm-3 m-2 p-3 animated zoomIn">
                    <div className="im">
                      <small style={{ color: "#308f8f" }}>{data.name}</small>

                    </div>
                    <hr />
                    <div className="" style={{ fontSize: "16px" }}>
                      <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>NID No : </span>{data.nid}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Cell No : </span>{data.mobile}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Verification Type : </span>{data.verificationType}</small><br />
                      {/* <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Address : </span>{data.permanentAddressBangla}</small><br /> */}
                    </div>


                    <hr />
                    <div className="row d-flex justify-content-around">
                      <button className="neoBtnSmall" style={{ color: "#308f8f" }} id={index} onClick={(e) => this.upgrade(e)} >Upgrade</button>
                      <button className="neoBtnSmall" style={{ color: "#d3830a" }} id={index} onClick={(e) => this.fullDetails(e)}>Details</button>

                    </div>

                  </div>
                ))}


              </div>
            </div>
          </div>

        </div>
        {/* cardView end*/}




      </div>


    )
  }
}

export default withRouter(SimUpgradeReg);