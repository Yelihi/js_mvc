import View from "./View.js";
import { qs } from "../helpers.js";

import { ProductData } from "../storage.js";

const tag = "[SearchResult]";

export default class SearchResultView extends View {
  template: Template;
  constructor() {
    super(qs("#search-result-view") as HTMLElement);

    this.template = new Template();
  }

  showResult(data: ProductData[] = []) {
    this.element.innerHTML = data.length > 0 ? this.template.getList(data) : this.template.getEmptyMessage();
    super.show();
  }
}

class Template {
  getEmptyMessage() {
    return `
      <div class="empty-box">검색 결과가 없습니다.</div>
    `;
  }

  getList(data: ProductData[] = []) {
    return `
      <ul class="result">
        ${data.map(this._getItem).join("")}
      </ul>
    `;
  }

  _getItem({ imageUrl, name }: ProductData) {
    return `
      <li>
        <img src="${imageUrl}" alt="${name}" />
        <p>${name}</p>
      </li>
    `;
  }
}
