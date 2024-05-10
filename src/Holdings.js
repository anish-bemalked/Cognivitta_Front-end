import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Holdings() {
  const [holdings, setHoldings] = useState([]);

  const fetchHoldings = async () => {
    const config = {
      method: "post",
      url: "http://localhost:8080/v1/holdings",
      data: {
        token: localStorage.getItem("token"),
      },
    };
    const response = await axios(config);
    setHoldings(response.data.data);
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  return (
    <>
      <h1>Holdings</h1>
      <pre>{JSON.stringify(holdings, 0, null)}</pre>
    </>
  );
}
