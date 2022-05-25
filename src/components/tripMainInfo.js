import {createElement} from "../utils/common";

const createTripMainInfo = () => {
  return `<div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

              <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
            </div>`;
};


export class TripMainHeaderInfo {
  constructor() {
    this._elem = null;
  }
  getTemplate() {
    return createTripMainInfo();
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