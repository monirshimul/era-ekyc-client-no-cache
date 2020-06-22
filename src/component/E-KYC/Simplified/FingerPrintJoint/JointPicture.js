import React, { Component } from 'react';
import Sign from '../images/man.svg';



export class JointPicture extends Component {



    fileSelectedHandler = event => {
        if (event.target.files[0]) {
            let file = event.target.files[0];
            //console.log(file.type);
            var reader = new FileReader();
            reader.readAsBinaryString(file);

            reader.onload = () => {
                let base64Image = btoa(reader.result);
                this.props.handleState('faceImage', base64Image);
            };
            reader.onerror = () => {
                console.log('there are some problems');
                alert('File can not be read');
            };
        }
    };

    continue = e => {
        e.preventDefault();

        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        let {values} = this.props;
        return (
            <div className="col-sm-12 d-flex justify-content-center" >
            <div className="card col-sm-5" style={{ paddingTop: "25px" }}>
                <div className="card-header up">
                    <h3>Provide Photograph</h3>
                </div>
                <div className="card-body d-flex justify-content-center">

                    <img

                        src={values.faceImage ? (values.flag + values.faceImage) : Sign}
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

export default JointPicture;
