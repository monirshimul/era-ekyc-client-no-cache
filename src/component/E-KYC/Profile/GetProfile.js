import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import NidThree from '../Simplified/images/nid-f4.svg';
import { NotificationManager } from "react-notifications";
import { getProfile, imageUpdate, dataUpdate } from '../Url/ApiList'
import { image } from './damiImage';
//import Acordion from '../Acordion/Acordion';
import { largeTime } from '../../Utils/notificationTime';
const Joi = require('@hapi/joi');

export class GetProfile extends Component {

    state = {
        name: '',
        mobile: '',
        email: '',
        pinAuthStatus: false,
        profileData: {},
        profileImage: {},
        profileImageType: '',
        showUpdate: false,
        flag: 'data:image/jpeg;base64,'

    }



    async componentDidMount() {
        //console.log("Image Data", image.data)
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }

        };

        try {
            let res = await axios.get(getProfile, config);
            let profileData = res.data.data;
            //console.log("profileData", profileData)
            this.setState({
                name: profileData.name,
                email: profileData.email,
                mobile: profileData.mobile,
                pinAuthStatus: profileData.pinAuthStatus,
                profileData: profileData,
                profileImage: profileData.userImage === null ? image.data : profileData.userImage.data
            })
            //console.log("this.state.profileData", this.state.profileImage)
            let Obj = {
                name: this.state.profileData.name,
                image: this.state.profileImage
            }
            sessionStorage.setItem("profile", JSON.stringify(Obj))

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



    fileSelectedHandler = (event) => {
        if (event.target.files[0]) {
            let file = event.target.files[0];
            //console.log("Image Type", file.type);
            var reader = new FileReader();
            reader.readAsBinaryString(file);

            reader.onload = () => {
                // console.log(typeof reader.result);
                // console.log(btoa(reader.result));
                let base64Image = btoa(reader.result);
                this.setState({
                    profileImage: base64Image,
                    profileImageType: file.type

                });
                //console.log("ImageData", this.state.profileImage)
                // this.props.handleState("NidFront", base64Image);

                // this.props.handleState("NidFrontType", file.type);
            };
            reader.onerror = () => {
                // console.log("there are some problems");
                NotificationManager.error('File can not be read', "Error", 5000);
            };
        }
    };



    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onChangeStatus = (e) => {
        this.setState({
            pinAuthStatus: e.target.value === "true" ? true : false
        })
    }



    onUpdate = () => {
        this.setState({
            showUpdate: !this.state.showUpdate
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }

        };

        try {

            let imgData = {
                data: this.state.profileImage,
                mimeType: this.state.profileImageType === "" ? "image/jpeg" : this.state.profileImageType
            }
            // console.log("Mime Type", imgData.mimeType)
            let resImage = await axios.put(imageUpdate, imgData, config);
            // console.log("Image Response", resImage)
            localStorage.setItem('profileImage', JSON.stringify(this.state.profileImage))


            let profileData = {

                name: this.state.name,
                email: this.state.email,
                mobile: this.state.mobile,
                pinAuthStatus: this.state.pinAuthStatus

            }
            //console.log("p data", profileData)


            const validationValue = await schema.validateAsync(profileData);
            //console.log("validationValue", validationValue)
            let resProfile = await axios.put(dataUpdate, profileData, config);
            //console.log("Profile Response", resProfile)


            this.setState({
                showUpdate: !this.state.showUpdate
            })

            let res = await axios.get(getProfile, config);
            let profData = res.data.data;
            //console.log("profileData", profileData)
            this.setState({
                name: profData.name,
                email: profData.email,
                mobile: profData.mobile,
                pinAuthStatus: profData.pinAuthStatus,
                profileData: profData,
                profileImage: profData.userImage.data
            })
            let Obj = {
                name: this.state.profileData.name,
                image: this.state.profileImage
            }
            sessionStorage.setItem("profile", JSON.stringify(Obj))


            NotificationManager.success("Profile Updated", "Success", 5000);

        } catch (error) {
            //console.log("Error", error.response)
            if (error.response) {
                let message = error.response.data.message
                //console.log("Error",error.response)
                NotificationManager.error(message, "Error", 5000);
            } else if (error.request) {
                //  console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Error", 5000);
            } else if (error) {
                NotificationManager.error(error.toString(), "Click to Remove", largeTime);
            }
        }
    }

    onBack = e => {
        e.preventDefault();
        this.setState({
            showUpdate: !this.state.showUpdate
        })
    }



    render() {

        let { profileData, flag, showUpdate, profileImage } = this.state
        console.log("State", flag + profileImage)

        return (
            <div className="container">
                {
                    !showUpdate ?
                        (
                            <div className="row d-flex justify-content-center align-items-center">

                                <div className="divBgCard col-sm-6" >
                                    <div className="card-header up">
                                        <h5><i class="fas fa-user-alt"></i> Profile Details</h5>
                                    </div>
                                    <div className="card-body text-muted">
                                        <div className="row d-flex justify-content-around align-items-center">
                                            <div>
                                                <div>
                                                    <img
                                                        src={profileImage ? flag + profileImage : NidThree}
                                                        style={{
                                                            margin: "auto",
                                                            cursor: "pointer",
                                                            width: "150px",
                                                            height: "150px",
                                                            borderRadius: "50%"
                                                        }}
                                                        className="img-fluid img-thumbnail im"
                                                        id="FrontNidPic"
                                                        alt=""
                                                    />

                                                </div>
                                            </div>
                                            <div>
                                                <div >
                                                    <small className="text-muted"><i class="fas fa-user"></i> Name : <span>{profileData.name}</span></small>
                                                </div>

                                                <div >
                                                    <small className="text-muted"><i class="fas fa-envelope"></i> Email : <span>{profileData.email}</span></small>
                                                </div>
                                                <div >
                                                    <small className="text-muted"><i class="fas fa-mobile-alt"></i> Mobile : <span>{profileData.mobile}</span></small>
                                                </div>
                                                <div >
                                                    <small className="text-muted"><i class="fas fa-dice-two"></i> Two Factor Verification : <span>{profileData.pinAuthStatus ? "True" : "False"}</span></small>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card-footer im" style={{ background: "none" }}>
                                        <button className="b" onClick={() => this.onUpdate()} ><i class="fas fa-pen-alt"></i> Update</button>
                                    </div>


                                </div>
                            </div>
                        ) : ""
                }



                {
                    showUpdate ?
                        (
                            <div className="row d-flex justify-content-around align-items-center">
                                <div className="imTwo col-sm-6">
                                    <div className="card-header divBg">

                                        <h3 className="text-center pt-3"><i class="fas fa-user-edit"></i> Update Profile</h3>

                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="text-center">
                                                <img

                                                    src={profileImage ? flag + profileImage : NidThree}
                                                    style={{
                                                        margin: "auto",
                                                        cursor: "pointer",
                                                        width: "150px",
                                                        height: "150px",
                                                        borderRadius: "50%"
                                                    }}
                                                    className="img-fluid img-thumbnail im"
                                                    id="FrontNidPic"
                                                    alt=""
                                                />

                                                <div class="input-group mt-3">
                                                    <div class="custom-file">
                                                        <input type="file"
                                                            onChange={this.fileSelectedHandler}

                                                            class="form-control-file" id="input-file" />
                                                        <label class="custom-file-label text-muted" htmlFor="input-file"><i class="fas fa-images"></i> Choose Image</label>
                                                    </div>

                                                </div>

                                            </div>
                                            {/* User Name */}
                                            <div className="form-group mt-3">
                                                <label htmlFor="" className="text-muted"><i class="fas fa-user"></i> Name</label>
                                                <input type="text" value={this.state.name} onChange={this.onChange} className="form-control" name="name" id="inputUserName" aria-describedby="emailHelp" placeholder="Name" />
                                            </div>

                                            {/* Email */}
                                            <div className="form-group">
                                                <label htmlFor="" className="text-muted"><i class="fas fa-envelope"></i> Email</label>
                                                <input type="email" value={this.state.email} onChange={this.onChange} className="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" placeholder="Email" />
                                            </div>


                                            {/* Mobile */}
                                            <div className="form-group">
                                                <label htmlFor="" className="text-muted"><i class="fas fa-mobile-alt"></i> Mobile</label>
                                                <input type="text" value={this.state.mobile} onChange={this.onChange} className="form-control" name="mobile" id="inputMobileNumber" aria-describedby="emailHelp" placeholder="Mobile Number" />
                                            </div>

                                            {/* Two factor Verification */}
                                            <div className='form-group'>
                                                <label htmlFor="" className="text-muted"><i class="fas fa-dice-two"></i> Two Steps Verification</label>
                                                <select
                                                    className='custom-select'
                                                    value={this.state.pinAuthStatus}
                                                    onChange={this.onChangeStatus}
                                                    name="pinAuthStatus"
                                                >
                                                    <option value='' disabled>--Select--</option>
                                                    <option value={true}>Yes</option>
                                                    <option value={false}>No</option>

                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer im" style={{ background: "none" }}>
                                        <button className="b mr-5" onClick={(e) => this.onBack(e)}> Back</button>
                                        <button className="b" onClick={(e) => this.onSubmit(e)} > Submit</button>
                                    </div>
                                </div>
                            </div>
                        ) : ""
                }
                {/* Acordion Demo */}

                {/* <Acordion
                        size={"col-sm-6"}
                        heading = {"Click For Details"}
                        acBody = {
                            <div className="imTwo">
                                <h3>Welcome</h3>
                            </div>
                        }
                    /> */}



            </div>
        )
    }
}

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    mobile: Joi.number().min(11).required(),
    pinAuthStatus: Joi.boolean().required()
})

export default withRouter(GetProfile)
