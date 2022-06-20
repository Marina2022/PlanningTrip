import moment from "moment"

export const getDateForDayNumber = (date) => {
  return moment(date).format("DD-MM-y");
};

export const getDate = (date) => {
  return moment(date).format("DD/MM/y");
};

export const getTime = (date) => { 
  return moment(date).format("HH:mm");
};

export const getTimeDiff = (dateFrom, dateTo) => {
  const diff = (dateTo - dateFrom) / 1000 / 60; // в минутах разница
  if (diff < 60) return `M${Math.trunc(diff)}`;

  if (diff < 60 * 24) {
    let hours = Math.trunc(diff / 60);
    let minutes = Math.trunc(diff - hours * 60);
    return `H${hours} M${minutes}`;
  } else {
    let days = Math.trunc(diff / 60 / 24);
    let hours = Math.trunc(diff / 60);
    let minutes = Math.trunc(diff - hours * 60);
    return `D${days} H${hours} M${minutes}`;
  }
};
