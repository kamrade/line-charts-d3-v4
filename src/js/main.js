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
height = 400;

console.log(width);

// The number of datapoints
let n = 21;


let xScale = d3.scaleLinear()
  .domain([0, n-1])
  .range([0, width]);

let yScale = d3.scaleLinear()
  .domain([0, 1])
  .range([height, 0]);

// d3 line generator
let line = d3.line()
  .x((d,i) => {
    return xScale(i);
  })
  .y((d,i) => {
    return yScale(d.y);
  })
  .curve(d3.curveMonotoneX);

let dataset = d3.range(n).map((d) => { return {"y": d3.randomUniform(1)() } });
console.log(dataset);

let svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale));

svg.append("path")
    .datum(dataset)
    .attr("class", "line")
    .attr("d", line);

svg.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5);
