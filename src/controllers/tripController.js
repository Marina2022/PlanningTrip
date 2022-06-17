import { SortingForm } from "../components/sortingForm";
import { tripDay } from "../components/tripDay";
import { NoEvents } from "../components/noEventsMsg";
import { render } from "../utils/render";
import { PointController } from "./pointController";

export class TripController {
  constructor(pointsModel) {
    this._pointsModel = pointsModel;
    this._container = document.querySelector(`.trip-events`);
    this._noEvents = new NoEvents();
    this._sortingForm = new SortingForm();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._pointControllers = [];
  }

  render() {
    const tripEvents = this._container;
    if (this._pointsModel.getPoints().length === 0) {
      render(tripEvents, this._noEvents, `beforeEnd`);
    } else {
      render(tripEvents, this._sortingForm, `beforeEnd`);
      this._sortingForm.setSortClickHandler((sortType) => {
        tripEvents.innerHTML = `
        <h2 class="visually-hidden">Trip events</h2>
        `;
        const sortedPoints = this.getSortedPoints(sortType);
        if (sortType == "event") {
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
      render(tripEvents, new tripDay(i + 1, dateForRender), `beforeEnd`);
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

  }

  _onViewChange = (currentController) => {    
    this._pointControllers.forEach(pointContr=>{
      if (pointContr !== currentController) {
        pointContr.setDefaultView();
      }
    })
  }

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
}
}
