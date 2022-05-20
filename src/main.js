import {render} from "./components/render";
import {
  createTripMain,
  createTripMainCost,
  createTripMainInfo,
} from "./components/tripMainIfo";
import {createMenu} from "./components/menu";
import {createMainFilters} from "./components/filter";
import {createSortingForm} from "./components/sortingForm";
import {createEditForm} from "./components/editForm";
import {createTripDays, createTripEvent} from "./components/tripContent";

const tripMainInfo = document.querySelector(`.trip-main`);
render(tripMainInfo, createTripMain(), `afterBegin`);

// tripMainInfoCont - контейнер для названия и цены в хедере
const tripMainInfoCont = document.querySelector(`.trip-info`);
render(tripMainInfoCont, createTripMainCost(), `afterBegin`);
render(tripMainInfoCont, createTripMainInfo(), `afterBegin`);

const tripControls = document.querySelector(`.trip-controls`);
tripControls.innerHTML = ``;
render(tripControls, createMenu(), `beforeEnd`);
render(tripControls, createMainFilters(), `beforeEnd`);

const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, createSortingForm(), `beforeEnd`);
render(tripEvents, createEditForm(), `beforeEnd`);
render(tripEvents, createTripDays(), `beforeEnd`);

const tripEventsList = document.querySelector(`.trip-events__list`);
for (let i = 0; i < 3; i++) {
  render(tripEventsList, createTripEvent(), `beforeEnd`);
}
