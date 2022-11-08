import { Card, Col } from "antd";
import React from "react";
import styles from "./news-card.module.css";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Score from "../score/score";
import timeConverter from "../../../../utils/time-converter";

const NewsCard = (props) => {
  return (
    <Col span={8}>
      <Link to={`/news/${props.info.id}`}>
        <Card
          title={props.info.title}
          extra={props.info.score && <Score score={props.info.score} />}
          style={{
            marginTop: 10,
          }}
        >
          <div className={styles["news-card__additional-info"]}>
            <div className={styles["news-card__author"]}>
              <UserOutlined />
              {props.info.by ? `by ${props.info.by}` : "unknown"}
            </div>
            <p>{timeConverter(props.info.time)}</p>
          </div>
        </Card>
      </Link>
    </Col>
  );
};

export default NewsCard;
