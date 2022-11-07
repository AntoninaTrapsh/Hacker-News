import React from "react";
import {Button, Descriptions, PageHeader} from "antd";

const Header = ({news}) => {
    return (
        <PageHeader
            className="news-item__header"
            onBack={() => window.history.back()}
            title={news.info.title}
            subTitle={news.info.time}
            extra={[
                <Button key="1" type="primary">
                    <a href={news.info.url}>Follow the link</a>
                </Button>,
            ]}
        >
            <Descriptions size="small">
                <Descriptions.Item label="Author">{news.info.by}</Descriptions.Item>
            </Descriptions>
        </PageHeader>
    )
}

export default Header;
