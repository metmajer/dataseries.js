/**
 * # dataseries.js normalize module
 */
define([
	"require",
	"underscore"
], function(require, _) {
"use strict";

/**
 * Creates a normalized copy of a data series in the range [`lower`, `upper`], where the minimum value
 * of the data series in `values` is mapped to `lower` and the maximum value in `values` is mapped to
 * `upper`. Between `lower` and `upper` the values are scaled linearly.
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
 * var g = ds.generators.f(ds.functions.identity)
 *     .inputs(ds.range(0, 5))
 *     .transform(ds.transforms.point);
 * ds.normalize(g.values(), 0, 1, function(d) { return d.y; });
 * // => [0, 0.2, 0.4, 0.6, 0.8, 1]
 * ```
 *
 * @param  {Array} values The data series to normalize.
 * @param  {Number} [lower=0] The lower limit of the resulting data series.
 * @param  {Number} [upper=1] The upper limit of the resulting data series.
 * @param  {Function()} [accessor] A function which gives access to the value subject to normalization within an element in `values`.
 * @return {Array} Returns a normalized copy of the data series in `values`.
 * @throws {Error} Throws if `values` is  not an array.
 * @throws {Error} Throws if `accessor` is provided and is not a function.
 */
var normalize = function normalize(values, lower, upper, accessor) {
	if (arguments.length < 2) lower = 0;
	if (arguments.length < 3) upper = 1;

	if (!_.isArray(values)) throw new Error("normalize(): values must be an array");
	if (!_.isNumber(lower)) throw new Error("normalize(): lower must be a number")
	if (!_.isNumber(upper)) throw new Error("normalize(): upper must be a number")
	if (!(lower < upper)) throw new Error("normalize(): lower must be < upper");
	if (arguments.length >= 4 && !_.isFunction(accessor)) throw new Error("normalize(): accessor must be a function");

	if (values.length === 0) return [];

	var min = _.min(values, accessor);
	var max = _.max(values, accessor);

	if (accessor !== undefined) {
		min = accessor(min);
		max = accessor(max);
	}

	var range = max - min;
	var normalizedRange = upper - lower;
	var normalizeFactor = normalizedRange / range;
	return _.map(values, function(d) {
		var value = accessor ? accessor(d) : d;
		return range !== 0 ? (value - min) * normalizeFactor + lower : 0;
	});
};

return normalize;

});
