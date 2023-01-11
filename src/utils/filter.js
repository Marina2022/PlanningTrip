import {filters} from "../consts";

export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case filters.FUTURE:
      return points.filter((point) => {
        return point.date_from > new Date();
      });
    case filters.PAST:
      return points.filter((point) => {
        return point.date_from <= new Date();
      });
    case filters.EVERYTHING:
      return points;
    default: return points
  }
};
