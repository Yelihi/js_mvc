const tag = "[Store]";

export default class Store {
  storage: Object;
  searchKeyword: string;

  constructor(storage: Object) {
    console.log(tag, "constructor");

    if (!storage) throw "no storage";

    this.storage = storage;

    this.searchKeyword = "";
  }
}
