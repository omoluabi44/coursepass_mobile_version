import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
      const navigate = useNavigate()
  return (
    <div>
      <button onClick={()=>{navigate('/');}}>go home</button>
       <button onClick={()=>{navigate('/contentmanagement');}} >go dashboard</button>
        <button onClick={()=>{navigate('/login');}}>login</button>
      
    </div>
  )
}
