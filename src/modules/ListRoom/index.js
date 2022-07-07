import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Tag, Typography } from "antd";
import React from "react";
import "./index.scss";
const { Meta } = Card;

const ListRoom = ({ data = [], onEdit = () => {}, onDelete = () => {} }) => {
  return (
    <>
      <Row gutter={[16, 24]}>
        {data.map((n, i) => (
          <Col key={i} className="gutter-row" span={6}>
            <Card
              style={{ width: 280, cursor: "pointer" }}
              cover={<img alt="empty" height={200} src={n.picture? `http://localhost:3011${n.picture}`:"/empty.png"} />}
            >
              <Meta
                title={n.name}
                description={
                  <Space direction="vertical" size={10} style={{width: "100%"}}>
                    <Typography.Text>
                      <b>Status :</b>  <Tag color={n.active? "#87d068": "#f50"}>{n.active? "Active": "Disable"}</Tag>
                    </Typography.Text>
                    <Typography.Text>
                      <b>Customer :</b> {n.customer?.name || "-"}
                    </Typography.Text>
                    <Space>
                      <Button type="dashed" onClick={_ => onEdit(n.id)}><EditOutlined /> Edit</Button>
                      <Button danger onClick={_ => onDelete(n.id)}><DeleteOutlined />  Delete</Button>
                    </Space>
                  </Space>
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
