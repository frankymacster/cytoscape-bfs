var cy;

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

var lastNode;
var colorNode = function (ev) {
  if (lastNode) {
    lastNode.style('background-color', '');
  }

  var u = lastNode = cy.nodes('#n' + ev.detail);
  u.style('background-color', 'magenta');
};

var lastNeighbour;
var colorNeighbour = function (ev) {
  if (lastNeighbour) {
    lastNeighbour.style('background-color', 'yellow');
  }

  var u = lastNeighbour = cy.nodes('#n' + ev.detail);
  u.style('background-color', 'cyan');
};

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

  document.addEventListener('current-node-set', colorNode);
  document.addEventListener('current-neighbour-set', colorNeighbour);

  var bfsInfo = doBFS(adjList, 3);
};