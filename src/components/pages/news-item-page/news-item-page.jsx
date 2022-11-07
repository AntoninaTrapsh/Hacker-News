import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchActiveNewsComments, fetchActiveNewsItemById} from "../../../store/actionsCreators";
import {selectActiveNewsItem} from "../../../store/selectors";
import Comment from "./components/comment/comment"
import {Button, Descriptions, PageHeader} from "antd";
import styles from "./news-item-page.module.css"

const NewsItemPage = () => {
    let {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchActiveNewsItemById(id))
    }, [dispatch, id])

    const news = useSelector(selectActiveNewsItem);

    // const handleShowMoreComments = () => {
    //     dispatch(fetchActiveNewsComments());
    // }

    console.log(news);

    return (
        <section>
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                title={news.info.title}
                subTitle={news.info.time}
                extra={[
                    <Button key="1" type="primary">
                        <a href={news.info.url}>Follow the link</a>
                    </Button>,
                ]}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="Author">{news.info.by}</Descriptions.Item>
                    <Descriptions.Item label="Total number of comments">{news.info.descendants}</Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <div className={styles['news-item__comments']}>
                <h3>
                    Comments
                </h3>
                {
                    news.comments.map((comment) => {
                        return <Comment key={comment.id} comment={comment}/>
                    })
                }
            </div>
        </section>);
}

export default NewsItemPage;
