var sleep = function (delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
};

var onVisit = function (node) {
  var visitedNode = cy.nodes(node);
  console.log(visitedNode);
};

// // //
var cy;

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

var getRandomPosInCy = function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  return getRandomPos(width, height);
};

var printNode = function (node) {
  cy.add([{
    group: "nodes",
    data: {
      id: 'n' + node
    },
    position: getRandomPosInCy()
  }]);
};

var printEdge = function (start, end) {
  cy.add([{
    group: "edges",
    data: {
      id: 'e' + start + end,
      source: 'n' + start,
      target: 'n' + end
    }
  }]);
};

var printGraph = function (graph) {
  for (var i = 0; i < graph.length; i++) {
    printNode(i);

    for (var j = 0; j < graph[i].length; j++) {
      printNode(graph[i][j]);
      printEdge(i, graph[i][j]);
    }
  }
};

var setCurrentNode = function (queue) {
  var u = queue.dequeue();
  cy.$('#n' + u).addClass('red');
  return u;
};

var setCurrentNeighbour = function (neighbours, i) {
  var v = neighbours[i];
  cy.$('#n' + v).addClass('blue');
  return v;
};

// // //
window.onload = function () {
  cy = cytoscape({
    container: document.getElementById('cy'),
    style: [{
      selector: 'node',
      style: {
        'label': 'data(id)'
      }
    }],
  });

  var adjList = [
    [1],
    [0, 4, 5],
    [3, 4, 5],
    [2, 6],
    [1, 2],
    [1, 2, 6],
    [3, 5],
    []
  ];

  printGraph(adjList);

  var bfsInfo = doBFS(adjList, 3);
};