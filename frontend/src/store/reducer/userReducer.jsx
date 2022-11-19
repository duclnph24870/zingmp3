import { userActionTypes } from "../actions/actionTypes";

const initStateUser = {
    user: {
        isLogin: false,
        avatar: 'https://avatar.talk.zdn.vn/default.jpg',
        userName: undefined,
        role: undefined
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
        default: 
            return state;
    }
}

export default userReducer;