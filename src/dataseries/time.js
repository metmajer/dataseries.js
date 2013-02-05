/**
 * # dataseries.js time module
 *
 * The `ds.time` module is a collection of objects related to time.
 */
define([
	"require",
	"underscore",
	"dataseries/predicates"
], function(require, _, predicates) {
"use strict";

var exports = {};

/**
 * The number of milliseconds in a second.
 * @constant
 * @type {Number}
 */
exports.SECOND = 1e3;

/**
 * The number of milliseconds in a minute.
 * @constant
 * @type {Number}
 */
exports.MINUTE = 6e4;

/**
 * The number of milliseconds in an hour.
 * @constant
 * @type {Number}
 */
exports.HOUR = 36e5;

/**
 * The number of milliseconds in a day.
 * @constant
 * @type {Number}
 */
exports.DAY = 864e5;

/**
 * The number of milliseconds in a week.
 * @constant
 * @type {Number}
 */
exports.WEEK = 6048e5;

/**
 * The number of milliseconds in the whole month of a particular date.
 * @param {Date} date The date.
 * @return {Number} Returns the number of milliseconds in the whole month in `date`.
 * @throws {Error} Throws if `date` is not a date.
 */
exports.MONTH = function(date) {
	if (!_.isDate(date)) throw new Error("MONTH(): 'date' must be a date");
	return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate() * exports.DAY;
};

/**
 * The number of milliseconds in the year of a particular date.
 * @param {Date} date The date.
 * @return {Number} Returns the number of milliseconds in the whole year in `date`.
 * @throws {Error} Throws if `date` is not a date.
 */
exports.YEAR = function(date) {
	if (!_.isDate(date)) throw new Error("YEAR(): 'date' must be a date");
	return new Date(Date.UTC(date.getUTCFullYear(), 11, 31)) - new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
};

/**
 * Initializes a time range from the interval [`start`, `end`] with values equidistantly spaced by `step`.
 * The resulting time range will include the `end` value if `Math.abs(end - start)` is integer divisible by `step`.
 *
 * ### Examples:
 *
 * ```javascript
 * ds.time.range(new Date(Date.UTC(2013, 0, 1)), new Date(Date.UTC(2013, 0, 3)));
 * // => [new Date(Date.UTC(2013, 0, 1)),
 * //     new Date(Date.UTC(2013, 0, 2)),
 * //     new Date(Date.UTC(2013, 0, 3))]
 *
 * ds.time.range(new Date(Date.UTC(2013, 0, 1)), new Date(Date.UTC(2013, 2, 1)), ds.date.MONTH);
 * // => [new Date(Date.UTC(2013, 0, 1)),
 * //     new Date(Date.UTC(2013, 1, 1)),
 * //     new Date(Date.UTC(2013, 2, 1))]
 *
 * ds.time.range(new Date(Date.UTC(2013, 0, 1)), new Date(Date.UTC(2015, 0, 1)), ds.date.YEAR);
 * // => [new Date(Date.UTC(2013, 0, 1)),
 * //     new Date(Date.UTC(2014, 0, 1)),
 * //     new Date(Date.UTC(2015, 0, 1))]
 * ```
 *
 * @param  {Date} start The start value of the interval.
 * @param  {Date} end The end value of the interval.
 * @param  {Function(Date):Number|Number} [step=ds.time.DAY] The step size of the interval (in milliseconds): either a function returning an appropriate step size or a number (> 0).
 * @return {Array<Date>} Returns the initialized time range.
 * @throws {Error} Throws if `start` or `end` is not a date.
 * @throws {Error} Throws if `start` >= `end`.
 * @throws {Error} Throws if `step` is not a function or is not a number > 0.
 */
exports.range = function range(start, end, step) {
	if (arguments.length < 3) step = exports.DAY;

	if (!_.isDate(start)) throw new Error("range(): start must be a date");
	if (!_.isDate(end)) throw new Error("range(): end must be a date");
	if (!(start < end)) throw new Error("range(): start must be < end");
	if (!(_.isFunction(step) || predicates.isPositiveNumber(step, false))) throw new Error("range(): step must be a function or a number > 0");

	function stepSize(value) {
		return _.isFunction(step) ? step(value) : step;
	}

	var series = [];

	var value = start;
	do {
		series.push(value);
		value = new Date(value.getTime() + stepSize(value));
	} while (value <= end);

	return series;
};

return exports;

});
