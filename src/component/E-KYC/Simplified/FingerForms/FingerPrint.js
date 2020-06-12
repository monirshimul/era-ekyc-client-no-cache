import React, { Component } from 'react'

export class FingerVerification extends Component {
    state = {
        nidNo: JSON.parse(localStorage.getItem('NidImages')).OcrData.id,
        dob: JSON.parse(localStorage.getItem('NidImages')).OcrData.DOB,
        rIndex: '',
        rThumb: '',
        lIndex: '',
        lThumb: ''
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    continue = (e) =>{
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.continue}>
                    <label for="fname">First name:</label><br/>
                        <input type="date" id="dob" name="dob" onChange={this.onChange} value={this.state.dob}/><br/>
                            <label for="lname">Last name:</label><br/>
                                <input type="text" id="nidNo" name="nidNo" value={this.state.dob}/><br/><br/>
                                <span className="b mr-5" onClick={this.back}>Back</span>
                        <span className="b" onClick={this.continue}>Next</span>
                            </form> 
            </div>
        )
    }
}

export default FingerVerification;
