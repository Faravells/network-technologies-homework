/*
   компонент, для фильтрации таблицы
   пропсы:
      data - полные данные, по которым формировалась таблица при загрузке страницы
	  filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    // создаем словарь со значениями полей формы
    const filterField = {
      "Название": event.target["name"].value.toLowerCase(),
      "Субъект РФ": event.target["region"].value.toLowerCase(),
      "Ближайший город": event.target["city"].value.toLowerCase(),
      "Площадь, км²": [event.target["areaFrom"].value ? parseFloat(event.target["areaFrom"].value) : null,
        event.target["areaTo"].value ? parseFloat(event.target["areaTo"].value) : null],
      "Год образования": [event.target["yearFrom"].value ? parseFloat(event.target["yearFrom"].value) : null,
        event.target["yearTo"].value ? parseFloat(event.target["yearTo"].value) : null]
    };
    //фильтруем данные по значениям всех полей формы
    let arr = props.data;
    for(const key in filterField) {
      if (key === "Площадь, км²" || key === "Год образования") {
        arr = arr.filter(item =>
          !((filterField[key][0] !== null && item[key] < filterField[key][0]) ||
            (filterField[key][1] !== null && item[key] > filterField[key][1])));
      }
      else {
        arr = arr.filter(item =>
          item[key].toLowerCase().includes(filterField[key]));
      }
    }
    //передаем родительскому компоненту новое состояние - отфильтрованный массив
    props.filtering(false, arr);
  }

  const handleReset = (event) => {
    event.preventDefault();
    event.currentTarget.querySelectorAll('input').forEach(elem => elem.value = '');
    props.filtering(true);
  }

  return (
    <details>
      <summary>Фильтр</summary>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <p>
          <label htmlFor="name">Название:</label>
          <input type="text" name="name"/>
        </p>
        <p>
          <label htmlFor="region">Субъект РФ:</label>
          <input type="text" name="region"/>
        </p>
        <p>
          <label htmlFor="city">Ближайший город:</label>
          <input type="text" name="city"/>
        </p>
        <p>
          <label htmlFor="areaFrom">Площадь, км²:</label>
          от <input type="number" name="areaFrom"/>
          до <input type="number" name="areaTo"/>
        </p>
        <p>
          <label htmlFor="yearFrom">Год образования:</label>
          от <input type="number" name="yearFrom"/>
          до <input type="number" name="yearTo"/>
        </p>
        <p>
          <button type="submit">Фильтровать</button>
          <button type="reset">Очистить фильтр</button>
        </p>
      </form>
    </details>
  )
}

export default Filter;