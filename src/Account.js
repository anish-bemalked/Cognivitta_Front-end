import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Descriptions } from "antd";

export default function Account() {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  const fetchAccount = async () => {
    const config = {
      method: "post",
      url: "http://localhost:8080/v1/user/profile",
      data: {
        token: localStorage.getItem("token"),
      },
    };
    const response = await axios(config);
    setProfile(response.data.data);
  };
  useEffect(() => {
    fetchAccount();
  }, []);

  const items = [
    {
      key: "user_name",
      label: "UserName",
      children: profile.user_name,
      span: 3,
    },
    {
      key: "user_id",
      label: "ID",
      children: profile.user_id,
      span: 3,
    },
    {
      key: "email",
      label: "Email",
      children: profile.email,
      span: 3,
    },
    {
      key: "user_type",
      label: "User Type",
      children: profile.user_type,
      span: 3,
    },
    {
      key: "broker",
      label: "Broker",
      children: profile.broker,
      span: 3,
    },
  ];

  return <Descriptions title="User Info" items={items} />;
}
