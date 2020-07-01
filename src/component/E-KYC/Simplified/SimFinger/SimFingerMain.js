import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import NidImagesSim from '../SimFace/NidImagesSim';
import SimFingerPrint from '../SimFinger/SimFingerPrint';
import SimPersonalDetails from '../SimFace/SimPersonalDetails';
import SimNominee from '../SimFace/SimNominee';
import SimCutomerPic from './SimCutomerPic';
import SimSignature from '../SimFace/SimSignature';
import SimFingerConfirm from '../SimFinger/SimFingerConfirm';
import SimComplete from '../SimFace/SimComplete';

export class SimFingerMain extends Component {
    state = {
        step: 1,
        //Account
        accountType: '',
        product: '',
        productName:'',
        channelName: '',
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
        nid: "",
        dob: "",
        rIndex: "",
        rThumb: "",
        lIndex: "",
        lThumb: "",
        isEnableFinger: false,
        loadingPrint: false,
        verifyToken: "",
        //step3
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
        presentAddress: '',
        permanentAddress: '',
        permanentAddressBangla: '',
       
        //Step 4 
        jointArray: [],
        // showHide: false,
        //Step 5
        faceImage: "",
        showCamera: false,
        imageFlag: false,
        isEnable: false,
        validate: false,
        loading: false,
        //Step 6
        signature: '',
        signatureType: '',
        //common for all component
        applicantEkycId: '',
        flag: 'data:image/jpeg;base64,',
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



    addNomineeOne = () => {
        let copyArray = Object.assign([], this.state.jointArray);
        copyArray.push({ nominee: '', dob: '', relation: '', photograph: '', percentage: '', isShow: true });
        this.setState({ jointArray: copyArray });
    }

    addNomineeTwo = () => {
        let copyArray = Object.assign([], this.state.jointArray);
        copyArray.push({ minorNominee: '', minorDob: '', minorRelationWAccH: '', minorNomineePhoto: '', minorPercentage: '', minorGuardianNid: '', minorGuardianName: '', guardianRelationWMinor: '', minorGuardianAddress: '', minorPhotoGuardian: '', isShow: false });
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
        
        const {applicantEkycId, NidFront, NidFrontType, NidFrontOcr, NidBack, NidBackOcr, NidBackType,loadingSpin, allData, flag, nid,dob,rIndex,rThumb,lIndex,lThumb, isEnableFinger, loadingPrint, verifyTokenFinger, applicantName, applicantNameBangla, applicantDob, applicantDobDate, applicantNidNo, motherName, motherNameBangla, fatherName, fatherNameBangla, spouseName, gender, profession, mobileNumber, presentAddress, permanentAddress, permanentAddressBangla, faceImage, showCamera, imageFlag, isEnable, validate, verifyToken, loading,
           signature, signatureType, jointArray, accountType, product, channelName,productName,confirmFlag } = this.state;
       
            const values = { applicantEkycId,NidFront, NidFrontOcr, NidFrontType, NidBack, NidBackOcr, NidBackType,loadingSpin, allData, flag,nid,dob,rIndex,rThumb,lIndex,lThumb, isEnableFinger, loadingPrint, verifyTokenFinger, applicantName, applicantNameBangla, applicantDob, applicantDobDate, applicantNidNo, motherName, motherNameBangla, fatherName, fatherNameBangla, spouseName, gender, profession, mobileNumber, presentAddress, permanentAddress, permanentAddressBangla, faceImage, showCamera, imageFlag, isEnable, validate, verifyToken, loading,
            signature, signatureType, jointArray, accountType, product, channelName,productName,confirmFlag }


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
                    <SimFingerPrint
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        //handleDate={this.handleDate}
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
                    <SimCutomerPic
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
                    <SimSignature
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 7:
                return (
                    <SimFingerConfirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleState={this.handleState}
                        values={values}
                    />
                )

            case 8:
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

export default withRouter(SimFingerMain);