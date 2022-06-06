import { TripEvent } from "../components/tripEvent";
import { EditPoint } from "../components/editForm";
import { render, replace } from "../utils/render";

export class PointController {
  constructor(container, point) {
    this._container = container;
    this._point = point;    
    this.pointCard = new TripEvent(this._point);
    this.pointEdit = new EditPoint(this._point);
    
  }
  render() {
    
    const destInput = this.pointEdit
      .getElem()
      .querySelector(".event__input--destination");

    this.pointCard.setEditBtnHandler(this.onOpenBtnClick);
    this.pointEdit.setBtnHandlers(this.onCloseClick);

    render(this._container, this.pointCard, `beforeEnd`);
  }

  onCloseClick = () => {
    replace(this.pointCard, this.pointEdit);
    destInput.removeEventListener("focus", this.onInputFocus);
  };

  onOpenBtnClick = () => {
    replace(this.pointEdit, this.pointCard);
    const destInput = this.pointEdit
      .getElem()
      .querySelector(".event__input--destination");
    destInput.addEventListener("focus", this.onInputFocus);
    document.addEventListener("keyup", this.onEsc);
  }

  onEsc = (e) => {
    if (e.keyCode === 27) {
      replace(this.pointCard, this.pointEdit);
      destInput.removeEventListener("focus", onInputFocus);
      document.removeEventListener("keyup", this.onEsc);
    }
  };

  onInputFocus(e) {
      e.target.value = "";
  }
}
