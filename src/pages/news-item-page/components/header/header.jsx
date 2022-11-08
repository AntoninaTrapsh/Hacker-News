import React from "react";
import { Button, Descriptions, PageHeader, Tag } from "antd";
import { useHistory } from "react-router";
import timeConverter from "../../../../utils/time-converter";
import xssValidateString from "../../../../utils/xss-validation";

const Header = ({ news }) => {
  const history = useHistory();

  return (
    <PageHeader
      className="news-item__header"
      onBack={() => history.push("/")}
      title={news.info.title || "Deleted news"}
      subTitle={timeConverter(news.info.time) || null}
      extra={
        news.info.url && [
          <Button key="1" type="primary">
            <a href={news.info.url} target="_blank" rel="noreferrer">
              Follow the link
            </a>
          </Button>,
        ]
      }
    >
      <Descriptions size="small">
        <Descriptions.Item label="Author">
          {news.info.by || "unknown"}
        </Descriptions.Item>
        {news.info.deleted || news.info.dead ? (
          <Descriptions.Item label="Status">
            <Tag color="error">DELETED</Tag>
          </Descriptions.Item>
        ) : null}
      </Descriptions>
      {news.info.text ? (
        <p
          dangerouslySetInnerHTML={{
            __html: xssValidateString(news.info.text),
          }}
        />
      ) : null}
    </PageHeader>
  );
};

export default Header;
