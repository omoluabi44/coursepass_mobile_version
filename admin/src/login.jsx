import React,  {useState}from 'react'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Login() {
    const navigate = useNavigate()
    const [user, setuser]= useState('')
    const [password, setPassword]= useState('')
    const auth = useAuth()

    const handleLogin = async (  )=>{
        try {
            
            const result = await  auth.login(user, password)        
        } catch (error) {
            console.log(error);
            
            
        }
           
        
}
  return (
    <div>
     
       <label>
            Username: <input type='text' onChange={e => setuser(e.target.value)}/>
        </label>
          <label>
            password: <input type='password' onChange={e => setPassword(e.target.value)}/>
        </label>
        <button onClick={handleLogin}>Login</button>
    
       
    </div>
  )
}
