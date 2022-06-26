import { AbstractSmartComponent } from "./abstractSmartComponent";

const createLoading = () => {
  return `<div><h2 class="visually-hidden">Trip events</h2>
          <p class="trip-events__msg">Loading...</p></div>`;
};

export class Loading extends AbstractSmartComponent {
  getTemplate() {
    return createLoading();
  }
}
