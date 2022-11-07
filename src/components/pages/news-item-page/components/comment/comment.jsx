import {Avatar, Comment as AntComment, Tag, Tooltip} from "antd";
import React from "react";
import { fetchChildrenComments} from "../../../../../store/actionsCreators";
import {useDispatch} from "react-redux";
import {DeleteOutlined, StopOutlined} from "@ant-design/icons";
import xssValidateString from "../../../../../utils/xss-validation";
import timeConverter from "../../../../../utils/time-converter";

const Comment = ({comment}) => {
    const dispatch = useDispatch();

    const handleShowMoreComments = () => {
        dispatch(fetchChildrenComments(comment.id));
    }

    return (
        <AntComment
            key={comment.id}
            actions={comment?.kids && [ <span key="comment-nested-reply-to" onClick={handleShowMoreComments}>Show replies</span>]}
            author={<a>{comment.by ? comment.by : "unknown"}</a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt={comment.by}/>}
            content={
                <div>
                    {comment.text ? <p dangerouslySetInnerHTML={{__html: xssValidateString(comment.text)}}/> : null}
                    {comment.deleted ? <Tag color="error">This comment was deleted. <DeleteOutlined /></Tag> : null}
                    {comment.dead ? <Tag color="error">This comment was killed by software, user flags, or moderators. <StopOutlined /></Tag> : null}
                </div>
            }
            datetime={<span>{timeConverter(comment.time)}</span>}
        >
            {comment.childComments ? comment.childComments.map(child => <Comment key={child.id} comment={child}/>) : null }
        </AntComment>
    )
}

export default Comment;
