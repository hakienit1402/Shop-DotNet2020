import React, { useState, useEffect} from "react";
import { Input, Badge, notification, Button, Dropdown, Menu } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Search } = Input;

const Nav = (props) => {
  const { count } = props;
  const [isLogout, setIsLogout] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const logout = () => {
    localStorage.clear();
    setIsLogout(true);
    setIsLogin(false);
    notification.success({
      message: "Thông báo",
      description: "Đăng xuất thành công",
      placement: "bottomRight",
    });
  };
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    setIsLogin(isLogin);
  }, []);
  const name = localStorage.getItem("user");

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/account/customerInfo">My Account</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/account/customerOrder">My Orders</Link>
      </Menu.Item>
      <Menu.Item onClick={() => logout}>
        <Link to="/">Log Out</Link>
      </Menu.Item>
    </Menu>
  );
  const menuAdmin = (
    <Menu>
      <Menu.Item>
        <Link to="/admin">Dashboard</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/account/customerInfo">Admin Account</Link>
      </Menu.Item>
      <Menu.Item onClick={() => logout}>
        <Link to="/">Log Out</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <header className="header">
      <Menu
        mode="horizontal"
        style={{ borderBottom: 0, fontSize: 17, fontWeight: "bolder" }}
      >
        <Menu.Item key="logo">
          <Link to="/" style={{ fontSize: 20, fontWeight: "bolder" }}>
            LOGO
          </Link>
        </Menu.Item>
        <Menu.Item key="product">
          <Link to="/product">Sản phẩm</Link>
        </Menu.Item>
        <Menu.Item key="aboutus">
          <Link to="/aboutus">About Us</Link>
        </Menu.Item>
      </Menu>
      <Search
        placeholder="Search sản phẩm..."
        onSearch={(value) => console.log(value)}
        style={{ width: 300 }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isLogin ? (
          <div>
            {/* check admin */}
            {name === "KIEN" ? (
              <Dropdown overlay={menuAdmin} placement="bottomCenter" arrow>
                <Button type="button" className="btn btn-default">
                  Hi! Admin {name}
                </Button>
              </Dropdown>
            ) : (
              <Dropdown overlay={menu} placement="bottomCenter" arrow>
                <Button type="button" className="btn btn-default">
                  Hi! {name}
                </Button>
              </Dropdown>
            )}
          </div>
        ) : (
          <Link to="/login">
            <Button type="button" className="btn btn-default">
              SIGN-IN
            </Button>
          </Link>
        )}

        <Link to="/cart">
          <Badge count={count}>
            <Button type="button" className="btn btn-default">
              <ShoppingCartOutlined /> CART
            </Button>
          </Badge>
        </Link>
      </div>
    </header>
  );
};

export default Nav;