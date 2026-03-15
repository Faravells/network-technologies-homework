const createTable = (data, idTable) => {
  const table = document.getElementById(idTable);
  const header = Object.keys(data[0]);
  /* создание шапки таблицы */
  if (table.getElementsByTagName('th').length === 0) {
    const headerRow = createHeaderRow(header);
    table.append(headerRow);
  }
  /* создание тела таблицы */
  const bodyRows = createBodyRows(data);
    table.append(bodyRows);
};

const createHeaderRow = (headers) => {
  const tr = document.createElement('tr');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.innerHTML = header;
    tr.append(th);
  });
  return tr;
};

const createBodyRows = (data) => {
  const tbody = document.createElement('tbody');
  data.forEach(row => {
    const tr = document.createElement('tr');
    Object.values(row).forEach(val => {
      const td = document.createElement('td');
      td.innerHTML = val;
      tr.append(td);
    })
    tbody.append(tr);
  })
  return tbody;
}

const clearTable = (idTable) => {
  let table = document.getElementById(idTable);
  if (table.getElementsByTagName('tbody').length !== 0) {
    table.removeChild(table.getElementsByTagName('tbody')[0]);
  }
}