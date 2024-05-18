import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "antd";

const fetchLTP = async (instrument_token) => {
  const config = {
    method: "post",
    url: "http://localhost:8080/v1/ltp",
    data: {
      token: localStorage.getItem("token"),
      instrument_token: instrument_token,
    },
  };
  const response = await axios(config);
  const ltp = response.data.last_price;
  return ltp;
};

export default function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const [dyLabels, setDyLabels] = useState([]);
  const [filteredPnL, setFilteredPnL] = useState(null);
  const [filteredReturn, setFilteredReturn] = useState(null);
  const data = [];

  const fetchHoldings = async () => {
    const config = {
      method: "post",
      url: "http://localhost:8080/v1/holdings",
      data: {
        token: localStorage.getItem("token"),
      },
    };
    const response = await axios(config);
    let NLables = new Set();
    for (const obj of response.data) {
      const {
        instrument_token,
        tradingsymbol,
        quantity,
        average_price,
        t1_quantity,
        label,
      } = obj;
      const ltp = await fetchLTP(instrument_token);
      const pnl = ((ltp - average_price) * (quantity + t1_quantity)).toFixed(2);
      const updatedHolding = {
        instrument_token: instrument_token,
        tradingsymbol: tradingsymbol,
        quantity: quantity,
        t1_quantity: t1_quantity,
        average_price: average_price,
        ltp: ltp,
        pnl: parseFloat(pnl),
        return: (
          (pnl * 100) /
          ((quantity + t1_quantity) * average_price)
        ).toFixed(2),
        label: label,
      };
      data.push(updatedHolding);
      NLables.add(label);
    }
    setHoldings(data);
    setDyLabels([...NLables]);
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  const calculateNetPnLAndReturn = (filteredData) => {
    const netPnL = filteredData.reduce((acc, curr) => acc + curr.pnl, 0);
    setFilteredPnL(netPnL.toFixed(2));

    const totalCost = filteredData.reduce(
      (acc, curr) =>
        acc + curr.average_price * (curr.quantity + curr.t1_quantity),
      0
    );
    const netReturn = ((netPnL / totalCost) * 100).toFixed(2);
    setFilteredReturn(netReturn);
  };

  const columns = [
    {
      title: "Instrument",
      dataIndex: "tradingsymbol",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "T1 Quantity",
      dataIndex: "t1_quantity",
    },
    {
      title: "Avg. Price",
      dataIndex: "average_price",
    },
    {
      title: "LTP",
      dataIndex: "ltp",
    },
    {
      title: "PnL",
      dataIndex: "pnl",
    },
    {
      title: "Return",
      dataIndex: "return",
    },
    {
      title: "Label",
      dataIndex: "label",
      editable: true,
      filters: dyLabels.map((i) => ({ text: i, value: i })),
      onFilter: (value, record) => record.label.indexOf(value) === 0,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    calculateNetPnLAndReturn(extra.currentDataSource);
  };

  return (
    <>
      <h1>Holdings</h1>
      <Table
        columns={columns}
        dataSource={holdings}
        onChange={onChange}
        rowClassName={() => "editable-row"}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
      {filteredPnL !== null && (
        <div>
          <h2>Net PnL: {filteredPnL}</h2>
          <h2>Net Return: {filteredReturn}%</h2>
        </div>
      )}
    </>
  );
}
