import {AbstractComponent} from "./abstractComponent";

const createMenu = () => {
  return `<div><h2 class="visually-hidden">Switch trip view</h2>
  <nav class="trip-controls__trip-tabs trip-tabs">
  <a class="trip-tabs__btn trip-tabs__btn--active" href="#" id="table">Events</a>
  <a class="trip-tabs__btn" href="#" id="stats">Stats</a>
</nav></div>
`;
};

export class Menu extends AbstractComponent {
  getTemplate() {
    return createMenu();
  }

  setMenuItemClickHandler(cb) {
    this.getElem().addEventListener(`click`, (e) => {
      if (e.target.tagName !== `A`) {
        return;
      }
      this.getElem()
        .querySelectorAll(`.trip-tabs__btn`)
        .forEach((it) => it.classList.remove(`trip-tabs__btn--active`));
      e.target.classList.add(`trip-tabs__btn--active`);
      cb(e.target.id);
    });
  }


}

