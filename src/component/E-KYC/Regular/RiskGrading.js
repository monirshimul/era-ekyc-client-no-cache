import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { createProduct } from '../Url/ApiList';
import { NotificationManager } from "react-notifications";



class RiskGrading extends Component {

    state = {

        onBoardingValue: "",
        geoRiskClient: '',
        foreignOrigin: '',
        highOfficial: "",
        closeHighOfficial: "",
        isClientIp: "",
        productType: "",
        occupation: "",
        businessName: "",
        professionName: "",
        yearlyTransaction: "",
        hasSourceOfFunds: ""

    }

    onChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    searchValueChange = (e) => {

        this.setState({
            occupation: e.target.value
        })
    }

    continue = async (e) => {
        e.preventDefault();
        let { onBoardingValue,
            geoRiskClient,
            foreignOrigin,
            highOfficial,
            closeHighOfficial,
            isClientIp,
            productType,
            occupation,
            businessName,
            professionName,
            yearlyTransaction,
            hasSourceOfFunds
        } = this.state

        // if (productName === '') {
        //     let productNameMessage = "Please provide Product Name";
        //     NotificationManager.error(productNameMessage, "Error", 5000);
        //     return;
        // }

        // if (productCode === '') {
        //     let productCodeMessage = 'Please provide Product Code';
        //     NotificationManager.error(productCodeMessage, "Error", 5000);
        //     return;
        // }

        // if (productCategory === '') {
        //     let productCategoryMessage = 'Please provide Product Category';
        //     NotificationManager.error(productCategoryMessage, "Error", 5000);
        //     return;
        // }

        // if (status === '') {
        //     let productStatusMessage = 'Please select Product status';
        //     NotificationManager.error(productStatusMessage, "Error", 5000);
        //     return;
        // }

        // if (description === '') {
        //     let productDescriptionMessage = 'Please provide Product Description';
        //     NotificationManager.error(productDescriptionMessage, "Error", 5000);
        //     return;
        // }

        let token = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        let obj = {
            onBoardingValue,
            geoRiskClient,
            foreignOrigin,
            highOfficial,
            closeHighOfficial,
            isClientIp,
            productType,
            occupation,
            businessName,
            professionName,
            yearlyTransaction,
            hasSourceOfFunds
        }

        try {

            console.log("Risk Data", obj)

            //alert("Risk Grading Measured", obj)

            NotificationManager.success("Risk Grading Completed", "Success", 5000);

            // let productCreateRes = await axios.post(createProduct, obj, token);
            // console.log("productCreateRes", productCreateRes)
            // NotificationManager.success("Product Successfully Created", "Success", 5000);
            //localStorage.setItem("RiskGradingData", JSON.stringify(obj));
            //this.props.history.replace('/dashboard/product-list');
            // this.setState({
            //     onBoardingValue: "",
            //     geoRiskClient: '',
            //     foreignOrigin: '',
            //     highOfficial: "",
            //     closeHighOfficial: "",
            //     isClientIp: "",
            //     productType: "",
            //     occupation: "",
            //     businessName: "",
            //     professionName: "",
            //     yearlyTransaction: "",
            //     hasSourceOfFunds: ""


            // })
            this.props.history.push('/dashboard/regular-complete');

        } catch (error) {
            console.log("Error====>", error.response)
        }
    }

    back = e => {
        e.preventDefault();
        this.props.history.push('/dashboard/regular-signature');
        
    }

    render() {
        let { onBoardingValue,
            geoRiskClient,
            foreignOrigin,
            highOfficial,
            closeHighOfficial,
            isClientIp,
            productType,
            occupation,
            businessName,
            professionName,
            yearlyTransaction,
            hasSourceOfFunds
        } = this.state

        return (
            <div className="card col-sm-10" style={{ paddingTop: "25px" }}>

                <div className="card-header divBg">

                    <h3 className="text-center pt-3">Risk Grading</h3>

                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>

                        <div className='form-group'>
                            <label htmlFor="">Type Of On-boarding</label>
                            <select
                                className='custom-select'
                                value={onBoardingValue}
                                onChange={this.onChange}
                                name="onBoardingValue"
                            >
                                <option value='' disabled>--Select Category--</option>
                                <option value='1.1'>Branch/Relationship Manager</option>
                                <option value='1.2'>Direct Sales Agent</option>
                                <option value='1.3'>Walk-in</option>
                                <option value='1.4'>Internet/Self check-in/Other non Face to Face</option>


                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="">Geographic Risks</label>
                            <select
                                className='custom-select'
                                value={geoRiskClient}
                                onChange={this.onChange}
                                name="geoRiskClient"
                            >
                                <option value='' disabled>--Select Client--</option>
                                <option value='2.1'>Resident Bangladeshi</option>
                                <option value='2.2'>Non-resident Bangladeshi</option>
                                <option value='2.3'>Foreign Citizen</option>



                            </select>
                        </div>

                        {/* For Foreigners */}

                        {
                            geoRiskClient === "2.3" ? (
                                <div>
                                    <div className='form-group'>
                                        <label htmlFor="">
                                            Does client's country of
                                            citizenship feature in
                                            FATF/EU/OFAC/UN Black
                                            List/Grey List?

                            </label>
                                        <select
                                            className='custom-select'
                                            value={foreignOrigin}
                                            onChange={this.onChange}
                                            name="foreignOrigin"
                                        >
                                            <option value='' disabled>--Select Category--</option>
                                            <option value='2.3.1'>Yes</option>
                                            <option value='2.3.2'>No</option>

                                        </select>
                                    </div>
                                </div>
                            ) : ""
                        }


                        <div className="row d-flex justify-content-center">
                            <h3 className="col-sm-12 im">
                                Type Of Customer
                            </h3>

                        </div>
                        <hr />

                        <div className='form-group'>
                            <label htmlFor="">
                                Is client a PEP/Chief or High
                                Official of International
                                Organization, as per BFIU
                                Circular?

                            </label>
                            <select
                                className='custom-select'
                                value={highOfficial}
                                onChange={this.onChange}
                                name="highOfficial"
                            >
                                <option value='' disabled>--Select Category--</option>
                                <option value='3.1.1'>Yes</option>
                                <option value='3.1.2'>No</option>

                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="">
                                Is client’s family/close associates
                                related to PEP/Chief or High
                                Official of International
                                Organization?


                            </label>
                            <select
                                className='custom-select'
                                value={closeHighOfficial}
                                onChange={this.onChange}
                                name="closeHighOfficial"
                            >
                                <option value='' disabled>--Select Category--</option>
                                <option value='3.2.1'>Yes</option>
                                <option value='3.2.2'>No</option>

                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="">
                                Is client a IP? or his family/close
                                associates related to IP?



                            </label>
                            <select
                                className='custom-select'
                                value={isClientIp}
                                onChange={this.onChange}
                                name="isClientIp"
                            >
                                <option value='' disabled>--Select Category--</option>
                                <option value='3.3.1'>Yes - based on assessed risk</option>
                                <option value='3.3.2'>No</option>

                            </select>
                        </div>



                        <div className="row d-flex justify-content-center">
                            <h3 className="col-sm-12 im">
                                Product and Channel Risk
                            </h3>

                        </div>
                        <hr />

                        <div className='form-group'>
                            <label htmlFor="">Type of Product</label>
                            <select
                                className='custom-select'
                                value={productType}
                                onChange={this.onChange}
                                name="productType"
                            >
                                <option value='' disabled>--Select Status--</option>
                                <option value='4.1'>Savings account</option>
                                <option value='4.2'>Current account</option>
                                <option value='4.3'>FDR</option>
                                <option value='4.4'>Deposit Scheme upto12 lac</option>
                                <option value='4.5'>Deposit Scheme above 12 lac</option>
                                <option value='4.6'>Forex account</option>
                                <option value='4.7'>S.N.D.</option>
                                <option value='4.8'>R.F.C.D.</option>

                            </select>
                        </div>

                        <div className="row d-flex justify-content-center">
                            <h3 className="col-sm-12 im">
                                Business and Activity Risk
                            </h3>

                        </div>
                        <hr />

                        <div className="form-group d-flex justify-content-center">
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" onChange={this.searchValueChange} name="optionsRadios" id="optionsRadios1" value="5.1" />
                                            Business
                                        </label>
                            </div>&nbsp;&nbsp;&nbsp;
                                    <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" onChange={this.searchValueChange} name="optionsRadios" id="optionsRadios1" value="5.2" />
                                            Profession
                                        </label>
                            </div>&nbsp;&nbsp;&nbsp;


                        </div>

                        {
                            occupation === "5.1" ? (
                                <div>

                                    <div className='form-group'>
                                        <label htmlFor="">Type of Product</label>
                                        <select
                                            className='custom-select'
                                            value={businessName}
                                            onChange={this.onChange}
                                            name="businessName"
                                        >
                                            <option value='' disabled>--Select Business--</option>
                                            <option value='5.1.1'>Jeweller/Gold/Valuable Metals Business</option>
                                            <option value='5.1.2'>Money Changer/Courier Service/MobileBanking Agent</option>
                                            <option value='5.1.3'>Real Estate Developer/Agent</option>
                                            <option value='5.1.4'>Promoter/Contractor: ConstructionProjects</option>
                                            <option value='5.1.5'>Art and Antiquities Dealer</option>
                                            <option value='5.1.6'>Restaurant/Bar/NightClub/Parlour/Hotel</option>
                                            <option value='5.1.7'>Export/Import</option>
                                            <option value='5.1.8'>Manpower export</option>
                                            <option value='5.1.9'>Firearms</option>
                                            <option value='5.1.10'>RMG/Garments Accessories/BuyingHouse</option>
                                            <option value='5.1.11'>Share/Stocks Investor</option>
                                            <option value='5.1.12'>Software/Information and Technology Business</option>
                                            <option value='5.1.13'>Travel Agent</option>
                                            <option value='5.1.14'>Merchant with over 10 million takas invested in business</option>
                                            <option value='5.1.15'>Freight/Shipping/Cargo Agent</option>
                                            <option value='5.1.16'>Automobiles business (New or Reconditioned)</option>
                                            <option value='5.1.17'>Leather/Leather goods Business</option>
                                            <option value='5.1.18'>Construction Materials Trader</option>
                                            <option value='5.1.19'>Business Agent</option>
                                            <option value='5.1.20'>Thread/"Jhut" Merchant</option>
                                            <option value='5.1.21'>Transport Operator</option>
                                            <option value='5.1.22'>Tobacco and Cigarettes Business</option>
                                            <option value='5.1.23'>Amusement Park/Entertainment Provider</option>
                                            <option value='5.1.24'>Motor Parts Trader/Workshop</option>
                                            <option value='5.1.25'>Small Business (Investment below BDT 5 million)</option>
                                            <option value='5.1.26'>Computer/Mobile Phone Dealer</option>
                                            <option value='5.1.27'>Manufacturer (except, weapons)</option>

                                        </select>
                                    </div>



                                    <hr />
                                </div>

                            ) : ""
                        }

                        {
                            occupation === "5.2" ?
                                (
                                    <div>

                                        <div className='form-group'>
                                            <label htmlFor="">Type of Product</label>
                                            <select
                                                className='custom-select'
                                                value={professionName}
                                                onChange={this.onChange}
                                                name="professionName"
                                            >
                                                <option value='' disabled>--Select Profession--</option>
                                                <option value='5.2.1'>Pilot/Flight Attendant</option>
                                                <option value='5.2.2'>Trustee</option>
                                                <option value='5.2.3'>Professional (Journalist, Lawyer, Doctor, Engineer, Chartered Accountant, etc.)</option>
                                                <option value='5.2.4'>Director (Private/Public Limited Company)</option>
                                                <option value='5.2.5'>High Official of Multinational Company (MNC)</option>
                                                <option value='5.2.6'>Homemaker</option>
                                                <option value='5.2.7'>Information Technology (IT) sector employee</option>
                                                <option value='5.2.8'>Athlete/Media Celebrity/Producer/Director</option>
                                                <option value='5.2.9'>Freelance Software Developer</option>
                                                <option value='5.2.10'>Landlord/Homeowner</option>
                                                <option value='5.2.11'>Private Service: Managerial</option>
                                                <option value='5.2.12'>Teacher (Public/Private/Autonomous Educational Institution)</option>
                                                <option value='5.2.13'>Private Sector Employee</option>
                                                <option value='5.2.14'>Self-employed Professional</option>
                                                <option value='5.2.15'>Student</option>
                                                <option value='5.2.16'>Farmer/Fisherman/Labourer</option>


                                            </select>
                                        </div>



                                        <hr />

                                    </div>

                                ) : ""
                        }





                        <div className="row d-flex justify-content-center">
                            <h3 className="col-sm-12 im">
                                Transactional Risks
                            </h3>

                        </div>
                        <hr />

                        <div className='form-group'>
                            <label htmlFor="">
                                What is the Client's Average
                                Yearly Transactions Worth?

                            </label>
                            <select
                                className='custom-select'
                                value={yearlyTransaction}
                                onChange={this.onChange}
                                name="yearlyTransaction"
                            >
                                <option value='' disabled>--Select Status--</option>
                                <option value='6.1'>Less than BDT 1 million</option>
                                <option value='6.2'>From BDT 1 million to 5 million</option>
                                <option value='6.3'>From BDT 5 million to 50 million</option>
                                <option value='6.4'>More than BDT 50 million</option>


                            </select>
                        </div>

                        <div className="row d-flex justify-content-center">
                            <h3 className="col-sm-12 im">
                                Transparency Risk
                            </h3>

                        </div>
                        <hr />

                        <div className='form-group'>
                            <label htmlFor="">
                                Does client has Provided
                                credible source of funds


                            </label>
                            <select
                                className='custom-select'
                                value={hasSourceOfFunds}
                                onChange={this.onChange}
                                name="hasSourceOfFunds"
                            >
                                <option value='' disabled>--Select Status--</option>
                                <option value='7.1'>Yes</option>
                                <option value='7.2'>No</option>



                            </select>
                        </div>




                        {/* <div className="d-flex justify-content-center" >

                            <button className="b" type="submit" style={{ border: "none" }} >Create</button>

                        </div> */}

                        <hr />
                        <div className="row d-flex justify-content-center">
                            <div className="b mb-3" onClick={this.back} >Back</div>&nbsp; &nbsp;
                        <div className="b mb-3" onClick={this.continue} >Next</div>
                        </div>

                    </form>
                </div>



            </div>
        )
    }
}

export default withRouter(RiskGrading) 
