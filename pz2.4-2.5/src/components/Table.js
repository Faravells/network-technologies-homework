import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';
import { useState, useRef } from "react";

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {
  const tableRef = useRef(null);
  let amountRows = props.amountRows;
  const [activePage, setActivePage] = useState("1");
  const [maxPages, setMaxPages] = useState(Math.ceil(props.data.length / amountRows));
  const [dataTable, setDataTable] = useState(props.data);
  const changeActive = (event) => {
    setActivePage(event.target.innerHTML);
  };
  // массив с номерами страниц
  const arr = Array.from({ length: maxPages }, (v, i) => i + 1);
  //формируем совокупность span с номерами страниц
  let pages = arr.map((item, index) => {
    if (index === activePage - 1) {
      return <span key={ index } className="selectedPage"> { item } </span>
    }
    else {
      return <span key={index} onClick={ changeActive }> {item} </span>
    }
  });
  const updateDataTable = (isReset, value = props.data) => {
    setDataTable(value);
    props.setChartArr(value);
    setActivePage("1");
    setMaxPages(Math.ceil(value.length / amountRows));
    if (isReset) {
      tableRef.current.querySelectorAll('form').forEach(elem => elem.reset());
    }
  }

  return (
    <div ref={tableRef}>
      <Filter filtering={ updateDataTable } data={ props.data }/>
      <Sort sorting={updateDataTable} data={dataTable}/>
      <table>
        <TableHead head={ Object.keys(props.data[0])}/>
        <TableBody body={ dataTable } amountRows={ amountRows } numPage={ activePage }/>
      </table>
      <div>
        {pages}
      </div>
    </div>
  )
}

export default Table;