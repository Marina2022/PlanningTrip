import { SortingForm } from "../components/sortingForm";
import { tripDay } from "../components/tripDay";
import { NoEvents } from "../components/noEventsMsg";
import { render } from "../utils/render";
import { emptyPoint, modes as pointControllerModes, PointController } from "./pointController";



export class TripController {
  constructor(pointsModel) {
    this._pointsModel = pointsModel;
    this._container = document.querySelector(`.trip-events`);
    this._noEvents = new NoEvents();
    this._sortingForm = null; // new SortingForm(this._pointsModel);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._pointControllers = [];
    this.updateAllTrips = this.updateAllTrips.bind(this);
    this.createPoint = this.createPoint.bind(this);
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
          this._onViewChange,
          false,
          this._pointsModel
        );
        pointContr.render(point, pointControllerModes.DEFAULT);
        this._pointControllers.push(pointContr);
      });
    });

    this.renderTripDays(this._pointsModel.getPoints(), tripEvents);
    /// [setBtnClickHandler]
  }

  createPoint() {
    const pointContr = new PointController(
      document.querySelector(`.trip-events__list-1`),
      this._onDataChange,
      this._onViewChange,
      true,
      this._pointsModel
    );
    pointContr.render(emptyPoint, pointControllerModes.ADD, `afterbegin`);
    this._pointControllers.push(pointContr);
    this._onViewChange(pointContr);  // ой не знаййю я
  }

  updateAllTrips() {
    this._pointsModel.sortType = `event`;
    this._sortingForm._sortType = `event`;
    this._container.innerHTML = ``;
    this._pointControllers.forEach((pointContr) => {
      pointContr.destroy();
    });
    this._pointControllers = [];
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
      render(tripEvents, tripOneDay, `beforeEnd`);
      const tripEventsLists = document.querySelectorAll(`.trip-events__list-1`);
      dateArr.forEach((point) => {
        const pointContr = new PointController(
          tripEventsLists[i],
          this._onDataChange,
          this._onViewChange,
          false,
          this._pointsModel
        );
        pointContr.render(point, pointControllerModes.DEFAULT);
        this._pointControllers.push(pointContr);
      });
    }
  }

  _onDataChange = (pointController, oldPoint, newPoint) => {
    if (oldPoint == emptyPoint) {
      if (newPoint == null) {
        pointController.destroy();

        this.updateAllTrips();
        return;
      }
      this._pointsModel.addPoint(newPoint);
      pointController.render(newPoint, pointControllerModes.DEFAULT);
      this.updateAllTrips();
      return;
    } else if (newPoint == null) {
      this._pointsModel.removePoint(oldPoint.id);
      this.updateAllTrips();
      return;
    } else {
      this._pointsModel.updatePoints(oldPoint.id, newPoint);
      pointController.render(newPoint, pointControllerModes.DEFAULT);
      this.updateAllTrips();
      return;
    }
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
