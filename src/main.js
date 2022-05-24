

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
import { getPointMockArr } from "./components/mock/pointMock";
import { render } from "./utils/common";



const TRIP_EVENT_COUNT = 20;

const pointArr = getPointMockArr(TRIP_EVENT_COUNT);

console.log(getPointMockArr(TRIP_EVENT_COUNT));

/**
 * Не удаляй пока, тут заголовки!
 */
// fetch("https://16.ecmascript.pages.academy/big-trip/offers", {
//   headers: {
//       'Content-Type': 'application/json',
//       'AUTHORIZATION': 'Basic y2StXBzjFLjF18cFElf5tl5Hhxug7rjm',   
//     }
// })
  // .then((response) => {
  //   return response.json();
  // })
  // .then((data) => {
  //   console.log(data);
  // });

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


pointArr.slice(0,1).forEach((point) => {
  render(tripEvents, createEditForm(point), `beforeEnd`);
});

// пошли рендерить список

createTripDays(pointArr.slice(1));

const destInput = document.querySelector(".event__input--destination");
destInput.addEventListener('focus', function(){this.value = ""})
