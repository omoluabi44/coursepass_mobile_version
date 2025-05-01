import { LOGIN_FAILURE,LOGIN_REQUEST,LOGIN_SUCCESS,LOGOUT, } from "../actions/loginActionTypes";

export const initialState = {
    token:null,
    user: null,
    isUserLoggedIn: false,
    loading: false,
    error: null,


}



export const loginReducer = (state = initialState, action) => {

    switch(action.type){
        case LOGIN_REQUEST:
            return{...state, loading: true, error: null}
        case LOGIN_SUCCESS:
            
            return  {...state, loading: false, isUserLoggedIn: true, token: action.token, user: action.user}
        case LOGIN_FAILURE:
            return {...state, loading: false, error: action.error}
        case LOGOUT:
            return {...state, isUserLoggedIn: false, token: null}
        default:
            return state;
    }
}
