import React, {useEffect, useState} from "react";
import NewsClient from "../services/news-client";
import NewsCard from "../components/news-card/news-card";
import {useDispatch} from "react-redux";
import {fetchNewsIds} from "../../store/actionsCreators";

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNewsIds())

    }, [])

    console.log(news);

    return (
        <>
            {
                news.map((id) => {
                    return <NewsCard/>
                })
            }
        </>
    );
}

export default NewsPage;
