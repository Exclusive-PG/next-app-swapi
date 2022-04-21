import { combineReducers, createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import reducerSearch from "./reducer/reducerSearch"

const logger  = createLogger();


export const RootReducer  = combineReducers({ reducerSearch })


const store = createStore(RootReducer,applyMiddleware(logger));

export default store;