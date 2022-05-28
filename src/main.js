
import { TripMainHeader } from "./components/tripMain";
import { TripMainHeaderInfo } from "./components/tripMainInfo";
import { TripMainHeaderCost } from "./components/tripMainCost";


import { Menu } from "./components/menu";
import { Filters } from "./components/filter";
import { SortingForm } from "./components/sortingForm";
import { TripEvent } from "./components/tripEvent";
import { getPointMockArr } from "./components/mock/pointMock";
import { render, replace } from "./utils/render";
import { tripDay } from "./components/tripDay";
import { EditPoint } from "./components/editForm";
import { NoEvents } from "./components/noEventsMsg";


const TRIP_EVENT_COUNT = 20;

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
        //tripEventsList.replaceChild(pointCard, pointEdit);
        replace(pointCard, pointEdit);
        destInput.removeEventListener("focus", onInputFocus);
        document.removeEventListener("keyup", onEsc);
      }
    }
    const onOpenBtnClick = () => {
      tripEventsList.replaceChild(pointEdit, pointCard);

      const destInput = document.querySelector(".event__input--destination");
      destInput.addEventListener("focus", onInputFocus);

      document.addEventListener('keyup', onEsc);


    }
    const onCloseClick = (e) => {  
        if (e.target == pointEdit) e.preventDefault();
        tripEventsList.replaceChild(pointCard, pointEdit);
        destInput.removeEventListener("focus", onInputFocus);
    };

    const openBtn = pointCard.getElem().querySelector(`.event__rollup-btn`);
    openBtn.addEventListener('click', onOpenBtnClick)

    const cancelBtn = pointEdit.getElem().querySelector(`.event__reset-btn`);
    cancelBtn.addEventListener("click", onCloseClick);
    
    pointEdit.getElem().addEventListener("submit", onCloseClick);

    

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

const tripMainElem = document.querySelector(`.trip-main`);
render(tripMainElem, new TripMainHeader(), `afterBegin`);

// tripMainInfoCont - контейнер для названия и цены в хедере
const tripMainInfoCont = document.querySelector(`.trip-info`);

render(tripMainInfoCont, new TripMainHeaderCost(), `afterBegin`);
render(tripMainInfoCont, new TripMainHeaderInfo(), `afterBegin`);

const tripControls = document.querySelector(`.trip-controls`);
tripControls.innerHTML = ``;

render(tripControls, new Menu(), `beforeEnd`);
render(tripControls, new Filters(), `beforeEnd`);

const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, new SortingForm(), `beforeEnd`);

renderTripDays(pointArr);














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