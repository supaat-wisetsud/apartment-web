import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/main";
import customerService from "../../core/services/customer";
import openNotificationWithIcon from "../../core/utils/notification";
import FormCustomer from "../../modules/FormCustomer";

const CustomerCreatePageID = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const {success, error, data } = await customerService.create(values)
    if (!success) {
        openNotificationWithIcon("error", "Create customer", error?.message)
    } else {
        openNotificationWithIcon("success", "Create customer", data.message)
    }
  };

  return (
    <MainLayout openMenuKey="customer">
      <FormCustomer
        onFinish={onFinish}
        type={"CREATE"}
        onCancel={() => {
            navigate("/customer")
        }}
      />
    </MainLayout>
  );
};

export default CustomerCreatePageID;
