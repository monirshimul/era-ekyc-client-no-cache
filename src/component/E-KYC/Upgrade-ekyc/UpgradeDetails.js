import React, { Component } from 'react';
import Acordion from '../Acordion/Acordion';
import { AccountVerificationStatus, ProductCategoryType, AccountType, EkycProfileStatus, GenderForm } from '../../Utils/fullFormConversion';
import { getProduct } from '../Url/ApiList';
import axios from 'axios';

export class UpgradeDetails extends Component {
  state = {
    ekyc: this.props.location.state,
    arrowUp: false,
    productCodetoName: ''
  }

  async componentDidMount() {
    let config = {
      headers: {

        'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
      }
    };


    let obj = { code: this.state.ekyc.account.productCode }

    let codetoName = await axios.post(getProduct, obj, config);
    //  console.log("codetoName", codetoName.data.data[0].name);
    this.setState({ productCodetoName: codetoName.data.data[0].name });



  }

  backEkyc = () => {
    this.props.history.push('/dashboard/simplified-upgrade')
  }

  printData = () => {
    window.print();
  }


  render() {
    let { ekyc, arrowUp } = this.state;

    return (
      <div className="container">

        <div className="row">
          <div className="imTwoWhite col-sm-12">
            <div className="im">
              <h5 className="text-muted text-center pt-2">
                <i class="fas fa-user-tag"></i> Details
              </h5>
            </div>
            <div className="row d-flex justify-content-center ">
              <div className="col-sm-10">


                <div className="row justify-content-center mt-3">
                  <div className="col-sm-6 ">
                    <hr />
                    <div className="text-muted">
                      <h5>Account Info</h5>
                      <hr />
                    </div>

                    <div className="" style={{ fontSize: "17px" }}>
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Account ID : </span>{ekyc.account === null ? "" : ekyc.account.id}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Branch Or Agent Point Code : </span>{ekyc.account === null ? "" : ekyc.account.branchOrAgentPointCode}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Title : </span>{ekyc.account === null ? "" : ekyc.account.title}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Account Number : </span>{ekyc.account === null ? "" : ekyc.account.channelAccountId}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Product Type : </span>{ekyc.account === null ? "" : ProductCategoryType(ekyc.account.productType)}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Product Code : </span>{ekyc.account === null ? "" : `${ekyc.account.productCode}  (${this.state.productCodetoName})`}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Status : </span>{ekyc.account === null ? "" : EkycProfileStatus(ekyc.account.status)}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Type : </span>{ekyc.account === null ? "" : AccountType(ekyc.account.type)}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Transaction Or Maturity Amount : </span>{ekyc.account === null ? "" : ekyc.account.transactionOrMaturityAmount}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Created By : </span>{ekyc.account === null ? "" : ekyc.account.createdBy}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Created Date : </span>{ekyc.account === null ? "" : ekyc.account.createDate}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Code : </span>{ekyc.account === null ? "" : ekyc.account.channelCode}</small><br />

                      {/* <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Response : </span>{data.account.channelResponse}</small><br /> */}
                    </div>

                    <hr />



                    <div className="text-muted">
                      <h5>Others Info</h5>
                      <hr />
                    </div>

                    <div className="" style={{ fontSize: "17px" }}>
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Update By : </span>{ekyc.updateBy === null ? "" : ekyc.updateBy}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Update Date : </span>{ekyc.updateDate}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Pin : </span>{ekyc.pin}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Review Count : </span>{ekyc.reviewCount}</small><br />
                      {/* <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Risk Grading : </span>{ekyc.riskGrading}</small><br /> */}
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Sanction Screening : </span>{ekyc.sanctionScreening}</small><br />
                    </div>




                  </div>
                  <div className="col-sm-6">
                    <hr />
                    <div className="text-muted">
                      <h5>Personal Info</h5>
                      <hr />
                    </div>

                    <div className="" style={{ fontSize: "17px" }}>
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>EKYC ID : </span>{ekyc.id}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Name : </span>{ekyc.name}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Name Bangla : </span>{ekyc.nameBangla}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Gender : </span>{GenderForm(ekyc.gender)}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Status : </span>{AccountVerificationStatus(ekyc.verificationStatus)}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Type : </span>{ekyc.verificationType}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>On Boarding Type : </span>{ekyc.onboardingType}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Date : </span>{ekyc.verificationDate}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>NID No : </span>{ekyc.nid}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Cell No : </span>{ekyc.mobile}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Date Of Birth : </span>{ekyc.dob}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Father Name : </span>{ekyc.fatherName}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Father Name Bangla : </span>{ekyc.fatherNameBangla}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Mother Name : </span>{ekyc.motherName}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Mother Name Bangla : </span>{ekyc.motherNameBangla}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Spouse Name : </span>{ekyc.spouseName}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Nationality : </span>{ekyc.nationality === null ? "" : ekyc.nationality}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Profession : </span>{ekyc.profession}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Monthly Income : </span>{ekyc.monthlyIncome === null ? "" : ekyc.monthlyIncome}</small><br />
                      <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Source Of Fund : </span>{ekyc.sourceOfFund === null ? "" : ekyc.sourceOfFund}</small><br />


                      {/* <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Present Address : </span>{ekyc.presentAddress}</small><br />
                                  <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Permanent Address : </span>{ekyc.permanentAddress}</small><br />
                                  <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Permanent Address Bangla : </span>{ekyc.permanentAddressBangla}</small><br /> */}
                    </div>

                  </div>








                  <div className="col-sm-6">
                    <hr />


                    <Acordion
                      size={"col"}
                      heading={"Permanent Address Details"}
                      acBody={
                        <div className="imTwoWhite">
                          <small className="" style={{ fontSize: "14px" }}>

                            <span style={{ color: "green", fontSize: "14px" }}>Mouza Or Moholla :</span> {ekyc.permanentAddress.additionalMouzaOrMoholla + "(" + ekyc.permanentAddress.additionalMouzaOrMohollaEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Village Or Road :</span> {ekyc.permanentAddress.additionalVillageOrRoad + "(" + ekyc.permanentAddress.additionalVillageOrRoadEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>City Corp. :</span> {ekyc.permanentAddress.cityCorporationOrMunicipality + "(" + ekyc.permanentAddress.cityCorporationOrMunicipalityEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>District :</span> {ekyc.permanentAddress.district + "(" + ekyc.permanentAddress.districtEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>District Code :</span> {ekyc.permanentAddress.districtCode}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Address Type :</span> {ekyc.permanentAddress.addressType}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>ID :</span> {ekyc.permanentAddress.id}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Division :</span> {ekyc.permanentAddress.division + "(" + ekyc.permanentAddress.divisionEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Home Or Holding No. :</span> {ekyc.permanentAddress.homeOrHoldingNo + "(" + ekyc.permanentAddress.homeOrHoldingNoEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Post Office :</span> {ekyc.permanentAddress.postOffice + "(" + ekyc.permanentAddress.postOfficeEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Postal Code :</span> {ekyc.permanentAddress.postalCode}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Region :</span> {ekyc.permanentAddress.region + "(" + ekyc.permanentAddress.regionEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>RMO :</span> {ekyc.permanentAddress.rmo}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward :</span> {ekyc.permanentAddress.unionOrWard + "(" + ekyc.permanentAddress.unionOrWardEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward Code :</span> {ekyc.permanentAddress.unionCode}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Upozila :</span> {ekyc.permanentAddress.upozila + "(" + ekyc.permanentAddress.upozilaEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Upozila Code :</span> {ekyc.permanentAddress.upozilaCode}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Ward For Union Porishod :</span> {ekyc.permanentAddress.wardForUnionPorishod}<br />
                          </small>

                        </div>
                      }
                    />

                    <hr />
                  </div>

                  <div className="col-sm-6">
                    <hr />

                    <Acordion
                      size={"col"}
                      heading={"Present Address Details"}
                      acBody={
                        <div className="imTwoWhite">

                          <small className="" style={{ fontSize: "14px" }}>


                            <span style={{ color: "green", fontSize: "14px" }}>Mouza Or Moholla :</span> {ekyc.presentAddress.additionalMouzaOrMoholla + "(" + ekyc.presentAddress.additionalMouzaOrMohollaEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Village Or Road :</span> {ekyc.presentAddress.additionalVillageOrRoad + "(" + ekyc.presentAddress.additionalVillageOrRoadEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>City Corp. :</span> {ekyc.presentAddress.cityCorporationOrMunicipality + "(" + ekyc.presentAddress.cityCorporationOrMunicipalityEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>District :</span> {ekyc.presentAddress.district + "(" + ekyc.presentAddress.districtEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>District Code :</span> {ekyc.presentAddress.districtCode}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Address Type :</span> {ekyc.presentAddress.addressType}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>ID :</span> {ekyc.presentAddress.id}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Division :</span> {ekyc.presentAddress.division + "(" + ekyc.presentAddress.divisionEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Home Or Holding No. :</span> {ekyc.presentAddress.homeOrHoldingNo + "(" + ekyc.presentAddress.homeOrHoldingNoEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Post Office :</span> {ekyc.presentAddress.postOffice + "(" + ekyc.presentAddress.postOfficeEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Postal Code :</span> {ekyc.presentAddress.postalCode}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Region :</span> {ekyc.presentAddress.region + "(" + ekyc.presentAddress.regionEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>RMO :</span> {ekyc.presentAddress.rmo}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward :</span> {ekyc.presentAddress.unionOrWard + "(" + ekyc.presentAddress.unionOrWardEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward Code :</span> {ekyc.presentAddress.unionCode}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Upozila :</span> {ekyc.presentAddress.upozila + "(" + ekyc.presentAddress.upozilaEng + ")"}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Upozila Code :</span> {ekyc.presentAddress.upozilaCode}<br />
                            <span style={{ color: "green", fontSize: "14px" }}>Ward For Union Porishod :</span> {ekyc.presentAddress.wardForUnionPorishod}<br />
                          </small>

                        </div>
                      }
                    />

                    <hr />
                  </div>













                </div>






              </div>
            </div>
            <hr />



            <div className="row d-flex justify-content-center">
              <button className="neoBtnSmall mr-2" style={{ color: "#308f8f" }} onClick={this.backEkyc}>Back</button>
              <button className="neoBtnSmall mr-2" style={{ color: "#308f8f" }} onClick={this.printData}>Print</button>
            </div>
          </div>
        </div>


      </div>

    )
  }
}

export default UpgradeDetails;
