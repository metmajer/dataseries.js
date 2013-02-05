define(["src/dataseries/initialize.js"], function(initialize) {
	buster.testCase("initialize", {
		"initialize:": {
			"'initialize' returns a series initialized to a particular value": function() {
				buster.assert.equals(initialize(0, 3), [0, 0, 0]);
				buster.assert.equals(initialize("a", 3), ["a", "a", "a"]);
				buster.assert.equals(initialize({"a": 0}, 3), [{"a": 0}, {"a": 0}, {"a": 0}]);
				buster.assert.equals(initialize([1, 2, 3], 3), [[1, 2, 3], [1, 2, 3], [1, 2, 3]]);

				var data = [0, 1, 2];
				buster.assert.equals(initialize(function() { return data.shift(); }, 3), [0, 1, 2]);
			},

			"'initialize' returns a series initialized to clones of 'value'": function() {
				var data = { a: 0, b: 0 };
				var series = initialize(data, 3);

				data.a = 1;
				data.b = 2;

				for (var i = 0; i < 3; i++) {
					buster.assert.equals(series[i].a, 0);
					buster.assert.equals(series[i].b, 0);
				}
			},

			"'initialize' returns a series of length 1 if 'length' is undefined": function() {
				buster.assert.equals(initialize(0), [0]);
				buster.assert.equals(initialize("a"), ["a"]);
				buster.assert.equals(initialize({"a": 0}), [{"a": 0}]);
				buster.assert.equals(initialize([1, 2, 3]), [[1, 2, 3]]);

				var data = [0, 1, 2];
				buster.assert.equals(initialize(function() { return data.shift(); }), [0]);
			},

			"'initialize' throws if 'length' is provided and is not an integer number > 0": function() {
				buster.refute.exception(function() {
					initialize(0, 1);
				});

				buster.assert.exception(function() {
					initialize(0, 0);
				});

				buster.assert.exception(function() {
					initialize(0, "a");
				});

				buster.assert.exception(function() {
					initialize(0, []);
				});

				buster.assert.exception(function() {
					initialize(0, function() {});
				});

				buster.assert.exception(function() {
					initialize(0, {});
				});

				buster.assert.exception(function() {
					initialize(0, null);
				});

				buster.assert.exception(function() {
					initialize(0, undefined);
				});
			}
		}
	});
});
