var config = module.exports;
config["DataSeries.js AMD Browser Tests"] = {
	environment: "browser",
	rootPath: "..",
	sources: ["src/**/*.js"],
	tests: ["test/**/*.test.js"],
	libs: [
		"lib/lodash.js",
		"lib/require.js",
		"test/require.config.js",
		"test/utils.js",
	],
	extensions: [require("buster-amd")],
	"buster-amd": {
		/**
		 * Test files are require()'d relative to the 'baseUrl' property,
		 * as defined in file 'require.config.js'. This path mapping maps
		 * test file paths to the current folder.
		 */
		pathMapper: function (path) {
			return ".." + path.replace(/\.js$/, "");
		}
	}
};
