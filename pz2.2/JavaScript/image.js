function drawSmile(svg) {
  let smile = svg.append("g")
    .style("stroke", "brown")
    .style("stroke-width", 2)
    .style("fill", "brown");
  //лицо
  smile.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 50)
    .style("fill", "yellow");
  //левый глаз
  smile.append("circle")
    .attr("cx", -20)
    .attr("cy", -10)
    .attr("r", 5);
  //правый глаз
  smile.append("circle")
    .attr("cx", 20)
    .attr("cy", -10)
    .attr("r", 5);
  // улыбка
  let arc = d3.arc()
    .innerRadius(35)
    .outerRadius(35);
  smile.append("path")
    .attr("d", arc({startAngle: Math.PI /3 * 2, endAngle: Math.PI/3 * 4}))
    .style("stroke", "brown");
  //нос
  smile.append("polygon")
    .attr("points", "0,0 -5,10 5,10");
  //шапочка
  smile.append("polygon")
    .attr("points", "-60,-30 60,-30 30,-40 0,-100 -30,-40")
    .style("fill", "steelblue");
  return smile
}