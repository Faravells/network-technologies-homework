/*формируем массив для сортировки по двум уровням вида
  [
    {column: номер столбца, по которому осуществляется сортировка,
     direction: порядок сортировки (true по убыванию, false по возрастанию)
    },
    ...
   ]
*/
const createSortArr = (data) => {
  let sortArr = [];
  const sortSelects = data.getElementsByTagName('select');
  for (const item of sortSelects) {
    // получаем номер выбранной опции
    const keySort = item.value;
    // в случае, если выбрана опция Нет, заканчиваем формировать массив
    if (keySort === 0) {
      break;
    }
    // получаем порядок сортировки очередного уровня
    // имя флажка сформировано как имя поля SELECT и слова Desc
    const desc = document.getElementById(item.id + 'Desc').checked;
    // очередной элемент массива - по какому столбцу и в каком порядке сортировать
    sortArr.push(
      {column: keySort - 1,
        direction: desc}
    );
  }
  return sortArr;
};

const sortTable = (data, idTable, formData) => {
  // формируем управляющий массив для сортировки
  const sortArr = createSortArr(formData);
  // сортировать таблицу не нужно, во всех полях выбрана опция Нет
  if (sortArr[0].column === -1) {
    clearTable(idTable);
    createTable(data, idTable);
    return false;
  }
  //находим нужную таблицу
  let table = document.getElementById(idTable);
  // преобразуем строки таблицы в массив
  let rowData = Array.from(table.rows);
  // удаляем элемент с заголовками таблицы
  const headerRow = rowData.shift();
  //сортируем данные по всем уровням сортировки
  rowData.sort((first, second) => {
    for (let { column, direction } of sortArr) {
      if (column !== -1) {
        const firstCell = first.cells[column].innerText;
        const secondCell = second.cells[column].innerText;
        let comparison = 0;
        if (column === 3 || column === 4) {
          const firstNum = parseFloat(firstCell);
          const secondNum = parseFloat(secondCell);
          comparison = firstNum - secondNum;
        } else {
          // используем localeCompare для корректного сравнения
          comparison = firstCell.localeCompare(secondCell);
        }
        // учитываем направление сортировки
        if (comparison !== 0) {
          return (direction ? -comparison : comparison);
        }
      }
    }
    return 0;
  });
  //выводим отсортированную таблицу на страницу
  clearTable(idTable);
  table.append(headerRow);
  let tbody = document.createElement('tbody');
  rowData.forEach(item => {
    tbody.append(item);
  });
  table.append(tbody);
}

const resetSort = (data, idTable, form) => {
  form.reset();
  document.getElementById('filter').reset();
  const allSelect = form.getElementsByTagName('select');
  for(const item of allSelect) {
    if (item !== allSelect[0]) {
      item.disabled = true;
    }
  }
  clearTable(idTable);
  createTable(data, idTable);
}