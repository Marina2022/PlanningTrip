export class PointsModel {
  constructor() {
    this._points = null;
  }

  getPoints() {
    return this._points;
  }

  getAllPoints() {
    return this._points;
  }

  setPoints(points) {
    this._points = Array.from(points);
  }

  updatePoints(id, newPoint) {
    const index = this._points.findIndex((point) => point.id === id);
    if (index == -1) return;
    this._points = []
      .concat(this._points.slice(0, index))
      .concat(newPoint)
      .concat(this._points.slice(index));  
  }
}