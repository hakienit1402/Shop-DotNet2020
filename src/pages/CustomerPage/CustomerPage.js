import React, { Component } from "react";
import { Layout, Menu, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ShopOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import CustomerInfo from "./CustomerInfo";

import { Route, Switch, Link } from "react-router-dom";
import CustomerOrder from "./CustomerOrder";
import ChangeAddress from "./ChangeAddress";
import CustomerOrderInfo from "./CustomerOrderInfo";

const { Header, Sider, Content } = Layout;

class CustomerPage extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div className="container customer-page">
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div
              className="logo"
              style={{
                backgroundColor: "lightgray",
                height: 65,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar size={40}>USER</Avatar>
            </div>
            <Menu mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/account/customerInfo">My account</Link>
              </Menu.Item>

              <Menu.Item key="2" icon={<ShopOutlined />}>
                <Link to="/account/customerOrder">My Orders</Link>
              </Menu.Item>

              <Menu.Item key="3" icon={<SettingOutlined />}>
                <Link to="/account/changeAddress">Change address</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: this.toggle,
                }
              )}
            </Header>

            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 400,
              }}
            >
              
                <Switch>
                  <Route
                    path="/account/customerInfo"
                    component={CustomerInfo}
                  />
                  <Route
                    path="/account/customerOrder"
                    component={CustomerOrder}
                  />
                  <Route
                    path="/account/customerOrder/info"
                    component={CustomerOrderInfo}
                  />
                  <Route
                    path="/account/changeAddress"
                    component={ChangeAddress}
                  />
                </Switch>
             
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default CustomerPage;
