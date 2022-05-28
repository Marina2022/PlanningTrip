import { getDateForDayNumber } from "../utils/date";
import { MONTHS } from "../consts";
import { AbstractComponent } from "./abstractComponent";

const createTripDayMarkup = (daysCount, date) => {
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

export class tripDay extends AbstractComponent {
  constructor(daysCount, date) {
    super();    
    this.daysCount = daysCount;
    this.date = date;
  }
  getTemplate() {
    return createTripDayMarkup(this.daysCount, this.date);
  }
}

