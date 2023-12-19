function utilsCountObjectFields(obj) {

	if (obj.__count__ !== undefined) { // Old FF
		return obj.__count__;
	}

	if (Object.keys) { // ES5
		return Object.keys(obj).length;
	}

	// Everything else:

	var c = 0, p;
	for (p in obj) {
		if (obj.hasOwnProperty(p)) {
			c += 1;
		}
	}

	return c;

}