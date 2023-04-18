import KeywordListView, { Template } from "./KeywordListView.js";
import { delegate, formatRelativeDate, qs } from "../helpers.js";
import { HistoryData } from "../storage.js";

const tag = "[HistoryList]";

export default class HistoryListView extends KeywordListView<KeywordTemplate> {
  constructor() {
    super(qs("#history-list-view") as HTMLElement, new KeywordTemplate());
  }

  showHistory(data: HistoryData[] = []) {
    this.element.innerHTML = data.length > 0 ? this.template.getList(data) : this.template.getEmptyMessage();
    super.show();
  }

  bindEvents() {
    delegate(this.element, "click", "button.btn-remove", (event) => this.handleRemoveClick(event));

    super.bindEvents();
  }

  handleRemoveClick(event: Event) {
    if (event.target instanceof HTMLButtonElement) {
      console.log(tag, "handleClickRemove", event.target);
      const value = event.target.parentElement?.dataset.keyword;
      // 모델에서 삭제해야 하니 커스텀으로 밖으로 내보낸다.
      this.emit("@remove", { value });
    }
  }
}

class KeywordTemplate extends Template {
  getEmptyMessage() {
    return `<div class="empty-box">검색 이력이 없습니다.</div>`;
  }

  getList(data: HistoryData[] = []) {
    return `
      <ul class="list">
        ${data.map(this._getHistoryItem).join("")}
      </ul>
    `;
  }

  _getHistoryItem({ keyword, date }: HistoryData) {
    return `
      <li data-keyword="${keyword}">
        ${keyword}
        <span class="date">${formatRelativeDate(date)}</span>
        <button class="btn-remove"></button>
      </li>
    `;
  }
}
