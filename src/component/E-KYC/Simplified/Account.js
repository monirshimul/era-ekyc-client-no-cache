import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Account extends Component {
    state = {

        product: "",
        accountType: '',
        channelName:''

    }

    componentDidMount(){
        localStorage.clear();
    }


    onChange = e => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const { product, accountType,channelName } = this.state;

        if(product === ''){
            alert('Please Select Product');
            return;
        }

        if(accountType === ''){
            alert('Please Select Account Type');
            return;
        }

        if(channelName === ''){
            alert('Please Select Channel Name');
            return;
        }

        const obj = {

            product,
            accountType,
            channelName,
        }
        localStorage.setItem("accountInfo", JSON.stringify(obj));

        this.setState({

            accountType: '',
            product: ''
        })
        // this.props.history.push('/dashboard/face-account');
        if (accountType === 'Joint') {
            this.props.history.replace('/dashboard/dynamic-comp');
        } else if(accountType === 'Single'){
            this.props.history.replace('/dashboard/nid-images');
        }
    }

    render() {

        return (




            <div className="card col-sm-7" style={{ paddingTop: "25px" }}>

                <div className="card-header divBg">

                    <h3 className="text-center pt-3">Account Information</h3>

                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        {/* Account Number */}


                        {/* Product and Service */}
                        <div className='form-group'>
                            <label htmlFor="">Product and Service</label>
                            <select
                                className='custom-select'
                                value={this.state.product}
                                onChange={this.onChange}
                                name="product"
                            >
                                <option value='' disabled>--Select--</option>
                                <option value='Current Account'>Current Account</option>
                                <option value='Savings Account'>Savings Account</option>
                                <option value='Credit Account'>Credit Accounts</option>
                                <option value='Debit Card'>Debit Card</option>
                                <option value='Credit Card'>Credit Card</option>

                            </select>
                        </div>
                        {/* Account Type */}
                        <div className='form-group'>
                            <label htmlFor="">Account Type</label>
                            <select
                                className='custom-select'
                                value={this.state.accountType}
                                onChange={this.onChange}
                                name="accountType"
                            >
                                <option value='' disabled>--Select--</option>
                                <option value='Single'>Single Account</option>
                                <option value='Joint'>Joint Account</option>

                            </select>
                        </div>


                     {/* Channel Name */}
                     <div className='form-group'>
                            <label htmlFor="">Channel Name</label>
                            <select
                                className='custom-select'
                                value={this.state.channelName}
                                onChange={this.onChange}
                                name="channelName"
                            >
                                <option value='' disabled>--Select--</option>
                                <option value='CBS'>CBS</option>
                                <option value='ABS'>ABS</option>
                                {/* <option value='Credit Account'>Credit Accounts</option>
                                <option value='Debit Card'>Debit Card</option>
                                <option value='Credit Card'>Credit Card</option> */}

                            </select>
                        </div>



                        <div className="d-flex justify-content-center" >

                            <button className="b" type="submit" style={{ border: "none" }} >Submit</button>

                        </div>

                    </form>
                </div>



            </div>






        )
    }
}

export default withRouter(Account)
