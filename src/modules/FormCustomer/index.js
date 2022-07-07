import { CloseOutlined, SendOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Col,
  Row,
  Image,
  Typography,
  Form,
  Input,
  Button,
  Space,
  Upload,
} from "antd";
import React, { useEffect, useRef } from "react";
import "./index.scss";

const FormCustomer = ({
  type = "CREATE",
  onFinish = () => {},
  onFinishFailed = () => {},
  onCancel = () => {},
  propsUploadPicture = {},
  defaultData = {},
}) => {
  const refFrom = useRef();

  useEffect(() => {
    refFrom.current.setFieldsValue(defaultData)
  }, [defaultData])
  return (
    <>
      <Row>
        <Col span={7}>
          <Typography.Title level={5}>Picture profile</Typography.Title>
          <Image.PreviewGroup>
            <div className="container-profile">
              <Image
                width={200}
                src={defaultData.profile? `http://localhost:3011${defaultData.profile}`:"/empty.png"}
              />
            </div>
          </Image.PreviewGroup>
          <div className="container-profile">
            <Upload {...propsUploadPicture}>
              <Button icon={<UploadOutlined />} disabled={type === "CREATE"}>
                Upload picture
              </Button>
            </Upload>
            {type === "CREATE" && (
              <Typography.Text type="danger" style={{ marginTop: 20 }}>
                * คุณสามารถอัพโหลดโปรไฟล์ได้ก็ต่อเมื่อสร้างลูกค้าแล้ว
              </Typography.Text>
            )}
          </div>
        </Col>
        <Col span={17}>
          <Typography.Title level={5}>Customer Form</Typography.Title>
          <div>
            <Form
              ref={refFrom}
              name="customer"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              autoComplete="off"
              layout="vertical"
              initialValues={defaultData}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Citizen ID"
                name="citizen_id"
                rules={[
                  { required: true, message: "Please input your citizen id!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone_no"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Address" name="address">
                <Input.TextArea rows={2} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space size={20}>
                  <Button type="primary" htmlType="submit">
                    <SendOutlined /> {type === "CREATE" ? "Create" : "Save"}
                  </Button>
                  <Button danger onClick={onCancel}>
                    <CloseOutlined /> Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FormCustomer;
