import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchActiveNewsComments, fetchActiveNewsItemById} from "../../../store/actionsCreators";
import {selectActiveNewsItem} from "../../../store/selectors";
import Comment from "./components/comment/comment"

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
        <div>
            {
                news.comments.map((comment) => {
                    return <Comment key={comment.id} comment={comment}/>
                })
            }
        </div>);
}

export default NewsItemPage;
