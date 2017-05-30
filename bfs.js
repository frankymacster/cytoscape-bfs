var setCurrentNode = function (queue) {
  var u = queue.dequeue();

  var ev = new CustomEvent('current-node-set', {detail: u});
  document.dispatchEvent(ev);

  return u;
};

var setCurrentNeighbour = function (neighbours, i) {
  var v = neighbours[i];

  var ev = new CustomEvent('current-neighbour-set', {detail: v});
  document.dispatchEvent(ev);

  return v;
};

var visitNeighbour = function (queue, graph, bfsInfo, u, i) {
  var v = setCurrentNeighbour(graph[u], i);
  if (bfsInfo[v].distance === null) {
    bfsInfo[v].distance = bfsInfo[u].distance + 1;
    bfsInfo[v].predecessor = u;
    queue.enqueue(v);
  }
  return queue;
}

var visitNode = function (queue, graph, bfsInfo) {
  var u = setCurrentNode(queue);
  var i = 0;
  var handle = window.setInterval(function() {
    if (i < graph[u].length) {
      queue = visitNeighbour(queue, graph, bfsInfo, u, i);
      i++;
    } else {
      window.clearInterval(handle);
      if(!queue.isEmpty()) {
        visitNode(queue, graph, bfsInfo);
      } else {
        return bfsInfo;
      }
    }
  }, 1000);
};

var initBfsInfo = function (graph, source) {
  var bfsInfo = [];

  for (var i = 0; i < graph.length; i++) {
    bfsInfo[i] = {
      distance: null,
      predecessor: null,
    };
  }

  return bfsInfo;
};

var doBFS = function (graph, source) {
  var bfsInfo = initBfsInfo(graph);
  bfsInfo[source].distance = 0;

  var queue = new Queue();
  queue.enqueue(source);

  bfsInfo = visitNode(queue, graph, bfsInfo);

  return bfsInfo;
};
