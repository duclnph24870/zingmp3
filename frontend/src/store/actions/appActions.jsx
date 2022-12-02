import { getSongById } from "../../service/songService"
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

const changeSongPlaying = (data) => async (dispatch) => {
    const idSong = data.idSong;
    if (idSong) {
        console.log(idSong);
        const result = await getSongById(idSong);
        console.log(result);
    }
    // return {
    //     type: appActionTypes.CHANGE_SONG,
    //     payload: { ... data },
    // }
}

export {
    changeLanguage,
    changeLoading,
    changeModal,
    changeTheme,
    changeSongPlaying,
}