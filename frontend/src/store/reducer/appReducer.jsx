import { LANGUAGES } from '../../config/const'
import { appActionTypes } from '../actions/actionTypes';

const initStateApp = {
    language: LANGUAGES.VI,
    loading: false,
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
        default: 
            return state;
    }
}

export default appReducer;