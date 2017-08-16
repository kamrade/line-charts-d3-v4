// Libraries
;
let jquery = require('jquery');
window.$ = jquery;
window.jquery = $;
window.jQuery = $;
let d3 = require('d3');
// let Tether = require('../../node_modules/tether/dist/js/tether');
// window.Tether = Tether;
// require('../../node_modules/bootstrap/dist/js/bootstrap');
// let Handlebars = require('handlebars');

let chart = document.getElementById("chart");

let margin = {top: 48, left: 48, bottom: 48, right: 48};
let width = chart.clientWidth - margin.left - margin.right;
let height = window.innerHeight - margin.top - margin.bottom;
height = 240;

// The number of datapoints
let n = 21;

let xScale = d3.scaleLinear()
  .domain([0, n-1])
  .range([0, width]);

let xAxis = d3.axisBottom(xScale);

let yScale = d3.scaleLinear()
  .domain([0, 1])
  .range([height, 0]);

let yAxis = d3.axisLeft(yScale)
      .tickSize(width);

// d3 line generator
let line = d3.line()
      .x((d,i) => {
        return xScale(i);
      })
      .y((d,i) => {
        return yScale(d.y);
      })
      .curve(d3.curveMonotoneX)
      ;

let area = d3.area()
      .x((d,i) => {
        return xScale(i);
      })
      .y0(height)
      .y1((d,i) => {
        return yScale(d.y);
      })
      .curve(d3.curveMonotoneX)
      ;

let dataset = d3.range(n).map((d) => { return {"y": d3.randomUniform(1)() } });

let svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

svg.append("clipPath")
    .attr("id", "chart-clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

// добавление area
svg.append("path")
    .datum(dataset)
    .attr("fill", "#fff")
    .attr("opacity", .9)
    .attr('clip-path', 'url(#chart-clip)')
    .attr('fill', 'url(#Gradient1)')
    .attr("d", area);

// добавление path
svg.append("path")
    .datum(dataset)
    .attr("class", "chart--line")
    .attr("stroke", "url(#Gradient2)")
    .attr("d", line);

svg.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
    .on("mouseover", (e) => {
      d3.select(event.target)
        .transition()
        .attr("r", 12);
    })
    .on("mouseout", (e) => {
      d3.select(event.target)
        .transition()
        .attr("r", 5);
    })

// Добавим x-axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

// замена палочек на оси x на кружочки
let xTicks = svg.selectAll(".x.axis .tick");
xTicks.each((d, i, o) => {
  let ticks = d3.select(o[i])
  ticks.append("circle").attr("r", 3).attr("fill", "#fff").attr("opacity", ".45");
  ticks.selectAll("line").remove();
});

// Добавим y-axis
svg.append("g")
    .attr("class", "y axis")
    .attr("transform", `translate( ${width}, 0 )`)
    .call(yAxis);
