function area(selection) {
	var width = 600,
	    height = 370,
	    margin = {top: 20, right: 40, bottom: 40, left: 80},
	    x = function(d) { return d.x; },
	    y = function(d) { return Math.abs(d.y) != Infinity ? d.y : null; },
	    yLabel = "";

	function chart() {
		var yMin = d3.min(data, y);
		var yMax = d3.max(data, y);
		var yLimit = Math.max(-yMin, yMax);

		var xScale = d3.time.scale()
			.range([0, width])
			.domain(d3.extent(data, x));

		var yScale = d3.scale.linear()
			.range([height, 0])
			.domain([yMin < 0 ? -yLimit : 0, yMax > 0 ? yLimit : 0])
			.nice();

		var xAxis = d3.svg.axis()
			.scale(xScale)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left");

		var area = d3.svg.area()
			.x(function(d) { return xScale(x(d)); })
			.y1(function(d) { return yScale(y(d)); })
			.y0(function() {
				if (yMin < 0 && yMax > 0) return height / 2;
				else if (yMax > 0 || yLimit == 0) return height
				else return 0;
			});

		var svg = selection.select("svg"),
			g = svg.select("g");

		if (svg.empty()) {
			svg = selection.append("svg");

			g = svg.append("g");
			g.append("path")
				.attr("class", "area");
			g.append("g")
				.attr("class", "x axis");
			g.append("g")
				.attr("class", "y axis")
				.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 6)
					.attr("dy", ".71em")
					.style("text-anchor", "end");
		}

		svg
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom);

		g.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		g.select("path.area").datum(data)
			.transition()
			.attr("d", area);
		g.select("g.x")
			.attr("transform", "translate(0," + height + ")")
			.transition()
			.call(xAxis);
		g.select("g.y")
			.transition()
			.call(yAxis)
			.select("text")
				.text(yLabel);
	}

	chart.data = function(value) {
		if (!arguments.length) return data;
		data = value;
		return chart;
	};

	chart.width = function(value) {
		if (!arguments.length) return width;
		width = value;
		return chart;
	};

	chart.height = function(value) {
		if (!arguments.length) return height;
		height = value;
		return chart;
	};

	chart.margin = function(value) {
		if (!arguments.length) return margin;
		margin = value;
		return chart;
	};

	chart.x = function(accessor) {
		if (!arguments.length) return x;
		x = accessor;
		return chart;
	};

	chart.y = function(accessor) {
		if (!arguments.length) return y;
		y = accessor;
		return chart;
	};

	chart.yLabel = function(value) {
		if (!arguments.length) return yLabel;
		yLabel = value;
		return chart;
	};

	return chart;
}
