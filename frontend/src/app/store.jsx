import { applyMiddleware,createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../store/reducer/rootReducer";
import { persistStore } from 'redux-persist';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
);

export const persistor = persistStore(store);

export default store;