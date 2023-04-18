import View from "./View.js";
import { qs, qsAll, delegate } from "../helpers.js";
export const TabType = {
    KEYWORD: "KEYWORD",
    HISTORY: "HISTORY",
};
const TabLabel = {
    [TabType.KEYWORD]: "추천 검색어",
    [TabType.HISTORY]: "최근 검색어",
};
export default class TabView extends View {
    constructor() {
        super(qs("#tab-view"));
        this.template = new Template();
        this.bindEvent();
    }
    showTab(selectedTab) {
        this.element.innerHTML = this.template.getTabList();
        // 초기 시작할 시 선택된 탭 색 넣어주기
        qsAll("li", this.element).forEach((li) => {
            li.className = li.dataset.tab === selectedTab ? "active" : "";
        });
        super.show();
    }
    bindEvent() {
        delegate(this.element, "click", "li", (event) => this.handleClick(event));
    }
    handleClick(event) {
        console.log("target", event.target);
        // event의 target이 document, element, window등의 요소가 될 수 있기 때문
        // 정해둔 li 로만 설정하기
        if (event.target instanceof HTMLLIElement) {
            const value = event.target.dataset.tab;
            this.emit("@change", { value });
        }
    }
}
class Template {
    getTabList() {
        return `
      <ul class="tabs">
        ${Object.values(TabType)
            .map((tabType) => ({ tabType, tabLabel: TabLabel[tabType] }))
            .map(this._getTab)
            .join("")}
      </ul>
    `;
    }
    _getTab({ tabType, tabLabel }) {
        return `
      <li data-tab="${tabType}">
        ${tabLabel}
      </li>
    `;
    }
}
