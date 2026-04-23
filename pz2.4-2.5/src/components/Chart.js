import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
  const [ox, setOx] = useState("Субъект РФ");
  const [oy, setOy] = useState([false, true]);
  const [graphType, setGraphType] = useState("0");
  const handleSubmit = (event) => {
    event.preventDefault();
    setOx(event.target["ox"].value);
    setOy([event.target["oy"][1].checked, event.target["oy"][0].checked])
    if (event.target["oy"][1].checked === false && event.target["oy"][0].checked === false) {
      alert("Отметьте хотя бы одно значение по оси OY!");
    }
    setGraphType(event.target["graphType"].value);
  }
  const createArrGraph =(data, key)=> {
    const groupObj = d3.group(data, d => d[key]);
    let arrGraph = [];
    for(let entry of groupObj) {
      let minMax = d3.extent(entry[1].map(d => d['Площадь, км²']));
      arrGraph.push({labelX: entry[0], values: minMax});
    }
    return arrGraph;
  }
  return (
    <details>
      <summary>График</summary>
      <form onSubmit={handleSubmit}>
        <p>
          Значение по оси ОХ<br/>
          <input type="radio" name="ox" value="Субъект РФ" defaultChecked={ox === "Субъект РФ"}/>
          Субъект РФ<br/>
          <input type="radio" name="ox" value="Ближайший город"/>
          Ближайший город
        </p>
        <p>
          Значение по оси OY<br/>
          <input type="checkbox" name="oy" defaultChecked={oy[1] === true}/>
          Максимальная площадь<br/>
          <input type="checkbox" name="oy"/>
          Минимальная площадь
        </p>
        <p>
          <label htmlFor="graphType">Тип графика</label>
          <select id="graphType">
            <option value="0">Точечная диаграмма</option>
            <option value="1">Гистограмма</option>
          </select>
        </p>
        <p>
          <button type="submit">Построить</button>
        </p>
      </form>
      <ChartDraw data={createArrGraph(props.data, ox)} oy={oy} graphType={graphType}/>
    </details>
  )
}

export default Chart;