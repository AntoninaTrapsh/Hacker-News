import React, {useCallback, useEffect, useState} from "react";
import NewsCard from "./components/news-card/news-card";
import {useDispatch, useSelector} from "react-redux";
import {createIncreasePagination, fetchMoreNewsByIds, fetchNewsIds} from "../../../store/actionsCreators";
import {
    selectNews,
    selectCurrentNumberOfNews,
    selectNewsIds,
    selectLoadingMoreState,
    selectLoadingNewsState
} from "../../../store/selectors";
import styles from "./news-pages.module.css"
import {Button, Row} from "antd";
import Loader from "../../components/loader/loader";
import ReloadButton from "../../components/reload-button/reload-button";

const NewsPage = () => {
    const [reloadInterval, setReloadInterval] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNewsIds());
    }, [dispatch])

    useEffect(() => {
        let timer = setInterval(function () {
            dispatch(fetchNewsIds());
        }, 60000);
        return (() => {
            clearInterval(timer);
        })
    }, [dispatch, reloadInterval])

    const handleShowMoreClick = useCallback(() => {
        dispatch(createIncreasePagination())
        dispatch(fetchMoreNewsByIds());
    }, [dispatch])

    const handleReloadClick = useCallback(() => {
        dispatch(fetchNewsIds());

        setReloadInterval(!reloadInterval);
    }, [dispatch, reloadInterval])

    const news = useSelector(selectNews);
    const currentNumberOfNews = useSelector(selectCurrentNumberOfNews);
    const totalNews = useSelector(selectNewsIds).length;
    const isLastNewsAtList = currentNumberOfNews >= totalNews;
    const isLoading = useSelector(selectLoadingNewsState);
    const isLoadingMore = useSelector(selectLoadingMoreState);

    return (
        <section className={styles['news-page']}>
            <h1>News List</h1>
            <div className={styles['news-page__wrapper']}>
                <div className={styles['news-page__list']}>
                    <Row gutter={16}>
                        {
                            news.map((item) => {
                                return item && <NewsCard key={item.id} info={item}/>
                            })
                        }
                    </Row>
                </div>
                {
                    !isLastNewsAtList && !isLoading ?
                        <Button type="default" loading={isLoadingMore} style={{marginLeft: "auto", marginRight: "auto"}}
                                disabled={isLoadingMore && isLoading} onClick={() => {
                            handleShowMoreClick()
                        }}>More</Button> : null
                }
            </div>
            <ReloadButton handleReloadClick={handleReloadClick} isLoading={isLoading}/>
            {isLoading && <Loader/>}
        </section>
    );
}

export default NewsPage;
