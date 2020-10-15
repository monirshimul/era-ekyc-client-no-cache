import React, { Component } from 'react';
import PersonalDetails from './PersonalDetails';
import RiskGrading from './RiskGrading';
import FileUpload from './FileUpload';
import GridView from './GridView';
import Complete from './Complete';

export class MultiUpgrade extends Component {
  state = {
    step: 1,
    // Step 1 == Personal Details + Additional File
    applicantId: this.props.location.state.id,
    monthlyIncome: '',
    sourceOfFund: '',
    nationality: '',
    passport: "",
    passportFileName: '',
    passFileType: "",
    birthCertificate: "",
    birthCertificateFileName: '',
    birthCerFileType: "",
    tinCertificate: "",
    tinCertificateFileName: '',
    tinFileType: "",

    // Step2 === RiskGrading
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
    riskGradingArray: [],

    // loading 
    confirmFlag: false,
    flag: 'data:image/jpeg;base64,',
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

  //handle state change
  handleState = (input, data) => {
    this.setState({ [input]: data });
  }

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  }

  // RiskGrading handling Occupation
  handleOccupationChange = e => {
    this.setState({ occupation: e.target.value });
  }



  render() {
    const { step } = this.state;
    const { applicantId, monthlyIncome, sourceOfFund, nationality, passport, passportFileName, passFileType, birthCertificate, birthCertificateFileName, birthCerFileType, tinCertificate, tinCertificateFileName, tinFileType, onBoardingValue, geoRiskClient, foreignOrigin, highOfficial, closeHighOfficial, isClientIp, productTypes, occupation, businessName, professionName, yearlyTransaction, hasSourceOfFunds, riskGradingArray, confirmFlag, flag, channelAccStatus } = this.state;
    const values = { applicantId, monthlyIncome, sourceOfFund, nationality, passport, passportFileName, passFileType, birthCertificate, birthCertificateFileName, birthCerFileType, tinCertificate, tinCertificateFileName, tinFileType, onBoardingValue, geoRiskClient, foreignOrigin, highOfficial, closeHighOfficial, isClientIp, productTypes, occupation, businessName, professionName, yearlyTransaction, hasSourceOfFunds, riskGradingArray, confirmFlag, flag, channelAccStatus };
   
    switch (step) {
      case 1:
        return (
          <PersonalDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleState={this.handleState}
            values={values}
          />
        )

      case 2:
        return (
          <FileUpload
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleState={this.handleState}
            values={values}
          />
        )

      case 3:
        return (
          <RiskGrading
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleOccupationChange={this.handleOccupationChange}
            handleState={this.handleState}
            values={values}
          />
        )

      case 4:
        return (
          <GridView
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleState={this.handleState}
            values={values}
          />
        )

      case 5:
        return (
          <Complete
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

export default MultiUpgrade;
