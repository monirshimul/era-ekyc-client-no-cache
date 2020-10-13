import React, { Component } from 'react';
import PersonalandFile from '../MulitStepUpgrade.js/PersonalandFile';
import RiskGrading from './RiskGrading';

export class MultiUpgrade extends Component {
  state = {
    step: 1,
    // Step 1 == Personal Details + Additional File
    applicantId: this.props.location.state,
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
    riskGradingArray: [],

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
    const { monthlyIncome, sourceOfFund, nationality, passport, passportFileName, passFileType, birthCertificate, birthCertificateFileName, birthCerFileType, tinCertificate, tinCertificateFileName, tinFileType, riskGradingArray } = this.state;
    const values = { monthlyIncome, sourceOfFund, nationality, passport, passportFileName, passFileType, birthCertificate, birthCertificateFileName, birthCerFileType, tinCertificate, tinCertificateFileName, tinFileType, riskGradingArray };
    // console.log("appid", this.props.location.state);
    switch (step) {
      case 1:
        return (
          <PersonalandFile
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleState={this.handleState}
            values={values}
          />
        )

      case 2:
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
    }

    return (
      <div>

      </div>
    )
  }
}

export default MultiUpgrade;
