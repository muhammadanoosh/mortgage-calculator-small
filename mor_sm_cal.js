let data = [20, 30, 50]; // You can adjust this data accordingly

let svg = d3.select('#donut-chart')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500),
    width = +svg.attr('width'),
    height = +svg.attr('height'),
    radius = Math.min(width, height) / 2,
    g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

let color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00']); // colors for the sections

let pie = d3.pie();

let arc = d3.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 20);

let pieData = pie(data);

let arcs = g.selectAll('arc')
    .data(pieData)
    .enter()
    .append('g')
    .attr('class', 'arc');

arcs.append('path')
    .attr('d', arc)
    .style('fill', function (d) { return color(d.data); })
    .style('stroke', '#ffffff')   // Add white color stroke
    .style('stroke-width', '5');  // Specify stroke width
