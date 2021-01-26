import React, { Component } from 'react';
import { AccountVerificationStatus, ProductCategoryType, AccountType, EkycAccountStatus, GenderForm, ProductCodeGetName } from '../../Utils/fullFormConversion';
import { dayMonthYearFormat } from '../../Utils/dateConversion';

class ShowMore extends Component {

    state = {
        ekyc: this.props.location.state.data,
        ProductCodetoName: ""
    }

    async componentDidMount() {
        //    console.log("All data", this.state.ekyc[0].account.productCode)
        let data = await ProductCodeGetName(this.state.ekyc[0].account.productCode);
        // console.log("data", data);
        this.setState({ ProductCodetoName: data });
    }

    backEkyc = () => {
        // this.props.history.push('/dashboard/e-kyc-list-&-search')
        this.props.history.goBack();
    }

    printData = () => {
        window.print();
    }

    render() {
        let { ekyc } = this.state;
        // console.log("ekyc", this.state.ekyc);
        return (
            <div className="container">

                <div className="row">
                    <div className="imTwoWhite col-sm-12">
                        <div className="im">
                            <h5 className="text-muted text-center pt-2">
                                <i class="fas fa-user-tag"></i> Individual E-KYC Data
                        </h5>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-10">
                                {
                                    ekyc.map((data, index) => (
                                        <div className="row justify-content-center mt-3">
                                            <div className="col-sm-6 imTwoWhite ">
                                                <div className="text-muted">
                                                    <h5>Personal Info</h5>
                                                    <hr />
                                                </div>
                                                <div className="pl-3" style={{ fontSize: "18px" }}>
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>EKYC ID : </span>{data.id}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Name : </span>{data.name}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Name Bangla : </span>{data.nameBangla}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Gender : </span>{GenderForm(data.gender)}</small><br />

                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Status : </span>{AccountVerificationStatus(data.verificationStatus)}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Type : </span>{data.verificationType}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Onboarding Type : </span>{data.onboardingType}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Verification Date : </span>{data.verificationDate}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>NID No : </span>{data.nid}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Cell No : </span>{data.mobile}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Date Of Birth : </span>{dayMonthYearFormat(data.dob)}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Father Name : </span>{data.fatherName}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Father Name Bangla : </span>{data.fatherNameBangla}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Mother Name : </span>{data.motherName}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Mother Name Bangla : </span>{data.motherNameBangla}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Spouse Name : </span>{data.spouseName}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Nationality : </span>{data.nationality === null ? "" : data.nationality}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Profession : </span>{data.profession}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Monthly Income : </span>{data.monthlyIncome === null ? "" : data.monthlyIncome}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Source Of Fund : </span>{data.sourceOfFund === null ? "" : data.sourceOfFund}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Created By : </span>{data.createdBy === null ? "" : data.createdBy}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Create Date : </span>{data.createDate === null ? '' : data.createDate}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Update By : </span>{data.updatedBy === null ? "" : data.updatedBy}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Update Date : </span>{data.updateDate === null ? '' : data.updateDate}</small><br />


                                                </div>

                                            </div>
                                            <div className="col-sm-6 imTwoWhite">
                                                <div className="text-muted">
                                                    <h5>Account Info</h5>
                                                    <hr />
                                                </div>
                                                <div className="pl-3" style={{ fontSize: "18px" }}>
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Account ID : </span>{data.account === null ? "" : data.account.id}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Title : </span>{data.account === null ? "" : data.account.title}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Account Number : </span>{data.account === null ? "" : data.account.channelAccountId ? data.account.channelAccountId : ""}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Code : </span>{data.account === null ? "" : data.account.channelCode ? data.account.channelCode : ""}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Product Type : </span>{data.account === null ? "" : ProductCategoryType(data.account.productType)}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Product Code : </span>{data.account === null ? "" : `${data.account.productCode} (${this.state.ProductCodetoName === null ? "" : this.state.ProductCodetoName})`}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Status : </span>{data.account === null ? "" : EkycAccountStatus(data.account.status)}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Type : </span>{data.account === null ? "" : AccountType(data.account.type)}</small><br />

                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Created By : </span>{data.account.createdBy === null ? "" : data.account.createdBy}</small><br />
                                                    <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Created Date : </span>{data.account.createDate === null ? "" : data.account.createDate}</small><br />



                                                    {/* <small style={{ color: "green" }}><span style={{ color: "#c47a0b" }}>Channel Response : </span>{data.account.channelResponse}</small><br /> */}
                                                </div>




                                            </div>

                                        </div>

                                    ))
                                }
                            </div>
                        </div>
                        <hr />
                        <div className="row d-flex justify-content-center">
                            <button className="neoBtnSmall mr-2" style={{ color: "#308f8f" }} onClick={this.backEkyc}>Back</button>
                            <button className="neoBtnSmall" style={{ color: "#308f8f" }} onClick={this.printData}>Print</button>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default ShowMore
