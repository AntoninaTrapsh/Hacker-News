class NewsClient {
    api = "https://hacker-news.firebaseio.com/v0/";

    async getNews(category) {
        const response = await fetch(`${this.api}${category}.json`);
        return await this.checkResponse(response);
    }

    async getStoryItem(id) {
        const response = await fetch(`${this.api}item/${id}.json`);
        return await this.checkResponse(response);
    }

    async getNewsComments(id) {
        const response = await fetch(`${this.api}item/${id}.json`);
        return await this.checkResponse(response);
    }

    async checkResponse(response) {
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error("There was a problem, can't get data from server");
        }
    }
}

export default new NewsClient();
