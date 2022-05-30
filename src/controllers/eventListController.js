import { SortingForm } from "../components/sortingForm";
import { TripEvent } from "../components/tripEvent";
import { tripDay } from "../components/tripDay";
import { EditPoint } from "../components/editForm";
import { NoEvents } from "../components/noEventsMsg";
import { getPointMockArr } from "../components/mock/pointMock";
import { render, replace } from "../utils/render";


const renderTripPoint = (tripEventsList, point) => {
  const pointCard = new TripEvent(point);
  const pointEdit = new EditPoint(point);
  const destInput = pointEdit
    .getElem()
    .querySelector(".event__input--destination");

  function onInputFocus(e) {
    this.value = "";
  }

  const onEsc = (e) => {
    if (e.keyCode === 27) {
      replace(pointCard, pointEdit);
      destInput.removeEventListener("focus", onInputFocus);
      document.removeEventListener("keyup", onEsc);
    }
  };
  const onOpenBtnClick = () => {
    replace(pointEdit, pointCard);
    const destInput = pointEdit
      .getElem()
      .querySelector(".event__input--destination");
    destInput.addEventListener("focus", onInputFocus);
    document.addEventListener("keyup", onEsc);
  };

  const onCloseClick = () => {
    replace(pointCard, pointEdit);
    destInput.removeEventListener("focus", onInputFocus);
  };
  pointCard.setEditBtnHandler(onOpenBtnClick);
  pointEdit.setBtnHandlers(onCloseClick);

  render(tripEventsList, pointCard, `beforeEnd`);
};

const renderTripDays = (pointArr, tripEvents) => {
  let filteredDates = [
    ...new Set(pointArr.map((item) => item.date_from.toDateString())),
  ];

  for (let i = 0; i < filteredDates.length; i++) {
    const dateArr = pointArr.filter(
      (item) => item.date_from.toDateString() == filteredDates[i]
    );
    const dateForRender = dateArr[0].date_from;
    render(tripEvents, new tripDay(i + 1, dateForRender), `beforeEnd`);
    const tripEventsLists = document.querySelectorAll(`.trip-events__list-1`);
    dateArr.forEach((point) => {
      renderTripPoint(tripEventsLists[i], point);
    });
  }
};

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
  

const TRIP_EVENT_COUNT = 20;
const pointArr = getPointMockArr(TRIP_EVENT_COUNT);
export class EventListController {
  constructor() {
    this._container = document.querySelector(`.trip-events`);
    this._noEvents = new NoEvents();
    this._sortingForm = new SortingForm();
  }

  render() {
    const tripEvents = this._container;
    if (pointArr.length === 0) {
      render(tripEvents, this._noEvents, `beforeEnd`);
    } else {
      render(tripEvents, this._sortingForm, `beforeEnd`);

      this._sortingForm.setSortClickHandler((sortType)=>{
        tripEvents.innerHTML = `
        <h2 class="visually-hidden">Trip events</h2>
        `;

        const sortedPoints = getSortedPoints(sortType);
        if (sortType == "event") {
          render(tripEvents, this._sortingForm, `beforeEnd`);
          renderTripDays(pointArr, tripEvents);
          return;          
        }
          render(tripEvents, this._sortingForm, `beforeEnd`);
        render(tripEvents, new tripDay("", ""), `beforeEnd`);
        const tripEventsList = document.querySelector(`.trip-events__list-1`);        
        sortedPoints.forEach((point) => {
          renderTripPoint(tripEventsList, point);
        });
      });
      
      renderTripDays(pointArr, tripEvents);
    }
  }
}
