import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");
  useEffect(() => {
    if (code !== null) {
      axios
        .get(`http://localhost:8080/v1/code?code=${code}`)
        .then((res) => {
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
          navigate("/holdings");
        })
        .catch((e) => {
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [code]);
  return <>auth</>;
}
