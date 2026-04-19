import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
  const chartRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // заносим в состояния ширину и высоту svg-элемента
  useEffect(() => {
    const svg = d3.select(chartRef.current);
    setWidth(parseFloat(svg.style('width')));
    setHeight(parseFloat(svg.style('height')));
  }, []);
  // задаем отступы в svg-элементе
  let margin;
  margin = {
    top: 10,
    bottom: 60,
    left: 40,
    right: 10
  };
  // вычисляем ширину и высоту области для вывода графиков
  const boundsWidth = width -  margin.left - margin.right;
  const boundsHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    // выводим прямоугольник,
    svg
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width",  boundsWidth)
      .attr("height",  boundsWidth)
      .style("fill", "lightgrey");
  });

  const oy = props.oy;
  let [min, max] = d3.extent(props.data.map(d => d.values[1]));
  if (oy[0] === true && oy[1] === false) {
    [min, max] = d3.extent(props.data.map(d => d.values[0]));
  }

  // формируем шкалы для осей
  const scaleX = useMemo(() => {
    return d3
      .scaleBand()
      .domain(props.data.map(d => d.labelX))
      .range([0,boundsWidth])
  }, [props.data, boundsWidth]);

  const scaleY = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([min * 0.85, max * 1.1 ])
      .range([boundsHeight, 0])
  }, [boundsHeight, min, max]);


  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    // рисуем оси
    const xAxis = d3.axisBottom(scaleX);
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-30)");

    const yAxis = d3.axisLeft(scaleY);
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    //рисуем график
    const graphType = props.graphType;
    const color = ["blue", "red"];
    for (let i = 0; i <= 1; i++) {
      if (oy[i] === true) {
        if (graphType === "0") {
          svg.selectAll(".dot")
            .data(props.data)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[i] + 3 * i))
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .style("fill", color[i])
        }
        else if (graphType === "1") {
          svg.selectAll(".rect")
            .data(props.data)
            .enter()
            .append("rect")
            .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + (i - 1) * scaleX.bandwidth() / 3)
            .attr("y", d => scaleY(d.values[i]))
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .attr("width", scaleX.bandwidth() / 3)
            .attr("height", d => height - margin.top - margin.bottom - scaleY(d.values[i]))
            .style("fill", color[i])
        }
      }
    }
  }, [scaleX, scaleY, props.data, margin, height, oy, props.graphType]);

  return (
    <svg ref={chartRef} >  </svg>
  )
}

export default ChartDraw;