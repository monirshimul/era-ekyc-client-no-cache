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

class VerifyList extends Component {

    state = {
        page: 1,
        verifyList: []
    }



    async componentDidMount() {
        let config = {
            headers: {
                "x-auth-token": JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        let pageNum = this.state.page
        console.log(pageNum)
        try {

            let verifyList = await axios.post(NidVerifyList + pageNum, null, config)
            console.log("List", verifyList.data.data.nidVerificaion)
            this.setState({
                verifyList: verifyList.data.data.nidVerificaion
            })

        } catch (error) {

            console.log("Error==========>", error)
            //this.props.handleState('loading', false);
        }



    }




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
                                            <TableCell className="im" align="center">{val.createDate}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    className="imTwoWhite"
                                                    variant="contained"
                                                    style={{ color: "green", outline: "none", borderRadius: "10px" }}>Details</Button>
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
            </div>
        )
    }
}

export default VerifyList
