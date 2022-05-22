import { getRandomInt, getRandomArrayItem } from "../../utils/common"
import { EVENT_TYPES, CITIES, TripDescriptions } from "../../consts";

/**
 * для моков:
 * Точкой маршрута может быть остановка в каком-нибудь
месте (Check, Sightseeing, Restaurant) или поездка на
транспортном средстве
(Taxi, Bus, Train, Ship, Transport, Drive и Flight).
 */

const getRandomDesc = (descArr) => {
  const number = getRandomInt(1,5);
  return descArr.reduce((acc,item)=>{
    return acc + item
  },'')
}

const getRandomPhotoArr = ()=> {
  const number = getRandomInt(1, 5);
  const photoArr = [];
  for (let i = 0; i< number; i++) {
    photoArr.push({
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: "Photo description",
    });
  }
  return photoArr;
}


export const getPointMockArr = (count) => {
  const pointArr = [];
  for (let i = 0; i <count ; i++ ) {
    const point = {
      base_price: getRandomInt(500, 3000),
      date_from: "2019-07-10T22:55:56.845Z",
      date_to: "2019-07-11T11:22:13.375Z",
      destination: {
        description: getRandomDesc(TripDescriptions),
        name: getRandomArrayItem(CITIES),
        pictures: getRandomPhotoArr(),
      },
      id: 0,
      is_favorite: Math.random() > 0.5,
      offers: [
        {
          title: "Choose meal",
          price: 180,
        },
        {
          title: "Upgrade to comfort class",
          price: 50,
        },
      ],
      type: getRandomArrayItem(EVENT_TYPES),
    };
    pointArr.push(point);
  }
  
  return pointArr;
};
