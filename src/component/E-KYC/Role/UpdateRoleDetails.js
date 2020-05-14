import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { pruneRouteArray, getFlatRouteArray } from '../../flattenObjectTwo';

class UpdateRoleDetails extends Component {
    constructor(props) {
        super(props);
        this.firstMenu = pruneRouteArray([1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3, 3.1, 3.2, 3.3, 4, 4.1, 5, 5.1, 5.11, 5.12, 5.13, 5.2, 5.21, 5.22, 5.3, 5.4, 6, 6.1, 6.2, 6.3]);
        this.allMenu = getFlatRouteArray(this.firstMenu);


    }

    state = {
        id: "",
        status: "",
        roleName: "",
        description: "",
        ipList: "",
        grantedIPList: [],
        featureList: this.props.history.location.state.rolePrivileges,


    }

    componentDidMount() {
        let { id, status, roleName, description, grantedIPList } = this.props.history.location.state
        this.setState({
            id: id,
            status: status,
            roleName: roleName,
            description: description,
            ipList: grantedIPList.toString()




        })

        // console.log("this.state.featureList", this.state.featureList)
        // console.log("this.state.iplist", this.state.ipList)

    }








    // ================== Multi Check box onChange Method ==========================

    isChecked = (key) => {
        //console.log("Feature key", key)
        //console.log("Feature List", this.state.featureList.map(f => f[0]))
        const existingFeaturesFlat = this.state.featureList.map(f => f[0]);
        //console.log("existingFeaturesFlat.includes(key)", existingFeaturesFlat.includes(key))
        return existingFeaturesFlat.includes(key.toString());
    }


    getIndex = (key) => {
        const featureList = this.state.featureList;
        for (let i = 0; i < featureList.length; i++) {
            if (featureList[i][0] === key)
                return i;
        }
        return -1;
    }

    handleCheckBoxChange = (e) => {
        const keyValue = e.value.split(',');
        const featureList = this.state.featureList;
        const index = this.getIndex(keyValue[0]);
        if (index > -1) {
            featureList.splice(index, 1);
            this.setState({
                featureList: featureList
            }, () => {
                console.log(this.state.featureList);
            });
        }
        else {
            featureList.push(keyValue);
            this.setState({
                featureList: featureList
            }, () => {
                console.log(this.state.featureList);
            });
        }
    }

    // ==================End of Multi Check box onChange Method =====================





    onFormSubmit = async (e) => {
        e.preventDefault();
        let { id, status, roleName, description, ipList, grantedIPList, featureList } = this.state

        try {
            if (ipList === "") {
                grantedIPList = []
            } else {
                grantedIPList = ipList.split(',')
            }


            let data = {
                id: id,
                status: status,
                roleName: roleName,
                description: description,
                grantedIPList: grantedIPList,
                rolePrivileges: featureList

            }
            console.log("Data", data)
            let url = 'http://127.0.0.1:3001/role';
            let res = await axios.put(url, data)
            console.log("response", res.data)

            localStorage.setItem("Role Data", JSON.stringify(data))
            this.props.history.push("/dashboard/role-list", data)

        } catch (error) {
            //let { reason } = error.response.data

            // alert(reason.map(v => (
            //     JSON.stringify(Object.values(v.constraints))
            // )))
            console.log("This is Error==>", error.message)
        }


    }

    textHandleChange = e => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value });
    }







    render() {
        const { id, status, roleName, description, ipList, grantedIPList, rolePrivileges, rolePrivilegesOne, rolePrivilegesTwo } = this.state



        return (
            <div className="card col-sm-7" style={{ paddingTop: "25px" }}>

                <div className="card-header divBg">
                    <h3 className="text-center pt-3">
                        Update Role
                    </h3>
                </div>
                <div className="card-body">
                    <form >


                        <div className="form-group">
                            <label htmlFor="">Role Name</label>
                            <input name="roleName" type="text" value={roleName} onChange={this.textHandleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Role Name" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Role Status</label>
                            <input name="status" type="text" value={status} onChange={this.textHandleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Role Status P/A/R" />
                        </div>


                        <div className="form-group">
                            <label htmlFor="">Description</label>
                            <textarea name="description" value={description} onChange={this.textHandleChange} class="form-control" id="exampleTextareaOne" rows="3" placeholder="Enter Role Description"></textarea>

                        </div>

                        <div className="form-group">
                            <label for="exampleTextarea">IP List</label>
                            <textarea name="ipList" value={ipList} onChange={this.textHandleChange} class="form-control" id="exampleTextareaTwo" rows="3" placeholder="Enter Granted IP list"></textarea>

                        </div>




                        <div className="form-group"  >




                            <p className="text-muted">Choose Feature From Feature's List</p>
                            {
                                this.allMenu.map((features, index) => (
                                    <div>
                                        {
                                            features.key % 1 === 0 ? (
                                                <div className="">
                                                    <hr />
                                                    <h1 className="text-center im" >{features.featureName}</h1>
                                                    <hr />

                                                </div>

                                            ) : (

                                                    <div className="custom-control custom-checkbox" style={{ marginLeft: "25px" }} key={index} >

                                                        <input
                                                            type="checkbox"
                                                            name={features.key}
                                                            checked={this.isChecked(features.key)}
                                                            className="custom-control-input"
                                                            id={index + 1}
                                                            style={{ marginRight: "5px" }}
                                                            onChange={(e) => {
                                                                this.handleCheckBoxChange({
                                                                    value: e.target.value
                                                                })
                                                            }}
                                                            value={features.key + "," + features.featureName}
                                                            style={{ cursor: "pointer" }}

                                                        />
                                                        <label className="custom-control-label" for={index + 1}>{features.featureName}</label>

                                                    </div>
                                                )
                                        }
                                    </div>

                                ))
                            }


                        </div>


                        <div className="d-flex justify-content-center" >
                            <button onClick={(e) => this.onFormSubmit(e)} className="b" style={{ border: "none" }} >Update</button>
                        </div>

                    </form>
                </div>



            </div>
        )
    }
}

export default withRouter(UpdateRoleDetails)
