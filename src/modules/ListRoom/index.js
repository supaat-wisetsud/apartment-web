import { Card, Col, Row, Tag } from "antd";
import React from "react";
import "./index.scss";
const { Meta } = Card;

const ListRoom = ({ data = [], onClick }) => {
  return (
    <>
      <Row gutter={[16, 24]}>
        {data.map((n, i) => (
          <Col key={i} className="gutter-row" span={6}>
            <Card
              style={{ width: 240, cursor: "pointer" }}
              cover={<img alt="empty" src="/empty.png" />}
            >
              <Meta
                title="S23"
                description={
                  <div>
                    Status : <Tag color="#87d068">Active</Tag>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ListRoom;
