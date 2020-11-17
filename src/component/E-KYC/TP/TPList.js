import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getTPAPI, deleteTPAPI } from '../Url/ApiList';
import { EkycType, ProductCategoryType, ResourceStatus } from "../../Utils/fullFormConversion";
import { NotificationManager } from "react-notifications";
import axios from 'axios';

export class TPList extends Component {
    state = {
        allTP: [],
        details: [],
        tpReq: false,
        featureTest: JSON.parse(sessionStorage.getItem('featureList')) ? JSON.parse(sessionStorage.getItem('featureList')) : []
    }

    async componentDidMount() {

        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        try {
            let tp = await axios.post(getTPAPI, "", config);
            //console.log(tp.data);
            let tpdata = tp.data.data;
            this.setState({ allTP: tpdata })

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

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.tpReq !== this.state.tpReq) {

            const config = {
                headers: {
                    'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
                }
            };

            try {
                let tp = await axios.post(getTPAPI, "", config);
                // console.log(tp.data);
                let tpdata = tp.data.data;
                this.setState({ allTP: tpdata })

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

        } else {
            return false;
        }
    }

    // Details
    onDetails = async (id) => {

        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        const detailsObj = { id };
        try {
            let detailsTP = await axios.post(getTPAPI, detailsObj, config);
            // console.log(detailsTP.data.data);
            let allDetails = detailsTP.data.data;
            this.setState({ details: allDetails });
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

    // Delete
    onDelete = async (id) => {
        // console.log("deleteid", id);

        const Deleteobj = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            },
            data: {
                id: id
            }
        }

        try {
            let deleteTP = await axios.delete(deleteTPAPI, Deleteobj);
            this.setState({ tpReq: !this.state.tpReq });
            NotificationManager.success("Delete Succssful", "Success", 5000);
            //console.log(deleteTP.data.data);
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

    // Update
    onUpdate = (id) => {
        //     console.log(id);
        this.props.history.push('/dashboard/update-tp', id);
    }









    renderTableData() {
        try {
            return this.state.allTP.map((tp, index) => {
                const { id, channelCode, ekycType, maxLimit, minLimit, productCategoryCode, status } = tp //destructuring
                return (
                    <tr key={id}>

                        <td>{EkycType(ekycType)}</td>
                        <td>{ProductCategoryType(productCategoryCode)}</td>
                        <td>{channelCode}</td>
                        <td>{minLimit}</td>
                        <td>{maxLimit}</td>
                        <td>{ResourceStatus(status)}</td>




                        {/* Details Button  */}

                        <td>
                            <div
                                type='button'
                                className="sbtn"
                                onClick={() => this.onDetails(id)}
                                data-toggle='modal'
                                data-target='#myModal'

                            >
                                Details
        </div>
                            <div className='modal' id='myModal'>
                                <div className='modal-dialog '>
                                    <div className='modal-content divBg'>
                                        <div className='modal-header divBg'>
                                            <p className='modal-title'>Transaction Profile Details</p>
                                            <button
                                                type='button'
                                                className='close'
                                                data-dismiss='modal'
                                            >
                                                &times;
                </button>
                                        </div>

                                        {
                                            this.state.details.map((tpDetails, index) => (
                                                <div className="imTwoWhite" style={{ textAlign: "left", paddingLeft: "20px" }} key={tpDetails.id}>
                                                    <p style={{ color: "green" }}>Ekyc Type: <span style={{ color: "#e3174c" }}>{EkycType(tpDetails.ekycType)}</span></p>
                                                    <p style={{ color: "green" }}> ProductCategoryCode: <span style={{ color: "#e3174c" }}>{ProductCategoryType(tpDetails.productCategoryCode)}</span></p>
                                                    <p style={{ color: "green" }}> Channel Code: <span style={{ color: "#e3174c" }}>{tpDetails.channelCode}</span></p>
                                                    <p style={{ color: "green" }}>Low Limit: <span style={{ color: "#e3174c" }}>{tpDetails.minLimit}</span></p>
                                                    <p style={{ color: "green" }}>High Limit: <span style={{ color: "#e3174c" }}>{tpDetails.maxLimit}</span></p>
                                                    <p style={{ color: "green" }}>Status: <span style={{ color: "#e3174c" }}>{ResourceStatus(tpDetails.status)}</span></p>
                                                    <p style={{ color: "green" }}>Created By: <span style={{ color: "#e3174c" }}>{tpDetails.createdBy}</span></p>
                                                    <p style={{ color: "green" }}>Created Date: <span style={{ color: "#e3174c" }}>{tpDetails.createDate}</span></p>


                                                </div>
                                            ))
                                        }


                                        <div className='modal-footer'></div>
                                    </div>
                                </div>
                            </div>
                        </td>


                        {/* Action Button  */}
                        <td>
                            <div className="d-flex">
                                {this.state.featureTest.includes('4.2.3') === true ?
                                    <div className="sbtn" onClick={() => this.onUpdate(id)}>Update</div>
                                    :
                                    ""
                                }
                            &nbsp;
                           {this.state.featureTest.includes('4.2.4') === true ?
                                    <div className="sbtnx" onClick={() => window.confirm("Are you sure you want to delete this TP ?") && this.onDelete(id)}>Delete</div>
                                    :
                                    ""
                                }
                    &nbsp;


                    </div>
                        </td>
                    </tr>

                )
            })
        } catch (err) {

        }
    }



    render() {
        return (
            <div>
                <div className="im">
                    <h5 className="text-muted text-center pt-2">
                        <i class="fas fa-list-ul"></i> Transaction List
                        </h5>
                </div>
                <table id='data' style={{ fontSize: '11pt' }}>
                    <thead>
                        <tr>
                            <th>Ekyc Type</th>
                            <th>Category Code</th>
                            <th>Channel Code</th>
                            <th>Low Limit</th>
                            <th>High Limit</th>
                            <th>Status</th>
                            <th>Details</th>
                            <th>Action</th>


                        </tr>
                    </thead>
                    <tbody>{this.renderTableData()}</tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(TPList);
