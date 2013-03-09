define(["src/dataseries.js"], function(ds) {
	buster.testCase("FunctionDataSeriesGenerator", {
		setUp: function() {
			this.f = this.spy(ds.functions.identity);
			this.g = ds.generators.f(this.f);

			this.inputs = ds.range(2);
			this.outputs = ds.range(2);
			this.filter = this.spy(function(y, x, i) { return true; });
			this.transform = this.spy(function(y, x, i) { return y; });
			this.time = {start: new Date(2013, 0, 1), precision: ds.time.DAY};
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

		"filter": {
			"'filter' sets a filter": function() {
				this.g.inputs(this.inputs).filter(this.filter).values();
				buster.assert(this.filter.called);
			},

			"'filter' overrides a previously set filter": function() {
				this.g.inputs(this.inputs).filter(this.filter);

				var filter = this.spy();
				this.g.filter(filter).values();

				buster.refute(this.filter.called);
			},

			"'filter' resets a previously set filter if 'callback' is set to undefined": function() {
				this.g.inputs(this.inputs).filter(this.filter);
				this.g.filter().values();
				buster.refute(this.filter.called);
			},

			"'filter' returns a reference to the generator": function() {
				var g = this.g.filter(this.filter);
				buster.assert.equals(g.constructor.name, "FunctionDataSeriesGenerator");

				g = this.g.filter();
				buster.assert.equals(g.constructor.name, "FunctionDataSeriesGenerator");
			},

			"'filter' throws if 'callback' is not a function": function() {
				var self = this;

				buster.refute.exception(function() {
					self.g.filter();
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

		"time": {
			"'time' sets a time range configuration": function() {
				var timeRange = [];

				this.g.inputs(this.inputs)
					.time(new Date(2013, 0, 1), this.time.DAY)
					.transform(function(y, x, i) { timeRange.push(x); })
					.values();

				buster.assert(timeRange, [new Date(2013, 0, 1), new Date(2013, 0, 2), new Date(2013, 0, 3)]);
			},

			"'time' unsets a time range configuration if either argument is set to undefined": function() {
				var timeRange;

				this.g.inputs(this.inputs).transform(function(y, x, i) { timeRange.push(x); });

				timeRange = [];
				this.g.time(this.time.start, this.time.precision).values();
				buster.refute.equals(timeRange, this.inputs);

				timeRange = [];
				this.g.time().values();
				buster.assert.equals(timeRange, this.inputs);

				timeRange = [];
				this.g.time(this.time.start, undefined).values();
				buster.assert.equals(timeRange, this.inputs);

				timeRange = [];
				this.g.time(undefined, this.time.precision).values();
				buster.assert.equals(timeRange, this.inputs);

				timeRange = [];
				this.g.time(this.time.start, this.time.precision).values();
				buster.refute.equals(timeRange, this.inputs);
			},

			"'time's 'precision' defaults to ds.time.DAY": function() {
				var timeRange = [];

				this.g.inputs(this.inputs)
					.time(new Date(2013, 0, 1))
					.transform(function(y, x, i) { timeRange.push(x); })
					.values();

				buster.assert(timeRange, [new Date(2013, 0, 1), new Date(2013, 0, 2), new Date(2013, 0, 3)]);
			},

			"'time' returns a reference to the generator": function() {
				var g = this.g.time(this.time.start, this.time.precision);
				buster.assert.equals(g.constructor.name, "FunctionDataSeriesGenerator");
			},

			"'time' throws if 'start' is not a date": function() {
				var self = this;

				buster.refute.exception(function() {
					self.g.time(new Date(), ds.time.DAY);
					self.g.time(undefined, ds.time.DAY);
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
			},

			"'time' throws if 'start' is provided and 'precision' is not a function or is not a number > 0": function() {
				var self = this;

				buster.refute.exception(function() {
					self.g.time(new Date(), 1);
					self.g.time(new Date(), function() { return 1; });
					self.g.time(new Date(), undefined);
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
			}
		},

		"transform": {
			"'transform' sets a transformation": function() {
				this.g.inputs(this.inputs).transform(this.transform).values();
				buster.assert(this.transform.called);
			},

			"'transform' overrides a previously set transformation": function() {
				this.g.inputs(this.inputs).transform(this.transform);

				var transform = this.spy();
				this.g.transform(transform).values();

				buster.refute(this.transform.called);
			},

			"'transform' resets a previously set transformation if 'callback' is set to undefined": function() {
				this.g.inputs(this.inputs).transform(this.transform);
				this.g.transform().values();
				buster.refute(this.transform.called);
			},

			"'transform' returns a reference to the generator": function() {
				var g = this.g.transform(this.transform);
				buster.assert.equals(g.constructor.name, "FunctionDataSeriesGenerator");

				g = this.g.transform();
				buster.assert.equals(g.constructor.name, "FunctionDataSeriesGenerator");
			},

			"'transform' throws if 'callback' is not a function": function() {
				var self = this;

				buster.refute.exception(function() {
					self.g.transform();
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

		"call": {
			"'callback' argument provided": {
				"'call' adds a callback to the callbacks queue": function() {
					var callback1 = this.spy();
					var callback2 = this.spy();

					this.g.call(callback1).call(callback2).values();
					buster.assert(callback1.calledBefore(callback2));
				},

				"'call' returns a reference to the generator": function() {
					var g = this.g.call(function() {});
					buster.assert.equals(g.constructor.name, "FunctionDataSeriesGenerator");
				},

				"'call' throws if 'callback' is not a function": function() {
					var self = this;

					buster.refute.exception(function() {
						self.g.call(function() {});
					}, "Error");

					buster.assert.exception(function() {
						self.g.call(0);
					}, "Error");

					buster.assert.exception(function() {
						self.g.call("a");
					}, "Error");

					buster.assert.exception(function() {
						self.g.call([]);
					}, "Error");

					buster.assert.exception(function() {
						self.g.call({});
					}, "Error");

					buster.assert.exception(function() {
						self.g.call(null);
					}, "Error");

					buster.assert.exception(function() {
						self.g.call(undefined);
					}, "Error");
				}
			},

			"'call' relays excess arguments to the callback": function() {
				var callback = this.spy(function(outputs, a, b) {});

				this.g.inputs(this.inputs).call(callback, 1, 2).values();
				buster.assert(callback.calledWith(this.outputs, 1, 2));
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

						var filter = function(y, x, i) {
							buster.assert(this.generator.constructor.name, "FunctionDataSeriesGenerator");
						};

						self.g.inputs(self.inputs).filter(filter).values();
					},

					"the context gives access to the 'inputs' and readily computed 'outputs' considered for computation": function() {
						var self = this;
						var outputs = [];

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

						self.g.inputs(self.inputs).filter(filter).values();
					},

					"the context gives access to an optional 'timeRange'": function() {
						var self = this;

						// no time range configuration provided
						self.g.inputs(self.inputs);

						var filter = function(y, x, i) {
							buster.assert.equals(this.timeRange, undefined);
						};

						self.g.filter(filter).values();

						// time range specification provided
						filter = function(y, x, i) {
							buster.assert.equals(this.timeRange, ds.time.range(self.time.start, new Date((this.inputs.length - 1) * self.time.precision + self.time.start.getTime()), self.time.precision));
						};

						self.g.filter(filter).time(this.time.start, this.time.precision).values();
					},

					"the filter argument 'x' refers to an input value within (the user-provided) 'inputs'": function() {
						var inputs = ds.range(-2, 2);
						var values = [];

						var filter = function(y, x, i) {
							values.push(x);
						};

						this.g.inputs(inputs).filter(filter).values();
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

						var filter = function(y, x, i) {
							values.push({x: x, i: i});
						};

						this.g.inputs(inputs).filter(filter).values();
						buster.assert.equals(values, [{x: -2, i: 0}, {x: -1, i: 1}, {x: 0, i: 2}, {x: 1, i: 3}, {x: 2, i: 4}]);
					},

					"the context persists data throughout all invocations of the filter": function() {
						var self = this;
						var context;

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

			"time": {
				"the time range's points in time are made available via the 'x' parameter of the 'transform' method": function() {
					this.g.inputs(this.inputs);

					var dailyRange = ds.time.range(this.time.start, this.inputs.length, ds.time.DAY);
					this.g.time(this.time.start, ds.time.DAY).transform(function(y, x, i) {
						buster.assert.equals(dailyRange[i], x);
					}).values();

					var monthlyRange = ds.time.range(this.time.start, this.inputs.length, ds.time.MONTH);
					this.g.time(this.time.start, ds.time.MONTH).transform(function(y, x, i) {
						buster.assert.equals(monthlyRange[i], x);
					}).values();

					var yearlyRange = ds.time.range(this.time.start, this.inputs.length, ds.time.YEAR);
					this.g.time(this.time.start, ds.time.YEAR).transform(function(y, x, i) {
						buster.assert.equals(yearlyRange[i], x);
					}).values();
				}
			},

			"transform": {
				"'values' invokes the transform once for each input value": function() {
					this.g.inputs(this.inputs).transform(this.transform).values();
					buster.assert.equals(this.transform.callCount, this.inputs.length);
				},

				"'values' invokes the transform after the filter": function() {
					var filter = this.spy(function(y, x, i) { return y; });
					var transform = this.spy(function(y, x, i) { return y; });

					this.g.inputs(this.inputs).transform(transform).filter(filter).values();
					buster.assert(transform.calledAfter(filter));
				},

				"function context": {
					"the context gives access to the 'generator'": function() {
						var self = this;

						var transform = function(y, x, i) {
							buster.assert(this.generator.constructor.name, "FunctionDataSeriesGenerator");
						};

						self.g.inputs(self.inputs).transform(transform).values();
					},

					"the context gives access to the 'inputs' and 'outputs' considered for computation": function() {
						var self = this;
						var inputs;
						var outputs;

						var transform = function(y, x, i) {
							inputs = this.inputs;
							outputs = this.outputs;
							return y;
						};

						self.g.inputs(self.inputs).transform(transform).values();

						buster.assert(_.isArray(inputs));
						buster.assert.equals(inputs, self.inputs);

						buster.assert(_.isArray(outputs));
						buster.assert.equals(outputs, self.outputs);
					},

					"the context gives access to an optional 'timeRange'": function() {
						var self = this;

						// no time range configuration provided
						self.g.inputs(self.inputs);

						var transform = function(y, x, i) {
							buster.assert.equals(this.timeRange, undefined);
						};

						self.g.transform(transform).values();

						// time range specification provided
						transform = function(y, x, i) {
							buster.assert.equals(this.timeRange, ds.time.range(self.time.start, new Date((this.inputs.length - 1) * self.time.precision + self.time.start.getTime()), self.time.precision));
						};

						self.g.transform(transform).time(this.time.start, this.time.precision).values();
					},

					"the transform argument 'x' refers to an input value within the context's 'inputs'": function() {
						var inputs;
						var values = [];

						var filter = function(y, x, i) {
							return x >= 0;
						};

						var transform = function(y, x, i) {
							inputs = this.inputs;
							values.push(x);
						};

						this.g.inputs(ds.range(-2, 2)).filter(filter).transform(transform).values();
						buster.assert.equals(values, inputs);
					},

					"the transform argument 'y' refers to an output value within the context's 'outputs'": function() {
						var outputs;
						var values = [];

						var filter = function(y, x, i) {
							return y >= 0;
						};

						var transform = function(y, x, i) {
							outputs = this.outputs;
							values.push(y);
						};

						this.g.inputs(ds.range(-2, 2)).filter(filter).transform(transform).values();
						buster.assert.equals(values, outputs);
					},

					"the transform argument 'i' refers to the index of 'x' and 'y' within the context's 'inputs' and 'outputs', respectively": function() {
						var inputs = ds.range(-2, 2);
						var values = [];

						var filter = function(y, x, i) {
							return x >= 0;
						};

						var transform = function(y, x, i) {
							values.push({x: x, i: i});
						};

						this.g.inputs(inputs).filter(filter).transform(transform).values();
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

			"call": {
				"'values' invokes all callbacks": function() {
					var callback1 = this.spy();
					var callback2 = this.spy();

					this.g.call(callback1).call(callback2).values();
					buster.assert(callback1.calledOnce);
					buster.assert(callback2.calledOnce);
				},

				"'values' invokes the callbacks after the 'transform'": function() {
					var transform = this.spy(function(y, x, i) { return y; });
					var callback = this.spy();

					this.g.inputs(this.inputs).call(callback).transform(transform).values();
					buster.assert(callback.calledAfter(transform));
				},

				"function context": {
					"the context gives access to the 'generator'": function() {
						var self = this;

						var callback = function(outputs) {
							buster.assert(this.generator.constructor.name, "FunctionDataSeriesGenerator");
						};

						self.g.inputs(self.inputs).call(callback).values();
					},

					"the context gives access to the 'inputs' and 'outputs'": function() {
						var self = this;
						var _inputs;
						var _outputs;

						var callback = function(outputs) {
							_inputs = this.inputs;
							_outputs = this.outputs;
						};

						self.g.inputs(self.inputs).call(callback).values();
						buster.assert.equals(_inputs, self.inputs);
						buster.assert.equals(_outputs, self.outputs);
					},

					"the context gives access to an optional 'timeRange'": {
						"time range configuration omitted": function() {
							var self = this;

							var callback = function(outputs) {
								buster.assert.equals(this.timeRange, undefined);
							};

							self.g.inputs(self.inputs).call(callback).values();
						},

						"time range configuration omitted": function() {
							var self = this;

							var callback = function(outputs) {
								buster.assert.equals(this.timeRange, ds.time.range(self.time.start, new Date((this.inputs.length - 1) * self.time.precision + self.time.start.getTime()), self.time.precision));
							};

							self.g.inputs(self.inputs).time(this.time.start, this.time.precision).call(callback).values();
						}
					},

					"the call argument 'outputs' refers to the current 'outputs'": function() {
						var callback1 = this.spy(function(outputs) { return ds.initialize(1, outputs.length); });
						var callback2 = this.spy(function(outputs) { return ds.initialize(2, outputs.length); });

						var transform = function(y, x, i) {
							return 0;
						};

						this.g.inputs(this.inputs).transform(transform).call(callback1).call(callback2).values();
						buster.assert(callback1.calledWith(ds.initialize(0, this.inputs.length)));
						buster.assert(callback2.calledWith(ds.initialize(1, this.inputs.length)));
					}
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
		}
	});
});
