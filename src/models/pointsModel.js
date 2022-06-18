import { filters } from "../consts";
import { getPointsByFilter } from "../utils/filter";
import { sortTypes } from "../components/sortingForm";

export class PointsModel {
  constructor() {
    this._points = null;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._filterType = filters.EVERYTHING;
    this.sortType = sortTypes.EVENT;
  }

  getPoints() {    
    const filteredPoints = getPointsByFilter(this._points, this._filterType);      
    return filteredPoints;
  }

  getAllPoints() {
    return this._points;
  }

  setPoints(points) {
    this._points = Array.from(points);
    //this._callDataChangeHanglers();
  }

  updatePoints(id, newPoint) {
    const index = this._points.findIndex((point) => point.id === id);
    if (index == -1) return;
    this._points = []
      .concat(this._points.slice(0, index))
      .concat(newPoint)
      .concat(this._points.slice(index));
    //this._callDataChangeHanglers();
  }

  // Нужны ли они вообще?
  // _callDataChangeHanglers() {
  //   this._dataChangeHandlers.forEach((handler) => handler());
  // }

  // _addDataChangeHandler(handler) {
  //   this._dataChangeHandlers.push(handler);
  // }

  _callFilterChangeHanglers() {
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  _addFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setFilter(filterType){
    this._filterType = filterType;
    this._callFilterChangeHanglers();
  }
}