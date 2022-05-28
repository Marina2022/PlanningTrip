import { AbstractComponent } from "./abstractComponent";

const createTripMain = () => {
  return `  <section class="trip-main__trip-info  trip-info">            
          </section>`;
};

export class TripMainHeader extends AbstractComponent {  
  getTemplate() {
    return createTripMain();
  }
}
