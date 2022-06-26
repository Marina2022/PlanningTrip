export class OnePointModel {
  constructor({id, base_price, date_from, date_to, destination, is_favorite, offers, type}) {
    this.id = id;
    this.base_price = base_price;
    this.date_from = new Date(date_from);
    this.date_to = new Date(date_to);
    this.destination = destination;
    this.is_favorite = is_favorite;
    this.offers = offers;
    this.type = type;
  }

  static parseOnePoint(point) {
    return new OnePointModel(point);
  }

  static parsePoints(points) {
    return points.map((point) => OnePointModel.parseOnePoint(point));
  }
}