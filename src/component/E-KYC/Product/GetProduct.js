import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { ResourceStatus, ProductCategoryType } from '../../Utils/fullFormConversion';
import { getProduct, createProduct, deleteProduct } from '../Url/ApiList';
import { NotificationManager } from "react-notifications";
import {
    FaUser, FaHome, FaIndent,
    FaAddressCard, FaTools, FaBookReader,
    FaAddressBook, FaMicrochip, FaGetPocket,
    FaClone, FaUsers, FaPhone, FaEdit, FaSignOutAlt,
    FaBatteryThreeQuarters, FaMizuni, FaPenNib,
    FaDigitalTachograph, FaArchive, FaBinoculars,
    FaSearch, FaListUl, FaUsersCog, FaFileSignature,
    FaAlignLeft, FaClipboardList, FaCheckSquare,
    FaPlusCircle, FaUserCheck, FaSortNumericUp,
    FaCheckCircle, FaWindowClose, FaArrowAltCircleRight,
    FaElementor, FaUserShield, FaUserTag, FaUserEdit,
    FaCalendarCheck, FaCalendarAlt, FaMicroblog, FaPenAlt, FaCalendarDay
} from "react-icons/fa";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class GetProduct extends Component {

    state = {
        productData: [],
        productDetails: [],
        searchProduct: "ABS",
        checkingProduct: '',
        featureTest: JSON.parse(sessionStorage.getItem('featureList')) ? JSON.parse(sessionStorage.getItem('featureList')) : []
    }

    // Radio Button Search
    handleSearchChange = async (event) => {
        this.setState({ searchProduct: event.target.value });

        const obj = {
            channelCode: event.target.value
        }

        let config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        try {
            let getProductRes = await axios.post(getProduct, obj, config)
            // console.log('getProductRes', getProductRes.data.data);
            this.setState({
                productData: getProductRes.data.data
            })

            if (this.state.productData.length === 0) {
                NotificationManager.info("No Product Found", "Message", 5000);
            }

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



    };


    async componentDidMount() {
        let config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        try {
            let getProductRes = await axios.post(getProduct, { channelCode: this.state.searchProduct }, config)
            // console.log('getProductRes', getProductRes.data.data);
            this.setState({
                productData: getProductRes.data.data
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
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }
    }

    // Details
    onDetails = async (id) => {
        let { productDetails } = this.state;
        let config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };


        let idObj = {
            id: id
        }


        try {
            let detailsRes = await axios.post(getProduct, idObj, config)
            console.log('detailsRes', detailsRes.data.data);
            this.setState({ productDetails: detailsRes.data.data });
            // console.log(updateData)

        } catch (error) {
            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                //  console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }

    }

    onUpdate = async (id) => {
        let { productData } = this.state

        let config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };


        let idObj = {
            id: id
        }


        try {
            let updateRes = await axios.post(getProduct, idObj, config)
            // console.log('updateRes', updateRes.data.data)
            let updateData = {
                data: updateRes.data.data
            }
            // console.log(updateData)
            this.props.history.push('/dashboard/product-update', updateData);
        } catch (error) {
            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                //  console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }
    }


    onDelete = async (id) => {
        let config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };




        try {

            var retVal = window.confirm("Do you want to Delete? All data of this product will be deleted. ");
            if (retVal === true) {
                let deleteRes = await axios.delete(deleteProduct, {
                    headers: {
                        'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
                    },
                    data: {
                        id: id
                    }
                })
                // console.log('updateRes', deleteRes)
                NotificationManager.warning("Product Deleted", "Warning", 5000);
                let getProductRes = await axios.post(getProduct, null, config)
                console.log(getProductRes.data.data);
                this.setState({
                    productData: getProductRes.data.data
                })
            } else {
                let getProductRes = await axios.post(getProduct, null, config)
                console.log(getProductRes.data.data);
                this.setState({
                    productData: getProductRes.data.data
                })
            }




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
    }

    render() {
        let { productData } = this.state;
        console.log("checkboxProduct", this.state.searchProduct);
        return (
            <div className="container">

                {/* Search Product Start */}

                <div className="row">
                    <div className="imTwoWhite col-sm-12" style={{ padding: "0 25px 0 25px" }}>
                        <div className="im">
                            <h5 className="text-muted text-center pt-2">
                                <i class="fas fa-search"></i> Search Product
                        </h5>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <form className="col-sm-8">

                                <div className="form-group d-flex justify-content-center">

                                    <RadioGroup row aria-label="ChannelSelection" name="channelSelect" value={this.state.searchProduct} onChange={this.handleSearchChange} defaultValue="ABS">
                                        <FormControlLabel value="ABS" control={<Radio />} label="Agent Banking" />
                                        <FormControlLabel value="CBS" control={<Radio />} label="Conventional Core Banking" />
                                        <FormControlLabel value="ICBS" control={<Radio />} label="Islamic Core Banking" />

                                    </RadioGroup>

                                </div>

                            </form>
                        </div>

                    </div>

                </div>


                <div className="row">
                    <div className="imTwoWhite col-sm-12">
                        <div className="im">
                            <h5 className="text-muted text-center pt-2">
                                <i class="fas fa-list-ul"></i> Product List
                        </h5>
                        </div>
                        <div className="imTwoGray">
                            <div className="row d-flex justify-content-center">
                                {productData.map((data, index) => (
                                    <div key={index} className="neoBg col-sm-4 m-2 p-3 animated zoomIn">
                                        <div className="im">
                                            <small style={{ color: "#308f8f" }}>{data.name}</small>

                                        </div>
                                        <hr />
                                        <div className="neoBg" style={{ fontSize: "16px" }}>
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>ID : </span>{data.id}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Status : </span>{ResourceStatus(data.status)}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Product Code : </span>{data.code}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Category Code : </span>{ProductCategoryType(data.categoryCode)}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Product Name : </span>{data.name}</small><br />

                                            {/* <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Description : </span>{data.description}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Created By : </span>{data.createdBy}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Created Date : </span>{data.createDate}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Updated By : </span>{data.updatedBy}</small><br />
                                            <small style={{ color: "green" }}><span style={{ color: "#d3830a" }}>Updated Date : </span>{data.updateDate}</small><br /> */}
                                        </div>


                                        <hr />
                                        <div className="row d-flex justify-content-center">
                                            {this.state.featureTest.includes('7.3') === true ?
                                                <button className="neoBtnSmall mr-3" style={{ color: "#308f8f" }} onClick={() => this.onUpdate(data.id)} >Update</button>
                                                :
                                                ""
                                            }

                                            <button className="neoBtnSmall mr-3" data-toggle="modal" data-target="#exampleModalCenter" style={{ color: "green" }} onClick={() => this.onDetails(parseInt(data.id))}>Details</button>

                                            {this.state.featureTest.includes('7.4') === true ?
                                                <button className="neoBtnSmall" style={{ color: "#d3830a" }} onClick={() => this.onDelete(parseInt(data.id))}>Delete</button>
                                                :
                                                ""
                                            }



                                        </div>

                                    </div>
                                ))}


                            </div>
                            {/* ======= */}
                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content imTwo">
                                        <div className="modal-header divBg">
                                            <h5 className="modal-title" id="exampleModalCenterTitle"><i class="far fa-arrow-alt-circle-right"></i> Product Details</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {this.state.productDetails.map(val => (
                                                <div className="">
                                                    <div className="">
                                                        <small className="text-muted"><i className="fas fa-sort-numeric-up"><FaSortNumericUp /></i> ID : <span>{val.id}</span></small>
                                                    </div>

                                                    <div>
                                                        <small className="text-muted"><i className="fab fa-mizuni"><FaMizuni /></i> Channel Name : <span>{val.channelCode}</span></small>
                                                    </div>

                                                    <div>
                                                        <small className="text-muted"><i className="fab fa-mizuni"><FaMizuni /></i> Category Code : <span>{ProductCategoryType(val.categoryCode)}</span></small>
                                                    </div>

                                                    <div>
                                                        <small className="text-muted"><i className="fab fa-mizuni"><FaMizuni /></i> Product Name : <span>{val.name}</span></small>
                                                    </div>



                                                    <div>
                                                        <small className="text-muted"><i className="fab fa-mizuni"><FaMizuni /></i> Product Code : <span>{val.code}</span></small>
                                                    </div>

                                                    <div>
                                                        <small className="text-muted"><i className="fas fa-battery-three-quarters"><FaBatteryThreeQuarters /></i> Status : <span>{ResourceStatus(val.status)}</span></small>
                                                    </div>

                                                    <hr />
                                                    <div>
                                                        <small className="text-muted"><i className="fas fa-pen-nib"><FaPenAlt /></i> Description : <span>{val.description}</span></small>
                                                    </div>


                                                    <hr />
                                                    <div>
                                                        <small className="text-muted"><i className="fas fa-user-shield"><FaUserShield /></i> Created By : <span>{val.createdBy}</span></small>
                                                    </div>

                                                    <div>
                                                        <small className="text-muted"><i className="fas fa-calendar-check"><FaCalendarCheck /></i> Created Date : <span>{val.createDate}</span></small>
                                                    </div>

                                                    <div>
                                                        <small className="text-muted"><i className="fas fa-user-edit"><FaUserEdit /></i> Updated By : <span>{val.updatedBy}</span></small>
                                                    </div>


                                                    <div>
                                                        <small className="text-muted"><i className="far fa-calendar-check"><FaCalendarDay /></i> Updated Date : <span>{val.updateDate}</span></small>
                                                    </div>

                                                </div>

                                            ))}
                                        </div>
                                        <div className="modal-footer imTwo">
                                            <span className="sbtnx" data-dismiss="modal">Close</span>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ======= */}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(GetProduct) 
