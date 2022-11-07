import {
    CHANGE_ACTIVE_NEWS_LOADING_STATE,
    CHANGE_LOADING_STATE,
    INCREASE_PAGINATION, LOAD_ACTIVE_NEWS_COMMENTS, LOAD_ACTIVE_NEWS_ITEM, LOAD_CHILDREN_COMMENTS,
    LOAD_MORE_NEWS_BY_ID,
    LOAD_NEWS_BY_ID,
    LOAD_NEWS_ID
} from "./actions";
import NewsClient from "../components/services/news-client";

export function createIncreasePagination() {
    return {
        type: INCREASE_PAGINATION
    }
}

export function changeLoadingState(flag) {
    return async (dispatch, getState) => {
        dispatch({
            type: CHANGE_LOADING_STATE,
            payload: flag
        })
    }
}

export function changeActiveNewsLoadingState(flag) {
    return async (dispatch, getState) => {
        dispatch({
            type: CHANGE_ACTIVE_NEWS_LOADING_STATE,
            payload: flag
        })
    }
}

export function fetchNewsIds() {
    return async (dispatch) => {
        dispatch(changeLoadingState(true))

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

        const requests = ids.map((id) => NewsClient.getNewsItem(id))

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

        const requests = ids.map((id) => NewsClient.getNewsItem(id))

        Promise.all(requests)
            .then((res) => {
                dispatch({
                    type: LOAD_NEWS_BY_ID,
                    payload: res,
                })
            })
    }
}

export function fetchActiveNewsItemById(id) {
    return async (dispatch, getState) => {
        dispatch(changeActiveNewsLoadingState(true))

        NewsClient.getNewsItem(id).then((data) => {
            dispatch({
                type: LOAD_ACTIVE_NEWS_ITEM,
                payload: data,
            })
        })
            .then(() => dispatch(fetchActiveNewsComments()))
    }
}

export function fetchActiveNewsComments() {
    return async (dispatch, getState) => {
        dispatch(changeActiveNewsLoadingState(true))

        const state = getState()
        const ids = state.activeNewsItem.info.kids ? state.activeNewsItem.info.kids : []

        const requests = ids.map((id) => NewsClient.getNewsItem(id))

        Promise.all(requests)
            .then((res) => {
                dispatch({
                    type: LOAD_ACTIVE_NEWS_COMMENTS,
                    payload: res,
                })
            })
    }
}

export function fetchChildrenComments(id) {
    return async (dispatch, getState) => {
        const responseComment = await NewsClient.getNewsItem(id)

        const requests = responseComment.kids.map((id) => NewsClient.getNewsItem(id))

        Promise.all(requests)
            .then((res) => {
                dispatch({
                    type: LOAD_CHILDREN_COMMENTS,
                    payload: {
                        parent: id,
                        children: res
                    },
                })
            })
    }
}
