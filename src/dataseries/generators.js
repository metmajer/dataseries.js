/**
 * # dataseries.js generators module
 *
 * The `ds.generators` module is a collection of data series generator factories.
 */
define([
	"require",
	"underscore",
	"dataseries/generators/FunctionDataSeriesGenerator",
	"dataseries/functions"
], function(require, _, FunctionDataSeriesGenerator, functions) {
"use strict";

var exports = {};

/**
 * Creates a new `FunctionDataSeriesGenerator`, which initializes data series from
 * the outputs of `algorithm`, a function *y = f(x)*. Any excess arguments provided
 * after `algorithm` will be applied to each invocation of the algorithm on an input
 * value.
 *
 * See the [`ds.functions`](ds.functions.html) module for a list of provided functions
 * and [Wikipedia, List of mathematical functions](http://en.wikipedia.org/wiki/List_of_mathematical_functions)
 * for a comprehensive list of mathematical functions.
 *
 * ### Examples:
 *
 * ```javascript
 * var algorithm = function(x, a, b) { return a * x + b; };
 * ds.generators.f(algorithm, 2, 1); // a = 2, b = 1
 * ```
 *
 * @param  {Function(\*):\*} algorithm A function *y = f(x)*, which maps an input value `x` to an output value *y*. The algorithm may expect additional arguments after `x`.
 * @return {[FunctionDataSeriesGenerator](FunctionDataSeriesGenerator.html)} Returns a new generator instance.
 * @throws {Error} Throws if `algorithm` is not a function.
 */
exports.f = function createFunctionDataSeriesGenerator(algorithm) {
	if (arguments.length === 0) algorithm = functions.identity;

	if (!_.isFunction(algorithm)) throw new Error("f(): algorithm must be a function");

	var algorithmArgs = Array.prototype.slice.call(arguments, 1);
	algorithmArgs.unshift(undefined);

	return new FunctionDataSeriesGenerator(algorithm, algorithmArgs);
};

return exports;

});
