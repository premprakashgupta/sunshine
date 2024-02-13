import axios from 'axios'
import univesalLink from '../universalLink'

import {ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    CLEAR_ERRORS,
    CART_REQUEST,
    CART_SUCCESS,
    CART_FAIL,
    REMOVECART} from '../constants/productConstants'

    const config = {
   
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*'
          },
          withCredentials: true
        } 

export const getProduct=(currentPage=1,category)=> async (dispatch) =>{
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        })
        let link=`${univesalLink}/allProduct?page=${currentPage}`;
        if(category)
        {
            link=`${univesalLink}/allProduct?category=${category}&page=${currentPage}`
        }
        
        const {data}=await axios.get(link,config);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
           type: ALL_PRODUCT_FAIL,
           payload: error
        });
        
    }
}
export const getProductDetail=(id)=> async (dispatch) =>{
    try {
        dispatch({
            type: PRODUCT_DETAIL_REQUEST
        })
       
        const {data}=await axios.get(`${univesalLink}/product/${id}`,config);
        
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
           type: PRODUCT_DETAIL_FAIL,
           payload: error,
        });
        
    }
}

export const cartItem=()=> async (dispatch)=>{
    try {
        dispatch({
            type: CART_REQUEST
        })
        
        const {data}= await axios.get(`${univesalLink}/cart`,config)
        dispatch({
            type: CART_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CART_FAIL,
            payload: error,
         });
    }
}
export const removeCart=(id)=> async (dispatch)=>{
    
    const {data}= await axios.put(`${univesalLink}/removeCart/${id}`,config)
        dispatch({
            type: REMOVECART,
            payload: id
        })
      
}
export const clearError = ()=> async (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}