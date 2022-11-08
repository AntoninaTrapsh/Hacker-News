import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {clearNews, fetchActiveNewsComments, fetchActiveNewsItemById} from "../../../store/actionsCreators";
import {selectActiveNewsItem, selectIsLoadingActiveNewsState} from "../../../store/selectors";
import Comment from "./components/comment/comment"
import styles from "./news-item-page.module.css"
import Header from "./components/header/header"
import ReloadButton from "../../components/reload-button/reload-button";
import Loader from "../../components/loader/loader";
import {Empty} from "antd";

const NewsItemPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchActiveNewsItemById(id))
    }, [dispatch, id])

    const news = useSelector(selectActiveNewsItem);
    const isLoading = useSelector(selectIsLoadingActiveNewsState);

    const handleReloadClick = () => {
        dispatch(fetchActiveNewsComments(id))
    }

    return (
        <section>
            <Header news={news}/>
            <div className={styles['news-item__comments']}>
                <div className={styles['news-item__comments-header']}>
                    <h3>Comments</h3>
                    <p>{`Total: ${news.info.descendants}`}</p>
                </div>
                {   news.info.descendants ?
                    news.comments.map((comment) => {
                        return <Comment key={comment.id} comment={comment}/>
                    }) :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"No comments yet"}/>
                }
            </div>
            <ReloadButton handleReloadClick={handleReloadClick} isLoading={isLoading}/>
            { isLoading && <Loader/> }
        </section>);
}

export default NewsItemPage;
