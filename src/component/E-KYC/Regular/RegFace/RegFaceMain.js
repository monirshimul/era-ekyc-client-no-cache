import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import RegNidImages from './RegNidImages';
import RegCaptureImage from './RegCaptureImage';
import RegPersonalDetails from './RegPersonalDetails';
import RegNominee from './RegNominee';
import RegSignature from './RegSignature';
import RegRiskGrading from './RegRiskGrading';
import RegFaceConfirm from './RegFaceConfirm';
import RegComplete from './RegComplete';

export class RegFaceMain extends Component {

    state = {
        step: 1,
        //Account
        accountType: '',
        product: '',
        productName: '',
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
        presentAddress:'',
        permanentAddress:'',
        permanentAddressBangla:'',
        monthlyIncome:'',
        sourceOfFund: '',
        nationality:'',
        tin:'',
        //Step 4 
        jointArray: [],
       // showHide: false,
        //Step 5
        signature: '',
        signatureType: '',
        // Step 6
        onBoardingValue: "",
        geoRiskClient: '',
        foreignOrigin: '',
        highOfficial: "",
        closeHighOfficial: "",
        isClientIp: "",
        productType: "",
        occupation: "",
        businessName: "",
        professionName: "",
        yearlyTransaction: "",
        hasSourceOfFunds: "",

        //common for all component
        flag: 'data:image/jpeg;base64,',
        applicantEkycId:'',
        typeVerification:'',
        confirmFlag: false
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
        const account = localStorage.getItem("accountInfo");
        const acc = JSON.parse(account);
        this.setState({

            accountType: acc.accountType,
            product: acc.productCategory,
            productName:acc.productName,
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
handleOccupationChange = e =>{
    e.preventDefault();
    this.setState({occupation: e.target.value});
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
                console.log('there are some problems');
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
                console.log('there are some problems');
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

deteteRow = (index) => {
    const copyArray = Object.assign([], this.state.jointArray);
    copyArray.splice(index, 1);
    this.setState({ jointArray: copyArray })

}


    render() {
        const { step } = this.state;
        const {applicantEkycId, NidFront, NidFrontType, NidFrontOcr,  NidBack, NidBackOcr, NidBackType,loadingSpin, allData,flag, faceImage, showCamera, imageFlag, isEnable,validate,verifyToken, loading, applicantName,applicantNameBangla,applicantDob,applicantDobDate,applicantNidNo, motherName,motherNameBangla, fatherName,fatherNameBangla, spouseName, gender, profession, mobileNumber, presentAddress, permanentAddress,permanentAddressBangla,monthlyIncome,sourceOfFund,nationality,tin,signature, signatureType, jointArray, accountType, product, channelName,productName,typeVerification,confirmFlag,onBoardingValue,geoRiskClient,foreignOrigin,highOfficial,closeHighOfficial,isClientIp,productType,occupation,businessName,professionName,yearlyTransaction,hasSourceOfFunds } = this.state;
        const values = {applicantEkycId, NidFront,NidFrontOcr,NidFrontType, NidBack, NidBackOcr, NidBackType,loadingSpin,allData, flag, faceImage, showCamera, imageFlag, isEnable,validate,verifyToken, loading,applicantName,applicantNameBangla,applicantDob,applicantDobDate,applicantNidNo, motherName,motherNameBangla, fatherName,fatherNameBangla, spouseName, gender, profession, mobileNumber, presentAddress, permanentAddress,permanentAddressBangla,monthlyIncome,sourceOfFund,nationality,tin,signature, signatureType, jointArray, accountType, product, channelName,productName,typeVerification,confirmFlag,onBoardingValue,geoRiskClient,foreignOrigin,highOfficial,closeHighOfficial,isClientIp,productType,occupation,businessName,professionName,yearlyTransaction,hasSourceOfFunds }

        switch (step) {
            case 1:
                return (
                    <RegNidImages
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 2:
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

            case 3:
                return (
                    <RegPersonalDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )

            case 4:
                return (
                    <RegNominee
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

            case 5:
                return (
                    <RegSignature
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

                case 6:
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

            case 7:
                return (
                    <RegFaceConfirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 8:
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
