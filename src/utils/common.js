const getRandomInt = (min,max) => {
  return Math.floor(Math.random()*(max-min))+min;
}

const getRandomArrayItem = (arr) => {
  return arr[getRandomInt(0, arr.length)];
}

const getShuffledArray = (arr) => {
  let resultArr =  arr.slice().sort(((a,b)=> {
    return Math.random() > 0.5 ?  +1 : -1 ;
  }))
  console.log({arr, resultArr});
  return resultArr;
}

export { getRandomInt, getRandomArrayItem, getShuffledArray };