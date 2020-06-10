import React, { Component } from 'react';
import '../../E-KYC/Simplified/utils/Common.css';
import { getAllUser, getUserWithStatus, searchUser, userDeleteAPI, getProfile } from '../Url/ApiList';
import axios from 'axios';
import Pagination from '../../Reusable/Pagination';
import { withRouter } from 'react-router-dom';
import { image } from '../Profile/damiImage'
import NidThree from '../Simplified/images/nid-f4.svg';
import { NotificationManager } from "react-notifications";

export class UserList extends Component {
    state = {
        allAppUser: [],
        details: [],
        pages: 1,
        totalPages: '',
        totalUsers: '',
        text_input: "",
        goButton: false,
        searchHeading: "",
        search: '',
        searchFlag: false,
        profileImage: {},
        profileName: "",
        flag: 'data:image/jpeg;base64,',
        deleteToggle: false
    }

    async componentDidMount() {
        const { pages } = this.state;
        const token = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }

        };

        try {
            // API called name getAllUser here no status need... page used for pagination
            let appUser = await axios.post(getAllUser + pages);
            console.log("getAllUser", appUser.data.data);
            let divide1 = appUser.data.data;
            let numberOfPages = divide1.totalPages;
            let numberOfUsers = divide1.totalUsers;
            let divide2 = divide1.users;


            let res = await axios.get(getProfile, token);
            let profileData = res.data.data;
            //console.log("profileData", profileData.userImage)

            this.setState({
                totalPages: numberOfPages,
                totalUsers: numberOfUsers,
                allAppUser: divide2,
                profileImage: profileData.userImage === null ? image.data : profileData.userImage.data,
                profileName: profileData.name
            });
        } catch (err) {
            console.log(err.response.data);
        }
    }


    // async componentDidUpdate(prevProps, prevState){
    //     const { pages } = this.state;
    //     const token = {
    //         headers: {
    //             'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
    //         }

    //     };
        
    //     if (prevState.deleteToggle !== this.state.deleteToggle) {
    //         try {
    //             // API called name getAllUser here no status need... page used for pagination
    //             let appUser = await axios.post(getAllUser + pages);
    //             console.log("getAllUser", appUser.data.data);
    //             let divide1 = appUser.data.data;
    //             let numberOfPages = divide1.totalPages;
    //             let numberOfUsers = divide1.totalUsers;
    //             let divide2 = divide1.users;
    
    
    //             let res = await axios.get(getProfile, token);
    //             let profileData = res.data.data;
    //             //console.log("profileData", profileData.userImage)
    
    //             this.setState({
    //                 totalPages: numberOfPages,
    //                 totalUsers: numberOfUsers,
    //                 allAppUser: divide2,
    //                 profileImage: profileData.userImage === null ? image.data : profileData.userImage.data,
    //                 profileName: profileData.name
    //             });
    //         } catch (err) {
    //             console.log(err.response.data);
    //         }  
    
    //     }
    //     else {
    //         return false
    //     }
    // }

    //Search bar handler
    handleSearch = (e) => this.setState({ search: e.target.value });

    // Submit Search button
    submitSearch = async (e) => {
        e.preventDefault();
        const obj = { userId: this.state.search };

        try {
            let searchAttemp = await axios.post(searchUser + 1, obj);
            // console.log('searchAttempt', searchAttemp.data.data);
            let searchFilter = searchAttemp.data.data;
            this.setState({ allAppUser: searchFilter, searchFlag: true, search: '' });
        } catch (err) {
            // console.log(err.response.data);
            let error = err.response.data;
            let statusCode = error.statusCode;
            let message = "Wrong Search"
            //alert(statusCode + ' ' + message);
            this.setState({search:''});
            NotificationManager.error(message, "Error", 5000);
        }



    }

    // ===========================Pagination=====================================================
    handlePage = (e) => {
        if (e.target.value !== "") {
            this.setState({
                text_input: e.target.value,
                goButton: true,
            })
        } else {
            this.setState({
                text_input: e.target.value,
                goButton: false
            })
        }
    }

    handleGoInput = (e) => {
        e.preventDefault();
        const { totalPages, text_input } = this.state;
        let pageReq = "";
        if (text_input !== "" && text_input > 0 && text_input <= totalPages) {
            pageReq = text_input;
            this.setState({ pages: pageReq });
            this.pageChanges(pageReq);
        } else {
            console.log('Invalid Page No.');
            //alert('Invalid Page No.');
            let invalidMessage = 'Invalid Page No.';
            NotificationManager.warning(invalidMessage, "Warning", 5000);
            this.setState({ text_input: "", goButton: false });
        }

    }

    increment = () => {
        const { pages, totalPages } = this.state;
        let nextPage = this.state.pages + 1;
        this.setState({ pages: nextPage })
        console.log(nextPage);
        if (nextPage > 0 && nextPage <= totalPages) {
            this.pageChanges(nextPage);
        } else {
            console.log('Page out of bound');
            let pageOutBoundMessage = 'Page out of bound';
            NotificationManager.warning(pageOutBoundMessage, "Warning", 5000);

        }
    }

    //=================================Decrement function=======================================
    decrement = () => {
        const { pages, totalPages } = this.state;

        let nextPage = this.state.pages - 1;
        this.setState({ pages: nextPage })
        console.log(nextPage);
        if (nextPage > 0 && nextPage <= totalPages) {
            this.pageChanges(nextPage);
        } else {
            console.log('Page out of bound');
            //alert('Page out of bound');
            let pageOutBoundMessage = 'Page out of bound';
            NotificationManager.warning(pageOutBoundMessage, "Warning", 5000);

        }
    }


    pageChanges = async (newPage) => {
        try {
            let paginationUser = await axios.post(getAllUser + newPage);
            console.log("pagination pages", paginationUser.data.data.users);
            let paginUser = paginationUser.data.data;
            let numPages = paginUser.totalPages;
            let numUsers = paginUser.totalUsers;
            let approveNew = paginUser.users;
            this.setState({ totalPages: numPages, totalUsers: numUsers, allAppUser: approveNew });

        } catch (err) {
            console.log(err.response);
        }


    }





    // =====================================Pagination====================================================

    onDetails = async (id) => {
        const detailsObj = { id };

        try {
            let detailsUser = await axios.post(getUserWithStatus + 1, detailsObj);
            let pendingDetails = detailsUser.data.data;
            console.log("pendingDetails", pendingDetails)
            this.setState({ details: pendingDetails });
        } catch (e) {
            console.log(e.response);
        }

    }

    // Update user 
    onUpdate = (id) => {
        //     console.log(id);
        this.props.history.push('/dashboard/user-update', id);
    }

    // Delete User
    onDelete = async (id) => {
        console.log("Delete", id);
        const deleteObj = { id, status: "D" };

        try {
            let delUser = await axios.put(userDeleteAPI, deleteObj);
            this.setState({
                deleteToggle:!this.state.deleteToggle
            })
            console.log(delUser.data);
            let statusCode = delUser.data.statusCode;
            let delMessage = "Delete " + delUser.data.message;
            //alert(statusCode + ' ' + message);
            NotificationManager.success(delMessage, "Success", 5000);

        } catch (err) {
            console.log(err.response);
        }

    }


    //Back button
    onBack = async (e) => {
        try {
            let bac = await axios.post(getAllUser + this.state.pages);
            let backpage = bac.data.data.users;
            this.setState({ allAppUser: backpage, searchFlag: false, search: '' });
        } catch (err) {
            console.log(err.response);
        }
    }






    render() {
        let { profileImage, flag, profileName } = this.state
        return (
            <div className="container">
                {/* Search bar  */}
                <div className="row d-flex justify-content-center">
                <div className='form-group col-md-3' style={{ display: "inline", float: "right" }}>

<input type="text" value={this.state.search} placeholder="Search.." name="search" autoComplete="off" onChange={this.handleSearch} />
<button onClick={this.submitSearch} type="submit"><i className="fa fa-search"></i></button>


</div>
{
this.state.searchFlag ?
    <div>
        <button className="btn btn-primary" onClick={this.onBack}><i class="fas fa-arrow-alt-circle-left"></i> Back</button>
    </div>
    :
    // <h1>Back</h1>
    ""
}
<br />
                </div>

                



                <div className='row d-flex justify-content-center'>
                    {/* Start Content*/}





                    <div className="card col-sm-12 mt-3">
                        <div className="im">
                            <h5 className="text-muted text-center pt-2">
                                <i class="fas fa-list-ul"></i> User List
                        </h5>
                        </div>
                        <div className="card-body">
                            <div className="row d-flex justify-content-center">
                                {
                                    this.state.allAppUser.map((user, index) => (

                                        <div key={index} className="col-sm-3 mr-2 divBgCard" style={{ color: "#333", padding: "15px" }}>
                                            <div className="text-center im">
                                                <small className="text-muted"><i className="fas fa-sort-numeric-up"></i> User ID : <span style={{ color: "green" }}>{user.userId}</span></small>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-center">

                                                {
                                                    profileName === user.name ? (
                                                        <img
                                                            src={flag + profileImage}
                                                            style={{
                                                                margin: "auto",
                                                                cursor: "pointer",
                                                                width: "80px",
                                                                height: "80px",
                                                                borderRadius: "50px"
                                                            }}
                                                            className="img-fluid img-thumbnail"
                                                            id="FrontNidPic"
                                                            alt=""
                                                        />
                                                    ) : (
                                                            <img
                                                                src={NidThree}
                                                                style={{
                                                                    margin: "auto",
                                                                    cursor: "pointer",
                                                                    width: "80px",
                                                                    height: "80px",
                                                                    borderRadius: "50px"
                                                                }}
                                                                className="img-fluid img-thumbnail"
                                                                id="FrontNidPic"
                                                                alt=""
                                                            />
                                                        )
                                                }


                                            </div>


                                            <div>
                                                <small className="text-muted"><i className="fas fa-battery-three-quarters"></i> Status : <span>{user.status}</span></small>
                                            </div>
                                            <div>
                                                <small className="text-muted"><i className="fas fa-pen-nib"></i> Name : <span>{user.name}</span></small>
                                            </div>

                                            <div>
                                                <small className="text-muted"><i className="fab fa-mizuni"></i> Mobile : <span>{user.mobile}</span></small>
                                            </div>
                                            {/* <div>
                                                <small className="text-muted"><i className="fas fa-digital-tachograph"></i> Role Name : <span>{user.roles.map((v, i) => v.roleName + ',')}</span></small>
                                            </div> */}
                                            <hr />

                                            <div className="d-flex justify-content-center mt-2">
                                                <span className="sbtn mr-2" onClick={() => this.onUpdate(user.userId)} ><i class="far fa-edit"></i> Update</span>
                                                <span className="sbtnx mr-2" onClick={() => this.onDelete(user.id)} ><i class="fas fa-archive"></i> Archive</span>
                                                <span className="sbtnxy" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => this.onDetails(user.id)}  ><i class="fas fa-binoculars"></i> Details</span>
                                            </div>



                                            {/* <!-- Modal --> */}
                                            <div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content imTwo">
                                                        <div className="modal-header divBg">
                                                            <h5 className="modal-title" id="exampleModalCenterTitle"><i class="far fa-arrow-alt-circle-right"></i> User Details</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            {this.state.details.map(val => (
                                                                <div className="">
                                                                    <div className="">
                                                                        <small className="text-muted"><i className="fas fa-sort-numeric-up"></i> ID : <span>{val.userId}</span></small>
                                                                    </div>

                                                                    <div>
                                                                        <small className="text-muted"><i className="fas fa-battery-three-quarters"></i> Status : <span>{val.status}</span></small>
                                                                    </div>

                                                                    <div>
                                                                        <small className="text-muted"><i className="fab fa-mizuni"></i> Role Name : <span>{val.roles.map((v, i) => v.roleName + ',')}</span></small>
                                                                    </div>
                                                                    <div>
                                                                        <small className="text-muted"><i className="fab fa-mizuni"></i> Email : <span>{val.email}</span></small>
                                                                    </div>
                                                                    <hr />
                                                                    <div>
                                                                        <small className="text-muted"><i className="fas fa-pen-nib"></i> Description : <span>{val.roles.map((v, i) => v.description)}</span></small>
                                                                    </div>

                                                                    <div>
                                                                        <small className="text-muted"><i className="fas fa-digital-tachograph"></i> IP List : <span>{val.roles.map((v, i) => v.grantedIPList.map(ip => ip))}</span></small>
                                                                    </div>

                                                                    <div>
                                                                        <small className="text-muted"><i className="fab fa-elementor"></i> Features : <span>{val.roles.map(v => v.rolePrivileges.map(r => r[1] + ", "))}</span></small>
                                                                    </div>
                                                                    <hr />
                                                                    <div>
                                                                        <small className="text-muted"><i className="fas fa-user-shield"></i> Created By : <span>{val.createdBy}</span></small>
                                                                    </div>
                                                                    <div>
                                                                        <small className="text-muted"><i className="fas fa-user-tag"></i> Approved By : <span>{val.approvedBy}</span></small>
                                                                    </div>
                                                                    <div>
                                                                        <small className="text-muted"><i className="fas fa-user-edit"></i> Updated By : <span>{val.updatedBy}</span></small>
                                                                    </div>

                                                                    <div>
                                                                        <small className="text-muted"><i className="fas fa-calendar-check"></i> Created Date : <span>{val.createDate}</span></small>
                                                                    </div>

                                                                    <div>
                                                                        <small className="text-muted"><i className="far fa-calendar-alt"></i> Approved Date : <span>{val.approveDate}</span></small>
                                                                    </div>


                                                                    <div>
                                                                        <small className="text-muted"><i className="far fa-calendar-check"></i> Updated Date : <span>{val.updateDate}</span></small>
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

                                        </div>

                                    ))
                                }
                            </div>

                        </div>





                    </div>

                    {/* End Content*/}
                </div>

                {this.state.totalPages > 1 && this.state.searchFlag === false ?
                    (<Pagination
                        //   historyPerPage={this.state.historyPerPage}
                        //   totalHistory={this.state.totalHistory}
                        // increment, decrement, page, total_pages, onInputChange, handleGo, text_input, goButton
                        increment={this.increment}
                        decrement={this.decrement}
                        page={this.state.pages}
                        total_pages={this.state.totalPages}
                        onInputChange={this.handlePage}
                        text_input={this.state.text_input}
                        goButton={this.state.goButton}
                        handleGo={this.handleGoInput}
                    />) :
                    <div>
                        <br /><br /><br />
                        <p style={{ textAlign: 'center' }}> <strong> page No: {this.state.pages + "/" + this.state.totalPages}</strong> </p>
                    </div>
                }


            </div>
        )
    }
}

export default withRouter(UserList);
