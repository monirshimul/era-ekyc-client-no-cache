
const testObject = {
    statusCode: 200,
    message: "Request Successfull",
    data: {
        accountId: "123456789756456789",
        accountStatus: "A",
        channelResponse: {
            "ACC_OPEN": {
                "ACCOUNT_NO": "12345678977894653",
                "CUSTOMER_NO": "454645645646546",
                balance: {
                    currentBalance: 5000,
                    previousBlanace: 10000
                }
            }
        }
    },
    dataArr: ["1", "2"]
}

export default function getJsonObjectToArray(obj) {
    const result = [];
    // recursive funciton
    function recursiveConverter(objToConvert) {
        if (typeof objToConvert === "object") {
            const keys = Object.keys(objToConvert);
            for (let i = 0; i < keys.length; i++) {
                const currentKeyValue = objToConvert[keys[i]];
                if(Array.isArray(currentKeyValue)) result.push([keys[i], currentKeyValue]);
                else if(typeof currentKeyValue === "object") recursiveConverter(currentKeyValue);
                else {
                    result.push([keys[i], currentKeyValue]);
                }
            }
        }
    }
    recursiveConverter(obj);

    return result;

}


//console.log(getJsonObjectToArray(testObject));