import React from "react";
import {useParams} from "react-router";

const NewsItemPage = () => {
    let {id} = useParams();

    return (
        <>
            <span>{id}</span>
        </>);
}

export default NewsItemPage;
