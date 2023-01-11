import {filters} from "../consts";
import {FiltersComponent} from "../components/filter";
import {render} from "../utils/render";
import {sortTypes} from "../components/sortingForm";

export class FilterController {
  constructor(container, pointsModel) {
    this._filterComponent = new FiltersComponent();
    this._container = container;
    this._filterType = filters.EVERYTHING;
    this._pointsModel = pointsModel;


  }

  render() {
    render(this._container, this._filterComponent, `beforeEnd`);
    this._filterComponent.setFilterClickHandler((targetValue) => {
      this._pointsModel.setFilter(targetValue);
      this._pointsModel._sortType = sortTypes.EVENT;

    });
  }


}
