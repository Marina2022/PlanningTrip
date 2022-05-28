import { AbstractComponent } from "./abstractComponent";

const createTripMainCost = () => {
  return ` <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
           </p>`;
};

export class TripMainCost extends AbstractComponent {
  getTemplate() {
    return createTripMainCost();
  }
}
