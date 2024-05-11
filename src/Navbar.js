import React from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Menu } from "antd";
import { Link } from "react-router-dom";

export default function Navbar() {
  const items = [
    {
      label: "Account Details",
      key: "1",
      icon: <UserOutlined />,
      path: "/account",
    },
    {
      label: "Funds",
      key: "2",
      icon: <UserOutlined />,
      path: "/funds",
    },
    {
      label: "Logout",
      key: "3",
      icon: <UserOutlined />,
      path: "/logout",
    },
  ];

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        COGNIVITTA
      </Link>
      <ul>
        <CustomLink to="/holdings" className="Component">
          Holdings
        </CustomLink>
        <CustomLink to="/positions" className="Component">
          Positions
        </CustomLink>
        <CustomLink to="/orders" className="Component">
          Orders
        </CustomLink>
        <CustomLink to="/about">About</CustomLink>
        <div className="dropdown-menu">
          <Dropdown.Button
            overlay={
              <Menu>
                {items.map((item) => (
                  <Menu.Item key={item.key}>
                    <Link to={item.path}>{item.label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            }
            placement="bottomRight"
            icon={<UserOutlined />}
          >
            <span className="dropdown-button-text">Profile</span>
          </Dropdown.Button>
        </div>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  return (
    <li>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
