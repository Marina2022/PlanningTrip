import { getTime, getTimeDiff, getDateForDayNumber } from "../utils/date";
import { EVENT_TYPES_TO, EVENT_TYPES_IN, MONTHS } from "../consts";
import { render } from "../utils/common";

const tripEvents = document.querySelector(`.trip-events`);

const createTripDays = (pointArr) => {
  const startDate = pointArr[1].date_from.getDate(); 
  // так-то надо бы с нулевой, но мы же первый элемет в едит-форм
  
  const dateArray = pointArr.map(item=>{return item.date_from.getDate()});
  let filteredDates = [...new Set(dateArray)];
  
  for (let i = 0; i < filteredDates.length; i++) {    
    const dateArr = pointArr.filter((item) => {
        return item.date_from.getDate() == filteredDates[i]
      }
    );    
    const dateForRender = dateArr[0].date_from;    
    render(tripEvents, createTripDaysMarkup(i+1, dateForRender), `beforeEnd`);

    const tripEventsLists = document.querySelectorAll(
       `.trip-events__list-1`);    

    dateArr.forEach((point) => {
      render(tripEventsLists[i], createTripEvent(point), `beforeEnd`);
    });
  }
};

const createTripDaysMarkup = (daysCount, date) => {
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

const generateOffers = (offers) => {
  
  let i=0;
  let html ='';
  for (const offer of offers) {
    i++;
    
    html += `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus; &euro;&nbsp;<span class="event__offer-price"
          >${offer.price}</span
        >
      </li>
      `;
    if (i>=3) break;   
  };
  return html;  
};
  
const createTripEvent = (pointObj) => {

  const {
    base_price,
    date_from,
    date_to,
    destination,
    is_favorite,
    offers,
    type,
  } = pointObj;
  return `
        <li class="trip-events__item">
          <div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${type} ${
    EVENT_TYPES_TO.includes(type)
      ? `to`
      : EVENT_TYPES_IN.includes(type)
      ? `in`
      : ``
  } ${destination.name}</h3>
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="
                ${date_from}">${getTime(date_from)} </time>
                &mdash;
                <time class="event__end-time" datetime="${date_to}">${getTime(date_to)}</time>
              </p>
              <p class="event__duration">${getTimeDiff(date_from, date_to)}</p>
            </div>

            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${base_price}</span>
            </p>

            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${generateOffers(offers)}
            </ul>

            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
`;
};


export { createTripEvent, createTripDays };
