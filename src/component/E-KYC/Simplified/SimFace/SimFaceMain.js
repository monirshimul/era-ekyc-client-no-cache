import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import NidImagesSim from './NidImagesSim';
import SimCaptureImage from './SimCaptureImage';
import SimPersonalDetails from './SimPersonalDetails';
import SimNominee from './SimNominee';
import SimSignature from './SimSignature';
import SimConfirmInfo from './SimConfirmInfo';
import SimComplete from './SimComplete';
import { NotificationManager } from "react-notifications"


export class SimFaceMain extends Component {
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
        //Step 4 
        jointArray: [],
       // showHide: false,
        //Step 5
        signature: '',
        signatureType: '',
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
      
    } catch (error) {
        if (error.response) {
            let message = error.response.data.message
            //console.log("Error",error.response)
            NotificationManager.error(message, "Error", 5000);
        } else if (error.request) {
            console.log("Error Connecting...", error.request)
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
        const {applicantEkycId, NidFront, NidFrontType, NidFrontOcr,  NidBack, NidBackOcr, NidBackType,loadingSpin, allData,flag, faceImage, showCamera, imageFlag, isEnable,validate,verifyToken, loading, applicantName,applicantNameBangla,applicantDob,applicantDobDate,applicantNidNo, motherName,motherNameBangla, fatherName,fatherNameBangla, spouseName, gender, profession, mobileNumber, presentAddress, permanentAddress,permanentAddressBangla, signature, signatureType, jointArray, accountType, product, channelName,productName,typeVerification,confirmFlag } = this.state;
        const values = {applicantEkycId, NidFront,NidFrontOcr,NidFrontType, NidBack, NidBackOcr, NidBackType,loadingSpin,allData, flag, faceImage, showCamera, imageFlag, isEnable,validate,verifyToken, loading,applicantName,applicantNameBangla,applicantDob,applicantDobDate,applicantNidNo, motherName,motherNameBangla, fatherName,fatherNameBangla, spouseName, gender, profession, mobileNumber, presentAddress, permanentAddress,permanentAddressBangla, signature, signatureType, jointArray, accountType, product, channelName,productName,typeVerification,confirmFlag }


        switch (step) {
            case 1:
                return (
                    <NidImagesSim
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 2:
                return (
                    <SimCaptureImage
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
                    <SimPersonalDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )

            case 4:
                return (
                    <SimNominee
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
                    <SimSignature
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 6:
                return (
                    <SimConfirmInfo
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 7:
                return (
                <SimComplete 
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

export default withRouter(SimFaceMain);
