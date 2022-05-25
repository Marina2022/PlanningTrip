import { createElement } from "../utils/common";

export const createMainFilters = () => {
  return `
  <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
        <label class="trip-filters__filter-label" for="filter-past">Past</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>

  `;
};



export class Filters {
  constructor() {
    this._elem = null;
  }
  getTemplate() {
    return createMainFilters();
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
