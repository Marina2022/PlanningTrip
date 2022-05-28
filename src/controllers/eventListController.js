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
      renderTripPoint(tripEventsLists[i], point, i);
    });
  }
};

const TRIP_EVENT_COUNT = 20;

const pointArr = getPointMockArr(TRIP_EVENT_COUNT);


export class EventListController {
  constructor() {}

  render() {
    const tripEvents = document.querySelector(`.trip-events`);
    if (pointArr.length === 0) {
      render(tripEvents, new NoEvents(), `beforeEnd`);
    } else {
      render(tripEvents, new SortingForm(), `beforeEnd`);
      renderTripDays(pointArr, tripEvents);
    }
  }
}
