/**
 * # dataseries.js normalize module
 */
define([
	"require",
	"underscore"
], function(require, _) {
"use strict";

/**
 * Normalizes a data series to fit the range [`lower`, `upper`].
 * The minimum value of the series is mapped to `lower` and the maximum value is mapped to `upper`, the values between limits are scaled linearly.
 *
 * ### Examples:
 *
 * ```javascript
 * ds.normalize(ds.range(0, 5));
 * // => [0, 0.2, 0.4, 0.6, 0.8, 1]
 *
 * ds.normalize(ds.range(2, 7));
 * // => [0, 0.2, 0.4, 0.6, 0.8, 1]
 *
 * ds.normalize(ds.range(-2, 3));
 * // => [0, 0.2, 0.4, 0.6, 0.8, 1]
 *
 * ds.normalize([{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}], 0, 1, 'y');
 * // => [{x: 0, y: 0},
 * //     {x: 1, y: 0.5},
 * //     {x: 2, y: 1}]
 * ```
 *
 * @param  {Array} values The data series to normalize.
 * @param  {Number} [lower=0] The lower limit of the resulting data series.
 * @param  {Number} [upper=1] The upper limit of the resulting data series.
 * @param  {Function()} [propertyName] A name of the property subject to normalization within an element in `values`.
 * @return {Array} Returns the normalized data series.
 * @throws {Error} Throws if `values` is not an array.
 * @throws {Error} Throws if `lower` or `upper` is not a number, or if `lower` >= `upper`.
 * @throws {Error} Throws if `propertyName` is provided and is not a string, or if `propertyName` does not exist.
 * @throws {Error} Throws if normalization is attempted on non-numeric data.
 */
var normalize = function normalize(values, lower, upper, propertyName) {
	if (arguments.length < 2) lower = 0;
	if (arguments.length < 3) upper = 1;

	if (!_.isArray(values)) throw new Error("normalize(): values must be an array");
	if (!_.isNumber(lower)) throw new Error("normalize(): lower must be a number")
	if (!_.isNumber(upper)) throw new Error("normalize(): upper must be a number")
	if (!(lower < upper)) throw new Error("normalize(): lower must be < upper");
	if (arguments.length >= 4 && !_.isString(propertyName)) throw new Error("normalize(): propertyName must be a string");

	if (values.length === 0) return [];

	var min = _.min(values, propertyName);
	var max = _.max(values, propertyName);
	if (propertyName !== undefined) {
		min = min[propertyName];
		max = max[propertyName];
	}

	if (min === Infinity) throw new Error("normalize(): unable to determine min/max numbers in values - check propertyName")
	if (!_.isNumber(min)) throw new Error("normalize(): unable to normalize non-numeric data");

	var domain = max - min;
	var range = upper - lower;
	var gain = range / domain;
	for (var i = 0; i < values.length; i++) {
		var value = propertyName !== undefined ? values[i][propertyName] : values[i];
		var normalized = domain !== 0 ? (value - min) * gain + lower : 0;
		propertyName !== undefined ? values[i][propertyName] = normalized : values[i] = normalized;
	}

	return values;
};

return normalize;

});
