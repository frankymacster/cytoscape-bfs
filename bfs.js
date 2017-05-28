var doBFS = function (graph, source) {
  var bfsInfo = [];

  for (var i = 0; i < graph.length; i++) {
    bfsInfo[i] = {
      distance: null,
      predecessor: null,
    };
  }

  bfsInfo[source].distance = 0;

  var queue = new Queue();
  queue.enqueue(source);

  while (!queue.isEmpty()) {
    var u = setCurrentNode(queue);
    for (var i = 0; i < graph[u].length; i++) {
      var v = setCurrentNeighbour(graph[u], i);
      if (bfsInfo[v].distance === null) {
        bfsInfo[v].distance = bfsInfo[u].distance + 1;
        bfsInfo[v].predecessor = u;
        queue.enqueue(v);
      }
    }
  }

  return bfsInfo;
};
