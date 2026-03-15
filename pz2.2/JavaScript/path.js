function createPath() {
  const svg = d3.select("svg")
  const width = svg.attr("width")
  const height = svg.attr("height")
  let data = [];
  for (let t = 0 ; t <= Math.PI * 2; t += 0.01) {
    data.push(
      {x: width / 2 + width * Math.sin(t) * Math.sin(t) * Math.cos(t),
        y: height / 2 + height * Math.sin(t) * Math.cos(t) * Math.cos(t)}
    );
  }
  return data;
}

const drawPath =() => {
  // создаем массив точек
  const dataPoints = createPath();
  const line = d3.line()
    .x((d) => d.x)
    .y((d) => d.y);
  const svg = d3.select("svg")
  // создаем путь на основе массива точек
  return svg.append('path')
    .attr('d', line(dataPoints))
    .attr('stroke', 'black')
    .attr('fill', 'none');
}

function translateAlong(path, dataForm) {
  const length = path.getTotalLength();
  const xzoomArr = Array.from({length: length + 1}, (elem, i) =>
    parseFloat(dataForm.xzoom.value) + (i / length) * (dataForm.xzoom2.value - dataForm.xzoom.value));
  const yzoomArr = Array.from({length: length + 1}, (elem, i) =>
    parseFloat(dataForm.yzoom.value) + (i / length) * (dataForm.yzoom2.value - dataForm.yzoom.value));
  const angleArr = Array.from({length: length + 1}, (elem, i) =>
    parseFloat(dataForm.angle.value) + (i / length) * (dataForm.angle2.value - dataForm.angle.value));
  return function() {
    return function(t) {
      const {x, y} = path.getPointAtLength(t * length);
      return `translate(${x},${y})
        scale(${xzoomArr.at(t * length)}, ${yzoomArr.at(t * length)})
        rotate(${angleArr.at(t * length)})`;
    }
  }
}