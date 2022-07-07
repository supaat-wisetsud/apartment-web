import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../components/layout/main";
import customerService from "../../core/services/customer";
import openNotificationWithIcon from "../../core/utils/notification";
import FormCustomer from "../../modules/FormCustomer";

const CustomerUpdatePageID = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const { id } = params || {};
      const { success, data, error } = await customerService.findOneByID(id);
      if (success) {
        setData(data);
      } else {
        openNotificationWithIcon("error", "Fetch customer", error?.message);
      }
    })();
  }, [params]);


  const fetchData = async () => {
    const { id } = params || {};
    const { success, data, error } = await customerService.findOneByID(id);
    if (success) {
      setData(data);
    } else {
      openNotificationWithIcon("error", "Fetch customer", error?.message);
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
      const { success, data, error } = await customerService.uploadProfile(
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

  const onFinish = async (values) => {
    const { success, data, error } = await customerService.update(
      values,
      params?.id
    );
    if (!success) {
      openNotificationWithIcon("error", "Update customer", error?.message);
    } else {
      openNotificationWithIcon("success", "Update customer", data?.message);
      fetchData()
    }
  };

  return (
    <MainLayout openMenuKey="customer">
      <FormCustomer
        propsUploadPicture={propsUploadPicture}
        onFinish={onFinish}
        defaultData={data}
        type={"UPDATE"}
        onCancel={() => {
          navigate("/customer");
        }}
      />
    </MainLayout>
  );
};

export default CustomerUpdatePageID;
