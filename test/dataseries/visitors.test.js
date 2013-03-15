define(["src/dataseries/visitors.js", "src/dataseries/predicates.js"], function(visitors, predicates) {
	buster.testCase("visitors", {
		"setUp": function() {
			var self = this;

			self.nodes = {
				"A": { name: "A", children: [] },
				"B": { name: "B", children: [] },
				"C": { name: "C", children: [] },
				"D": { name: "D", children: [] },
				"E": { name: "E", children: [] },
				"F": { name: "F", children: [] },
				"G": { name: "G", children: [] }
			};

			self.graph = function() {
				var A = _.clone(self.nodes.A, true);
				var B = _.clone(self.nodes.B, true);
				var C = _.clone(self.nodes.C, true);
				var D = _.clone(self.nodes.D, true);
				var E = _.clone(self.nodes.E, true);
				var F = _.clone(self.nodes.F, true);
				var G = _.clone(self.nodes.G, true);

				var root = A;
				A.children.push(B);
				A.children.push(C);
				A.children.push(E);
				B.children.push(D);
				B.children.push(F);
				C.children.push(G);
				return root;
			}();

			self.cyclicGraph = function() {
				var A = _.clone(self.nodes.A, true);
				var B = _.clone(self.nodes.B, true);
				var C = _.clone(self.nodes.C, true);
				var D = _.clone(self.nodes.D, true);
				var E = _.clone(self.nodes.E, true);
				var F = _.clone(self.nodes.F, true);
				var G = _.clone(self.nodes.G, true);

				var root = A;
				A.children.push(B);
				A.children.push(C);
				A.children.push(E);
				B.children.push(D);
				B.children.push(F);
				C.children.push(G);
				F.children.push(E);
				G.children.push(A);
				G.children.push(B);
				G.children.push(D);
				G.children.push(E);
				return root;
			}();

			self.callback = this.spy(function(node) {});
		},

		"breadthFirst": {
			"'breadthFirst' traverses graphs in breadth-first search order": function() {
				var nodes = [];
				visitors.breadthFirst(this.graph, function(node, path) { nodes.push(node); });
				buster.assert.equals(_.pluck(nodes, "name"), ["A", "B", "C", "E", "D", "F", "G"]);

				nodes = [];
				visitors.breadthFirst(this.cyclicGraph, function(node, path) { nodes.push(node); });
				buster.assert.equals(_.pluck(nodes, "name"), ["A", "B", "C", "E", "D", "F", "G"]);
			},

			"'breadthFirst' 'callback's 'path' provides an array of node indexes from the root to the current node": function() {
				var self = this;

				visitors.breadthFirst(this.graph, function(node, path) {
					if (node.name == self.nodes.A.name) {
						buster.assert.equals(path, []);
					} else if (node.name == self.nodes.B.name) {
						buster.assert.equals(path, [0]);
					} else if (node.name == self.nodes.C.name) {
						buster.assert.equals(path, [1]);
					} else if (node.name == self.nodes.D.name) {
						buster.assert.equals(path, [0, 0]);
					} else if (node.name == self.nodes.E.name) {
						buster.assert.equals(path, [2]);
					} else if (node.name == self.nodes.F.name) {
						buster.assert.equals(path, [0, 1]);
					} else if (node.name == self.nodes.G.name) {
						buster.assert.equals(path, [1, 0]);
					}
				});
			},

			"'breadthFirst' 'doProcess's 'path' provides an array of node indexes from the root to the current node": function() {
				var self = this;

				visitors.breadthFirst(this.graph, self.callback, function(node, path) {
					if (node.name == self.nodes.A.name) {
						buster.assert.equals(path, []);
					} else if (node.name == self.nodes.B.name) {
						buster.assert.equals(path, [0]);
					} else if (node.name == self.nodes.C.name) {
						buster.assert.equals(path, [1]);
					} else if (node.name == self.nodes.D.name) {
						buster.assert.equals(path, [0, 0]);
					} else if (node.name == self.nodes.E.name) {
						buster.assert.equals(path, [2]);
					} else if (node.name == self.nodes.F.name) {
						buster.assert.equals(path, [0, 1]);
					} else if (node.name == self.nodes.G.name) {
						buster.assert.equals(path, [1, 0]);
					}
				});
			},

			"'breadthFirst' executes the 'callback' exactly once for each node in the graph": function() {
				visitors.breadthFirst(this.graph, this.callback);
				buster.assert.equals(this.callback.callCount, _.keys(this.nodes).length);

				this.callback.reset();
				visitors.breadthFirst(this.cyclicGraph, this.callback);
				buster.assert.equals(this.callback.callCount, _.keys(this.nodes).length);
			},

			"'breadthFirst' does not visit a node if 'visit' returns a falsy value": function() {
				visitors.breadthFirst(this.graph, this.callback, function(node) { return false; });
				buster.assert.equals(this.callback.callCount, 0);

				visitors.breadthFirst(this.graph, this.callback, function(node) { return node.name !== "A"; });
				buster.assert.equals(this.callback.callCount, _.keys(this.nodes).length - 1);
			},

			"'breadthFirst' adds a non-enumerable property __hash with a hash code to each node": function() {
				var nodes = [];
				visitors.breadthFirst(this.graph, function(node, path) { nodes.push(node); });

				_.each(nodes, function(node) {
					for (var key in node) buster.refute.equals(key, "__hash");
				});

				buster.assert(predicates.isArrayOf(_.unique(_.pluck(nodes, "__hash")), _.isString, _.keys(this.nodes).length));
			}
		},

		"depthFirst": {
			"'depthFirst' traverses graphs in depth-first search order": function() {
				var nodes = [];
				visitors.depthFirst(this.graph, function(node, path) { nodes.push(node); });
				buster.assert.equals(_.pluck(nodes, "name"), ["A", "B", "D", "F", "C", "G", "E"]);

				nodes = [];
				visitors.depthFirst(this.cyclicGraph, function(node, path) { nodes.push(node); });
				buster.assert.equals(_.pluck(nodes, "name"), ["A", "B", "D", "F", "E", "C", "G"]);
			},

			"'depthFirst' 'callback's 'path' provides an array of node indexes from the root to the current node": function() {
				var self = this;

				visitors.depthFirst(this.graph, function(node, path) {
					if (node.name == self.nodes.A.name) {
						buster.assert.equals(path, []);
					} else if (node.name == self.nodes.B.name) {
						buster.assert.equals(path, [0]);
					} else if (node.name == self.nodes.C.name) {
						buster.assert.equals(path, [1]);
					} else if (node.name == self.nodes.D.name) {
						buster.assert.equals(path, [0, 0]);
					} else if (node.name == self.nodes.E.name) {
						buster.assert.equals(path, [2]);
					} else if (node.name == self.nodes.F.name) {
						buster.assert.equals(path, [0, 1]);
					} else if (node.name == self.nodes.G.name) {
						buster.assert.equals(path, [1, 0]);
					}
				});
			},

			"'depthFirst' 'doProcess's 'path' provides an array of node indexes from the root to the current node": function() {
				var self = this;

				visitors.depthFirst(this.graph, self.callback, function(node, path) {
					if (node.name == self.nodes.A.name) {
						buster.assert.equals(path, []);
					} else if (node.name == self.nodes.B.name) {
						buster.assert.equals(path, [0]);
					} else if (node.name == self.nodes.C.name) {
						buster.assert.equals(path, [1]);
					} else if (node.name == self.nodes.D.name) {
						buster.assert.equals(path, [0, 0]);
					} else if (node.name == self.nodes.E.name) {
						buster.assert.equals(path, [2]);
					} else if (node.name == self.nodes.F.name) {
						buster.assert.equals(path, [0, 1]);
					} else if (node.name == self.nodes.G.name) {
						buster.assert.equals(path, [1, 0]);
					}
				});
			},

			"'depthFirst' executes the 'callback' exactly once for each node in the graph": function() {
				visitors.depthFirst(this.graph, this.callback);
				buster.assert.equals(this.callback.callCount, _.keys(this.nodes).length);

				this.callback.reset();
				visitors.depthFirst(this.cyclicGraph, this.callback);
				buster.assert.equals(this.callback.callCount, _.keys(this.nodes).length);
			},

			"'depthFirst' does not visit a node if 'visit' returns a falsy value": function() {
				visitors.depthFirst(this.graph, this.callback, function(node) { return false; });
				buster.assert.equals(this.callback.callCount, 0);

				visitors.depthFirst(this.graph, this.callback, function(node) { return node.name !== "A"; });
				buster.assert.equals(this.callback.callCount, _.keys(this.nodes).length - 1);
			},

			"'depthFirst' adds a non-enumerable property __hash with a hash code to each node": function() {
				var nodes = [];
				visitors.depthFirst(this.graph, function(node, path) { nodes.push(node); });

				_.each(nodes, function(node) {
					for (var key in node) buster.refute.equals(key, "__hash");
				});

				buster.assert(predicates.isArrayOf(_.unique(_.pluck(nodes, "__hash")), _.isString, _.keys(this.nodes).length));
			}
		}
	});
});
