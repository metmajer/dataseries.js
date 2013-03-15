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
	"dataseries/transforms",
	"dataseries/utils",
	"dataseries/visitors"
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
	transforms,
	utils,
	visitors
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
	transforms: transforms,
	utils: utils,
	visitors: visitors
};

});
