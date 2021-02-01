import React, { Component } from 'react'
import down from '../Simplified/images/downArrow2.svg';
import up from '../Simplified/images/upArrow2.svg';

class Acordion extends Component {

    state = {
        showAcordion: false
    }

    changeAcordion = () => {
        this.setState({
            showAcordion: !this.state.showAcordion
        })
    }
    render() {
        let { showAcordion } = this.state
        // console.log(this.props)
        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className={this.props.size}>
                        <div className="imTwo d-flex justify-content-between align-items-center">
                            <span className="" style={{color:"green"}}>{this.props.heading}</span>{!showAcordion ? <span onClick={this.changeAcordion} style={{ cursor: "pointer" }} className="neoBg">
                                <img src={down}
                                    alt=""
                                    style={{
                                        margin: "0 auto",
                                        width: "25px",
                                        height: "25px",
                                        border: "none",
                                    }}
                                    className="img-fluid img-thumbnail"
                                />
                            </span> : <span onClick={this.changeAcordion} style={{ cursor: "pointer" }} className="neoBg">
                                    <img src={up}
                                        alt=""
                                        style={{
                                            margin: "0 auto",
                                            width: "25px",
                                            height: "25px",
                                            border: "none",
                                        }}
                                        className="img-fluid img-thumbnail"
                                    /></span>}

                        </div>
                        {
                            showAcordion ? (
                                <div>{
                                    this.props.acBody
                                }</div>
                            ) : ""
                        }

                    </div>

                </div>
            </div>
        )
    }
}

export default Acordion
