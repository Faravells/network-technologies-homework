// устанавливаем соответствие между полями формы и столбцами таблицы
const correspond = {
  "Название": "name",
  "Субъект РФ": "region",
  "Ближайший город": "city",
  "Площадь, км²": ["areaFrom", "areaTo"],
  "Год образования": ["yearFrom", "yearTo"]
}

/* Структура возвращаемого ассоциативного массива:
{
    input_id: input_value,
    ...
} */
const dataFilter = (dataForm) => {
  let dictFilter = {};
  // перебираем все элементы формы с фильтрами
  for (const item of dataForm.elements) {
    // получаем значение элемента
    let valInput = item.value;
    // если поле типа text - приводим его значение к нижнему регистру
    if (item.type === "text") {
      valInput = valInput.toLowerCase();
    }
    if (item.type === "number") {
      if (valInput === "" && item.type.includes("From")) {
        valInput = -Infinity;
      }
      else if (valInput === "" && item.type.includes("To")) {
        valInput = Infinity;
      }
      else {
        valInput = Number(valInput);
      }
    }
    // формируем очередной элемент ассоциативного массива
    dictFilter[item.id] = valInput;
  }
  return dictFilter;
}

// фильтрация таблицы
const filterTable = (data, idTable, dataForm) => {
  document.getElementById('sort').reset();
  // получаем данные из полей формы
  const datafilter = dataFilter(dataForm);
  // выбираем данные соответствующие фильтру и формируем таблицу из них
  let tableFilter = data.filter(item => {
    // в этой переменной будут "накапливаться" результаты сравнения данных с параметрами фильтра
    let result = true;
    // строка соответствует фильтру, если сравнение всех значения из input со значением ячейки очередной строки - истина
    Object.entries(item).map(([key, val]) => {
      // текстовые поля проверяем на вхождение
      if (typeof val == 'string') {
        result &&= val.toLowerCase().includes(datafilter[correspond[key]])
      }
      // САМОСТОЯТЕЛЬНО проверить числовые поля на принадлежность интервалу
      if (typeof val == 'number') {
        const isbetween = (val, a, b) => a <= val && val <= b;
        let maxNum = datafilter[correspond[key][1]];
        if (maxNum === 0) {
          maxNum = Infinity;
        }
        result &&= isbetween(Number(val), datafilter[correspond[key][0]], maxNum);
      }
    });
    return result;
  });
  // САМОСТОЯТЕЛЬНО вызвать функцию, которая удаляет все строки таблицы с id=idTable
  clearTable(idTable);
  // показать на странице таблицу с отфильтрованными строками
  createTable(tableFilter, idTable);
}

const clearFilter = (data, idTable, form) => {
  form.reset();
  document.getElementById('sort').reset();
  clearTable(idTable);
  createTable(data, idTable);
}