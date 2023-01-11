import {AbstractComponent} from "./abstractComponent";

const createNewEventBtn = () => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
};

export class NewEventBtn extends AbstractComponent {
  getTemplate() {
    return createNewEventBtn();
  }

  setBtnClickHandler(cb) {
    this.getElem().addEventListener(`click`, () => {
      cb();
    });
  }
}

