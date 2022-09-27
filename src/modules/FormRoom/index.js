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
  Select,
  Radio,
  InputNumber,
} from "antd";
import React, { useEffect, useRef } from "react";
import "./index.scss";

const FormRoom = ({
  type = "CREATE",
  onFinish = () => {},
  onFinishFailed = () => {},
  onCancel = () => {},
  propsUploadPicture = {},
  defaultData = {
    active: false
  },
  listCustomer = [],
}) => {
  const refFrom = useRef();

  useEffect(() => {
    refFrom.current.setFieldsValue(defaultData);
  }, [defaultData]);
  return (
    <>
      <Row>
        <Col span={7}>
          <Typography.Title level={5}>Picture picture</Typography.Title>
          <Image.PreviewGroup>
            <div className="container-picture">
              <Image
                width={200}
                src={
                  defaultData.picture
                    ? `http://localhost:3011${defaultData.picture}`
                    : "/empty.png"
                }
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
                * คุณสามารถอัพโหลดโปรไฟล์ได้ก็ต่อเมื่อสร้างห้องแล้ว
              </Typography.Text>
            )}
          </div>
        </Col>
        <Col span={17}>
          <Typography.Title level={5}>Room Form</Typography.Title>
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
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please input your price!" }]}
              >
                <InputNumber min={0} style={{width: 200}}  />
              </Form.Item>

              <Form.Item label="Customer" name="customer_id">
                <Select
                  showSearch
                  placeholder="Customer"
                  optionFilterProp="children"
                  style={{ textAlign: "initial" }}
                >
                  {(listCustomer || []).map((n) => (
                    <Select.Option key={n.id} value={n.id}>
                      {n.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Status" name="active">
                <Radio.Group>
                  <Radio value={true}>Active</Radio>
                  <Radio value={false}>Disable</Radio>
                </Radio.Group>
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

export default FormRoom;
