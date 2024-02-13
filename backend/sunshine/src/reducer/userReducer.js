import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_ERRORS,LOAD_REQUEST,LOAD_SUCCESS,LOAD_FAIL, LOGOUT } from "../constants/userConstants";

export const LoginReducer =(state={loginDetail: {}},action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
            case LOAD_REQUEST:
            return {
                loading: true,
                loginDetail: {}
            }
        case LOGIN_SUCCESS:
            case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                loginDetail: action.payload
            }
        case LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
            case LOAD_FAIL:
                return {
                    loading: false,
                    isAuth: false,
                    error: action.payload
                }
         case CLEAR_ERRORS:
            
                return {
                    ...state,
                    error: null
                };
         case LOGOUT:
            
                return {
                    loading: false,
                    loginDetail: {},
                    error: null
                };
    
        default:
            return state;
    }
}