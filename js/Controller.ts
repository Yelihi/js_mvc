import Store from "./Store.js";
import SearchFormView from "./view/SearchFormView.js";
import SearchResultView from "./view/SearchResultView.js";
import TabView from "./view/TabView.js";
import KeywordListView from "./view/KeywordListView.js";

const tag = "[Controller]";

interface ViewsProps {
  searchFormView: SearchFormView;
  searchResultView: SearchResultView;
  tabView: TabView;
  keywordListView: KeywordListView;
}

export default class Controller {
  store: Store;
  searchFormView: SearchFormView;
  searchResultView: SearchResultView;
  tabview: TabView;
  keywordListView: KeywordListView;

  constructor(store: Store, { searchFormView, searchResultView, tabView, keywordListView }: ViewsProps) {
    console.log(tag, "constructor");

    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabview = tabView;
    this.keywordListView = keywordListView;

    this.subscribeViewEvents();

    this.render();
  }

  subscribeViewEvents() {
    this.searchFormView.on("@submit", (event) => this.search(event.detail.value)).on("@reset", () => this.reset());
    this.tabview.on("@change", (event: CustomEvent<{ value: string }>) => this.changeTab(event.detail.value));
    this.keywordListView.on("@click", (event: CustomEvent) => this.search(event.detail.value));
  }

  search(keyword: string) {
    console.log(tag, "search", keyword);
    this.store.search(keyword);

    this.render();
  }

  reset() {
    console.log(tag, "reset");

    this.store.searchKeyword = "";
    this.store.searchResult = [];
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
    } else if (this.store.selectedTab === "HISTORY") {
      this.keywordListView.hide();
    }
  }

  renderSearchResult() {
    this.searchFormView.showValue(this.store.searchKeyword);
    this.searchResultView.showResult(this.store.searchResult);
    this.tabview.hide();
    this.keywordListView.hide();
  }
}
