import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getTPAPI, deleteTPAPI } from '../Url/ApiList';
import { NotificationManager } from "react-notifications";
import axios from 'axios';

export class TPList extends Component {
    state = {
        allTP: [],
        details: [],
        tpReq: false
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

                        <td>{ekycType}</td>
                        <td>{productCategoryCode}</td>
                        <td>{channelCode}</td>
                        <td>{minLimit}</td>
                        <td>{maxLimit}</td>
                        <td>{status}</td>




                        {/* Details Button  */}

                        <td style={{ textAlign: 'center' }}>
                            <span
                                type='button'
                                className="sbtn"
                                onClick={() => this.onDetails(id)}
                                data-toggle='modal'
                                data-target='#myModal'

                            >
                                Details
        </span>
                            <div className='modal' id='myModal'>
                                <div className='modal-dialog'>
                                    <div className='modal-content'>
                                        <div className='modal-header'>
                                            <h4 className='modal-title'>Transaction Profile Details</h4>
                                            <button
                                                type='button'
                                                className='close'
                                                data-dismiss='modal'
                                            >
                                                &times;
                </button>
                                        </div>

                                        {this.state.details.map((tpDetails, index) => (
                                            <div key={tpDetails.id}>
                                                <p>Ekyc Type:{tpDetails.ekycType}</p>
                                                <p> ProductCategoryCode:{tpDetails.productCategoryCode}</p>
                                                <p> Channel Code:{tpDetails.channelCode}</p>
                                                <p>Low Limit:{tpDetails.minLimit}</p>
                                                <p>High Limit:{tpDetails.maxLimit}</p>
                                                <p>Status:{tpDetails.status}</p>
                                                <p>Created By:{tpDetails.createdBy}</p>
                                                <p>Created Date:{tpDetails.createDate}</p>


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
                                <span className="sbtn" onClick={() => this.onUpdate(id)}>Update</span>&nbsp;
                        <span className="sbtnx" onClick={() => this.onDelete(id)}>Delete</span>&nbsp;
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
