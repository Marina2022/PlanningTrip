

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
import { getPointMockArr } from "./components/mock/pointMock";



const TRIP_EVENT_COUNT = 10;

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

const startDate = pointArr[1].date_from.getDate(); // так-то надо бы с нулевой, но мы же первый элемет в едит-форм
const endDate = pointArr[pointArr.length-1].date_from.getDate();

let daysCount = 0;
for (let i = startDate; i <= endDate; i++){
  const dateArr = pointArr.slice(1).filter((item)=> item.date_from.getDate() == i);
  if (dateArr.length ===0) continue;
  daysCount++;
  const dateForRender = dateArr[0].date_from; 
  render(tripEvents, createTripDays(daysCount, dateForRender), `beforeEnd`);
  const tripEventsList = document.querySelector(`.trip-events__list-${daysCount}`);

  dateArr.forEach((point) => {
    render(tripEventsList, createTripEvent(point), `beforeEnd`);
  });
}


const destInput = document.querySelector(".event__input--destination");
destInput.addEventListener('focus', function(){this.value = ""})
