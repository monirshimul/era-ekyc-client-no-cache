import React, { Component } from 'react';
import style from './NidDetails.module.css';
import Face from "../../../Simplified/images/face.svg";
import axios from 'axios';
import { depoApi } from '../../../Url/ApiList';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from "react-notifications";

export class NidDetails extends Component {
  state = {
    depoData: "",
    perAddress: "",
    preAddress: "",
    flag: 'data:image/jpeg;base64,'
  }

  async componentDidMount() {

    let config = {
      headers: {
        "x-auth-token": JSON.parse(sessionStorage.getItem('x-auth-token')),
      },
    };

    let obj = {
      nid: this.props.location.state
    }

    try {
      let repoData = await axios.post(depoApi, obj, config);
      //console.log("Depo Data", repoData.data)
      if (repoData.data.data !== null) {
        this.setState({ depoData: repoData.data.data });
        this.setState({ perAddress: repoData.data.data.permanentAddress });
        this.setState({ preAddress: repoData.data.data.presentAddress });
      }

    } catch (error) {
      if (error.response) {
        let message = error.response.data.message
        //console.log("Error", error.response)
        NotificationManager.error(message, "Error", 5000);
      } else if (error.request) {
        // console.log("Error Connecting...", error.request)
        NotificationManager.error("Error Connecting...", "Error", 5000);
      } else if (error) {
        NotificationManager.error(error.toString(), "Error", 5000);
      }
    }

  }

  back = () => {
    this.props.history.goBack();
  }

  getImage = (image) => {
    if (image) {
      return this.state.flag + image
    }
    else {
      return Face;
    }
  }


  render() {
    let { depoData, flag, perAddress, preAddress } = this.state;
    if (!depoData) return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-6 imTwoWhite animated zoomIn">
            <h3 className="im" style={{ color: "#fb743e" }}>No Record Found</h3>
          </div>
        </div>
        <div className="row d-flex justify-content-center animated zoomIn">
          <div className="b mt-3" onClick={this.back} >Back</div>
        </div>

      </div>
    );
    return (
      <div className="container">
        <div className={`row d-flex justify-content-center imTwoWhite ${style.bgForUser}`} style={{ position: "relative" }}>
          <div className="animated zoomIn" style={{
            position: "absolute",
            bottom: "-70px"


          }}>
            <img

              src={depoData === null ? Face : this.getImage(depoData.image)}
              style={{

                width: "150px",
                height: "150px",
                borderRadius: "50%"


              }}
              value={depoData === null ? Face : depoData.image}
              className={`img-thumbnail ${style.imgHover}`}
              id="imagePicture"
              alt="cameraPicture"
            />
            <div>
              <h5 className="text-center mt-2" style={{ textTransform: "uppercase", color: "green" }}>{depoData.nameEn}</h5>
            </div>
          </div>

        </div>

        <div className="imTwoWhite row d-flex justify-content-center pt-5">
          <div className="col-sm-4 mt-5 imTwoWhite animated zoomIn">
            <h5 className="im" style={{ color: "green", cursor: "text" }}>Details</h5>
            <hr />
            <small className="" style={{ fontSize: "14px" }}>
              <span style={{ color: "green", fontSize: "14px" }}>Applicant's Nid No :</span> {depoData.nationalId}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Applicant's Name :</span> {depoData.nameEn}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Applicant's Name Bangla :</span> {depoData.name}<br />
              {/*  <span style={{ color: "green", fontSize: "14px" }}> Mother's Name :</span> {depoData.motherName}<br />*/}
              <span style={{ color: "green", fontSize: "14px" }}>Mother's Name  :</span> {depoData.mother}<br />
              {/* <span style={{ color: "green", fontSize: "14px" }}>Father's Name :</span> {depoData.fatherName}<br />*/}
              <span style={{ color: "green", fontSize: "14px" }}>Father's Name Bangla :</span> {depoData.father}<br />
              {/*<span style={{ color: "green", fontSize: "14px" }}>Spouse Name :</span> {depoData.spouseName}<br />*/}
              {/*<span style={{ color: "green", fontSize: "14px" }}>Profession :</span> {depoData.profession}<br />*/}



            </small>
          </div>
          <div className="col-sm-4 mt-5 imTwoWhite animated zoomIn">
            <h5 className="im" style={{ color: "green", cursor: "text" }}>Permanent Address</h5>
            <hr />
            <small className="" style={{ fontSize: "14px" }}>
              <span style={{ color: "green", fontSize: "14px" }}>Mouza Or Moholla :</span> {this.state.perAddress.additionalMouzaOrMoholla}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Village Or Road :</span> {this.state.perAddress.additionalVillageOrRoad}<br />
              <span style={{ color: "green", fontSize: "14px" }}>City Corp. :</span> {this.state.perAddress.cityCorporationOrMunicipality}<br />
              <span style={{ color: "green", fontSize: "14px" }}>District :</span> {this.state.perAddress.district}<br />
              <span style={{ color: "green", fontSize: "14px" }}>District Code :</span> {this.state.perAddress.perDistrictCode}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Division :</span> {this.state.perAddress.division}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Home Or Holding No. :</span> {this.state.perAddress.homeOrHoldingNo}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Post Office :</span> {this.state.perAddress.postOffice}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Postal Code :</span> {this.state.perAddress.postalCode}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Region :</span> {this.state.perAddress.region}<br />
              <span style={{ color: "green", fontSize: "14px" }}>RMO :</span> {this.state.perAddress.rmo}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward :</span> {this.state.perAddress.unionOrWard}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward Code :</span> {this.state.perAddress.perUnionOrWardCode}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Upozila :</span> {this.state.perAddress.upozila}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Upozila Code :</span> {this.state.perAddress.perUpozilaCode}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Ward For Union Porishod :</span> {this.state.perAddress.wardForUnionPorishod}<br />
            </small>
          </div>
          <div className="col-sm-4 mt-5 imTwoWhite animated zoomIn">
            <h5 className="im" style={{ color: "green", cursor: "text" }}>Present Address</h5>
            <hr />
            <small className="" style={{ fontSize: "14px" }}>
              <span style={{ color: "green", fontSize: "14px" }}>Mouza Or Moholla :</span> {this.state.preAddress.additionalMouzaOrMoholla}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Village Or Road :</span> {this.state.preAddress.additionalVillageOrRoad}<br />
              <span style={{ color: "green", fontSize: "14px" }}>City Corp. :</span> {this.state.preAddress.cityCorporationOrMunicipality}<br />
              <span style={{ color: "green", fontSize: "14px" }}>District :</span> {this.state.preAddress.district}<br />
              <span style={{ color: "green", fontSize: "14px" }}>District Code :</span> {this.state.preAddress.preDistrictCode}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Division :</span> {this.state.preAddress.division}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Home Or Holding No. :</span> {this.state.preAddress.homeOrHoldingNo}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Post Office :</span> {this.state.preAddress.postOffice}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Postal Code :</span> {this.state.preAddress.postalCode}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Region :</span> {this.state.preAddress.region}<br />
              <span style={{ color: "green", fontSize: "14px" }}>RMO :</span> {this.state.preAddress.rmo}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward :</span> {this.state.preAddress.unionOrWard}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Union Or Ward Code :</span> {this.state.preAddress.preUnionOrWardCode}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Upozila :</span> {this.state.preAddress.upozila}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Upozila Code :</span> {this.state.preAddress.preUpozilaCode}<br />
              <span style={{ color: "green", fontSize: "14px" }}>Ward For Union Porishod :</span> {this.state.preAddress.wardForUnionPorishod}<br />
            </small>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="b mt-3" onClick={this.back} >Back</div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NidDetails);
