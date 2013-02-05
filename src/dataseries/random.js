/**
 * # dataseries.js random module
 *
 * The `ds.random` module is a collection of random number generators.
 */
define([
	"require",
	"underscore"
], function(require, _) {
"use strict";

var exports = {};

/** Generates a random number in the range [lower, upper).
 * @param  {Number} [lower=0] The lower limit of the random number.
 * @param  {Number} [upper=1] The upper limit of the random number (will not be included in the result).
 * @return {Number} Returns the generated float random number.
 * @throws {Error} Throws if `lower` is not a number.
 * @throws {Error} Throws if `upper` is not a number.
 * @throws {Error} Throws if `lower` is >= `upper`.
 */
exports.rand = function rand(lower, upper) {
	if (arguments.length < 1) lower = 0;
	if (arguments.length < 2) upper = 1;

	if (!_.isNumber(lower)) throw new Error("rand(): lower must be a number");
	if (!_.isNumber(upper)) throw new Error("rand(): upper must be a number");
	if (!(lower < upper)) throw new Error("rand(): lower must be < upper");

	return (upper - lower)  * Math.random() + lower;
};

return exports;

});
