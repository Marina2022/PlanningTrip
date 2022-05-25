import { createElement } from "../utils/common";

const createMenu = () => {
  return `
<h2 class="visually-hidden">Switch trip view</h2>
<nav class="trip-controls__trip-tabs trip-tabs">
  <a class="trip-tabs__btn trip-tabs__btn--active" href="#">Table</a>
  <a class="trip-tabs__btn" href="#">Stats</a>
</nav>
`;
};

export class Menu {
  constructor() {
    this._elem = null;
  }
  getTemplate() {
    return createMenu();
  }

  getElem() {
    if (!this._elem) {
      this._elem = createElement(this.getTemplate());
    }
    return this._elem;
  }
  removeElem() {
    this._elem = null;
  }
}
