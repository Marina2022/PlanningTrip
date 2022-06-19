import { SortingForm } from "../components/sortingForm";
import { tripDay } from "../components/tripDay";
import { NoEvents } from "../components/noEventsMsg";
import { render, remove } from "../utils/render";
import { PointController } from "./pointController";

export class TripController {
  constructor(pointsModel) {
    this._pointsModel = pointsModel;
    this._container = document.querySelector(`.trip-events`);
    this._noEvents = new NoEvents();
    this._sortingForm = null;// new SortingForm(this._pointsModel);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);    
    this._pointControllers = [];
    //this._allTripDays = [];
    this.updateAllTrips = this.updateAllTrips.bind(this);

    this._pointsModel.addFilterChangeHandler(this.updateAllTrips);
  }

  render() {
    const tripEvents = this._container;
    if (this._pointsModel.getPoints().length === 0) {
      render(tripEvents, this._noEvents, `beforeEnd`);
      return;
    } 
    
    // массив пойнтов не пустой:
    this._sortingForm = new SortingForm(this._pointsModel);
    render(tripEvents, this._sortingForm, `beforeEnd`);

    this._sortingForm.setSortClickHandler((sortType) => {
      this._pointsModel.sortType = sortType; 
      this._pointControllers.forEach((pointContr) => pointContr.destroy());
      this._pointControllers = [];
      tripEvents.innerHTML = `
      <h2 class="visually-hidden">Trip events</h2>
      `;

      const sortedPoints = this.getSortedPoints(sortType);

      if (sortType == "event") {
        this._sortingForm = new SortingForm(this._pointsModel);
        render(tripEvents, this._sortingForm, `beforeEnd`);
        this.renderTripDays(this._pointsModel.getPoints(), tripEvents);
        return;
      }
      render(tripEvents, this._sortingForm, `beforeEnd`);
      render(tripEvents, new tripDay("", ""), `beforeEnd`);

      const tripEventsList = document.querySelector(`.trip-events__list-1`);
      sortedPoints.forEach((point) => {
        const pointContr = new PointController(
          tripEventsList,
          this._onDataChange,
          this._onViewChange
        );
        pointContr.render(point);
        this._pointControllers.push(pointContr);
      });
    });

    this.renderTripDays(this._pointsModel.getPoints(), tripEvents);
    
  }

  updateAllTrips() {
    this._pointsModel.sortType = `event`;
    this._container.innerHTML = ``;
    this._sortingForm._sortType = `event`;
    this._pointControllers.forEach((pointContr) => pointContr.destroy());
    this._pointControllers = [];
    //this._allTripDays = [];
    this.render();
    
   }

  renderTripDays(points, tripEvents) {
    this._pointControllers = [];
    let filteredDates = [
      ...new Set(points.map((item) => item.date_from.toDateString())),
    ];

    for (let i = 0; i < filteredDates.length; i++) {
      const dateArr = points.filter(
        (item) => item.date_from.toDateString() == filteredDates[i]
      );
      const dateForRender = dateArr[0].date_from;
      const tripOneDay = new tripDay(i + 1, dateForRender);
      //this._allTripDays.push(tripOneDay);
      render(tripEvents, tripOneDay, `beforeEnd`);
      const tripEventsLists = document.querySelectorAll(`.trip-events__list-1`);
      dateArr.forEach((point) => {
        const pointContr = new PointController(
          tripEventsLists[i],
          this._onDataChange,
          this._onViewChange
        );
        pointContr.render(point);
        this._pointControllers.push(pointContr);
      });
    }
  }

  

  _onDataChange = (pointController, oldPoint, newPoint) => {
    this._pointsModel.updatePoints(oldPoint.id, newPoint);
    pointController.render(newPoint);
  };

  _onViewChange = (currentController) => {
    this._pointControllers.forEach((pointContr) => {
      if (pointContr !== currentController) {
        pointContr.setDefaultView();
      }
    });
  };

  getSortedPoints = (sortType) => {
    if (sortType == "event")
      return this._pointsModel
        .getPoints()
        .slice()
        .sort((a, b) => {
          if (a.destination.name > b.destination.name) return 1;
          else return -1;
        });
    else if (sortType == "time")
      return this._pointsModel
        .getPoints()
        .slice()
        .sort((a, b) => {
          const diff = b.date_to - b.date_from - (a.date_to - a.date_from);
          return diff;
        });
    else if (sortType == "price")
      return this._pointsModel
        .getPoints()
        .slice()
        .sort((a, b) => {
          return b.base_price - a.base_price;
        });
  };
}
