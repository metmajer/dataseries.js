define(["src/dataseries/normalize.js", "src/dataseries/range.js"], function(normalize, range) {
	buster.testCase("normalize", {
		"setUp": function() {
			this.series = range(0, 5);
			this.multivariateSeries = _.map(this.series, function(d, i) { return { x: d, y: d }; });
		},

		"normalize": {
			"'normalize' returns a normalized variant of a data series in 'values' in the range ['lower', 'upper']": function() {
				buster.assert.equals(arrayToNumberFixed(normalize(this.series,  0, 1), 1), [0, 0.2, 0.4, 0.6, 0.8, 1]);
				buster.assert.equals(arrayToNumberFixed(normalize(range( 2, 7), 0, 1), 1), [0, 0.2, 0.4, 0.6, 0.8, 1]);
				buster.assert.equals(arrayToNumberFixed(normalize(range(-2, 3), 0, 1), 1), [0, 0.2, 0.4, 0.6, 0.8, 1]);

				buster.assert.equals(arrayToNumberFixed(normalize(this.series,  3, 6), 1), [3, 3.6, 4.2, 4.8, 5.4, 6]);
				buster.assert.equals(normalize(range( 2, 7), 3, 6), [3, 3.6, 4.2, 4.8, 5.4, 6]);
				buster.assert.equals(normalize(range(-2, 3), 3, 6), [3, 3.6, 4.2, 4.8, 5.4, 6]);

				buster.assert.equals(arrayToNumberFixed(normalize(this.series,  -6, -3), 1), [-6, -5.4, -4.8, -4.2, -3.6, -3]);
				buster.assert.equals(normalize(range( 2, 7), -6, -3), [-6, -5.4, -4.8, -4.2, -3.6, -3]);
				buster.assert.equals(normalize(range(-2, 3), -6, -3), [-6, -5.4, -4.8, -4.2, -3.6, -3]);
			},

			"'normalized' replaces the elements in 'values' with their normalized variants": function() {
				buster.assert.equals(normalize(this.series,  0,  1), this.series);
				buster.assert.equals(normalize(this.series,  3,  6), this.series);
				buster.assert.equals(normalize(this.series, -6, -3), this.series);
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

			"'normalize's 'propertyName' gives access to the property subject to normalization within the current element in the data series": function() {
				var normalizedSeries = normalize(this.multivariateSeries, 0, 1, "y");
				buster.assert.equals(arrayToNumberFixed(normalizedSeries, 1, "y"), [
					{ x: 0, y: 0 },
					{ x: 1, y: 0.2 },
					{ x: 2, y: 0.4 },
					{ x: 3, y: 0.6 },
					{ x: 4, y: 0.8 },
					{ x: 5, y: 1 }
				]);
			},

			"'normalize's 'propertyName' gives access to the current element in the data series per default": function() {
				buster.assert.equals(arrayToNumberFixed(normalize(this.series),  1), [0, 0.2, 0.4, 0.6, 0.8, 1]);
				buster.assert.equals(arrayToNumberFixed(normalize(range( 2, 7)), 1), [0, 0.2, 0.4, 0.6, 0.8, 1]);
				buster.assert.equals(arrayToNumberFixed(normalize(range(-2, 3)), 1), [0, 0.2, 0.4, 0.6, 0.8, 1]);
			},

			"'normalize' throws if 'values' is not an array": function() {
				var self = this;

				buster.refute.exception(function() {
					normalize([]);
				}, "Error");

				buster.assert.exception(function() {
					normalize(0);
				}, "Error");

				buster.assert.exception(function() {
					normalize("a");
				}, "Error");

				buster.assert.exception(function() {
					normalize(function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize({});
				}, "Error");

				buster.assert.exception(function() {
					normalize(null);
				}, "Error");

				buster.assert.exception(function() {
					normalize(undefined);
				}, "Error");
			},

			"'normalize' throws if 'lower' is provided and is not a number": function() {
				var self = this;

				buster.refute.exception(function() {
					normalize([], 0);
				}, "Error");

				buster.assert.exception(function() {
					normalize([], "a");
				}, "Error");

				buster.assert.exception(function() {
					normalize([], []);
				}, "Error");

				buster.assert.exception(function() {
					normalize([], function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], null);
				}, "Error");

				buster.assert.exception(function() {
					normalize([], undefined);
				}, "Error");
			},

			"'normalize' throws if 'upper' is provided and is not a number": function() {
				var self = this;

				buster.refute.exception(function() {
					normalize([], 0, 1);
				}, "Error");

				buster.assert.exception(function() {
					normalize([], 0, "a");
				}, "Error");

				buster.assert.exception(function() {
					normalize([], 0, []);
				}, "Error");

				buster.assert.exception(function() {
					normalize([], 0, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], 0, {});
				}, "Error");

				buster.assert.exception(function() {
					normalize([], 0, null);
				}, "Error");

				buster.assert.exception(function() {
					normalize([], 0, undefined);
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

			"'normalize' throws if 'propertyName' is provided and is not a string": function() {
				var self = this;

				buster.refute.exception(function() {
					normalize(self.multivariateSeries, 0, 1, "y");
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.multivariateSeries, 0, 1, 0);
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.multivariateSeries, 0, 1, []);
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.multivariateSeries, 0, 1, function() {});
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.multivariateSeries, 0, 1, {});
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.multivariateSeries, 0, 1, null);
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.multivariateSeries, 0, 1, undefined);
				}, "Error");
			},

			"'normalize' throws if 'values' is an array of basic data types and 'propertyName' is provided": function() {
				var self = this;

				buster.refute.exception(function() {
					normalize(self.series, 0, 1);
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.series, 0, 1, "_");
				}, "Error");
			},

			"'normalize' throws if 'values' is an array of a non-numeric data type": function() {
				var self = this;

				buster.refute.exception(function() {
					normalize(self.series, 0, 1);
				}, "Error");

				buster.assert.exception(function() {
					normalize(["a", "b", "c"], 0, 1);
				}, "Error");
			},

			"'normalize' throws if 'values' is an array of objects and 'propertyName' is provided but does not refer to an existing property": function() {
				var self = this;

				buster.refute.exception(function() {
					normalize(self.multivariateSeries, 0, 1, "y");
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.multivariateSeries, 0, 1, "_");
				}, "Error");
			},

			"'normalize' throws if 'values' is an array of objects and 'propertyName' is provided but does not refer to a numeric type": function() {
				var self = this;

				_.each(self.multivariateSeries, function(d) { d.name = d.x.toString(); });

				buster.refute.exception(function() {
					normalize(self.multivariateSeries, 0, 1, "y");
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.multivariateSeries, 0, 1, "name");
				}, "Error");
			},

			"'normalize' throws if 'values' is an array of objects and 'propertyName' is omitted": function() {
				var self = this;

				buster.refute.exception(function() {
					normalize(self.multivariateSeries, 0, 1, "y");
				}, "Error");

				buster.assert.exception(function() {
					normalize(self.multivariateSeries, 0, 1);
				}, "Error");
			}
		}
	});
});
