import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import {largeTime } from '../../../Utils/notificationTime';
const Joi = require('@hapi/joi');


export class RegRiskGrading extends Component {



    continue = async (e) => {
        e.preventDefault();

        let { values } = this.props;

        // let token = {
        //     headers: {
        //         'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
        //     }
        // };



        let obj = {
            onBoardingValue: values.onBoardingValue,
            geoRiskClient: values.geoRiskClient,
            foreignOrigin: values.geoRiskClient === "2.1.3" ? values.foreignOrigin : "",
            highOfficial: values.highOfficial,
            closeHighOfficial: values.closeHighOfficial,
            isClientIp: values.isClientIp,
            productTypes: values.productTypes,
            occupation: values.occupation === "5.a" ? values.businessName : values.professionName,
            yearlyTransaction: values.yearlyTransaction,
            hasSourceOfFunds: values.hasSourceOfFunds
        }

        let joiObj = {
            onBoardingValue: values.onBoardingValue,
            geoRiskClient: values.geoRiskClient,
            highOfficial: values.highOfficial,
            closeHighOfficial: values.closeHighOfficial,
            isClientIp: values.isClientIp,
            productTypes: values.productTypes,
            occupation: values.occupation === "5.a" ? values.businessName : values.professionName,
            yearlyTransaction: values.yearlyTransaction,
            hasSourceOfFunds: values.hasSourceOfFunds
        }

        // console.log("riskGradingRegular", obj);

        try {

            const validationValue = await schema.validateAsync(joiObj);

            let RiskGraArray = Object.values(obj)
            let filterArray = RiskGraArray.filter(v => v !== "")
            //console.log(filterArray)

            this.props.handleState('riskGradingArray', filterArray);
            console.log(filterArray)


            //alert("Risk Grading Measured", obj)

            NotificationManager.success("Risk Grading Completed", "Success", 5000);


            this.props.nextStep();

        } catch (error) {
            console.log("Error====>", error.response)
            NotificationManager.error(error.toString(), "Click to Remove", largeTime);
        }
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();

    }

    // Escape = () => {
    //     this.props.nextStep();
    // }
    render() {
        let { values, handleChange, handleOccupationChange } = this.props;
        return (
            <div className="card col-sm-10" style={{ paddingTop: "25px" }}>
            {/* 
                <div className="im col-sm-2" onClick={this.Escape}>
                    Escape
              </div>*/}

                <div className="card-header divBg">

                    <h3 className="text-center pt-3">Risk Grading</h3>

                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>

                        <div className='form-group'>
                            <label htmlFor="">Type Of On-boarding</label>
                            <select
                                className='custom-select'
                                value={values.onBoardingValue}
                                onChange={handleChange('onBoardingValue')}
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
                                value={values.geoRiskClient}
                                onChange={handleChange('geoRiskClient')}
                                name="geoRiskClient"
                            >
                                <option value='' disabled>--Select Client--</option>
                                <option value='2.1.1'>Resident Bangladeshi</option>
                                <option value='2.1.2'>Non-resident Bangladeshi</option>
                                <option value='2.1.3'>Foreign Citizen</option>



                            </select>
                        </div>

                        {/* For Foreigners */}

                        {
                            values.geoRiskClient === "2.1.3" ? (
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
                                            value={values.foreignOrigin}
                                            onChange={handleChange('foreignOrigin')}
                                            name="foreignOrigin"
                                        >
                                            <option value='' disabled>--Select Category--</option>
                                            <option value='2.2.1'>Yes</option>
                                            <option value='2.2.2'>No</option>

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
                                value={values.highOfficial}
                                onChange={handleChange('highOfficial')}
                                name="highOfficial"
                            >
                                <option value='' disabled>--Select Category--</option>
                                <option value='3.1.2'>Yes</option>
                                <option value='3.1.1'>No</option>

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
                                value={values.closeHighOfficial}
                                onChange={handleChange('closeHighOfficial')}
                                name="closeHighOfficial"
                            >
                                <option value='' disabled>--Select Category--</option>
                                <option value='3.2.2'>Yes</option>
                                <option value='3.2.1'>No</option>

                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="">
                                Is client a IP? or his family/close
                                associates related to IP?



                        </label>
                            <select
                                className='custom-select'
                                value={values.isClientIp}
                                onChange={handleChange('isClientIp')}
                                name="isClientIp"
                            >
                                <option value='' disabled>--Select Category--</option>
                                <option value='3.3.2'>Yes - based on assessed risk</option>
                                <option value='3.3.1'>No</option>

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
                                value={values.productTypes}
                                onChange={handleChange('productTypes')}
                                name="productTypes"
                            >
                                <option value='' disabled>--Select Status--</option>
                                <option value='4.1.1'>Savings account</option>
                                <option value='4.1.2'>Current account</option>
                                <option value='4.1.3'>FDR</option>
                                <option value='4.1.4'>Deposit Scheme upto12 lac</option>
                                <option value='4.1.5'>Deposit Scheme above 12 lac</option>
                                <option value='4.1.6'>Forex account</option>
                                <option value='4.1.7'>S.N.D.</option>
                                <option value='4.1.8'>R.F.C.D.</option>

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
                                    <input type="radio" class="form-check-input" onChange={handleOccupationChange} name="optionsRadios" id="optionsRadios1" value="5.a" />
                                        Business
                                    </label>
                            </div>&nbsp;&nbsp;&nbsp;
                                <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" onChange={handleOccupationChange} name="optionsRadios" id="optionsRadios1" value="5.b" />
                                        Profession
                                    </label>
                            </div>&nbsp;&nbsp;&nbsp;


                    </div>

                        {
                            values.occupation === "5.a" ? (
                                <div>

                                    <div className='form-group'>
                                        <label htmlFor="">Type of Product</label>
                                        <select
                                            className='custom-select'
                                            value={values.businessName}
                                            onChange={handleChange('businessName')}
                                            name="businessName"
                                        >
                                            <option value='' disabled>--Select Business--</option>
                                            <option value='5.a.1'>Jeweller/Gold/Valuable Metals Business</option>
                                            <option value='5.a.2'>Money Changer/Courier Service/MobileBanking Agent</option>
                                            <option value='5.a.3'>Real Estate Developer/Agent</option>
                                            <option value='5.a.4'>Promoter/Contractor: ConstructionProjects</option>
                                            <option value='5.a.5'>Art and Antiquities Dealer</option>
                                            <option value='5.a.6'>Restaurant/Bar/NightClub/Parlour/Hotel</option>
                                            <option value='5.a.7'>Export/Import</option>
                                            <option value='5.a.8'>Manpower export</option>
                                            <option value='5.a.9'>Firearms</option>
                                            <option value='5.a.10'>RMG/Garments Accessories/BuyingHouse</option>
                                            <option value='5.a.11'>Share/Stocks Investor</option>
                                            <option value='5.a.12'>Software/Information and Technology Business</option>
                                            <option value='5.a.13'>Travel Agent</option>
                                            <option value='5.a.14'>Merchant with over 10 million takas invested in business</option>
                                            <option value='5.a.15'>Freight/Shipping/Cargo Agent</option>
                                            <option value='5.a.16'>Automobiles business (New or Reconditioned)</option>
                                            <option value='5.a.17'>Leather/Leather goods Business</option>
                                            <option value='5.a.18'>Construction Materials Trader</option>
                                            <option value='5.a.19'>Business Agent</option>
                                            <option value='5.a.20'>Thread/"Jhut" Merchant</option>
                                            <option value='5.a.21'>Transport Operator</option>
                                            <option value='5.a.22'>Tobacco and Cigarettes Business</option>
                                            <option value='5.a.23'>Amusement Park/Entertainment Provider</option>
                                            <option value='5.a.24'>Motor Parts Trader/Workshop</option>
                                            <option value='5.a.25'>Small Business (Investment below BDT 5 million)</option>
                                            <option value='5.a.26'>Computer/Mobile Phone Dealer</option>
                                            <option value='5.a.27'>Manufacturer (except, weapons)</option>
                                            <option value='5.a.28'>Others</option>

                                        </select>
                                    </div>



                                    <hr />
                                </div>

                            ) : ""
                        }

                        {
                            values.occupation === "5.b" ?
                                (
                                    <div>

                                        <div className='form-group'>
                                            <label htmlFor="">Type of Product</label>
                                            <select
                                                className='custom-select'
                                                value={values.professionName}
                                                onChange={handleChange('professionName')}
                                                name="professionName"
                                            >
                                                <option value='' disabled>--Select Profession--</option>
                                                <option value='5.b.1'>Pilot/Flight Attendant</option>
                                                <option value='5.b.2'>Trustee</option>
                                                <option value='5.b.3'>Professional (Journalist, Lawyer, Doctor, Engineer, Chartered Accountant, etc.)</option>
                                                <option value='5.b.4'>Director (Private/Public Limited Company)</option>
                                                <option value='5.b.5'>High Official of Multinational Company (MNC)</option>
                                                <option value='5.b.6'>Homemaker</option>
                                                <option value='5.b.7'>Information Technology (IT) sector employee</option>
                                                <option value='5.b.8'>Athlete/Media Celebrity/Producer/Director</option>
                                                <option value='5.b.9'>Freelance Software Developer</option>
                                                <option value='5.b.10'>Government Service</option>
                                                <option value='5.b.11'>Landlord/Homeowner</option>
                                                <option value='5.b.12'>Private Service: Managerial</option>
                                                <option value='5.b.13'>Teacher (Public/Private/Autonomous Educational Institution)</option>
                                                <option value='5.b.14'>Private Sector Employee</option>
                                                <option value='5.b.15'>Self-employed Professional</option>
                                                <option value='5.b.16'>Student</option>
                                                <option value='5.b.17'>Retiree</option>
                                                <option value='5.b.18'>Farmer/Fisherman/Labourer</option>
                                                <option value='5.b.19'>Others</option>


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
                                value={values.yearlyTransaction}
                                onChange={handleChange('yearlyTransaction')}
                                name="yearlyTransaction"
                            >
                                <option value='' disabled>--Select Status--</option>
                                <option value='6.1.1'>Less than BDT 1 million</option>
                                <option value='6.1.2'>From BDT 1 million to 5 million</option>
                                <option value='6.1.3'>From BDT 5 million to 50 million</option>
                                <option value='6.1.4'>More than BDT 50 million</option>


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
                                value={values.hasSourceOfFunds}
                                onChange={handleChange('hasSourceOfFunds')}
                                name="hasSourceOfFunds"
                            >
                                <option value='' disabled>--Select Status--</option>
                                <option value='7.1.1'>Yes</option>
                                <option value='7.1.2'>No</option>



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


const schema = Joi.object({


    onBoardingValue: Joi.string().required(),
    geoRiskClient: Joi.string().required(),
    highOfficial: Joi.string().required(),
    closeHighOfficial: Joi.string().required(),
    isClientIp: Joi.string().required(),
    productTypes: Joi.string().required(),
    occupation: Joi.string().required(),
    yearlyTransaction: Joi.string().required(),
    hasSourceOfFunds: Joi.string().required()

})

export default RegRiskGrading;
