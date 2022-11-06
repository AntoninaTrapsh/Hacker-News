import {INCREASE_PAGINATION, LOAD_MORE_NEWS_BY_ID, LOAD_NEWS_BY_ID, LOAD_NEWS_ID} from "./actions";

const initialState = {
    newsId: [],
    news: [],
    pagination: 0,
    count: 15,
    isLoadingMore: false,
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
                news: payload
            }
        case LOAD_MORE_NEWS_BY_ID:
            return {
                ...state,
                news: [...state.news, ...payload],
                isLoadingMore: false,
            }
        case INCREASE_PAGINATION:
            return {
                ...state,
                pagination: state.pagination + 1,
                isLoadingMore: true,
            }
        default:
            return state;
    }
}
