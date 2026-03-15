document.addEventListener("DOMContentLoaded", function() {
  createTable(reserves, 'list');
  //фильтрация
  const filterForm = document.getElementById('filter');
  document.getElementById('findBtn').addEventListener("click", function() {
    filterTable(reserves, 'list', filterForm);
  })
  document.getElementById('clearBtn').addEventListener("click", function() {
    clearFilter(reserves, 'list', filterForm);
  })
  //сортировка
  const sortForm = document.getElementById('sort');
  setSortSelects(reserves, sortForm);
  const firstSelect = document.getElementById('fieldsFirst');
  firstSelect.addEventListener('change', function() {
    changeNextSelect(firstSelect, 'fieldsSecond');
  })
  const secondSelect = document.getElementById('fieldsSecond');
  secondSelect.addEventListener('change', function() {
    changeNextSelect(secondSelect, 'fieldsThird');
  })
  document.getElementById('sortBtn').addEventListener("click", function() {
    sortTable(reserves, 'list', sortForm);
  })
  document.getElementById('resetSortBtn').addEventListener("click", function() {
    resetSort(reserves, 'list', sortForm);
  })
})

// формирование полей элемента списка с заданным текстом и значением
const createOption = (str, val) => {
  let item = document.createElement('option');
  item.text = str;
  item.value = val;
  return item;
}

// формирование поля со списком
// параметры – массив со значениями элементов списка и элемент select
const setSortSelect = (arr, sortSelect) => {
  // создаем OPTION Нет и добавляем ее в SELECT
  sortSelect.append(createOption('Нет', 0));
  // перебираем массив со значениями опций
  arr.forEach((item, index) => {
    // создаем OPTION из очередного ключа и добавляем в SELECT
    // значение атрибута VALUE увеличиваем на 1, так как значение 0 имеет опция Нет
    sortSelect.append(createOption(item, index + 1));
  });
}

// формируем поля со списком для многоуровневой сортировки
const setSortSelects = (data, dataForm) => {
  // выделяем ключи словаря в массив
  const head = Object.keys(data[0]);
  // находим все SELECT в форме
  const allSelect = dataForm.getElementsByTagName('select');
  for(const item of allSelect) {
    // формируем очередной SELECT
    setSortSelect(head, item);
    // САМОСТОЯТЕЛЬНО все SELECT, кроме первого, сделать неизменяемым
    if (item !== allSelect[0]) {
      item.disabled = true;
    }
  }
}

// настраиваем поле для следующего уровня сортировки
const changeNextSelect = (curSelect, nextSelectId) => {
  let nextSelect = document.getElementById(nextSelectId);
  nextSelect.disabled = false;
  // в следующем SELECT выводим те же option, что и в текущем
  nextSelect.innerHTML = curSelect.innerHTML;
  // удаляем в следующем SELECT уже выбранную в текущем опцию
  // если это не первая опция - отсутствие сортировки
  if (curSelect.value !== '0') {
    [...nextSelect.options].forEach((item, i) => {
      if (item.value === curSelect.value) {
        nextSelect.remove(i);
      }
    })
  } else {
    nextSelect.disabled = true;
    if (curSelect.id === 'fieldsFirst') {
      let thirdSelect = document.getElementById('fieldsThird');
      thirdSelect.disabled = true;
      thirdSelect.value = 0;
    }
  }
}