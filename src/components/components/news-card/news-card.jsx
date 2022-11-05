import {Card} from "antd";
import React from "react";

const NewsCard = () => {
    return (
        <Card
            title="Новость"
            extra="40"
            style={{
                width: 300,
            }}
        >
            <div>
                <p>by DarkChess</p>
                <p>24 min ago</p>
            </div>
        </Card>
    )
}

export default NewsCard;
