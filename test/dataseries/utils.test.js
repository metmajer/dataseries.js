define(["src/dataseries/utils.js", "src/dataseries/predicates.js"], function(utils, predicates) {
	buster.testCase("utils", {
		"setUp": function() {
			this.strings = ["A", "B", "C"];
			this.objects = [{x: 1}, {y: 1}];
		},

		"hash": {
			"'hash' computes a hash from a string": function() {
				var hashes = _.map(this.strings, utils.hash);
				buster.assert.equals(_.unique(hashes).length, this.strings.length);
			},

			"'hash' computes the same hash for identical objects": function() {
				buster.assert.equals(utils.hash("A"), utils.hash("A"));
			},

			"'hash' returns the computed hash as a base36 encoded string": function() {
				_.each(this.strings, function(string) {
					var hash = utils.hash(string);
					buster.assert.equals(hash, parseInt(hash, 36).toString(36));
				});
			}
		},

		"hashObject": {
			"'hashObject' computes a hash from an object": function() {
				var hashes = _.map(this.objects, utils.hashObject);
				buster.assert.equals(_.unique(hashes).length, this.objects.length);
			},

			"'hashObject' computes the same hash for identical objects": function() {
				buster.assert.equals(utils.hashObject({x: 1}), utils.hashObject({x: 1}));
			},

			"'hashObject' computes differing hashes for nested objects": function() {
				var a = {x: 1, y: {a: 1}};
				var b = {x: 1, y: {a: 2}};
				buster.refute.equals(utils.hashObject(a), utils.hashObject(b));
			},

			"'hashObject' returns the computed hash as a base36 encoded string": function() {
				_.each(this.objects, function(object) {
					var hash = utils.hashObject(object);
					buster.assert.equals(hash, parseInt(hash, 36).toString(36));
				});
			}
		}
	});
});
