import { emit, on } from "../helpers.js";

const tag = "[View]";

export default class View {
  element!: HTMLElement;
  originalDisplay: string;
  constructor(element: HTMLElement) {
    console.log(tag, "constructor");

    if (!element) throw "no element";

    this.element = element;
    this.originalDisplay = this.element.style.display || "";

    return this;
  }

  hide() {
    this.element.style.display = "none";
    return this;
  }

  show() {
    this.element.style.display = this.originalDisplay;
    return this;
  }

  on(eventName: string, handler: (...args: any) => void) {
    on(this.element, eventName, handler);
    return this;
  }

  emit(eventName: string, data: any = null) {
    emit(this.element, eventName, data);
    return this;
  }
}
