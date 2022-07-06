import { Col, Input, Row, Space } from "antd";
import React from "react";
import MainLayout from "../../components/layout/main";
import ListRoom from "../../modules/ListRoom";
import "./index.scss";

const { Search } = Input;

const RoomPage = () => {
    const onSearch = (value) => console.log(value);
  return (
    <MainLayout openMenuKey="room">
        <Space direction="vertical" size={15}>
        <Row>
          <Col span={5}>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </Col>
        </Row>
        <ListRoom data={[1,1,1,1,1,1,1,1,1]} />
      </Space>
    </MainLayout>
  );
};

export default RoomPage;
