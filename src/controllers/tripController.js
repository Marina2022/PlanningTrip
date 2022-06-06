import { SortingForm } from "../components/sortingForm";
import { tripDay } from "../components/tripDay";
import { NoEvents } from "../components/noEventsMsg";
import { getPointMockArr } from "../components/mock/pointMock";
import { render } from "../utils/render";
import { PointController } from "./pointController";

const TRIP_EVENT_COUNT = 20;

const getSortedPoints = (sortType) => {
  if (sortType == "event")
  return pointArr.slice().sort((a, b)=>{
    if (a.destination.name > b.destination.name) return 1;
    else return -1;
  });
  else if (sortType == "time")
  return pointArr.slice().sort((a, b) => {
    const diff =      
      (b.date_to - b.date_from) - (a.date_to - a.date_from);
    return diff;
  });
  else if (sortType == "price")
  return pointArr.slice().sort((a, b) => {
    return b.base_price - a.base_price;
  });
}

export class TripController {
  constructor() {
    this._container = document.querySelector(`.trip-events`);
    this._noEvents = new NoEvents();
    this._sortingForm = new SortingForm();
    this.pointArr = getPointMockArr(TRIP_EVENT_COUNT);
  }

  render() {
    const tripEvents = this._container;
    if (this.pointArr.length === 0) {
      render(tripEvents, this._noEvents, `beforeEnd`);
    } else {
      render(tripEvents, this._sortingForm, `beforeEnd`);
      this._sortingForm.setSortClickHandler((sortType) => {
        tripEvents.innerHTML = `
        <h2 class="visually-hidden">Trip events</h2>
        `;
        const sortedPoints = getSortedPoints(sortType);
        if (sortType == "event") {
          render(tripEvents, this._sortingForm, `beforeEnd`);
          this.renderTripDays(this.pointArr, tripEvents);
          return;
        }
        render(tripEvents, this._sortingForm, `beforeEnd`);
        render(tripEvents, new tripDay("", ""), `beforeEnd`);
        const tripEventsList = document.querySelector(`.trip-events__list-1`);
        sortedPoints.forEach((point) => {
          new PointController(tripEventsList, point).render();
        });
      });

      this.renderTripDays(this.pointArr, tripEvents);
    }
  }

  renderTripDays (points, tripEvents) {
  let filteredDates = [
    ...new Set(points.map((item) => item.date_from.toDateString())),
  ];

  for (let i = 0; i < filteredDates.length; i++) {
    const dateArr = points.filter(
      (item) => item.date_from.toDateString() == filteredDates[i]
    );
    const dateForRender = dateArr[0].date_from;
    render(tripEvents, new tripDay(i + 1, dateForRender), `beforeEnd`);
    const tripEventsLists = document.querySelectorAll(`.trip-events__list-1`);
    dateArr.forEach((point) => {
      new PointController(tripEventsLists[i], point).render();
    });
  }
};
}
