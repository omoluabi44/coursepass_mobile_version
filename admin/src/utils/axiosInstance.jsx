import axios from "axios"
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs"

const baseURL = "http://localhost:5000/api/v1/" 

let access = localStorage.getItem("access") ? JSON.parse(localStorage.getItem('access')):null;

let refresh = localStorage.getItem("refresh") ? JSON.parse(localStorage.getItem('refresh')):null;



export const  axiosInstance = axios.create({
    baseURL, 
   headers: access ? { Authorization: `Bearer ${access}` } : {}
}) 

axiosInstance.interceptors.request.use(async req=>{
    if(!access){
        access = localStorage.getItem("access") ? JSON.parse(localStorage.getItem('access')):null;
        req.headers.Authorization = `Bearer ${access}`
    }
    const user = jwtDecode(access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if(!isExpired) return req
    try {
        const response = await axios.post(`${baseURL}auth/refresh`,{refresh: refresh})
        const accessToken = response.data.access
        localStorage.setItem('access', JSON.stringify(accessToken))
        req.headers.Authorization = `Bearer ${accessToken}`
     
        return req


        
    } catch (error) {
        console.log(error);
        
        
    }
    
    
    
    
    return req
})