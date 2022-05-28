import { AbstractComponent } from "./abstractComponent";

const createNewEventBtn = () => {
  return `<button
            class="trip-main__event-add-btn btn btn--big btn--yellow"
            type="button"
          >
            New event
          </button>tabs__btn" href="#">Stats</a>
</nav></div>
`;
};

export class NewEventBtn extends AbstractComponent {
  getTemplate() {
    return createNewEventBtn();
  }
}
