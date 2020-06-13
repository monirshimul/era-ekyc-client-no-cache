import React, { Component } from 'react';
import axios from 'axios';

export class FingerVerification extends Component {
    state = {
        nidNo: JSON.parse(localStorage.getItem('NidImages')).OcrData.id,
        dob: JSON.parse(localStorage.getItem('NidImages')).OcrData.DOB,
        rIndex: '',
        rThumb: '',
        lIndex: '',
        lThumb: '',
        isEnable: false
    }

    componentDidMount(){

        if ("FingerPrint" in localStorage) {
            let data = JSON.parse(localStorage.getItem("FingerPrint"));
            // console.log(data);
            this.setState({
                nidNo:data.nidNo,
                dob:data.dob,
                rIndex:data.rIndex,
                rThumb:data.rThumb,
                lIndex:data.lIndex,
                lThumb:data.lThumb
            });
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    handleClick = (e) =>{
        e.preventDefault();
        
        this.setState({ isEnable: true });

        const config = {
          headers: {
            'x-auth-token': sessionStorage.getItem('x-auth-token')
          }
        };
    
        const fingerobj = {
          MinQ: 30,
          Retry: 3,
          TokenId: 'g86v5s4g5se84g5sfd4g5werx25sdf4f'
        };
    
        axios
          .post(`http://localhost:20000/api/info/fingerdata`, fingerobj, config)
          .then(res => {
            //  console.log(res);
            const data = res.data;
            let rightThumb = data[0].fingerData;
            let rightIndex = data[1].fingerData;
            let leftThumb = data[2].fingerData;
            let leftIndex = data[3].fingerData;
    
            if (data[0].fingerId === 1) {
              this.setState({ rThumb: rightThumb });
            } else {
              alert('data not found!!');
            }
            if (data[1].fingerId === 2) {
              this.setState({ rIndex: rightIndex });
            } else {
              alert('data not found!!');
            }
            if (data[2].fingerId === 6) {
              this.setState({ lThumb: leftThumb });
            } else {
              alert('data not found!!');
            }
            if (data[3].fingerId === 7) {
              this.setState({ lIndex: leftIndex });
            } else {
              alert('data not found!!');
            }
    
            this.setState({
              isEnable: false
            });
          })
          .catch(err => {
            if (err.response) {
              if (err.response.status === 400 || err.response.status === 401) {
                console.log(err.response.data);
                alert(err.response.data.message);
                this.setState({ isEnable: false });
              } else if (err.response.status === 404) {
                alert('Not Found');
                this.setState({ isEnable: false });
              } else if (err.response.status === 500) {
                alert(err.response.data.message);
                this.setState({ isEnable: false });
              }
            } else if (err.request) {
              console.log(err.request);
              alert('Error Connectiong');
              this.setState({ isEnable: false });
            } else {
              console.log('Error', err.message);
              alert(err.message);
              this.setState({ isEnable: false });
            }
          });
    }

    continue = (e) => {
       const {nidNo,dob,rThumb,rIndex,lThumb,lIndex} = this.state;
        e.preventDefault();
        let obj = {
            nidNo,
            dob,
            rIndex,
            rThumb,
            lIndex,
            rThumb,
        }
        localStorage.setItem("FingerPrint", JSON.stringify(obj));
        this.props.history.push('/dashboard/personal-details');

    }

    back = (e)=>{
        e.preventDefault();
        this.props.history.push('/dashboard/nid-images');
    }

    render() {
        return (
            <div>

                <form onSubmit={this.continue}>
                    
                    <label htmlFor="nidNo">Nid No:</label><br />
                    <input type="text" id="nidNo" name="nidNo" value={this.state.nidNo} /><br />
                    <label htmlFor="dob">Date of Birth:</label><br />
                    <input type="date" id="dob" name="dob" onChange={this.onChange} value={this.state.dob} /><br /><br />
                    <button
                        type='submit'
                        // disabled={this.state.isEnable}
                        className='btn btn-block'
                        style={{ backgroundColor: '#8f8e8e', color: '#fff', boxShadow: "1px 2px 3px rgba(0, 0, 0, .1)" }}
                        onClick={this.handleClick}
                    >
                        <i className='fas fa-fingerprint' />
                      &nbsp; Provide  Finger Print
                    </button>

                    <span className="b mr-5" onClick={this.back}>Back</span>
                    <span className="b" onClick={this.continue}>Next</span>
                </form>
            </div>
        )
    }
}

export default FingerVerification;
