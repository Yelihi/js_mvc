import { ProductData, Storage } from "./storage.js";

const tag = "[Store]";

export default class Store {
  storage: Storage;
  searchKeyword: string;
  searchResult: ProductData[];

  constructor(storage: Storage) {
    console.log(tag, "constructor");

    if (!storage) throw "no storage";

    this.storage = storage;

    this.searchKeyword = "";
    this.searchResult = [];
  }

  search(keyword: string) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((product) => product.name.includes(keyword));
  }
}
