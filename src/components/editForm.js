import { AbstractComponent } from "./abstractComponent";

import {
  EVENT_TYPES_TO,
  EVENT_TYPES_IN,
  CITIES,
  EVENT_OFFERS,
} from "../consts";
import { getDate, getTime } from "../utils/date";
import { replace } from "../utils/render";

const generateEventDetails = (selectedOffers, type) => {
  let allPossibleOffers = EVENT_OFFERS.find((item) => {
    return item.type == type;
  });

  if (allPossibleOffers == undefined)
    return ``; // значит, нет офферов на этот тип события
  else allPossibleOffers = allPossibleOffers.offers;

  const offerInnerHtml = allPossibleOffers
    .map((offer) => {
      return `
        <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${
              selectedOffers.some((item) => {
                return item.title == offer.title;
              })
                ? `checked`
                : ``
            }>
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">${offer.title}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
            </label>
          </div>
          `;
    })
    .join("\n");

  return ` 
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offerInnerHtml}
        </div>
      </section>`;
};

const generateDatalist = (cityArr) => {
  let dataMarkup = cityArr
    .map((city) => {
      return `                 
        <option value="${city}"></option>`;
    })
    .join(`\n`);
  return `<datalist id="destination-list-1">${dataMarkup}</datalist>`;
};

const generateEventDestinationInfo = (dest) => {
  if (dest == null) return ``;
  const { description, name, pictures } = dest;
  return `              
        <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">${name}</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${pictures
                  .map((pict) => {
                    return `
                    <img class="event__photo" src="${pict.src}" alt="${pict.description}">
                  `;
                  })
                  .join(`\n`)}
              </div>
            </div>
          </section>`;
};

const createTypeListMarkup = (typeArr) => {
  return typeArr
    .map((type) => {
      return ` <div class="event__type-item">
            <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
              <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>
            </div>`;
    })
    .join(`\n`);
};

const createEditForm = (point) => {
  const {
    base_price,
    date_from,
    date_to,
    destination,
    is_favorite,
    offers,
    type,
  } = point;
  return `
  <form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/bus.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${createTypeListMarkup(EVENT_TYPES_TO)}
            </fieldset>
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
            ${createTypeListMarkup(EVENT_TYPES_IN)}
            </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type} ${
    EVENT_TYPES_TO.includes(type)
      ? `to`
      : EVENT_TYPES_IN.includes(type)
      ? `in`
      : ``
  }
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${
          destination.name
        }" list="destination-list-1">
        ${generateDatalist(CITIES)}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDate(
          date_from
        )} ${getTime(date_from)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDate(
          date_to
        )} ${getTime(date_to)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${base_price}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${is_favorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
          
    

    </header>    
    <section class="event__details">
    ${generateEventDetails(offers, type)}
    ${generateEventDestinationInfo(destination)}
    </section>
  </form>`;
};

export class EditPoint extends AbstractComponent {
  constructor(point) {
    super();
    this.point = point;
    this.setFavoriteHandler = this.setFavoriteHandler.bind(this);
  }
  getTemplate() {
    return createEditForm(this.point);
  }
  setBtnHandlers(cb) {    
    this.getElem().addEventListener('submit', (e) => {
      console.log(e.preventDefault);
      
      e.preventDefault();
      cb(); 
    })  
    const cancelBtn = this.getElem().querySelector(`.event__reset-btn`);
    cancelBtn.addEventListener('click', cb);

    const rollupBtn = this.getElem().querySelector(`.event__rollup-btn`);
    rollupBtn.addEventListener('click', cb);
  }

  setFavoriteHandler(cb, pointController) {
    this.getElem()
      .querySelector(`.event__favorite-checkbox`)
      .addEventListener("change", ()=>{
        const newPoint = Object.assign({}, this.point, { is_favorite: !this.point.is_favorite });
        cb(this.point, newPoint); 
        pointController.render(newPoint);

        
      });
  }
}
