import { ProductData, Storage } from "./storage.js";
import { TabType } from "./view/TabView.js";

const tag = "[Store]";

export default class Store {
  storage: Storage;
  searchKeyword: string;
  searchResult: ProductData[];
  selectedTab: keyof typeof TabType;

  constructor(storage: Storage) {
    console.log(tag, "constructor");

    if (!storage) throw "no storage";

    this.storage = storage;

    this.searchKeyword = "";
    this.searchResult = [];
    this.selectedTab = TabType.KEYWORD;
  }

  search(keyword: string) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((product) => product.name.includes(keyword));
  }

  getKeywordList() {
    return this.storage.keywordData;
  }
}
