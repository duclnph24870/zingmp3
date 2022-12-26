import { userActionTypes } from "../actions/actionTypes";

const initStateUser = {
    user: {
        
    }
}

const userReducer = (state = initStateUser, action) => {
    switch (action.type) {
        case userActionTypes.CHANGE_LOGIN: 
            return {
                ... state,
                user: {
                    ... action.payload,
                }
            }
        case userActionTypes.LOGOUT:
            return {
                ... state,
                user: {}
            }
        case userActionTypes.CHANGE_USER_SIGNIN:
            return {
               ...state,
                user: {
                   ...action.payload
                }
            }
        default: 
            return state;
    }
}

export default userReducer;