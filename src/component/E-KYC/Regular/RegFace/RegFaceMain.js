import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import RegMobileVerification from './RegMobileVerification';
import RegNidImages from './RegNidImages';
import RegRPA from './RegRPA';
import RegCaptureImage from './RegCaptureImage';
import RegPersonalDetails from './RegPersonalDetails';
import RegNominee from './RegNominee';
import RegSignature from './RegSignature';
import RegRiskGrading from './RegRiskGrading';
import RegFaceFileUpload from './RegFaceFileUpload';
import RegFaceConfirm from './RegFaceConfirm';
import RegComplete from './RegComplete';


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
        typeVerification: '',
        confirmFlag: false,
        channelAccStatus: []
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
            this.setState({

                accountType: acc.accountType,
                product: acc.productCategory,
                productType: acc.productCategory,
                transactionOrMaturityAmount: acc.amount,
                productName: acc.productName,
                channelName: acc.channelName
            })

        } catch (e) {

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
        copyArray.push({ nominee: '', dob: '', relation: '', photograph: '', percentage: '',showAdultRelation:'', isShow: true });
        this.setState({ jointArray: copyArray });
    }

    addNomineeTwo = () => {
        let copyArray = Object.assign([], this.state.jointArray);
        copyArray.push({ minorNominee: '', minorDob: '', minorRelationWAccH: '', minorNomineePhoto: '', minorPercentage: '', minorGuardianNid: '', minorGuardianName: '', guardianRelationWMinor: '', minorGuardianAddress: '', minorPhotoGuardian: '',showMinorRelation:'',showMinorRelationWithGuardian:'', isShow: false });
        this.setState({ jointArray: copyArray });
    }


    handleInputChange = (index, event) => {
        console.log(event.target);
        let copyArray = Object.assign([], this.state.jointArray);
        copyArray[index][event.target.name] = event.target.value;
        if (event.target.name === "photograph") {
            if (event.target.files[0]) {
                let file = event.target.files[0];
                //console.log(file.type);
                var reader = new FileReader();
                reader.readAsBinaryString(file);

                reader.onload = () => {

                    let base64Image = btoa(reader.result);

                    copyArray[index].photograph = base64Image;
                };
                reader.onerror = () => {
                    //  console.log('there are some problems');
                    alert('File can not be read');
                };
            }
        }
        else if (event.target.name === "minorNomineePhoto") {
            if (event.target.files[0]) {
                let file = event.target.files[0];
                //console.log(file.type);
                var reader = new FileReader();
                reader.readAsBinaryString(file);

                reader.onload = () => {

                    let base64Image = btoa(reader.result);

                    copyArray[index].minorNomineePhoto = base64Image;
                };
                reader.onerror = () => {
                    //   console.log('there are some problems');
                    alert('File can not be read');
                };
            }
        }
        else if (event.target.name === "minorPhotoGuardian") {
            if (event.target.files[0]) {
                let file = event.target.files[0];
                //console.log(file.type);
                var reader = new FileReader();
                reader.readAsBinaryString(file);

                reader.onload = () => {

                    let base64Image = btoa(reader.result);

                    copyArray[index].minorPhotoGuardian = base64Image;
                };
                reader.onerror = () => {
                    //  console.log('there are some problems');
                    alert('File can not be read');
                };
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
        const { step } = this.state;
        const { verificationMobile, verificationCodeMobile, accountType, product, productType, branchOrAgentPointCode, transactionOrMaturityAmount, channelName, productName, applicantEkycId, NidFront, NidFrontType, NidFrontOcr, NidBack, NidBackOcr, NidBackType, loadingSpin, allData, flag, nid, dob, ecImage, isEnableFace, faceImage, showCamera, imageFlag, isEnable, validate, verifyToken, loading, applicantName, applicantNameBangla, applicantDob, applicantDobDate, applicantNidNo, motherName, motherNameBangla, fatherName, fatherNameBangla, spouseName, gender, profession, mobileNumber, preAdditionalMouzaOrMoholla, preAdditionalVillageOrRoad, preCityCorporationOrMunicipality, preDistrict, preDistrictCode, preDivision, preHomeOrHoldingNo, prePostOffice, prePostalCode, preRegion, preRmo, preUnionOrWard, preUnionOrWardCode, preUpozila, preUpozilaCode, preWardForUnionPorishod, preAdditionalMouzaOrMohollaEn, preAdditionalVillageOrRoadEn, preCityCorporationOrMunicipalityEn, preDistrictEn, preDivisionEn, preHomeOrHoldingNoEn, prePostOfficeEn, prePostalCodeEn, preRegionEn, preRmoEn, preUnionOrWardEn, preUpozilaEn, preWardForUnionPorishodEn, perAdditionalMouzaOrMoholla, perAdditionalVillageOrRoad, perCityCorporationOrMunicipality, perDistrict, perDistrictCode, perDivision, perHomeOrHoldingNo, perPostOffice, perPostalCode, perRegion, perRmo, perUnionOrWard, perUnionOrWardCode, perUpozila, perUpozilaCode, perWardForUnionPorishod, perAdditionalMouzaOrMohollaEn, perAdditionalVillageOrRoadEn, perCityCorporationOrMunicipalityEn, perDistrictEn, perDivisionEn, perHomeOrHoldingNoEn, perPostOfficeEn, perPostalCodeEn, perRegionEn, perRmoEn, perUnionOrWardEn, perUpozilaEn, perWardForUnionPorishodEn, monthlyIncome, sourceOfFund, nationality, signature, signatureType, jointArray, typeVerification, confirmFlag, onBoardingValue, geoRiskClient, foreignOrigin, highOfficial, closeHighOfficial, isClientIp, productTypes, occupation, businessName, professionName, yearlyTransaction, hasSourceOfFunds, channelAccStatus, riskGradingArray, passport, passportFileName, passFileType, birthCertificate, birthCertificateFileName, birthCerFileType, tinCertificate, tinCertificateFileName, tinFileType } = this.state;
        const values = { verificationMobile, verificationCodeMobile, accountType, product, productType, branchOrAgentPointCode, transactionOrMaturityAmount, channelName, productName, applicantEkycId, NidFront, NidFrontOcr, NidFrontType, NidBack, NidBackOcr, NidBackType, loadingSpin, allData, flag, nid, dob, ecImage, faceImage, isEnableFace, showCamera, imageFlag, isEnable, validate, verifyToken, loading, applicantName, applicantNameBangla, applicantDob, applicantDobDate, applicantNidNo, motherName, motherNameBangla, fatherName, fatherNameBangla, spouseName, gender, profession, mobileNumber, preAdditionalMouzaOrMoholla, preAdditionalVillageOrRoad, preCityCorporationOrMunicipality, preDistrict, preDistrictCode, preDivision, preHomeOrHoldingNo, prePostOffice, prePostalCode, preRegion, preRmo, preUnionOrWard, preUnionOrWardCode, preUpozila, preUpozilaCode, preWardForUnionPorishod, preAdditionalMouzaOrMohollaEn, preAdditionalVillageOrRoadEn, preCityCorporationOrMunicipalityEn, preDistrictEn, preDivisionEn, preHomeOrHoldingNoEn, prePostOfficeEn, prePostalCodeEn, preRegionEn, preRmoEn, preUnionOrWardEn, preUpozilaEn, preWardForUnionPorishodEn, perAdditionalMouzaOrMoholla, perAdditionalVillageOrRoad, perCityCorporationOrMunicipality, perDistrict, perDistrictCode, perDivision, perHomeOrHoldingNo, perPostOffice, perPostalCode, perRegion, perRmo, perUnionOrWard, perUnionOrWardCode, perUpozila, perUpozilaCode, perWardForUnionPorishod, perAdditionalMouzaOrMohollaEn, perAdditionalVillageOrRoadEn, perCityCorporationOrMunicipalityEn, perDistrictEn, perDivisionEn, perHomeOrHoldingNoEn, perPostOfficeEn, perPostalCodeEn, perRegionEn, perRmoEn, perUnionOrWardEn, perUpozilaEn, perWardForUnionPorishodEn, monthlyIncome, sourceOfFund, nationality, signature, signatureType, jointArray, typeVerification, confirmFlag, onBoardingValue, geoRiskClient, foreignOrigin, highOfficial, closeHighOfficial, isClientIp, productTypes, occupation, businessName, professionName, yearlyTransaction, hasSourceOfFunds, channelAccStatus, riskGradingArray, passport, passportFileName, passFileType, birthCertificate, birthCertificateFileName, birthCerFileType, tinCertificate, tinCertificateFileName, tinFileType }

        switch (step) {

            case 1:
                return (
                    <RegMobileVerification
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
                    <RegRPA
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 4:
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

            case 5:
                return (
                    <RegPersonalDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 6:
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

            case 7:
                return (
                    <RegSignature
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 8:
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


            case 9:
                return (
                    <RegFaceFileUpload
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 10:
                return (
                    <RegFaceConfirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 11:
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
