import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import { useSelector } from "react-redux";

const ProtectedRoute = (props) => {



    let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
    console.log(isAuthenticated)

    isAuthenticated = isAuthenticated ? true : localStorage.getItem('isAuthenticated'); 

    const isAllowed = isAuthenticated;
  
    console.log(isAllowed)

    if (!isAllowed) {
      return <Navigate to={props.redirectTo} replace />;
    }
  
    return <Outlet />;
  };

export default ProtectedRoute;