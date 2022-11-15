import { appActionTypes } from "./actionTypes"

const changeLanguage = (language) => {
    return { type: appActionTypes.CHANGE_LANGUAGE,payload: language }
}

export {
    changeLanguage,
}