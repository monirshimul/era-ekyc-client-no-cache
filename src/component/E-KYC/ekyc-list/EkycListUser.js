import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { ekycWithFilter, ekycFullProfile, ekycForUser } from '../Url/ApiList';
import Pagination from '../../Reusable/Pagination';
import { NotificationManager } from "react-notifications";
import { mediumTime } from '../../Utils/notificationTime';

class EkycListUser extends Component {

    state = {
        page: 1,
        totalPages: '',
        totalEkyc: '',
        text_input: "",
        goButton: false,
        searchFlag: false,
        ekycData: [],
        search: "",
        radioValue: "",
        show: false
    }

    async componentDidMount() {
        const { page } = this.state

        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };



        try {
            let ekycList = await axios.post(ekycForUser + page, null, config)
            //console.log("ekycList", ekycList.data.data);
            //console.log("ekycList", ekycList.data.data.ekyc)
            this.setState({
                ekycData: ekycList.data.data.ekyc === undefined ? [] : ekycList.data.data.ekyc,
                totalPages: ekycList.data.data.totalPages,
                totalEkyc: ekycList.data.data.totalEkyc,
                page: ekycList.data.data.currentPage
            })
        } catch (error) {
            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }


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
        let { radioValue, search, page } = this.state
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }

        };
        if (radioValue === "id") {
            //console.log(radioValue)
            let val = {
                id: search
            }
            try {
                let searchResult = await axios.post(ekycForUser + page, val, config)
                // console.log("searchResult",searchResult)
                if (searchResult.data.data.length === 0) {
                    NotificationManager.warning("No id Match", "Warning", mediumTime)
                }
                this.setState({
                    ekycData: searchResult.data.data,
                    show: true
                })
            } catch (error) {
                this.setState({ show: false });
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


        if (radioValue === "nid") {
            let val = {
                nid: search
            }
            try {
                let searchResult = await axios.post(ekycForUser + page, val, config)
                //console.log("searchResult",searchResult)
                if (searchResult.data.data.length === 0) {
                    NotificationManager.warning("No Nid Match", "Warning", mediumTime)
                }
                this.setState({
                    ekycData: searchResult.data.data,
                    show: true
                })
            } catch (error) {
                this.setState({ show: false });
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


        if (radioValue === "mobile") {
            let val = {
                mobile: search
            }
            try {
                let searchResult = await axios.post(ekycForUser + page, val, config)
                // console.log("searchResult",searchResult)
                if (searchResult.data.data.length === 0) {
                    NotificationManager.warning("Mobile Number does not Match", "Warning", mediumTime)
                }
                this.setState({
                    ekycData: searchResult.data.data,
                    show: true
                })
            } catch (error) {
                this.setState({ show: false });
                if (error.response) {
                    let message = error.response.data.message
                    //console.log("Error",error.response)
                    NotificationManager.error(message, "Error", 5000);
                } else if (error.request) {
                    // console.log("Error Connecting...", error.request)
                    NotificationManager.error("Error Connecting...", "Error", 5000);
                } else if (error) {
                    NotificationManager.error(error.toString(), "Error", 5000);
                }
            }
        }
    }


    doBack = async (e) => {
        e.preventDefault();
        const { page } = this.state



        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };



        try {
            let ekycList = await axios.post(ekycForUser + page, null, config)
            console.log("ekycList", ekycList.data.data);
            console.log("ekycList", ekycList.data.data.ekyc)
            this.setState({
                ekycData: ekycList.data.data.ekyc === undefined ? [] : ekycList.data.data.ekyc,
                totalPages: ekycList.data.data.totalPages,
                totalEkyc: ekycList.data.data.totalEkyc,
                show: false,
                search: ""
            })
        } catch (error) {
            this.setState({ show: true });
            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }

    }

    showMore = async (id) => {

        let { page } = this.state
        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };
        try {
            let idObj = {
                id: id
            }
            let singleEkyc = await axios.post(ekycWithFilter + page, idObj, config)
            // console.log("Show More", singleEkyc.data.data)
            let dataObj = {
                data: singleEkyc.data.data
            }

            this.props.history.push('/dashboard/showMore', dataObj)
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


    ///////////////////////////////////////////////////Pagination start/////////////////////////


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
            this.setState({ page: pageReq });
            this.pageChanges(pageReq);
            this.setState({ text_input: '' });
        } else {
            console.log('Invalid Page No.');
            //alert('Invalid Page No.');
            let invalidMessage = 'Invalid Page No.';
            NotificationManager.warning(invalidMessage, "Warning", 5000);
            this.setState({ text_input: "", goButton: false });
        }

    }

    increment = () => {
        const { totalPages } = this.state;
        let nextPage = this.state.page + 1;
        this.setState({ page: nextPage })
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
        const { totalPages } = this.state;

        let nextPage = this.state.page - 1;
        this.setState({ page: nextPage })
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
            let paginationUser = await axios.post(ekycForUser + newPage, "", config);
            // console.log("pagination pages", paginationUser.data.data);
            let paginEkyc = paginationUser.data.data;
            let numPages = paginEkyc.totalPages;
            let numEkyc = paginEkyc.totalEkyc;
            let approveNew = paginEkyc.ekyc;
            this.setState({ totalPages: numPages, page: paginEkyc.currentPage, totalEkyc: numEkyc, ekycData: approveNew });

        } catch (error) {
            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }


    }









    ///////////////////////////////////////////////////Pagination End/////////////////////////


    fullProfile = async (id) => {
        // console.log("id", id);
        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };

        try {
            let idObj = {
                applicantId: id
            }
            let fullEkyc = await axios.post(ekycFullProfile, idObj, config)
            //console.log("full Ekyc", fullEkyc.data.data)
            let dataObj = {
                data: fullEkyc.data.data
            }

            this.props.history.push('/dashboard/fullEkyc', dataObj)
        } catch (error) {
            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }
    }


    render() {
        let { ekycData, search } = this.state
        // console.log("state data", ekycData.map(kyc => kyc))
        return (
            <div className="container">



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
                                    <input style={{ borderRadius: "50px" }} onChange={this.searchHandle} name="search" value={search} type="text" className="form-control" placeholder="Search by E-kyc Id / Nid / Mobile Number" />
                                    <small className="text-muted pl-2">
                                        <span style={{ color: "#39c12a", fontSize: "14px" }}>*</span> Chosse any option from below for searching.
                            </small>
                                </div>
                                <div className="form-group d-flex justify-content-center">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" onChange={this.searchValueChange} name="optionsRadios" id="optionsRadios1" value="id" />
                                            Search By e-kyc id
                                        </label>
                                    </div>&nbsp;&nbsp;&nbsp;
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
                                    {this.state.show === true ?
                                        <button className="b" onClick={this.doBack} style={{ outline: "none" }} ><i class="fas fa-search"></i> Back</button>
                                        :
                                        <button className="b" onClick={this.doSearch} style={{ outline: "none" }} ><i class="fas fa-search"></i> Search</button>
                                    }
                                </div>
                            </form>
                        </div>

                    </div>

                </div>













                <div className="row">
                    <div className="imTwoWhite col-sm-12">
                        <div className="im">
                            <h5 className="text-muted text-center pt-2">
                                <i class="fas fa-list-ul"></i> E-KYC List User
                        </h5>
                        </div>
                        <div className="imTwoGray mt-2">
                            <div className="row d-flex justify-content-center">
                                {ekycData.map((data, index) => (
                                    <div key={index} className="neoBg col-sm-3 m-2 p-3 animated zoomIn">
                                        <div className="im">
                                            <small style={{ color: "#308f8f" }}>{data.name}</small>

                                        </div>
                                        <hr />
                                        <div className="" style={{ fontSize: "16px" }}>
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>NID No : </span>{data.nid}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Channel Account No. : </span>{data.account === null ? "" : data.account.channelAccountId ? data.account.channelAccountId : ""}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Cell No : </span>{data.mobile}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Verification Type : </span>{data.verificationType}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Onboarding Type : </span>{data.onboardingType}</small><br />
                                            {/* <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Address : </span>{data.permanentAddressBangla}</small><br /> */}
                                        </div>


                                        <hr />
                                        <div className="row d-flex justify-content-around">
                                            <button className="neoBtnSmall" style={{ color: "#308f8f" }} onClick={() => this.fullProfile(data.id)}>Full Profile</button>
                                            <button className="neoBtnSmall" style={{ color: "#d3830a" }} onClick={() => this.showMore(data.id)}>Details</button>

                                        </div>

                                    </div>
                                ))}


                            </div>
                        </div>
                    </div>

                </div>


                {/* pagination added*/}
                {this.state.totalPages > 1 && this.state.searchFlag === false ?
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

export default withRouter(EkycListUser)
