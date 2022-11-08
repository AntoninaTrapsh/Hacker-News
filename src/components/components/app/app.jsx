import React from "react";
import NewsPage from "../../pages/news-page/news-page";
import {Provider} from "react-redux";
import {store} from "../../../store/store";
import "./app.module.css";
import {Switch, Route} from "react-router-dom";
import NewsItemPage from "../../pages/news-item-page/news-item-page";
import PageNotFound from "../../pages/page-not-found/page-not-found";
import Header from "../header/header";

const App = () => {
    return (
        <Provider store={store}>
            <Header/>
            <main>
                <Switch>
                    <Route exact path="/">
                        <NewsPage/>
                    </Route>
                    <Route exact path="/item/:id">
                        <NewsItemPage/>
                    </Route>
                    <Route exact path="*">
                        <PageNotFound/>
                    </Route>
                </Switch>
            </main>
        </Provider>
    )
}

export default App;
