import { TripEvent } from "../components/tripEvent";
import { EditPoint } from "../components/editForm";
import { render, replace, remove } from "../utils/render";

export class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._point = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this.pointCard = null;
    this.pointEdit = null;
    this._isFormOpen = false;

    
  }

  setDefaultView() {
    if(this._isFormOpen) {
      this.pointEdit.resetForm();
      replace(this.pointCard, this.pointEdit);      
      this._isFormOpen = false;
    }
  }

  render(point) {
    this._point = point;
    const oldPointEdit = this.pointEdit;
    this.pointCard = new TripEvent(this._point);
    this.pointEdit = new EditPoint(this._point);
    this.pointCard.setEditBtnHandler(this.onOpenBtnClick);
    this.pointEdit.setBtnHandlers(this.onCloseClick);
    
    this.pointEdit.setFavoriteHandler(()=>{
      const newPoint = Object.assign({}, this._point, {
        is_favorite: !this._point.is_favorite,
      });
      this._onDataChange(this, this._point, newPoint);
    });
    
    this.pointEdit.setEventTypeHandler();
    this.pointEdit.setCityChangeHandler();
    this.pointEdit.setDatePickers();

    if (oldPointEdit) {
      replace(this.pointEdit, oldPointEdit);
    } else {
      render(this._container, this.pointCard, `beforeEnd`);
    }
  }

  onCloseClick = () => {
    replace(this.pointCard, this.pointEdit);
    this._isFormOpen = false;    

  };

  onOpenBtnClick = () => {
    replace(this.pointEdit, this.pointCard);
    this._isFormOpen = true;
    document.addEventListener("keyup", this.onEsc);
    this._onViewChange(this);
  };

  onEsc = (e) => {
    if (e.keyCode === 27) {
      replace(this.pointCard, this.pointEdit);
      document.removeEventListener("keyup", this.onEsc);
      this._isFormOpen = false;
    }
  };

  destroy(){    
    remove(this.pointCard);
    remove(this.pointEdit);
    document.removeEventListener("keyup", this.onEsc);
  }


}
