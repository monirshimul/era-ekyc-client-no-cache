import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { ekycWithFilter } from '../Url/ApiList';

class EkycListSearch extends Component {

    state = {
        page : 1,
        ekycData:[]
    }

    async componentDidMount(){
        const { page } = this.state
        
        try {
            let ekycList = await axios.post(ekycWithFilter + page)
            console.log("ekycList",ekycList.data.data.ekyc)
            this.setState({
                ekycData:ekycList.data.data.ekyc
            })
        } catch (error) {
            console.log(error.response)
        }


    }

    showMore = async (id)=>{
        
        
        let { page } = this.state
        try {
            let idObj ={
                id:id
            }
            let singleEkyc = await axios.post(ekycWithFilter + page, idObj)
            console.log("Show More",singleEkyc.data.data) 
            let dataObj = {
                data:singleEkyc.data.data
            }

        this.props.history.push('/dashboard/showMore',dataObj)
        } catch (error) {
            console.log(error.response)
        }
        
        
    }


    render() {
        let {ekycData}=this.state
        console.log("state data",ekycData.map(kyc => kyc))
        return (
            <div className="container">
               <div className="row">
                   <div className="imTwoWhite col-sm-12">
                   <div className="im">
                        <h5 className="text-muted text-center pt-2">
                            <i class="fas fa-list-ul"></i> E-kyc List
                        </h5>
                    </div>
                    <div className="imTwoGray mt-2">
                        <div className="row d-flex justify-content-center">
                            {ekycData.map((data, index)=>(
                                <div key={index} className="neoBg col-sm-3 m-2 p-3 animated zoomIn">
                                    <div className="im">
                                    <small  style={{color:"#308f8f"}}>{data.name}</small>
                                    
                                    </div>
                                    <hr/>
                                    
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>NID No : </span>{data.nid}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Cell No : </span>{data.mobile}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Verification Type : </span>{data.verificationType}</small><br/>
                                    <small style={{color:"green"}}><span style={{color:"#e39117"}}>Address : </span>{data.permanentAddressBangla}</small><br/>
                                    
                                    <hr/>
                                    <div className="row d-flex justify-content-around">
                                    <button className="neoBtnSmall" style={{color:"#308f8f"}}>Details</button>
                                    <button className="neoBtnSmall" style={{color:"#e39117"}} onClick={()=>this.showMore(data.id)}>More</button>
                                    <button className="neoBtnSmall"style={{color:"#e3174c"}}>Delete</button>
                                    </div>
                                   
                                </div>
                            ))}
                            
                            
                        </div>
                    </div>
                   </div>
               
               </div>
            </div>
        )
    }
}

export default withRouter (EkycListSearch)
