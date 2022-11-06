import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchActiveNewsComments, fetchActiveNewsItemById} from "../../../store/actionsCreators";
import {selectActiveNewsItem} from "../../../store/selectors";
import {Avatar, Comment, Tooltip} from "antd";

const NewsItemPage = () => {
    let {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchActiveNewsItemById(id))
    }, [dispatch, id])

    const news = useSelector(selectActiveNewsItem);

    const handleShowMoreComments = () => {
        dispatch(fetchActiveNewsComments());
    }

    console.log(news);

    return (
        <div>
            {
                news.comments.map((comment) => {
                    return <Comment
                        key={comment.id}
                        actions={[comment.kids && <span key="comment-nested-reply-to" onClick={handleShowMoreComments}>Показать ветку</span>]}
                        author={<a>{comment.by}</a>}
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt={comment.by}/>}
                        content={
                            <p>
                                {comment.text}
                            </p>
                        }
                        datetime={
                            <Tooltip title="2016-11-22 11:22:33">
                                <span>8 hours ago</span>
                            </Tooltip>
                        }
                    >
                        {/*{children}*/}
                    </Comment>
                })
            }
        </div>);
}

export default NewsItemPage;
