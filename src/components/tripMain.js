import {createElement} from "../utils/common"

const createTripMain = () => {
  return `  <section class="trip-main__trip-info  trip-info">            
          </section>`;
};


export class TripMainHeader {
  constructor(){
    this._elem = null;
  }
  getTemplate(){
    return createTripMain();
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


