import {
    CHANGE_LOADING_STATE,
    INCREASE_PAGINATION,
    LOAD_MORE_NEWS_BY_ID,
    LOAD_NEWS_BY_ID,
    LOAD_NEWS_ID, LOAD_ACTIVE_NEWS_ITEM, LOAD_ACTIVE_NEWS_COMMENTS
} from "./actions";

const initialState = {
    newsId: [],
    news: [],
    pagination: 0,
    count: 15,
    isLoadingMore: false,
    isLoadingNews: false,
    activeNewsItem: {
        info: {},
        comments: []
    },
}


export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case LOAD_NEWS_ID:
            const firstOneHundredNews = payload.slice(0, 100);
            return {
                ...state,
                newsId: firstOneHundredNews
            }
        case LOAD_NEWS_BY_ID:
            return {
                ...state,
                news: payload,
                isLoadingNews: false
            }
        case LOAD_MORE_NEWS_BY_ID:
            return {
                ...state,
                news: [...state.news, ...payload],
                isLoadingMore: false
            }
        case INCREASE_PAGINATION:
            return {
                ...state,
                pagination: state.pagination + 1,
                isLoadingMore: true
            }
        case CHANGE_LOADING_STATE:
            return {
                ...state,
                isLoadingNews: payload
            }
        case LOAD_ACTIVE_NEWS_ITEM:
            return {
                ...state,
                activeNewsItem: {
                    ...state.activeNewsItem,
                    info: payload
                },
            }
        case LOAD_ACTIVE_NEWS_COMMENTS:
            return {
                ...state,
                activeNewsItem: {
                    ...state.activeNewsItem,
                    comments: [...state.activeNewsItem.comments, ...payload]
                }
            }
        default:
            return state;
    }
}
