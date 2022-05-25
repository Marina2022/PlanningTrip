
import { TripMainHeader } from "./components/tripMain";
import { TripMainHeaderInfo } from "./components/tripMainInfo";
import { TripMainHeaderCost } from "./components/tripMainCost";


import { Menu } from "./components/menu";
import { Filters } from "./components/filter";
import { SortingForm } from "./components/sortingForm";
import { EditPoint } from "./components/editForm";
import { TripEvent } from "./components/tripEvent";
import { getPointMockArr } from "./components/mock/pointMock";
import { render } from "./utils/common";
import { tripDay } from "./components/tripDays";


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

  const createTripDays = (pointArr) => {
    const dateArray = pointArr.map((item) => {
      return item.date_from.getDate();
    });
    let filteredDates = [...new Set(dateArray)];

    for (let i = 0; i < filteredDates.length; i++) {
      const dateArr = pointArr.filter((item) => {
        return item.date_from.getDate() == filteredDates[i];
      });
      const dateForRender = dateArr[0].date_from;
      render(
        tripEvents,
        new tripDay(i + 1, dateForRender).getElem(),
        `beforeEnd`
      );

      const tripEventsLists = document.querySelectorAll(`.trip-events__list-1`);

      dateArr.forEach((point) => {
        // переделать на renderTripPoint - а там уже навешать обработчиков и все такое. Ну Ок..
        render(tripEventsLists[i], new TripEvent(point).getElem(), `beforeEnd`);
      });
    }
  };

const tripMainElem = document.querySelector(`.trip-main`);
render(tripMainElem, new TripMainHeader().getElem(), `afterBegin`);

// tripMainInfoCont - контейнер для названия и цены в хедере
const tripMainInfoCont = document.querySelector(`.trip-info`);

render(tripMainInfoCont, new TripMainHeaderCost().getElem(), `afterBegin`);
render(tripMainInfoCont, new TripMainHeaderInfo().getElem(), `afterBegin`);

const tripControls = document.querySelector(`.trip-controls`);
tripControls.innerHTML = ``;
render(tripControls, new Menu().getElem(), `beforeEnd`);
render(tripControls, new Filters().getElem(), `beforeEnd`);

const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, new SortingForm().getElem(), `beforeEnd`);


pointArr.slice(0,1).forEach((point) => {
  render(tripEvents, new EditPoint(point).getElem(), `beforeEnd`);
});

// пошли рендерить список

createTripDays(pointArr.slice(1));

const destInput = document.querySelector(".event__input--destination");
destInput.addEventListener('focus', function(){this.value = ""})
