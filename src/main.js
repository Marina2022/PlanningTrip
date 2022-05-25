
import { TripMainHeader } from "./components/tripMain";
import { TripMainHeaderInfo } from "./components/tripMainInfo";
import { TripMainHeaderCost } from "./components/tripMainCost";


import { Menu } from "./components/menu";
import { Filters } from "./components/filter";
import { SortingForm } from "./components/sortingForm";
import { TripEvent } from "./components/tripEvent";
import { getPointMockArr } from "./components/mock/pointMock";
import { render } from "./utils/common";
import { tripDay } from "./components/tripDays";
import { EditPoint } from "./components/editForm";


const TRIP_EVENT_COUNT = 20;

const pointArr = getPointMockArr(TRIP_EVENT_COUNT);

  const renderTripPoint = (tripEventsList, point) => {
    const pointCard = new TripEvent(point).getElem();
    const pointEdit = new EditPoint(point).getElem();
    const destInput = pointEdit.querySelector(".event__input--destination");
    
    function onInputFocus (e)  {
      this.value = "";
    }

    const onEsc = (e) => {
      if (e.keyCode ===27) {
        tripEventsList.replaceChild(pointCard, pointEdit);
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

    const openBtn = pointCard.querySelector(`.event__rollup-btn`);
    openBtn.addEventListener('click', onOpenBtnClick)

    const cancelBtn = pointEdit.querySelector(`.event__reset-btn`);
    cancelBtn.addEventListener("click", onCloseClick);
    
    pointEdit.addEventListener("submit", onCloseClick);

    

    render(tripEventsList, pointCard, `beforeEnd`);
  }

  const renderTripDays = (pointArr) => {
    
    let filteredDates = [...new Set(pointArr.map((item) => item.date_from.getDate()))];

    for (let i = 0; i < filteredDates.length; i++) {
      const dateArr = pointArr.filter((item) =>item.date_from.getDate() == filteredDates[i]);
      const dateForRender = dateArr[0].date_from;
      render(
        tripEvents,
        new tripDay(i + 1, dateForRender).getElem(),
        `beforeEnd`
      );     
      const tripEventsLists = document.querySelectorAll(`.trip-events__list-1`);
      dateArr.forEach((point) => {
        renderTripPoint(tripEventsLists[i], point, i);        
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