import React, { Component } from 'react'
import NidImage from './NidImage';
import CaptureImage from './CaptureImage';
import PersonalDetails from './PersonalDetails';
import Signature from './Signature';
import Nominee from './Nominee';
import Confirm from './Confirm';
import Success from './Success';
import { formatDate } from './utils/DateFormat';
import { image } from './images/images';

export class MainFace extends Component {

    state = {
        step: 1,
        //Account
        accountType: '',
        product: '',
        //Step1
        NidFront: "",
        NidFrontType: '',
        NidBack: '',
        NidBackType: '',
        //Step2

        faceImage: "",
        showCamera: false,
        imageFlag: false,
        isEnable: false,
        nidNo: '',
        dob: '',
        loading: false,
        //step3
        applicantName: '',
        motherName: '',
        fatherName: '',
        spouseName: '',
        gender: '',
        profession: '',
        mobileNumber: '',
        presentAddress: '',
        permanentAddress: '',
        //Step 4 
        jointArray: [],
        //Step 5
        signature: '',
        signatureType: '',
        //common for all component
        flag: 'data:image/jpeg;base64,'
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
                product: acc.product
            })
          
        } catch (e) {

        }
    //     //Step 1 NID IMAGES
    //     if('NidImage' in localStorage){
    //         let data = JSON.parse(localStorage.getItem('NidImage'));
    //         console.log(data);
    //         this.setState({ 
    //           NidFront: data.NidFront,
    //           NidFrontType: data.NidFrontType,
    //           NidBack:data.NidBack,
    //           NidBackType:data.NidBackType

    //         })
    //    }

    //          //   Step 2 Capture Image
    //          if('CaptureImage' in localStorage){
    //             let data = JSON.parse(localStorage.getItem('CaptureImage'));
    //            // console.log(data);
    //             this.setState({ 
    //                 faceImage: data.faceImage,
    //                 imageFlag:data.imageFlag
    //             });
    //        } 

    //        //Step 3 ==== > Personal Details
    //        if('PersonalDetailsJoin' in localStorage){
    //             let data = JSON.parse(localStorage.getItem('PersonalDetailsJoin'));
    //             this.setState({
    //                 applicantName: data.applicantName,
    //                 motherName: data.motherName,
    //                 fatherName: data.fatherName,
    //                 spouseName: data.spouseName,
    //                 gender: data.gender,
    //                 profession: data.profession,
    //                 mobileNumber: data.mobileNumber,
    //                 presentAddress: data.presentAddress,
    //                 permanentAddress: data.permanentAddress,
    //             });
    //        }

    //        //Step===4 ================= Nominee 
    //        if("NomineeArray" in localStorage){
    //         let data = JSON.parse(localStorage.getItem("NomineeArray"));
    //         this.setState({
    //           jointArray:data  
    //         })
    //     }

    //     // Step ==== "Signature"
    //     if("Signature" in localStorage){
    //         let data = JSON.parse(localStorage.getItem("Signature"));
    //         this.setState({
    //             signature: data.signature,
    //             signatureType: data.signatureType
    //         })
    //     }

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

  

    addNomineeOne = ()=> {
        let copyArray = Object.assign([], this.state.jointArray);
        copyArray.push({ nominee: '', dob:'',relation:'',photograph:'', percentage:"", isShow: true });
        this.setState({jointArray:copyArray});
    }

    addNomineeTwo = ()=> {
        let copyArray = Object.assign([], this.state.jointArray);
        copyArray.push({ minorNominee: '',minorGuarrdian:'',minorAddress:'',minorRelation:'',minorNidGuardian:'',minorPhotoGuardian:'',minorPercentage:'', isShow: false });
        this.setState({jointArray:copyArray});
    }


    handleInputChange = (index, event) => {
        console.log(event.target);
        let copyArray = Object.assign([], this.state.jointArray);
        if (event.target.name === "nominee") {
         copyArray[index].nominee = event.target.value;
     } else if (event.target.name === "minorNominee") {
         copyArray[index].minorNominee = event.target.value;
     }else if (event.target.name === "relation") {
         copyArray[index].relation = event.target.value;
     }else if (event.target.name === "minorRelation") {
         copyArray[index].minorRelation = event.target.value;

     }else if (event.target.name === "percentage") {
        copyArray[index].percentage = event.target.value;
    }else if (event.target.name === "minorPercentage") {
        copyArray[index].minorPercentage = event.target.value;
    }else if (event.target.name === 'dob') {
         copyArray[index].dob = event.target.value;
     }else if (event.target.name === 'dob') {
             copyArray[index].dob = event.target.value;
     }else if (event.target.name === "minorGuarrdian") {
         copyArray[index].minorGuarrdian = event.target.value;
     }else if (event.target.name === "minorAddress") {
         copyArray[index].minorAddress = event.target.value;
     }else if (event.target.name === "minorNidGuardian") {
        copyArray[index].minorNidGuardian = event.target.value;
    }
     
     else if (event.target.name === "photograph") {
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
    //  else if (event.target.name === "minorNidGuardian") {
    //      if (event.target.files[0]) {
    //          let file = event.target.files[0];
    //          //console.log(file.type);
    //          var reader = new FileReader();
    //          reader.readAsBinaryString(file);
 
    //          reader.onload = () => {
 
    //              let base64Image = btoa(reader.result);
 
    //              copyArray[index].minorNidGuardian = base64Image;
    //          };
    //          reader.onerror = () => {
    //              console.log('there are some problems');
    //              alert('File can not be read');
    //          };
    //      }
    //  }
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
        const { NidFront, NidFrontType, NidBack, NidBackType, flag, faceImage, showCamera, imageFlag, isEnable, nidNo, dob, loading, applicantName, motherName, fatherName, spouseName, gender, profession, mobileNumber, presentAddress, permanentAddress, signature, signatureType, jointArray, accountType, product } = this.state;
        const values = { NidFront, NidFrontType, NidBack, NidBackType, flag, faceImage, showCamera, imageFlag, isEnable, nidNo, dob, loading, applicantName, motherName, fatherName, spouseName, gender, profession, mobileNumber, presentAddress, permanentAddress, signature, signatureType, jointArray, accountType, product }


        switch (step) {
            case 1:
                return (
                    <NidImage
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 2:
                return (
                    <CaptureImage
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
                    <PersonalDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )

            case 4:
                return (
                    <Nominee
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleState={this.handleState}
                        onChange={this.handleInputChange}
                        addNomineeOne={this.addNomineeOne}
                        addNomineeTwo={this.addNomineeTwo}
                        deteteRow={this.deteteRow}
                        values={values}
                    />
                )

            case 5:
                return (
                    <Signature
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 6:
                return (
                    <Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                    />
                )

            case 7:
                return <Success />


        }

        return (
            <div>

            </div>
        )
    }
}

export default MainFace;
