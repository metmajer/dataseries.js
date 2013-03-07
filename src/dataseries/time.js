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
	var offset =  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() * exports.DAY;

	// correct for daylight savings
	var correction = new Date(date.getTime() + offset).getHours();
	if (correction == 23) correction = -1;

	return offset - correction * exports.HOUR;
};

/**
 * The number of milliseconds in the year of a particular date.
 * @param {Date} date The date.
 * @return {Number} Returns the number of milliseconds in the whole year in `date`.
 * @throws {Error} Throws if `date` is not a date.
 */
exports.YEAR = function(date) {
	if (!_.isDate(date)) throw new Error("YEAR(): 'date' must be a date");
	return new Date(date.getFullYear(), 11, 31) - new Date(date.getFullYear(), 0, 0);
};

/**
 * Creates a range of date objects beginning at 'start' and spaced by 'step'.
 * If 'end' is a date, it will mark the end of the range. Note that, depending on the choice of `step`,
 * the 'end' value is only included in the reuslt if `Math.abs(end - start)` is integer divisible by `step`,
 * assuming that `step` is a constant. If 'end' is an integer number > 0, it determines the length of the result.
 *
 * ### Examples:
 *
 * ```javascript
 * ds.time.range(new Date(2013, 0, 1), new Date(2013, 0, 3));
 * // => [new Date(2013, 0, 1),
 * //     new Date(2013, 0, 2),
 * //     new Date(2013, 0, 3)]
 *
 * ds.time.range(new Date(2013, 0, 1), new Date(2013, 2, 1), ds.time.MONTH);
 * // => [new Date(2013, 0, 1),
 * //     new Date(2013, 1, 1),
 * //     new Date(2013, 2, 1)]
 *
 * ds.time.range(new Date(2013, 0, 1), new Date(2015, 0, 1), ds.time.YEAR);
 * // => [new Date(2013, 0, 1),
 * //     new Date(2014, 0, 1),
 * //     new Date(2015, 0, 1)]
 * ```
 *
 * @param  {Date} start The start date of the range.
 * @param  {Date|Number} end The end date of the range or an integer (> 0) determing the length of the resulting range.
 * @param  {Function(Date):Number|Number} [step=ds.time.DAY] The step size of the range (in milliseconds): either a function returning an appropriate step size or a number (> 0).
 * @return {Array<Date>} Returns the created range.
 * @throws {Error} Throws if `start` is not a date.
 * @throws {Error} Throws if `end` is a date and `start` >= `end`.
 * @throws {Error} Throws if `end` is not a date or is not an integer > 0.
 * @throws {Error} Throws if `step` is not a function or is not a number > 0.
 */
exports.range = function range(start, end, step) {
	if (arguments.length < 3) step = exports.DAY;

	if (!_.isDate(start)) throw new Error("range(): start must be a date");
	if (_.isDate(end) && start >= end) throw new Error("range(): start must be < end");
	if (!(_.isDate(end) || predicates.isPositiveInteger(end, false))) throw new Error("range(): end must be a date or an integer > 0");
	if (!(_.isFunction(step) || predicates.isPositiveNumber(step, false))) throw new Error("range(): step must be a function or a number > 0");

	var isEndDate = _.isDate(end);
	var isStepFunction = _.isFunction(step);

	var series = [];

	var value = start;
	var i = isEndDate ? value : 1;
	while (i <= end) {
		series.push(value);
		value = new Date(value.getTime() + (isStepFunction ? step(value) : step));
		i = isEndDate ? value : i + 1;
	}

	return series;
};

return exports;

});
