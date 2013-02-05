/**
 * # dataseries.js initialize module
 */
define([
	"require",
	"underscore",
	"dataseries/predicates"
], function(require, _, predicates) {
"use strict";

/**
 * Initializes a data series from a particular `value`.
 * Each element in the resulting series will be a clone of `value`.
 * If `value` is a function it will be evaluated for each element.
 *
 * ### Examples:
 *
 * ```javascript
 * ds.initialize(0, 3);
 * // => [0, 0, 0]
 *
 * ds.initialize("a", 3);
 * // => ["a", "a", "a"]
 *
 * ds.initialize([1, 2, 3], 3);
 * // => [[1, 2, 3], [1, 2, 3], [1, 2, 3]]
 * ```
 *
 * @param  {\*} value The initialization value.
 * @param  {Number} [length=1] The length of the resulting series (defaults to 1).
 * @return {Array} Returns the initialized data series.
 * @throws {Error} Throws if `length` is defined and is not an integer > 0.
 */
var initialize = function(value, length) {
	if (arguments.length === 1) length = 1;
	if (!(predicates.isPositiveInteger(length, false))) throw new Error("initialize(): length must be an integer number > 0");

	var valueIsFunction = _.isFunction(value);
	var series = new Array(length);

	for (var i = 0; i < length; i++) {
		var v = valueIsFunction ? value() : value;
		series[i] = _.clone(v, true);
	}

	return series;
};

return initialize;

});
