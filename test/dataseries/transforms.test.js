define(["src/dataseries/functions.js", "src/dataseries/generators.js", "src/dataseries/range.js", "src/dataseries/transforms.js"], function(functions, generators, range, transforms) {
	buster.testCase("transforms", {
		setUp: function() {
			this.g = generators.f(functions.identity);
			this.inputs = range(2);
		},

		"'pair' transforms a pair of values 'x' and 'y' into an array [x, y]": function() {
			buster.assert.equals(transforms.pair(1, 0), [0, 1]);
		},

		"'point' transforms a pair of values 'x' and 'y' into an object {x: x, y: y}": function() {
			buster.assert.equals(transforms.point(1, 0), {x: 0, y: 1});
		}
	});
});
