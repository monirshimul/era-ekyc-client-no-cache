import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import {
    zoneCodeConversion,
    division, district,
    upozila, union, profession,
    textMatch, translate,
    getDivNative, getDistNative,
    getUpaNative, getUniNative
} from '../../Url/ApiList';
import Loading from '../utils/CustomLoding/Loading';

import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { largeTime } from '../../../Utils/notificationTime';
import { convertTranslate } from '../../../Utils/Translate';
import { Fragment } from 'react';
import { options } from '@hapi/joi';


const Joi = require('@hapi/joi');


export class SimPersonalDetails extends Component {

    state = {
        autoPerDivision: [],
        perDivisionCode: "",
        autoPreDivision: [],
        preDivisionCode: "",
        autoPerDistrict: [],
        perDistrictCode: "",
        autoPreDistrict: [],
        preDistrictCode: '',

        autoPerUpozila: [],
        perUpozilaCode: "",
        autoPreUpozila: [],
        preUpozilaCode: '',

        autoPerUnion: [],
        perUnionCode: "",
        autoPreUnion: [],
        preUnionCode: '',

        autoProfession: [],
        // professionCode: ""


        //New Native Division, District, UpaZilla, Union For Permanent=======>
        nativeDivPermanent: [],
        nativeDivPresent: []


    }


    async componentDidMount() {
        let { values } = this.props;
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };

        // Get New Division from Native Server

        try {
            let getDiv = await axios.get(getDivNative, config)
            console.log("Res", getDiv.data.data)
            this.setState({
                nativeDivPermanent: getDiv.data.data,
                nativeDivPresent: getDiv.data.data
            })

        } catch (error) {
            console.log("Error====>", error)
            if (error.response) {
                let message = error.response.data.message
                NotificationManager.error(message, "Click to Remove", largeTime);
            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Click to Remove", largeTime);
            } else if (error) {
                NotificationManager.error(error.toString(), "Click to Remove", largeTime);

            }
        }



        let createArray = [{ key: "fatherName", value: values.fatherNameBangla }, { key: "motherName", value: values.motherNameBangla }];

        if (values.spouseName !== "") {
            createArray.push({ key: "spouseName", value: values.spouseName });
        }

        let translateArray = convertTranslate(createArray);

        // console.log("translateArrayShow", translateArray);

        let translateObj = {
            translationTemplate: translateArray,
            language: "en"
        }

        try {
            let translateRes = await axios.post(translate, translateObj, config);
            // console.log("translation", translateRes.data);
            let translateData = translateRes.data.data;

            this.props.handleState('fatherName', translateData.fatherName);
            this.props.handleState('motherName', translateData.motherName);

            if (translateData.spouseName) {
                this.props.handleState('spouseName', translateData.spouseName);
            }
        } catch (error) {
            if (error.response) {
                let message = error.response.data.message
                NotificationManager.error(message, "Click to Remove", largeTime);
            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Click to Remove", largeTime);
            } else if (error) {
                NotificationManager.error(error.toString(), "Click to Remove", largeTime);

            }
        }
    }





    schema = Joi.object({
        applicantName: Joi.string().required(),
        applicantNameBangla: Joi.string().required(),
        applicantDob: Joi.string().required(),
        applicantNidNo: Joi.string().required(),
        MobileNumber: Joi.string().pattern(new RegExp('^01[3456789][0-9]{8}'))
            .required()
            .messages({
                "string.pattern.base": `Please Provide Valid Mobile Number`,
            }),
        gender: Joi.string().required(),
        //profession: Joi.string().min(1).required().error(() => { return { message: 'Please Select a Valid Profession From list' } }),
        // profession: Joi.string().min(1).required(),
        motherName: Joi.string().required(),
        motherNameBangla: Joi.string().required(),
        fatherName: Joi.string().required(),
        fatherNameBangla: Joi.string().required(),
        permanentAddressDivision: Joi.string().required(),
        permanentAddressDivisionEn: Joi.string().required(),
        presentAddressDivision: Joi.string().required(),
        presentAddressDivisionEn: Joi.string().required(),
        permanentAddressDistrict: Joi.string().required(),
        permanentAddressDistrictEn: Joi.string().required(),
        presentAddressDistrict: Joi.string().required(),
        presentAddressDistrictEn: Joi.string().required(),
        permanentAddressUpozila: Joi.string().required(),
        permanentAddressUpozilaEn: Joi.string().required(),
        presentAddressUpozila: Joi.string().required(),
        presentAddressUpozilaEn: Joi.string().required(),
        permanentAddressUnionOrWard: Joi.string().required(),
        permanentAddressUnionOrWardEn: Joi.string().required(),
        presentAddressUnionOrWard: Joi.string().required(),
        presentAddressUnionOrWardEn: Joi.string().required(),

        // Code division, district , upazila, union
        permanentDivisionCode: Joi.string().required(),
        permanentDistrictCode: Joi.string().required(),
        permanentUpazilaCode: Joi.string().required(),
        permanentUnionCode: Joi.string().required(),
        presentDivisionCode: Joi.string().required(),
        presentDistrictCode: Joi.string().required(),
        presentUpazilaCode: Joi.string().required(),
        presentUnionCode: Joi.string().required()

    })



    /////////////////////////////////////////AutoFeature Function Start//////////////////////////////////

    //////////Profession///////////////

    handleProfessionChange = async (e) => {
        let { values } = this.props;
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        //console.log(e.target.value)
        let payload = {
            channelCode: values.channelName,
            keyword: e.target.value
        }
        try {
            let professionapi = await axios.post(profession, payload, config);
            //  console.log(professionapi.data.data);
            let autocompleteData = [];
            professionapi.data.data.forEach((d) => {
                autocompleteData.push({ name: d.displayName, id: d.id, code: d.code })
            })
            this.setState({ autoProfession: autocompleteData });
        } catch (err) {
            console.log(err);
        }
    }

    handleProfessionSelect = e => {
        let { autoProfession } = this.state;
        try {
            // const val = e.target.value.split('-');
            //   console.log("val", typeof val[1]);
            // console.log(e.target.value);
            //console.log("val", val[1]);
            this.props.handleState('profession', e.target.value);
            let proCode = "";
            for (let i = 0; i <= autoProfession.length; i++) {

                if (autoProfession[i]["name"] === e.target.value) {
                    proCode = autoProfession[i]["code"]
                    // console.log("Code",proCode)
                    this.props.handleState("professionCode", proCode);
                }

            }


        } catch (err) {
            console.log(err);
        }

    }



    //////////Profession///////////////

    /////////////Division START

    handlePerDivisionChange = async (e) => {
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        //console.log(e.target.value)
        let payload = {
            keyword: e.target.value
        }
        try {
            let divisionapi = await axios.post(division, payload, config);
            // console.log(divisionapi.data.data);
            let autocompleteData = [];
            divisionapi.data.data.forEach((d) => {
                autocompleteData.push({ name: d.divisionName, id: d.divisionCode })
            })
            this.setState({ autoPerDivision: autocompleteData });
        } catch (err) {
            console.log(err);
        }
    }

    handlePreDivisionChange = async (e) => {
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        //console.log(e.target.value)
        let payload = {
            keyword: e.target.value
        }
        try {
            let divisionapi = await axios.post(division, payload, config);
            //console.log(divisionapi.data.data);
            let autocompleteData = [];
            divisionapi.data.data.forEach((d) => {
                autocompleteData.push({ name: d.divisionName, id: d.divisionCode })
            })
            this.setState({ autoPreDivision: autocompleteData });
        } catch (err) {
            console.log(err);
        }
    }

    handlePerDivisionSelect = e => {
        try {
            const val = e.target.value.split(':');
            //   console.log("val", typeof val[1]);
            //    console.log("val", val[1]);

            this.setState({
                perDivisionCode: val[1].trim()
            })
            this.props.handleState('perDivisionEn', val[0].trim());
        } catch (err) {
            console.log(err);
        }

    }

    handlePreDivisionSelect = e => {
        try {
            const val = e.target.value.split(':');
            // console.log("val", val);
            this.setState({
                preDivisionCode: val[1].trim()
            })
            this.props.handleState('preDivisionEn', val[0].trim());
        } catch (err) {
            console.log(err);
        }
    }

    /////////////Division end

    /////////////District Start

    handlePerDistrictChange = async (e) => {
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        //  console.log(e.target.value)

        let payload = {
            divisionCode: this.state.perDivisionCode.toString(),
            keyword: e.target.value
        }
        // console.log("pERMANT", payload)

        try {
            let districtapi = await axios.post(district, payload, config);
            //     console.log("api response", districtapi.data);
            let autocompleteData = [];
            districtapi.data.data.forEach((d) => {
                autocompleteData.push({ name: d.districtName, id: d.districtCode })
            })
            this.setState({ autoPerDistrict: autocompleteData });
        } catch (err) {
            console.log(err);
        }
    }

    handlePreDistrictChange = async (e) => {
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        console.log(e.target.value)
        let payload = {
            divisionCode: this.state.preDivisionCode.toString(),
            keyword: e.target.value
        }
        try {
            let districtapi = await axios.post(district, payload, config);
            //  console.log(districtapi.data.data);
            let autocompleteData = [];
            districtapi.data.data.forEach((d) => {
                autocompleteData.push({ name: d.districtName, id: d.districtCode })
            })
            this.setState({ autoPreDistrict: autocompleteData });
        } catch (err) {
            console.log(err);
        }
    }


    handlePerDistrictSelect = e => {
        try {
            const val = e.target.value.split(':');
            //  console.log("val", val);
            this.setState({
                perDistrictCode: val[1].trim()
            })
            this.props.handleState('perDistrictEn', val[0].trim());
        } catch (err) {
            console.log(err);
        }
    }

    handlePreDistrictSelect = e => {
        try {
            const val = e.target.value.split(':');
            //   console.log("val", val);
            this.setState({
                preDistrictCode: val[1].trim()
            })
            this.props.handleState('preDistrictEn', val[0].trim());
        } catch (err) {
            console.log(err);
        }
    }
    /////////////District end

    /////////////Upozila Start
    handlePerUpozilaChange = async (e) => {
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        // console.log(e.target.value)

        let payload = {
            divisionCode: this.state.perDivisionCode.toString(),
            districtCode: this.state.perDistrictCode.toString(),
            keyword: e.target.value
        }
        // console.log("pERMANT", payload)

        try {
            let upozilaapi = await axios.post(upozila, payload, config);
            //  console.log("api response", upozilaapi.data);
            let autocompleteData = [];
            upozilaapi.data.data.forEach((d) => {
                autocompleteData.push({ name: d.upazilaName, id: d.upazilaCode })
            })
            this.setState({ autoPerUpozila: autocompleteData });
        } catch (err) {
            console.log(err);
        }
    }

    handlePreUpozilaChange = async (e) => {
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        // console.log(e.target.value)

        let payload = {
            divisionCode: this.state.preDivisionCode.toString(),
            districtCode: this.state.preDistrictCode.toString(),
            keyword: e.target.value
        }
        // console.log("present", payload)

        try {
            let upozilaapi = await axios.post(upozila, payload, config);
            //   console.log("api response", upozilaapi.data);
            let autocompleteData = [];
            upozilaapi.data.data.forEach((d) => {
                autocompleteData.push({ name: d.upazilaName, id: d.upazilaCode })
            })
            this.setState({ autoPreUpozila: autocompleteData });
        } catch (err) {
            console.log(err);
        }
    }


    handlePerUpozilaSelect = e => {
        try {
            const val = e.target.value.split(':');
            // console.log("val", val);
            this.setState({
                perUpozilaCode: val[1].trim()
            })
            this.props.handleState('perUpozilaEn', val[0].trim());
        } catch (err) {
            console.log(err);
        }
    }

    handlePreUpozilaSelect = e => {
        try {
            const val = e.target.value.split(':');
            // console.log("val", val);
            this.setState({
                preUpozilaCode: val[1].trim()
            })
            this.props.handleState('preUpozilaEn', val[0].trim());
        } catch (err) {
            console.log(err);
        }
    }

    /////////////Upozila End

    /////////////Union Start
    handlePerUnionChange = async (e) => {
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        // console.log(e.target.value)

        let payload = {
            divisionCode: this.state.perDivisionCode.toString(),
            districtCode: this.state.perDistrictCode.toString(),
            upazilaCode: this.state.perUpozilaCode.toString(),
            keyword: e.target.value
        }
        // console.log("pERMANT", payload)

        try {
            let unionapi = await axios.post(union, payload, config);
            // console.log("api response", unionapi.data);
            let autocompleteData = [];
            unionapi.data.data.forEach((d) => {
                autocompleteData.push({ name: d.unionName, id: d.unionCode })
            })
            this.setState({ autoPerUnion: autocompleteData });
        } catch (err) {
            console.log(err);
        }
    }

    handlePreUnionChange = async (e) => {
        const config = {
            headers: {
                'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
            }
        };
        //console.log(e.target.value)

        let payload = {
            divisionCode: this.state.preDivisionCode.toString(),
            districtCode: this.state.preDistrictCode.toString(),
            upazilaCode: this.state.preUpozilaCode.toString(),
            keyword: e.target.value
        }


        try {
            let unionapi = await axios.post(union, payload, config);
            // console.log("api response", unionapi.data);
            let autocompleteData = [];
            unionapi.data.data.forEach((d) => {
                autocompleteData.push({ name: d.unionName, id: d.unionCode })
            })
            this.setState({ autoPreUnion: autocompleteData });
        } catch (err) {
            console.log(err);
        }
    }


    handlePerUnionSelect = e => {
        try {
            const val = e.target.value.split(':');
            // console.log("val", val);
            this.setState({
                perUnionCode: val[1].trim()
            })
            this.props.handleState('perUnionOrWardEn', val[0].trim());
        } catch (err) {
            console.log(err);
        }
    }

    handlePreUnionSelect = e => {
        try {
            const val = e.target.value.split(':');
            //console.log("val", val);
            this.setState({
                preUnionCode: val[1].trim()
            })
            this.props.handleState('preUnionOrWardEn', val[0].trim());
        } catch (err) {
            console.log(err);
        }
    }

    /////////////Union End




    //////////////////////////////////////AutoFeature Function End///////////////////////////////////////



    continue = async e => {
        const { values } = this.props;
        e.preventDefault();
        // console.log("All ec Values", values);
        // console.log("profession", values.professionCode);



        let data = {
            applicantName: values.applicantName,
            applicantNameBangla: values.applicantNameBangla,
            applicantDob: values.applicantDob,
            applicantNidNo: values.applicantNidNo,
            MobileNumber: values.mobileNumber,
            gender: values.gender,
            // profession: values.professionCode,
            motherName: values.motherName,
            motherNameBangla: values.motherNameBangla,
            fatherName: values.fatherName,
            fatherNameBangla: values.fatherNameBangla,
            permanentAddressDivision: values.perDivision,
            permanentAddressDivisionEn: values.perDivisionEn,
            presentAddressDivision: values.preDivision,
            presentAddressDivisionEn: values.preDivisionEn,
            permanentAddressDistrict: values.perDistrict,
            permanentAddressDistrictEn: values.perDistrictEn,
            presentAddressDistrict: values.preDistrict,
            presentAddressDistrictEn: values.preDistrictEn,
            permanentAddressUpozila: values.perUpozila,
            permanentAddressUpozilaEn: values.perUpozilaEn,
            presentAddressUpozila: values.preUpozila,
            presentAddressUpozilaEn: values.preUpozilaEn,
            permanentAddressUnionOrWard: values.perUnionOrWard,
            permanentAddressUnionOrWardEn: values.perUnionOrWardEn,
            presentAddressUnionOrWard: values.preUnionOrWard,
            presentAddressUnionOrWardEn: values.preUnionOrWardEn,

            // Code division, district , upazila, union
            permanentDivisionCode: values.perDivisionCode,
            permanentDistrictCode: values.perDistrictCode,
            permanentUpazilaCode: values.perUpozilaCode,
            permanentUnionCode: values.perUnionOrWardCode,
            presentDivisionCode: values.preDivisionCode,
            presentDistrictCode: values.preDistrictCode,
            presentUpazilaCode: values.preUpozilaCode,
            presentUnionCode: values.preUnionOrWardCode
        }



        try {

            const validationValue = await this.schema.validateAsync(data);
            //console.log("validationValue", validationValue)
            if (values.professionCode.length <= 1) {
                NotificationManager.error("Please Select a Valid Profession From list", "Click To Remove", largeTime);
                return;
            }

            ///////////////////// Text Matching Start /////////////////////////////

            const config1 = {
                headers: {
                    'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
                }
            };


            try {

                this.props.handleState('confirmFlag', true);
                let payload = {
                    "template": [
                        {
                            "key": "applicantName",
                            "value": [values.applicantName, values.ecApplicantName]
                        },
                        {
                            "key": "applicantNameBangla",
                            "value": [values.applicantNameBangla, values.ecApplicantNameBangla]
                        },
                        {
                            "key": "fatherNameBangla",
                            "value": [values.fatherNameBangla, values.ecFatherNameBangla]
                        },
                        {
                            "key": "motherNameBangla",
                            "value": [values.motherNameBangla, values.ecMotherNameBangla]
                        }

                    ]
                }


                let txtMatchApI = await axios.post(textMatch, payload, config1);
                // console.log("textMatch", txtMatchApI.data.data);
                this.props.handleState('confirmFlag', false);
                let txtObj = txtMatchApI.data.data;

                if (txtObj.applicantName < 80 || txtObj.applicantNameBangla < 80 || txtObj.fatherNameBangla < 80 || txtObj.motherNameBangla < 80) {
                    NotificationManager.info(`Applicant Name required match greater than 80%, current ${txtObj.applicantName}%`, "Click To Remove", largeTime);
                    NotificationManager.info(`Applicant Name Bangla required match greater than 80%, current ${txtObj.applicantNameBangla}%`, "Click To Remove", largeTime);
                    NotificationManager.info(`Father Name Bangla required match greater than 80%, current ${txtObj.fatherNameBangla}%`, "Click To Remove", largeTime);
                    NotificationManager.info(`Mother Name Bangla required match greater than 80%, current ${txtObj.motherNameBangla}%`, "Click To Remove", largeTime);
                    return;
                }
            } catch (error) {
                this.props.handleState('confirmFlag', false);
                console.log(error.response);
                if (error.response) {

                    let message = error.response.data.message
                    NotificationManager.error(message, "Click To Remove", largeTime);
                } else if (error.request) {
                    // console.log("Error Connecting...", error.request)
                    NotificationManager.error("Error Connecting...", "Click To Remove", largeTime);
                } else if (error) {
                    NotificationManager.error(error.toString(), "Click To Remove", largeTime);
                }
            }
            ///////////////////// Text Matching End /////////////////////////////

            if (values.step === "exist_2") {
                this.props.handleState("step", "exist_3");
            } else {
                this.props.nextStep();
            }


        } catch (error) {
            //console.log(error.response);
            NotificationManager.error(error.toString(), "Click to Remove", largeTime);
            console.log("error====>", error.response)
        }

    };

    back = e => {
        let { values } = this.props;
        e.preventDefault();
        if (values.step === "exist_2") {
            this.props.handleState("step", "exist_1");
        } else {
            this.props.prevStep();
        }

    }

    //================= Function Start ======================================
    getDistByDiv = async (code, type) => {

        try {
            const config = {
                headers: {
                    'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
                }
            };
            const data = {
                divisionCode: code
            }
            console.log("getDistByDiv", data)

            let getDist = await axios.post(getDistNative, data, config)
            console.log("Dist", getDist.data.data)
            if (type === "per") {
                this.props.handleState("nativeDistPermanent", getDist.data.data)
            } else {
                this.props.handleState("nativeDistPresent", getDist.data.data)
            }



        } catch (error) {
            console.log("Error=======>", error)
            if (error.response) {
                let message = error.response.data.message
                NotificationManager.error(message, "Click To Remove", largeTime);
            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Click To Remove", largeTime);
            } else if (error) {
                NotificationManager.error(error.toString(), "Click To Remove", largeTime);
            }
        }
    }

    getUpaByDist = async (distCode, divCode, type) => {

        try {
            const config = {
                headers: {
                    'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
                }
            };
            const data = {
                divisionCode: divCode,
                districtCode: distCode
            }
            console.log(data)

            let getUpa = await axios.post(getUpaNative, data, config)
            console.log("Dist", getUpa.data.data)
            if (type === "per") {
                this.props.handleState("nativeUpaPermanent", getUpa.data.data)
            } else {
                this.props.handleState("nativeUpaPresent", getUpa.data.data)
            }



        } catch (error) {
            console.log("Error=======>", error)
            if (error.response) {
                let message = error.response.data.message
                NotificationManager.error(message, "Click To Remove", largeTime);
            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Click To Remove", largeTime);
            } else if (error) {
                NotificationManager.error(error.toString(), "Click To Remove", largeTime);
            }
        }
    }

    getUniByUpa = async (upaCode, divCode, distCode, type) => {
        try {
            const config = {
                headers: {
                    'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
                }
            };
            const data = {
                divisionCode: divCode,
                districtCode: distCode,
                upazilaCode: upaCode
            }
            console.log(data)

            let getUni = await axios.post(getUniNative, data, config)
            console.log("Dist", getUni.data.data)
            if (type === "per") {
                this.props.handleState('nativeUniPermanent', getUni.data.data);
            } else {
                this.props.handleState('nativeUniPresent', getUni.data.data);
            }



        } catch (error) {
            console.log("Error=======>", error)
            if (error.response) {
                let message = error.response.data.message
                NotificationManager.error(message, "Click To Remove", largeTime);
            } else if (error.request) {
                // console.log("Error Connecting...", error.request)
                NotificationManager.error("Error Connecting...", "Click To Remove", largeTime);
            } else if (error) {
                NotificationManager.error(error.toString(), "Click To Remove", largeTime);
            }
        }
    }


    //================= Function End ======================================


    //========================================================================================================================
    // Change Permanent Division
    changeDivPermanent = async (e) => {
        e.preventDefault();
        let divName = e.target.options[e.target.selectedIndex].text
        this.props.handleState("perDivisionEn", divName)
        this.props.handleState("perDivisionCode", e.target.value)
        // Ey division er district er jonno api call====================>
        await this.getDistByDiv(e.target.value, "per")

    }


    // Change Permanent District 
    changeDistPermanent = async (e) => {
        e.preventDefault();
        let { values } = this.props
        let distName = e.target.options[e.target.selectedIndex].text
        this.props.handleState("perDistrictEn", distName)
        this.props.handleState("perDistrictCode", e.target.value)
        await this.getUpaByDist(e.target.value, values.perDivisionCode, "per")
    }

    // Change Permanent Upazilla 
    changeUpaPermanent = async (e) => {
        e.preventDefault();
        let { values } = this.props
        let upaName = e.target.options[e.target.selectedIndex].text
        this.props.handleState("perUpozilaEn", upaName)
        this.props.handleState("perUpozilaCode", e.target.value)
        await this.getUniByUpa(e.target.value, values.perDivisionCode, values.perDistrictCode, "per")
    }

    changeUniPermanent = async (e) => {
        e.preventDefault();
        let { values } = this.props
        let uniName = e.target.options[e.target.selectedIndex].text
        this.props.handleState("perUnionOrWardEn", uniName)
        this.props.handleState("perUnionOrWardCode", e.target.value)
    }

    //=====================================================================================================================


    // Change Present Division
    changeDivPresent = async (e) => {
        //let { values } = this.props;
        e.preventDefault();
        let divName = e.target.options[e.target.selectedIndex].text
        //console.log("e.tar", e.target.value)
        this.props.handleState("preDivisionEn", divName)
        this.props.handleState("preDivisionCode", e.target.value)
        await this.getDistByDiv(e.target.value, "pre")
    }

    // Change Present District 
    changeDistPresent = async (e) => {
        e.preventDefault();
        let { values } = this.props
        let distName = e.target.options[e.target.selectedIndex].text
        this.props.handleState("preDistrictEn", distName)
        this.props.handleState("preDistrictCode", e.target.value)
        await this.getUpaByDist(e.target.value, values.preDivisionCode, "pre")
    }
    // Change Present Upazilla 
    changeUpaPresent = async (e) => {
        e.preventDefault();
        let { values } = this.props
        let upaName = e.target.options[e.target.selectedIndex].text
        this.props.handleState("preUpozilaEn", upaName)
        this.props.handleState("preUpozilaCode", e.target.value)

        await this.getUniByUpa(e.target.value, values.preDivisionCode, values.preDistrictCode, "pre")
    }

    changeUniPresent = async (e) => {
        e.preventDefault();
        let uniName = e.target.options[e.target.selectedIndex].text
        this.props.handleState("preUnionOrWardEn", uniName)
        this.props.handleState("preUnionOrWardCode", e.target.value)
    }





    Escape = () => {
        this.props.nextStep();
    }

    render() {
        const { values, handleChange } = this.props;
        const { nativeDivPermanent, nativeDivPresent, nativeDistPermanent, nativeDistPresent, nativeUpaPermanent, nativeUpaPresent, nativeUniPermanent, nativeUniPresent } = this.state
        console.log("perDivision", values.perDivisionEn);
        console.log("preDivision", values.preDivisionEn);
        //  console.log("profession",values.profession);
        //  console.log("professionCode",values.professionCode);

        return (
            <div className="container">
                <div className="im col-sm-2" onClick={this.Escape}>
                    Escape
                </div>

                <div className="col-sm-12">

                    <div className="row d-flex justify-content-center divBg">
                        <h3 className="text-center pt-3">Enter Personal Details</h3>
                    </div>

                    <form className="" style={{ fontSize: "10px" }} >
                        <div className="row mb-3 d-flex justify-content-center">
                            <div className="col-sm-6 neoBg">
                                <div className="im" style={{ color: "green" }}>
                                    <p>Individuals</p>
                                </div>
                                {/* Applicant's Name */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Applicant's Name</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.applicantName} name='applicantName' onChange={handleChange('applicantName')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Name" />
                                </div>

                                {/* Applicant's Name  Bangla*/}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Applicant's Name (Bangla)</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.applicantNameBangla} name='applicantNameBangla' onChange={handleChange('applicantNameBangla')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Name (Bangla)" />
                                </div>

                                {/* Applicant's Date Of Birth */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Applicant's Date of Birth</label>
                                    <input style={{ borderRadius: "50px" }} type="date" value={values.applicantDob} name='applicantDob' onChange={handleChange('applicantDob')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="dd-mm-YYYY" readOnly />
                                </div>
                                {/* Applicant's Date Of Birth
                            <div className="form-group">
                            <label htmlFor="">Applicant's Date of Birth</label>
                            <DatePicker
                                placeholderText='DD/MM/YYYY'
                                selected={this.state.applicantDob}
                                dateFormat='dd/MM/yyyy'
                                onChange={d => {
                                    this.setState({ applicantDob: d });
                                }}
                            />
                            </div> */}

                                {/* Applicant's Nid No */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Applicant's Nid No</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.applicantNidNo} name='applicantNidNo' onChange={handleChange('applicantNidNo')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Nid No" readOnly />
                                </div>
                                {/* Mobile Phone Number */}


                                {values.useMobilePage === true ?
                                    <div className="form-group">
                                        <label htmlFor=""><span style={{ color: "red" }}>*</span>Applicant's Mobile No.</label>
                                        <input style={{ borderRadius: "50px" }} type="text" maxLength="11" value={values.mobileNumber} name='mobileNumber' pattern='^01[3456789][0-9]{8}' onChange={handleChange('mobileNumber')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Mobile Number" readOnly />
                                    </div>
                                    :
                                    <div className="form-group">
                                        <label htmlFor=""><span style={{ color: "red" }}>*</span>Applicant's Mobile No.</label>
                                        <input style={{ borderRadius: "50px" }} type="text" maxLength="11" value={values.mobileNumber} name='mobileNumber' pattern='^01[3456789][0-9]{8}' onChange={handleChange('mobileNumber')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Applicant's Mobile Number" />
                                    </div>
                                }


                                {/* Gender */}
                                <div className='form-group '>
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Gender</label>
                                    <select
                                        style={{ borderRadius: "50px" }}
                                        className='custom-select'
                                        value={values.gender}
                                        name="gender"
                                        onChange={handleChange('gender')}
                                    >
                                        <option value='' disabled>Gender</option>
                                        <option value='M'>Male</option>
                                        <option value='F'>Female</option>
                                        <option value='T'>Other</option>
                                    </select>
                                </div>

                                {/* Profession */}
                                <div className="form-group ">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Profession</label>
                                    <Autocomplete
                                        id="autocomplete-profession"
                                        options={this.state.autoProfession}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => <TextField {...params} label={values.profession} variant="outlined" onChange={this.handleProfessionChange} onSelect={this.handleProfessionSelect} />}
                                    />

                                </div>

                            </div>


                            <div className="col-sm-6 neoBg">
                                <div className="im" style={{ color: "green" }}>
                                    <p>Relations</p>
                                </div>
                                {/* Mother Name */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Mother's Name</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.motherName} name='motherName' onChange={handleChange('motherName')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mother's Name" />
                                    {/* <small className="form-text text-muted">Enter Mother's Name</small> */}
                                </div>

                                {/* Mother Name Bangla*/}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Mother's Name (Bangla)</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.motherNameBangla} name='motherNameBangla' onChange={handleChange('motherNameBangla')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Mother's Name (Bangla)" />
                                    {/* <small className="form-text text-muted">Enter Mother's Name</small> */}
                                </div>

                                {/* Father Name */}
                                <div className="form-group ">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Father's Name</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.fatherName} name='fatherName' onChange={handleChange('fatherName')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Father's Name" />
                                    {/* <small className="form-text text-muted">Enter Father's Name</small> */}
                                </div>
                                { /* Father Name Bangla*/}
                                <div className="form-group ">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Father's Name (Bangla) </label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.fatherNameBangla} name='fatherNameBangla' onChange={handleChange('fatherNameBangla')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Father's Name (Bangla)" />
                                    {/* <small className="form-text text-muted">Enter Father's Name</small> */}
                                </div>


                                {/* Spouse Name */}
                                <div className="form-group ">
                                    <label htmlFor="">Spouse Name(English)</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.spouseName} name="spouseName" onChange={handleChange('spouseName')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Spouse Name" />
                                    {/* <small className="form-text text-muted">Enter Spouse Name</small> */}
                                </div>


                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">



                            <div className="col-sm-3 neoBg">

                                <div className="im" style={{ color: "green" }}>
                                    <p>Permanent Address Bangla</p>
                                </div>

                                {/*Bangla permanent Division */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Division</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perDivision} name="perDivision" onChange={handleChange('perDivision')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/*Bangla permanent District */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>District</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perDistrict} name="perDistrict" onChange={handleChange('perDistrict')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>


                                {/*Bangla permanent Upozilla */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Upazila</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perUpozila} name="perUpozila" onChange={handleChange('perUpozila')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/*Bangla permanent Union */}
                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Union Or Ward</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perUnionOrWard} name="perUnionOrWard" onChange={handleChange('perUnionOrWard')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>


                                <div className="form-group">
                                    <label htmlFor="">Mouza Or Moholla</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perAdditionalMouzaOrMoholla} name="perAdditionalMouzaOrMoholla" onChange={handleChange('perAdditionalMouzaOrMoholla')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>



                                {/* Present Address */}
                                <div className="form-group">
                                    <label htmlFor="">Village Or Road</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perAdditionalVillageOrRoad} name="perAdditionalVillageOrRoad" onChange={handleChange('perAdditionalVillageOrRoad')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Permanent Address */}
                                <div className="form-group">
                                    <label htmlFor="">City Corp. Or Municipality</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perCityCorporationOrMunicipality} name="perCityCorporationOrMunicipality" onChange={handleChange('perCityCorporationOrMunicipality')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Permanent Address Bangla */}


                                <div className="form-group">
                                    <label htmlFor="">Home Or Holding No.</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perHomeOrHoldingNo} name="perHomeOrHoldingNo" onChange={handleChange('perHomeOrHoldingNo')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Post Office</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perPostOffice} name="perPostOffice" onChange={handleChange('perPostOffice')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Postal Code</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perPostalCode} name="perPostalCode" onChange={handleChange('perPostalCode')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Region</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perRegion} name="perRegion" onChange={handleChange('perRegion')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">RMO</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perRmo} name="perRmo" onChange={handleChange('perRmo')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>


                                <div className="form-group">
                                    <label htmlFor="">Ward For Union Parishad</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perWardForUnionPorishod} name="perWardForUnionPorishod" onChange={handleChange('perWardForUnionPorishod')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>


                            </div>


                            <div className="col-sm-3 neoBg">

                                <div className="im" style={{ color: "green" }}>
                                    <p>Permanent Address English</p>
                                </div>


                                {/*English permanent Division */}



                                <div className='form-group'>
                                    <label htmlFor="">Division</label>
                                    <select
                                        className='custom-select'
                                        value={values.perDivisionCode}
                                        onChange={(e) => this.changeDivPermanent(e)}
                                        name="perDivisionEn"

                                    >
                                        <option value='' disabled>--Select--</option>
                                        {
                                            nativeDivPermanent.map((v, i) => (
                                                <Fragment>
                                                    <option value={v.divisionCode}>{v.divisionName}</option>
                                                </Fragment>
                                            ))
                                        }




                                    </select>
                                </div>


                                {/*English permanent District  */}

                                <div className='form-group'>
                                    <label htmlFor="">District</label>
                                    <select
                                        className='custom-select'
                                        value={values.perDistrictCode}
                                        onChange={(e) => this.changeDistPermanent(e)}
                                        name="perDistrictEn"
                                    >
                                        <option value='' disabled>--Select--</option>
                                        {
                                            values.nativeDistPermanent.map((v, i) => (
                                                <Fragment>

                                                    <option value={v.districtCode}>{v.districtName}</option>
                                                </Fragment>
                                            ))
                                        }




                                    </select>
                                </div>


                                {/*English permanent Upozilla  */}

                                <div className='form-group'>
                                    <label htmlFor="">Upazila</label>
                                    <select
                                        className='custom-select'
                                        value={values.perUpozilaCode}
                                        onChange={(e) => this.changeUpaPermanent(e)}
                                        name="perUpozilaEn"
                                    >
                                        <option value='' disabled>--Select--</option>
                                        {
                                            values.nativeUpaPermanent.map((v, i) => (
                                                <Fragment>

                                                    <option value={v.upazilaCode}>{v.upazilaName}</option>
                                                </Fragment>
                                            ))
                                        }




                                    </select>
                                </div>




                                {/*English permanent Union nativeUniPermanent */}

                                <div className='form-group'>
                                    <label htmlFor="">Union</label>
                                    <select
                                        className='custom-select'
                                        value={values.perUnionOrWardCode}
                                        onChange={(e) => this.changeUniPermanent(e)}
                                        name="perUnionOrWardEn"
                                    >
                                        <option value='' disabled>--Select--</option>
                                        {
                                            values.nativeUniPermanent.map((v, i) => (
                                                <Fragment>

                                                    <option value={v.unionCode}>{v.unionName}</option>
                                                </Fragment>
                                            ))
                                        }




                                    </select>
                                </div>





                                <div className="form-group">
                                    <label htmlFor="">Mouza Or Moholla</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perAdditionalMouzaOrMohollaEn} name="perAdditionalMouzaOrMohollaEn" onChange={handleChange('perAdditionalMouzaOrMohollaEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Present Address */}
                                <div className="form-group">
                                    <label htmlFor="">Village Or Road</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perAdditionalVillageOrRoadEn} name="perAdditionalVillageOrRoadEn" onChange={handleChange('perAdditionalVillageOrRoadEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Permanent Address */}
                                <div className="form-group">
                                    <label htmlFor="">City Corp. Or Municipality</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perCityCorporationOrMunicipalityEn} name="perCityCorporationOrMunicipalityEn" onChange={handleChange('perCityCorporationOrMunicipalityEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Permanent Address Bangla */}






                                <div className="form-group">
                                    <label htmlFor="">Home Or Holding No.</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perHomeOrHoldingNoEn} name="perHomeOrHoldingNoEn" onChange={handleChange('perHomeOrHoldingNoEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Post Office</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perPostOfficeEn} name="perPostOfficeEn" onChange={handleChange('perPostOfficeEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Postal Code</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perPostalCodeEn} name="perPostalCodeEn" onChange={handleChange('perPostalCodeEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Region</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perRegionEn} name="perRegionEn" onChange={handleChange('perRegionEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">RMO</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perRmoEn} name="perRmoEn" onChange={handleChange('perRmoEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>


                                <div className="form-group">
                                    <label htmlFor="">Ward For Union Parishad</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.perWardForUnionPorishodEn} name="perWardForUnionPorishodEn" onChange={handleChange('perWardForUnionPorishodEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                            </div>

                            <div className="col-sm-3 neoBg">

                                <div className="im" style={{ color: "green" }}>
                                    <p>Present Address Bangla</p>
                                </div>

                                {/* Bangla Present Division */}

                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Division</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preDivision} name="preDivision" onChange={handleChange('preDivision')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Bangla Present District */}

                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>District</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preDistrict} name="preDistrict" onChange={handleChange('preDistrict')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>



                                {/* Bangla Present Upozilla */}

                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Upazila</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preUpozila} name="preUpozila" onChange={handleChange('preUpozila')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Bangla Present Union */}

                                <div className="form-group">
                                    <label htmlFor=""><span style={{ color: "red" }}>*</span>Union Or Ward</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preUnionOrWard} name="preUnionOrWard" onChange={handleChange('preUnionOrWard')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>



                                <div className="form-group">
                                    <label htmlFor="">Mouza Or Moholla</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preAdditionalMouzaOrMoholla} name="preAdditionalMouzaOrMoholla" onChange={handleChange('preAdditionalMouzaOrMoholla')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Prest Address */}
                                <div className="form-group">
                                    <label htmlFor="">Village Or Road</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preAdditionalVillageOrRoad} name="preAdditionalVillageOrRoad" onChange={handleChange('preAdditionalVillageOrRoad')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* premant Address */}
                                <div className="form-group">
                                    <label htmlFor="">City Corp. Or Municipality</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preCityCorporationOrMunicipality} name="preCityCorporationOrMunicipality" onChange={handleChange('preCityCorporationOrMunicipality')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* premant Address Bangla */}


                                <div className="form-group">
                                    <label htmlFor="">Home Or Holding No.</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preHomeOrHoldingNo} name="preHomeOrHoldingNo" onChange={handleChange('preHomeOrHoldingNo')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Post Office</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.prePostOffice} name="prePostOffice" onChange={handleChange('prePostOffice')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Postal Code</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.prePostalCode} name="prePostalCode" onChange={handleChange('prePostalCode')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Region</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preRegion} name="preRegion" onChange={handleChange('preRegion')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">RMO</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preRmo} name="preRmo" onChange={handleChange('preRmo')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>


                                <div className="form-group">
                                    <label htmlFor="">Ward For Union Parishad</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preWardForUnionPorishod} name="preWardForUnionPorishod" onChange={handleChange('preWardForUnionPorishod')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                            </div>


                            <div className="col-sm-3 neoBg">

                                <div className="im" style={{ color: "green" }}>
                                    <p>Present Address English</p>
                                </div>

                                {/* English present Address Division */}
                                <div className='form-group'>
                                    <label htmlFor="">Division</label>
                                    <select
                                        className='custom-select'
                                        value={values.preDivisionCode}
                                        onChange={(e) => this.changeDivPresent(e)}
                                        name="preDivisionEn"
                                    >
                                        <option value='' disabled>--Select--</option>
                                        {
                                            nativeDivPresent.map((v, i) => (
                                                <Fragment>

                                                    <option value={v.divisionCode}>{v.divisionName}</option>
                                                </Fragment>
                                            ))
                                        }




                                    </select>
                                </div>

                                {/*English present Address District  */}
                                <div className='form-group'>
                                    <label htmlFor="">District</label>
                                    <select
                                        className='custom-select'
                                        value={values.preDistrictCode}
                                        onChange={(e) => this.changeDistPresent(e)}
                                        name="preDistrictEn"
                                    >
                                        <option value='' disabled>--Select--</option>
                                        {
                                            values.nativeDistPresent.map((v, i) => (
                                                <Fragment>

                                                    <option value={v.districtCode}>{v.districtName}</option>
                                                </Fragment>
                                            ))
                                        }




                                    </select>
                                </div>


                                {/*English present Address Upozilla  */}

                                <div className='form-group'>
                                    <label htmlFor="">Upazila</label>
                                    <select
                                        className='custom-select'
                                        value={values.preUpozilaCode}
                                        onChange={(e) => this.changeUpaPresent(e)}
                                        name="preUpozilaEn"
                                    >
                                        <option value='' disabled>--Select--</option>
                                        {
                                            values.nativeUpaPresent.map((v, i) => (
                                                <Fragment>

                                                    <option value={v.upazilaCode}>{v.upazilaName}</option>
                                                </Fragment>
                                            ))
                                        }




                                    </select>
                                </div>





                                {/*English present Address  Union */}

                                <div className='form-group'>
                                    <label htmlFor="">Union</label>
                                    <select
                                        className='custom-select'
                                        value={values.preUnionOrWardCode}
                                        onChange={(e) => this.changeUniPresent(e)}
                                        name="preUnionOrWardEn"
                                    >
                                        <option value='' disabled>--Select--</option>
                                        {
                                            values.nativeUniPresent.map((v, i) => (
                                                <Fragment>

                                                    <option value={v.unionCode}>{v.unionName}</option>
                                                </Fragment>
                                            ))
                                        }




                                    </select>
                                </div>








                                <div className="form-group">
                                    <label htmlFor="">Mouza Or Moholla</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preAdditionalMouzaOrMohollaEn} name="preAdditionalMouzaOrMohollaEn" onChange={handleChange('preAdditionalMouzaOrMohollaEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                                {/* Present Address */}
                                <div className="form-group">
                                    <label htmlFor="">Village Or Road</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preAdditionalVillageOrRoadEn} name="preAdditionalVillageOrRoadEn" onChange={handleChange('preAdditionalVillageOrRoadEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>


                                <div className="form-group">
                                    <label htmlFor="">City Corp. Or Municipality</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preCityCorporationOrMunicipalityEn} name="preCityCorporationOrMunicipalityEn" onChange={handleChange('preCityCorporationOrMunicipalityEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>



                                <div className="form-group">
                                    <label htmlFor="">Home Or Holding No.</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preHomeOrHoldingNoEn} name="preHomeOrHoldingNoEn" onChange={handleChange('preHomeOrHoldingNoEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Post Office</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.prePostOfficeEn} name="prePostOfficeEn" onChange={handleChange('prePostOfficeEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Postal Code</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.prePostalCodeEn} name="prePostalCodeEn" onChange={handleChange('prePostalCodeEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Region</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preRegionEn} name="preRegionEn" onChange={handleChange('preRegionEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="">RMO</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preRmoEn} name="preRmoEn" onChange={handleChange('preRmoEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>


                                <div className="form-group">
                                    <label htmlFor="">Ward For Union Parishad</label>
                                    <input style={{ borderRadius: "50px" }} type="text" value={values.preWardForUnionPorishodEn} name="preWardForUnionPorishodEn" onChange={handleChange('preWardForUnionPorishodEn')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>

                            </div>
                        </div>



                    </form>

                    {
                        values.confirmFlag ? (
                            <div className="row d-flex justify-content-center align-items-center mt-3">
                                <Loading />
                            </div>
                        ) : ''
                    }
                    <br />


                    <hr />
                    <div className="row d-flex justify-content-center">
                        {/* 
                        <div className="b mb-3" onClick={this.back} >Back</div>&nbsp; &nbsp;
                        */}
                        <div className="b mb-3" onClick={this.continue} >Next</div>
                    </div>

                </div>





            </div>


        )
    }
}

export default SimPersonalDetails;
