import React, { Component } from 'react'

class Acordion extends Component {

    state = {
        showAcordion: false
    }

    changeAcordion = ()=>{
        this.setState({
            showAcordion: !this.state.showAcordion
        })
    }
    render() {
        let{ showAcordion }= this.state
        // console.log(this.props)
        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className=" col-sm-8">
                        <div className="imTwoWhite d-flex justify-content-between">
        <h4>{this.props.heading}</h4>{ !showAcordion ? <i onClick={this.changeAcordion} style={{cursor:"pointer"}} class="fas fa-caret-down"></i> : <i onClick={this.changeAcordion} style={{cursor:"pointer"}} class="fas fa-caret-up"></i>}
                            
                        </div>
                        {
                            showAcordion ? (
                            <div>{
                                this.props.acBody
                                }</div>
                            ) :""
                        }
                        
                    </div>

                </div>
            </div>
        )
    }
}

export default Acordion
