var svgWidth = 960;
var svgHeight = 500;

var chartMargin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  //.select("body .container .row div div")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);



// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("/D3_data_journalism/assets/data/data.csv").then(function (data){
    console.log("hi");
    var chosenXAxis = "poverty";

    data.forEach(function (data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
    });
    var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.poverty-1))
    .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.healthcare)])
    .range([chartHeight, 0]);
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
    .attr("fill", "#8ABCFF")
    .attr("opacity", "0.5");

    var circleLabels = chartGroup.selectAll(null).data(data).enter().append("text");

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
    .attr("y", 0 - chartMargin.left + 40)
    .attr("x", 0 - (chartHeight / 2))
    //.attr("dy", "lem")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

    chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");




    // chartGroup.catch(function (error) {
    //   console.log(error);
    // });

})
