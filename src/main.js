import {TripMain} from "./components/tripMain";
import {TripMainInfo} from "./components/tripMainInfo";
import {TripMainCost} from "./components/tripMainCost";
import {Menu} from "./components/menu";
import {Stats} from "./components/stats";
import {NewEventBtn} from "./components/newEventBtn";
import {TripController} from "./controllers/tripController";
import {remove, render} from "./utils/render";
import {PointsModel} from "./models/pointsModel";
import {FilterController} from "./controllers/filterController";
import API from "./api";
import {OnePointModel} from "./models/onePointModel";
import {Loading} from "./components/loading";

export const pointsModel = new PointsModel();

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new TripMain(), `afterBegin`);

const eventBtn = new NewEventBtn();
render(tripMain, eventBtn, `beforeEnd`);

export const tripMainContainer = document.querySelector(`.trip-info`);

const tripControls = document.querySelector(`.trip-controls`);
tripControls.innerHTML = ``;

const menuComponent = new Menu();
render(tripControls, menuComponent, `beforeEnd`);

const filterController = new FilterController(tripControls, pointsModel);

const tripEvents = document.querySelector(`.trip-events`);
const bodyContainer = document.querySelector(`.page-main`);

const api = new API(`points`);
const apiOffers = new API(`offers`);
const apiDests = new API(`destinations`);

const tripController = new TripController(tripEvents, pointsModel, api);

const statsComponent = new Stats(pointsModel);
statsComponent.hide();
render(bodyContainer, statsComponent, `beforeEnd`);

eventBtn.setBtnClickHandler(tripController.createPoint);

const loading = new Loading();
render(tripEvents, loading, `beforeEnd`);

apiOffers
  .getDataFromServer()
  .then((offers) => {
    pointsModel.setOffers(offers);
  });

export const tripMainCostElement = new TripMainCost();
export const TripMainInfoElement = new TripMainInfo();

apiDests
  .getDataFromServer()
  .then((dests) => {
    pointsModel.setDestinations(dests);
  })
  .then(() => api.getDataFromServer())
  .then((points) => {
    pointsModel.setPoints(OnePointModel.parsePoints(points));
  })
  .then(() => {
    remove(loading);
    render(tripMainContainer, tripMainCostElement, `afterBegin`);
    render(tripMainContainer, TripMainInfoElement, `afterBegin`);
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


