import {TripEvent} from "../components/tripEvent";
import {EditPoint} from "../components/editForm";
import {render, replace, remove} from "../utils/render";

export const emptyPoint = {
  id: 0,
  base_price: 0,
  date_from: new Date(),
  date_to: new Date(),
  destination:
    {
      name: ``,
      description: ``,
      pictures: [],
    },
  is_favorite: false,
  offers: [],
  type: `taxi`,
};

export const modes = {
  EDIT: `edit`,
  DEFAULT: `default`,
  ADD: `add`,
};

export class PointController {
  constructor(container, onDataChange, onViewChange, isNew = false, pointsModel) {
    this._pointsModel = pointsModel;
    this._container = container;
    this._point = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this.pointCard = null;
    this.pointEdit = null;
    this._mode = modes.DEFAULT;
    this._isNew = isNew;


  }

  setDefaultView() {
    if (this._mode == modes.EDIT) {
      this.pointEdit.resetForm();
      replace(this.pointCard, this.pointEdit);
      this._mode = modes.DEFAULT;
    }
  }

  render(point, mode) {
    this._point = point;
    const oldPointEdit = this.pointEdit;
    this.pointCard = new TripEvent(this._point);
    this.pointEdit = new EditPoint(this._point, this._isNew, this._pointsModel);
    this.pointCard.setEditBtnHandler(this.onOpenBtnClick);
    this.pointEdit.setBtnHandlers(this.onCloseClick);

    this.pointEdit.setSubmitHandler(() => {
      const newPoint = this.pointEdit.getFormData();
      this._onDataChange(this, this._point, newPoint);

    });

    this.pointEdit.setDeleteHandler(() => {

      this._onDataChange(this, this._point, null);
    });


    this.pointEdit.setFavoriteHandler(() => {
      const newPoint = this._point.clone();
      newPoint.is_favorite = !newPoint.is_favorite;
      const favor = true;
      this._onDataChange(this, this._point, newPoint, favor);
    });

    this.pointEdit.setEventTypeHandler();
    this.pointEdit.setCityChangeHandler();
    this.pointEdit.setDatePickers();

    if (mode == modes.DEFAULT) {
      if (oldPointEdit) {
        replace(this.pointEdit, oldPointEdit);
      } else {
        render(this._container, this.pointCard, `beforeEnd`);
      }
    } else if (mode == modes.ADD) {
      render(this._container, this.pointEdit, `afterbegin`);
    }
  }

  onCloseClick = () => {
    replace(this.pointCard, this.pointEdit);
    this._mode = modes.DEFAULT;

  };

  onOpenBtnClick = () => {
    replace(this.pointEdit, this.pointCard);
    this._mode = modes.EDIT;
    document.addEventListener("keyup", this.onEsc);
    this._onViewChange(this);
  };

  onEsc = (e) => {
    if (e.keyCode === 27) {
      replace(this.pointCard, this.pointEdit);
      document.removeEventListener("keyup", this.onEsc);
      this._mode = modes.DEFAULT;
    }
  };

  destroy() {
    this.pointCard.removeElem();
    this.pointEdit.removeElem();
    document.removeEventListener("keyup", this.onEsc);
  }


}
