import {
  TeamOutlined,
  HomeFilled,
  LogoutOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Layout,
  Menu,
  Space,
  Typography,
  Modal,
} from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import authService from "../../../core/services/auth";

const { Header, Content, Footer } = Layout;
const { confirm } = Modal;

const menuItems = [
  {
    key: "room",
    icon: <HomeFilled />,
    label: <Link to={"/room"}>Room</Link>,
  },
  {
    key: "customer",
    icon: <TeamOutlined />,
    label: <Link to={"/customer"}>Customer</Link>,
  },
];

const MainLayout = ({ children, openMenuKey = "" }) => {
  let navigate = useNavigate();

  const showLogoutConfirm = () => {
    confirm({
      title: "Are you sure logout?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await authService.logout();
          navigate("/login", { replace: true });
        } catch (e) {
          console.log(e);
        }
      },
    });
  };

  return (
    <React.StrictMode>
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Header>
          <div className="logo" />
          <div style={{ display: "flex" }}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[openMenuKey]}
              style={{ flex: 1 }}
              items={menuItems}
            />
            <Space
              direction="horizontal"
              align="center"
              style={{ cursor: "pointer" }}
            >
              <Avatar icon={<UserOutlined />} />
              <Typography.Title
                level={5}
                style={{ marginBottom: 0, color: "white" }}
              >
                Admin
              </Typography.Title>

              <Button danger type="primary" onClick={showLogoutConfirm}>
                <LogoutOutlined />
              </Button>
            </Space>
          </div>
        </Header>
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Apartment web</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
          {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </React.StrictMode>
  );
};

export default MainLayout;
