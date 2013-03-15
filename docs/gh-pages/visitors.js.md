

# dataseries.js visitors module

The `ds.visitors` module is a collection of visitors on data structures.

## <a name="wiki-breadthFirst" href="#">breadthFirst</a>(root, callback, [doProcess])

Traverses the nodes of a graph in breadth-first search order, starting at a particular `root` node.
The algorithm extends nodes with a non-enumerable property `__hash` in order to tell visited from unvisited nodes in cyclic graphs.

See [Wikipedia, Breadth-first search](http://en.wikipedia.org/wiki/Breadth-first_search)
for an explanation of this tree or graph traversion algorithm.

### Node Structure:

The adjacent nodes of a particular node are expected to be made available via the node's `children` property (no other assumptions are made on the node structure):

```javascript
{
  name: "root",
  value: 3,
  children: [
    {
      name: "A",
      value: 2
    },
    {
      name: "B",
      value: 1
    }
  ]
}
```

### Params:

* **Object** *root* The designated root node.

* **Function** *callback* A callback f(node, path) to be executed upon visiting `node`, where `path` is an array of node indexes from `root` to `node`.

* **Function:Boolean|undefined** *[doProcess]* A function f(node, path) which indicates if a particular node shall be visited or not by returning a truthy or falsy value, respectively, where `path` is an array of node indexes from `root` to `node`.

### Throws:

* **Error** Throws if `callback` is not a function.

* **Error** Throws if `doProcess` is defined and is not a function.

## <a name="depthFirst" href="#">depthFirst</a>(root, callback, [doProcess])

Traverses the nodes of a graph in depth-first search order, starting at a particular `root` node.
The algorithm extends nodes with a non-enumerable property `__hash` in order to tell visited from unvisited nodes in cyclic graphs.

See [Wikipedia, Depth-first search](http://en.wikipedia.org/wiki/Depth-first_search)
for an explanation of this tree or graph traversion algorithm.

### Node Structure:

The adjacent nodes of a particular node are expected to be made available via the node's `children` property (no other assumptions are made on the node structure):

```javascript
{
  name: "root",
  value: 3,
  children: [
    {
      name: "A",
      value: 2
    },
    {
      name: "B",
      value: 1
    }
  ]
}
```

### Params:

* **Object** *root* The designated root node.

* **Function** *callback* A callback f(node, path) to be executed upon visiting `node`, where `path` is an array of node indexes from `root` to `node`.

* **Function:Boolean|undefined** *[doProcess]* A function f(node, path) which indicates if a particular node shall be visited or not by returning a truthy or falsy value, respectively, where `path` is an array of node indexes from `root` to `node`.

### Throws:

* **Error** Throws if `callback` is not a function.

* **Error** Throws if `doProcess` is defined and is not a function.
