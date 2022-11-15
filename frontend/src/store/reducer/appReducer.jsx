import { LANGUAGES } from '../../config/const'
import { appActionTypes } from '../actions/actionTypes';

const initStateApp = {
    language: LANGUAGES.VI
}

const appReducer = (state = initStateApp, action) => {
    switch (action.type) {
        case appActionTypes.CHANGE_LANGUAGE:
            console.log('reducer app action >>>>',action);
            return {
                ... state,
                language: action.payload,
            };
        default: 
            return state;
    }
}

export default appReducer;