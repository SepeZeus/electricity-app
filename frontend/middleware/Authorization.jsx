import React, { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer';

const ProtectedRoute = ({ children }) => {
  //check if user is logged in or not
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('authenticated') || false
  );
  const [idled, setIdled] = useState(false);
  //check if user is idle for 15 minutes, then auto-logout
  const idleTimerRef=useRef(null)  
  const onIdle=()=>{    
    localStorage.removeItem('authenticated');
    setIsAuthenticated(false); // Update state for ProtectedRoute
    setIdled(true);
    console.log("User is inactive, auto logout triggered")
  }
  const idleTimer = useIdleTimer({
    crossTab: true,
    ref: idleTimerRef,
    onIdle: onIdle,
    timeout: 15*60000
    })
  //user is automatically redirected to the login page
  if (!isAuthenticated) {
    if (idled)
      return <Navigate to="/" replace />;
    else
      return <Navigate to="/login" replace />;
  }
  //if user is authenticated, show page content and setup idle timer
  return (
    <div idletimer ={idleTimer}>{children}</div>
  );
};

export default ProtectedRoute;
