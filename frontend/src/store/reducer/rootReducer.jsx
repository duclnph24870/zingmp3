import { combineReducers } from 'redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import appReducer from './appReducer';

const configPersist = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
}

const appPersistConfig = {
    ... configPersist,
    key: 'app',
    whitelist: ['language','theme']
}

const rootReducer = combineReducers({
    appReducer: persistReducer(appPersistConfig,appReducer),
});

export default rootReducer;