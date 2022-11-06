import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchActiveNewsItemById} from "../../../store/actionsCreators";
import {selectActiveNewsItem} from "../../../store/selectors";

const NewsItemPage = () => {
    let {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchActiveNewsItemById(id))
    }, [])

    const news = useSelector(selectActiveNewsItem);

    console.log(news);

    return (
        <>
            <span>{id}</span>
        </>);
}

export default NewsItemPage;
