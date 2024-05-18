import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Row, Statistic } from "antd";

export default function Funds() {
  const [funds, setFunds] = useState();
  const navigate = useNavigate();
  const fetchFunds = async () => {
    const config = {
      method: "post",
      url: "http://localhost:8080/v1/user/funds",
      data: {
        token: localStorage.getItem("token"),
      },
    };
    const response = await axios(config);
    setFunds(response.data.data);
  };
  useEffect(() => {
    fetchFunds();
  }, []);

  return (
    <>
      <Row gutter={12}>
        <Col span={24}>
          <h1>Commodity</h1>
        </Col>
        <Col span={7}>
          <Statistic
            title="Used Margin"
            value={funds?.commodity?.used_margin ?? 0}
          />
        </Col>
        <Col span={7}>
          <Statistic
            title="PayIn Amount"
            value={funds?.commodity?.payin_amount ?? 0}
            precision={2}
          />
        </Col>
        <Col span={7}>
          <Statistic
            title="Available Margin"
            value={funds?.commodity?.available_margin ?? 0}
            precision={2}
          />
        </Col>

        <Col span={24}>
          <h1>Equity</h1>
        </Col>
        <Col span={7}>
          <Statistic
            title="Used Margin"
            value={funds?.equity?.used_margin ?? 0}
          />
        </Col>
        <Col span={7}>
          <Statistic
            title="PayIn Amount"
            value={funds?.equity?.payin_amount ?? 0}
            precision={2}
          />
        </Col>
        <Col span={7}>
          <Statistic
            title="Available Margin"
            value={funds?.equity?.available_margin ?? 0}
            precision={2}
          />
        </Col>
      </Row>
    </>
  );
}
