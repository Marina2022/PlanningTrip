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

  toRAW(){        
    return {
      id: this.id,
      base_price: this.base_price,
      date_from: this.date_from.toISOString(),
      date_to: this.date_to.toISOString(),
      destination: this.destination,
      is_favorite: this.is_favorite,
      offers: this.offers,
      type: this.type,
    };    
  }

  clone() {
    return new OnePointModel(this.toRAW());
  }
}