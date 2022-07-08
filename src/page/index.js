import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../core/services/auth";

const IndexApp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = authService.getToken();
    if (!token) {
      navigate("/login");
    } else {
      navigate("/room");
    }
  }, [navigate]);

  return <></>;
};

export default IndexApp;
