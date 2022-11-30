import { appActionTypes } from "./actionTypes"

const changeLogin = (data) => {
    return { type: appActionTypes.CHANGE_LOGIN,payload: data }
}

const changeLanguage = (language) => {
    return { type: appActionTypes.CHANGE_LANGUAGE,payload: language }
}

const changeLoading = loading => {
    return {
        type: appActionTypes.CHANGE_LOADING,
        payload: loading,
    }
}

const changeModal = option => {
    return {
        type: appActionTypes.CHANGE_MODAL,
        payload: option,
    }
}

const changeTheme = option => {
    return {
        type: appActionTypes.CHANGE_THEME,
        payload: option,
    }
}

const changeSongPlaying = (data) => {
    return {
        type: appActionTypes.CHANGE_SONG,
        payload: { ... data },
    }
}

export {
    changeLogin,
    changeLanguage,
    changeLoading,
    changeModal,
    changeTheme,
    changeSongPlaying,
}