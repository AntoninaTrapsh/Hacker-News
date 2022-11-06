export const selectNewsIds = (store) => store.newsId;
export const selectNews = (store) => store.news;
export const selectCurrentNumberOfNews = (store) => (store.pagination + 1) * store.count;
export const selectLoadingMoreState = (store) => store.isLoadingMore;
export const selectLoadingNewsState = (store) => store.isLoadingNews;
