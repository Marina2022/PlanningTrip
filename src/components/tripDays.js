import { getDateForDayNumber } from "../utils/date";
import { MONTHS } from "../consts";
import { createElement } from "../utils/common";

const createTripDayMarkup = (daysCount, date) => {
  console.log({ daysCount });
  return `<ul class="trip-days">
  <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${daysCount}</span>
        <time class="day__date" datetime="${getDateForDayNumber(date)}">${
    MONTHS[date.getMonth()]
  } ${date.getDate()}</time>              
      </div>      
      <ul class="trip-events__list-1">
      </ul>  
  </li>
  </ul>
 `;
};

export class tripDay {
  constructor(daysCount, date) {
    this._elem = null;
    this.daysCount = daysCount;
    this.date = date;
  }
  getTemplate() {
    return createTripDayMarkup(this.daysCount, this.date);
  }

  getElem() {
    if (!this._elem) {
      this._elem = createElement(this.getTemplate());
    }
    console.log(this._elem);
    return this._elem;
  }
  removeElem() {
    this._elem = null;
  }
}

// вот это надо либо обратно в Мейн возвращать, либо не наю че - наверное, обратно. В чем смысл всего?
