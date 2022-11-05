import React from "react";
import NewsPage from "./components/pages/news-page";
import {Provider} from "react-redux";
import {store} from "./store/store";

const App = () => {
  return (<Provider store={store}><NewsPage/></Provider>)
}

export default App;
