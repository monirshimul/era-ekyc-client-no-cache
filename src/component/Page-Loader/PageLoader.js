import React, { Component } from 'react'
import './PageLoader.css';
import eraLogo from './era.png';


class PageLoader extends Component {
    render() {
        return (
            <div className="loaderBody">
                <div class="pageLoader">
                <span>
                    <img src={eraLogo} width="150px" height="50px" style={{ marginTop: "70px" }} alt="" />
                </span>
            </div>
            </div>
            
        )
    }
}

export default PageLoader
