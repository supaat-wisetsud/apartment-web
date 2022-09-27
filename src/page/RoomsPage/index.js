import { ExclamationCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterResults from 'react-filter-search'
import MainLayout from "../../components/layout/main";
import roomService from "../../core/services/room";
import logsService from "../../core/services/logs";
import openNotificationWithIcon from "../../core/utils/notification";
import ListRoom from "../../modules/ListRoom";
import "./index.scss";

const { Search } = Input;
const { confirm } = Modal;
const RoomPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData()
  }, []);

  const showDeleteConfirm = useCallback((id) => {
    confirm({
      title: "Are you sure delete this room?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        const { success, error } = await roomService.destory(id);

        if (!success) {
          openNotificationWithIcon("error", "Delete room", error?.message);
        } else {
          await fetchData()
        }
      },
    });
  }, []);

  const fetchData = async () => {
    const { success, data, error } = await roomService.findAll();

    if (!success) {
      openNotificationWithIcon("error", "Fetch list room", error?.message);
    } else {
      setData(data);
    }
  };
  const onSearch = (value) => setSearch(value)

  const onNavigateCreateRoom = () => {
    navigate('/room/create')
  }

  const onEdit = (id) => {
    navigate('/room/update/'+id)
  }

  const onDelete = (id) => {
    showDeleteConfirm(id)
  }

  const onCheckOut = async (customerID, roomID) => {
    const { success, data, error } = await logsService.create(customerID, roomID)
    if (!success) {
      openNotificationWithIcon("error", "Check out faild", error?.message);
    } else { 
      openNotificationWithIcon("success", "Check out success", data?.message);
      await fetchData()
    }
  }
  return (
    <MainLayout openMenuKey="room">
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
            placeholder="room, customer name"
            onSearch={onSearch}
            enterButton
          />
          <Button type="primary" onClick={onNavigateCreateRoom}>
            <HomeOutlined /> Create
          </Button>
        </div>

        <FilterResults 
          pick={['name', 'customer.name']}
          value={search}
          data={data}
          renderResults={result => (
            <ListRoom 
              data={result} 
              onEdit={onEdit}
              onDelete={onDelete}
              onCheckOut={onCheckOut}
            />
          )}
        />
        
      </Space>
    </MainLayout>
  );
};

export default RoomPage;
