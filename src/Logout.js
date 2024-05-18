import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "./ProtectedRoutes";

export default function Logout() {
  const navigate = useNavigate();
  const logout = async () => {
    const config = {
      method: "post",
      url: "http://localhost:8080/v1/logout",
      data: {
        token: localStorage.getItem("token"),
      },
    };
    const response = await axios(config);
    localStorage.removeItem("token");
    navigate("/");
  };
  if (checkAuth()) {
    logout();
  } else {
    navigate("/");
  }
  return <>Logout</>;
}
