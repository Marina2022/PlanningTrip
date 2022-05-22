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

export const getPointMockArr = (count) => {
  const pointArr = [];
  for (let i = 0; i <count ; i++ ) {
    const type =  getRandomArrayItem(EVENT_TYPES);
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
      offers: generateOffers(type),
      type: type,
    };
    pointArr.push(point);
  }
  console.log(pointArr);
  return pointArr;
};
