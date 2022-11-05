import React, {useEffect} from "react";
import NewsCard from "../components/news-card/news-card";
import {useDispatch, useSelector} from "react-redux";
import {fetchNewsIds} from "../../store/actionsCreators";
import {selectNews} from "../../store/selectors";
import styles from "./news-pages.module.css"
import {Row} from "antd";

const NewsPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNewsIds());
    }, [])

    const news = useSelector(selectNews);

    return (
        <>
            <h1>News List</h1>
            <div className={styles['news-page__list']}>
                <Row gutter={16}>
                    {
                        news.map((item) => {
                            console.log(item);
                            return <NewsCard key={item.id} info={item}/>
                        })
                    }
                </Row>
            </div>
        </>
    );
}

export default NewsPage;
