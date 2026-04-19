import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import { useState } from "react";
import Filter from './Filter.js';

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
      isPagination - управляет наличием блока пагинации
*/

const Table = (props) => {
  let amountRows = props.amountRows;
  const [activePage, setActivePage] = useState(Math.ceil(props.data.length / amountRows));
  const [maxPages, setMaxPages] = useState(Math.ceil(props.data.length / amountRows));
  const changeActive = (event) => {
    setActivePage(event.target.innerHTML);
  };
  // массив с номерами страниц
  const arr = Array.from({ length: maxPages }, (v, i) => i + 1);
  //формируем совокупность span с номерами страниц
  let pages;
  if (props.isPagination === "true") {
    pages = arr.map((item, index) => {
      if (index === activePage - 1) {
        return <span key={ index } className="selectedPage"> { item } </span>
      }
      else {
        return <span key={index} onClick={ changeActive }> {item} </span>
      }
    });
  }
  else {
    amountRows = 50;
  }
  const [dataTable, setDataTable] = useState(props.data);
  const updateDataTable = (value, activePage, maxPages) => {
    setDataTable(value);
    props.setChartArr(value);
    setActivePage(maxPages);
    setMaxPages(maxPages);
  }

  return (
    <>
      <h4>Фильтры</h4>
      <Filter filtering={ updateDataTable } data={ dataTable } fullData={ props.data } amountRows = { amountRows } />
      <table>
        <TableHead head={ Object.keys(props.data[0]) } />
        <TableBody body={ dataTable } amountRows={ amountRows } numPage={ activePage }/>
      </table>
      <div>
        {pages}
      </div>
    </>
  )
}

export default Table;