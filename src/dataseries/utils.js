/**
 * # dataseries.js utils module
 *
 * The `ds.utils` module is a collection of algorithms that don't fit anywhere else.
 */
define([
	"require",
	"underscore",
], function(require, _) {
"use strict";

var exports = {};

/**
 * Computes a hash from a string.
 *
 * The method implements the Fowler–Noll–Vo or FNV hash algorithm, designed primarily for hash table and checksum use
 * (non-cryptographic). See [Wikipedia, Fowler–Noll–Vo hash function](http://en.wikipedia.org/wiki/Fowler-Noll-Vo_hash_function)
 * for an explanation of this algorithm and [Which hashing algorithm is best for uniqueness and speed?](http://programmers.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed)
 * for a comprehensive comparison of various hash algorithms.
 *
 * @param  {String} string The string to be hashed.
 * @return {String} Returns the hash as a base36 encoded number.
 */
exports.hash = function FNV1a(string) {
	if (!_.isString(string)) throw new Error("hash(): 'string' must be a string");

	var FNV_OFFSET_BASIS = 0x811c9dc5;
	var FNV_PRIME = 0x1000193;

	var hash = FNV_OFFSET_BASIS;
	for (var i = 0; i < string.length; i++) {
		var charCode = string.charCodeAt(i) & 0xff;
		hash = (hash ^ charCode) * FNV_PRIME;
	}

	return hash.toString(36);
};

/**
 * Computes a hash from the enumerable properties of an object.
 *
 * The method uses the Fowler–Noll–Vo hash algorithm provided by [`ds.utils.hash`](ds.utils.html#hash).
 *
 * ### Examples:
 *
 * ```javascript
 * ds.utils.hashObject({x: 1, y: 2});
 * // => "3hr02ufj2cg"
 *
 * ds.utils.hashObject({x: 2, y: 1});
 * // => "-4jxzz8puql0"
 * ```
 *
 * @param  {Object} object The object to be hashed.
 * @return {String} Returns the hash as a base36 encoded number.
 */
exports.hashObject = function hashObject(object) {
	var OBJECT_MAX_DEPTH = 1e3;

	function collectEntries(object, i) {
		if (i === undefined) i = 0;
		if (i >= OBJECT_MAX_DEPTH) return [];

		if (!_.isObject(object)) throw new Error("hashObject(): 'object' must be an object");

		var entries = [];
		for (var key in object) {
			if (_.isObject(object[key])) {
				entries = entries.concat(collectEntries(object[key], i + 1));
			} else {
				entries.push(key + key.length + object[key] + (object[key].length !== undefined ? object[key].length : ""));
			}
		}

		return entries;
	}

	var entries = _.unique(collectEntries(object));
	return exports.hash(entries.join(","));
};

return exports;

});
