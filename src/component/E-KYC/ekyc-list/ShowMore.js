import React, { Component } from 'react'

class ShowMore extends Component {

    state = {
        ekyc: this.props.location.state.data
    }

    componentDidMount(){
        console.log("All data", this.state.ekyc )
    }

    backEkyc = ()=>{
        this.props.history.push('/dashboard/e-kyc-list-&-search')
    }

    render() {
        let {ekyc}=this.state
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
                                ekyc.map((data, index)=>(
                                    <div className="mt-5">
                                        <div className="text-muted">
                                            <h5>Personal Info</h5>
                                            <hr/>
                                        </div>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Name : </span>{data.name}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Name Bangla : </span>{data.nameBangla}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Gender : </span>{data.gender}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>ID : </span>{data.id}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Verification Status : </span>{data.verificationStatus}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Verification Type : </span>{data.verificationType}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Verification Date : </span>{data.verificationDate}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>NID No : </span>{data.nid}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Cell No : </span>{data.mobile}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Date Of Birth : </span>{data.dob}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Father Name : </span>{data.fatherName}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Father Name Bangla : </span>{data.fatherNameBangla}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Mother Name : </span>{data.motherName}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Mother Name Bangla : </span>{data.motherNameBangla}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Spouse Name : </span>{data.spouseName}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Nationality : </span>{data.nationality === null ? "" : data.nationality}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Profession : </span>{data.profession}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Monthly Income : </span>{data.monthlyIncome === null ? "" : data.monthlyIncome}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Source Of Fund : </span>{data.sourceOfFund === null ? "" : data.sourceOfFund}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Update By : </span>{data.updateBy === null ? "" : data.updateBy}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Update Date : </span>{data.updateDate}</small><br/>

                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Present Address : </span>{data.presentAddress}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Permanent Address : </span>{data.permanentAddress}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Permanent Address Bangla : </span>{data.permanentAddressBangla}</small><br/>
                                    </div>
                                    
                                ))
                            }
                        </div>
                    </div>
                    <hr/>
                    <div className="row d-flex justify-content-center">
                <button className="neoBtnSmall" style={{color:"#308f8f"}} onClick={this.backEkyc}>Back</button>
                <button className="neoBtnSmall" style={{color:"#308f8f"}}>Print</button>
                </div>
                    </div>
                </div>
                
                
            </div>
        )
    }
}

export default ShowMore
