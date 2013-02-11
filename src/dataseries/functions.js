/**
 * # dataseries.js functions module
 *
 * The `ds.functions` module is a collection of functions *y = f(x)*, which map an input value `x` to an output value *y*.
 */
define([
	"require",
	"underscore",
	"dataseries/predicates"
], function(require, _, predicates) {
"use strict";

var exports = {};

/**
 * Computes the output of the identity function *f(x) = x* for a particular `x`.
 * @param  {\*} x The input value.
 * @return {\*} Returns the output value.
 */
exports.identity = function identity(x) {
	return x;
};

/**
 * Computes the output of the polynomial function *f(x) = a[n] · x<sup>n</sup> + a[n-1] · x<sup>n-1</sup> + ... + a[1] · x + a[0]* with coefficients *a[n]* for a particular `x`.
 *
 * ### Examples:
 *
 * ```javascript
 * ds.functions.polynomial(2, { a: [1, 2] });
 * // f(x) = 2·x + 1 for x = 2 => 5
 *
 * ds.functions.polynomial(2, { a: [1, 2, 3] });
 * // f(x) = 3·x² + 2·x + 1 for x = 2 => 17
 *
 * ds.functions.polynomial(2, { a: [1, 2, 3, 4] });
 * // f(x) = 4·x³ + 3·x² + 2·x + 1 for x = 2 => 49
 * ```
 *
 * @param  {Number} x The input value.
 * @param  {Array<Number>} [a=[]] The coefficients of the polynomial function. An array of length *n* will produce a polynomial of degree *n-1*, an empty array will result in an output value of 0.
 * @return {Number} Returns the output value.
 * @throws {Error} Throws if `x` is not a number.
 * @throws {Error} Throws if `a` is not a (possibly empty) array of numbers.
 */
exports.polynomial = function polynomial(x, a) {
	var args = _.defaults(_.isPlainObject(a) ? a : { a: a }, { a: [] });

	if (!_.isNumber(x)) throw new Error("polynomial(): x must be a number");
	if (!predicates.isArrayOf(args.a, _.isNumber, false)) throw new Error("polynomial(): a must be an array of numbers or an empty array");

	var result = 0;

	var degree = args.a.length - 1;
	for (var i = 0; i <= degree; i++) {
		result += args.a[i] * Math.pow(x, i);
	}

	return result;
};

/**
 * Computes the output of the linear function *f(x) = a · x + b* for a particular `x`.
 *
 * ### Examples:
 *
 * ```javascript
 * ds.functions.linear(2);
 * // f(x) = x for x = 2 => 2
 *
 * ds.functions.linear(2, { a: 2, b: 1 });
 * // f(x) = 2·x + 1 for x = 2 => 5
 * ```
 *
 * @param  {Number} x The input value.
 * @param  {Number} [a=1]
 * @param  {Number} [b=0]
 * @return {Number} Returns the output value.
 * @throws {Error} Throws if `x` is not a number.
 */
exports.linear = function linear(x, a, b) {
	var args = _.defaults(_.isPlainObject(a) ? a : { a: a, b: b }, { a: 1, b: 0 });
	return exports.polynomial(x, [args.b, args.a]);
};

/**
 * Computes the output of the square function *f(x) = a · x<sup>2</sup> + b · x + c* for a particular `x`.
 *
 * ### Examples:
 *
 * ```javascript
 * ds.functions.square(2);
 * // f(x) = x² for x = 2 => 4
 *
 * ds.functions.square(2, { a: 3, b: 2, c: 1 });
 * // f(x) = 3·x² + 2·x + 1 for x = 2 => 17
 * ```
 *
 * @param  {Number} x The input value.
 * @param  {Number} [a=1]
 * @param  {Number} [b=0]
 * @param  {Number} [c=0]
 * @return {Number} Returns the output value.
 * @throws {Error} Throws if `x` is not a number.
 */
exports.square = function square(x, a, b, c) {
	var args = _.defaults(_.isPlainObject(a) ? a : { a: a, b: b, c: c }, { a: 1, b: 0, c: 0 });
	return exports.polynomial(x, [args.c, args.b, args.a]);
};

/**
 * Computes the output of the cubic function *f(x) = a · x<sup>3</sup> + b · x<sup>2</sup> + c · x + d* for a particular `x`.
 *
 * ### Examples:
 *
 * ```javascript
 * ds.functions.cubic(2);
 * // f(x) = x³ for x = 2 => 8
 *
 * ds.functions.cubic(2, { a: 4, b: 3, c: 2, d: 1 });
 * // f(x) = 4·x³ + 3·x² + 2·x + 1 for x = 2 => 49
 * ```
 *
 * @param  {Number} x The input value.
 * @param  {Number} [a=1]
 * @param  {Number} [b=0]
 * @param  {Number} [c=0]
 * @param  {Number} [d=0]
 * @return {Number} Returns the output value.
 * @throws {Error} Throws if `x` is not a number.
 */
exports.cubic = function cubic(x, a, b, c, d) {
	var args = _.defaults(_.isPlainObject(a) ? a : { a: a, b: b, c: c, d: d }, { a: 1, b: 0, c: 0, d: 0 });
	return exports.polynomial(x, [args.d, args.c, args.b, args.a]);
};

/**
 * Computes the output of the exponential function *f(x, a, b, c, d) = c · a<sup>b · x</sup> + d* for a particular `x`.
 *
 * ### Examples:
 *
 * ```javascript
 * ds.functions.exp(2);
 * // f(x) = e²
 *
 * ds.functions.exp(2, { a: Math.E, b: 2, c: 10 });
 * // f(x) = 10·e⁴
 *
 * ds.functions.exp(2, { a: 2, b: 3, c: 10, d: 4 });
 * // f(x) = 10·2⁶ + 4
 * ```
 *
 * @param {Number} x The input value.
 * @param {Number} [a=Math.E] The base.
 * @param {Number} [b=1]
 * @param {Number} [c=1]
 * @param {Number} [d=0]
 * @return {Number} Returns the output value.
 * @throws {Error} Throws if `x` is not a number.
 * @throws {Error} Throws if `a` is not a number.
 * @throws {Error} Throws if `b` is not a number.
 * @throws {Error} Throws if `c` is not a number.
 * @throws {Error} Throws if `d` is not a number.
 */
exports.exp = function(x, a, b, c, d) {
	var args = _.defaults(_.isPlainObject(a) ? a : { a: a, b: b, c: c, d: d }, { a: Math.E, b: 1, c: 1, d: 0 });

	if (!_.isNumber(x)) throw new Error("exp(): x must be a number");
	if (!_.isNumber(args.a)) throw new Error("exp(): a must be a number");
	if (!_.isNumber(args.b)) throw new Error("exp(): b must be a number");
	if (!_.isNumber(args.c)) throw new Error("exp(): c must be a number");
	if (!_.isNumber(args.d)) throw new Error("exp(): d must be a number");

	return args.c * Math.pow(args.a, args.b * x) + args.d;
};

/**
 * Computes the output of the logarithmic function *f(x, a, b, c) = b · log<sub>a</sub>(x) + c* for a particular `x`.
 *
 * ### Examples:
 *
 * ```javascript
 * ds.functions.log(2);
 * // f(x) = logₑ(2)
 *
 * ds.functions.log(4, { a: 2 });
 * // f(x) = log₂(4)
 *
 * ds.functions.log(4, { a: 2, b: 10, c: 8 });
 * // f(x) = 10·log₂(4) + 8
 * ```
 *
 * @param {Number} x The input value.
 * @param {Number} [a=Math.E] The base (>= 0).
 * @param {Number} [b=1]
 * @param {Number} [c=0]
 * @return {Number} Returns the output value.
 * @throws {Error} Throws if `x` is not a number.
 * @throws {Error} Throws if `a` is not a number >= 0.
 * @throws {Error} Throws if `b` is not a number.
 * @throws {Error} Throws if `c` is not a number.
 */
exports.log = function(x, a, b, c) {
	var args = _.defaults(_.isPlainObject(a) ? a : { a: a, b: b, c: c }, { a: Math.E, b: 1, c: 0 });

	if (!_.isNumber(x)) throw new Error("log(): x must be a number");
	if (!predicates.isPositiveNumber(args.a)) throw new Error("log(): a must be a number >= 0");
	if (!_.isNumber(args.b)) throw new Error("log(): b must be a number");
	if (!_.isNumber(args.c)) throw new Error("log(): c must be a number");

	return args.b * Math.log(x) / Math.log(args.a) + args.c;
};

/**
 * Computes the output of the sine function *f(x, a, f, φ, b) = a · sin(2 · π · f · x + φ) + b* for a particular `x`.
 *
 * ### Examples:
 *
 * ```javascript
 * ds.functions.sin(0);
 * // f(x) = sin(0)
 *
 * ds.functions.sin(0.25);
 * // f(x) = sin(π/2)
 *
 * ds.functions.sin(0.5, { a: 10, f: 2, φ: Math.PI / 2, b: 1 });
 * // f(x) = 10·sin(2.5·π) + 1
 * ```
 *
 * @param {Number} x The input value.
 * @param {Number} [a=1] The amplitude.
 * @param {Number} [f=1] The frequency (in Hz) (>= 0).
 * @param {Number} [φ=0] The phase shift.
 * @param {Number} [b=0]
 * @return {Number} Returns the output value.
 * @throws {Error} Throws if `x` is not a number.
 * @throws {Error} Throws if `a` is not a number.
 * @throws {Error} Throws if `f` is not a number >= 0.
 * @throws {Error} Throws if `φ` is not a number.
 * @throws {Error} Throws if `b` is not a number.
 */
exports.sin = function(x, a, f, φ, b) {
	var args = _.defaults(_.isPlainObject(a) ? a : { a: a, f: f, φ: φ, b: b }, { a: 1, f: 1, φ: 0, b: 0 });

	if (!_.isNumber(x)) throw new Error("sin(): x must be a number");
	if (!_.isNumber(args.a)) throw new Error("sin(): a must be a number");
	if (!predicates.isPositiveNumber(args.f)) throw new Error("sin(): f must be a number >= 0");
	if (!_.isNumber(args.φ)) throw new Error("sin(): φ must be a number");
	if (!_.isNumber(args.b)) throw new Error("sin(): b must be a number");

	return args.a * Math.sin(6.283185307179586 * args.f * x + args.φ) + args.b;
};

/**
 * Computes the output of the cosine function *f(x, a, f, φ, b) = a · cos(2 · π · f · x + φ) + b* for a particular `x`.
 *
 * ### Examples:
 *
 * ```javascript
 * ds.functions.cos(0);
 * // f(x) = cos(0)
 *
 * ds.functions.cos(0.25);
 * // f(x) = cos(π/2)
 *
 * ds.functions.cos(0.5, { a: 10, f: 2, φ: Math.PI / 2, b: 1 });
 * // f(x) = 10·cos(2.5·π) + 1
 * ```
 *
 * @param {Number} x The input value.
 * @param {Number} [a=1] The amplitude.
 * @param {Number} [f=1] The frequency (in Hz) (>= 0).
 * @param {Number} [φ=0] The phase shift.
 * @param {Number} [b=0]
 * @return {Number} Returns the output value.
 * @throws {Error} Throws if `x` is not a number.
 * @throws {Error} Throws if `a` is not a number.
 * @throws {Error} Throws if `f` is not a number >= 0.
 * @throws {Error} Throws if `φ` is not a number.
 * @throws {Error} Throws if `b` is not a number.
 */
exports.cos = function(x, a, f, φ, b) {
	var args = _.defaults(_.isPlainObject(a) ? a : { a: a, f: f, φ: φ, b: b }, { a: 1, f: 1, φ: 0, b: 0 });

	if (!_.isNumber(x)) throw new Error("cos(): x must be a number");
	if (!_.isNumber(args.a)) throw new Error("cos(): a must be a number");
	if (!predicates.isPositiveNumber(args.f)) throw new Error("cos(): f must be a number >= 0");
	if (!_.isNumber(args.φ)) throw new Error("cos(): φ must be a number");
	if (!_.isNumber(args.b)) throw new Error("cos(): b must be a number");

	return args.a * Math.cos(6.283185307179586 * args.f * x + args.φ) + args.b;
};

return exports;

});
