import View from "./View.js";
import { qs, delegate } from "../helpers.js";

import { KeywordData } from "../storage.js";
const tag = "[KeywordList]";

export default class KeywordListView extends View {
  template: Template;
  constructor(element = qs("#keyword-list-view") as HTMLElement, template = new Template()) {
    super(element);

    this.template = template;
    this.bindEvents();
  }

  showKeyword(data: KeywordData[] = []) {
    this.element.innerHTML = data.length > 0 ? this.template.getList(data) : this.template.getEmptyMessage();
    super.show();
  }

  bindEvents() {
    delegate(this.element, "click", "li", (event: Event) => this.handleClick(event));
  }

  handleClick(event: Event) {
    if (event.target instanceof HTMLLIElement) {
      console.log(tag, event.target.dataset.keyword);
      const value = event.target.dataset.keyword;
      this.emit<{ value: string | undefined }>("@click", { value });
    }
  }
}

class Template {
  getEmptyMessage() {
    return `<div class="empty-box">추천 검색어가 없습니다</div>`;
  }

  getList(data: KeywordData[] = []) {
    return `
      <ul class="list">
        ${data.map(this._getItem).join("")}
      </ul>
    `;
  }

  _getItem({ id, keyword }: KeywordData) {
    return `
      <li data-keyword="${keyword}">
        <span class="number">${id}</span>
        ${keyword}
      </li> 
    `;
  }
}
