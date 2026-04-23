import './CSS/App.css';
import reserves from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import {useState} from "react";

function App() {
  const amountRows = "15";
  const [chartArr, setChartArr] = useState(reserves);
  return (
    <div className="App">
      <Chart data={ chartArr } />
      <Table data={ reserves } amountRows={amountRows} setChartArr={ setChartArr } />
    </div>
  );
}

export default App;