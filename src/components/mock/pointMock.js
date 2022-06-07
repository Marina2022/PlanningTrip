import {
  getRandomInt,
  getRandomArrayItem,
  getShuffledArray,
} from "../../utils/common";
import {
  EVENT_TYPES,
  CITIES,
  TripDescriptions,
  EVENT_OFFERS,
} from "../../consts";


const getRandomDesc = (descArr) => {
  const number = getRandomInt(1,5);
  return getShuffledArray(descArr).slice(0, number).reduce((acc, item) => {
    return acc + item;
  }, "");
}

const getRandomPhotoArr = ()=> {
  const number = getRandomInt(3, 6);
  const photoArr = [];
  for (let i = 0; i< number; i++) {
    photoArr.push({
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: "Photo description",
    });
  }
  return photoArr;
}

const generateOffers = (type)=>{
  let initialArray = EVENT_OFFERS.find((item)=>{
    return item.type === type;
  });  
  if (initialArray) { // если есть массив Офферов для данного типа 
    let resultArr =[];
    
    let count = getRandomInt(0, initialArray.offers.length);
    let shuffledArr = getShuffledArray(initialArray.offers);
    
    for (let i = 0; i<count; i++) {
      resultArr.push(shuffledArr[i]);
    }
    return resultArr;
  } else return [];
}

const generateDateObj = () => {
  let now = new Date(Date.now());
  const sign = Math.random > 0.5 ? 1 : -1;
  const minutes = getRandomInt(0, 4320);
  let dateFrom = Number(now.setMinutes(now.getMinutes() + minutes * sign));
       const diff = getRandomInt(1000 * 60 * 30, 1000 * 60 * 60 * 25);
  const dateTo = Number(dateFrom) + diff; 
  const resultObj = {
    dateFrom,
    dateTo,
  };
  return JSON.parse(JSON.stringify(resultObj));
  
}

export const getPointMockArr = (count) => {
  
  const pointArr = [];
  for (let i = 0; i < count; i++) {
    const { dateFrom, dateTo } = generateDateObj();
    const type = getRandomArrayItem(EVENT_TYPES);
    const point = {
      base_price: getRandomInt(500, 3000),
      date_from: new Date(dateFrom),
      date_to: new Date(dateTo),
      destination: {
        description: getRandomDesc(TripDescriptions),
        name: getRandomArrayItem(CITIES),
        pictures: getRandomPhotoArr(),
      },
      id: 0,
      is_favorite: Math.random() > 0.5,
      offers: generateOffers(type),
      type: type,
    };
    pointArr.push(point);
  }
  pointArr.sort((a, b) => {
    return a.date_from - b.date_from;
  });

  return pointArr;
};

export const getDestinations = () => {
  const result =  CITIES.map(city => {
    return {
        description: getRandomDesc(TripDescriptions),
        pictures: getRandomPhotoArr(),
        name: city,
      }    
 });
 return result;

}