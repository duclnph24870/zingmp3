import images from '../../assets/images';
import { LANGUAGES } from '../../config/const'
import { appActionTypes } from '../actions/actionTypes';

const initStateApp = {
    language: LANGUAGES.VI,
    isLogin: false,
    loading: false,
    modal: {
        isActive: false,
        Component: null,
    },
    theme: {
        name: 'light',
        logo: images.logoLight,
        styles: { 
            "--layout-bg": "#fff",
            "--sidebar-bg": "rgba(0,0,0,0.05)",
            "--navigation-text": "#32323d",
            "--text-item-hover":"#8d22c3",
            "--text-primary": "#32323d",
            "--primary-bg": "#fff",
            "--text-secondary": "rgba(0,0,0,0.6)",
            "--alpha-bg": "rgba(0,0,0,0.05)", 
            "--colorSearch-default": " rgba(0,0,0,0.05)",
        },
    },
    songPlaying: {
        idSong: null,
        volume: 50,
        replay: false,
        randomPlay: false,
    }
}

const appReducer = (state = initStateApp, action) => {
    switch (action.type) {
        case appActionTypes.CHANGE_LANGUAGE:
            return {
                ... state,
                language: action.payload,
            };
        case appActionTypes.CHANGE_LOADING:
            return {
                ... state,
                loading: action.payload,
            }
        case appActionTypes.CHANGE_MODAL:
            return {
                ...state,
                modal: {
                    ... action.payload
                }
            }
        case appActionTypes.CHANGE_THEME:
            return {
                ... state,
                theme: {
                    ... action.payload
                }
            }
        case appActionTypes.CHANGE_SONG:
            return {
                ... state,
                songPlaying: {
                    ... action.payload
                }
            }
        case appActionTypes.CHANGE_LOGIN:
            return {
                ... state,
                isLogin: { ... action.payload }
            }
        default: 
            return state;
    }
}

export default appReducer;