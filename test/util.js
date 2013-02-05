function arrayToNumberFixed(array, digits) {
	return array.map(function(d) {
		return d.toFixed(digits);
	});
}