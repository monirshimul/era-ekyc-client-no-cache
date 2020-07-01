import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createTPAPI } from '../Url/ApiList';
import { NotificationManager } from "react-notifications";
import axios from 'axios';

export class CreateTP extends Component {
    state = {
        ekycType: '',
        productCategoryCode: '',
        channelName: '',
        minLimit: '',
        maxLimit: '',
        status: ''
    }

    onChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    dependentLabel = () => {
        if (this.state.productCategoryCode === 'S0' || this.state.productCategoryCode === 'C0') {
            return (
                <h5>Cash Transaction Per Month</h5>
            )
        } else if (this.state.productCategoryCode === "TD" || this.state.productCategoryCode === "RD") {
            return (
                <h5>Maturity Amount</h5>
            )
        } else {

        }
    }


    


    onSubmit = async (e) => {
        e.preventDefault();
        let { ekycType, productCategoryCode, maxLimit, minLimit, channelName, status } = this.state;

        if(ekycType === ''){
            let ekycTypeMessage = 'Please Provide Ekyc Type';
            NotificationManager.warning(ekycTypeMessage, "Warning", 5000);
            return;
        }

         if(productCategoryCode === ''){
            let productCategoryCodeMessage = 'Please Provide Product Category ';
            NotificationManager.warning(productCategoryCodeMessage, "Warning", 5000);
            return;
        }

        if(minLimit === ''){
            let minLimitMessage = 'Please Provide Low Limit';
            NotificationManager.warning(minLimitMessage, "Warning", 5000);
            return;
        }

        if(maxLimit === ''){
            let maxLimitMessage = 'Please Provide High Limit ';
            NotificationManager.warning(maxLimitMessage, "Warning", 5000);
            return;
        }

        if(channelName === ''){
            let channelNameMessage = 'Please Provide Channel Name ';
            NotificationManager.warning(channelNameMessage, "Warning", 5000);
            return;
        }

        if(status === ''){
            let statusMessage = 'Please Provide Status ';
            NotificationManager.warning(statusMessage, "Warning", 5000);
            return;
        }

        const obj = {
            ekycType,
            productCategoryCode: productCategoryCode,
            maxLimit: parseInt(maxLimit),
            minLimit: parseInt(minLimit),
            channelCode: channelName,
            status
        }
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        try {
            let tpData = await axios.post(createTPAPI, obj, config);
           // console.log("tpData", tpData.data);
            let tpDataStatus = tpData.data.statusCode;
            let tpDataMessage = tpData.data.message;
            NotificationManager.success(tpDataStatus + " " + tpDataMessage, "Success", 5000);
            this.setState({
                ekycType: '',
                productCategoryCode: '',
                channelName: '',
                minLimit: '',
                maxLimit: '',
                status: ''
            })
        } catch (err) {
           // console.log(err.response.data);
            let errorStatus = err.response.data.statusCode;
            let errorMessage = err.response.data.message;
            NotificationManager.error(errorStatus + " " + errorMessage, "Error", 5000);
        }
    }

    render() {
        return (
            <div className="card col-sm-7" style={{ paddingTop: "25px" }}>

                <div className="card-header divBg">

                    <h3 className="text-center pt-3">Create Transaction Profile</h3>

                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>

                        {/* Ekyc Type*/}
                        <div className='form-group'>
                            <label htmlFor="">Ekyc Type</label>
                            <select
                                className='custom-select'
                                value={this.state.ekycType}
                                onChange={this.onChange}
                                name="ekycType"
                            >
                                <option value='' disabled>--Select--</option>
                                <option value='S'>Simplified</option>
                                <option value='R'>Regular</option>
                            </select>
                        </div>


                        {/* Product Category */}
                        <div className='form-group'>
                            <label htmlFor="">Product Category</label>
                            <select
                                className='custom-select'
                                value={this.state.productCategoryCode}
                                onChange={this.onChange}
                                name="productCategoryCode"
                            >
                                <option value='' disabled>--Select--</option>
                                <option value='S0'>Savings Account</option>
                                <option value='C0'>Current Account</option>
                                <option value='TD'>Term Deposit</option>
                                <option value='RD'>Recurring Deposit</option>

                            </select>
                        </div>




                        <hr></hr>

                        {this.dependentLabel()}

                        {/* Min Limit */}
                        <div className="form-group">
                            <label htmlFor="">Low Limit</label>
                            <input type="text" value={this.state.minLimit} onChange={this.onChange} className="form-control" name="minLimit" id="inputUserId" aria-describedby="emailHelp" placeholder="Low Limit" />
                        </div>

                        {/* Max Limit */}
                        <div className="form-group">
                            <label htmlFor="">High Limit</label>
                            <input type="text" value={this.state.maxLimit} onChange={this.onChange} className="form-control" name="maxLimit" id="inputUserId" aria-describedby="emailHelp" placeholder="High Limit" />
                        </div>


                        <hr></hr>

                        {/* Channel Name */}
                        <div className='form-group'>
                            <label htmlFor="">Channel Name</label>
                            <select
                                className='custom-select'
                                value={this.state.channelName}
                                onChange={this.onChange}
                                name="channelName"
                            >
                                <option value='' disabled>--Select--</option>
                                <option value='ABS'>Agent Banking</option>
                                <option value='CBS'>Conventional Core Banking</option>
                                <option value='ICBS'>Islamic Core Banking</option>
                                <option value='OMNI'>Omni Channel </option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className='form-group'>
                            <label htmlFor="status">Status</label>
                            <select
                                className='custom-select'
                                value={this.state.status}
                                onChange={this.onChange}
                                name="status"
                            >
                                <option value='' disabled>--Select--</option>
                                <option value='A'>Active</option>
                                <option value='I'>Inactive</option>

                            </select>
                        </div>

                        <div className="d-flex justify-content-center" >

                            <button className="b" type="submit" style={{ border: "none" }} >Submit</button>

                        </div>

                    </form>
                </div>



            </div>



        )
    }
}

export default withRouter(CreateTP);