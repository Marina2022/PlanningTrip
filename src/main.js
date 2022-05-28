import { TripMain } from "./components/tripMain";
import { TripMainInfo } from "./components/tripMainInfo";
import { TripMainCost } from "./components/tripMainCost";
import { Menu } from "./components/menu";
import { Filters } from "./components/filter";


import { SortingForm } from "./components/sortingForm";
import { TripEvent } from "./components/tripEvent";
import { tripDay } from "./components/tripDay";
import { EditPoint } from "./components/editForm";
import { NoEvents } from "./components/noEventsMsg";
import { NewEventBtn } from "./components/newEventBtn";

import { getPointMockArr } from "./components/mock/pointMock";
import { render, replace } from "./utils/render";


const TRIP_EVENT_COUNT = 0;

const pointArr = getPointMockArr(TRIP_EVENT_COUNT);

  const renderTripPoint = (tripEventsList, point) => {
    const pointCard = new TripEvent(point);
    const pointEdit = new EditPoint(point);
    const destInput = pointEdit.getElem().querySelector(".event__input--destination");
    
    function onInputFocus (e)  {
      this.value = "";
    }

    const onEsc = (e) => {
      if (e.keyCode ===27) {
        replace(pointCard, pointEdit);
        destInput.removeEventListener("focus", onInputFocus);
        document.removeEventListener("keyup", onEsc);
      }
    }
    const onOpenBtnClick = () => {
      replace(pointEdit, pointCard);
      const destInput = pointEdit
        .getElem()
        .querySelector(".event__input--destination");
      destInput.addEventListener("focus", onInputFocus);
      document.addEventListener('keyup', onEsc);
    }

    const onCloseClick = () => {  
        replace(pointCard, pointEdit);
        destInput.removeEventListener("focus", onInputFocus);
    };
    pointCard.setEditBtnHandler(onOpenBtnClick);
    pointEdit.setBtnHandlers(onCloseClick);    

    render(tripEventsList, pointCard, `beforeEnd`);
  }

  const renderTripDays = (pointArr) => {
    
    let filteredDates = [...new Set(pointArr.map((item) => item.date_from.toDateString()))];

    for (let i = 0; i < filteredDates.length; i++) {
      const dateArr = pointArr.filter((item) =>item.date_from.toDateString() == filteredDates[i]);
            const dateForRender = dateArr[0].date_from;
      render(
        tripEvents,
        new tripDay(i + 1, dateForRender),
        `beforeEnd`
      );     
      const tripEventsLists = document.querySelectorAll(`.trip-events__list-1`);
      dateArr.forEach((point) => {
        renderTripPoint(tripEventsLists[i], point, i);        
      });
    }
  };

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new TripMain(), `afterBegin`);
render(tripMain, new NewEventBtn(), `beforeEnd`);

// tripMainInfoCont - контейнер для названия и цены в хедере
const tripMainContainer = document.querySelector(`.trip-info`);

render(tripMainContainer, new TripMainCost(), `afterBegin`);
render(tripMainContainer, new TripMainInfo(), `afterBegin`);

const tripControls = document.querySelector(`.trip-controls`);
tripControls.innerHTML = ``;

render(tripControls, new Menu(), `beforeEnd`);
render(tripControls, new Filters(), `beforeEnd`);


const tripEvents = document.querySelector(`.trip-events`);
if (pointArr.length === 0) {
  render(tripEvents, new NoEvents(), `beforeEnd`);
} else {
  render(tripEvents, new SortingForm(), `beforeEnd`);
  renderTripDays(pointArr);
}














/***************************************
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