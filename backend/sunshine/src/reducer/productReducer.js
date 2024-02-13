import {ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    CART_REQUEST,
    CART_SUCCESS,
    CART_FAIL,
    
    CLEAR_ERRORS,
    REMOVECART} from '../constants/productConstants'
import { LOGOUT } from '../constants/userConstants';





export const productReducer = (state={product: []}, action) => {
    
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            
            return {
                loading: true,
                product: []
            };
        case ALL_PRODUCT_SUCCESS:
            
            return {
                loading: false,
                product: action.payload.data,
                rate: action.payload.rate,
                resultPerPage: action.payload.resultPerPage,
                productCount: action.payload.productCount
            };

        case ALL_PRODUCT_FAIL:
            
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            
            return {
                ...state,
                error: null
            };

    
        default:
            return state;
    }
}
export const productDetailReducer = (state={productDetail: {}}, action) => {
    
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            
            return {
                loading: true,
                productDetail: {}
            };
        case PRODUCT_DETAIL_SUCCESS:
            
            return {
                loading: false,
                productDetail: action.payload,
                
            };

        case PRODUCT_DETAIL_FAIL:
            
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            
            return {
                ...state,
                error: null
            };

    
        default:
            return state;
    }
}


export const cartReducer =(state={userCart:[]},action)=>{

    switch (action.type) {
        case CART_REQUEST:
            return {
               loading: true,
               userCart:[] 
            }
        case CART_SUCCESS:
            return {
                loading: false,
                userCart: action.payload,
                cartItemNo:action.payload.cart.length
            }
        case CART_FAIL:
            return {
                loading: false,
                error: true,
                userCart: []
            }
            case REMOVECART:
                return{
                    ...state,
        
                    userCart:{
                        _id:state.userCart._id,
                        pic:state.userCart.pic,
                        username:state.userCart.username,
                        email:state.userCart.email,
                        cart:state.userCart.cart.filter((i)=>i._id!==action.payload)},

                        cartItemNo:state.userCart.cart.length-1
                }
            case CLEAR_ERRORS:
            
            return {
                ...state,
                error: null
            };
            case LOGOUT:
            
                return {
                    userCart: []
                    
                };
        default:
            return state;
    }
}