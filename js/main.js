import Controller from "./Controller.js";
import storage from "./storage.js";
import Store from "./Store.js";
import SearchFormView from "./view/SearchFormView.js";
import SearchResultView from "./view/SearchResultView.js";
import TabView from "./view/TabView.js";
import KeywordListView from "./view/KeywordListView.js";
const tag = "[main]";
document.addEventListener("DOMContentLoaded", main);
function main() {
    console.log(tag, "main");
    const store = new Store(storage);
    const views = {
        searchFormView: new SearchFormView(),
        searchResultView: new SearchResultView(),
        tabView: new TabView(),
        keywordListView: new KeywordListView(),
    };
    new Controller(store, views);
}
