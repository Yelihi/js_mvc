const tag = "[Controller]";

export default class Controller {
  store: Object;
  constructor(store, {}) {
    console.log(tag, "constructor");

    this.store = store;
  }
}
