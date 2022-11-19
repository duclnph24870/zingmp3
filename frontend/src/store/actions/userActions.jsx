import { userActionTypes } from "./actionTypes"

const changeLogin = user => {
    return {
        type: userActionTypes.CHANGE_LOGIN,
        payload: user,
    }
}

export {
    changeLogin,
}