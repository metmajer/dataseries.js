define(["src/dataseries/normalize.js", "src/dataseries/range.js"], function(normalize, range) {
	buster.testCase("normalize", {
		"setUp": function() {
			this.series = range(0, 5);
		},

		"normalize": {
			"'normalize' returns a normalized copy of a data series in 'values' in the range ['lower', 'upper']": function() {
				buster.assert.equals(arrayToNumberFixed(normalize(this.series,  0, 1), 1), [0, 0.2, 0.4, 0.6, 0.8, 1]);
				buster.assert.equals(arrayToNumberFixed(normalize(range( 2, 7), 0, 1), 1), [0, 0.2, 0.4, 0.6, 0.8, 1]);
				buster.assert.equals(arrayToNumberFixed(normalize(range(-2, 3), 0, 1), 1), [0, 0.2, 0.4, 0.6, 0.8, 1]);

				buster.assert.equals(normalize(this.series,  3, 6), [3, 3.6, 4.2, 4.8, 5.4, 6]);
				buster.assert.equals(normalize(range( 2, 7), 3, 6), [3, 3.6, 4.2, 4.8, 5.4, 6]);
				buster.assert.equals(normalize(range(-2, 3), 3, 6), [3, 3.6, 4.2, 4.8, 5.4, 6]);

				buster.assert.equals(normalize(this.series,  -6, -3), [-6, -5.4, -4.8, -4.2, -3.6, -3]);
				buster.assert.equals(normalize(range( 2, 7), -6, -3), [-6, -5.4, -4.8, -4.2, -3.6, -3]);
				buster.assert.equals(normalize(range(-2, 3), -6, -3), [-6, -5.4, -4.8, -4.2, -3.6, -3]);
			},

			"'normalize's limits default to 'lower' = 0 and 'upper' = 1": function() {
				buster.assert.equals(arrayToNumberFixed(normalize(this.series),  1), [0, 0.2, 0.4, 0.6, 0.8, 1]);
				buster.assert.equals(arrayToNumberFixed(normalize(range( 2, 7)), 1), [0, 0.2, 0.4, 0.6, 0.8, 1]);
				buster.assert.equals(arrayToNumberFixed(normalize(range(-2, 3)), 1), [0, 0.2, 0.4, 0.6, 0.8, 1]);
			},

			"'normalize' returns an array of all 0's if the minimum and maximum value in 'values' are equal": function() {
				buster.assert.equals(normalize([0, 0, 0]), [0, 0, 0]);
				buster.assert.equals(normalize([1, 1, 1]), [0, 0, 0]);
			},

			"'normalize' returns [] if values is empty": function() {
				buster.assert.equals(normalize([]), []);
			},

			"'normalize's 'accessor' gives access to the value subject to normalization in the current data series element": function() {
				var series = _.map(this.series, function(d) { return { value: d }; });
				var accessor = function(d) { return d.value; };

				buster.assert.equals(arrayToNumberFixed(normalize(series, 0, 1, accessor), 1), [0, 0.2, 0.4, 0.6, 0.8, 1]);
			},

			"'normalize's 'accessor' gives access to the current data series element per default": function() {
				buster.assert.equals(arrayToNumberFixed(normalize(this.series),  1), [0, 0.2, 0.4, 0.6, 0.8, 1]);
				buster.assert.equals(arrayToNumberFixed(normalize(range( 2, 7)), 1), [0, 0.2, 0.4, 0.6, 0.8, 1]);
				buster.assert.equals(arrayToNumberFixed(normalize(range(-2, 3)), 1), [0, 0.2, 0.4, 0.6, 0.8, 1]);
			},

			"'normalize' throws if 'values' is not an array": function() {
				var self = this;

				buster.refute.exception(function() {
					normalize([], 0, 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize(0, 0, 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize("a", 0, 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize(function() {}, 0, 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize({}, 0, 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize(null, 0, 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize(undefined, 0, 1, function() {});
				}, "Error");
			},

			"'normalize' throws if 'lower' is provided and is not a number": function() {
				var self = this;

				buster.refute.exception(function() {
					normalize([], 0, 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], "a", 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], [], 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], function() {}, 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], {}, 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], null, 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], undefined, 1, function() {});
				}, "Error");
			},

			"'normalize' throws if 'upper' is provided and is not a number": function() {
				var self = this;

				buster.refute.exception(function() {
					normalize([], 0, 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], 0, "a", function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], 0, [], function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], 0, function() {}, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], 0, {}, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], 0, null, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], 0, undefined, function() {});
				}, "Error");
			},

			"'normalize' throws if 'lower' >= 'upper'": function() {
				buster.refute.exception(function() {
					normalize([], 0, 1);
				});

				buster.assert.exception(function() {
					normalize([], 1, 1);
				});

				buster.assert.exception(function() {
					normalize([], 2, 1);
				});
			},

			"'normalize' throws if 'accessor' is provided and is not a function": function() {
				var self = this;

				buster.refute.exception(function() {
					normalize(self.series, 0, 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.series, 0, 1, 0);
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.series, 0, 1, "a");
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.series, 0, 1, []);
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.series, 0, 1, {});
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.series, 0, 1, null);
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.series, 0, 1, undefined);
				}, "Error");
			}
		}
	});
});
