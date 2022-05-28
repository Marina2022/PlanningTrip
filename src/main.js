import { TripMain } from "./components/tripMain";
import { TripMainInfo } from "./components/tripMainInfo";
import { TripMainCost } from "./components/tripMainCost";
import { Menu } from "./components/menu";
import { Filters } from "./components/filter";
import { NewEventBtn } from "./components/newEventBtn";
import { EventListController } from "./controllers/eventListController";
import { render } from "./utils/render";


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

const eventListController = new EventListController();
eventListController.render();












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