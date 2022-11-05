import {LOAD_NEWS_BY_ID, LOAD_NEWS_ID} from "./actions";

const initialState = {
    newsId: [],
    news: [],
    pagination: 1,
    count: 10,
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
        default:
            return state;
    }
}
