import {
    CHANGE_ACTIVE_NEWS_LOADING_STATE,
    CHANGE_LOADING_STATE, CLEAR_NEWS,
    INCREASE_PAGINATION,
    LOAD_ACTIVE_NEWS_COMMENTS,
    LOAD_ACTIVE_NEWS_ITEM,
    LOAD_CHILDREN_COMMENTS,
    LOAD_MORE_NEWS_BY_ID,
    LOAD_NEWS_BY_ID,
    LOAD_NEWS_ID
} from "./actions";

const initialState = {
    newsId: [],
    news: [],
    pagination: 0,
    count: 15,
    isLoadingMore: false,
    isLoadingNews: false,
    isLoadingActiveNews: false,
    activeNewsItem: {
        info: {},
        comments: []
    },
}

const findCommentById = (comments, id) => {
    const stack = [...comments]

    while (stack.length) {
        const comment = stack.pop()

        if (comment.id === id) {
            return {
                el: comment
            }
        }

        if (comment.childComments) {
            const elIndex = comment.childComments.findIndex(child => child.id === id)

            if (elIndex !== -1) {
                return {
                    el: comment.childComments[elIndex],
                    elIndex
                }
            }

            stack.push(...comment.childComments)
        }
    }
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
        case CLEAR_NEWS:
            console.log(2)
            return {
                ...state,
                newsIds: [],
                news: [],
                pagination: 0,
            }
        case CHANGE_ACTIVE_NEWS_LOADING_STATE:
            return {
                ...state,
                isLoadingActiveNews: payload
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
                isLoadingActiveNews: false,
                activeNewsItem: {
                    ...state.activeNewsItem,
                    comments: [...payload]
                }
            }
        case LOAD_CHILDREN_COMMENTS:

            const {el, elIndex} = findCommentById(state.activeNewsItem.comments, payload.parent)

            if (!el.childComments) {
                el.childComments = [...payload.children]
            } else {

                const comment = el.childComments[elIndex]

                el.childComments[elIndex] = {
                    ...comment,
                    childComments: payload.children
                }

            }
            return {
                ...state,
                activeNewsItem: {
                    ...state.activeNewsItem,
                    comments: [...state.activeNewsItem.comments]
                }
            }
        default:
            return state;
    }
}
