import {AbstractComponent} from "./abstractComponent";
import {pointsModel} from "../main";
import moment from "moment";

const createTripMainInfo = () => {
  const points = pointsModel.getPoints();
  const monStart = moment(points[0].date_from).format(`MMM`);
  const dateStart = points[0].date_from.getDate();
  const monEnd = moment(points[points.length - 1].date_from).format(`MMM`);
  const dateEnd = points[points.length - 1].date_from.getDate();
  return `<div class="trip-info__main">
              <h1 class="trip-info__title">${points[0].destination.name} &mdash; ${points[points.length - 6].destination.name} &mdash; ${points[points.length - 1].destination.name}</h1>
              <p class="trip-info__dates">${monStart} ${dateStart} &mdash; ${monEnd} ${dateEnd}</p>
            </div>`;
};

export class TripMainInfo extends AbstractComponent {
  getTemplate() {
    return createTripMainInfo();
  }
}
