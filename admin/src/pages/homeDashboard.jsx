import React ,{useState,useEffect } from 'react'
import { useAuth } from '../AuthContext'
import { axiosInstance } from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
      const auth = useAuth()
      const navigate = useNavigate()
    // const {user} = useSelector((state) => state.login);
    // console.log(user);
    const [access, setAccess] = useState("");
    const [refresh, setRefresh] = useState("");

useEffect(() => {
  const fetchUser = async ()=>{
  try {
    console.log("i executed");
    
    const response = await axiosInstance.get("/users")
    console.log(response.data);
    
  } catch (error) {
    console.log(error);
    
    
  }
}
fetchUser();
}, []);
console.log(access,refresh);
const logOut =()=>{
  // localStorage.removeItem("access");
  // navigate("/login")
  // window.location.reload();

  auth.logout()

  
  
}

    
  return (
    <div>
     <button onClick={logOut}>logout</button>
    </div>
  )
}
