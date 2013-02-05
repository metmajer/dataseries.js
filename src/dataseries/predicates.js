/**
 * # dataseries.js predicates module
 *
 * The `ds.predicates` module is a collection of functions which indicate whether a particular predicate (property) holds true for a particular object.
 */
define([
	"require",
	"underscore"
], function(require, _) {
"use strict";

var exports = {};

/**
 * Checks if `object` is a date.
 * @param  {\*} object The object to check.
 * @return {Boolean} Returns `true` if `object` is a date, otherwise returns `false`.
 */
exports.isDate = function isDate(object) {
	return _.isDate(object);
};

/**
 * Checks if `object` is a function.
 * @param  {\*} object The object to check.
 * @param  {Boolean|Number} [length=true] Either a boolean indicating whether the function must expect arguments (`true`), may expect no arguments (`false`), or a number indicating the number of arguments the function must expect.
 * @return {Boolean} Returns `true` if `object` is a function and the `length` condition holds true, otherwise returns `false`.
 */
exports.isFunction = function isDate(object, length) {
	if (length === undefined) length = false;

	return _.isFunction(object) &&
		(length == false || object.length > 0) &&
		(_.isNumber(length) ? object.length == length : true);
};

/**
 * Checks if `object` is a number.
 * @param  {\*} object The object to check.
 * @return {Boolean} Returns `true` if `object` is a number, otherwise returns `false`.
 */
exports.isNumber = function isNumber(object) {
	return _.isNumber(object);
};

/**
 * Checks if `object` is a negative number.
 * @param  {\*} object The object to check.
 * @return {Boolean} Returns `true` if `object` is a number < 0, otherwise returns `false`.
 */
exports.isNegativeNumber = function isNegativeNumber(object) {
	return _.isNumber(object) && object < 0;
};

/**
 * Checks if `object` is a positive number.
 * @param  {\*} object The object to check.
 * @param  {Boolean} [withZero=true] Indicates if zero is a valid positive number or not.
 * @return {Boolean} Returns `true` if `object` is a number >= 0 or > 0, depending on `withZero`, otherwise returns `false`.
 * @throws {Error} Throws if `withZero` is provided and is not a boolean.
 */
exports.isPositiveNumber = function isPositiveNumber(object, withZero) {
	if (arguments.length < 2) withZero = true;
	if (!_.isBoolean(withZero)) throw new Error("isPositiveNumber(): withZero must be a boolean");

	return _.isNumber(object) && (withZero ? object >= 0 : object > 0);
};

/**
 * Checks if `object` is an integer number.
 * @param  {\*} object The object to check.
 * @return {Boolean} Returns `true` if `object` is an integer number, else returns `false`.
 */
exports.isInteger = function isInteger(object) {
	return _.isNumber(object) && parseInt(object, 10) == object;
};

/**
 * Checks if `object` is a negative integer number.
 * @param  {\*} object The object to check.
 * @return {Boolean} Returns `true` if `object` is an integer number < 0, else returns `false`.
 */
exports.isNegativeInteger = function isNegativeInteger(object) {
	return exports.isInteger(object) && object < 0;
};

/**
 * Checks if `object` is a positive integer number.
 * @param  {\*} object The object to check.
 * @param  {Boolean} [withZero=true] Indicates if zero is a valid positive number or not.
 * @return {Boolean} Returns `true` if `object` is an integer number >= 0 or > 0, depending on `withZero`, otherwise returns `false`.
 * @throws {Error} Throws if `withZero` is provided and is not a boolean.
 */
exports.isPositiveInteger = function isPositiveInteger(object, withZero) {
	if (arguments.length < 2) withZero = true;
	if (!_.isBoolean(withZero)) throw new Error("isPositiveInteger(): withZero must be a boolean");

	return exports.isInteger(object) && (withZero ? object >= 0 : object > 0);
};

/**
 * Checks if `object` is an array and `predicate` holds true for all its elements.
 *
 * ### Examples:
 *
 * ```javascript
 * ds.predicates.isArrayOf([0, 1, 2], ds.predicates.isNumber);
 * // => true
 *
 * ds.predicates.isArrayOf([0, 1, 2], ds.predicates.isNegativeNumber);
 * // => false
 *
 * ds.predicates.isArrayOf([], ds.predicates.isNumber);
 * // => false
 *
 * ds.predicates.isArrayOf([], ds.predicates.isNumber, false);
 * // => true
 *
 * ds.predicates.isArrayOf([0, 1, 2], ds.predicates.isPositiveNumber, 3);
 * // => true
 *
 * ds.predicates.isArrayOf([0, 1, 2], ds.predicates.isPositiveNumber, 4);
 * // => false
 * ```
 *
 * @param  {\*} object The object to check.
 * @param  {Function:Boolean} predicate A predicate which is evaluated for each array element.
 * @param  {Boolean|Number} [length=true] Either a boolean indicating whether the array must be non-empty (`true`), may be empty (`false`), or a number indicating the number of elements the array must have.
 * @return {Boolean} Returns `true` if `object` is an array and `predicate` holds true for all its elements, and the `length` condition holds true, otherwise returns `false`.
 * @throws {Error} Throws if `predicate` is not a function.
 */
exports.isArrayOf = function(object, predicate, length) {
	if (!_.isFunction(predicate)) throw new Error("isArrayOf(): predicate must be a function");
	if (length === undefined) length = true;

	return _.isArray(object) &&
		(length == false || object.length > 0) &&
		(_.isNumber(length) ? object.length == length : true) &&
		(_.all(object, function(v) { return predicate(v); }));
};

return exports;

});
