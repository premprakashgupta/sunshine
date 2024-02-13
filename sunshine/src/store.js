import {createStore,applyMiddleware,combineReducers,compose} from 'redux'
import thunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension' // use when website is in development process for connection with redux tool
import { cartReducer, productDetailReducer, productReducer } from './reducer/productReducer';
import { LoginReducer } from './reducer/userReducer';

const reducer=combineReducers({
    product: productReducer,
    productDetail: productDetailReducer,
    loginDetail: LoginReducer,
    userCart: cartReducer
});

let initialState={};

const middleware=[thunk];

const store = createStore(
    reducer,
    initialState,
    //use 'compose' in production otherwise use 'composeWithDevTools' in development phase
    compose(applyMiddleware(...middleware))
);
export default store;