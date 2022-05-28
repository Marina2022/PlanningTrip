import { createElement } from "../utils/render";

export class AbstractComponent {  
  constructor() {
    if (new.target === AbstractComponent) 
    throw new Error(`you can't instantiate abstract class`);
    this._elem = null;
  }
  getTemplate() {
    throw new Error(`you should implement method getTemplate for this class`);
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
