import React, { Component } from 'react'


const featuresArray = [
    {
        "key": "1.1",
        "featureName": "Approve Role",
    },
    {
        "key": "1.2",
        "featureName": "Update Role",
    },
    {
        "key": "1.3",
        "featureName": "Create Role",
    }
];

export default class CheckBoxDemo extends Component {

    existingFeatures = [
        ["1.1", "Approve"],
        ["1.2", "Update Role"]
    ]

    state = {
        checkBoxState: this.existingFeatures
    }

    getIndex = (key) => {
        const checkBoxState = this.state.checkBoxState;
        for (let i = 0; i < checkBoxState.length; i++) {
            if (checkBoxState[i][0] === key)
                return i;
        }
        return -1;
    }

    handleCheckBoxChange = (e) => {
        const keyValue = e.value.split(',');
        const checkBoxState = this.state.checkBoxState;
        const index = this.getIndex(keyValue[0]);
        if (index > -1) {
            checkBoxState.splice(index, 1);
            this.setState({
                checkBoxState: checkBoxState
            }, () => {
                console.log(this.state.checkBoxState);
            });
        }
        else {
            checkBoxState.push(keyValue);
            this.setState({
                checkBoxState: checkBoxState
            }, () => {
                console.log(this.state.checkBoxState);
            });
        }
    }

    isChecked = (key) => {
        const existingFeaturesFlat = this.state.checkBoxState.map(f => f[0]);
        return existingFeaturesFlat.includes(key);
    }


    render() {
        return (
            <div>
                {
                    featuresArray.map(items => {
                        return (
                            <div>
                                <input
                                    type="checkbox"
                                    checked={this.isChecked(items.key)}
                                    value={items.key + "," + items.featureName}
                                    onChange={(e) => {
                                        this.handleCheckBoxChange({
                                            value: e.target.value
                                        })
                                    }}
                                />
                                <label>{items.featureName}</label>
                                <br />
                            </div>

                        )
                    })
                }
            </div>
        )
    }
}
