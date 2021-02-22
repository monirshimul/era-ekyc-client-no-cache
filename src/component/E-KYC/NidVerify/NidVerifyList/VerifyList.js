import React, { Component } from 'react';
import Loading from "../../Simplified/utils/CustomLoding/Loading";
import { NidVerifyList } from '../../Url/ApiList';
import { NotificationManager } from "react-notifications";
import axios from 'axios';
import { showDate } from '../../../Utils/dateConversion';
import { largeTime } from '../../../Utils/notificationTime';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Pagination from './../../../Reusable/Pagination';

class VerifyList extends Component {

    state = {
        page: 1,
        verifyList: [],
        totalPages: "",
        totalNidVerification: "",
        text_input: "",
        goButton: false,
    }



    async componentDidMount() {
        let config = {
            headers: {
                "x-auth-token": JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };


        try {

            let verifyList = await axios.post(NidVerifyList + this.state.page, null, config);
            let verifyListRes = verifyList.data.data;
            this.setState({
                verifyList: verifyListRes.nidVerificaion,
                totalPages: verifyListRes.totalPages,
                totalNidVerification: verifyListRes.totalNidVerification
            });

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

    onDetails = (nid) => {
        // console.log("details", nid);
        this.props.history.push('/dashboard/nid-details', nid);
    }


    // ===========================Pagination=====================================================
    handlePage = (e) => {
        if (e.target.value !== "") {
            this.setState({
                text_input: e.target.value,
                goButton: true,
            });
        } else {
            this.setState({
                text_input: e.target.value,
                goButton: false,
            });
        }
    };

    handleGoInput = (e) => {
        e.preventDefault();
        const { totalPages, text_input } = this.state;
        let pageReq = "";
        if (text_input !== "" && text_input > 0 && text_input <= totalPages) {
            pageReq = text_input;
            this.setState({ page: pageReq });
            this.pageChanges(pageReq);
            this.setState({ text_input: '' });
        } else {
            console.log("Invalid Page No.");
            //alert('Invalid Page No.');
            let invalidMessage = "Invalid Page No.";
            NotificationManager.warning(invalidMessage, "Warning", 5000);
            this.setState({ text_input: "", goButton: false });
        }
    };

    increment = () => {
        const { totalPages } = this.state;
        let nextPage = this.state.page + 1;
        this.setState({ page: nextPage });
        //console.log(nextPage);
        if (nextPage > 0 && nextPage <= totalPages) {
            this.pageChanges(nextPage);
        } else {
            //console.log('Page out of bound');
            let pageOutBoundMessage = "Page out of bound";
            NotificationManager.warning(pageOutBoundMessage, "Warning", 5000);
        }
    };

    //=================================Decrement function=======================================
    decrement = () => {
        const { totalPages } = this.state;

        let nextPage = this.state.page - 1;
        this.setState({ page: nextPage });
        // console.log(nextPage);
        if (nextPage > 0 && nextPage <= totalPages) {
            this.pageChanges(nextPage);
        } else {
            //console.log('Page out of bound');
            //alert('Page out of bound');
            let pageOutBoundMessage = "Page out of bound";
            NotificationManager.warning(pageOutBoundMessage, "Warning", 5000);
        }
    };

    pageChanges = async (newPage) => {
        const config = {
            headers: {
                "x-auth-token": JSON.parse(sessionStorage.getItem("x-auth-token")),
            },
        };

        try {
            let paginationNidVerification = await axios.post(NidVerifyList + newPage, null, config)
            console.log("paginationNidVerification pages", paginationNidVerification.data.data);
            //   this.setState({ totalPages: paginationUser.data.data});
            let paginUser = paginationNidVerification.data.data;
            this.setState({
                page: paginUser.currentPage,
                totalPages: paginUser.totalPages,
                totalNidVerification: paginUser.totalNidVerification,
                verifyList: paginUser.nidVerificaion,
            });
        } catch (error) {
            if (error.response) {
                let message = error.response.data.message;
                //console.log("Error",error.response)
                NotificationManager.error(message, "Click TO Remove", largeTime);
            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error(
                    "Error Connecting...",
                    "Click TO Remove",
                    largeTime
                );
            } else if (error) {
                NotificationManager.error(
                    error.toString(),
                    "Click TO Remove",
                    largeTime
                );
            }
        }
    };





    render() {
        const { verifyList } = this.state

        return (
            <div className="container ">
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-10">




                        <TableContainer component={Paper}>
                            <Table className="imTwoWhite" aria-label="simple table">
                                <TableHead className="imTwoWhite">
                                    <TableRow>
                                        <TableCell align="center">ID</TableCell>
                                        <TableCell align="center">NID</TableCell>

                                        <TableCell align="center">CREATED BY</TableCell>
                                        <TableCell align="center">CREATED DATE</TableCell>
                                        <TableCell align="center">SEE DETAILS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {verifyList.map((val) => (
                                        <TableRow key={val.id}>
                                            <TableCell align="center" component="th" scope="val">
                                                {val.id}
                                            </TableCell>
                                            <TableCell className="im" align="center">{val.nid}</TableCell>

                                            <TableCell align="center">{val.createdBy}</TableCell>
                                            <TableCell className="im" align="center">{new Date(val.createDate).toLocaleString()}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    className="imTwoWhite"
                                                    variant="contained"
                                                    style={{ color: "green", outline: "none", borderRadius: "10px" }}
                                                    onClick={() => this.onDetails(val.nid)}
                                                >Details</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>



                        {
                            /*
                                <div className="row d-flex justify-content-center pt-2 imTwoWhite">
                            <div className="col-sm-2 im">
                                <h5 style={{ color: "green", fontSize: "16px" }} className="text-center mt-3">ID</h5>
                            </div>
                            <div className="col-sm-2 im">
                                <h5 style={{ color: "green", fontSize: "16px" }} className="text-center mt-3">NID</h5>
                            </div>
                            <div className="col-sm-2 im">
                                <h5 style={{ color: "green", fontSize: "16px" }} className="text-center mt-3">STATUS</h5>
                            </div>
                            <div className="col-sm-2 im">
                                <h5 style={{ color: "green", fontSize: "16px" }} className="text-center mt-3">CREATED BY</h5>
                            </div>
                            <div className="col-sm-4 im">
                                <h5 style={{ color: "green", fontSize: "16px" }} className="text-center mt-3">CREATED DATE</h5>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center im mt-1">
                            {
                                verifyList.map(val => (
                                    <Fragment>
                                        <div className="col-sm-2 imTwoWhite">
                                            <h5 className="text-center im">{val.id}</h5>
                                        </div>
                                        <div className="col-sm-2 imTwoWhite">
                                            <h5 style={{ color: "green", fontSize: "14px" }} className="text-center ">{val.nid}</h5>
                                        </div>
                                        <div className="col-sm-2 imTwoWhite">
                                            <h5 style={{ color: "#4e8d7c", fontSize: "14px" }} className="text-center ">{val.createdBy}</h5>
                                        </div>
                                        <div className="col-sm-4 imTwoWhite">
                                            <h5 style={{ color: "#59886b", fontSize: "14px" }} className="text-center ">{val.createDate}</h5>
                                        </div>
                                        <div className="col-sm-2 imTwoWhite">
                                            <h5 className="text-center ">Button</h5>
                                        </div>
                                    </Fragment>
                                ))
                            }
                        </div>
                            */
                        }
                    </div>
                </div>

                {/* pagination added*/}

                {this.state.totalPages > 1 ? (
                    <Pagination
                        increment={this.increment}
                        decrement={this.decrement}
                        page={this.state.page}
                        total_pages={this.state.totalPages}
                        onInputChange={this.handlePage}
                        text_input={this.state.text_input}
                        goButton={this.state.goButton}
                        handleGo={this.handleGoInput}
                    />
                ) : (
                        <div>
                            <br />
                            <br />
                            <br />
                            <p style={{ textAlign: "center" }}>
                                {" "}
                                <strong>
                                    {" "}
                        page No: {this.state.page + "/" + this.state.totalPages}
                                </strong>{" "}
                            </p>
                        </div>
                    )}
            </div>
        )
    }
}

export default withRouter(VerifyList);
