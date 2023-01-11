import {AbstractComponent} from "./abstractComponent";
import {pointsModel} from "../main";

const createTripMainCost = () => {
  const points = pointsModel.getPoints();

  const sum = points.reduce((accum, item) => {
    return accum + item.base_price + item.offers.reduce((offersAccum, offer) => offersAccum + offer.price, 0);
  }, 0);

  return ` <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${sum}</span>
           </p>`;
};

export class TripMainCost extends AbstractComponent {
  getTemplate() {
    return createTripMainCost();
  }
}
