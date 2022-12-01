import { userActionTypes } from "../actions/actionTypes";

const initStateUser = {
    user: {
        isLogin: false,
        image: 'https://avatar.talk.zdn.vn/default.jpg',
        userName: undefined,
        role: undefined,
        token: null
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
        default: 
            return state;
    }
}

export default userReducer;