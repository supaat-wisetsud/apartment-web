import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../components/layout/main";
import customerService from "../../core/services/customer";
import roomService from "../../core/services/room";
import openNotificationWithIcon from "../../core/utils/notification";
import FormRoom from "../../modules/FormRoom";

const RoomUpdatePageID = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [listCustomer, setListCustomer] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const { id } = params || {};
      const { success, data, error } = await roomService.findOneByID(id);
      if (success) {
        setData(data);
      } else {
        openNotificationWithIcon("error", "Fetch room", error?.message);
      }
    })();
  }, [params]);

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
    const { success, data, error } = await roomService.update(values);
    if (!success) {
      openNotificationWithIcon("error", "Create customer", error?.message);
    } else {
      openNotificationWithIcon("success", "Create customer", data.message);
    }
  };

  const fetchData = async () => {
    const { id } = params || {};
    const { success, data, error } = await roomService.findOneByID(id);
    if (success) {
      setData(data);
    } else {
      openNotificationWithIcon("error", "Fetch room", error?.message);
    }
  };
  
  const propsUploadPicture = {
    beforeUpload: (file) => {
      const isPass = ["image/png", "image/jpeg"].includes(file.type);

      if (!isPass) {
        openNotificationWithIcon(
          "warning",
          "Upload picture",
          `${file.name} is not a picture file`
        );
      }

      return isPass || Upload.LIST_IGNORE;
    },
    onChange: (info) => {},
    fileList: [],
    customRequest: async ({ file }) => {
      const { id } = params || {};
      const { success, data, error } = await roomService.uploadPicture(
        file,
        id
      );
      if (success) {
        openNotificationWithIcon("success", "Upload picture", data?.message);
        fetchData()
      } else {
        openNotificationWithIcon("error", "Upload picture", error?.message);
      }
    },
  };

  return (
    <MainLayout openMenuKey="room">
      <FormRoom
        onFinish={onFinish}
        listCustomer={listCustomer}
        type={"UPDATE"}
        defaultData={data}
        onCancel={() => {
          navigate("/room");
        }}
        propsUploadPicture={propsUploadPicture}
      />
    </MainLayout>
  );
};

export default RoomUpdatePageID;
