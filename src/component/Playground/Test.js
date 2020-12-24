import React, { Component } from 'react';
import axios from 'axios';
import { NotificationManager } from "react-notifications";
import { textMatch } from './../E-KYC/Url/ApiList';

export class Test extends Component {

  async componentDidMount() {
    // Text Matching

    const config1 = {
      headers: {
        'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
      }
    };
    try {


      let payload = {
        "template": [
          {
            "key": "applicantName",
            "value": ["Md. Mehedi Hasan", "Mehedi Hasan Ishan"]
          },
          {
            "key": "applicantNameBangla",
            "value": ["Mehedi", "Mehedi"]
          },
          {
            "key": "fatherNameBangla",
            "value": ["Mahabub", "Mahabub"]
          },
          {
            "key": "motherNameBangla",
            "value": ["Manoara Begum", "Mrs.Manoara Begum"]
          }

        ]
      }

      let txtMatchApI = await axios.post(textMatch, payload, config1);
      console.log("textMatch", txtMatchApI.data.data);
      let txtObj = txtMatchApI.data.data;

      // if (txtObj.applicantName < 80) {
      //   NotificationManager.error("Applicant Name is less than 80%", "Error", 5000);
      //   return;
      // }

      // if (txtObj.applicantNameBangla < 80) {
      //   NotificationManager.error("Applicant Name Bangla is less than 80%", "Error", 5000);
      //   return;
      // }

      // if (txtObj.fatherNameBangla < 80) {
      //   NotificationManager.error("Father Name  Bangla is less than 80%", "Error", 5000);
      //   return;
      // }

      // if (txtObj.motherNameBangla < 80) {
      //   NotificationManager.error("Mother Name Bangla is less than 80%", "Error", 5000);
      //   return;
      // }

      if (txtObj.applicantName < 80 || txtObj.applicantNameBangla < 80 || txtObj.fatherNameBangla < 80 || txtObj.motherNameBangla < 80) {
        NotificationManager.warning(`Applicant Name required greater than 80%, current ${txtObj.applicantName}`, "Warning", 10000);
        NotificationManager.warning(`Applicant Name Bangla required greater than 80%, current ${txtObj.applicantNameBangla}`, "Warning", 10000);
        NotificationManager.warning(`Father Name Bangla required greater than 80%, current ${txtObj.fatherNameBangla}`, "Warning", 10000);
        NotificationManager.warning(`Mother Name Bangla required greater than 80%, current ${txtObj.motherNameBangla}`, "Warning", 10000);
        return;
      }



    } catch (error) {
      console.log(error.response);
      if (error.response) {

        let message = error.response.data.message
        NotificationManager.error(message, "Error", 5000);
      } else if (error.request) {
        // console.log("Error Connecting...", error.request)
        NotificationManager.error("Error Connecting...", "Error", 5000);
      } else if (error) {
        NotificationManager.error(error.toString(), "Error", 5000);
      }
    }

  }

  render() {
    return (
      <div>
        <h1> Hello</h1>
      </div>
    )
  }
}

export default Test;
