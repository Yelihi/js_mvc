import Store from "./Store.js";
import SearchFormView from "./view/SearchFormView.js";
import SearchResultView from "./view/SearchResultView.js";

const tag = "[Controller]";

interface ViewsProps {
  searchFormView: SearchFormView;
  searchResultView: SearchResultView;
}

export default class Controller {
  store: Store;
  searchFormView: SearchFormView;
  searchResultView: SearchResultView;

  constructor(store: Store, { searchFormView, searchResultView }: ViewsProps) {
    console.log(tag, "constructor");

    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;

    this.subscribeViewEvents();

    this.render();
  }

  subscribeViewEvents() {
    this.searchFormView.on("@submit", (event) => this.search(event.detail.value)).on("@reset", () => this.reset());
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

  render() {
    if (this.store.searchKeyword.length > 0) {
      return this.renderSearchResult();
    }

    this.searchResultView.hide();
  }

  renderSearchResult() {
    this.searchFormView.showValue(this.store.searchKeyword);
    this.searchResultView.showResult(this.store.searchResult);
  }
}
