define(["src/dataseries/initialize.js", "src/dataseries/random.js"], function(initialize, random) {
	buster.testCase("random", {
		"rand:": {
			"'rand' returns a random number in the range [lower, upper)": function() {
				var rand = function() { return random.rand(1, 2); };
				var rands = initialize(rand, 1e4);
				buster.assert(_.min(rands) >= 1);
				buster.assert(_.max(rands) < 2);

				rand = function() { return random.rand(-2, -1); };
				var rands = initialize(rand, 1e4);
				buster.assert(_.min(rands) >= -2);
				buster.assert(_.max(rands) < -1);
			},

			"'rand's bounds default to 'lower' = 0 and 'upper' = 1": function() {
				var rands = initialize(random.rand, 1e4);
				buster.assert(_.min(rands) >= 0);
				buster.assert(_.max(rands) < 1);
			},

			"'rand' throws if 'lower' is provided and is not a number": function() {
				buster.refute.exception(function() {
					random.rand(0, 1);
				});

				buster.assert.exception(function() {
					random.rand("a", 1);
				});

				buster.assert.exception(function() {
					random.rand([], 1);
				});

				buster.assert.exception(function() {
					random.rand(function() {}, 1);
				});

				buster.assert.exception(function() {
					random.rand({}, 1);
				});

				buster.assert.exception(function() {
					random.rand(null, 1);
				});

				buster.assert.exception(function() {
					random.rand(undefined, 1);
				});
			},

			"'rand' throws if 'upper' is provided and is not a number": function() {
				buster.refute.exception(function() {
					random.rand(0, 1);
				});

				buster.assert.exception(function() {
					random.rand(0, "a");
				});

				buster.assert.exception(function() {
					random.rand(0, []);
				});

				buster.assert.exception(function() {
					random.rand(0, function() {});
				});

				buster.assert.exception(function() {
					random.rand(0, {});
				});

				buster.assert.exception(function() {
					random.rand(0, null);
				});

				buster.assert.exception(function() {
					random.rand(0, undefined);
				});
			},

			"'rand' throws if 'lower' >= 'upper'": function() {
				buster.refute.exception(function() {
					random.rand(0, 1);
				});

				buster.assert.exception(function() {
					random.rand(1, 1);
				});

				buster.assert.exception(function() {
					random.rand(2, 1);
				});
			}
		}
	});
});
