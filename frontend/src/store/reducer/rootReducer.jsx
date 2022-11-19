import { combineReducers } from 'redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import appReducer from './appReducer';
import userReducer from './userReducer';

const configPersist = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
}

const userPersistConfig = {
    ... configPersist,
    key: 'user',
    whitelist: ['user'],
}

const appPersistConfig = {
    ... configPersist,
    key: 'app',
    whitelist: ['language','theme']
}

const rootReducer = combineReducers({
    appReducer: persistReducer(appPersistConfig,appReducer),
    userReducer: persistReducer(userPersistConfig,userReducer),
});

export default rootReducer;