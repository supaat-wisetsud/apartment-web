import React from "react";

import "./index.scss";
import Login from "../../modules/FormLogin";
import FullLayout from "../../components/layout/full";
import { useNavigate } from "react-router-dom";
import authService from "../../core/services/auth";

const LoginPage = () => {
  let navigate = useNavigate();
  const onFinish = async (values) => {
    const {username, password} = values;
    try {
        await authService.login(username, password)
        navigate("/room", { replace: true });
    } catch (e) {
        console.error(e);
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
