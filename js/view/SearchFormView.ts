import View from "./View.js";
import { qs, on } from "../helpers.js";

const tag = "[SearchFormView]";

export default class SearchFormView extends View {
  inputElement: HTMLInputElement;
  resetElement: HTMLElement;

  constructor() {
    console.log(tag, "constructor");

    super(qs("#search-form-view") as HTMLElement);

    this.inputElement = qs("[type=text]", this.element) as HTMLInputElement;
    this.resetElement = qs("[type=reset]", this.element) as HTMLElement;

    this.showResetButton(false);
    this.bindEvents();
  }

  showResetButton(visible: boolean = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }

  bindEvents() {
    on(this.inputElement, "keyup", () => this.handleKeyup());
    this.on("submit", (event) => this.handleSubmit(event));
    this.on("reset", () => this.handleReset());
  }

  handleKeyup() {
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0);

    if (value.length <= 0) {
      this.handleReset();
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    const { value } = this.inputElement;
    this.emit("@submit", { value });
  }

  handleReset() {
    this.emit("@reset");
    this.showValue();
  }

  showValue(value = "") {
    this.inputElement.value = value;
    this.showResetButton(this.inputElement.value.length > 0);
    super.show();
  }
}
