// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
    const access = localStorage.getItem("access") ? JSON.parse(localStorage.getItem('access')):null;


  if (!access) {
    return <Navigate to="/login" replace />;
  }


  return children;
}
