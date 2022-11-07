import {Card, Col, Tag} from "antd";
import React from "react";
import styles from "./news-card.module.css"
import {LikeOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

const NewsCard = (props) => {
    function timeConverter(UNIX_timestamp) {
        const milliseconds = new Date(UNIX_timestamp * 1000);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = milliseconds.getFullYear();
        const month = months[milliseconds.getMonth()];
        const date = milliseconds.getDate();
        const hour = milliseconds.getHours();
        const min = milliseconds.getMinutes();
        const sec = milliseconds.getSeconds();
        return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    }

    return (
        <Col span={8}>
            <Link to={`/item/${props.info.id}`}>
                <Card
                    title={props.info.title}
                    extra={<Tag style={{display: 'flex', alignItems: 'center', marginLeft: 10}}
                                color="#f50">{props.info.score}<LikeOutlined/></Tag>}
                    style={{
                        marginTop: 10,
                    }}
                >
                    <div className={styles['news-card__additional-info']}>
                        <div className={styles['news-card__author']}>
                            <UserOutlined/>
                            {props.info.deleted && `by ${props.info.by}`}
                        </div>
                        <p>{timeConverter(props.info.time)}</p>
                    </div>
                </Card>
            </Link>
        </Col>
    )
}

export default NewsCard;
