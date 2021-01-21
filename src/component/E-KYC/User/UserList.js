import React, { Component } from 'react';
import '../../E-KYC/Simplified/utils/Common.css';
import { getAllUser, getUserWithStatus, searchUser, userDeleteAPI, getProfile } from '../Url/ApiList';
import { RoleAndUserStatus } from '../../Utils/fullFormConversion';
import axios from 'axios';
import Pagination from '../../Reusable/Pagination';
import { withRouter } from 'react-router-dom';
import { image } from '../Profile/damiImage'
import NidThree from '../Simplified/images/man.svg';
import { NotificationManager } from "react-notifications";
import ReactTooltip from 'react-tooltip';
import {
    FaEdit,
    FaBatteryThreeQuarters, FaMizuni, FaPenNib,
    FaDigitalTachograph, FaArchive, FaBinoculars,
    FaSearch, FaListUl, FaSortNumericUp,
    FaElementor, FaUserShield, FaUserTag, FaUserEdit,
    FaCalendarCheck, FaCalendarAlt, FaMicroblog, FaPenAlt, FaCalendarDay
} from "react-icons/fa";

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
        searchValue: '',
        radioValue: "",

        searchFlag: false,
        profileImage: {},
        profileName: "",
        flag: 'data:image/jpeg;base64,',
        deleteToggle: false,
        featureTest: JSON.parse(sessionStorage.getItem('featureList')) ? JSON.parse(sessionStorage.getItem('featureList')) : []
    }

    async componentDidMount() {
        const { pages } = this.state;
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }

        };

        try {
            // API called name getAllUser here no status need... page used for pagination
            let appUser = await axios.post(getAllUser + pages, null, config);
            //console.log("getAllUser", appUser.data.data);
            let divide1 = appUser.data.data;
            let numberOfPages = divide1.totalPages;
            let numberOfUsers = divide1.totalUsers;
            let divide2 = divide1.users;
            let currPage = divide1.currentPage;



            let res = await axios.get(getProfile, config);
            let profileData = res.data.data;
            //console.log("profileData", profileData.userImage)

            this.setState({
                pages: currPage,
                totalPages: numberOfPages,
                totalUsers: numberOfUsers,
                allAppUser: divide2,
                profileImage: profileData.userImage === null ? image.data : profileData.userImage.data,
                profileName: profileData.name
            });
        } catch (error) {
            console.log("error", error.response);
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



    textHandleChange = e => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value });
    }

    searchValueChange = (e) => {

        this.setState({
            radioValue: e.target.value
        })
    }

    // Submit Search button
    onSearchSubmit = async (e) => {
        e.preventDefault();
        let { radioValue } = this.state
        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };
        let { searchValue } = this.state
        // console.log("checkboxvalue", this.state.checkBoxValue);
        //console.log("searchValue", searchValue);
        if (radioValue === "id") {



            try {
                let obj = {
                    userId: searchValue
                }

                let res = await axios.post(searchUser + 1, obj, config);
                this.setState({
                    allAppUser: res.data.data,
                    searchValue: "",

                })

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
        if (radioValue === "status") {
            try {
                let obj = {
                    status: searchValue
                }

                let res = await axios.post(searchUser + 1, obj, config);
                this.setState({
                    allAppUser: res.data.data,
                    searchValue: "",

                })

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
        if (radioValue === "mobile") {
            try {
                let obj = {
                    mobile: searchValue
                }

                let res = await axios.post(searchUser + 1, obj, config);
                this.setState({
                    allAppUser: res.data.data,
                    searchValue: "",

                })

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
            this.setState({ text_input: '' });
        } else {
            console.log('Invalid Page No.');
            //alert('Invalid Page No.');
            let invalidMessage = 'Invalid Page No.';
            NotificationManager.warning(invalidMessage, "Warning", 5000);
            this.setState({ text_input: "", goButton: false });
        }

    }

    increment = () => {
        const { totalPages } = this.state;
        let nextPage = this.state.pages + 1;
        this.setState({ pages: nextPage })
        //console.log(nextPage);
        if (nextPage > 0 && nextPage <= totalPages) {
            this.pageChanges(nextPage);
        } else {
            //console.log('Page out of bound');
            let pageOutBoundMessage = 'Page out of bound';
            NotificationManager.warning(pageOutBoundMessage, "Warning", 5000);

        }
    }

    //=================================Decrement function=======================================
    decrement = () => {
        const { totalPages } = this.state;

        let nextPage = this.state.pages - 1;
        this.setState({ pages: nextPage })
        // console.log(nextPage);
        if (nextPage > 0 && nextPage <= totalPages) {
            this.pageChanges(nextPage);
        } else {
            //console.log('Page out of bound');
            //alert('Page out of bound');
            let pageOutBoundMessage = 'Page out of bound';
            NotificationManager.warning(pageOutBoundMessage, "Warning", 5000);

        }
    }


    pageChanges = async (newPage) => {
        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };
        try {
            let paginationUser = await axios.post(getAllUser + newPage, "", config);
            // console.log("pagination pages", paginationUser.data.data);
            let paginUser = paginationUser.data.data;
            let numPages = paginUser.totalPages;
            let numUsers = paginUser.totalUsers;
            let approveNew = paginUser.users;
            this.setState({ totalPages: numPages, pages: paginUser.currentPage, totalUsers: numUsers, allAppUser: approveNew });

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





    // =====================================Pagination====================================================

    onDetails = async (id) => {
        const detailsObj = { id };
        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };

        try {
            let detailsUser = await axios.post(getUserWithStatus + 1, detailsObj, config);
            let pendingDetails = detailsUser.data.data;
            //console.log("pendingDetails", pendingDetails)
            //console.log("pendingDetails", pendingDetails.map(v=>v.roles.map(c=>c.grantedIPList === null)))
            this.setState({ details: pendingDetails });
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

    // Update user 
    onUpdate = (id) => {
        //     console.log(id);
        this.props.history.push('/dashboard/user-update', id);
    }

    // Delete User
    onDelete = async (id) => {
        // console.log("Delete", id);
        const deleteObj = { id, status: "D" };
        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };

        try {
            let delUser = await axios.put(userDeleteAPI, deleteObj, config);
            this.setState({
                deleteToggle: !this.state.deleteToggle
            })
            //console.log(delUser.data);
            // let statusCode = delUser.data.statusCode;
            let delMessage = "Delete " + delUser.data.message;
            //alert(statusCode + ' ' + message);
            NotificationManager.success(delMessage, "Success", 5000);
            this.props.history.push('/dashboard');

        } catch (error) {
            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                //console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Error", 5000);
            }
        }

    }


    //Back button
    onBack = async (e) => {
        const config = {
            headers: {

                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))

            }
        };
        try {
            let bac = await axios.post(getAllUser + this.state.pages, config);
            let backpage = bac.data.data.users;
            this.setState({ allAppUser: backpage, searchFlag: false, search: '' });
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
        let { profileImage, flag, profileName, searchValue } = this.state
        return (
            <div className="container">
                {/* Search bar  */}
                {/* <div className="row d-flex justify-content-center">
                    <div className='form-group col-md-3' style={{ display: "inline", float: "right" }}>

                        <input type="text" value={this.state.search} placeholder="Search by UserId" name="search" autoComplete="off" onChange={this.handleSearch} />
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
                </div> */}

                <div className="d-flex justify-content-center">
                    <div className="card col" style={{ padding: "25px" }}>
                        <div className="im">
                            <h5 className="text-muted text-center pt-2">
                                <i><FaSearch /></i> Search User
                        </h5>
                        </div>
                        <div className="card-body d-flex justify-content-center">
                            <form className="col-sm-8">
                                <ReactTooltip id="searchUser" place="top" backgroundColor='#d7eeee' textColor="green" effect="float">
                                    <span style={{ fontSize: "15px" }}><span style={{ color: "red" }}>*</span> Please select a search option before searching...</span>
                                </ReactTooltip>
                                <div className="form-group " >
                                    <label htmlFor=""></label>
                                    <input data-tip data-for="searchUser" style={{ borderRadius: "50px" }} name="searchValue" value={searchValue} onChange={this.textHandleChange} type="text" className="form-control" placeholder="Search by UserId / Status/ Mobile " />
                                    <small className="text-muted pl-2">
                                        <span style={{ color: "#39c12a", fontSize: "14px" }}>*</span> Chosse any option from below for searching.
                            </small>
                                </div>
                                <div className="form-group d-flex justify-content-center">
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" onChange={this.searchValueChange} name="optionsRadios" id="optionsRadios1" value="id" />
                                            Search By User Id
                                        </label>
                                    </div>&nbsp;&nbsp;&nbsp;
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" onChange={this.searchValueChange} name="optionsRadios" id="optionsRadios1" value="status" />
                                            Search By Status
                                        </label>
                                    </div>&nbsp;&nbsp;&nbsp;
                                    <div class="form-check">
                                        <label class="form-check-label">
                                            <input type="radio" class="form-check-input" onChange={this.searchValueChange} name="optionsRadios" id="optionsRadios1" value="mobile" />
                                            Search By Mobile
                                        </label>
                                    </div>

                                </div>
                                <div className="d-flex justify-content-center pt-2" >
                                    <button onClick={(e) => this.onSearchSubmit(e)} className="b" ><i><FaSearch /></i> Search</button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>





                <div className='row d-flex justify-content-center'>
                    {/* Start Content*/}





                    <div className="card col-sm-12 mt-3">
                        <div className="im">
                            <h5 className="text-muted text-center pt-2">
                                <i class="fas fa-list-ul"><FaListUl /></i> User List
                        </h5>
                        </div>

                        <div className="card-body">
                            <div className="row d-flex justify-content-center">
                                {
                                    this.state.allAppUser.map((user, index) => (

                                        <div key={index} className="col-sm-3 mr-2 divBgCard" style={{ color: "#333", padding: "15px" }}>
                                            <div className="text-center im">
                                                <small className="text-muted"><i className="fas fa-sort-numeric-up"><FaSortNumericUp /></i> User ID : <span style={{ color: "green" }}>{user.userId}</span></small>
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
                                                <small className="text-muted"><i className="fas fa-battery-three-quarters"><FaBatteryThreeQuarters /></i> Status : <span>{`${user.status} (${RoleAndUserStatus(user.status)})`}</span></small>
                                            </div>

                                            <div>
                                                <small className="text-muted"><i className="fas fa-pen-nib"><FaPenAlt /></i> Channel Name : <span>{user.channelCode}</span></small>
                                            </div>

                                            <div>
                                                <small className="text-muted"><i className="fas fa-pen-nib"><FaPenNib /></i> Name : <span>{user.name}</span></small>
                                            </div>

                                            <div>
                                                <small className="text-muted"><i className="fab fa-mizuni"><FaMizuni /></i> Mobile : <span>{user.mobile}</span></small>
                                            </div>
                                            {/* <div>
                                                <small className="text-muted"><i className="fas fa-digital-tachograph"></i> Role Name : <span>{user.roles.map((v, i) => v.roleName + ',')}</span></small>
                                            </div> */}
                                            <hr />

                                            <div className="d-flex justify-content-center mt-2">
                                                <ReactTooltip id="arc" place="top" type="warning" effect="float">
                                                    <span style={{ fontSize: "15px" }}> Warning..! User will be deleted permanently.</span>
                                                </ReactTooltip>
                                                {this.state.featureTest.includes('2.3') === true ?
                                                    <span className="sbtn mr-2" onClick={() => this.onUpdate(user.userId)} ><i class="far fa-edit"><FaEdit /></i> Update</span>
                                                    :
                                                    ""
                                                }

                                                {this.state.featureTest.includes('2.6') === true ?
                                                    <span data-tip data-for="arc" className="sbtnx mr-2" onClick={() => window.confirm("Are you sure you want to archive the User?") && this.onDelete(user.id)} ><i class="fas fa-archive"><FaArchive /></i> Archive</span>
                                                    :
                                                    ""
                                                }
                                                <span className="sbtnxy" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => this.onDetails(user.id)}  ><i class="fas fa-binoculars"><FaBinoculars /></i> Details</span>
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
                                                                        <small className="text-muted"><i className="fas fa-sort-numeric-up"><FaSortNumericUp /></i> ID : <span>{val.userId}</span></small>
                                                                    </div>

                                                                    <div>
                                                                        <small className="text-muted"><i className="fas fa-battery-three-quarters"><FaBatteryThreeQuarters /></i> Status : <span>{RoleAndUserStatus(val.status)}</span></small>
                                                                    </div>

                                                                    <div>
                                                                        <small className="text-muted"><i className="fab fa-mizuni"><FaMizuni /></i> Channel Name : <span>{val.channelCode}</span></small>
                                                                    </div>

                                                                    <div>
                                                                        <small className="text-muted"><i className="fab fa-mizuni"><FaPenNib /></i> Role Name : <span>{val.roles.map((v, i) => v.roleName + ',')}</span></small>
                                                                    </div>
                                                                    <div>
                                                                        <small className="text-muted"><i className="fab fa-mizuni"><FaMicroblog /></i> Email : <span>{val.email}</span></small>
                                                                    </div>
                                                                    <hr />
                                                                    <div>
                                                                        <small className="text-muted"><i className="fas fa-pen-nib"><FaPenAlt /></i> Description : <span>{val.roles.map((v, i) => v.description)}</span></small>
                                                                    </div>

                                                                    <div>
                                                                        <small className="text-muted"><i className="fas fa-digital-tachograph"><FaDigitalTachograph /></i> IP List : <span>{val.roles.map((v, i) => v.grantedIPList === null ? "" : v.grantedIPList.map(ip => ip))}</span></small>
                                                                    </div>

                                                                    <div>
                                                                        <small className="text-muted"><i className="fab fa-elementor"><FaElementor /></i> Features : <span>{val.roles.map(v => v.rolePrivileges.map(r => r[1] + ", "))}</span></small>
                                                                    </div>
                                                                    <hr />
                                                                    <div>
                                                                        <small className="text-muted"><i className="fas fa-user-shield"><FaUserShield /></i> Created By : <span>{val.createdBy}</span></small>
                                                                    </div>
                                                                    <div>
                                                                        <small className="text-muted"><i className="fas fa-user-tag"><FaUserTag /></i> Approved By : <span>{val.approvedBy}</span></small>
                                                                    </div>
                                                                    <div>
                                                                        <small className="text-muted"><i className="fas fa-user-edit"><FaUserEdit /></i> Updated By : <span>{val.updatedBy}</span></small>
                                                                    </div>

                                                                    <div>
                                                                        <small className="text-muted"><i className="fas fa-calendar-check"><FaCalendarCheck /></i> Created Date : <span>{val.createDate}</span></small>
                                                                    </div>

                                                                    <div>
                                                                        <small className="text-muted"><i className="far fa-calendar-alt"><FaCalendarAlt /></i> Approved Date : <span>{val.approveDate}</span></small>
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
