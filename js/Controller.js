const tag = "[Controller]";
export default class Controller {
    constructor(store, { searchFormView, searchResultView, tabView, keywordListView, historyListView }) {
        console.log(tag, "constructor");
        this.store = store;
        this.searchFormView = searchFormView;
        this.searchResultView = searchResultView;
        this.tabview = tabView;
        this.keywordListView = keywordListView;
        this.historyListView = historyListView;
        this.subscribeViewEvents();
        this.render();
    }
    subscribeViewEvents() {
        this.searchFormView.on("@submit", (event) => this.search(event.detail.value)).on("@reset", () => this.reset());
        this.tabview.on("@change", (event) => this.changeTab(event.detail.value));
        this.keywordListView.on("@click", (event) => this.search(event.detail.value));
        this.historyListView.on("@click", (event) => this.search(event.detail.value)).on("@remove", (event) => this.removeHistory(event.detail.value));
    }
    search(keyword) {
        console.log(tag, "search", keyword);
        this.store.search(keyword);
        this.store.addHistory(keyword);
        this.render();
    }
    reset() {
        console.log(tag, "reset");
        this.store.searchKeyword = "";
        this.store.searchResult = [];
        this.render();
    }
    removeHistory(keyword) {
        this.store.removeHistory(keyword);
        this.render();
    }
    changeTab(tab) {
        console.log(tag, tab);
        this.store.selectedTab = tab;
        this.render();
    }
    render() {
        if (this.store.searchKeyword.length > 0) {
            return this.renderSearchResult();
        }
        this.searchResultView.hide();
        this.tabview.showTab(this.store.selectedTab);
        if (this.store.selectedTab === "KEYWORD") {
            this.keywordListView.showKeyword(this.store.getKeywordList());
            this.historyListView.hide();
        }
        else if (this.store.selectedTab === "HISTORY") {
            this.keywordListView.hide();
            this.historyListView.showHistory(this.store.getHistoryList());
        }
    }
    renderSearchResult() {
        this.searchFormView.showValue(this.store.searchKeyword);
        this.searchResultView.showResult(this.store.searchResult);
        this.tabview.hide();
        this.keywordListView.hide();
        this.historyListView.hide();
    }
}
