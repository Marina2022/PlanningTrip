const getRandomInt = (min,max) => {
  return Math.floor(Math.random()*(max-min))+min;
}

const getRandomArrayItem = (arr) => {
  return arr[getRandomInt(0, arr.length)];
}

export { getRandomInt, getRandomArrayItem };