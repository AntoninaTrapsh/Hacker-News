import {INCREASE_PAGINATION, LOAD_MORE_NEWS_BY_ID, LOAD_NEWS_BY_ID, LOAD_NEWS_ID} from "./actions";
import NewsClient from "../components/services/news-client";

export function createIncreasePagination() {
    return {
        type: INCREASE_PAGINATION
    }
}

export function fetchNewsIds() {
    return async (dispatch) => {
        const data = await NewsClient.getNews("newstories")
        dispatch({
            type: LOAD_NEWS_ID,
            payload: data
        })

        dispatch(fetchNewsByIds())
    }
}

export function fetchMoreNewsByIds() {
    return async (dispatch, getState) => {
        const state = getState()
        const fromId = state.pagination * state.count
        const ids = state.newsId.slice(fromId, fromId + state.count)

        const requests = ids.map((id) => NewsClient.getStoryItem(id))

        Promise.all(requests)
            .then((res) => {
                dispatch({
                    type: LOAD_MORE_NEWS_BY_ID,
                    payload: res,
                })
            })
    }
}

export function fetchNewsByIds() {
    return async (dispatch, getState) => {
        const state = getState()
        const finishId = state.pagination * state.count
        const ids = state.newsId.slice(0, finishId + state.count)

        const requests = ids.map((id) => NewsClient.getStoryItem(id))

        Promise.all(requests)
            .then((res) => {
                dispatch({
                    type: LOAD_NEWS_BY_ID,
                    payload: res,
                })
            })
    }
}
