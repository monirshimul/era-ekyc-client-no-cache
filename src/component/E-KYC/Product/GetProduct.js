import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getProduct, createProduct, deleteProduct } from '../Url/ApiList';
import { NotificationManager } from "react-notifications";

class GetProduct extends Component {

    state={
        productData:[]
    }

    async componentDidMount(){
        let token = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        try {
            let getProductRes = await axios.post(getProduct, null ,token)
            console.log('getProductRes', getProductRes.data.data)
            this.setState({
                productData: getProductRes.data.data
            })
        } catch (error) {
            console.log("Error====>", error.response)
        }
    }

    onUpdate = async(id)=>{
        let {productData} = this.state
        
        let token = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        

        let idObj = {
            id:id
        }
    

        try {
            let updateRes = await axios.post(getProduct, idObj, token)
            console.log('updateRes', updateRes.data.data)
            let updateData = {
                data: updateRes.data.data
            }
            console.log(updateData)
            this.props.history.push('/dashboard/product-update', updateData);
        } catch (error) {
            console.log("Error====>", error)
        }
    }


    onDelete = async (id)=>{
        let token = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        
            
        
       
        try {
            let deleteRes = await axios.delete(deleteProduct, {
                headers: {
                  'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
                },
                data: {
                  id: id
                }
              })
            console.log('updateRes', deleteRes)
            NotificationManager.warning("Product Deleted", "Warning", 5000);
            let getProductRes = await axios.post(getProduct, null ,token)
            this.setState({
                productData: getProductRes.data.data
            })

        } catch (error) {
            console.log("Error===>",error.response)
        }
    }

    render() {
        let { productData } = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="imTwoWhite col-sm-12">
                        <div className="im">
                            <h5 className="text-muted text-center pt-2">
                                <i class="fas fa-list-ul"></i> Product List
                        </h5>
                        </div>
                        <div className="imTwoGray mt-2">
                            <div className="row d-flex justify-content-center">
                                {productData.map((data, index) => (
                                    <div key={index} className="neoBg col-sm-3 m-2 p-3 animated zoomIn">
                                        <div className="im">
                                            <small style={{ color: "#308f8f" }}>{data.name}</small>

                                        </div>
                                        <hr />
                                        <div className="neoBg" style={{ fontSize: "16px" }}>
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>ID : </span>{data.id}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Status : </span>{data.status}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Code : </span>{data.code}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Category Code : </span>{data.categoryCode}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Description : </span>{data.description}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Created By : </span>{data.createdBy}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Created Date : </span>{data.createDate}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Updated By : </span>{data.updatedBy}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Updated Date : </span>{data.updateDate}</small><br />
                                        </div>


                                        <hr />
                                        <div className="row d-flex justify-content-around">
                                            <button className="neoBtnSmall" style={{ color: "#308f8f" }} onClick={()=>this.onUpdate(data.id)} >Update</button>
                                            <button className="neoBtnSmall" style={{ color: "#d3830a" }} onClick={()=>this.onDelete(parseInt(data.id))}>Delete</button>

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

export default withRouter(GetProduct) 
