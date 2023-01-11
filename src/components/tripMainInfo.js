import {AbstractComponent} from "./abstractComponent";
import {pointsModel} from "../main";
import moment from "moment";


const createTripMainInfo = () => {
  const points = pointsModel.getPoints();
  const month = points[0].date_from.toString('default', { month: 'long' });
  const monStart = moment(points[0].date_from).format('MMM');
  const dateStart = points[0].date_from.getDate();
  const monEnd = moment(points[points.length-1].date_from).format('MMM');
  const dateEnd = points[points.length-1].date_from.getDate();
  return `<div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
              <p class="trip-info__dates">{monStart}</p>

            </div>`;
};

export class TripMainInfo extends AbstractComponent {
  getTemplate() {
    return createTripMainInfo();
  }
}
