import { Table } from "antd";
import React, { useEffect, useState } from "react";
import MainLayout from "../../components/layout/main";
import logsService from "../../core/services/logs";
import openNotificationWithIcon from "../../core/utils/notification";
import moment from 'moment'
const columns = [
  {
    title: "No.",
    dataIndex: "no",
  },
  {
    title: "Customer Name",
    dataIndex: "customer_name",
  },
  {
    title: "Note",
    dataIndex: "note",
  },
  {
    title: "Room",
    dataIndex: "room",
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
  },
];

const LogPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const { success, data, error } = await logsService.findAll();

    if (!success) {
      openNotificationWithIcon("error", "Fetch list logs", error?.message);
    } else {
        let _data = data.map((n, i) => ({
            key: n.id,
            no: i + 1,
            customer_name: n.customer?.name,
            room: n.room?.name,
            note: n.note,
            timestamp: moment(n.created_date).format("DD-MM-YYYY HH:mm:ss")
        }))
      setData(_data);
    }
  };
  return (
    <MainLayout openMenuKey="log">
      <Table dataSource={data} columns={columns} />
    </MainLayout>
  );
};

export default LogPage;
