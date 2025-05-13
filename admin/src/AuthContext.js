// src/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState(null);
  const [users, setUser] = useState([]);
  const [password, setPassword] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const login = async (username, password) =>{
    
  try{
    
    
    const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
      username:username
      , 
      password:password
    })
    const {tokens, user} = response.data
    setUserLoggedIn(true)
 
    
    setUser(user)
    setAccessTokenState(tokens.access)
    localStorage.setItem('refresh', JSON.stringify(tokens.refresh));
    localStorage.setItem('access', JSON.stringify(tokens.access));

    

    
    return response.data}
  catch(error ){
    console.log(error.status );
    console.log(error.response.data );
   
  }
  
  
  }
  const logout = () => {
    setUser(null)
    setAccessTokenState(null)
    localStorage.removeItem('refreshToken');
    localStorage.removeItem("access");
    setUserLoggedIn(false)
  }




  return (
    <AuthContext.Provider value={{users, accessToken,logout ,login, userLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth =()=>{
  return useContext(AuthContext)
}