import React from "react";
import NewsPage from "./components/pages/news-page";
import {Provider} from "react-redux";
import {store} from "./store/store";
import styles from "./app.module.css";

const App = () => {
    return (
        <main>
            <Provider store={store}><NewsPage/></Provider>
        </main>
    )
}

export default App;
