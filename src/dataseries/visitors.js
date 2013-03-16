/**
 * # dataseries.js visitors module
 *
 * The `ds.visitors` module is a collection of visitors on data structures.
 */
define([
	"require",
	"underscore",
	"dataseries/utils"
], function(require, _, utils) {
"use strict";

var BFS = function BFS(root, callback, doProcess) {
	var nodePath = [];
	var nodesVisited = {};

	var queue = [{ node: root, i: [] }];
	while (queue.length > 0) {
		var item = queue.shift();
		var node = item.node;

		Object.defineProperty(node, "__hash", {
			value: utils.hashObject(node),
			enumerable: false,
			writable: true
		});

		nodesVisited[node.__hash] = node;
		if (doProcess(node, item.i)) callback(node, item.i);

		for (var i = 0; i < node.children.length; i++) {
			var child = node.children[i];
			if (child.__hash === undefined || nodesVisited[child.__hash] === undefined) {
				queue.push({ node: child, i: item.i.concat(i) });
			}
		}
	}
};

var DFS = function DFS(node, callback, doProcess, nodePath, nodesVisited) {
	if (arguments.length < 4) nodePath = [];
	if (arguments.length < 5) nodesVisited = {};

	Object.defineProperty(node, "__hash", {
		value: utils.hashObject(node),
		enumerable: false,
		writable: true
	});

	nodesVisited[node.__hash] = node;
	if (doProcess(node, nodePath)) callback(node, nodePath);

	if (!_.isArray(node.children)) return;
	for (var i = 0; i < node.children.length; i++) {
		var child = node.children[i];
		if (child.__hash === undefined || nodesVisited[child.__hash] === undefined) {
			DFS(child, callback, doProcess, nodePath.concat(i), nodesVisited);
		}
	}
};


var exports = {};

/**
 * Traverses the nodes of a graph in breadth-first search order, starting at a particular `root` node.
 * The algorithm extends nodes with a non-enumerable property `__hash` in order to tell visited from unvisited nodes in cyclic graphs.
 *
 * See [Wikipedia, Breadth-first search](http://en.wikipedia.org/wiki/Breadth-first_search)
 * for an explanation of this tree or graph traversion algorithm.
 *
 * ### Node Structure:
 *
 * The adjacent nodes of a particular node are expected to be made available via the node's `children` property (no other assumptions are made on the node structure):
 *
 * ```javascript
 * {
 *   name: "root",
 *   value: 3,
 *   children: [
 *     {
 *       name: "A",
 *       value: 2
 *     },
 *     {
 *       name: "B",
 *       value: 1
 *     }
 *   ]
 * }
 * ```
 *
 * @param  {Object} root The designated root node.
 * @param  {Function} callback A callback *f(node, path)* to be executed upon visiting `node`, where `path` is an array of node indexes from `root` to `node`.
 * @param  {Function:Boolean|undefined} [doProcess] A function *f(node, path)* which indicates if a particular node shall be visited or not by returning a truthy or falsy value, respectively, where `path` is an array of node indexes from `root` to `node`.
 * @throws {Error} Throws if `callback` is not a function.
 * @throws {Error} Throws if `doProcess` is defined and is not a function.
 */
exports.breadthFirst = function breadthFirst(root, callback, doProcess) {
	if (arguments.length < 3) doProcess = function(node) { return true; };

	if (!_.isFunction(callback)) throw new Error("breadthFirst(): callback must be a function");
	if (!_.isFunction(doProcess)) throw new Error("breadthFirst(): doProcess must be a function");

	BFS(root, callback, doProcess);
};

/**
 * Traverses the nodes of a graph in depth-first search order, starting at a particular `root` node.
 * The algorithm extends nodes with a non-enumerable property `__hash` in order to tell visited from unvisited nodes in cyclic graphs.
 *
 * See [Wikipedia, Depth-first search](http://en.wikipedia.org/wiki/Depth-first_search)
 * for an explanation of this tree or graph traversion algorithm.
 *
 * ### Node Structure:
 *
 * The adjacent nodes of a particular node are expected to be made available via the node's `children` property (no other assumptions are made on the node structure):
 *
 * ```javascript
 * {
 *   name: "root",
 *   value: 3,
 *   children: [
 *     {
 *       name: "A",
 *       value: 2
 *     },
 *     {
 *       name: "B",
 *       value: 1
 *     }
 *   ]
 * }
 * ```
 *
 * @param  {Object} root The designated root node.
 * @param  {Function} callback A callback *f(node, path)* to be executed upon visiting `node`, where `path` is an array of node indexes from `root` to `node`.
 * @param  {Function:Boolean|undefined} [doProcess] A function *f(node, path)* which indicates if a particular node shall be visited or not by returning a truthy or falsy value, respectively, where `path` is an array of node indexes from `root` to `node`.
 * @throws {Error} Throws if `callback` is not a function.
 * @throws {Error} Throws if `doProcess` is defined and is not a function.
 */
exports.depthFirst = function depthFirst(root, callback, doProcess) {
	if (arguments.length < 3) doProcess = function(node) { return true; };

	if (!_.isFunction(callback)) throw new Error("depthFirst(): callback must be a function");
	if (!_.isFunction(doProcess)) throw new Error("depthFirst(): doProcess must be a function");

	DFS(root, callback, doProcess);
};

return exports;

});
