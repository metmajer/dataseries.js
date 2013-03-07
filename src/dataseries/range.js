/**
 * # dataseries.js range module
 */
define([
	"require",
	"underscore",
	"dataseries/predicates"
], function(require, _, predicates) {
"use strict";

/**
 * Creates a numeric range of floats ranging from 'start' to 'end' with values equidistantly spaced by 'step'.
 * Note that, depending on the choice of 'step', the 'end' value is only included in the result if
 * `Math.abs(end - start)` is integer divisible by `step`.
 *
 * ### Examples:
 *
 * ds.range(2);
 * // => [0, 1, 2]
 *
 * ds.range(0, 2);
 * // => [0, 1, 2]
 *
 * ```javascript
 * ds.range(0, 2, 1);
 * // => [0, 1, 2]
 *
 * ds.range(0.5, 2.8, 0.5);
 * // => [0.5, 1, 1.5, 2, 2.5]
 *
 * ds.range(0, -2, 1);
 * // => [0, -1, -2]
 *
 * ds.range(-0.5, -2.8, 0.5);
 * // => [-0.5, -1, -1.5, -2, -2.5]
 * ```
 *
 * @param  {Number} [start=0] The start value of the range.
 * @param  {Number} end The end value of the range (not necessarily included).
 * @param  {Number} [step=1] The step size of the range (> 0).
 * @return {Array<Number>} Returns the created range.
 * @throws {Error} Throws if `start`, `end` or `step` is not a number.
 * @throws {Error} Throws if `step` is <= 0.
 */
var range = function range(start, end, step) {
	if (arguments.length === 1) {
		end = start;
		start = 0;
	}

	if (arguments.length < 3) step = 1;

	if (!_.isNumber(start)) throw new Error("range(): start must be a number");
	if (!_.isNumber(end)) throw new Error("range(): end must be a number");
	if (!(predicates.isPositiveNumber(step, false))) throw new Error("range(): step must be a number > 0");

	if (start === end) return [];

	var series = [];
	var sign = start < end ? 1 : -1;
	var length = (Math.abs((end - start) / step) + 1) >> 0;

	var value = start;
	do {
		series.push(value);
		value += sign * step;
	} while (series.length < length);

	return series;
};

return range;

});
