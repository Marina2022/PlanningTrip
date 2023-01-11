import {AbstractComponent} from "./abstractComponent";

export class AbstractSmartComponent extends AbstractComponent {
  rerender() {
    const oldELem = this._elem;
    this.removeElem();
    const newElem = this.getElem();
    oldELem.parentElement.replaceChild(newElem, oldELem);
    this.recoveryListeners();
  }

  recoveryListeners() {
    throw new Error(`be sure to implement method recoveryEvents`);
  }

  hide() {
    this.getElem().classList.add(`visually-hidden`);
  }

  show() {
    this.getElem().classList.remove(`visually-hidden`);
  }
}
