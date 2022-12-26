import { getUser } from "../../service/user"
import { userActionTypes } from "./actionTypes"

const changeLogin = (token) => async (dispatch) => {
    try {
        if (token) {
            const result = await getUser();
            dispatch({
                type: userActionTypes.CHANGE_LOGIN,
                payload: result.user,
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const logout = () => {
    return {
        type: userActionTypes.LOGOUT,
        payload: undefined
    }
}

const changeUserSignIn = data => {
    return {
        type: userActionTypes.CHANGE_USER_SIGNIN,
        payload: data
    }
}

export {
    changeLogin,
    logout,
    changeUserSignIn
}