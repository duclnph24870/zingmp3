import images from '../../assets/images';
import { LANGUAGES } from '../../config/const'
import { appActionTypes } from '../actions/actionTypes';

const initStateApp = {
    language: LANGUAGES.VI,
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
    songSetting: {
        idSong: '63988993ae700a8d6e6f0a09',
        volume: 1,
        replay: false,
        randomPlay: false,
        isPLaying: false,
    },
    songPlaying: {}
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
        case appActionTypes.CHANGE_SONG_SETTING:
            return {
                ... state,
                songSetting: {
                    ... action.payload
                }
            }
        case appActionTypes.CHANGE_SONG_PLAYING:
            return {
                ... state,
                songPlaying: {
                    ... action.payload
                }
            }
        default: 
            return state;
    }
}

export default appReducer;