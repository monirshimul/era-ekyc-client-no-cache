import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from "react-notifications"
import MobileVerification from '../../../Reusable/MobileVerification';
import RegNidImages from './RegNidImages';
import RegRPA from './RegRPA';
import RegCaptureImage from './RegCaptureImage';
// import RegCapture from './RegCapture';
import RegPersonalDetails from './RegPersonalDetails';
import RegNominee from './RegNominee';
import RegSignature from './RegSignature';
import RegRiskGrading from './RegRiskGrading';
import RegFaceFileUpload from './RegFaceFileUpload';
import RegFaceConfirm from './RegFaceConfirm';
import RegComplete from './RegComplete';
import DedubeCheck from '../../../Reusable/DedubeCheck'
import ExistingConfigImage from '../../../Reusable/ExistingConfigImage';
// import ExistingCapture from '../../../Reusable/ExistingCapture';
import { ImageCompressor } from '../../../Utils/ImageCompressor';


export class RegFaceMain extends Component {

    state = {
        step: 1,
        //Account
        accountType: '',
        product: '',
        productType: '',
        productName: '',
        branchOrAgentPointCode: "",
        transactionOrMaturityAmount: '',
        channelName: '',
        // Step 1
        verificationMobile: '',
        verificationCodeMobile: '',
        //Step2
        NidFront: "",
        NidFrontOcr: '',
        NidFrontType: '',
        NidBack: '',
        NidBackOcr: "",
        NidBackType: '',
        loadingSpin: false,
        allData: '',
        // Step 3
        nid: '',
        dob: '',
        ecImage: '',
        isEnableFace: false,
        //Step4
        faceImage: "",
        showCamera: false,
        imageFlag: false,
        isEnable: false,
        validate: false,
        verifyToken: '',
        loading: false,
        //step5
        // Global EC Text start
        ecApplicantName: '',
        ecApplicantNameBangla: '',
        ecFatherNameBangla: '',
        ecMotherNameBangla: '',
        // Global EC Text end

        applicantName: '',
        applicantNameBangla: '',
        applicantDob: '',
        applicantDobDate: "",
        applicantNidNo: '',
        motherName: '',
        motherNameBangla: '',
        fatherName: '',
        fatherNameBangla: '',
        spouseName: '',
        gender: '',
        profession: '',
        professionCode: '',
        mobileNumber: '',
        monthlyIncome: '',
        sourceOfFund: '',
        nationality: '',
        // presentAddress:'',
        // permanentAddress:'',
        // permanentAddressBangla:'',
        // ==== Present Address ====
        preAdditionalMouzaOrMoholla: "",
        preAdditionalVillageOrRoad: "",
        preCityCorporationOrMunicipality: "",
        preDistrict: "",
        preDistrictCode: '',
        preDivision: "",
        preDivisionCode: "",
        preHomeOrHoldingNo: "",
        prePostOffice: "",
        prePostalCode: "",
        preRegion: "",
        preRmo: "",
        preUnionOrWard: "",
        preUnionOrWardCode: "",
        preUpozila: "",
        preUpozilaCode: '',
        preWardForUnionPorishod: "",
        preAdditionalMouzaOrMohollaEn: "",
        preAdditionalVillageOrRoadEn: "",
        preCityCorporationOrMunicipalityEn: "",
        preDistrictEn: "",
        preDivisionEn: "",
        preHomeOrHoldingNoEn: "",
        prePostOfficeEn: "",
        prePostalCodeEn: "",
        preRegionEn: "",
        preRmoEn: "",
        preUnionOrWardEn: "",
        preUpozilaEn: "",
        preWardForUnionPorishodEn: "",
        //==== PermanentAddress ====
        perAdditionalMouzaOrMoholla: "",
        perAdditionalVillageOrRoad: "",
        perCityCorporationOrMunicipality: "",
        perDistrict: "",
        perDistrictCode: '',
        perDivision: "",
        perDivisionCode: "",
        perHomeOrHoldingNo: "",
        perPostOffice: "",
        perPostalCode: "",
        perRegion: "",
        perRmo: "",
        perUnionOrWard: "",
        perUnionOrWardCode: '',
        perUpozila: "",
        perUpozilaCode: '',
        perWardForUnionPorishod: "",
        perAdditionalMouzaOrMohollaEn: "",
        perAdditionalVillageOrRoadEn: "",
        perCityCorporationOrMunicipalityEn: "",
        perDistrictEn: "",
        perDivisionEn: "",
        perHomeOrHoldingNoEn: "",
        perPostOfficeEn: "",
        perPostalCodeEn: "",
        perRegionEn: "",
        perRmoEn: "",
        perUnionOrWardEn: "",
        perUpozilaEn: "",
        perWardForUnionPorishodEn: "",

        //Step 6
        jointArray: [],
        // showHide: false,
        //Step 7
        signature: '',
        signatureType: '',
        // Step 8
        onBoardingValue: "",
        geoRiskClient: '',
        foreignOrigin: '',
        highOfficial: "",
        closeHighOfficial: "",
        isClientIp: "",
        productTypes: "",
        occupation: "",
        businessName: "",
        professionName: "",
        yearlyTransaction: "",
        hasSourceOfFunds: "",

        // RiskGrading
        riskGradingArray: [],

        //step 9
        passport: "",
        passportFileName: '',
        passFileType: "",
        birthCertificate: "",
        birthCertificateFileName: '',
        birthCerFileType: "",
        tinCertificate: "",
        tinCertificateFileName: '',
        tinFileType: "",

        //common for all component
        flag: 'data:image/jpeg;base64,',
        applicantEkycId: '',
        typeVerification: 'FACE',
        confirmFlag: false,
        channelAccStatus: [],
        useMobilePage: "",
        useDepo: '',

        nativeDistPermanent: [],
        nativeDistPresent: [],
        nativeUpaPermanent: [],
        nativeUpaPresent: [],
        nativeUniPermanent: [],
        nativeUniPresent: [],

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

    componentDidMount() {
        // Account Info

        //window.location.reload(false);

        try {
            const account = sessionStorage.getItem("accountInfo");
            const acc = JSON.parse(account);
            const schannel = sessionStorage.getItem("subChannelInfo");
            const subChannel = JSON.parse(schannel);
            this.setState({

                accountType: acc.accountType,
                product: acc.productCategory,
                productType: subChannel,
                transactionOrMaturityAmount: acc.amount,
                productName: acc.productName,
                channelName: acc.channelName
            })

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

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    //handle state change
    handleState = (input, data) => {
        this.setState({ [input]: data });
    }

    // RiskGrading handling Occupation
    handleOccupationChange = e => {

        this.setState({ occupation: e.target.value });
    }


    addNomineeOne = () => {
        let copyArray = Object.assign([], this.state.jointArray);
        copyArray.push({ nominee: '', dob: '', relation: '', photograph: '', percentage: '', showAdultRelation: '', isShow: true });
        this.setState({ jointArray: copyArray });
    }

    addNomineeTwo = () => {
        let copyArray = Object.assign([], this.state.jointArray);
        copyArray.push({ minorNominee: '', minorDob: '', minorRelationWAccH: '', minorNomineePhoto: '', minorPercentage: '', minorGuardianNid: '', minorGuardianName: '', guardianRelationWMinor: '', minorGuardianAddress: '', minorPhotoGuardian: '', showMinorRelation: '', showMinorRelationWithGuardian: '', isShow: false });
        this.setState({ jointArray: copyArray });
    }


    handleInputChange = async (index, event) => {
        console.log(event.target);
        let copyArray = Object.assign([], this.state.jointArray);
        copyArray[index][event.target.name] = event.target.value;
        if (event.target.name === "photograph") {
            if (event.target.files[0]) {
                let base = await ImageCompressor(event)
                copyArray[index].photograph = base;
            }
        }
        else if (event.target.name === "minorNomineePhoto") {
            if (event.target.files[0]) {
                let base = await ImageCompressor(event)
                copyArray[index].minorNomineePhoto = base;
            }
        }
        else if (event.target.name === "minorPhotoGuardian") {
            if (event.target.files[0]) {
                let base = await ImageCompressor(event)
                copyArray[index].minorPhotoGuardian = base;
            }
        }

        this.setState({ jointArray: copyArray });

    }

    // deteteRow = (index) => {
    //     const copyArray = Object.assign([], this.state.jointArray);
    //     copyArray.splice(index, 1);
    //     this.setState({ jointArray: copyArray })

    // }


    render() {
        //const { step } = this.state;
        const { step, nativeDistPermanent, nativeUpaPermanent, nativeUpaPresent, nativeUniPermanent, nativeUniPresent, nativeDistPresent, verificationMobile, verificationCodeMobile, accountType, product, productType, branchOrAgentPointCode, transactionOrMaturityAmount, channelName, productName, applicantEkycId, NidFront, NidFrontType, NidFrontOcr, NidBack, NidBackOcr, NidBackType, loadingSpin, allData, flag, nid, dob, ecImage, isEnableFace, faceImage, showCamera, imageFlag, isEnable, validate, verifyToken, loading, ecApplicantName, ecApplicantNameBangla, ecFatherNameBangla, ecMotherNameBangla,
            applicantName, applicantNameBangla, applicantDob, applicantDobDate, applicantNidNo, motherName, motherNameBangla, fatherName, fatherNameBangla, spouseName, gender, profession, professionCode, mobileNumber, preAdditionalMouzaOrMoholla, preAdditionalVillageOrRoad, preCityCorporationOrMunicipality, preDistrict, preDistrictCode, preDivision, preHomeOrHoldingNo, prePostOffice, prePostalCode, preRegion, preRmo, preUnionOrWard, preUnionOrWardCode, preUpozila, preUpozilaCode, preWardForUnionPorishod, preAdditionalMouzaOrMohollaEn, preAdditionalVillageOrRoadEn, preCityCorporationOrMunicipalityEn, preDistrictEn, preDivisionEn, preDivisionCode, preHomeOrHoldingNoEn, prePostOfficeEn, prePostalCodeEn, preRegionEn, preRmoEn, preUnionOrWardEn, preUpozilaEn, preWardForUnionPorishodEn, perAdditionalMouzaOrMoholla, perAdditionalVillageOrRoad, perCityCorporationOrMunicipality, perDistrict, perDistrictCode, perDivision, perDivisionCode, perHomeOrHoldingNo, perPostOffice, perPostalCode, perRegion, perRmo, perUnionOrWard, perUnionOrWardCode, perUpozila, perUpozilaCode, perWardForUnionPorishod, perAdditionalMouzaOrMohollaEn, perAdditionalVillageOrRoadEn, perCityCorporationOrMunicipalityEn, perDistrictEn, perDivisionEn, perHomeOrHoldingNoEn, perPostOfficeEn, perPostalCodeEn, perRegionEn, perRmoEn, perUnionOrWardEn, perUpozilaEn, perWardForUnionPorishodEn, monthlyIncome, sourceOfFund, nationality, signature, signatureType, jointArray, typeVerification, confirmFlag, onBoardingValue, geoRiskClient, foreignOrigin, highOfficial, closeHighOfficial, isClientIp, productTypes, occupation, businessName, professionName, yearlyTransaction, hasSourceOfFunds, channelAccStatus, riskGradingArray, passport, passportFileName, passFileType, birthCertificate, birthCertificateFileName, birthCerFileType, tinCertificate, tinCertificateFileName, tinFileType, useMobilePage, useDepo } = this.state;
        const values = {
            step, nativeDistPermanent, nativeUpaPermanent, nativeUpaPresent, nativeUniPermanent, nativeUniPresent, nativeDistPresent, verificationMobile, verificationCodeMobile, accountType, product, productType, branchOrAgentPointCode, transactionOrMaturityAmount, channelName, productName, applicantEkycId, NidFront, NidFrontOcr, NidFrontType, NidBack, NidBackOcr, NidBackType, loadingSpin, allData, flag, nid, dob, ecImage, faceImage, isEnableFace, showCamera, imageFlag, isEnable, validate, verifyToken, loading, ecApplicantName, ecApplicantNameBangla, ecFatherNameBangla, ecMotherNameBangla,
            applicantName, applicantNameBangla, applicantDob, applicantDobDate, applicantNidNo, motherName, motherNameBangla, fatherName, fatherNameBangla, spouseName, gender, profession, professionCode, mobileNumber, preAdditionalMouzaOrMoholla, preAdditionalVillageOrRoad, preCityCorporationOrMunicipality, preDistrict, preDistrictCode, preDivision, preHomeOrHoldingNo, prePostOffice, prePostalCode, preRegion, preRmo, preUnionOrWard, preUnionOrWardCode, preUpozila, preUpozilaCode, preWardForUnionPorishod, preAdditionalMouzaOrMohollaEn, preAdditionalVillageOrRoadEn, preCityCorporationOrMunicipalityEn, preDistrictEn, preDivisionEn, preDivisionCode, preHomeOrHoldingNoEn, prePostOfficeEn, prePostalCodeEn, preRegionEn, preRmoEn, preUnionOrWardEn, preUpozilaEn, preWardForUnionPorishodEn, perAdditionalMouzaOrMoholla, perAdditionalVillageOrRoad, perCityCorporationOrMunicipality, perDistrict, perDistrictCode, perDivision, perDivisionCode, perHomeOrHoldingNo, perPostOffice, perPostalCode, perRegion, perRmo, perUnionOrWard, perUnionOrWardCode, perUpozila, perUpozilaCode, perWardForUnionPorishod, perAdditionalMouzaOrMohollaEn, perAdditionalVillageOrRoadEn, perCityCorporationOrMunicipalityEn, perDistrictEn, perDivisionEn, perHomeOrHoldingNoEn, perPostOfficeEn, perPostalCodeEn, perRegionEn, perRmoEn, perUnionOrWardEn, perUpozilaEn, perWardForUnionPorishodEn, monthlyIncome, sourceOfFund, nationality, signature, signatureType, jointArray, typeVerification, confirmFlag, onBoardingValue, geoRiskClient, foreignOrigin, highOfficial, closeHighOfficial, isClientIp, productTypes, occupation, businessName, professionName, yearlyTransaction, hasSourceOfFunds, channelAccStatus, riskGradingArray, passport, passportFileName, passFileType, birthCertificate, birthCertificateFileName, birthCerFileType, tinCertificate, tinCertificateFileName, tinFileType, useMobilePage, useDepo
        }

        switch (this.state.step) {

            case 1:
                return (
                    <MobileVerification
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 2:
                return (
                    <RegNidImages
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 3:
                return (
                    <DedubeCheck
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 4:
                return (
                    <RegRPA
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 5:
                return (
                    <RegCaptureImage
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        handleDate={this.handleDate}
                        values={values}
                    />
                )

            case 6:
                return (
                    <RegPersonalDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 7:
                return (
                    <RegNominee
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleState={this.handleState}
                        onChange={this.handleInputChange}
                        showHideChange={this.showHideChange}
                        addNomineeOne={this.addNomineeOne}
                        addNomineeTwo={this.addNomineeTwo}
                        values={values}
                    />
                )

            case 8:
                return (
                    <RegSignature
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 9:
                return (
                    <RegRiskGrading
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleOccupationChange={this.handleOccupationChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )


            case 10:
                return (
                    <RegFaceFileUpload
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 11:
                return (
                    <RegFaceConfirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 12:
                return (
                    <RegComplete
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case "exist_1":
                return (
                    <ExistingConfigImage
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        handleDate={this.handleDate}
                        values={values}
                    />
                )

            case "exist_2":
                return (
                    <RegPersonalDetails
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case "exist_3":
                return (
                    <RegNominee
                        handleState={this.handleState}
                        onChange={this.handleInputChange}
                        showHideChange={this.showHideChange}
                        addNomineeOne={this.addNomineeOne}
                        addNomineeTwo={this.addNomineeTwo}
                        values={values}
                    />
                )

            case "exist_4":
                return (
                    <RegSignature
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case "exist_5":
                return (
                    <RegRiskGrading

                        handleChange={this.handleChange}
                        handleOccupationChange={this.handleOccupationChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case "exist_6":
                return (
                    <RegFaceFileUpload

                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case "exist_7":
                return (
                    <RegFaceConfirm

                        handleState={this.handleState}
                        values={values}
                    />
                )
            case "exist_8":
                return (
                    <RegComplete
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

export default withRouter(RegFaceMain);
