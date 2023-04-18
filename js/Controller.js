const tag = "[Controller]";
export default class Controller {
    constructor(store, { searchFormView }) {
        console.log(tag, "constructor");
        this.store = store;
        this.searchFormView = searchFormView;
        this.subscribeViewEvents();
        this.render();
    }
    subscribeViewEvents() {
        this.searchFormView.on("@submit", (event) => this.search(event.detail.value)).on("@reset", () => this.reset());
    }
    search(keyword) {
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
