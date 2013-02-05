require.config({
	baseUrl: "src",
	packages: [
		{
			name: "underscore",
			location: "../lib",
			main: "lodash.js"
		}
	],

	/**
	 * Define file paths for modules require()'d by the test modules,
	 * as well as the module dependencies of these required modules.
	 */
	paths: {
		"dataseries/generators/FunctionDataSeriesGenerator": "../src/dataseries/generators/FunctionDataSeriesGenerator",
		"dataseries/functions": "../src/dataseries/functions",
		"dataseries/generators": "../src/dataseries/generators",
		"dataseries/initialize": "../src/dataseries/initialize",
		"dataseries/normalize": "../src/dataseries/normalize",
		"dataseries/predicates": "../src/dataseries/predicates",
		"dataseries/random": "../src/dataseries/random",
		"dataseries/range": "../src/dataseries/range",
		"dataseries/time": "../src/dataseries/time",
		"dataseries/transforms": "../src/dataseries/transforms"
	}
});
