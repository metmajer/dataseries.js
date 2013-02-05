define([
	"require",
	"underscore",
	"dataseries/functions",
	"dataseries/generators",
	"dataseries/initialize",
	"dataseries/normalize",
	"dataseries/predicates",
	"dataseries/random",
	"dataseries/range",
	"dataseries/time",
	"dataseries/transforms"
],
function (
	require,
	_,
	functions,
	generators,
	initialize,
	normalize,
	predicates,
	random,
	range,
	time,
	transforms
) {
"use strict";

_.noConflict();

return {
	functions: functions,
	generators: generators,
	initialize: initialize,
	normalize: normalize,
	predicates: predicates,
	random: random,
	range: range,
	time: time,
	transforms: transforms
};

});
