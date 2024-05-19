import axios from "axios";
import { Table } from "antd";
import React, { useEffect, useState } from "react";

export default function Positions() {
  const [positions, setPositions] = useState([]);

  const fetchPositions = async () => {
    const config = {
      method: "post",
      url: "http://localhost:8080/v1/positions",
      data: {
        token: localStorage.getItem("token"),
      },
    };
    const response = await axios(config);
    setPositions(response.data.data);
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const columns = [
    {
      title: "Trading Symbol",
      dataIndex: "trading_symbol",
      key: "trading_symbol",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Average price",
      dataIndex: "average_price",
      key: "average_price",
    },
    {
      title: "Last Price",
      dataIndex: "last_price",
      key: "last_price",
    },
    {
      title: "pnl",
      dataIndex: "pnl",
      key: "pnl",
    },
  ];

  return (
    <>
      <h1
        style={{
          textShadow: "none",
          fontFamily: "Montserrat",
          paddingBottom: "10px",
        }}
      >
        Positions
      </h1>
      <Table dataSource={positions} columns={columns} />
    </>
  );
}
