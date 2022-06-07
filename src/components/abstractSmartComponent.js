import {AbstractComponent} from "./abstractComponent"

export class AbstractSmartComponent extends AbstractComponent {
  // constructor(){
  //   super();
  // }
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
}