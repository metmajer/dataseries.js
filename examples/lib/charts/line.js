function line(selection) {
	var data = [],
		width = 600, height = 400,
		margin = {top: 20, right: 40, bottom: 40, left: 80},
		x = function(d) { return d.x; },
		y = function(d) { return Math.abs(d.y) != Infinity ? d.y : null; },
		yLabel = "", showDots = false;

	function chart() {
		if (!data.length) return;

		var yMin = d3.min(data, y);
		var yMax = d3.max(data, y);
		var yLimit = Math.max(-yMin, yMax);

		var xScale = (x(data[0]) instanceof Date ? d3.time.scale() : d3.scale.linear())
			.range([0, width - margin.left - margin.right])
			.domain(d3.extent(data, x));

		var yScale = d3.scale.linear()
			.range([height - margin.top - margin.bottom, 0])
			.domain([yMin < 0 ? -yLimit : 0, yMax > 0 ? yLimit : 0])
			.nice();

		var xAxis = d3.svg.axis()
			.scale(xScale)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left");

		var graph = d3.svg.line()
			.x(function(d) { return xScale(x(d)); })
			.y(function(d) { return yScale(y(d)); });
		if (interpolate) graph.interpolate(interpolate);

		var svg = selection.select("svg"),
			g = svg.select("g.graph"),
			gDots = svg.select("g.dots")
			overlay = selection.select(".overlay");

		if (svg.empty()) {
			svg = selection.append("svg");

			g = svg.append("g").classed("graph", true);
			g.append("path")
				.attr("class", "graph");
			g.append("g")
				.attr("class", "x axis");
			g.append("g")
				.attr("class", "y axis")
				.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 6)
					.attr("dy", ".71em")
					.style("text-anchor", "end");

			if (showDots) {
				gDots = svg.append("g").classed("dots", true);
				overlay = selection.append("div")
					.classed("overlay", true)
					.style("display", "none")
					.style("opacity", 0);
			}
		}

		svg
			.attr("width", width)
			.attr("height", height);

		g.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		g.select("path.graph").datum(data)
			.attr("d", graph);
		g.select("g.x")
			.attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
			.transition()
			.call(xAxis);
		g.select("g.y")
			.transition()
			.call(yAxis)
			.select("text")
				.text(yLabel);

		if (showDots) {
			dots = gDots.selectAll("circle").data(data);
			dots.exit().remove();
			dots.enter().append("circle")
				.attr("r", "4px")
				.on("mouseover", function(d) {
					d3.select(this).transition()
						.attr("r", "8px");

					overlay
						.html("<div><strong>X:</strong> " + d.x.toDateString() + "</div><div><strong>Y:</strong> " + d.y.toFixed(4) + "</div>")
						.transition()
						.style("display", "block")
						.style("opacity", 1);
				})
				.on("mouseout", function() {
					d3.select(this).transition()
						.attr("r", "4px");

					overlay.transition()
						.style("opacity", 0)
						.style("display", "none");
				});
			dots
				.attr("cx", function(d) { return xScale(x(d)) + margin.left; })
				.attr("cy", function(d) { return yScale(y(d)) + margin.top; });
		}
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

	chart.interpolate = function(value) {
		if (!arguments.length) return interpolate;
		interpolate = value;
		return chart;
	};

	chart.showDots = function(value) {
		if (!arguments.length) return showDots;
		showDots = value;
		return chart;
	};

	return chart;
}
