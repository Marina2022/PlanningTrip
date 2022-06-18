import {filters} from "../consts";
import { FiltersComponent } from "../components/filter";
import { render } from "../utils/render";

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
    });
  }


}