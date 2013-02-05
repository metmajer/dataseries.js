requirejs.config({
	baseUrl: "src",
	paths: {
		"underscore": "../lib/lodash"
	},
	name: "../lib/almond",
	include: ["dataseries"],
	wrap: {
		start: "(function(global, define) {\n"+
			   "	var globalDefine = global.define;\n",
		end: "	var library = require('dataseries');\n"+
			 "	if(typeof module !== 'undefined' && module.exports) {\n"+
			 "		module.exports = library;\n"+
			 "	} else if(globalDefine) {\n"+
			 "		(function (define) {\n"+
			 "			define(function () { return library; });\n"+
			 "		}(globalDefine));\n"+
			 "	} else {\n"+
			 "		global['ds'] = library;\n"+
			 "	}\n"+
			 "}(this));\n"
	},
	optimize: "none",
	out: "dataseries.js"
});
