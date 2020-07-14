import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";

export class RegRiskGrading extends Component {
    continue = async (e) => {
        e.preventDefault();
     
        let {values} = this.props;

        let token = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        let obj = {
            onBoardingValue:values.onBoardingValue,
            geoRiskClient:values.geoRiskClient,
            foreignOrigin:values.foreignOrigin,
            highOfficial:values.highOfficial,
            closeHighOfficial:values.closeHighOfficial,
            isClientIp:values.isClientIp,
            productTypes:values.productTypesss,
            occupation:values.occupation,
            businessName:values.businessName,
            professionName:values.professionName,
            yearlyTransaction:values.yearlyTransaction,
            hasSourceOfFunds:values.hasSourceOfFunds
        }

        console.log("riskGradingRegular", obj);

        try {

            console.log("Risk Data", obj)

            //alert("Risk Grading Measured", obj)

            NotificationManager.success("Risk Grading Completed", "Success", 5000);

           
            this.props.nextStep();

        } catch (error) {
            console.log("Error====>", error.response)
        }
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
        
    }
    render() {
        let {values,handleChange,handleOccupationChange} = this.props;
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
                            <option value='2.1'>Resident Bangladeshi</option>
                            <option value='2.2'>Non-resident Bangladeshi</option>
                            <option value='2.3'>Foreign Citizen</option>



                        </select>
                    </div>

                    {/* For Foreigners */}

                    {
                        values.geoRiskClient === "2.3" ? (
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
                            value={values.highOfficial}
                            onChange={handleChange('highOfficial')}
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
                            value={values.closeHighOfficial}
                            onChange={handleChange('closeHighOfficial')}
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
                            value={values.isClientIp}
                            onChange={handleChange('isClientIp')}
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
                            value={values.productTypess}
                            onChange={handleChange('productTypess')}
                            name="productTypess"
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
                                <input type="radio" class="form-check-input" onChange={handleOccupationChange} name="optionsRadios" id="optionsRadios1" value="5.1" />
                                        Business
                                    </label>
                        </div>&nbsp;&nbsp;&nbsp;
                                <div class="form-check">
                            <label class="form-check-label">
                                <input type="radio" class="form-check-input" onChange={handleOccupationChange} name="optionsRadios" id="optionsRadios1" value="5.2" />
                                        Profession
                                    </label>
                        </div>&nbsp;&nbsp;&nbsp;


                    </div>

                    {
                        values.occupation === "5.1" ? (
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
                        values.occupation === "5.2" ?
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
                            value={values.yearlyTransaction}
                            onChange={handleChange('yearlyTransaction')}
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
                            value={values.hasSourceOfFunds}
                            onChange={handleChange('hasSourceOfFunds')}
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

export default RegRiskGrading;
