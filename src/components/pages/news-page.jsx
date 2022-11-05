import React, {useEffect, useState} from "react";
import NewsClient from "../services/news-client";
import NewsCard from "../components/news-card/news-card";
import {useDispatch, useSelector} from "react-redux";
import {fetchNewsIds} from "../../store/actionsCreators";
import {selectNews} from "../../store/selectors";

const NewsPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNewsIds());
    }, [])

    const news = useSelector(selectNews);

    return (
        <>
            {
                news.map((item) => {
                    console.log(item);
                    return <NewsCard key={item.id} info={item}/>
                })
            }
        </>
    );
}

export default NewsPage;
