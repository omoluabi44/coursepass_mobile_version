import React from "react";
// import Dashboard from "../pages/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/homeDashboard";
import ContentManagement from "../pages/contentManagment/contenManagement";
import Login from "../login";
import ProtectedRoute from "./protectedRoutes";

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
               <Dashboard/>
          </ProtectedRoute>
        }/>
        <Route path="/contentmanagement" element={
     
            <ProtectedRoute>
               <ContentManagement/>
          </ProtectedRoute>
          }/>
         <Route path="/login" element={<Login />}/>
 
      </Routes>
    );
  };
  
  export default AppRoutes;
  