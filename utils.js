var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomPos = function (dx, dy) {
  return {
    x: getRandomInt(0, dx),
    y: getRandomInt(0, dy),
  };
};