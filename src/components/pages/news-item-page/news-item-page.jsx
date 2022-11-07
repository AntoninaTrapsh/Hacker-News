import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchActiveNewsItemById} from "../../../store/actionsCreators";
import {selectActiveNewsItem} from "../../../store/selectors";
import Comment from "./components/comment/comment"
import styles from "./news-item-page.module.css"
import Header from "./components/header/header"

const NewsItemPage = () => {
    let {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchActiveNewsItemById(id))
    }, [dispatch, id])

    const news = useSelector(selectActiveNewsItem);

    console.log(news);

    return (
        <section>
            <Header news={news}/>
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
