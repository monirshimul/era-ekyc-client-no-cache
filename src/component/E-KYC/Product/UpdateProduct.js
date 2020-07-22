import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { createProduct } from '../Url/ApiList';
import { NotificationManager } from "react-notifications";
const Joi = require('@hapi/joi');

class UpdateProduct extends Component {

    state = {
        id:"",
        productName: "",
        productCode: '',
        productCategory: '',
        status: "",
        description: ""

    }

    componentDidMount(){
       
        
        if(this.props.history.location.state === undefined){
            return ''
        }else{
            let data = this.props.history.location.state.data
            console.log("In the mount",data)
            this.setState({

                id: parseInt(data.map(v=>v.id)),
                productName: data.map(v=>v.name).toString(),
                productCode: data.map(v=>v.code).toString(),
                productCategory: data.map(v=>v.categoryCode).toString(),
                status: data.map(v=>v.status).toString(),
                description: data.map(v=>v.description).toString()

            })
        }
        
    }

    onChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { productName, description, productCode, productCategory, status, id } = this.state;

        
        let config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        let obj = {
            id: id,
            name: productName,
            code: productCode,
            categoryCode: productCategory,
            status: status,
            description: description
        }

        let joiData = {
            productName: productName,
            productCode: productCode,
            productCategory: productCategory,
            status: status,
            description: description
        }

        //console.log("update data", obj)

        try {

            const validationValue = await schema.validateAsync(joiData);
           // console.log("validationValue", validationValue)

            let productUpdateRes = await axios.put(createProduct, obj, config);
            //console.log("productCreateRes", productUpdateRes)
            NotificationManager.success("Product Successfully Updated", "Success", 5000);
           // localStorage.setItem("productInfo", JSON.stringify(obj));
            this.props.history.replace('/dashboard/product-list');

        } catch (error) {
            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
               // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }






        // this.props.history.push('/dashboard/face-account');

    }


    render() {
        let { productName, description, productCode, productCategory, status } = this.state
        return (
            <div className="card col-sm-7" style={{ paddingTop: "25px" }}>

                <div className="card-header divBg">

                    <h3 className="text-center pt-3">
                        Update Product
                    </h3>

                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>

                        <div className='form-group'>
                            <label htmlFor="">Product Category</label>
                            <select
                                className='custom-select'
                                value={productCategory}
                                onChange={this.onChange}
                                name="productCategory"
                            >
                                <option value='' disabled>--Select Category--</option>
                                <option value='SA'>Savings Account</option>
                                <option value='CA'>Current Account</option>
                                <option value='TD'>Term Deposit</option>
                                <option value='RD'>Recurring Deposit</option>


                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="">Product Status</label>
                            <select
                                className='custom-select'
                                value={status}
                                onChange={this.onChange}
                                name="status"
                            >
                                <option value='' disabled>--Select Status--</option>
                                <option value='A'>Active</option>
                                <option value='I'>Inactive</option>

                            </select>
                        </div>


                        <div className="form-group">
                            <label htmlFor="" className="text-muted"><i class="fas fa-file-signature"></i> Product Name</label>
                            <input name="productName" type="text" value={productName} onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Name" />
                        </div>


                        <div className="form-group">
                            <label htmlFor="" className="text-muted"><i class="fas fa-file-signature"></i> Product Code</label>
                            <input name="productCode" type="text" value={productCode} onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Code" />
                        </div>





                        <div className="form-group">
                            <label htmlFor="" className="text-muted"><i class="fas fa-align-left"></i> Description</label>
                            <textarea name="description" value={description} onChange={this.onChange} class="form-control" id="exampleTextareaOne" rows="3" placeholder="Enter Role Description"></textarea>

                        </div>


                        <div className="d-flex justify-content-center" >
                            
                                
                                    <button className="b" type="submit" style={{ border: "none" }} >Update</button>
                                
                            
                            

                        </div>

                    </form>
                </div>



            </div>
        )
    }
}

const schema = Joi.object({
    productName: Joi.string().min(5).max(30).required(),
    productCode: Joi.string().min(3).required(),
    productCategory: Joi.string().required(),
    status: Joi.string().required(),
    description: Joi.string().max(100).required()

})

export default withRouter(UpdateProduct)
