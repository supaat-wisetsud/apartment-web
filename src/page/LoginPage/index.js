import React from "react";

import "./index.scss";
import Login from "../../modules/FormLogin";
import FullLayout from "../../components/layout/full";
import { useNavigate } from "react-router-dom";
import authService from "../../core/services/auth";
import openNotificationWithIcon from "../../core/utils/notification";

const LoginPage = () => {
  let navigate = useNavigate();
  const onFinish = async (values) => {
    const {username, password} = values;
    const {success, error} = await authService.login(username, password)

    if (success) {
      navigate("/room", { replace: true });
    } else {
      console.log(error);
      openNotificationWithIcon('error', "Loading Is Wrong", error?.message)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <FullLayout>
      <Login onFinish={onFinish} onFinishFailed={onFinishFailed} />
    </FullLayout>
  );
};

export default LoginPage;
