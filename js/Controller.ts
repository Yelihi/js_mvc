import Store from "./Store.js";
import SearchFormView from "./view/SearchFormView.js";

const tag = "[Controller]";

interface ViewsProps {
  searchFormView: SearchFormView;
}

export default class Controller {
  store: Store;
  searchFormView: SearchFormView;

  constructor(store: Store, { searchFormView }: ViewsProps) {
    console.log(tag, "constructor");

    this.store = store;

    this.searchFormView = searchFormView;

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
  }

  renderSearchResult() {
    this.searchFormView.showValue(this.store.searchKeyword);
  }
}
