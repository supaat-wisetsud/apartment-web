import { Avatar, Button, Col, Input, Row, Space, Table } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import React from "react";
import MainLayout from "src/components/layout/main";
import "./index.scss";

const { Search } = Input;

const columns = [
  {
    title: "Profile",
    dataIndex: "profile",
    key: "profile",
    render: (text) => <Avatar src={text} />,
    width: 80,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <div>{text}</div>,
    width: 200,
  },
  {
    title: "Citizen ID",
    dataIndex: "citizneID",
    key: "citizneID",
    width: 200,
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    width: 150,
    render: (_, record) => (
      <Space size="middle">
        {/* {record.key} */}
        <Button type="primary" ghost>
          <EditFilled /> Edit
        </Button>
        <Button danger>
          <DeleteFilled /> Destory
        </Button>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];

const CustomerPage = () => {
  const onSearch = (value) => console.log(value);
  return (
    <MainLayout openMenuKey="customer">
      <Space direction="vertical" size={15}>
        <Row>
          <Col span={5}>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} />
      </Space>
    </MainLayout>
  );
};

export default CustomerPage;
