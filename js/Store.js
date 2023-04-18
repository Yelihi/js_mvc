import { createNextId } from "./helpers.js";
import { TabType } from "./view/TabView.js";
const tag = "[Store]";
export default class Store {
    constructor(storage) {
        console.log(tag, "constructor");
        if (!storage)
            throw "no storage";
        this.storage = storage;
        this.searchKeyword = "";
        this.searchResult = [];
        this.selectedTab = TabType.KEYWORD;
    }
    search(keyword) {
        this.searchKeyword = keyword;
        this.searchResult = this.storage.productData.filter((product) => product.name.includes(keyword));
    }
    getKeywordList() {
        return this.storage.keywordData;
    }
    getHistoryList() {
        return this.storage.historyData.sort(this._sortHistory);
    }
    _sortHistory(history1, history2) {
        if (history2.date > history1.date) {
            return 1;
        }
        else {
            return -1;
        }
    }
    removeHistory(keyword) {
        this.storage.historyData = this.storage.historyData.filter((history) => history.keyword !== keyword);
    }
    addHistory(keyword) {
        if (!keyword) {
            return;
        }
        const History = this.storage.historyData.some((history) => history.keyword === keyword);
        if (History) {
            this.removeHistory(keyword);
        }
        const id = createNextId(this.storage.historyData);
        const date = new Date();
        this.storage.historyData.unshift({ id, keyword, date });
        this.storage.historyData = this.storage.historyData.sort(this._sortHistory);
    }
}
