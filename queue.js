// https://www.khanacademy.org/computing/computer-science/algorithms/breadth-first-search/p/challenge-implement-breadth-first-search
var Queue = function() {
  this.items = [];
};

Queue.prototype.enqueue = function(obj) {
  this.items.push(obj);
};

Queue.prototype.dequeue = function() {
  return this.items.shift();
};

Queue.prototype.isEmpty = function() {
  return this.items.length === 0;
};