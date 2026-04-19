/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    // создаем словарь со значениями полей формы
    const filterField = {
      "Название": event.target["structure"].value.toLowerCase(),
      "Тип": event.target["type"].value.toLowerCase(),
      "Страна": event.target["country"].value.toLowerCase(),
      "Город": event.target["city"].value.toLowerCase(),
      "Год": [event.target["yearFrom"].value ? parseFloat(event.target["yearFrom"].value) : null,
        event.target["yearTo"].value ? parseFloat(event.target["yearTo"].value) : null],
      "Высота": [event.target["heightFrom"].value ? parseFloat(event.target["heightFrom"].value) : null,
        event.target["heightTo"].value ? parseFloat(event.target["heightTo"].value) : null]
    };
    //фильтруем данные по значениям всех полей формы
    let arr = props.fullData;
    for(const key in filterField) {
      if (key === "Год" || key === "Высота") {
        arr = arr.filter(item =>
          !((filterField[key][0] !== null && item[key] < filterField[key][0]) ||
            (filterField[key][1] !== null && item[key] > filterField[key][1])));
      }
      else {
        arr = arr.filter(item =>
          item[key].toLowerCase().includes(filterField[key]));
      }
    }
    let amountRows = props.amountRows;
    //передаем родительскому компоненту новое состояние - отфильтрованный массив
    props.filtering(arr, "1", Math.ceil(arr.length / amountRows));
  }

  const handleReset = (event) => {
    event.preventDefault();
    event.currentTarget.querySelectorAll('input').forEach(elem => elem.value = '');
    props.filtering(props.fullData, "1", Math.ceil(props.fullData.length / props.amountRows));
  }

  return (
    <form onSubmit={ handleSubmit } onReset={handleReset}>
      <p>
        <label>Название:</label>
        <input name="structure" type="text" />
      </p>
      <p>
        <label>Тип:</label>
        <input name="type" type="text" />
      </p>
      <p>
        <label>Страна:</label>
        <input name="country" type="text" />
      </p>
      <p>
        <label>Город:</label>
        <input name="city" type="text" />
      </p>
      <p>
        <label>Год от:</label>
        <input name="yearFrom" type="number" />
      </p>
      <p>
        <label>Год до:</label>
        <input name="yearTo" type="number" />
      </p>
      <p>
        <label>Высота от:</label>
        <input name="heightFrom" type="number" />
      </p>
      <p>
        <label>Высота до:</label>
        <input name="heightTo" type="number" />
      </p>
      <p>
        <button type="submit">Фильтровать</button>
        <button type="reset">Очистить фильтр</button>
      </p>
    </form>
  )
}

export default Filter;