import React, { Component } from 'react'
import './Loading.css'

export class Loading extends Component {
    render() {
        return (
            <div className="animated zoomIn">
                <div className="row d-flex justify-content-center">
                <div className="col-sm-3 d-flex justify-content-center">
                    <div className="loader">
                        <div className="dot">
                        </div>
                    </div>
                    <div className="loader">
                        <div className="dot">
                        </div>
                    </div>
                    <div className="loader">
                        <div className="dot">
                        </div>
                    </div>
                    <div className="loader">
                        <div className="dot">
                        </div>
                    </div>
                    <div className="loader">
                        <div className="dot">
                        </div>
                    </div>
                    <div className="loader">
                        <div className="dot">
                        </div>
                    </div>
                </div>
                </div>
                <div className="row d-flex justify-content-center mt-5">
                  <h4 className="text-muted">Please Wait</h4>

                  </div>
                
                
               
            </div>
        )
    }
}

export default Loading
