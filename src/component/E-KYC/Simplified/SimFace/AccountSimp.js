import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from "react-notifications";
import { getProductMultiFilter, getEkycType } from '../../Url/ApiList';
import axios from 'axios';
import { largeTime } from '../../../Utils/notificationTime';
export class AccountSimp extends Component {
    state = {
        SimReg: '',
        channelName: JSON.parse(sessionStorage.getItem('ChannelCode')) ? JSON.parse(sessionStorage.getItem('ChannelCode')) : '',
        productCategory: "",
        productName: "",
        productNameData: [],
        accountType: '',
        amount: '',
        tenor: ''

    }

    componentDidMount() {
        sessionStorage.removeItem('accountId');
    }


    handleCategory = async (e) => {
        e.preventDefault();
        this.setState({ productCategory: e.target.value });

        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        const obj = {
            channelCode: this.state.channelName,
            categoryCode: e.target.value,
            status: 'A'
        }


        try {
            let getCode = await axios.post(getProductMultiFilter, obj, config);
            let getCodeData = getCode.data.data.filter(product => product.status === 'A');
            // console.log("",getCodeData);
            this.setState({ productNameData: getCodeData });
            //console.log("state", this.state.productNameData);
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


    onChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    dependentLabel = () => {
        if (this.state.productCategory === 'S0' || this.state.productCategory === 'C0') {
            return (
                <label htmlFor="">Cash Transaction Per Month</label>
            )
        } else if (this.state.productCategory === "TD" || this.state.productCategory === "RD") {
            return (
                <label htmlFor="">Maturity Amount</label>
            )
        } else {

        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { productCategory, productName, amount, tenor, accountType, channelName, SimReg } = this.state;

        // Branch and agent point code check
        if (JSON.parse(sessionStorage.getItem("currentBranchOrAgentPointCode")) === null) {
            let messageForAgentPointCode = "Please Select Branch or Agent Point From Home";
            NotificationManager.warning(messageForAgentPointCode, "Click to Remove", largeTime);
            return;
        }

        if (channelName === '') {
            let channelNameMessage = 'Please Select Channel Name';
            NotificationManager.warning(channelNameMessage, "Click to Remove", largeTime);
            return;
        }

        if (productCategory === '') {
            let productMessage = "Please select Product Category";
            NotificationManager.warning(productMessage, "Click to Remove", largeTime);
            return;
        }

        if (productName === '') {
            let productNameMessage = "Please select Product Name";
            NotificationManager.warning(productNameMessage, "Click to Remove", largeTime);
            return;
        }

        if (accountType === '') {
            let accountTypeMessage = 'Please Select Account Type';
            NotificationManager.warning(accountTypeMessage, "Click to Remove", largeTime);
            return;
        }

        if (amount === '') {
            let amountMessage = 'Please fill up the transaction limit';
            NotificationManager.warning(amountMessage, "Click to Remove", largeTime);
            return;
        }



        const obj = {
            channelCode: channelName,
            productCategoryCode: productCategory,
            amount: parseInt(amount)
        }


        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };


        try {
            let dec = await axios.post(getEkycType, obj, config);
            //console.log("decisionData", dec.data);
            this.setState({ SimReg: dec.data.data.ekycType })
            let typeEkyc = dec.data.data.ekycType;
            let statusCode = dec.data.statusCode;
            let successMessage = dec.data.message;
            let myObj = {
                accountType,
                productCategory,
                productName,
                channelName,
                amount: parseInt(amount)
            }

            sessionStorage.setItem("accountInfo", JSON.stringify(myObj));

            let featureTest = JSON.parse(sessionStorage.getItem('featureList'));
            // console.log("feature is true or not ", featureTest.includes('5.1'))

            if (accountType === 'S' && typeEkyc === 'S' && featureTest.includes('5.1') === true) {
                NotificationManager.success(successMessage, "Success", 5000);
                this.props.history.replace('/dashboard/type-verification');
            } else if (accountType === 'J' && typeEkyc === 'S' && featureTest.includes('5.1') === true) {
                NotificationManager.success(successMessage, "Success", 5000);
                this.props.history.replace('/dashboard/dynamic-comp');
            } else {
                NotificationManager.warning('Regular Ekyc is not applicable For You', "Warning", 5000);
            }





        } catch (error) {
            if (error.response) {
                let ErrorCode = error.response.data.status;
                let ErrorMessage = error.response.data.message;
                NotificationManager.error(ErrorCode + " " + ErrorMessage, "Error", 5000);
            }
            else if (error.request) {
                // console.log(error.request);
                NotificationManager.error("Error Connecting", "Error", 5000);
            }
            else {
                // console.log("Error", error.message);
                NotificationManager.error(error.message, "Error", 5000);
            }
        }
        // catch (err) {
        //     console.log(err.response);
        //     let ErrorCode = err.response.data.status;
        //     let ErrorMessage = err.response.data.message;
        //     NotificationManager.error(ErrorCode + " " + ErrorMessage, "Error", 5000);
        // }

    }
    render() {
        return (
            <div className="card col-sm-7" style={{ paddingTop: "25px" }}>

                <div className="card-header divBg">

                    <h3 className="text-center pt-3">Account Information</h3>

                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>

                        {/* Channel Name */}
                        <div className='form-group'>
                            <label htmlFor="">Channel Name</label>
                            <select
                                disabled
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
                                <option value='EKYC'>EKYC </option>
                            </select>
                        </div>


                        {/* Product Category */}
                        <div className='form-group'>
                            <label htmlFor="">Product Category</label>
                            <select
                                className='custom-select'
                                value={this.state.productCategory}
                                onChange={this.handleCategory}
                                name="productCategory"
                            >
                                <option value='' disabled>--Select--</option>
                                <option value='S0'>Savings Account</option>
                                <option value='C0'>Current Account</option>
                                <option value='TD'>Term Deposit</option>
                                <option value='RD'>Recurring Deposit</option>

                            </select>
                        </div>

                        {/* Product Name */}
                        <div className='form-group'>
                            <label htmlFor="">Product Name</label>
                            <select
                                className='custom-select'
                                value={this.state.productName}
                                onChange={this.onChange}
                                name="productName"
                            >
                                <option value='' disabled>--Select--</option>
                                {
                                    this.state.productNameData.map((val, index) => {
                                        return (
                                            <option key={val.id} value={val.code}>{val.code}---{val.name} </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

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

                            </select>
                        </div>

                        <hr></hr>
                        <h4>Transaction Limit</h4>

                        {/* amount */}
                        <div className="form-group">
                            {this.dependentLabel()}
                            <input type="text" value={this.state.amount} onChange={this.onChange} className="form-control" name="amount" id="inputUserId" aria-describedby="emailHelp" placeholder="amount" />
                        </div>
                        <hr></hr>


                        {this.state.productCategory === 'TD' || this.state.productCategory === 'RD' ? (<div>
                            {/* Tenor */}
                            <div className='form-group'>
                                <label htmlFor="">Tenor</label>
                                <select
                                    className='custom-select'
                                    value={this.state.tenor}
                                    onChange={this.onChange}
                                    name="tenor"
                                >
                                    <option value='' disabled>--Select--</option>
                                    <option value='3'>3 months</option>
                                    <option value='6'>6 months</option>
                                    <option value='9'>9 months</option>
                                    <option value='12'>12 months</option>
                                    <option value='24'>24 months</option>
                                    <option value='36'>36 months</option>
                                    <option value='48'>48 months</option>
                                </select>
                            </div>




                        </div>)
                            :
                            ""
                        }



                        <div className="d-flex justify-content-center" >

                            <button className="b" type="submit" style={{ border: "none" }} >Submit</button>

                        </div>

                    </form>
                </div>



            </div>

        )
    }
}

export default withRouter(AccountSimp)
