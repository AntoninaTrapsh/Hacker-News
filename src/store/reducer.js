import {LOAD_NEWS_ID} from "./actions";

const initialState = {
    newsId: [],
    pagination: 1,
}


export const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case LOAD_NEWS_ID:
            const firstOneHundredNews = payload.slice(0, 100);
            return {
                ...state,
                newsId: firstOneHundredNews
            }
        default:
            return state;
    }
}
