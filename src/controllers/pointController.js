import { TripEvent } from "../components/tripEvent";
import { EditPoint } from "../components/editForm";
import { render, replace } from "../utils/render";

export class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._point = null;        
    this._onDataChange = onDataChange;     
    this.pointCard = null;
    this.pointEdit = null;
  }
  render(point) {
    this._point = point;
    const oldPointEdit = this.pointEdit;
    this.pointCard = new TripEvent(this._point);
    this.pointEdit = new EditPoint(this._point);
    
      this.pointCard.setEditBtnHandler(this.onOpenBtnClick);
      this.pointEdit.setBtnHandlers(this.onCloseClick);
      this.pointEdit.setFavoriteHandler(this._onDataChange, this);
      this.pointEdit.setEventTypeHandler();
      this.pointEdit.setCityChangeHandler();

    if (oldPointEdit) {
      replace(this.pointEdit, oldPointEdit);      
    } else {
      render(this._container, this.pointCard, `beforeEnd`);
    }

      
    }
  

  onCloseClick = () => {
    replace(this.pointCard, this.pointEdit);    
  };

  onOpenBtnClick = () => {
    replace(this.pointEdit, this.pointCard);

    //this._destInput.addEventListener("focus", this.onInputFocus);

    document.addEventListener("keyup", this.onEsc);
  }

  onEsc = (e) => {
    if (e.keyCode === 27) {
      replace(this.pointCard, this.pointEdit);      
      document.removeEventListener("keyup", this.onEsc);
    }
  };

}
