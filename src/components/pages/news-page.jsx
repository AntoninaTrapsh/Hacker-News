import React, {useCallback, useEffect} from "react";
import NewsCard from "../components/news-card/news-card";
import {useDispatch, useSelector} from "react-redux";
import {createIncreasePagination, fetchNewsByIds, fetchNewsIds} from "../../store/actionsCreators";
import {selectNews, selectCurrentNumberOfNews, selectNewsIds} from "../../store/selectors";
import styles from "./news-pages.module.css"
import {Button, Row} from "antd";

const NewsPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNewsIds());
    }, [dispatch])

   const handleShowMoreClick = useCallback(() => {
       dispatch(createIncreasePagination())
       dispatch(fetchNewsByIds());
   }, [dispatch])

    const news = useSelector(selectNews);
    const currentNumberOfNews = useSelector(selectCurrentNumberOfNews);
    const totalNews = useSelector(selectNewsIds).length;
    let isLastNewsAtList = currentNumberOfNews >= totalNews;
    console.log(totalNews);

    return (
        <>
            <h1>News List</h1>
            <div className={styles['news-page__list']}>
                <Row gutter={16}>
                    {
                        news.map((item) => {
                            // console.log(item);
                            return <NewsCard key={item.id} info={item}/>
                        })
                    }
                </Row>
            </div>
            {
                !isLastNewsAtList &&
                <Button type="default" style={{marginLeft: "auto", marginRight: "auto"}} onClick={() => {handleShowMoreClick()}}>More</Button>
            }
        </>
    );
}

export default NewsPage;
