import storage from "./storage.js";
import Store from "./Store.js";

const tag = "[main]";

document.addEventListener("DOMContentLoaded", main);

function main() {
  console.log(tag, "main");

  const store = new Store(storage);
}
