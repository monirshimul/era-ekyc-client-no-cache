import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { createProduct } from '../Url/ApiList';
import { NotificationManager } from "react-notifications";
import { largeTime } from '../../Utils/notificationTime';
const Joi = require('@hapi/joi');

class CreateProduct extends Component {

    state = {
        channelName: '',
        subChannelName: 'CONVENTIONAL',
        productName: "",
        productCode: '',
        productCategory: '',
        status: "",
        description: ""

    }



    onChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { channelName, productName, description, productCode, productCategory, status, subChannelName } = this.state;

        let config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        let obj = {
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

        try {

            const validationValue = await schema.validateAsync(joiData);
            //console.log("validationValue", validationValue)

            let productCreateRes = await axios.post(createProduct, obj, config);
            // console.log("productCreateRes", productCreateRes)
            NotificationManager.success("Product Successfully Created", "Success", 5000);
            //localStorage.setItem("productInfo", JSON.stringify(obj));
            //this.props.history.replace('/dashboard/product-list');
            this.setState({
                channelName: '',
                subChannelName: 'CONVENTIONAL',
                productName: "",
                productCode: '',
                productCategory: '',
                status: "",
                description: ""
            })

        } catch (error) {
            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Click to Remove", largeTime);
            }
        }






        // this.props.history.push('/dashboard/face-account');

    }


    render() {
        let { channelName, productName, description, productCode, productCategory, status, subChannelName } = this.state;

        return (
            <div className="card col-sm-7" style={{ paddingTop: "25px" }}>

                <div className="card-header divBg">

                    <h3 className="text-center pt-3">Create Product</h3>

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
                            <label htmlFor="" className=""><i class="fas fa-file-signature"></i> Product Name</label>
                            <input name="productName" type="text" value={productName} onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Name" />
                        </div>


                        <div className="form-group">
                            <label htmlFor="" className=""><i class="fas fa-file-signature"></i> Product Code</label>
                            <input name="productCode" type="text" value={productCode} onChange={this.onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Code" />
                        </div>





                        <div className="form-group">
                            <label htmlFor="" className=""><i class="fas fa-align-left"></i> Description</label>
                            <textarea name="description" value={description} onChange={this.onChange} class="form-control" id="exampleTextareaOne" rows="3" placeholder="Enter Product Description"></textarea>

                        </div>


                        <div className="d-flex justify-content-center" >

                            <button className="b" type="submit" style={{ border: "none" }} >Create</button>

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
    productCategory: Joi.string().required(),
    status: Joi.string().required(),
    productName: Joi.string().min(5).max(30).required(),
    productCode: Joi.string().min(3).required(),
    description: Joi.string().max(100).required()

})

export default withRouter(CreateProduct)
