

export const LOGIN = "LOGIN";

export const loginSuccess = (d) => {
    return {
        type: LOGIN,
        payload: d
    }
}

export const loginRequest = (data) => {
    return (dispatch) => {
        try {

            dispatch(loginSuccess(data));
        }
        catch (ex) {
            dispatch(loginSuccess(ex));
        }

    }
}