import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { NotificationManager } from "react-notifications";
import { getProduct, getEkycType } from '../Url/ApiList';
import axios from 'axios';

export class AccountReg extends Component {
    state = {
        SimReg: '',
        channelName: '',
        productCategory: "",
        productName: "",
        productNameData: [],
        accountType: '',
        amount: '',
        tenor: ''

    }

    componentDidMount() {
        localStorage.clear();
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
            categoryCode: e.target.value
        }


        try {
            let getCode = await axios.post(getProduct, obj, config);
            let getCodeData = getCode.data.data;
            this.setState({ productNameData: getCodeData });
            //console.log("state", this.state.productNameData);
        } catch (error) {
            console.log(error.response);
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

        if (channelName === '') {
            let channelNameMessage = 'Please Select Channel Name';
            NotificationManager.warning(channelNameMessage, "Warning", 5000);
            return;
        }

        if (productCategory === '') {
            let productMessage = "Please select Product Category";
            NotificationManager.warning(productMessage, "Warning", 5000);
            return;
        }

        if (productName === '') {
            let productNameMessage = "Please select Product Name";
            NotificationManager.warning(productNameMessage, "Warning", 5000);
            return;
        }

        if (accountType === '') {
            let accountTypeMessage = 'Please Select Account Type';
            NotificationManager.warning(accountTypeMessage, "Warning", 5000);
            return;
        }

        if (amount === '') {
            let amountMessage = 'Please fill up the transaction limit';
            NotificationManager.warning(amountMessage, "Warning", 5000);
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
            let myObj={
                accountType,
                productCategory,
                productName,
                channelName
            }

            localStorage.setItem("accountInfo", JSON.stringify(myObj));

            let featureTest = JSON.parse(sessionStorage.getItem('featureList'));

            if (accountType === 'S' && typeEkyc === 'R' && featureTest.includes('5.2') === true) {
                NotificationManager.success(statusCode + " " + successMessage, "Success", 5000);
                this.props.history.replace('/dashboard/regular-typeverification');
            } else if (accountType === 'J' && typeEkyc === 'R' && featureTest.includes('5.2') === true) {
                //this.props.history.replace('/dashboard/dynamic-comp');
            }else{
                NotificationManager.warning('Simplified Ekyc is not applicable For You', "Warning", 5000);
            }

           



        } catch (error) {
            if (error.response) {
                //     console.log(err.response);
            let ErrorCode = error.response.data.status;
            let ErrorMessage = error.response.data.message;
            NotificationManager.error(ErrorCode + " " + ErrorMessage, "Error", 5000);
            }
            else if (error.request) {
                console.log(error.request);
                NotificationManager.error("Error Connecting", "Error", 5000);
            }
            else {
                console.log("Error", error.message);
                NotificationManager.error(error.message, "Error", 5000);
            }

            // console.log(err.response);
            // let ErrorCode = err.response.data.status;
            // let ErrorMessage = err.response.data.message;
            // NotificationManager.error(ErrorCode + " " + ErrorMessage, "Error", 5000);
        }

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

                        <div className="d-flex justify-content-center" >

                            <button className="b" type="submit" style={{ border: "none" }} >Submit</button>

                        </div>

                    </form>
                </div>



            </div>

        )
    }
}

export default withRouter(AccountReg);
