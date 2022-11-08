import React from "react";
import { LikeOutlined } from "@ant-design/icons";
import { Tag } from "antd";

const Score = ({ score }) => {
  return (
    <Tag
      style={{ display: "flex", alignItems: "center", marginLeft: 10, gap: 5 }}
      color="#f50"
    >
      {score}
      <LikeOutlined />
    </Tag>
  );
};

export default Score;
