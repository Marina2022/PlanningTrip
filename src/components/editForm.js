import { AbstractSmartComponent } from "./abstractSmartComponent";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


import {
  EVENT_TYPES_TO,
  EVENT_TYPES_IN,
  CITIES,
  EVENT_OFFERS,
} from "../consts";
import { getDate, getTime } from "../utils/date";
import {getDestinations} from "./mock/pointMock"

const generateEventDetails = (selectedOffers, type) => {
  let allPossibleOffers = EVENT_OFFERS.find((item) => {
    return item.type == type;
  });

  if (allPossibleOffers == undefined)
    return ``; // значит, нет офферов на этот тип события
  else allPossibleOffers = allPossibleOffers.offers;

  const offerInnerHtml = allPossibleOffers
    .map((offer, index) => {
      return `
        <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer-luggage" ${
        selectedOffers.some((item) => {
          return item.title == offer.title;
        })
          ? `checked`
          : ``
      }>
            <label class="event__offer-label" for="event-offer-${index}">
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

export class EditPoint extends AbstractSmartComponent {
  constructor(point, isNew = false) {
    super();
    this.point = point;
    this.setFavoriteHandler = this.setFavoriteHandler.bind(this);
    this._cb = null;
    this._BtnHandlersCb = null;    
    this._destInput = null;
    this._eventType = this.point.type;
    this._destination = this.point.destination    
    this._flatPickrs = [null, null];
    this._isNew = isNew;    
  }

  resetForm = ()=> {        
    this._eventType = this.point.type;    
    this._destination = this.point.destination;   
    this.rerender();
  }
  getTemplate() {
    return this.createEditForm(this.point, this._isNew);
  }

  removeElem(){
    super.removeElem();
    if (this._flatPickrs[0]) {
      this._flatPickrs[0].destroy();
      this._flatPickrs[1].destroy();
      this._flatPickrs = [null, null];      
    }
  }

  createEditForm = (point, isNew) => {
    const { base_price, date_from, date_to, is_favorite, offers } =
      point;
    const type = this._eventType;
    const destination = this._destination;
    return `
  <form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
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
        <input data-input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDate(
          date_from
        )} ${getTime(date_from)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input data-input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDate(
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
      
      ${
        isNew
          ? `<button class="event__reset-btn" type="reset">Cancel</button>`
          : `<button class="event__reset-btn" type="reset">Delete</button>`
      }     

      ${
        isNew
          ? ``
          : `  <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${
              is_favorite ? `checked` : ``
            }>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>`
      }
    

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

  recoveryListeners() {
    this.setBtnHandlers(this._BtnHandlersCb);    
    this.setFavoriteHandler(this._cb, this._pointController);
    this.setEventTypeHandler();
    this.setCityChangeHandler();
    this.setDatePickers();
  }

  setBtnHandlers(cb) {
    this._BtnHandlersCb = cb;

    this.getElem().addEventListener("submit", (e) => {      
      e.preventDefault();
      this.resetForm();
      cb();
    });

    const rollupBtn = this.getElem().querySelector(`.event__rollup-btn`);
    rollupBtn.addEventListener("click", ()=> {      
      this.resetForm();
      cb();
      
    });
    this._destInput = this.getElem().querySelector(
      ".event__input--destination"
    );

    this._destInput.addEventListener("focus", (e) => {
      e.target.value = "";
    });
  }

  setFavoriteHandler(cb) {
    this._cb = cb;    
    this.getElem()
      .querySelector(`.event__favorite-checkbox`)
      .addEventListener("change", () => {
        cb();
        //pointController.render(newPoint);
      });
  }

  setEventTypeHandler() {
    const typeBtns = this.getElem().querySelectorAll(`.event__type-input`);
    typeBtns.forEach((btn) => {
      btn.addEventListener(`change`, (e) => {        
        if (e.target.checked == true) {
          const type = e.target.value;
          this._eventType = type;
          this.rerender(); 
        }
      });
    });
  }

  setCityChangeHandler() {
    const cityInput = this.getElem().querySelector(
      `.event__input--destination`
    );
    cityInput.addEventListener(`change`, (e) => {
      const cityName = e.target.value;
      const dests = getDestinations();
      const myDestIndex = dests.findIndex((it) => it.name === cityName);     
      this._destination = dests[myDestIndex];
      this.rerender();
    });
    };

  setDatePickers(){    
    const dateInputs = this.getElem().querySelectorAll(`.event__input--time`);
    this._flatPickrs.forEach((flatP, index) => {
      if (flatP) {
        flatP.destroy();
        flatP = null;
      }
      this._flatPickr = new flatpickr(dateInputs[index], {
        defaultDate: index == 0 ? this.point.date_from : this.point.date_to,
        enableTime: true,
        allowInput: true,
        altInput: true,
        altFormat: "d/m/y H:i",
      });
    });
  }
  }
  

