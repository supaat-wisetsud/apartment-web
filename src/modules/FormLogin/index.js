import React from "react";
import { Form, Input, Button, Row, Col, Space } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import './index.scss'
const Login = ({onFinish, onFinishFailed}) => {

  return (
    <div className="container-form-login">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Space direction="vertical" size={24}>
          <h2>Apartment Manager</h2>
          <div>
            <Row>
              <Col span={24}>
                <Form.Item
                  style={{ marginBottom: "8px" }}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="ชื่อผู้ใช้"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="ชื่อผู้ใช้/อีเมล/เบอร์โทรศัพท์"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  style={{ marginBottom: "8px" }}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="รหัสผ่าน"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<KeyOutlined />}
                    placeholder="รหัสผ่าน"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Button type="primary" htmlType="submit" block>
              เข้าสู่ระบบ
            </Button>
          </div>
        </Space>
      </Form>
    </div>
  );
};

export default Login;
