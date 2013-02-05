define(["src/dataseries.js"], function(ds) {
	buster.testCase("FunctionDataSeriesGenerator", {
		setUp: function() {
			this.f = this.spy(ds.functions.identity);
			this.g = ds.generators.f(this.f);

			this.filter = this.spy(function(y, x, i) { return true; });
			this.transform = this.spy(function(y, x, i) { return y; });

			this.inputs = ds.range(2);
			this.time = { start: new Date(Date.UTC(2013, 0, 1)), precision: ds.time.DAY };

			this.outputs = ds.range(2);
		},

		"filter": {
			"'callback' argument provided": {
				"'filter' sets a filter": function() {
					this.g.filter(this.filter);
					buster.assert.equals(this.g.filter(), this.filter);
				},

				"'filter' resets a previously set filter if 'callback' is set to undefined": function() {
					this.g.filter(this.filter);
					buster.assert.equals(this.g.filter(), this.filter);

					this.g.filter(undefined);
					buster.assert.equals(this.g.filter(), undefined);
				},

				"'filter' returns a reference to the generator": function() {
					var g = this.g.filter(this.filter);
					buster.assert.equals(g.constructor.name, "FunctionDataSeriesGenerator");

					g = this.g.filter(undefined);
					buster.assert.equals(g.constructor.name, "FunctionDataSeriesGenerator");
				},

				"'filter' throws if 'callback' is not a function": function() {
					var self = this;

					buster.refute.exception(function() {
						self.g.filter(undefined);
						self.g.filter(function() {});
					}, "Error");

					buster.assert.exception(function() {
						self.g.filter(0);
					}, "Error");

					buster.assert.exception(function() {
						self.g.filter("a");
					}, "Error");

					buster.assert.exception(function() {
						self.g.filter([]);
					}, "Error");

					buster.assert.exception(function() {
						self.g.filter({});
					}, "Error");

					buster.assert.exception(function() {
						self.g.filter(null);
					}, "Error");
				}
			},

			"'callback' argument omitted": {
				"'filter' returns a previously set filter": function() {
					this.g.filter(this.filter);
					buster.assert.equals(this.g.filter(), this.filter);
				},

				"'filter' returns undefined if no filter was previously set": function() {
					buster.assert.equals(this.g.filter(), undefined);
				}
			},

			"the filter determines whether an output value shall be included or not": function() {
				this.g.inputs(ds.range(-2, 2));

				// pass-through all y's
				this.g.filter(function(y, x, i) {
					return true;
				});

				buster.assert.equals(this.g.values(), [-2, -1, 0, 1, 2]);

				// reject all values < 0
				this.g.filter(function(y, x, i) {
					return x >= 0;
				});

				buster.assert.equals(this.g.values(), [0, 1, 2]);

				// reject all points at odd indexes
				this.g.filter(function(y, x, i) {
					return i % 2 === 0;
				});

				buster.assert.equals(this.g.values(), [-2, 0, 2]);
			},

			"if the filter rejects an output value the generator input values remain unaffected": function() {
				this.g.inputs(this.inputs);

				this.g.filter(function(y, x, i) {
					return false;
				}).values();

				buster.assert.equals(this.g.inputs(), this.inputs);
			}
		},

		"transform": {
			"'callback' argument provided": {
				"'transform' sets a transform": function() {
					this.g.transform(this.transform);
					buster.assert.equals(this.g.transform(), this.transform);
				},

				"'transform' resets a previously set transform if 'callback' is set to undefined": function() {
					this.g.transform(this.transform);
					buster.assert.equals(this.g.transform(), this.transform);

					this.g.transform(undefined);
					buster.assert.equals(this.g.transform(), undefined);
				},

				"'transform' returns a reference to the generator": function() {
					var g = this.g.transform(this.transform);
					buster.assert.equals(g.constructor.name, "FunctionDataSeriesGenerator");

					g = this.g.transform(undefined);
					buster.assert.equals(g.constructor.name, "FunctionDataSeriesGenerator");
				},

				"'transform' throws if 'callback' is not a function": function() {
					var self = this;

					buster.refute.exception(function() {
						self.g.transform(undefined);
						self.g.transform(function() {});
					}, "Error");

					buster.assert.exception(function() {
						self.g.transform(0);
					}, "Error");

					buster.assert.exception(function() {
						self.g.transform("a");
					}, "Error");

					buster.assert.exception(function() {
						self.g.transform([]);
					}, "Error");

					buster.assert.exception(function() {
						self.g.transform({});
					}, "Error");

					buster.assert.exception(function() {
						self.g.transform(null);
					}, "Error");
				}
			},

			"'callback' argument omitted": {
				"'transform' returns a previously set transform": function() {
					this.g.transform(this.transform);
					buster.assert.equals(this.g.transform(), this.transform);
				},

				"'transform' returns undefined if no transform was previously set": function() {
					buster.assert.equals(this.g.transform(), undefined);
				}
			},

			"the transform determines the generated data for each pair of input and output value": function() {
				var g = ds.generators.f(ds.functions.linear, 2, 1).inputs(this.inputs);

				// generate default data
				buster.assert.equals(g.transform(this.transform).values(), [1, 3, 5]);

				// generate objects with properties 'x' and 'y' for each pair
				var transform = function(y, x, i) { return {x: x, y: y}; };

				buster.assert.equals(g.transform(transform).values(), [
					{x: 0, y: 1},
					{x: 1, y: 3},
					{x: 2, y: 5}
				]);

				// generate objects with properties 'x' and 'y' for each pair, where 'x' holds a date
				var dates = ds.range(+new Date(2012, 0, 1), +new Date(2012, 0, 31), ds.time.DAY);
				transform = function(y, x, i) { return {x: dates[i], y: y}; };

				buster.assert.equals(g.transform(transform).values(), [
					{x: +new Date(2012, 0, 1), y: 1},
					{x: +new Date(2012, 0, 2), y: 3},
					{x: +new Date(2012, 0, 3), y: 5}
				]);

				// generate objects with properties 'amplitude', 'gain' and 'channel' for each pair
				transform = function(y, x, i) {
					return {
						amplitude: y,
						gain: y / x,
						channel: i % 2 === 0 ? "left" : "right"
					};
				};

				buster.assert.equals(g.inputs([0, 0, 1, 1, 2, 2]).transform(transform).values(), [
					{amplitude: 1, gain: Infinity, channel: "left"},
					{amplitude: 1, gain: Infinity, channel: "right"},
					{amplitude: 3, gain: 3, channel: "left"},
					{amplitude: 3, gain: 3, channel: "right"},
					{amplitude: 5, gain: 2.5, channel: "left"},
					{amplitude: 5, gain: 2.5, channel: "right"}
				]);
			}
		},

		"values": {
			"compute": {
				"'values' invokes 'algorithm' for each input value": function() {
					this.g.inputs(this.inputs).values();
					buster.assert.equals(this.f.callCount, this.inputs.length);
				}
			},

			"filter": {
				"'values' invokes the filter once for each input value": function() {
					this.g.filter(this.filter).inputs(this.inputs).values();
					buster.assert.equals(this.filter.callCount, this.inputs.length);
				},

				"function context": {
					"the context gives access to the 'generator'": function() {
						var self = this;

						self.g.inputs(self.inputs);

						var filter = function(y, x, i) {
							buster.assert(this.generator.constructor.name, "FunctionDataSeriesGenerator");
						};

						self.g.filter(filter).values();
					},

					"the context gives access to the 'inputs' and readily computed 'outputs' considered for computation": function() {
						var outputs = [];
						var self = this;

						self.g.inputs(self.inputs);

						// consider all outputs for computation
						var filter = function(y, x, i) {
							buster.assert(_.isArray(this.inputs));
							buster.assert(_.isArray(this.outputs));

							// check that 'inputs' holds the set of inputs
							buster.assert.equals(this.inputs, self.inputs);

							// check that 'inputs' holds a particular input value at a particular index
							for (var i = 0; i < self.inputs.length; i++) {
								buster.assert.equals(this.inputs[i], self.inputs[i]);
							}

							// check that 'outputs' holds the set of readily computed output values
							buster.assert.equals(this.outputs, outputs);

							// check that 'outputs' holds a particular output value at a particular index
							for (var i = 0; i < outputs.length; i++) {
								buster.assert.equals(this.outputs[i], outputs[i]);
							}

							outputs.push(y);
							return true;
						};

						self.g.filter(filter).values();
					},

					"the context gives access to an optional 'timeRange'": function() {
						var timeRange = [];
						var self = this;

						// no time range configuration provided
						self.g.inputs(self.inputs);

						var filter = function(y, x, i) {
							buster.assert.equals(this.timeRange, undefined);
						};

						self.g.filter(filter).values();

						// time range specification provided
						filter = function(y, x, i) {
							buster.assert.equals(this.timeRange, [self.time.start]);
						};

						self.g.inputs([1]).filter(filter).time(this.time.start, this.time.precision).values();

						filter = function(y, x, i) {
							buster.assert.equals(this.timeRange, ds.time.range(self.time.start, new Date((this.inputs.length - 1) * self.time.precision + self.time.start.getTime()), self.time.precision));
						};

						self.g.inputs(self.inputs).filter(filter).time(this.time.start, this.time.precision).values();
					},

					"the filter argument 'x' refers to an input value within (the user-provided) 'inputs'": function() {
						var inputs = ds.range(-2, 2);
						var values = [];

						this.g.inputs(inputs);

						var filter = function(y, x, i) {
							values.push(x);
						};

						this.g.filter(filter).values();

						buster.assert.equals(values, inputs);
					},

					"the filter argument 'y' refers to a computed output value": function() {
						var inputs = ds.range(-2, 2);
						var outputs;
						var values = [];

						var g = ds.generators.f(ds.functions.linear, 2, 1).inputs(inputs);
						outputs = g.values();

						var filter = function(y, x, i) {
							values.push(y);
						};

						g.filter(filter).values();

						buster.assert.equals(values, outputs);
					},

					"the filter argument 'i' refers to the index of 'x' within (the user-provided) 'inputs'": function() {
						var inputs = ds.range(-2, 2);
						var values = [];

						this.g.inputs(inputs);

						var filter = function(y, x, i) {
							values.push({x: x, i: i});
						};

						this.g.filter(filter).values();

						buster.assert.equals(values, [{x: -2, i: 0}, {x: -1, i: 1}, {x: 0, i: 2}, {x: 1, i: 3}, {x: 2, i: 4}]);
					},

					"the context persists data throughout all invocations of the filter": function() {
						var context;
						var self = this;

						self.g.inputs(self.inputs);

						// check if values assigned to a context member persist throughout
						// all invocations of 'callback' (invoked once for each input value)
						self.g.filter(function(y, x, i) {
							if (this.sumInputs === undefined) this.sumInputs = 0;
							this.sumInputs += x;

							context = this;
						}).values();

						buster.assert.equals(context.sumInputs, 3);

						// check if the context is reset if the generator
						// uses a different filter implementation
						self.g.filter(function(y, x, i) {
							context = this;
						}).values();

						buster.assert.equals(context.sumInputs, undefined);
					}
				}
			},

			"transform": {
				"'values' invokes the transform once for each input value": function() {
					this.g.inputs(this.inputs).transform(this.transform).values();
					buster.assert.equals(this.transform.callCount, this.inputs.length);
				},

				"function context": {
					"the context gives access to the 'generator'": function() {
						var self = this;

						self.g.inputs(self.inputs);

						var transform = function(y, x, i) {
							buster.assert(this.generator.constructor.name, "FunctionDataSeriesGenerator");
						};

						self.g.transform(transform).values();
					},

					"the context gives access to the 'inputs' and 'outputs' considered for computation": function() {
						var inputs;
						var outputs;
						var self = this;

						self.g.inputs(self.inputs);

						var transform = function(y, x, i) {
							inputs = this.inputs;
							outputs = this.outputs;
							return y;
						};

						self.g.transform(transform).values();

						buster.assert(_.isArray(inputs));
						buster.assert.equals(inputs, self.inputs);

						buster.assert(_.isArray(outputs));
						buster.assert.equals(outputs, self.outputs);
					},

					"the context gives access to an optional 'timeRange'": function() {
						var timeRange = [];
						var self = this;

						// no time range configuration provided
						self.g.inputs(self.inputs);

						var transform = function(y, x, i) {
							buster.assert.equals(this.timeRange, undefined);
						};

						self.g.transform(transform).values();

						// time range specification provided
						transform = function(y, x, i) {
							buster.assert.equals(this.timeRange, [self.time.start]);
						};

						self.g.inputs([1]).transform(transform).time(this.time.start, this.time.precision).values();

						transform = function(y, x, i) {
							buster.assert.equals(this.timeRange, ds.time.range(self.time.start, new Date((this.inputs.length - 1) * self.time.precision + self.time.start.getTime()), self.time.precision));
						};

						self.g.inputs(self.inputs).transform(transform).time(this.time.start, this.time.precision).values();
					},

					"the transform argument 'x' refers to an input value within the context's 'inputs'": function() {
						var inputs;
						var values = [];

						this.g.inputs(ds.range(-2, 2));

						var filter = function(y, x, i) {
							return x >= 0;
						};

						var transform = function(y, x, i) {
							inputs = this.inputs;
							values.push(x);
						};

						this.g.filter(filter).transform(transform).values();

						buster.assert.equals(values, inputs);
					},

					"the transform argument 'y' refers to an output value within the context's 'outputs'": function() {
						var outputs;
						var values = [];

						this.g.inputs(ds.range(-2, 2));

						var filter = function(y, x, i) {
							return y >= 0;
						};

						var transform = function(y, x, i) {
							outputs = this.outputs;
							values.push(y);
						};

						this.g.filter(filter).transform(transform).values();

						buster.assert.equals(values, outputs);
					},

					"the transform argument 'i' refers to the index of 'x' and 'y' within the context's 'inputs' and 'outputs', respectively": function() {
						var inputs = ds.range(-2, 2);
						var values = [];

						this.g.inputs(inputs);

						var filter = function(y, x, i) {
							return x >= 0;
						};

						var transform = function(y, x, i) {
							values.push({x: x, i: i});
						};

						this.g.filter(filter).transform(transform).values();

						buster.assert.equals(values, [{x: 0, i: 0}, {x: 1, i: 1}, {x: 2, i: 2}]);
					},

					"the context persists throughout all invocations of the transform": function() {
						var context;
						var self = this;

						self.g.inputs(self.inputs);

						// check if values assigned to a context member persist throughout
						// all invocations of 'transform' (invoked once for each input value)
						var transform = function(y, x, i) {
							if (this.sumInputs === undefined) this.sumInputs = 0;
							this.sumInputs += x;

							context = this;
						};

						self.g.transform(transform).values();

						buster.assert.equals(context.sumInputs, 3);

						// check if the context is reset if the generator
						// uses a different transform implementation
						transform = function(y, x, i) {
							context = this;
						};

						self.g.transform(transform).values();

						buster.assert.equals(context.sumInputs, undefined);
					}
				}
			},

			"time": {
				"the time range's points in time are made available via the 'x' parameter of the 'transform' method": function() {
					var timeRange = ds.time.range(this.time.start, new Date((this.inputs.length - 1) * this.time.precision + this.time.start.getTime()), this.time.precision);

					this.g.inputs(this.inputs);

					var transform = function(y, x, i) {
						buster.assert.equals(timeRange[i], x);
					};

					this.g.time(this.time.start, this.time.precision).transform(transform).values();
				}
			},

			"'values' returns an immutable set of generated data": function() {
				this.g.inputs(this.inputs);
				buster.assert.equals(this.g.values(), this.outputs);

				// check if values returns a cloned set of outputs
				var outputs = this.g.values();
				outputs.push(0);

				buster.refute.equals(this.g.values(), outputs);
			},

			"'values' returns [] if inputs is empty": function() {
				buster.assert(this.g.values(), []);
			}
		},

		"inputs": {
			"'values' argument provided": {
				"'inputs' sets an immutable set of input values": function() {
					this.g.inputs(this.inputs);
					buster.assert.equals(this.g.inputs(), this.inputs);

					// check if inputs clones a set of inputs
					this.inputs.push(3);
					buster.refute.equals(this.g.inputs(), this.inputs);
				},

				"'inputs' returns a reference to the generator": function() {
					var g = this.g.inputs(this.inputs);
					buster.assert.equals(g.constructor.name, "FunctionDataSeriesGenerator");
				},

				"'inputs' throws if 'values' is not an array": function() {
					var self = this;

					buster.refute.exception(function() {
						self.g.inputs([]);
					}, "Error");

					buster.assert.exception(function() {
						self.g.inputs(0);
					}, "Error");

					buster.assert.exception(function() {
						self.g.inputs("a");
					}, "Error");

					buster.assert.exception(function() {
						self.g.inputs(function() {});
					}, "Error");

					buster.assert.exception(function() {
						self.g.inputs({});
					}, "Error");

					buster.assert.exception(function() {
						self.g.inputs(undefined);
					}, "Error");

					buster.assert.exception(function() {
						self.g.inputs(null);
					}, "Error");
				}
			},

			"'values' argument omitted": {
				"'inputs' returns an immutable set of previously set input values": function() {
					this.g.inputs(this.inputs);
					buster.assert.equals(this.g.inputs(), this.inputs);

					// check if inputs returns a cloned set of inputs
					var inputs = this.g.inputs();
					inputs.push(3);
					buster.refute.equals(this.g.inputs(), inputs);
				},

				"'inputs' returns [] if no input values were previously set": function() {
					buster.assert.equals(this.g.inputs(), []);
				}
			}
		},

		"time": {
			"'time' arguments provided": {
				"'time' sets a time range configuration": function() {
					this.g.time(this.time.start, this.time.precision);
					buster.assert.equals(this.g.time(), [this.time.start, this.time.precision]);
				},

				"'time' returns a reference to the generator": function() {
					var g = this.g.time(this.time.start, this.time.precision);
					buster.assert.equals(g.constructor.name, "FunctionDataSeriesGenerator");
				},

				"'time's 'precision' defaults to ds.time.DAY": function() {
					var g = this.g.time(this.time.start);
					buster.assert.equals(this.g.time(), [this.time.start, ds.time.DAY]);
				},

				"'time' throws if 'start' is not a date": function() {
					var self = this;

					buster.refute.exception(function() {
						self.g.time(new Date(), ds.time.DAY);
					}, "Error");

					buster.assert.exception(function() {
						self.g.time(0, ds.time.DAY);
					}, "Error");

					buster.assert.exception(function() {
						self.g.time("a", ds.time.DAY);
					}, "Error");

					buster.assert.exception(function() {
						self.g.time([], ds.time.DAY);
					}, "Error");

					buster.assert.exception(function() {
						self.g.time(function() {}, ds.time.DAY);
					}, "Error");

					buster.assert.exception(function() {
						self.g.time({}, ds.time.DAY);
					}, "Error");

					buster.assert.exception(function() {
						self.g.time(null, ds.time.DAY);
					}, "Error");

					buster.assert.exception(function() {
						self.g.time(undefined, ds.time.DAY);
					}, "Error");
				},

				"'time' throws if 'start' is provided and 'precision' is not a function or is not a number > 0": function() {
					var self = this;

					buster.refute.exception(function() {
						self.g.time(new Date(), 1);
						self.g.time(new Date(), function() { return 1; });
					}, "Error");

					buster.assert.exception(function() {
						self.g.time(new Date(), 0);
					}, "Error");

					buster.assert.exception(function() {
						self.g.time(new Date(), "a");
					}, "Error");

					buster.assert.exception(function() {
						self.g.time(new Date(), []);
					}, "Error");

					buster.assert.exception(function() {
						self.g.time(new Date(), {});
					}, "Error");

					buster.assert.exception(function() {
						self.g.time(new Date(), null);
					}, "Error");

					buster.assert.exception(function() {
						self.g.time(new Date(), undefined);
					}, "Error");
				}
			},

			"'time' arguments omitted": {
				"'time' returns a previously set time range configuration": function() {
					this.g.time(this.time.start, this.time.precision);
					buster.assert.equals(this.g.time(), [this.time.start, this.time.precision]);
				},

				"'time' returns undefined if no time range configuration was previously set": function() {
					buster.assert.equals(this.g.time(), undefined);
				}
			}
		}
	});
});
