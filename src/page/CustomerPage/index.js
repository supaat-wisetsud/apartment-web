import { Avatar, Button, Input, Modal, Space, Table } from "antd";
import {
  EditFilled,
  DeleteFilled,
  UsergroupAddOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MainLayout from "../../components/layout/main";
import "./index.scss";

import customerService from "../../core/services/customer";
import openNotificationWithIcon from "../../core/utils/notification";
import { Link, useNavigate } from "react-router-dom";

const { Search } = Input;
const { confirm } = Modal;

const CustomerPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const showDeleteConfirm = useCallback((id) => {
    confirm({
      title: "Are you sure delete this customer?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        const { success, error } = await customerService.remove(id);

        if (!success) {
          openNotificationWithIcon("error", "Delete customer", error?.message);
        } else {
          await fetchData()
        }
      },
    });
  }, []);

  const columns = useMemo(() => {
    const columns = [
      {
        title: "Profile",
        dataIndex: "profile",
        key: "profile",
        render: (picture) => <Avatar src={`http://localhost:3011${picture}`} />,
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
        dataIndex: "citizen_id",
        key: "citizen_id",
        width: 200,
      },
      {
        title: "Phone Number",
        dataIndex: "phone_no",
        key: "phone_no",
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
              <Link to={"/customer/update/" + record.key}>
                <EditFilled /> Edit
              </Link>
            </Button>
            <Button danger onClick={(_) => showDeleteConfirm(record.key)}>
              <DeleteFilled /> Destory
            </Button>
          </Space>
        ),
      },
    ];
    return columns;
  }, [showDeleteConfirm]);

  const fetchData = async () => {
    const { success, data: customers, error } = await customerService.findAll();

    if (success) {
      let _data = (customers || []).map((n) => ({ ...n, key: n.id }));
      setData(_data);
    } else {
      openNotificationWithIcon(
        "error",
        "Fetch list customer",
        error?.message || ""
      );
    }
  };

  const onSearch = (value) => {
    console.log(value);
  };

  const onCreateCustomer = () => {
    navigate("/customer/create");
  };

  return (
    <MainLayout openMenuKey="customer">
      <Space direction="vertical" size={15} style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Search
            style={{ width: 300 }}
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
          <Button type="primary" onClick={onCreateCustomer}>
            <UsergroupAddOutlined /> Create
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </Space>
    </MainLayout>
  );
};

export default CustomerPage;
