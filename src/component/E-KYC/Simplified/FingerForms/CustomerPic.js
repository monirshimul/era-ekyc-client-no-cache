import React, { Component } from 'react';
import Sign from '../images/sign.svg';
export class CustomerPic extends Component {
    state={
        faceImage:'',
        flag: 'data:image/jpeg;base64,'
    }

    componentDidMount() {
        if ('CaptureFace' in localStorage) {
            let data = JSON.parse(localStorage.getItem('CaptureFace'));
            // console.log(data);
            this.setState({
                faceImage: data.faceImage,
            });
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
                    faceImage: base64Image,
                });
            };
            reader.onerror = () => {
                console.log('there are some problems');
                alert('File can not be read');
            };
        }
    };

    continue = e => {
        const { faceImage } = this.state;
        e.preventDefault();

        // if(faceImage === ''){
        //     let validationMessage = "Please Provide  Photo";
        //     NotificationManager.warning(validationMessage, "Warning", 5000);
        //     return;
        // }

        const picObj = {
            faceImage
        };

        localStorage.setItem('CaptureFace', JSON.stringify(picObj));
        this.props.history.push('/dashboard/signature');
    };

    back = e => {
        e.preventDefault();
        this.props.history.push('/dashboard/nominee');
    }
    render() {
        const {faceImage,flag} = this.state;
        return (
            <div className="col-sm-12 d-flex justify-content-center" >
            <div className="card col-sm-5" style={{ paddingTop: "25px" }}>
                <div className="card-header up">
                    <h3>Provide Photograph</h3>
                </div>
                <div className="card-body d-flex justify-content-center">

                    <img

                        src={faceImage ? (flag + faceImage) : Sign}
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

export default CustomerPic;
