define(["src/dataseries/functions.js", "src/dataseries/generators.js", "src/dataseries/range.js"], function(functions, generators, range) {
	buster.testCase("generators", {
		"f": {
			"'f's 'algorithm' defaults to the identity function f(x) = x": function() {
				var g = generators.f().inputs(range(2));
				buster.assert.equals(g.values(), range(2));
			},

			"'f' returns an instance of type FunctionDataSeriesGenerator": function() {
				var g = generators.f(function() {});
				buster.assert.equals(g.constructor.name, "FunctionDataSeriesGenerator");
			},

			"'f' relays excess arguments to 'algorithm'": function() {
				var f = this.spy(functions.linear);
				var g = generators.f(f, 1, 2);
				g.inputs(range(2)).values();

				buster.assert.equals(f.args[0], [0, 1, 2]);
				buster.assert.equals(f.args[1], [1, 1, 2]);
				buster.assert.equals(f.args[2], [2, 1, 2]);
			},

			"'f' throws if 'algorithm' is not a function": function() {
				buster.refute.exception(function() {
					generators.f(function() {});
				}, "Error");

				buster.assert.exception(function() {
					generators.f(0);
				}, "Error");

				buster.assert.exception(function() {
					generators.f("a");
				}, "Error");

				buster.assert.exception(function() {
					generators.f([]);
				}, "Error");

				buster.assert.exception(function() {
					generators.f({});
				}, "Error");

				buster.assert.exception(function() {
					generators.f(null);
				}, "Error");

				buster.assert.exception(function() {
					generators.f(undefined);
				}, "Error");
			}
		}
	});
});
