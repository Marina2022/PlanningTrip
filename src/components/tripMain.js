import {AbstractComponent} from "./abstractComponent";

const createTripMain = () => {
  return `<section class="trip-main__trip-info  trip-info">            
          </section>`;
};

export class TripMain extends AbstractComponent {
  getTemplate() {
    return createTripMain();
  }
}
