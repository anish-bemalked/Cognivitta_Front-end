import React from 'react'
import { Outlet  } from "react-router-dom";
import Home from './Home';
import { isExpired, decodeToken } from "react-jwt";


export const checkAuth = () => {
  if(localStorage.getItem("token" == null)){
    return false;
  }
  if(isExpired(localStorage.getItem("token"))){
    localStorage.removeItem("token")
    return false;
  }
  return true;
}

export default function ProtectedRoutes() {
  return checkAuth() ? <Outlet/> : <Home/>;

}


