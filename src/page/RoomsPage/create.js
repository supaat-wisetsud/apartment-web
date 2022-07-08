import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/main";
import customerService from "../../core/services/customer";
import roomService from "../../core/services/room";
import openNotificationWithIcon from "../../core/utils/notification";
import FormRoom from "../../modules/FormRoom";

const RoomCreatePage = () => {
  const navigate = useNavigate();
  const [listCustomer, setListCustomer] = useState([]);
  useEffect(() => {
    (async function () {
      const { success, data, error } = await customerService.findAll();
      if (success) {
        setListCustomer(data);
      } else {
        openNotificationWithIcon("error", "Fetch customer", error?.message);
      }
    })();
  }, []);
  const onFinish = async (values) => {
    const {success, data, error} = await roomService.create(values)
    if (!success) {
      openNotificationWithIcon("error", "Create room", error?.message);
    } else {
      openNotificationWithIcon("success", "Create room", data.message);
    }
  };
  return (
    <MainLayout openMenuKey="room">
      <FormRoom
        onFinish={onFinish}
        listCustomer={listCustomer}
        type={"CREATE"}
        onCancel={() => {
          navigate("/room");
        }}
      />
    </MainLayout>
  );
};

export default RoomCreatePage;
