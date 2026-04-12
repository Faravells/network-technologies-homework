// Входные данные:
//   data - исходный массив (например, buildings)
//   key - поле, по которому осуществляется группировка
function createArrGraph(data, key) {
  const groupObj = d3.group(data, d => d[key]);
  let arrGraph = [];
  for(let entry of groupObj) {
    const minMax = d3.extent(entry[1].map(d => d['Площадь, км²']));
    arrGraph.push({labelX : entry[0], values : minMax});
  }
  return arrGraph;
}

function drawGraph(data, dataForm) {
  // значения по оси ОХ
  const keyX = dataForm.querySelector('input[name="ox"]:checked').value;
  let oy = dataForm.querySelectorAll('input[name="oy"]:checked');
  oy = [...oy].map(elem => elem.value);
  const graphType = d3.select("#graphType").node().value;
  // создаем массив для построения графика
  let arrGraph = createArrGraph(data, keyX);
  const svg = d3.select("svg")
  svg.selectAll('*').remove();
  // создаем словарь с атрибутами области вывода графика
  const attr_area = {
    width: parseFloat(svg.style('width')),
    height: parseFloat(svg.style('height')),
    marginX: 50,
    marginY: 100
  }
  // создаем шкалы преобразования и выводим оси
  const [scX, scY] = createAxis(svg, arrGraph, attr_area, oy);
  // рисуем график
  if (oy.includes('min')) {
    createChart(svg, arrGraph, scX, scY, attr_area, "blue", 0, graphType);
  }
  if (oy.includes('max')) {
    createChart(svg, arrGraph, scX, scY, attr_area, "red", 1, graphType);
  }
}

function createAxis(svg, data, attr_area, oy){
  // находим интервал значений, которые нужно отложить по оси OY
  // максимальное и минимальное значение максимальных высот по каждой стране
  let [min, max] = d3.extent(data.map(d => d.values[1]));
  if (oy.includes('min') && !oy.includes('max')) {
    [min, max] = d3.extent(data.map(d => d.values[0]));
  }
  // функция интерполяции значений на оси
  // по оси ОХ текстовые значения
  const scaleX = d3.scaleBand()
    .domain(data.map(d => d.labelX))
    .range([0, attr_area.width - 2 * attr_area.marginX]);
  const scaleY = d3.scaleLinear()
    .domain([min * 0.85, max * 1.1])
    .range([attr_area.height - 2 * attr_area.marginY, 0]);
  // создание осей
  const axisX = d3.axisBottom(scaleX); // горизонтальная
  const axisY = d3.axisLeft(scaleY); // вертикальная
  // отрисовка осей в SVG-элементе
  svg.append("g")
    .attr("transform", `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
    .call(axisX)
    .selectAll("text") // подписи на оси - наклонные
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", d => "rotate(-45)");
  svg.append("g")
    .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
    .call(axisY);
  return [scaleX, scaleY]
}

function createChart(svg, data, scaleX, scaleY, attr_area, color, minmax, graphType) {
  if (graphType === '0') {
    const r = 4;
    svg.selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", r)
      .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
      .attr("cy", d => scaleY(d.values[minmax] + 100 * minmax))
      .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
      .style("fill", color)
  }
  else if (graphType === '1') {
    svg.selectAll(".rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + (minmax - 1) * scaleX.bandwidth() / 3)
      .attr("y", d => scaleY(d.values[minmax]))
      .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
      .attr("width", scaleX.bandwidth() / 3)
      .attr("height", d => attr_area.height - 2 * attr_area.marginY - scaleY(d.values[minmax]))
      .style("fill", color)
  }
}