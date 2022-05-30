import { AbstractComponent } from "./abstractComponent";

export const sortTypes = {
  EVENT: "event",
  PRICE: "price",
  TIME: "time",
}

const createSortingForm = () => {
  return `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day"></span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
        <label class="trip-sort__btn" for="sort-event" data-sort-type="event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
        <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" data-sort-type="time" for="sort-time">
          Time
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
        <label class="trip-sort__btn" for="sort-price" data-sort-type="price">
          Price
        </label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`;
};

export class SortingForm extends AbstractComponent {
  constructor(){
    super();
    this.sortType = sortTypes.EVENT;
  }
  getTemplate() {
    return createSortingForm();
  }
  setSortClickHandler(cb){
    this.getElem().addEventListener('click', (e)=>{
      if (!e.target.classList.contains('trip-sort__btn')) return;
      if (this.sortType == e.target.dataset.sortType) return;
      cb(e.target.dataset.sortType);
      this.sortType = e.target.dataset.sortType;      
    })

  }

}
