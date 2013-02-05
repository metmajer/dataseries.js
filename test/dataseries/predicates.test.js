define(["src/dataseries/predicates.js"], function(predicates) {
	buster.testCase("predicates:", {
		"'isDate' returns true if 'object' is a date": function() {
			buster.assert(predicates.isDate(new Date()));

			buster.refute(predicates.isDate(+new Date()));
			buster.refute(predicates.isDate(0));
			buster.refute(predicates.isDate("a"));
			buster.refute(predicates.isDate([]));
			buster.refute(predicates.isDate({}));
			buster.refute(predicates.isDate(null));
			buster.refute(predicates.isDate(undefined));
		},

		"isFunction": {
			"'isFunction' return true if 'object' is a function": function() {
				buster.assert(predicates.isFunction(function() {}));

				buster.refute(predicates.isFunction(0));
				buster.refute(predicates.isFunction("a"));
				buster.refute(predicates.isFunction([]));
				buster.refute(predicates.isFunction({}));
				buster.refute(predicates.isFunction(null));
				buster.refute(predicates.isFunction(undefined));
			},

			"'isFunction' returns true if 'object' is a function that expects arguments if 'length' is true": function() {
				buster.assert(predicates.isFunction(function(a) {}, true));
				buster.assert(predicates.isFunction(function(a, b) {}, true));

				buster.refute(predicates.isFunction(function() {}, true));
			},

			"'isFunction' returns true if 'object' is a function that may expect no arguments if 'length' is false": function() {
				buster.assert(predicates.isFunction(function() {}, false));
				buster.assert(predicates.isFunction(function(a) {}, false));
			},

			"'isFunction' returns true if 'object' is a function that expects a particular number of arguments if 'length' is a number": function() {
				buster.assert(predicates.isFunction(function() {}, 0));
				buster.assert(predicates.isFunction(function(a) {}, 1));
				buster.assert(predicates.isFunction(function(a, b) {}, 2));
				buster.assert(predicates.isFunction(function(a, b, c) {}, 3));

				buster.refute(predicates.isFunction(function(a) {}, 0));
				buster.refute(predicates.isFunction(function(a, b) {}, 3));
			},

			"'isFunction' returns false if 'object' is not a function": function() {
				buster.refute(predicates.isFunction(0, predicates.isNumber));
				buster.refute(predicates.isFunction("a", predicates.isNumber));
				buster.refute(predicates.isFunction([], predicates.isNumber));
				buster.refute(predicates.isFunction({}, predicates.isNumber));
				buster.refute(predicates.isFunction(null, predicates.isNumber));
				buster.refute(predicates.isFunction(undefined, predicates.isNumber));
			}
		},

		"'isNumber' returns true if 'object' is a number": function() {
			buster.assert(predicates.isNumber(-1));
			buster.assert(predicates.isNumber(-0.5));
			buster.assert(predicates.isNumber(0));
			buster.assert(predicates.isNumber(0.5));
			buster.assert(predicates.isNumber(1));

			buster.refute(predicates.isNumber("a"));
			buster.refute(predicates.isNumber([]));
			buster.refute(predicates.isNumber({}));
			buster.refute(predicates.isNumber(null));
			buster.refute(predicates.isNumber(undefined));
		},

		"isPositiveNumber": {
			"'isPositiveNumber' returns true if 'object' is a number >= 0": function() {
				buster.assert(predicates.isPositiveNumber(0));
				buster.assert(predicates.isPositiveNumber(0.5));
				buster.assert(predicates.isPositiveNumber(1));

				buster.refute(predicates.isPositiveNumber(-0.5));
				buster.refute(predicates.isPositiveNumber(-1));

				buster.refute(predicates.isPositiveNumber("a"));
				buster.refute(predicates.isPositiveNumber([]));
				buster.refute(predicates.isPositiveNumber({}));
				buster.refute(predicates.isPositiveNumber(null));
				buster.refute(predicates.isPositiveNumber(undefined));
			},

			"'isPositiveNumber' returns true if 'object' is a number >= 0 if 'withZero' is true": function() {
				buster.assert(predicates.isPositiveNumber(0,   true));
				buster.assert(predicates.isPositiveNumber(0.5, true));
				buster.assert(predicates.isPositiveNumber(1,   true));
			},

			"'isPositiveNumber' returns true if 'object' is a number > 0 if 'withZero' is false": function() {
				buster.assert(predicates.isPositiveNumber(0.5, true));
				buster.assert(predicates.isPositiveNumber(1,   true));
				buster.refute(predicates.isPositiveNumber(0,   false));
			}
		},

		"'isNegativeNumber' returns true if 'object' is a number < 0": function() {
			buster.assert(predicates.isNegativeNumber(-0.5));
			buster.assert(predicates.isNegativeNumber(-1));

			buster.refute(predicates.isNegativeNumber(0));
			buster.refute(predicates.isNegativeNumber(0.5));
			buster.refute(predicates.isNegativeNumber(1));

			buster.refute(predicates.isNegativeNumber("a"));
			buster.refute(predicates.isNegativeNumber([]));
			buster.refute(predicates.isNegativeNumber({}));
			buster.refute(predicates.isNegativeNumber(null));
			buster.refute(predicates.isNegativeNumber(undefined));
		},

		"'isInteger' returns true if 'object' is an integer number": function() {
			buster.assert(predicates.isInteger(-1));
			buster.assert(predicates.isInteger(0));
			buster.assert(predicates.isInteger(1));

			buster.refute(predicates.isInteger(-0.5));
			buster.refute(predicates.isInteger(0.5));

			buster.refute(predicates.isInteger("a"));
			buster.refute(predicates.isInteger([]));
			buster.refute(predicates.isInteger({}));
			buster.refute(predicates.isInteger(null));
			buster.refute(predicates.isInteger(undefined));
		},

		"isPositiveInteger": {
			"'isPositiveInteger' returns true if 'object' is an integer number >= 0": function() {
				buster.assert(predicates.isPositiveInteger(0));
				buster.assert(predicates.isPositiveInteger(1));

				buster.refute(predicates.isPositiveInteger(-1));
				buster.refute(predicates.isPositiveInteger(-0.5));
				buster.refute(predicates.isPositiveInteger(0.5));

				buster.refute(predicates.isPositiveInteger("a"));
				buster.refute(predicates.isPositiveInteger([]));
				buster.refute(predicates.isPositiveInteger({}));
				buster.refute(predicates.isPositiveInteger(null));
				buster.refute(predicates.isPositiveInteger(undefined));
			},

			"'isPositiveNumber' returns true if 'object' is an integer number >= 0 if 'withZero' is true": function() {
				buster.assert(predicates.isPositiveInteger(0, true));
				buster.assert(predicates.isPositiveInteger(1, true));
			},

			"'isPositiveNumber' returns true if 'object' is an integer number > 0 if 'withZero' is false": function() {
				buster.assert(predicates.isPositiveInteger(1, false));
				buster.refute(predicates.isPositiveInteger(0, false));
			}
		},

		"'isNegativeInteger' returns true if 'object' is an integer number < 0": function() {
			buster.assert(predicates.isNegativeInteger(-1));

			buster.refute(predicates.isNegativeInteger(-0.5));
			buster.refute(predicates.isNegativeInteger(0));
			buster.refute(predicates.isNegativeInteger(0.5));
			buster.refute(predicates.isNegativeInteger(1));

			buster.refute(predicates.isNegativeInteger("a"));
			buster.refute(predicates.isNegativeInteger([]));
			buster.refute(predicates.isNegativeInteger({}));
			buster.refute(predicates.isNegativeInteger(null));
			buster.refute(predicates.isNegativeInteger(undefined));
		},

		"isArrayOf": {
			"'isArrayOf' return true if 'object' is a non-empty array of a particular type": function() {
				buster.assert(predicates.isArrayOf([0, 1, 2], predicates.isNumber));
				buster.assert(predicates.isArrayOf([0, 1, 2], predicates.isPositiveNumber));

				buster.refute(predicates.isArrayOf([0, 1, 2], predicates.isNegativeNumber));
				buster.refute(predicates.isArrayOf([], predicates.isNumber));
			},

			"'isArrayOf' returns true if 'object' is a non-empty array of a particular type if 'length' is true": function() {
				buster.assert(predicates.isArrayOf([0, 1, 2], predicates.isNumber, true));
				buster.assert(predicates.isArrayOf([0, 1, 2], predicates.isPositiveNumber, true));

				buster.refute(predicates.isArrayOf([0, 1, 2], predicates.isNegativeNumber, true));
				buster.refute(predicates.isArrayOf([], predicates.isNumber, true));
			},

			"'isArrayOf' returns true if 'object' is a possibly empty array of a particular type if 'length' is false": function() {
				buster.assert(predicates.isArrayOf([], predicates.isNumber, false));
				buster.assert(predicates.isArrayOf([0, 1, 2], predicates.isNumber, false));
			},

			"'isArrayOf' returns true if 'object' is an array of a particular type and a particular length if 'length' is a number": function() {
				buster.assert(predicates.isArrayOf([], predicates.isNumber, 0));
				buster.assert(predicates.isArrayOf([0, 1, 2], predicates.isNumber, 3));

				buster.refute(predicates.isArrayOf([0, 1, 2], predicates.isNumber, 4));
			},

			"'isArrayOf' returns false if 'object' is not an array": function() {
				buster.refute(predicates.isArrayOf(0, predicates.isNumber));
				buster.refute(predicates.isArrayOf("a", predicates.isNumber));
				buster.refute(predicates.isArrayOf(function() {}, predicates.isNumber));
				buster.refute(predicates.isArrayOf({}, predicates.isNumber));
				buster.refute(predicates.isArrayOf(null, predicates.isNumber));
				buster.refute(predicates.isArrayOf(undefined, predicates.isNumber));
			},

			"'isArrayOf' throws if 'predicate' is not a function": function() {
				buster.refute.exception(function() {
					predicates.isArrayOf([1, 2, 3], predicates.isNumber);
				});

				buster.assert.exception(function() {
					predicates.isArrayOf([1, 2, 3]);
				});
			}
		}
	});
});
