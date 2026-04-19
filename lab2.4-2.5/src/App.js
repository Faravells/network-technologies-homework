import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import {useState} from "react";

function App() {
  const [chartArr, setChartArr] = useState(buildings);
  return (
    <div className="App">
      <h3>Самые высокие здания и сооружения</h3>
      <Chart data={ chartArr } />
      <Table data={ buildings } amountRows="15" isPagination="true" setChartArr={ setChartArr } />
    </div>
  );
}

export default App;