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
import {LoadingOutlined, ReloadOutlined} from '@ant-design/icons';
import Loader from "../../components/loader/loader";

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
        <>
            <h1>News List</h1>
            {
                isLoading && <Loader/>
            }
            <div className={styles['news-page__list']}>
                <Row gutter={16}>
                    {
                        news.map((item) => {
                            return <NewsCard key={item.id} info={item}/>
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
            <button className={styles['news-page__reload-button']} disabled={isLoading} onClick={handleReloadClick}>
                {
                    isLoading ? <LoadingOutlined/> : <ReloadOutlined/>
                }
            </button>
        </>
    );
}

export default NewsPage;
