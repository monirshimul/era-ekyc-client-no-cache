import React, { Component } from 'react'

export class SimComplete extends Component {
    render() {


        return (
            <div className="container">
                <div className="jumbotron my-5 im" style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.24)", textAlign: "left" }}>
                    <h1 className="display-1" style={{ color: "#8dd617" }}>Process Complete</h1>
                    <h3 className="text-gray" >Thank You for Your Submission</h3>

                    {
                        this.props.values.channelAccStatus.map((val, ind) => (
                            <div key={ind}>
                                {
                                    ind === 0 ? (
                                        <h5 className="text-muted"><span className="" style={{ color: "green" }}>E-KYC Account ID : </span>{val[1]}</h5>
                                    ) : (
                                        <h5 className="text-muted"><span className="" style={{ color: "green" }}>{val[0]} : </span>{val[1]}</h5>
                                    )
                                }

                            </div>

                        ))
                    }

                    <p className="text-muted">You will get an email with further instructions</p>

                </div>

            </div>
        )
    }
}

export default SimComplete;
