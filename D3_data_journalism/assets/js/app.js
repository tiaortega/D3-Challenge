var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#svg-area")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";

// Parse Data 
data.forEach(function (data) {
  data.healthcare = +data.healthcare;
  data.poverty = +data.poverty;
});

// Create scale functions

var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.healthcare)])
  .range([chartHeight, 0])

// Create axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Append axes to the chart
chartGroup.append("g")
  .classed("axis", true)
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(bottomAxis);

chartGroup.append("g")
  .classed("axis", true)
  .call(leftAxis);

// Create circles
var circlesGroup = chartGroup.selectAll("Circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "15")
  .attr("fill", "blue")
  .attr("opacity", "0.5");

var circleLabels = chartGroup.selectAll(null).data(data).enter().append("text");

// Create circle labels
circleLabels
  .attr("x", function (d) {
    return xLinearScale(d.poverty);
  })
  .attr("y", function (d) {
    return yLinearScale(d.healthcare);
  })
  .text(function (d) {
    return d.abbr;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "10px")
  .attr("text-anchor", "middle")
  .attr("fill", "white");

// Create axis labels
chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left + 40)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .text("Lacks Healthcare (%)");

chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .text("In Poverty (%)");

});
  