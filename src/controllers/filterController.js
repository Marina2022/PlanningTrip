import {filters} from "../consts";
import { FiltersComponent } from "../components/filter";
import { render } from "../utils/render";

export class FilterController {
  constructor (container) {
    this._filterComponent = new FiltersComponent();
    this._container = container;
    this._filter = filters.EVERYTHING;
  }
  render(){
    render(this._container, this._filterComponent, `beforeEnd`);
  }
}