import {LOAD_NEWS_ID} from "./actions";
import NewsClient from "../components/services/news-client";

export function fetchNewsIds() {
    return async (dispatch, getState) => {
        const data = await NewsClient.getNews("newstories")
        dispatch({
            type: LOAD_NEWS_ID,
            payload: data
        })
    }
}
