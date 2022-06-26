import { TripMain } from "./components/tripMain";
import { TripMainInfo } from "./components/tripMainInfo";
import { TripMainCost } from "./components/tripMainCost";
import { Menu } from "./components/menu";
import { Stats } from "./components/stats";
import { NewEventBtn } from "./components/newEventBtn";
import { TripController } from "./controllers/tripController";
import { remove, render } from "./utils/render";
import { getDestinations, getPointMockArr } from "./components/mock/pointMock";
import { PointsModel } from "./models/pointsModel";
import { FilterController } from "./controllers/filterController";
import { EVENT_OFFERS } from "./consts";
import  API from "./api";
import  {OnePointModel} from "./models/onePointModel";
import { Loading } from "./components/loading";

//const TRIP_EVENT_COUNT = 5;
//const points = getPointMockArr(TRIP_EVENT_COUNT);

const pointsModel = new PointsModel();

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new TripMain(), `afterBegin`);

const eventBtn = new NewEventBtn();
render(tripMain, eventBtn, `beforeEnd`);

// tripMainInfoCont - контейнер для названия и цены в хедере
const tripMainContainer = document.querySelector(`.trip-info`);

render(tripMainContainer, new TripMainCost(), `afterBegin`);
render(tripMainContainer, new TripMainInfo(), `afterBegin`);

const tripControls = document.querySelector(`.trip-controls`);
tripControls.innerHTML = ``;

const menuComponent = new Menu(); 
render(tripControls, menuComponent, `beforeEnd`);


const filterController = new FilterController(tripControls, pointsModel);


pointsModel.setDestinations(getDestinations());

///
const tripEvents = document.querySelector(`.trip-events`)
const bodyContainer = document.querySelector(`.page-main`);

const tripController = new TripController(tripEvents, pointsModel);
//tripController.render();

const statsComponent = new Stats(pointsModel); 
statsComponent.hide();
render(bodyContainer, statsComponent, `beforeEnd`);


eventBtn.setBtnClickHandler(tripController.createPoint);

const api = new API(`points`);
const apiOffers = new API(`offers`);
const apiDests = new API(`destinations`);

const loading = new Loading();
render(tripEvents, loading, `beforeEnd`);


//pointsModel.setOffers(EVENT_OFFERS);

apiOffers
  .getDataFromServer()
  .then((offers) => {
    console.log("пришли такие офферы: ", offers);
    pointsModel.setOffers(offers);
  })
apiDests
  .getDataFromServer()
  .then((dests) => {
    console.log("пришли такие дестинейшены: ", dests);
    pointsModel.setDestinations(dests);
  })

  .then(() => api.getDataFromServer())
  .then((points) => {
    console.log("пришли такие поинты: ", points);
    pointsModel.setPoints(OnePointModel.parsePoints(points));
  })

  .then(() => {
    remove(loading);
    filterController.render();
    tripController.render();
    statsComponent.render();        
  });
  



menuComponent.setMenuItemClickHandler((id) => {
  switch (id) {
    case `table`:
      statsComponent.hide();
      tripController.show();

      break;
    case `stats`:
      statsComponent.show();
      tripController.hide();
  }
});



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


