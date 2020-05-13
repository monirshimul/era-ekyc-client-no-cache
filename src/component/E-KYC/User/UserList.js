import React, { Component } from 'react';
import '../../E-KYC/Simplified/utils/Common.css';
import { getAllUser, getUserWithStatus, searchUser, userDeleteAPI } from '../Url/ApiList';
import axios from 'axios';
import Pagination from '../../Reusable/Pagination';
import { withRouter } from 'react-router-dom';


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
    }

    async componentDidMount() {
        const { pages } = this.state;

        try {
            // API called name getAllUser here no status need... page used for pagination
            let appUser = await axios.post(getAllUser + pages);
            // console.log("getAllUser",appUser.data.data);
            let divide1 = appUser.data.data;
            let numberOfPages = divide1.totalPages;
            let numberOfUsers = divide1.totalUsers;
            let divide2 = divide1.users;
            this.setState({ totalPages: numberOfPages, totalUsers: numberOfUsers, allAppUser: divide2 });
        } catch (err) {
            console.log(err.response);
        }
    }


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
            this.setState({ allAppUser: searchFilter, searchFlag: true,search:'' });
        } catch (err) {
           // console.log(err.response.data);
            let error = err.response.data;
            let statusCode = error.statusCode;
            let message = "Wrong Search"
            alert(statusCode + ' ' + message);
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
            alert('Invalid Page No.');
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
            alert('Page out of bound');

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
            alert('Page out of bound');

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
            console.log(delUser.data);
            let statusCode = delUser.data.statusCode;
            let message = "Delete "+ delUser.data.message;
            alert(statusCode + ' ' + message);
            
        } catch (err) {
            console.log(err.response);
        }

    }


    //Back button
    onBack = async(e) =>{
        try{
        let bac = await axios.post(getAllUser + this.state.pages);
        let backpage = bac.data.data.users;
        this.setState({allAppUser: backpage, searchFlag: false, search:''});
        }catch(err){
            console.log(err.response);
        }
    }


    renderTableData() {
        try{
        return this.state.allAppUser.map((user, index) => {
            const { id, userId, name, mobile, email, status, roles } = user //destructuring
            return (
                <tr key={id}>

                    <td>{userId}</td>
                    <td>{name}</td>
                    <td>{mobile}</td>
                    <td>{email}</td>
                    <td>{status}</td>


                    {/* Show Role Name */}
                    <td>
                        {roles.map((val, i) => (

                            roles[i].roleName + '  '
                        ))}
                    </td>



                    {/* Show Role Previleges */}
                    <td>
                        {roles.map((val, i) => {
                            const a = roles[i].rolePrivileges;
                            const preArr = [];
                            for (let i = 0; i < a.length; i++) {

                                preArr.push(a[i][1] + " , ")
                            }
                            return preArr
                        })}
                    </td>



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
                                        <h4 className='modal-title'>User Details</h4>
                                        <button
                                            type='button'
                                            className='close'
                                            data-dismiss='modal'
                                        >
                                            &times;
                    </button>
                                    </div>

                                    {this.state.details.map((user, index) => (
                                        <div key={user.id}>
                                            <p>User Id:{user.userId}</p>
                                            <p> Name:{user.name}</p>
                                            <p> Mobile:{user.mobile}</p>
                                            <p>Email:{user.email}</p>
                                            <p> RoleName:
                      {roles.map((val, i) => (

                                                roles[i].roleName + '  '
                                            ))}
                                            </p>
                                            <p> Role Previleges:
                        {roles.map((val, i) => {
                                                const a = roles[i].rolePrivileges;
                                                const preArr = [];
                                                for (let i = 0; i < a.length; i++) {

                                                    preArr.push(a[i][1] + " , ")
                                                }
                                                return preArr
                                            })}
                                            </p>
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
                            <span className="sbtn" onClick={() => this.onUpdate(userId)}>Update</span>&nbsp;
                            <span className="sbtnx" onClick={() => this.onDelete(id)}>Delete</span>&nbsp;
                        </div>
                    </td>
                </tr>

            )
        })
    }catch(err){

    }
    }



    render() {
        return (
            <div >
                {/* Search bar  */}
               
                    <div className='form-group col-md-3' style={{ display: "inline", float: "right" }}>

                        <input type="text" value={this.state.search} placeholder="Search.." name="search" autoComplete="off" onChange={this.handleSearch} />
                        <button onClick={this.submitSearch} type="submit"><i className="fa fa-search"></i></button>
                   

                </div>
                {
                    this.state.searchFlag? 
                    <div>
                        <button className="btn btn-primary" onClick={this.onBack}><i class="fas fa-arrow-alt-circle-left"></i> Back</button>
                    </div>
                    :
                    ""
                }
                <br />


                <h3 className="text-center pt-3 ">User List</h3>
                <div className='row '>
                    {/* Start Content*/}

                    <table id='data' style={{ fontSize: '11pt' }}>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Role Name</th>
                                <th>Privileges Role</th>
                                <th>Details</th>
                                <th>Action</th>


                            </tr>
                        </thead>
                        <tbody>{this.renderTableData()}</tbody>
                    </table>

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
