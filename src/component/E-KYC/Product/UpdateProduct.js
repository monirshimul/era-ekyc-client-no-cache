import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { createProduct } from '../Url/ApiList';
import { NotificationManager } from "react-notifications";
const Joi = require('@hapi/joi');

class UpdateProduct extends Component {

    state = {
        id: "",
        channelName: '',
        subChannelName: '',
        productName: "",
        productCode: '',
        productCategory: '',
        status: "",
        description: ""

    }

    componentDidMount() {


        if (this.props.history.location.state === undefined) {
            return ''
        } else {
            let data = this.props.history.location.state.data
            console.log("In the mount", data)
            this.setState({

                id: parseInt(data.map(v => v.id)),
                channelName: data.map(v => v.channelCode).toString(),
                subChannelName: data.map(v => v.subChannelCode).toString(),
                productName: data.map(v => v.name).toString(),
                productCode: data.map(v => v.code).toString(),
                productCategory: data.map(v => v.categoryCode).toString(),
                status: data.map(v => v.status).toString(),
                description: data.map(v => v.description).toString()

            })
        }

    }

    onChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { channelName, productName, description, productCode, productCategory, status, id, subChannelName } = this.state;


        let config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        let obj = {
            id: id,
            channelCode: channelName,
            subChannelCode: subChannelName,
            name: productName,
            code: productCode,
            categoryCode: productCategory,
            status: status,
            description: description
        }

        let joiData = {
            ChannelName: channelName,
            subChannelName: subChannelName,
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


    onBack = e => {
        e.preventDefault();
        this.props.history.replace('/dashboard/product-list');
    }


    render() {
        let { channelName, productName, description, productCode, productCategory, status, subChannelName } = this.state
        return (
            <div className="card col-sm-7" style={{ paddingTop: "25px" }}>

                <div className="card-header divBg">

                    <h3 className="text-center pt-3">
                        Update Product
                    </h3>

                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>

                        {/* Channel Name */}
                        <div className='form-group'>
                            <label htmlFor="">Channel Name</label>
                            <select

                                className='custom-select'
                                value={channelName}
                                onChange={this.onChange}
                                name="channelName"
                            >
                                <option value='' disabled>--Select--</option>
                                <option value='ABS'>Agent Banking</option>
                                <option value='CBS'>Conventional Core Banking</option>
                                <option value='ICBS'>Islamic Core Banking</option>
                                <option value='OMNI'>Omni Channel </option>
                                <option value='EKYC'>EKYC</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="">Sub-Channel Name</label>
                            <select

                                className='custom-select'
                                value={subChannelName}
                                onChange={this.onChange}
                                name="subChannelName"
                            >
                                <option value='' disabled>--Select--</option>
                                <option value='CONVENTIONAL'>CONVENTIONAL</option>
                                <option value='ISLAMIC'>ISLAMIC</option>

                            </select>
                        </div>


                        <div className='form-group'>
                            <label htmlFor="">Product Category</label>
                            <select
                                className='custom-select'
                                value={productCategory}
                                onChange={this.onChange}
                                name="productCategory"
                            >
                                <option value='' disabled>--Select Category--</option>
                                <option value='S0'>Savings Account</option>
                                <option value='C0'>Current Account</option>
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


                        <div className="row d-flex justify-content-center mt-4" >

                            <div>
                                <button className="b mr-5" onClick={this.onBack} type="submit" style={{ border: "none" }} >Back</button>
                            </div>

                            <div>
                                <button className="b" onClick={this.onSubmit} type="submit" style={{ border: "none" }} >Update</button>
                            </div>



                        </div>

                    </form>
                </div>



            </div>
        )
    }
}

const schema = Joi.object({
    ChannelName: Joi.string().required(),
    subChannelName: Joi.string().required(),
    productName: Joi.string().min(5).max(30).required(),
    productCode: Joi.string().min(3).required(),
    productCategory: Joi.string().required(),
    status: Joi.string().required(),
    description: Joi.string().max(100).required()

})

export default withRouter(UpdateProduct)
