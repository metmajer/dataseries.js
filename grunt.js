module.exports = function(grunt) {
	var pkg = grunt.file.readJSON("package.json");

	grunt.initConfig({
		pkg: pkg,

		buster: {
			test: {
				// TODO: why doesn't this accept a template?
				config: "test/buster.js"
			}
		},

		clean: {
			docs: ["docs/**"],
			dataseries: ["dataseries.js", "dataseries.min.js"]
		},

		lint: {
			files: ["<%= pkg.directories.src %>/**/*.js", "<%= pkg.directories.test %>/**/*.test.js"]
		},

		min: {
			"dataseries.min.js": "dataseries.js"
		},

		requirejs: {
			compile: {
				options: {
					mainConfigFile: "build.js"
				}
			}
		},

		watch: {
			files: ["<%= pkg.directories.src %>/**/*.js", "<%= pkg.directories.test %>/**/*.test.js"],
			tasks: ["buster"],
			options: {
				interrupt: true
			}
		}
	});

	grunt.loadNpmTasks("grunt-buster");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-requirejs");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", "buster requirejs min docs");
	grunt.registerTask("docs", "mddocs");
	grunt.registerTask("test", "buster");

	grunt.registerTask("mddocs", "Generate markdown docs from source files", function() {
		var markdox = require("markdox");
		var path = require("path");

		var sources = "src/**/*.js";
		var dest = "docs/md/";

		var files = grunt.file.expandFiles(sources).sort(function(a, b) {
			var _a = a.split('/').length;
			var _b = b.split('/').length;

			if (_a > _b) {
				return 1;
			} else if (_a < _b) {
				return -1;
			} else {
				return path.basename(a).localeCompare(path.basename(b));
			}
		});

		var done = this.async();
		grunt.file.mkdir("docs/md", 0755);

		files.forEach(function(file) {
			markdox.process(file, {output: dest + path.basename(file) + ".md", template: "templates/md/module.md.ejs"}, function() {
				done();
			});
		});

		markdox.process(files, {output: dest + "dataseries.js.md", template: "templates/md/overview.md.ejs"}, function() {
			done();
		});
	});
}
