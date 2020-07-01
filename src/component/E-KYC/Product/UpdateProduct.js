import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { createProduct } from '../Url/ApiList';
import { NotificationManager } from "react-notifications";

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

        if (productName === '') {
            let productNameMessage = "Please provide Product Name";
            NotificationManager.error(productNameMessage, "Error", 5000);
            return;
        }

        if (productCode === '') {
            let productCodeMessage = 'Please provide Product Code';
            NotificationManager.error(productCodeMessage, "Error", 5000);
            return;
        }

        if (productCategory === '') {
            let productCategoryMessage = 'Please provide Product Category';
            NotificationManager.error(productCategoryMessage, "Error", 5000);
            return;
        }

        if (status === '') {
            let productStatusMessage = 'Please select Product status';
            NotificationManager.error(productStatusMessage, "Error", 5000);
            return;
        }

        if (description === '') {
            let productDescriptionMessage = 'Please provide Product Description';
            NotificationManager.error(productDescriptionMessage, "Error", 5000);
            return;
        }

        let token = {
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

        console.log("update data", obj)

        try {

            let productUpdateRes = await axios.put(createProduct, obj, token);
            console.log("productCreateRes", productUpdateRes)
            NotificationManager.success("Product Successfully Updated", "Success", 5000);
            localStorage.setItem("productInfo", JSON.stringify(obj));
            this.props.history.replace('/dashboard/product-list');

        } catch (error) {
            console.log("Error====>", error.response)
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

export default withRouter(UpdateProduct)