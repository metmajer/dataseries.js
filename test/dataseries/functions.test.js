define(["src/dataseries/functions.js"], function(functions) {
	buster.testCase("functions", {
		"identity:": {
			"'identity' returns the result of the function f(x) = x for a particular 'x'": function() {
				buster.assert.equals(functions.identity(0), 0);
				buster.assert.equals(functions.identity("a"), "a");
				buster.assert.equals(functions.identity([]), []);
				buster.assert.equals(functions.identity({}), {});
				buster.assert.equals(functions.identity(null), null);
				buster.assert.equals(functions.identity(undefined), undefined);
			}
		},

		"linear:": {
			"'linear' returns the result of the linear function f(x, a, b) = ax + b for a particular 'x'": function() {
				buster.assert.equals(functions.linear(0, 2, 1), 2 * 0 + 1);
				buster.assert.equals(functions.linear(1, 2, 1), 2 * 1 + 1);
				buster.assert.equals(functions.linear(2, 2, 1), 2 * 2 + 1);
				buster.assert.equals(functions.linear(3, 2, 1), 2 * 3 + 1);
				buster.assert.equals(functions.linear(4, 2, 1), 2 * 4 + 1);

				buster.assert.equals(functions.linear(0, { a: 2, b: 1 }), 2 * 0 + 1);
				buster.assert.equals(functions.linear(1, { a: 2, b: 1 }), 2 * 1 + 1);
				buster.assert.equals(functions.linear(2, { a: 2, b: 1 }), 2 * 2 + 1);
				buster.assert.equals(functions.linear(3, { a: 2, b: 1 }), 2 * 3 + 1);
				buster.assert.equals(functions.linear(4, { a: 2, b: 1 }), 2 * 4 + 1);
			},

			"'linear's 'coefficients' default to 'a' = 1 and 'b' = 0": function() {
				buster.assert.equals(functions.linear(0), 1 * 0 + 0);
				buster.assert.equals(functions.linear(1), 1 * 1 + 0);
				buster.assert.equals(functions.linear(2), 1 * 2 + 0);
				buster.assert.equals(functions.linear(3), 1 * 3 + 0);
				buster.assert.equals(functions.linear(4), 1 * 4 + 0);
			},

			"'linear' throws if 'x' is not a number": function() {
				buster.refute.exception(function() {
					functions.linear(0);
				});

				buster.assert.exception(function() {
					functions.linear("a");
				});

				buster.assert.exception(function() {
					functions.linear([]);
				});

				buster.assert.exception(function() {
					functions.linear(function() {});
				});

				buster.assert.exception(function() {
					functions.linear({});
				});

				buster.assert.exception(function() {
					functions.linear(null);
				});

				buster.assert.exception(function() {
					functions.linear(undefined);
				});
			}
		},

		"square:": {
			"'square' returns the result of the square function f(x, a, b, c) = ax^2 + bx + c for a particular 'x'": function() {
				buster.assert.equals(functions.square(0, 3, 2, 1), 3 * Math.pow(0, 2) + 2 * 0 + 1);
				buster.assert.equals(functions.square(1, 3, 2, 1), 3 * Math.pow(1, 2) + 2 * 1 + 1);
				buster.assert.equals(functions.square(2, 3, 2, 1), 3 * Math.pow(2, 2) + 2 * 2 + 1);
				buster.assert.equals(functions.square(3, 3, 2, 1), 3 * Math.pow(3, 2) + 2 * 3 + 1);
				buster.assert.equals(functions.square(4, 3, 2, 1), 3 * Math.pow(4, 2) + 2 * 4 + 1);

				buster.assert.equals(functions.square(0, { a: 3, b: 2, c: 1 }), 3 * Math.pow(0, 2) + 2 * 0 + 1);
				buster.assert.equals(functions.square(1, { a: 3, b: 2, c: 1 }), 3 * Math.pow(1, 2) + 2 * 1 + 1);
				buster.assert.equals(functions.square(2, { a: 3, b: 2, c: 1 }), 3 * Math.pow(2, 2) + 2 * 2 + 1);
				buster.assert.equals(functions.square(3, { a: 3, b: 2, c: 1 }), 3 * Math.pow(3, 2) + 2 * 3 + 1);
				buster.assert.equals(functions.square(4, { a: 3, b: 2, c: 1 }), 3 * Math.pow(4, 2) + 2 * 4 + 1);
			},

			"'square's 'coefficients' default to 'a' = 1, 'b' = 0 and 'c' = 0": function() {
				buster.assert.equals(functions.square(0), 1 * Math.pow(0, 2) + 0 * 0 + 0);
				buster.assert.equals(functions.square(1), 1 * Math.pow(1, 2) + 0 * 1 + 0);
				buster.assert.equals(functions.square(2), 1 * Math.pow(2, 2) + 0 * 2 + 0);
				buster.assert.equals(functions.square(3), 1 * Math.pow(3, 2) + 0 * 3 + 0);
				buster.assert.equals(functions.square(4), 1 * Math.pow(4, 2) + 0 * 4 + 0);
			},

			"'square' throws if 'x' is not a number": function() {
				buster.refute.exception(function() {
					functions.square(0);
				});

				buster.assert.exception(function() {
					functions.square("a");
				});

				buster.assert.exception(function() {
					functions.square([]);
				});

				buster.assert.exception(function() {
					functions.square(function() {});
				});

				buster.assert.exception(function() {
					functions.square({});
				});

				buster.assert.exception(function() {
					functions.square(null);
				});

				buster.assert.exception(function() {
					functions.square(undefined);
				});
			}
		},

		"cubic:": {
			"'cubic' returns the result of the cubic function f(x, a, b, c, d) = ax^3 + bx^2 + cx + d for a particular 'x'": function() {
				buster.assert.equals(functions.cubic(0, 4, 3, 2, 1), 4 * Math.pow(0, 3) + 3 * Math.pow(0, 2) + 2 * 0 + 1);
				buster.assert.equals(functions.cubic(1, 4, 3, 2, 1), 4 * Math.pow(1, 3) + 3 * Math.pow(1, 2) + 2 * 1 + 1);
				buster.assert.equals(functions.cubic(2, 4, 3, 2, 1), 4 * Math.pow(2, 3) + 3 * Math.pow(2, 2) + 2 * 2 + 1);
				buster.assert.equals(functions.cubic(3, 4, 3, 2, 1), 4 * Math.pow(3, 3) + 3 * Math.pow(3, 2) + 2 * 3 + 1);
				buster.assert.equals(functions.cubic(4, 4, 3, 2, 1), 4 * Math.pow(4, 3) + 3 * Math.pow(4, 2) + 2 * 4 + 1);

				buster.assert.equals(functions.cubic(0, { a: 4, b: 3, c: 2, d: 1 }), 4 * Math.pow(0, 3) + 3 * Math.pow(0, 2) + 2 * 0 + 1);
				buster.assert.equals(functions.cubic(1, { a: 4, b: 3, c: 2, d: 1 }), 4 * Math.pow(1, 3) + 3 * Math.pow(1, 2) + 2 * 1 + 1);
				buster.assert.equals(functions.cubic(2, { a: 4, b: 3, c: 2, d: 1 }), 4 * Math.pow(2, 3) + 3 * Math.pow(2, 2) + 2 * 2 + 1);
				buster.assert.equals(functions.cubic(3, { a: 4, b: 3, c: 2, d: 1 }), 4 * Math.pow(3, 3) + 3 * Math.pow(3, 2) + 2 * 3 + 1);
				buster.assert.equals(functions.cubic(4, { a: 4, b: 3, c: 2, d: 1 }), 4 * Math.pow(4, 3) + 3 * Math.pow(4, 2) + 2 * 4 + 1);
			},

			"'cubic's 'coefficients' default to 'a' = 1, 'b' = 0, 'c' = 0 and 'd' = 0": function() {
				buster.assert.equals(functions.cubic(0), 1 * Math.pow(0, 3) + 0 * Math.pow(0, 2) + 0 * 0 + 0);
				buster.assert.equals(functions.cubic(1), 1 * Math.pow(1, 3) + 0 * Math.pow(1, 2) + 0 * 1 + 0);
				buster.assert.equals(functions.cubic(2), 1 * Math.pow(2, 3) + 0 * Math.pow(2, 2) + 0 * 2 + 0);
				buster.assert.equals(functions.cubic(3), 1 * Math.pow(3, 3) + 0 * Math.pow(3, 2) + 0 * 3 + 0);
				buster.assert.equals(functions.cubic(4), 1 * Math.pow(4, 3) + 0 * Math.pow(4, 2) + 0 * 4 + 0);
			},

			"'cubic' throws if 'x' is not a number": function() {
				buster.refute.exception(function() {
					functions.cubic(0);
				});

				buster.assert.exception(function() {
					functions.cubic("a");
				});

				buster.assert.exception(function() {
					functions.cubic([]);
				});

				buster.assert.exception(function() {
					functions.cubic(function() {});
				});

				buster.assert.exception(function() {
					functions.cubic({});
				});

				buster.assert.exception(function() {
					functions.cubic(null);
				});

				buster.assert.exception(function() {
					functions.cubic(undefined);
				});
			}
		},

		"polynomial:": {
			"'polynomial' returns the output of the polynomial function f(x, a) = a[n]x^n + a[n-1]x^(n-1) + ... + a[1]x + a[0] for a particular 'x'": function() {
				buster.assert.equals(functions.polynomial(0, [1, 2]), 2 * 0 + 1);
				buster.assert.equals(functions.polynomial(1, [1, 2]), 2 * 1 + 1);
				buster.assert.equals(functions.polynomial(2, [1, 2]), 2 * 2 + 1);
				buster.assert.equals(functions.polynomial(3, [1, 2]), 2 * 3 + 1);
				buster.assert.equals(functions.polynomial(4, [1, 2]), 2 * 4 + 1);

				buster.assert.equals(functions.polynomial(0, [1, 2, 3]), 3 * Math.pow(0, 2) + 2 * 0 + 1);
				buster.assert.equals(functions.polynomial(1, [1, 2, 3]), 3 * Math.pow(1, 2) + 2 * 1 + 1);
				buster.assert.equals(functions.polynomial(2, [1, 2, 3]), 3 * Math.pow(2, 2) + 2 * 2 + 1);
				buster.assert.equals(functions.polynomial(3, [1, 2, 3]), 3 * Math.pow(3, 2) + 2 * 3 + 1);
				buster.assert.equals(functions.polynomial(4, [1, 2, 3]), 3 * Math.pow(4, 2) + 2 * 4 + 1);

				buster.assert.equals(functions.polynomial(0, [1, 2, 3, 4]), 4 * Math.pow(0, 3) + 3 * Math.pow(0, 2) + 2 * 0 + 1);
				buster.assert.equals(functions.polynomial(1, [1, 2, 3, 4]), 4 * Math.pow(1, 3) + 3 * Math.pow(1, 2) + 2 * 1 + 1);
				buster.assert.equals(functions.polynomial(2, [1, 2, 3, 4]), 4 * Math.pow(2, 3) + 3 * Math.pow(2, 2) + 2 * 2 + 1);
				buster.assert.equals(functions.polynomial(3, [1, 2, 3, 4]), 4 * Math.pow(3, 3) + 3 * Math.pow(3, 2) + 2 * 3 + 1);
				buster.assert.equals(functions.polynomial(4, [1, 2, 3, 4]), 4 * Math.pow(4, 3) + 3 * Math.pow(4, 2) + 2 * 4 + 1);

				buster.assert.equals(functions.polynomial(0, { a: [1, 2] }), 2 * 0 + 1);
				buster.assert.equals(functions.polynomial(1, { a: [1, 2] }), 2 * 1 + 1);
				buster.assert.equals(functions.polynomial(2, { a: [1, 2] }), 2 * 2 + 1);
				buster.assert.equals(functions.polynomial(3, { a: [1, 2] }), 2 * 3 + 1);
				buster.assert.equals(functions.polynomial(4, { a: [1, 2] }), 2 * 4 + 1);

				buster.assert.equals(functions.polynomial(0, { a: [1, 2, 3] }), 3 * Math.pow(0, 2) + 2 * 0 + 1);
				buster.assert.equals(functions.polynomial(1, { a: [1, 2, 3] }), 3 * Math.pow(1, 2) + 2 * 1 + 1);
				buster.assert.equals(functions.polynomial(2, { a: [1, 2, 3] }), 3 * Math.pow(2, 2) + 2 * 2 + 1);
				buster.assert.equals(functions.polynomial(3, { a: [1, 2, 3] }), 3 * Math.pow(3, 2) + 2 * 3 + 1);
				buster.assert.equals(functions.polynomial(4, { a: [1, 2, 3] }), 3 * Math.pow(4, 2) + 2 * 4 + 1);

				buster.assert.equals(functions.polynomial(0, { a: [1, 2, 3, 4] }), 4 * Math.pow(0, 3) + 3 * Math.pow(0, 2) + 2 * 0 + 1);
				buster.assert.equals(functions.polynomial(1, { a: [1, 2, 3, 4] }), 4 * Math.pow(1, 3) + 3 * Math.pow(1, 2) + 2 * 1 + 1);
				buster.assert.equals(functions.polynomial(2, { a: [1, 2, 3, 4] }), 4 * Math.pow(2, 3) + 3 * Math.pow(2, 2) + 2 * 2 + 1);
				buster.assert.equals(functions.polynomial(3, { a: [1, 2, 3, 4] }), 4 * Math.pow(3, 3) + 3 * Math.pow(3, 2) + 2 * 3 + 1);
				buster.assert.equals(functions.polynomial(4, { a: [1, 2, 3, 4] }), 4 * Math.pow(4, 3) + 3 * Math.pow(4, 2) + 2 * 4 + 1);
			},

			"'polynomial' returns 0 if 'a' is []": function() {
				buster.assert.equals(functions.polynomial(0), 0);
				buster.assert.equals(functions.polynomial(0, []), 0);
				buster.assert.equals(functions.polynomial(10, []), 0);
			},

			"'polynomial' throws if 'x' is not a number": function() {
				buster.refute.exception(function() {
					functions.polynomial(0);
				});

				buster.assert.exception(function() {
					functions.polynomial("a");
				});

				buster.assert.exception(function() {
					functions.polynomial([]);
				});

				buster.assert.exception(function() {
					functions.polynomial(function() {});
				});

				buster.assert.exception(function() {
					functions.polynomial({});
				});

				buster.assert.exception(function() {
					functions.polynomial(null);
				});

				buster.assert.exception(function() {
					functions.polynomial(undefined);
				});
			},

			"'polynomial' throws if 'a' is not a (possibly empty) array of numbers": function() {
				buster.refute.exception(function() {
					functions.polynomial(0);
					functions.polynomial(0, []);
					functions.polynomial(0, [1, 2, 3]);

					functions.polynomial(0, { a: [] });
					functions.polynomial(0, { a: [1, 2, 3] });
				});

				buster.assert.exception(function() {
					functions.polynomial(0, 0);
					functions.polynomial(0, { a: 0 });
				});

				buster.assert.exception(function() {
					functions.polynomial(0, "a");
					functions.polynomial(0, { a: "a" });
				});

				buster.assert.exception(function() {
					functions.polynomial(0, function() {});
					functions.polynomial(0, { a: function() {} });
				});

				buster.assert.exception(function() {
					functions.polynomial(0, [0, "a", [], {}, null]);
				});
			}
		},

		"exp": {
			"'exp' returns the output of the exponential function f(x, a, b, c, d) = c * a^(b * x) + d for a particular 'x'": function() {
				function exp(x, a, b, c, d) {
					var args = _.isPlainObject(a) ? a : { a: a, b: b, c: c, d: d };
					buster.assert.equals(functions.exp(x, args.a, args.b, args.c, args.d), args.c * Math.pow(args.a, args.b * x) + args.d);
				}

				exp(1, 1, 2, 3, 4);
				exp(2, 1, 2, 3, 4);
				exp(3, 1, 2, 3, 4);
				exp(4, 1, 2, 3, 4);
				exp(5, 1, 2, 3, 4);

				exp(1, 4, 1, 2, 3);
				exp(2, 4, 1, 2, 3);
				exp(3, 4, 1, 2, 3);
				exp(4, 4, 1, 2, 3);
				exp(5, 4, 1, 2, 3);

				exp(1, 3, 4, 1, 2);
				exp(2, 3, 4, 1, 2);
				exp(3, 3, 4, 1, 2);
				exp(4, 3, 4, 1, 2);
				exp(5, 3, 4, 1, 2);

				exp(1, 2, 3, 4, 1);
				exp(2, 2, 3, 4, 1);
				exp(3, 2, 3, 4, 1);
				exp(4, 2, 3, 4, 1);
				exp(5, 2, 3, 4, 1);

				exp(1, { a: 1, b: 2, c: 3, d: 4 });
				exp(2, { a: 1, b: 2, c: 3, d: 4 });
				exp(3, { a: 1, b: 2, c: 3, d: 4 });
				exp(4, { a: 1, b: 2, c: 3, d: 4 });
				exp(5, { a: 1, b: 2, c: 3, d: 4 });

				exp(1, { a: 4, b: 1, c: 2, d: 3 });
				exp(2, { a: 4, b: 1, c: 2, d: 3 });
				exp(3, { a: 4, b: 1, c: 2, d: 3 });
				exp(4, { a: 4, b: 1, c: 2, d: 3 });
				exp(5, { a: 4, b: 1, c: 2, d: 3 });

				exp(1, { a: 3, b: 4, c: 1, d: 2 });
				exp(2, { a: 3, b: 4, c: 1, d: 2 });
				exp(3, { a: 3, b: 4, c: 1, d: 2 });
				exp(4, { a: 3, b: 4, c: 1, d: 2 });
				exp(5, { a: 3, b: 4, c: 1, d: 2 });

				exp(1, { a: 2, b: 3, c: 4, d: 1 });
				exp(2, { a: 2, b: 3, c: 4, d: 1 });
				exp(3, { a: 2, b: 3, c: 4, d: 1 });
				exp(4, { a: 2, b: 3, c: 4, d: 1 });
				exp(5, { a: 2, b: 3, c: 4, d: 1 });
			},

			"'exp's arguments default to 'a' = Math.E, 'b' = 1, 'c' = 1, 'd' = 0": function() {
				buster.assert.equals(functions.exp(0), 1 * Math.pow(Math.E, 1 * 0) + 0);
				buster.assert.equals(functions.exp(1), 1 * Math.pow(Math.E, 1 * 1) + 0);
				buster.assert.equals(functions.exp(2), 1 * Math.pow(Math.E, 1 * 2) + 0);
				buster.assert.equals(functions.exp(3), 1 * Math.pow(Math.E, 1 * 3) + 0);
				buster.assert.equals(functions.exp(4), 1 * Math.pow(Math.E, 1 * 4) + 0);
			},

			"'exp' throws if 'x' is not a number": function() {
				buster.refute.exception(function() {
					functions.exp(0);
				});

				buster.assert.exception(function() {
					functions.exp("a");
				});

				buster.assert.exception(function() {
					functions.exp([]);
				});

				buster.assert.exception(function() {
					functions.exp(function() {});
				});

				buster.assert.exception(function() {
					functions.exp({});
				});

				buster.assert.exception(function() {
					functions.exp(null);
				});

				buster.assert.exception(function() {
					functions.exp(undefined);
				});
			},

			"'exp' throws if 'a' is provided and is not a number": function() {
				buster.refute.exception(function() {
					functions.exp(0, 0);
					functions.exp(0, { a: 0 });
				});

				buster.assert.exception(function() {
					functions.exp(0, "a");
					functions.exp(0, {a: "a" });
				});

				buster.assert.exception(function() {
					functions.exp(0, []);
					functions.exp(0, { a: [] });
				});

				buster.assert.exception(function() {
					functions.exp(0, function() {});
					functions.exp(0, { a: function() {} });
				});
			},

			"'exp' throws if 'b' is provided and is not a number": function() {
				buster.refute.exception(function() {
					functions.exp(0, 0, 0);
					functions.exp(0, { b: 0 });
				});

				buster.assert.exception(function() {
					functions.exp(0, 0, "a");
					functions.exp(0, { b: "a" });
				});

				buster.assert.exception(function() {
					functions.exp(0, 0, []);
					functions.exp(0, { b: [] });
				});

				buster.assert.exception(function() {
					functions.exp(0, 0, function() {});
					functions.exp(0, { b: function() {} });
				});

				buster.assert.exception(function() {
					functions.exp(0, 0, {});
					functions.exp(0, { b: {} });
				});
			},

			"'exp' throws if 'c' is provided and is not a number": function() {
				buster.refute.exception(function() {
					functions.exp(0, 0, 0, 0);
					functions.exp(0, { c: 0 });
				});

				buster.assert.exception(function() {
					functions.exp(0, 0, 0, "a");
					functions.exp(0, { c: "a" });
				});

				buster.assert.exception(function() {
					functions.exp(0, 0, 0, []);
					functions.exp(0, { c: [] });
				});

				buster.assert.exception(function() {
					functions.exp(0, 0, 0, function() {});
					functions.exp(0, { c: function() {} });
				});

				buster.assert.exception(function() {
					functions.exp(0, 0, 0, {});
					functions.exp(0, { c: {} });
				});
			},

			"'exp' throws if 'd' is provided and is not a number": function() {
				buster.refute.exception(function() {
					functions.exp(0, 0, 0, 0, 0);
					functions.exp(0, { d: 0 });
				});

				buster.assert.exception(function() {
					functions.exp(0, 0, 0, 0, "a");
					functions.exp(0, { d: "a" });
				});

				buster.assert.exception(function() {
					functions.exp(0, 0, 0, 0, []);
					functions.exp(0, { d: [] });
				});

				buster.assert.exception(function() {
					functions.exp(0, 0, 0, 0, function() {});
					functions.exp(0, { d: function() {} });
				});

				buster.assert.exception(function() {
					functions.exp(0, 0, 0, 0, {});
					functions.exp(0, { d: {} });
				});
			}
		},

		"log": {
			"'log' returns the output of the logarithmic function f(x, a, b, c) = b * log a(x) + c for a particular 'x'": function() {
				function log(x, a, b, c) {
					var args = _.isPlainObject(a) ? a : { a: a, b: b, c: c };
					buster.assert.equals(functions.log(x, args.a, args.b, args.c), args.b * Math.log(x) / Math.log(args.a) + args.c);
				}

				log(1, 1, 2, 3);
				log(2, 1, 2, 3);
				log(3, 1, 2, 3);
				log(4, 1, 2, 3);
				log(5, 1, 2, 3);

				log(1, 3, 1, 2);
				log(2, 3, 1, 2);
				log(3, 3, 1, 2);
				log(4, 3, 1, 2);
				log(5, 3, 1, 2);

				log(1, 2, 3, 1);
				log(2, 2, 3, 1);
				log(3, 2, 3, 1);
				log(4, 2, 3, 1);
				log(5, 2, 3, 1);

				log(1, { a: 1, b: 2, c: 3 });
				log(2, { a: 1, b: 2, c: 3 });
				log(3, { a: 1, b: 2, c: 3 });
				log(4, { a: 1, b: 2, c: 3 });
				log(5, { a: 1, b: 2, c: 3 });

				log(1, { a: 3, b: 1, c: 2 });
				log(2, { a: 3, b: 1, c: 2 });
				log(3, { a: 3, b: 1, c: 2 });
				log(4, { a: 3, b: 1, c: 2 });
				log(5, { a: 3, b: 1, c: 2 });

				log(1, { a: 2, b: 3, c: 1 });
				log(2, { a: 2, b: 3, c: 1 });
				log(3, { a: 2, b: 3, c: 1 });
				log(4, { a: 2, b: 3, c: 1 });
				log(5, { a: 2, b: 3, c: 1 });
			},

			"'log' returns NaN if 'x' is a negative number": function() {
				buster.assert.equals(functions.log(-1), NaN);
			},

			"'log's arguments default to 'a' = Math.E, 'b' = 1, 'c' = 0": function() {
				buster.assert.equals(functions.log(0), 1 * Math.log(0) / Math.log(Math.E) + 0);
				buster.assert.equals(functions.log(1), 1 * Math.log(1) / Math.log(Math.E) + 0);
				buster.assert.equals(functions.log(2), 1 * Math.log(2) / Math.log(Math.E) + 0);
				buster.assert.equals(functions.log(3), 1 * Math.log(3) / Math.log(Math.E) + 0);
				buster.assert.equals(functions.log(4), 1 * Math.log(4) / Math.log(Math.E) + 0);
			},

			"'log' throws if 'x' is not a number": function() {
				buster.refute.exception(function() {
					functions.log(0);
				});

				buster.assert.exception(function() {
					functions.log("a");
				});

				buster.assert.exception(function() {
					functions.log([]);
				});

				buster.assert.exception(function() {
					functions.log(function() {});
				});

				buster.assert.exception(function() {
					functions.log({});
				});

				buster.assert.exception(function() {
					functions.log(null);
				});

				buster.assert.exception(function() {
					functions.log(undefined);
				});
			},

			"'log' throws if 'a' is provided and is not a number": function() {
				buster.refute.exception(function() {
					functions.log(0, 0);
					functions.log(0, { a: 0 });
				});

				buster.assert.exception(function() {
					functions.log(0, "a");
					functions.log(0, { a: "a" });
				});

				buster.assert.exception(function() {
					functions.log(0, []);
					functions.log(0, { a: [] });
				});

				buster.assert.exception(function() {
					functions.log(0, function() {});
					functions.log(0, { a: function() {} });
				});
			},

			"'log' throws if 'b' is provided and is not a number": function() {
				buster.refute.exception(function() {
					functions.log(0, 0, 0);
					functions.log(0, { b: 0 });
				});

				buster.assert.exception(function() {
					functions.log(0, 0, "a");
					functions.log(0, { b: "a" });
				});

				buster.assert.exception(function() {
					functions.log(0, 0, []);
					functions.log(0, { b: [] });
				});

				buster.assert.exception(function() {
					functions.log(0, 0, function() {});
					functions.log(0, { b: function() {} });
				});

				buster.assert.exception(function() {
					functions.log(0, 0, {});
					functions.log(0, { b: {} });
				});
			},

			"'log' throws if 'c' is provided and is not a number": function() {
				buster.refute.exception(function() {
					functions.log(0, 0, 0, 0);
					functions.log(0, { c: 0 });
				});

				buster.assert.exception(function() {
					functions.log(0, 0, 0, "a");
					functions.log(0, { c: "a" });
				});

				buster.assert.exception(function() {
					functions.log(0, 0, 0, []);
					functions.log(0, { c: [] });
				});

				buster.assert.exception(function() {
					functions.log(0, 0, 0, function() {});
					functions.log(0, { c: function() {} });
				});

				buster.assert.exception(function() {
					functions.log(0, 0, 0, {});
					functions.log(0, { c: {} });
				});
			}
		},

		"sin": {
			"'sin' returns the output of the sine function f(x, a, f, φ, b) = a * sin(2 * Math.PI * f * x + φ) + b for a particular 'x'": function() {
				function sin(x, a, f, φ, b) {
					var args = _.isPlainObject(a) ? a : { a: a, f: f, φ: φ, b: b };
					buster.assert.equals(functions.sin(x, args.a, args.f, args.φ, args.b), args.a * Math.sin(2 * Math.PI * args.f * x + args.φ) + args.b);
				}

				sin(1, 1, 2, 3, 4);
				sin(2, 1, 2, 3, 4);
				sin(3, 1, 2, 3, 4);
				sin(4, 1, 2, 3, 4);
				sin(5, 1, 2, 3, 4);

				sin(1, 4, 1, 2, 3);
				sin(2, 4, 1, 2, 3);
				sin(3, 4, 1, 2, 3);
				sin(4, 4, 1, 2, 3);
				sin(5, 4, 1, 2, 3);

				sin(1, 3, 4, 1, 2);
				sin(2, 3, 4, 1, 2);
				sin(3, 3, 4, 1, 2);
				sin(4, 3, 4, 1, 2);
				sin(5, 3, 4, 1, 2);

				sin(1, 2, 3, 4, 1);
				sin(2, 2, 3, 4, 1);
				sin(3, 2, 3, 4, 1);
				sin(4, 2, 3, 4, 1);
				sin(5, 2, 3, 4, 1);

				sin(1, { a: 1, f: 2, φ: 3, b: 4 });
				sin(2, { a: 1, f: 2, φ: 3, b: 4 });
				sin(3, { a: 1, f: 2, φ: 3, b: 4 });
				sin(4, { a: 1, f: 2, φ: 3, b: 4 });
				sin(5, { a: 1, f: 2, φ: 3, b: 4 });

				sin(1, { a: 4, f: 1, φ: 2, b: 3 });
				sin(2, { a: 4, f: 1, φ: 2, b: 3 });
				sin(3, { a: 4, f: 1, φ: 2, b: 3 });
				sin(4, { a: 4, f: 1, φ: 2, b: 3 });
				sin(5, { a: 4, f: 1, φ: 2, b: 3 });

				sin(1, { a: 3, f: 4, φ: 1, b: 2 });
				sin(2, { a: 3, f: 4, φ: 1, b: 2 });
				sin(3, { a: 3, f: 4, φ: 1, b: 2 });
				sin(4, { a: 3, f: 4, φ: 1, b: 2 });
				sin(5, { a: 3, f: 4, φ: 1, b: 2 });

				sin(1, { a: 2, f: 3, φ: 4, b: 1 });
				sin(2, { a: 2, f: 3, φ: 4, b: 1 });
				sin(3, { a: 2, f: 3, φ: 4, b: 1 });
				sin(4, { a: 2, f: 3, φ: 4, b: 1 });
				sin(5, { a: 2, f: 3, φ: 4, b: 1 });
			},

			"'sin's arguments default to 'a' = 1, 'f' = 1, 'φ' = 0, 'b' = 0": function() {
				buster.assert.equals(functions.sin(0), 1 * Math.sin(2 * Math.PI * 1 * 0 + 0) + 0);
				buster.assert.equals(functions.sin(1), 1 * Math.sin(2 * Math.PI * 1 * 1 + 0) + 0);
				buster.assert.equals(functions.sin(2), 1 * Math.sin(2 * Math.PI * 1 * 2 + 0) + 0);
				buster.assert.equals(functions.sin(3), 1 * Math.sin(2 * Math.PI * 1 * 3 + 0) + 0);
				buster.assert.equals(functions.sin(4), 1 * Math.sin(2 * Math.PI * 1 * 4 + 0) + 0);
			},

			"'sin' throws if 'x' is not a number": function() {
				buster.refute.exception(function() {
					functions.sin(0);
				});

				buster.assert.exception(function() {
					functions.sin("a");
				});

				buster.assert.exception(function() {
					functions.sin([]);
				});

				buster.assert.exception(function() {
					functions.sin(function() {});
				});

				buster.assert.exception(function() {
					functions.sin({});
				});

				buster.assert.exception(function() {
					functions.sin(null);
				});

				buster.assert.exception(function() {
					functions.sin(undefined);
				});
			},

			"'sin' throws if 'a' is provided and is not a number": function() {
				buster.refute.exception(function() {
					functions.sin(0, 0);
					functions.sin(0, { a: 0 });
				});

				buster.assert.exception(function() {
					functions.sin(0, "a");
					functions.sin(0, { a: "a" });
				});

				buster.assert.exception(function() {
					functions.sin(0, []);
					functions.sin(0, { a: [] });
				});

				buster.assert.exception(function() {
					functions.sin(0, function() {});
					functions.sin(0, { a: function() {} });
				});
			},

			"'sin' throws if 'f' is provided and is not a number >= 0": function() {
				buster.refute.exception(function() {
					functions.sin(0, 0, 0);
					functions.sin(0, { f: 0 });
				});

				buster.assert.exception(function() {
					functions.sin(0, 0, -1);
					functions.sin(0, { f: -1 });
				});

				buster.assert.exception(function() {
					functions.sin(0, 0, "a");
					functions.sin(0, { f: "a" });
				});

				buster.assert.exception(function() {
					functions.sin(0, 0, []);
					functions.sin(0, { f: [] });
				});

				buster.assert.exception(function() {
					functions.sin(0, 0, function() {});
					functions.sin(0, { f: function() {} });
				});

				buster.assert.exception(function() {
					functions.sin(0, 0, {});
					functions.sin(0, { f: {} });
				});
			},

			"'sin' throws if 'φ' is provided and is not a number": function() {
				buster.refute.exception(function() {
					functions.sin(0, 0, 0, 0);
					functions.sin(0, { φ: 0 });
				});

				buster.assert.exception(function() {
					functions.sin(0, 0, 0, "a");
					functions.sin(0, { φ: "a" });
				});

				buster.assert.exception(function() {
					functions.sin(0, 0, 0, []);
					functions.sin(0, { φ: [] });
				});

				buster.assert.exception(function() {
					functions.sin(0, 0, 0, function() {});
					functions.sin(0, { φ: function() {} });
				});

				buster.assert.exception(function() {
					functions.sin(0, 0, 0, {});
					functions.sin(0, { φ: {} });
				});
			},

			"'sin' throws if 'b' is provided and is not a number": function() {
				buster.refute.exception(function() {
					functions.sin(0, 0, 0, 0);
					functions.sin(0, { b: 0 });
				});

				buster.assert.exception(function() {
					functions.sin(0, 0, 0, "a");
					functions.sin(0, { b: "a" });
				});

				buster.assert.exception(function() {
					functions.sin(0, 0, 0, []);
					functions.sin(0, { b: [] });
				});

				buster.assert.exception(function() {
					functions.sin(0, 0, 0, function() {});
					functions.sin(0, { b: function() {} });
				});

				buster.assert.exception(function() {
					functions.sin(0, 0, 0, {});
					functions.sin(0, { b: {} });
				});
			}
		},

		"cos": {
			"'cos' returns the output of the cosine function f(x, a, f, φ, b) = a * cos(2 * Math.PI * f * x + φ) + b for a particular 'x'": function() {
				function cos(x, a, f, φ, b) {
					var args = _.isPlainObject(a) ? a : { a: a, f: f, φ: φ, b: b };
					buster.assert.equals(functions.cos(x, args.a, args.f, args.φ, args.b), args.a * Math.cos(2 * Math.PI * args.f * x + args.φ) + args.b);
				}

				cos(1, 1, 2, 3, 4);
				cos(2, 1, 2, 3, 4);
				cos(3, 1, 2, 3, 4);
				cos(4, 1, 2, 3, 4);
				cos(5, 1, 2, 3, 4);

				cos(1, 4, 1, 2, 3);
				cos(2, 4, 1, 2, 3);
				cos(3, 4, 1, 2, 3);
				cos(4, 4, 1, 2, 3);
				cos(5, 4, 1, 2, 3);

				cos(1, 3, 4, 1, 2);
				cos(2, 3, 4, 1, 2);
				cos(3, 3, 4, 1, 2);
				cos(4, 3, 4, 1, 2);
				cos(5, 3, 4, 1, 2);

				cos(1, 2, 3, 4, 1);
				cos(2, 2, 3, 4, 1);
				cos(3, 2, 3, 4, 1);
				cos(4, 2, 3, 4, 1);
				cos(5, 2, 3, 4, 1);

				cos(1, { a: 1, f: 2, φ: 3, b: 4 });
				cos(2, { a: 1, f: 2, φ: 3, b: 4 });
				cos(3, { a: 1, f: 2, φ: 3, b: 4 });
				cos(4, { a: 1, f: 2, φ: 3, b: 4 });
				cos(5, { a: 1, f: 2, φ: 3, b: 4 });

				cos(1, { a: 4, f: 1, φ: 2, b: 3 });
				cos(2, { a: 4, f: 1, φ: 2, b: 3 });
				cos(3, { a: 4, f: 1, φ: 2, b: 3 });
				cos(4, { a: 4, f: 1, φ: 2, b: 3 });
				cos(5, { a: 4, f: 1, φ: 2, b: 3 });

				cos(1, { a: 3, f: 4, φ: 1, b: 2 });
				cos(2, { a: 3, f: 4, φ: 1, b: 2 });
				cos(3, { a: 3, f: 4, φ: 1, b: 2 });
				cos(4, { a: 3, f: 4, φ: 1, b: 2 });
				cos(5, { a: 3, f: 4, φ: 1, b: 2 });

				cos(1, { a: 2, f: 3, φ: 4, b: 1 });
				cos(2, { a: 2, f: 3, φ: 4, b: 1 });
				cos(3, { a: 2, f: 3, φ: 4, b: 1 });
				cos(4, { a: 2, f: 3, φ: 4, b: 1 });
				cos(5, { a: 2, f: 3, φ: 4, b: 1 });
			},

			"'cos arguments default to 'a' = 1, 'f' = 1, 'φ' = 0, 'b' = 0": function() {
				buster.assert.equals(functions.cos(0), 1 * Math.cos(2 * Math.PI * 1 * 0 + 0) + 0);
				buster.assert.equals(functions.cos(1), 1 * Math.cos(2 * Math.PI * 1 * 1 + 0) + 0);
				buster.assert.equals(functions.cos(2), 1 * Math.cos(2 * Math.PI * 1 * 2 + 0) + 0);
				buster.assert.equals(functions.cos(3), 1 * Math.cos(2 * Math.PI * 1 * 3 + 0) + 0);
				buster.assert.equals(functions.cos(4), 1 * Math.cos(2 * Math.PI * 1 * 4 + 0) + 0);
			},

			"'cos' throws if 'x' is not a number": function() {
				buster.refute.exception(function() {
					functions.cos(0);
				});

				buster.assert.exception(function() {
					functions.cos("a");
				});

				buster.assert.exception(function() {
					functions.cos([]);
				});

				buster.assert.exception(function() {
					functions.cos(function() {});
				});

				buster.assert.exception(function() {
					functions.cos({});
				});

				buster.assert.exception(function() {
					functions.cos(null);
				});

				buster.assert.exception(function() {
					functions.cos(undefined);
				});
			},

			"'cos' throws if 'a' is provided and is not a number": function() {
				buster.refute.exception(function() {
					functions.cos(0, 0);
					functions.cos(0, { a: 0 });
				});

				buster.assert.exception(function() {
					functions.cos(0, "a");
					functions.cos(0, { a: "a" });
				});

				buster.assert.exception(function() {
					functions.cos(0, []);
					functions.cos(0, { a: [] });
				});

				buster.assert.exception(function() {
					functions.cos(0, function() {});
					functions.cos(0, { a: function() {} });
				});
			},

			"'cos' throws if 'f' is provided and is not a number >= 0": function() {
				buster.refute.exception(function() {
					functions.cos(0, 0, 0);
					functions.cos(0, { f: 0 });
				});

				buster.assert.exception(function() {
					functions.cos(0, 0, -1);
					functions.cos(0, { f: -1 });
				});

				buster.assert.exception(function() {
					functions.cos(0, 0, "a");
					functions.cos(0, { f: "a" });
				});

				buster.assert.exception(function() {
					functions.cos(0, 0, []);
					functions.cos(0, { f: [] });
				});

				buster.assert.exception(function() {
					functions.cos(0, 0, function() {});
					functions.cos(0, { f: function() {} });
				});

				buster.assert.exception(function() {
					functions.cos(0, 0, {});
					functions.cos(0, { f: {} });
				});
			},

			"'cos' throws if 'φ' is provided and is not a number": function() {
				buster.refute.exception(function() {
					functions.cos(0, 0, 0, 0);
					functions.cos(0, { φ: 0 });
				});

				buster.assert.exception(function() {
					functions.cos(0, 0, 0, "a");
					functions.cos(0, { φ: "a" });
				});

				buster.assert.exception(function() {
					functions.cos(0, 0, 0, []);
					functions.cos(0, { φ: [] });
				});

				buster.assert.exception(function() {
					functions.cos(0, 0, 0, function() {});
					functions.cos(0, { φ: function() {} });
				});

				buster.assert.exception(function() {
					functions.cos(0, 0, 0, {});
					functions.cos(0, { φ: {} });
				});
			},

			"'cos' throws if 'b' is provided and is not a number": function() {
				buster.refute.exception(function() {
					functions.cos(0, 0, 0, 0, 0);
					functions.cos(0, { b: 0 });
				});

				buster.assert.exception(function() {
					functions.cos(0, 0, 0, 0, "a");
					functions.cos(0, { b: "a" });
				});

				buster.assert.exception(function() {
					functions.cos(0, 0, 0, 0, []);
					functions.cos(0, { b: [] });
				});

				buster.assert.exception(function() {
					functions.cos(0, 0, 0, 0, function() {});
					functions.cos(0, { b: function() {} });
				});

				buster.assert.exception(function() {
					functions.cos(0, 0, 0, 0, {});
					functions.cos(0, { b: {} });
				});
			}
		}
	});
});
