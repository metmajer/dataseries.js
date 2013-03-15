function arrayToNumberFixed(array, digits, propertyName) {
	return array.map(function(d) {
		if (propertyName !== undefined) {
			d[propertyName] = d[propertyName].toFixed(digits);
			return d;
		}

		return d.toFixed(digits);
	});
}