import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { ekycWithFilter, ekycFullProfile } from '../Url/ApiList';
import { NotificationManager } from "react-notifications";

class EkycListSearch extends Component {

    state = {
        page: 1,
        ekycData: [],
        search:"",
        radioValue:""
    }

    async componentDidMount() {
        const { page } = this.state

        try {
            let ekycList = await axios.post(ekycWithFilter + page)
            console.log("ekycList", ekycList.data.data.ekyc)
            this.setState({
                ekycData: ekycList.data.data.ekyc === undefined ? [] : ekycList.data.data.ekyc
            })
        } catch (error) {
            console.log(error.response)
        }


    }

    searchValueChange = (e)=>{
        
        this.setState({
            radioValue:e.target.value
        })
    }

    searchHandle = (e)=>{
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    
    }

    doSearch = async (e)=>{
        e.preventDefault();
        let {radioValue, search, page} = this.state
        if(radioValue === "id"){
            //console.log(radioValue)
            let val = {
                id:search
            }
            try {
                let searchResult = await axios.post(ekycWithFilter + page, val)
            // console.log("searchResult",searchResult)
            if(searchResult.data.data.length === 0){
                NotificationManager.warning("No id Match", "Warning", 5000)
            }
                this.setState({
                    ekycData:searchResult.data.data
                })
            } catch (error) {
                console.error("Error====>",error.response)
            }
            
        }


        if(radioValue === "nid"){
            let val = {
                nid:search
            }
            try {
                let searchResult = await axios.post(ekycWithFilter + page, val)
                console.log("searchResult",searchResult)
                if(searchResult.data.data.length === 0){
                    NotificationManager.warning("No Nid Match", "Warning", 5000)
                }
                this.setState({
                    ekycData:searchResult.data.data
                })
            } catch (error) {
                console.error("Error====>",error.response)
            }
        }


        if(radioValue === "name"){
            let val = {
                name:search
            }
            try {
                let searchResult = await axios.post(ekycWithFilter + page, val)
            // console.log("searchResult",searchResult)
            if(searchResult.data.data.length === 0){
                NotificationManager.warning("No Name Match", "Warning", 5000)
            }
                this.setState({
                    ekycData:searchResult.data.data
                })
            } catch (error) {
                console.error("Error====>",error.response)
            }
        }
    }

    showMore = async (id) => {

        let { page } = this.state
        try {
            let idObj = {
                id: id
            }
            let singleEkyc = await axios.post(ekycWithFilter + page, idObj)
            console.log("Show More", singleEkyc.data.data)
            let dataObj = {
                data: singleEkyc.data.data
            }

            this.props.history.push('/dashboard/showMore', dataObj)
        } catch (error) {
            console.log(error.response)
        }


    }



    fullProfile = async (id)=>{
        
        try {
            let idObj = {
                applicantId: id
            }
            let fullEkyc = await axios.post(ekycFullProfile, idObj)
            //console.log("full Ekyc", fullEkyc.data.data)
            let dataObj = {
                data: fullEkyc.data.data
            }

            this.props.history.push('/dashboard/fullEkyc', dataObj)
        } catch (error) {
            console.log(error.response)
        }
    }


    render() {
        let { ekycData, radioValue, search } = this.state
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
                                    <input style={{ borderRadius: "50px" }} onChange={this.searchHandle} name="search" value={search} type="text" className="form-control" placeholder="Search by E-kyc Id / Nid / Name" />
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
                                            <input type="radio" class="form-check-input" onChange={this.searchValueChange} name="optionsRadios" id="optionsRadios1" value="name" />
                                            Search By Name
                                        </label>
                                    </div>
                                    
                                </div>
                                <div className="d-flex justify-content-center pt-2" >
                                    <button className="b" onClick={this.doSearch} style={{outline:"none"}} ><i class="fas fa-search"></i> Search</button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>













                <div className="row">
                    <div className="imTwoWhite col-sm-12">
                        <div className="im">
                            <h5 className="text-muted text-center pt-2">
                                <i class="fas fa-list-ul"></i> E-kyc List
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
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Cell No : </span>{data.mobile}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Verification Type : </span>{data.verificationType}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Address : </span>{data.permanentAddressBangla}</small><br />
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
            </div>
        )
    }
}

export default withRouter(EkycListSearch)
