define(["src/dataseries/range.js"], function(range) {
	buster.testCase("range", {
		"range:": {
			"'range' returns an interval ['start', 'end'] with values equidistantly spaced by 'step'": function() {
				buster.assert.equals(range(0, 2, 1), [0, 1, 2]);
				buster.assert.equals(range(0, 2, 0.5), [0, 0.5, 1, 1.5, 2]);
				buster.assert.equals(range(0.5, 2.8, 0.5), [0.5, 1, 1.5, 2, 2.5]);

				buster.assert.equals(range(0, -2, 1), [0, -1, -2]);
				buster.assert.equals(range(0, -2, 0.5), [0, -0.5, -1, -1.5, -2]);
				buster.assert.equals(range(-0.5, -2.8, 0.5), [-0.5, -1, -1.5, -2, -2.5]);
			},

			"'range' returns an interval [0, end] with values equidistantly spaced by 1 if only a single argument is provided": function() {
				buster.assert.equals(range(2), [0, 1, 2]);
			},

			"'range' returns the empty interval [] if 'start' === 'end'": function() {
				buster.assert.equals(range(0, 0), []);
				buster.assert.equals(range(1, 1), []);
				buster.assert.equals(range(-1, -1), []);
			},

			"'range' returns ['start'] if 'step' is greater than Math.abs('end' - 'start')": function() {
				buster.assert.equals(range(0, 2, 3), [0]);
				buster.assert.equals(range(0, -2, 3), [0]);
			},

			"'range's 'step' defaults to 1": function() {
				buster.assert.equals(range(0, 2), [0, 1, 2]);
				buster.assert.equals(range(0, -2), [0, -1, -2]);
			},

			"'range' throws if 'start' is not a number": function() {
				buster.refute.exception(function() {
					range(0, 2, 1);
				});

				buster.assert.exception(function() {
					range("a", 2, 1);
				});

				buster.assert.exception(function() {
					range([], 2, 1);
				});

				buster.assert.exception(function() {
					range(function() {}, 2, 1);
				});

				buster.assert.exception(function() {
					range({}, 2, 1);
				});

				buster.assert.exception(function() {
					range(null, 2, 1);
				});

				buster.assert.exception(function() {
					range(undefined, 2, 1);
				});
			},

			"'range' throws if 'end' is not a number": function() {
				buster.refute.exception(function() {
					range(0, 2, 1);
				});

				buster.assert.exception(function() {
					range(0, "a", 1);
				});

				buster.assert.exception(function() {
					range(0, [], 1);
				});

				buster.assert.exception(function() {
					range(0, function() {}, 1);
				});

				buster.assert.exception(function() {
					range(0, {}, 1);
				});

				buster.assert.exception(function() {
					range(0, null, 1);
				});

				buster.assert.exception(function() {
					range(0, undefined, 1);
				});
			},

			"'range' throws if 'step' is provided and is not a number > 0": function() {
				buster.refute.exception(function() {
					range(0, 2, 1);
				});

				buster.assert.exception(function() {
					range(0, 2, 0);
				});

				buster.assert.exception(function() {
					range(0, 2, "a");
				});

				buster.assert.exception(function() {
					range(0, 2, []);
				});

				buster.assert.exception(function() {
					range(0, 2, function() {});
				});

				buster.assert.exception(function() {
					range(0, 2, {});
				});

				buster.assert.exception(function() {
					range(0, 2, null);
				});

				buster.assert.exception(function() {
					range(0, 2, undefined);
				});
			}
		}
	});
});
