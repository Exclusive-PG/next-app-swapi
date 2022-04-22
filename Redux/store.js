import { createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import { RootReducer } from './reducers/rootReducer';


const logger  = createLogger();





const store = createStore(RootReducer,applyMiddleware(logger));

export default store;