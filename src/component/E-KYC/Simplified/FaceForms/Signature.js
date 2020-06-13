import React, { Component } from 'react';
import Sign from '../images/sign.svg'
import { NotificationManager } from "react-notifications";
import Account from '../Account';

export class Signature extends Component {
    state = {
        signature: '',
        signatureType: '',
        flag: 'data:image/jpeg;base64,'
    }


    componentDidMount() {
        if ('Signature' in localStorage) {
            let data = JSON.parse(localStorage.getItem('Signature'));
            // console.log(data);
            this.setState({
                signature: data.signature,
            });
        }
    }

    continue = e => {
        const { signature } = this.state;
        e.preventDefault();

        // if(signature === ''){
        //     let signatureMessage = "Please Provide Signature image";
        //     NotificationManager.warning(signatureMessage, "Warning", 5000);
        //     return;
        // }

        const sigObj = {
            signature
        };

        localStorage.setItem('Signature', JSON.stringify(sigObj));
        this.props.history.push('/dashboard/confirm-info');
    };

    back = e => {
        e.preventDefault();
        let nextRoute = JSON.parse(localStorage.getItem('Verification'));

        if (nextRoute.type === "FACE") {
    
            this.props.history.push('/dashboard/nominee');
        } else {
          this.props.history.push('/dashboard/customer-photo');
        }
        
    }

    fileSelectedHandler = event => {
        if (event.target.files[0]) {
            let file = event.target.files[0];
            //console.log(file.type);
            var reader = new FileReader();
            reader.readAsBinaryString(file);

            reader.onload = () => {
                let base64Image = btoa(reader.result);
                this.setState({
                    signature: base64Image,
                    signatureType: file.type
                });
            };
            reader.onerror = () => {
                console.log('there are some problems');
                alert('File can not be read');
            };
        }
    };

    render() {
        let { signature, signatureType, flag } = this.state;
        if (localStorage.length === 0) {
            return <Account />;
        }
        return (

            <div className="col-sm-12 d-flex justify-content-center" >
                <div className="card col-sm-5" style={{ paddingTop: "25px" }}>
                    <div className="card-header up">
                        <h3>Provide Signature</h3>
                    </div>
                    <div className="card-body d-flex justify-content-center">

                        <img

                            src={signature ? (flag + signature) : Sign}
                            style={{

                                width: "300px",
                                height: "200px",
                            }}
                            className=" img-fluid img-thumbnail im"
                            id='SignaturePic'
                            alt=""
                        />



                    </div>
                    <div
                        className="card-footer d-flex justify-content-around"
                        style={{ background: "#fff" }}
                    >

                        <div class="input-group mb-3 ">
                            <div class="custom-file">
                                <input type="file"
                                    onChange={this.fileSelectedHandler}

                                    class="form-control-file" id="input-file" />
                                <label class="custom-file-label" htmlFor="input-file">Choose Image</label>
                            </div>

                        </div>


                    </div>
                    <div
                        className="card-footer d-flex justify-content-between"
                        style={{ background: "#fff" }}
                    >

                        <span className="b mr-5" onClick={this.back}>Back</span>
                        <span className="b" onClick={this.continue}>Next</span>




                    </div>
                </div>

            </div>
        )
    }
}

export default Signature;
