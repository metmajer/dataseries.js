define(["src/dataseries/time.js"], function(time) {
	buster.testCase("time", {
		"SECOND indicates the number of milliseconds in a second": function() {
			buster.assert.equals(time.SECOND, 1E3);
		},

		"MINUTE indicates the number of milliseconds in a minute": function() {
			buster.assert.equals(time.MINUTE, 6E4);
		},

		"HOUR indicates the number of milliseconds in an hour": function() {
			buster.assert.equals(time.HOUR, 36E5);
		},

		"DAY indicates the number of milliseconds in a day": function() {
			buster.assert.equals(time.DAY, 864E5);
		},

		"WEEK indicates the number of milliseconds in a week": function() {
			buster.assert.equals(time.WEEK, 6048E5);
		},

		"MONTH": {
			"MONTH indicates the number of milliseconds in a particular month": function() {
				buster.assert.equals(time.MONTH(new Date(2013,  0, 1)), 31 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2013,  1, 1)), 28 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2013,  2, 1)), 31 * time.DAY - time.HOUR);
				buster.assert.equals(time.MONTH(new Date(2013,  3, 1)), 30 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2013,  4, 1)), 31 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2013,  5, 1)), 30 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2013,  6, 1)), 31 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2013,  7, 1)), 31 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2013,  8, 1)), 30 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2013,  9, 1)), 31 * time.DAY + time.HOUR);
				buster.assert.equals(time.MONTH(new Date(2013, 10, 1)), 30 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2013, 11, 1)), 31 * time.DAY);

				buster.assert.equals(time.MONTH(new Date(2004,  0, 1)), 31 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2004,  1, 1)), 29 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2004,  2, 1)), 31 * time.DAY - time.HOUR);
				buster.assert.equals(time.MONTH(new Date(2004,  3, 1)), 30 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2004,  4, 1)), 31 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2004,  5, 1)), 30 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2004,  6, 1)), 31 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2004,  7, 1)), 31 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2004,  8, 1)), 30 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2004,  9, 1)), 31 * time.DAY + time.HOUR);
				buster.assert.equals(time.MONTH(new Date(2004, 10, 1)), 30 * time.DAY);
				buster.assert.equals(time.MONTH(new Date(2004, 11, 1)), 31 * time.DAY);
			},

			"MONTH throws if 'date' is not a date": function() {
				buster.refute.exception(function() {
					time.MONTH(new Date(2013, 0, 1));
				});

				buster.assert.exception(function() {
					time.MONTH(0);
				});

				buster.assert.exception(function() {
					time.MONTH("a");
				});

				buster.assert.exception(function() {
					time.MONTH([]);
				});

				buster.assert.exception(function() {
					time.MONTH(function() {});
				});

				buster.assert.exception(function() {
					time.MONTH({});
				});

				buster.assert.exception(function() {
					time.MONTH(null);
				});

				buster.assert.exception(function() {
					time.MONTH(undefined);
				});
			}
		},

		"YEAR": {
			"YEAR indicates the number of milliseconds in a particular year": function() {
				buster.assert.equals(time.YEAR(new Date(2013, 0, 1)), 365 * time.DAY);
				buster.assert.equals(time.YEAR(new Date(2004, 0, 1)), 366 * time.DAY);
			},

			"YEAR throws if 'date' is not a date": function() {
				buster.refute.exception(function() {
					time.YEAR(new Date(2013, 0, 1));
				});

				buster.assert.exception(function() {
					time.YEAR(0);
				});

				buster.assert.exception(function() {
					time.YEAR("a");
				});

				buster.assert.exception(function() {
					time.YEAR([]);
				});

				buster.assert.exception(function() {
					time.YEAR(function() {});
				});

				buster.assert.exception(function() {
					time.YEAR({});
				});

				buster.assert.exception(function() {
					time.YEAR(null);
				});

				buster.assert.exception(function() {
					time.YEAR(undefined);
				});
			}
		},

		"range:": {
			"'end' is a date": {
				"'range' returns a time range from the interval ['start', 'end'] with values equidistantly spaced by 'step'": function() {
					buster.assert.equals(time.range(new Date(2013, 0, 1), new Date(2013, 0, 3), time.DAY), [new Date(2013, 0, 1), new Date(2013, 0, 2), new Date(2013, 0, 3)]);

					buster.assert.equals(time.range(new Date(2013, 0, 1), new Date(2013, 2, 1), time.MONTH), [
						new Date(2013, 0, 1), new Date(2013, 1, 1), new Date(2013, 2, 1)
					]);
					buster.assert.equals(time.range(new Date(2004, 0, 1), new Date(2004, 2, 1), time.MONTH), [
						new Date(2004, 0, 1), new Date(2004, 1, 1), new Date(2004, 2, 1)
					]);
					buster.assert.equals(time.range(new Date(2003, 0, 1), new Date(2005, 5, 1), time.MONTH), [
						new Date(2003, 0, 1), new Date(2003, 1, 1), new Date(2003, 2, 1), new Date(2003, 3, 1), new Date(2003, 4, 1), new Date(2003, 5, 1),
						new Date(2003, 6, 1), new Date(2003, 7, 1), new Date(2003, 8, 1), new Date(2003, 9, 1), new Date(2003, 10, 1), new Date(2003, 11, 1),
						new Date(2004, 0, 1), new Date(2004, 1, 1), new Date(2004, 2, 1), new Date(2004, 3, 1), new Date(2004, 4, 1), new Date(2004, 5, 1),
						new Date(2004, 6, 1), new Date(2004, 7, 1), new Date(2004, 8, 1), new Date(2004, 9, 1), new Date(2004, 10, 1), new Date(2004, 11, 1),
						new Date(2005, 0, 1), new Date(2005, 1, 1), new Date(2005, 2, 1), new Date(2005, 3, 1), new Date(2005, 4, 1), new Date(2005, 5, 1)
					]);

					buster.assert.equals(time.range(new Date(2013, 0, 1), new Date(2015, 0, 1), time.YEAR), [
						new Date(2013, 0, 1), new Date(2014, 0, 1), new Date(2015, 0, 1)
					]);
					buster.assert.equals(time.range(new Date(2003, 0, 1), new Date(2005, 0, 1), time.YEAR), [
						new Date(2003, 0, 1), new Date(2004, 0, 1), new Date(2005, 0, 1)
					]);
					buster.assert.equals(time.range(new Date(2000, 0, 1), new Date(2012, 0, 1), time.YEAR), [
						new Date(2000, 0, 1), new Date(2001, 0, 1), new Date(2002, 0, 1), new Date(2003, 0, 1), new Date(2004, 0, 1), new Date(2005, 0, 1), new Date(2006, 0, 1),
						new Date(2007, 0, 1), new Date(2008, 0, 1), new Date(2009, 0, 1), new Date(2010, 0, 1), new Date(2011, 0, 1), new Date(2012, 0, 1)]
					);
				},

				"'range' returns ['start'] if 'step' is greater than Math.abs('end' - 'start')": function() {
					buster.assert.equals(time.range(new Date(2013, 0, 1), new Date(2013, 0, 2), 3 * time.DAY), [new Date(2013, 0, 1)]);
				},

				"'range' throws if 'start' >= 'end'": function() {
					buster.refute.exception(function() {
						time.range(new Date(2013, 0, 1), new Date(2013, 0, 2), time.DAY);
					});

					buster.assert.exception(function() {
						time.range(new Date(2013, 0, 1), new Date(2013, 0, 1), time.DAY);
					});

					buster.assert.exception(function() {
						time.range(new Date(2013, 0, 2), new Date(2013, 0, 1), time.DAY);
					});
				}
			},

			"'end' is an integer": {
				"'range' returns a time range with start date 'start' where the number of elements equals 'length' and values spaced by 'step'": function() {
					buster.assert.equals(time.range(new Date(2013, 0, 1), 3, time.DAY), [new Date(2013, 0, 1), new Date(2013, 0, 2), new Date(2013, 0, 3)]);

					buster.assert.equals(time.range(new Date(2013, 0, 1), 3, time.MONTH), [
						new Date(2013, 0, 1), new Date(2013, 1, 1), new Date(2013, 2, 1)
					]);
					buster.assert.equals(time.range(new Date(2004, 0, 1), 3, time.MONTH), [
						new Date(2004, 0, 1), new Date(2004, 1, 1), new Date(2004, 2, 1)
					]);
					buster.assert.equals(time.range(new Date(2003, 0, 1), 30, time.MONTH), [
						new Date(2003, 0, 1), new Date(2003, 1, 1), new Date(2003, 2, 1), new Date(2003, 3, 1), new Date(2003, 4, 1), new Date(2003, 5, 1),
						new Date(2003, 6, 1), new Date(2003, 7, 1), new Date(2003, 8, 1), new Date(2003, 9, 1), new Date(2003, 10, 1), new Date(2003, 11, 1),
						new Date(2004, 0, 1), new Date(2004, 1, 1), new Date(2004, 2, 1), new Date(2004, 3, 1), new Date(2004, 4, 1), new Date(2004, 5, 1),
						new Date(2004, 6, 1), new Date(2004, 7, 1), new Date(2004, 8, 1), new Date(2004, 9, 1), new Date(2004, 10, 1), new Date(2004, 11, 1),
						new Date(2005, 0, 1), new Date(2005, 1, 1), new Date(2005, 2, 1), new Date(2005, 3, 1), new Date(2005, 4, 1), new Date(2005, 5, 1)
					]);

					buster.assert.equals(time.range(new Date(2013, 0, 1), 3, time.YEAR), [
						new Date(2013, 0, 1), new Date(2014, 0, 1), new Date(2015, 0, 1)
					]);
					buster.assert.equals(time.range(new Date(2003, 0, 1), 3, time.YEAR), [
						new Date(2003, 0, 1), new Date(2004, 0, 1), new Date(2005, 0, 1)
					]);
					buster.assert.equals(time.range(new Date(2000, 0, 1), 13, time.YEAR), [
						new Date(2000, 0, 1), new Date(2001, 0, 1), new Date(2002, 0, 1), new Date(2003, 0, 1), new Date(2004, 0, 1), new Date(2005, 0, 1), new Date(2006, 0, 1),
						new Date(2007, 0, 1), new Date(2008, 0, 1), new Date(2009, 0, 1), new Date(2010, 0, 1), new Date(2011, 0, 1), new Date(2012, 0, 1)]
					);
				},

				"'range' throws if 'end' <= 0": function() {
					buster.refute.exception(function() {
						time.range(new Date(2013, 0, 1), 1, time.DAY);
					});

					buster.assert.exception(function() {
						time.range(new Date(2013, 0, 1), 0, time.DAY);
					});
				}
			},

			"'range's 'step' defaults to time.DAY": function() {
				buster.assert.equals(time.range(new Date(2013, 0, 1), new Date(2013, 0, 3)), [new Date(2013, 0, 1), new Date(2013, 0, 2), new Date(2013, 0, 3)]);
			},

			"'range' throws if 'start' is not a date": function() {
				buster.refute.exception(function() {
					time.range(new Date(2013, 0, 1), new Date(2013, 0, 2));
				});

				buster.assert.exception(function() {
					time.range("a", new Date(2013, 0, 2));
				});

				buster.assert.exception(function() {
					time.range([], new Date(2013, 0, 2));
				});

				buster.assert.exception(function() {
					time.range(function() {}, new Date(2013, 0, 2));
				});

				buster.assert.exception(function() {
					time.range({}, new Date(2013, 0, 2));
				});

				buster.assert.exception(function() {
					time.range(null, new Date(2013, 0, 2));
				});

				buster.assert.exception(function() {
					time.range(undefined, new Date(2013, 0, 2));
				});
			},

			"'range' throws if 'end' is not a date or is not an integer > 0": function() {
				buster.refute.exception(function() {
					time.range(new Date(2013, 0, 1), 1);
					time.range(new Date(2013, 0, 1), new Date(2013, 0, 2));
				});

				buster.assert.exception(function() {
					time.range(new Date(2013, 0, 1), 0);
				});

				buster.assert.exception(function() {
					time.range(new Date(2013, 0, 1), "a");
				});

				buster.assert.exception(function() {
					time.range(new Date(2013, 0, 1), []);
				});

				buster.assert.exception(function() {
					time.range(new Date(2013, 0, 1), function() {});
				});

				buster.assert.exception(function() {
					time.range(new Date(2013, 0, 1), {});
				});

				buster.assert.exception(function() {
					time.range(new Date(2013, 0, 1), null);
				});

				buster.assert.exception(function() {
					time.range(new Date(2013, 0, 1), undefined);
				});
			},

			"'range' throws if 'step' is provided and is not a function or is not a number > 0": function() {
				buster.refute.exception(function() {
					time.range(new Date(2013, 0, 1), new Date(2013, 0, 2), function() { return time.DAY; });
					time.range(new Date(2013, 0, 1), new Date(2013, 0, 2), time.DAY);
				});

				buster.assert.exception(function() {
					time.range(new Date(2013, 0, 1), new Date(2013, 0, 2), 0);
				});

				buster.assert.exception(function() {
					time.range(new Date(2013, 0, 1), new Date(2013, 0, 2), "a");
				});

				buster.assert.exception(function() {
					time.range(new Date(2013, 0, 1), new Date(2013, 0, 2), []);
				});

				buster.assert.exception(function() {
					time.range(new Date(2013, 0, 1), new Date(2013, 0, 2), {});
				});

				buster.assert.exception(function() {
					time.range(new Date(2013, 0, 1), new Date(2013, 0, 2), null);
				});

				buster.assert.exception(function() {
					time.range(new Date(2013, 0, 1), new Date(2013, 0, 2), undefined);
				});
			}
		}
	});
});
