import React from "react";
import { BrowserRouter as Router,  Routes, Route } from "react-router-dom";

import AppRoutes from "../src/routes/appRoute";
import SideBar from "./sideBar";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./login";

function AppContent () {
  const auth = useAuth()
  const access = localStorage.getItem("access") ? JSON.parse(localStorage.getItem('access')):null;

  
  return (
    <div>


      {!access?
       <>
        <Router>
          <Login/>
        </Router>
     
       </>
      :
      <>
       <Router>
      <div className="grid grid-cols-[100px_1fr] h-screen">
        <SideBar />
        <main className="bg-gray-100 p-4 overflow-auto">
          <AppRoutes />
        </main>
      </div>
    </Router>
      </>}
      </div>
   



  );
}
function App(){
  return(

  
  <AuthProvider>
    <AppContent/>
  </AuthProvider>
  )

}

export default App;
