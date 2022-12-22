import { appActionTypes } from "./actionTypes"

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

const changeSongSetting = (data) => {
    return {
        type: appActionTypes.CHANGE_SONG_SETTING,
        payload: { ... data },
    }
}

const changeSongPlaying = (data) => {
    return {
        type: appActionTypes.CHANGE_SONG_PLAYING,
        payload: { ... data }
    }
}

export {
    changeLanguage,
    changeLoading,
    changeModal,
    changeTheme,
    changeSongSetting,
    changeSongPlaying
}