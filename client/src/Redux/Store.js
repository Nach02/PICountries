import RootReducer from './Reducer';
import {applyMiddleware,createStore} from 'redux';
import thunk from 'redux-thunk';

const store=createStore(RootReducer,applyMiddleware(thunk));

export default store