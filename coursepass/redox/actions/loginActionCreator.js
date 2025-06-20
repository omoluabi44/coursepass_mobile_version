import {LOGIN_REQUEST, LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT, UPDATE_ACCESS_TOKEN } from "./loginActionTypes";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import PopUp from "../../components/toast"

export function loginRequest() {
  return {
    type: LOGIN_REQUEST

  };
}

export function loginSuccess( token, user) {
  AsyncStorage.setItem('token', JSON.stringify(token))
  AsyncStorage.setItem('user', JSON.stringify(user))

return {
    type: LOGIN_SUCCESS,
    token,
    user
  };
}
export function updateAccessToken(accessToken) {
  return {
    type: UPDATE_ACCESS_TOKEN,
    accessToken,
  };
}
export function loginFailure(error) {
    return {
      type: LOGIN_FAILURE,
      error,
    };
  }
export function logout() {
  AsyncStorage.removeItem('token')
  AsyncStorage.removeItem('user')

    return {
      type: LOGOUT
    };
  }


  
  // thunk


 export const loginUser = (email, password) => {
  // console.log("this is from action file "+ email, password);
  
  return (dispatch)=> {
    dispatch(loginRequest());
    return apiLogin(email, password)
    .then((response)=>{
      
      const {tokens, user} = response; 

           
      dispatch(loginSuccess(tokens, user));
      return tokens;
    })
    .catch((error) => {
      dispatch(loginFailure(error.message));
      // PopUp({ type: "error", title: "Error", message:`${error.message}` });
      
      
      throw error;
     
      
      
    });
  }
 }



const apiLogin = async (username, password) =>{
  try{
    const response = await axios.post('https://api.coursepass.me/api/v1/auth/login', {username, password})
  
    return response.data}
  catch(error ){
     const isAxiosError = axios.isAxiosError(error);
  const errorMessage = isAxiosError
    ? error.response?.data?.message || error.message
    : 'An unexpected error occurred';

  PopUp({
    type: "error",
    title: "Login Failed",
    message: `${errorMessage}`,
  });
 
    
    throw new Error (error.response?.data?.message ||  'Logins failed'); }
  }

export const initializeAuth = () => async (dispatch) => {
  try { 
    const token = await  AsyncStorage.getItem('token')
    const user = await  AsyncStorage.getItem('user')
    
    if  (token && user){
      const parsedToken = JSON.parse(token)
      const parsedUser = JSON.parse(user)
      if (parsedToken){
       
        
        dispatch(loginSuccess(parsedToken, parsedUser));
        }
      else{
        dispatch(logout()) }  }
    else{
      dispatch(logout())
    }
  } catch (error) {

    console.error('Failed to load or parse token from AsyncStorage:', error);
    dispatch(logout())
  }
}
