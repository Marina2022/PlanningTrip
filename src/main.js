import { TripMain } from "./components/tripMain";
import { TripMainInfo } from "./components/tripMainInfo";
import { TripMainCost } from "./components/tripMainCost";
import { Menu } from "./components/menu";
import { NewEventBtn } from "./components/newEventBtn";
import { TripController } from "./controllers/tripController";
import { render } from "./utils/render";
import { getDestinations, getPointMockArr } from "./components/mock/pointMock";
import { PointsModel } from "./models/pointsModel";
import { FilterController } from "./controllers/filterController";
import { EVENT_OFFERS } from "./consts";

const TRIP_EVENT_COUNT = 5;
const points = getPointMockArr(TRIP_EVENT_COUNT);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new TripMain(), `afterBegin`);

export const eventBtn = new NewEventBtn();
render(tripMain, eventBtn, `beforeEnd`);

// tripMainInfoCont - контейнер для названия и цены в хедере
const tripMainContainer = document.querySelector(`.trip-info`);

render(tripMainContainer, new TripMainCost(), `afterBegin`);
render(tripMainContainer, new TripMainInfo(), `afterBegin`);

const tripControls = document.querySelector(`.trip-controls`);
tripControls.innerHTML = ``;

render(tripControls, new Menu(), `beforeEnd`);

const filterController = new FilterController(tripControls, pointsModel);
filterController.render();
//render(tripControls, new Filters(), `beforeEnd`);

pointsModel.setDestinations(getDestinations());
pointsModel.setOffers(EVENT_OFFERS);

const tripController = new TripController(pointsModel);
tripController.render();

eventBtn.setBtnClickHandler(tripController.createPoint);











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