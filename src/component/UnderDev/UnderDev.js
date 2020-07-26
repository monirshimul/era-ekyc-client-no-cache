import React, { Component } from 'react'
import dev from './dev.svg'



class UnderDev extends Component {
    render() {
        return (
            <div className="container">
                
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col-sm-4">
                        <img

                            src={dev}
                            style={{


                                outline: "none",
                                margin: "0",
                                padding: "0",
                                border: "none",

                            }}
                            className=" img-fluid img-thumbnail"
                            id='SignaturePic'
                            alt=""
                        />
                        <hr/>
                    </div>
                    <div className="col-sm-8">
                            <div className=""> 
                                <span className="display-1" style={{color:"#abba0e"}}>FEATURE</span>&nbsp;<hr/>
                                <span className="display-2" style={{color:"gray"}}>UNDER</span> <span className="display-2" style={{color:"#84ceca"}}>DEVELOPMENT</span><hr/>
                            </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default UnderDev
