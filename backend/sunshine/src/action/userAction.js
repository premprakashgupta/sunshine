import axios from 'axios'
import { LOAD_FAIL, LOAD_REQUEST, LOAD_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from '../constants/userConstants'
import univesalLink from '../universalLink'


const config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true
    }


export const UserLoad=() =>async(dispatch)=>{
    
    try {
        dispatch({
            type: LOAD_REQUEST
        })
        axios.defaults.withCredentials = true;
        const {data}=await axios.get(`${univesalLink}/me`,config);
        console.log("data from load ==="+data)
         dispatch({
            type: LOAD_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: LOAD_FAIL,
            payload: error.message,
         });
    }
}
export const UserLogin=(email,password) =>async(dispatch)=>{
     
        try {
        dispatch({
            type: LOGIN_REQUEST
        })
        axios.defaults.withCredentials = true;
        const {data}=await axios.post(`${univesalLink}/login`,{
            email:email.trim().toLowerCase(),password:password.trim()
        },config
        );
         dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data,
         });
    }
}

export const UserLogOut=() =>async(dispatch)=>{
    
    try {
        axios.defaults.withCredentials = true;
        const res=await axios.get(`${univesalLink}/logout`,config);
        dispatch({
            type: LOGOUT
        })
        res && window.location.reload();
        
    } catch (error) {
        console.log(error)
    }
}

// kux aur gadbad hai