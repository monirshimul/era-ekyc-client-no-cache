import React, { Component } from 'react'
import { NotificationManager } from "react-notifications";
import RegJointNidImages from './RegJointNidImages';
import RegJointFaceRPA from './RegJointFaceRPA';
import RegJointCapture from './RegJointCapture';
import RegJointPersonalDetails from './RegJointPersonalDetails';
import RegJointNominee from './RegJointNominee';
import RegJointSignature from './RegJointSignature';
import RegJointRiskGrading from './RegJointRiskGrading';
import RegJointConfirm from './RegJointConfirm';
import RegJointComplete from './RegJointComplete';


export class RegJoinFaceMain extends Component {

    state = {
        step: 1,
        //Account
        accountType: '',
        product: '',
        productType:'',
        productName: '',
        branchOrAgentPointCode: "",
		transactionOrMaturityAmount:'',
        channelName:'',
        //Step1
        NidFront: "",
        NidFrontOcr:'',
        NidFrontType: '',
        NidBack: '',
        NidBackOcr:"",
        NidBackType: '',
        loadingSpin: false,
        allData:'',
        // RPA
        nid:'',
        dob: '',
        ecImage:'',
        loading:false,
        isEnableFace: false,
        //Step2
        faceImage: "",
        showCamera: false,
        imageFlag: false,
        isEnable: false,
        validate: false,
        verifyToken:'',
        loading: false,
        //step3
        applicantName:'',
        applicantNameBangla:'',
        applicantDob:'',
        applicantDobDate:"",
        applicantNidNo:'',
        motherName:'',
        motherNameBangla:'',
        fatherName:'',
        fatherNameBangla:'',
        spouseName:'',
        gender:'',
        profession:'',
        mobileNumber:'',
        // presentAddress:'',
        // permanentAddress:'',
        // permanentAddressBangla:'',
        operatorType:'',
        monthlyIncome: '',
        sourceOfFund: '',
        nationality: '',
        tin: '',
         // ==== Present Address ====
         preAdditionalMouzaOrMoholla: "",
         preAdditionalVillageOrRoad: "",
         preCityCorporationOrMunicipality: "",
         preDistrict: "",
         preDistrictCode:'',
         preDivision: "",
         preHomeOrHoldingNo: "",
         prePostOffice: "",
         prePostalCode: "",
         preRegion: "",
         preRmo: "",
         preUnionOrWard: "",
         preUnionOrWardCode: "",
         preUpozila: "",
         preUpozilaCode:'',
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
         perDistrictCode:'',
         perDivision: "",
         perHomeOrHoldingNo: "",
         perPostOffice: "",
         perPostalCode: "",
         perRegion: "",
         perRmo: "",
         perUnionOrWard: "",
         perUnionOrWardCode:'',
         perUpozila: "",
         perUpozilaCode:'',
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
        //Step 4 
        jointArray: [],
       // showHide: false,
        //Step 5

        signature: '',
        signatureType: '',

        // Risk Grading

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

        //common for all component
        applicantEkycId: JSON.parse(sessionStorage.getItem('accountId'))? JSON.parse(sessionStorage.getItem('accountId')):'',
        flag: 'data:image/jpeg;base64,',
        confirmFlag: false,
        channelAccStatus:[]

        
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
                productType:acc.productCategory,
                transactionOrMaturityAmount:acc.amount,
                productName:acc.productName,
                channelName: acc.channelName
            })
          
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

        // RiskGrading handling Occupation
        handleOccupationChange = e => {
        
            this.setState({ occupation: e.target.value });
        }

  

    addNomineeOne = ()=> {
        let copyArray = Object.assign([], this.state.jointArray);
        copyArray.push({  nominee: '', dob: '', relation: '', photograph: '', percentage: '', isShow: true  });
        this.setState({jointArray:copyArray});
    }

    addNomineeTwo = ()=> {
        let copyArray = Object.assign([], this.state.jointArray);
        copyArray.push({ minorNominee: '', minorDob: '', minorRelationWAccH: '', minorNomineePhoto: '', minorPercentage: '', minorGuardianNid: '', minorGuardianName: '', guardianRelationWMinor: '', minorGuardianAddress: '', minorPhotoGuardian: '', isShow: false });
        this.setState({jointArray:copyArray});
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
                   // console.log('there are some problems');
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
                   // console.log('there are some problems');
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
                    console.log('there are some problems');
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
        const {accountType,  product,productType,branchOrAgentPointCode,transactionOrMaturityAmount, channelName,productName,applicantEkycId, NidFront, NidFrontType, NidFrontOcr,  NidBack, NidBackOcr, NidBackType,loadingSpin, allData,flag,nid, dob, ecImage,isEnableFace, faceImage, showCamera, imageFlag, isEnable,validate,verifyToken, loading, applicantName,applicantNameBangla,applicantDob,applicantDobDate,applicantNidNo, motherName,motherNameBangla, fatherName,fatherNameBangla, spouseName, gender, profession, mobileNumber, operatorType,monthlyIncome,sourceOfFund,nationality,tin, signature, signatureType, jointArray, confirmFlag,preAdditionalMouzaOrMoholla,preAdditionalVillageOrRoad,preCityCorporationOrMunicipality,preDistrict,preDistrictCode,preDivision,preHomeOrHoldingNo,prePostOffice,prePostalCode,preRegion,preRmo,preUnionOrWard,preUnionOrWardCode,preUpozila,preUpozilaCode,preWardForUnionPorishod,preAdditionalMouzaOrMohollaEn,preAdditionalVillageOrRoadEn,preCityCorporationOrMunicipalityEn,preDistrictEn,preDivisionEn,preHomeOrHoldingNoEn,prePostOfficeEn,prePostalCodeEn,preRegionEn,preRmoEn,preUnionOrWardEn,preUpozilaEn,preWardForUnionPorishodEn,perAdditionalMouzaOrMoholla,perAdditionalVillageOrRoad,perCityCorporationOrMunicipality,perDistrict,perDistrictCode,perDivision,perHomeOrHoldingNo,perPostOffice,perPostalCode,perRegion,perRmo,perUnionOrWard,perUnionOrWardCode,perUpozila,perUpozilaCode,perWardForUnionPorishod,perAdditionalMouzaOrMohollaEn,perAdditionalVillageOrRoadEn,perCityCorporationOrMunicipalityEn,perDistrictEn,perDivisionEn,perHomeOrHoldingNoEn,perPostOfficeEn,perPostalCodeEn,perRegionEn,perRmoEn,perUnionOrWardEn,perUpozilaEn,perWardForUnionPorishodEn, onBoardingValue, geoRiskClient, foreignOrigin, highOfficial, closeHighOfficial, isClientIp, productTypes, occupation, businessName, professionName, yearlyTransaction, hasSourceOfFundschannelAccStatus } = this.state;
        const values = {accountType, product,productType,branchOrAgentPointCode,transactionOrMaturityAmount, channelName,productName,applicantEkycId, NidFront,NidFrontOcr,NidFrontType, NidBack, NidBackOcr, NidBackType,loadingSpin,allData, flag, nid, dob, ecImage,isEnableFace,faceImage, showCamera, imageFlag, isEnable,validate,verifyToken, loading,applicantName,applicantNameBangla,applicantDob,applicantDobDate,applicantNidNo, motherName,motherNameBangla, fatherName,fatherNameBangla, spouseName, gender, profession, mobileNumber,operatorType,monthlyIncome,sourceOfFund,nationality,tin, signature, signatureType, jointArray,confirmFlag,preAdditionalMouzaOrMoholla,preAdditionalVillageOrRoad,preCityCorporationOrMunicipality,preDistrict,preDistrictCode,preDivision,preHomeOrHoldingNo,prePostOffice,prePostalCode,preRegion,preRmo,preUnionOrWard,preUnionOrWardCode,preUpozila,preUpozilaCode,preWardForUnionPorishod,preAdditionalMouzaOrMohollaEn,preAdditionalVillageOrRoadEn,preCityCorporationOrMunicipalityEn,preDistrictEn,preDivisionEn,preHomeOrHoldingNoEn,prePostOfficeEn,prePostalCodeEn,preRegionEn,preRmoEn,preUnionOrWardEn,preUpozilaEn,preWardForUnionPorishodEn,perAdditionalMouzaOrMoholla,perAdditionalVillageOrRoad,perCityCorporationOrMunicipality,perDistrict,perDistrictCode,perDivision,perHomeOrHoldingNo,perPostOffice,perPostalCode,perRegion,perRmo,perUnionOrWard,perUnionOrWardCode,perUpozila,perUpozilaCode,perWardForUnionPorishod,perAdditionalMouzaOrMohollaEn,perAdditionalVillageOrRoadEn,perCityCorporationOrMunicipalityEn,perDistrictEn,perDivisionEn,perHomeOrHoldingNoEn,perPostOfficeEn,perPostalCodeEn,perRegionEn,perRmoEn,perUnionOrWardEn,perUpozilaEn,perWardForUnionPorishodEn, onBoardingValue, geoRiskClient, foreignOrigin, highOfficial, closeHighOfficial, isClientIp, productTypes, occupation, businessName, professionName, yearlyTransaction, hasSourceOfFundschannelAccStatus }


        switch (step) {
            case 1:
                return (
                    <RegJointNidImages
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 2:
                return (
                    <RegJointFaceRPA
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

                case 3:
                    return (
                        <RegJointCapture
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        handleDate={this.handleDate}
                        values={values}
                        />
                    )

                    case 4:
                        return (
                            <RegJointPersonalDetails
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                handleChange={this.handleChange}
                                handleState={this.handleState}
                                values={values}
                            />
                        )

                        case 5:
                            return (
                                <RegJointNominee
                                    nextStep={this.nextStep}
                                    prevStep={this.prevStep}
                                    handleState={this.handleState}
                                    onChange={this.handleInputChange}
                                    showHideChange={this.showHideChange}
                                    addNomineeOne={this.addNomineeOne}
                                    addNomineeTwo={this.addNomineeTwo}
                                    deteteRow={this.deteteRow}
                                    values={values}
                                />
                            )


                            case 6:
                                return (
                                    <RegJointSignature
                                        nextStep={this.nextStep}
                                        prevStep={this.prevStep}
                                        handleChange={this.handleChange}
                                        handleState={this.handleState}
                                        values={values}
                                    />
                                )

                                case 7:
                                    return (
                                        <RegJointRiskGrading
                                            nextStep={this.nextStep}
                                            prevStep={this.prevStep}
                                            handleChange={this.handleChange}
                                            handleOccupationChange={this.handleOccupationChange}
                                            handleState={this.handleState}
                                            values={values}
                                        />
                                    )


                                    case 8:
                                        return (
                                            <RegJointConfirm
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
                                                <RegJointComplete
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

export default RegJoinFaceMain;