import { DeleteOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Tag, Typography } from "antd";
import React from "react";
import "./index.scss";
const { Meta } = Card;

const ListRoom = ({ data = [], onEdit = () => {}, onDelete = () => {}, onCheckOut = () => {} }) => {
  return (
    <>
      <Row gutter={[16, 24]}>
        {data.map((n, i) => (
          <Col key={i} className="gutter-row" span={6}>
            <Card
              style={{ width: 380, cursor: "pointer" }}
              cover={<img alt="empty" height={200} src={n.picture? `http://localhost:3011${n.picture}`:"/empty.png"} />}
            >
              <Meta
                title={n.name}
                description={
                  <Space direction="vertical" size={10} style={{width: "100%"}}>
                    <Typography.Text>
                      <b>Status Room :</b>  <Tag color={n.active? (!n.customer? "#87d068": "#5DADE2"): "#f50"}>{n.active? (!n.customer? "ยังว่างเปิดให้ใช้งาน": "มีผู้เข้าพัก"): "ปิดปรับปรุง"}</Tag>
                    </Typography.Text>
                    <Typography.Text>
                      <b>Price :</b> {n.price || "-"}
                    </Typography.Text>
                    <Typography.Text>
                      <b>Customer :</b> {n.customer?.name || "-"}
                    </Typography.Text>
                    <Space>
                      <Button type="dashed" onClick={_ => onEdit(n.id)}><EditOutlined /> Edit</Button>
                      <Button type="primary"  onClick={_ => onCheckOut(n.customer.id, n.id)} disabled={!n.customer}><LogoutOutlined /> Check out</Button>
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
