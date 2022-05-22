export const getDate = (dateStr) => {
  let dateObj = new Date(dateStr);
  let days =  dateObj.getDate();
  if (days < 10) days = `0${days}`;
  let month = dateObj.getMonth()+1;
  if (month <10) month = `0${month}`;
  let year = dateObj.getFullYear() % 100;
  if (year < 10) year = `0${year}`;
  return `${days}/${month}/${year}`;
}

export const getTime = (dateStr) => {
  const dateObj = new Date(dateStr);
  let hours = dateObj.getHours();
  if (hours<10) hours = `0${hours}`;
  let minutes = dateObj.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  const timeStr = `${hours}:${minutes}`;
  return timeStr;
}

export const getTimeDiff = (date_from, date_to) => {
  const dateFrom = new Date(date_from);
  const dateTo = new Date(date_to);
  const diff = (dateTo - dateFrom)/1000/60;  // в минутах разница  
  if (diff < 60) return `M${diff}`;

  if (diff < 60*24) {
    let hours = Math.trunc(diff / 60); 
    let minutes = Math.trunc(diff - hours*60);
   return `H${hours} M${minutes}`;  
  }

    else {
      let days = Math.trunc(diff / 60/24);
      let hours = Math.trunc(diff / 60);
      let minutes = Math.trunc(diff - hours * 60);
      return `D${days} H${hours} M${minutes}`;
    }
  

}