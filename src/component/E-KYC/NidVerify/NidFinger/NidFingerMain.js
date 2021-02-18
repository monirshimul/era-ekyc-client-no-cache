import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NidFingerPrint from './NidFingerPrint';
import FaceCompare from '../ReUse/FaceCompare';
import NidFaceDetails from '../NidFace/NidFaceDetails';



export class NidFingerMain extends Component {
    state = {
        step: 1,

        nid: "",
        dob: "",
        rIndex: "",
        rThumb: "",
        lIndex: "",
        lThumb: "",
        isEnable: false,
        loading: false,
        loadingSpin: false,
        ecImage: '',
        faceImage: '',

        applicantName: '',
        applicantNameBangla: '',
        applicantDob: '',
        applicantDobDate: "",
        applicantNidNo: '',
        motherNameBangla: '',
        fatherNameBangla: '',





        preAdditionalMouzaOrMoholla: "",
        preAdditionalVillageOrRoad: "",
        preCityCorporationOrMunicipality: "",
        preDistrict: "",
        preDivision: "",
        preHomeOrHoldingNo: "",
        prePostOffice: "",
        prePostalCode: "",
        preRegion: "",
        preRmo: "",
        preUnionOrWard: "",
        preUnionOrWardCode: "",
        preUpozila: "",
        preWardForUnionPorishod: "",

        //==== PermanentAddress ====
        perAdditionalMouzaOrMoholla: "",
        perAdditionalVillageOrRoad: "",
        perCityCorporationOrMunicipality: "",
        perDistrict: "",
        perDivision: "",
        perHomeOrHoldingNo: "",
        perPostOffice: "",
        perPostalCode: "",
        perRegion: "",
        perRmo: "",
        perUnionOrWard: "",
        perUnionOrWardCode: '',
        perUpozila: "",
        perWardForUnionPorishod: "",


        flag: 'data:image/jpeg;base64,',
        confirmFlag: false,
        typeVerification: 'FINGER',
    }

    //Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    //Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }


    //Handle Fields Change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    //handle state change
    handleState = (input, data) => {
        this.setState({ [input]: data });
    }

    handleDate = (input, date) => {
        this.setState({ [input]: date });
    }


    render() {
        const { step, nid, dob, rIndex, rThumb, lIndex, lThumb, isEnable, loading, loadingSpin, ecImage, faceImage, applicantName, applicantNameBangla, applicantDob, applicantDobDate, applicantNidNo, motherNameBangla, fatherNameBangla, preAdditionalMouzaOrMoholla, preAdditionalVillageOrRoad, preCityCorporationOrMunicipality, preDistrict, preDivision, preHomeOrHoldingNo, prePostOffice, prePostalCode, preRegion, preRmo, preUnionOrWard, preUnionOrWardCode, preUpozila, preWardForUnionPorishod, perAdditionalMouzaOrMoholla, perAdditionalVillageOrRoad, perCityCorporationOrMunicipality, perDistrict, perDivision, perHomeOrHoldingNo, perPostOffice, perPostalCode, perRegion, perRmo, perUnionOrWard, perUnionOrWardCode, perUpozila, perWardForUnionPorishod, flag, confirmFlag, typeVerification } = this.state;

        const values = {
            step, nid, dob, rIndex, rThumb, lIndex, lThumb, isEnable, loading, loadingSpin, ecImage, faceImage, applicantName, applicantNameBangla, applicantDob, applicantDobDate, applicantNidNo, motherNameBangla, fatherNameBangla, preAdditionalMouzaOrMoholla, preAdditionalVillageOrRoad, preCityCorporationOrMunicipality, preDistrict, preDivision, preHomeOrHoldingNo, prePostOffice, prePostalCode, preRegion, preRmo, preUnionOrWard, preUnionOrWardCode, preUpozila, preWardForUnionPorishod, perAdditionalMouzaOrMoholla, perAdditionalVillageOrRoad, perCityCorporationOrMunicipality, perDistrict, perDivision, perHomeOrHoldingNo, perPostOffice, perPostalCode, perRegion, perRmo, perUnionOrWard, perUnionOrWardCode, perUpozila, perWardForUnionPorishod, flag, confirmFlag, typeVerification
        }

        switch (this.state.step) {


            case 1:
                return (
                    <NidFingerPrint
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 2:
                return (
                    <FaceCompare
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 3:
                return (
                    <NidFaceDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )




        }

        return (
            <div>

            </div>
        )
    }
}

export default withRouter(NidFingerMain);
