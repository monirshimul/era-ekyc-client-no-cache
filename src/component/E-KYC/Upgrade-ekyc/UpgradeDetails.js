import React, { Component } from 'react';
import Acordion from '../Acordion/Acordion';
import { AccountVerificationStatus, ProductCategoryType, AccountType, EkycProfileStatus, GenderForm } from '../../Utils/fullFormConversion';
import { getProduct } from '../Url/ApiList';
import axios from 'axios';

export class UpgradeDetails extends Component {
  state = {
    ekyc: this.props.location.state,
    arrowUp: false,
    productCode: '',
    productCodetoName: ''
  }

  async componentDidMount() {
    let config = {
      headers: {

        'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
      }
    };
    this.state.ekyc.map(async (data, index) => {
      this.setState({ productCode: data.account.productCode });
    })

    let codetoName = await axios.post(getProduct, this.state.productCode, config);
    // console.log("codetoName", codetoName.data.data[0].name);
    this.setState({ productCodetoName: codetoName.data.data[0].name });

  }

  backEkyc = () => {
    this.props.history.push('/dashboard/simplified-upgrade')
  }

  printData = () => {
    window.print();
  }


  render() {
    let { ekyc, arrowUp } = this.state
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
                    {this.state.ekyc.map((data, index) => (
                      <div className="" style={{ fontSize: "17px" }}>
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Account ID : </span>{data.account === null ? "" : data.account.id}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Branch Or Agent Point Code : </span>{data.account === null ? "" : data.account.branchOrAgentPointCode}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Title : </span>{data.account === null ? "" : data.account.title}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Account Number : </span>{data.account === null ? "" : data.account.channelAccountId}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Product Type : </span>{data.account === null ? "" : ProductCategoryType(data.account.productType)}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Product Code : </span>{data.account === null ? "" : `${data.account.productCode} (${this.state.productCodetoName}) `}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Status : </span>{data.account === null ? "" : EkycProfileStatus(data.account.status)}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Type : </span>{data.account === null ? "" : AccountType(data.account.type)}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Transaction Or Maturity Amount : </span>{data.account === null ? "" : data.account.transactionOrMaturityAmount}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Created By : </span>{data.account === null ? "" : data.account.createdBy}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Created Date : </span>{data.account === null ? "" : data.account.createDate}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Code : </span>{data.account === null ? "" : data.account.channelCode}</small><br />

                        {/* <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Response : </span>{data.account.channelResponse}</small><br /> */}
                      </div>
                    ))}
                    <hr />



                    <div className="text-muted">
                      <h5>Others Info</h5>
                      <hr />
                    </div>
                    {this.state.ekyc.map((data, index) => (
                      <div className="" style={{ fontSize: "17px" }}>
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Update By : </span>{data.updateBy === null ? "" : data.updateBy}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Update Date : </span>{data.updateDate}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Pin : </span>{data.pin}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Review Count : </span>{data.reviewCount}</small><br />
                        {/* <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Risk Grading : </span>{data.riskGrading}</small><br /> */}
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Sanction Screening : </span>{data.sanctionScreening}</small><br />
                      </div>
                    ))}



                  </div>
                  <div className="col-sm-6">
                    <hr />
                    <div className="text-muted">
                      <h5>Personal Info</h5>
                      <hr />
                    </div>
                    {this.state.ekyc.map((data, index) => (
                      <div className="" style={{ fontSize: "17px" }}>
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Ekyc ID : </span>{data.id}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Name : </span>{data.name}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Name Bangla : </span>{data.nameBangla}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Gender : </span>{GenderForm(data.gender)}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Status : </span>{AccountVerificationStatus(data.verificationStatus)}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Type : </span>{data.verificationType}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Date : </span>{data.verificationDate}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>NID No : </span>{data.nid}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Cell No : </span>{data.mobile}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Date Of Birth : </span>{data.dob}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Father Name : </span>{data.fatherName}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Father Name Bangla : </span>{data.fatherNameBangla}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Mother Name : </span>{data.motherName}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Mother Name Bangla : </span>{data.motherNameBangla}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Spouse Name : </span>{data.spouseName}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Nationality : </span>{data.nationality === null ? "" : data.nationality}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Profession : </span>{data.profession}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Monthly Income : </span>{data.monthlyIncome === null ? "" : data.monthlyIncome}</small><br />
                        <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Source Of Fund : </span>{data.sourceOfFund === null ? "" : data.sourceOfFund}</small><br />


                        {/* <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Present Address : </span>{ekyc.presentAddress}</small><br />
                                  <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Permanent Address : </span>{ekyc.permanentAddress}</small><br />
                                  <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Permanent Address Bangla : </span>{ekyc.permanentAddressBangla}</small><br /> */}
                      </div>
                    ))}
                  </div>








                  <div className="col-sm-6">
                    <hr />
                    {this.state.ekyc.map((data, index) => (

                      <Acordion
                        size={"col"}
                        heading={"Permanent Address Details"}
                        acBody={
                          <div className="imTwoWhite">
                            <small className="" style={{ fontSize: "14px" }}>

                              <span style={{ color: "green", fontSize: "14px" }}>Mouza Or Moholla :</span> {data.permanentAddress.additionalMouzaOrMoholla + "(" + data.permanentAddress.additionalMouzaOrMohollaEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Village Or Road :</span> {data.permanentAddress.additionalVillageOrRoad + "(" + data.permanentAddress.additionalVillageOrRoadEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>City Corp. :</span> {data.permanentAddress.cityCorporationOrMunicipality + "(" + data.permanentAddress.cityCorporationOrMunicipalityEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>District :</span> {data.permanentAddress.district + "(" + data.permanentAddress.districtEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>District Code :</span> {data.permanentAddress.districtCode}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Address Type :</span> {data.permanentAddress.addressType}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>ID :</span> {data.permanentAddress.id}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Division :</span> {data.permanentAddress.division + "(" + data.permanentAddress.divisionEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Home Or Holding No. :</span> {data.permanentAddress.homeOrHoldingNo + "(" + data.permanentAddress.homeOrHoldingNoEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Post Office :</span> {data.permanentAddress.postOffice + "(" + data.permanentAddress.postOfficeEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Postal Code :</span> {data.permanentAddress.postalCode}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Region :</span> {data.permanentAddress.region + "(" + data.permanentAddress.regionEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>RMO :</span> {data.permanentAddress.rmo}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward :</span> {data.permanentAddress.unionOrWard + "(" + data.permanentAddress.unionOrWardEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward Code :</span> {data.permanentAddress.unionCode}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Upozila :</span> {data.permanentAddress.upozila + "(" + data.permanentAddress.upozilaEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Upozila Code :</span> {data.permanentAddress.upozilaCode}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Ward For Union Porishod :</span> {data.permanentAddress.wardForUnionPorishod}<br />
                            </small>

                          </div>
                        }
                      />
                    ))}
                    <hr />
                  </div>

                  <div className="col-sm-6">
                    <hr />
                    {this.state.ekyc.map((data, index) => (
                      <Acordion
                        size={"col"}
                        heading={"Present Address Details"}
                        acBody={
                          <div className="imTwoWhite">

                            <small className="" style={{ fontSize: "14px" }}>


                              <span style={{ color: "green", fontSize: "14px" }}>Mouza Or Moholla :</span> {data.presentAddress.additionalMouzaOrMoholla + "(" + data.presentAddress.additionalMouzaOrMohollaEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Village Or Road :</span> {data.presentAddress.additionalVillageOrRoad + "(" + data.presentAddress.additionalVillageOrRoadEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>City Corp. :</span> {data.presentAddress.cityCorporationOrMunicipality + "(" + data.presentAddress.cityCorporationOrMunicipalityEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>District :</span> {data.presentAddress.district + "(" + data.presentAddress.districtEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>District Code :</span> {data.presentAddress.districtCode}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Address Type :</span> {data.presentAddress.addressType}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>ID :</span> {data.presentAddress.id}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Division :</span> {data.presentAddress.division + "(" + data.presentAddress.divisionEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Home Or Holding No. :</span> {data.presentAddress.homeOrHoldingNo + "(" + data.presentAddress.homeOrHoldingNoEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Post Office :</span> {data.presentAddress.postOffice + "(" + data.presentAddress.postOfficeEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Postal Code :</span> {data.presentAddress.postalCode}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Region :</span> {data.presentAddress.region + "(" + data.presentAddress.regionEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>RMO :</span> {data.presentAddress.rmo}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward :</span> {data.presentAddress.unionOrWard + "(" + data.presentAddress.unionOrWardEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward Code :</span> {data.presentAddress.unionCode}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Upozila :</span> {data.presentAddress.upozila + "(" + data.presentAddress.upozilaEng + ")"}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Upozila Code :</span> {data.presentAddress.upozilaCode}<br />
                              <span style={{ color: "green", fontSize: "14px" }}>Ward For Union Porishod :</span> {data.presentAddress.wardForUnionPorishod}<br />
                            </small>

                          </div>
                        }
                      />
                    ))}
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
